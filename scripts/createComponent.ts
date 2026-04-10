import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { intro, isCancel, outro, spinner, text } from '@clack/prompts';
import { Cli, Command, Option } from 'clipanion';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreateComponentCommand extends Command {
  static override paths = [['create']];
  name = Option.String({ required: false });

  private excludePatterns = ['node_modules', '.git', '.DS_Store'];

  private kebabToPascal(str: string): string {
    return str
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  }

  private replacePatterns(kebabCaseName: string, pascalCaseName: string) {
    return {
      Component: pascalCaseName,
      'package-name': kebabCaseName,
    } as const;
  }

  private async validateTemplateDir(templateDir: string): Promise<void> {
    try {
      await fs.access(templateDir);
    } catch {
      throw new Error(`템플릿 디렉토리를 찾을 수 없습니다: ${templateDir}`);
    }
  }

  async copyRecursive(source: string, target: string, kebabCaseName: string, pascalCaseName: string) {
    const currentFolder = path.basename(source);

    if (this.excludePatterns.includes(currentFolder)) {
      return;
    }

    const stats = await fs.stat(source);
    const patterns = this.replacePatterns(kebabCaseName, pascalCaseName);

    if (stats.isDirectory()) {
      await fs.mkdir(target, { recursive: true });
      const entries = await fs.readdir(source, { withFileTypes: true });

      for (const entry of entries) {
        if (!this.excludePatterns.includes(entry.name)) {
          const sourcePath = path.join(source, entry.name);
          const newName = entry.name.replaceAll('Component', pascalCaseName);
          const targetPath = path.join(target, newName);
          await this.copyRecursive(sourcePath, targetPath, kebabCaseName, pascalCaseName);
        }
      }
    } else {
      const content = await fs.readFile(source, 'utf-8');
      const updatedContent = Object.entries(patterns).reduce(
        (content, [search, replace]) => content.replace(new RegExp(search, 'g'), replace),
        content,
      );

      await fs.writeFile(target, updatedContent);
    }
  }

  private async updatePackageJson(targetDir: string): Promise<void> {
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

    const { private: _, ...newPackageJson } = packageJson;
    await fs.writeFile(packageJsonPath, JSON.stringify(newPackageJson, null, 2));
  }

  async execute() {
    const loading = spinner();

    try {
      intro('컴포넌트 생성기 🚀');

      const kebabCaseName = (await text({
        message: '생성할 컴포넌트 이름을 입력해주세요 (kebab-case)',
        placeholder: 'ESC를 눌러 취소할 수 있습니다.',
        validate: (value) => {
          if (!value) return '컴포넌트 이름은 필수입니다';
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
            return '컴포넌트 이름은 kebab-case로 입력해주세요 (예: my-component)';
          }
          return undefined;
        },
      })) as string;

      if (isCancel(kebabCaseName)) {
        outro('취소되었습니다.');
        return 0;
      }

      const pascalCaseName = this.kebabToPascal(kebabCaseName);
      loading.start('템플릿 파일을 복사하는 중...');

      const templateDir = path.join(__dirname, '../.templates/component');
      const targetDir = path.join(process.cwd(), 'packages', kebabCaseName);

      await this.validateTemplateDir(templateDir);
      await this.copyRecursive(templateDir, targetDir, kebabCaseName, pascalCaseName);

      await this.updatePackageJson(targetDir);

      loading.stop('템플릿 복사 완료! ✨');
      outro(`${pascalCaseName} 컴포넌트가 성공적으로 생성되었습니다! 🎉`);

      return 0;
    } catch (error) {
      loading.stop('오류 발생');
      console.error(`Error: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'}`);
      return 1;
    }
  }
}

const cli = new Cli({
  binaryName: 'create-component',
  binaryLabel: 'Component Generator',
});

cli.register(CreateComponentCommand);
cli.runExit(process.argv.slice(2));
