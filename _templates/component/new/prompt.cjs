const path = require('node:path');
const { toPascalCase } = require(
  path.join(process.cwd(), '_templates', 'utils', 'index.cjs'),
);

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: '컴포넌트 이름을 입력하세요 (kebab-case):',
        validate: (value) => {
          if (!value.match(/^[a-z0-9-]+$/)) {
            return '컴포넌트 이름은 kebab-case로 입력해주세요 (예: my-component)';
          }
          return true;
        },
      },
    ];

    return inquirer.prompt(questions).then((answers) => {
      const { name } = answers;
      return {
        name,
        componentName: toPascalCase(name),
        path: `packages/${name}`,
      };
    });
  },
};
