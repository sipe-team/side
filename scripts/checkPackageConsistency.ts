import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPackages, type Package } from '@manypkg/get-packages';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const rulesRequiringFieldPath = new Set(['extraScript', 'directDependency']);

const allowlistEntrySchema = z
  .object({
    packageName: z.string(),
    rule: z.string(),
    fieldPath: z.string().optional(),
    reason: z.string().min(1, 'allowlist entries require a non-empty reason'),
  })
  .superRefine((entry, ctx) => {
    if (rulesRequiringFieldPath.has(entry.rule) && !entry.fieldPath) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldPath'],
        message: `rule "${entry.rule}" requires a fieldPath`,
      });
    }
    if (!rulesRequiringFieldPath.has(entry.rule) && entry.fieldPath !== undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['fieldPath'],
        message: `rule "${entry.rule}" must not specify a fieldPath`,
      });
    }
  });

const policySchema = z.object({
  description: z.string().optional(),
  hardRules: z.object({
    scripts: z.record(z.string(), z.string()),
    optionalScripts: z.record(z.string(), z.string()).optional(),
    publishConfig: z.object({
      access: z.literal('public'),
      registry: z.string().url(),
    }),
    workspaceDependencySpec: z.string(),
    catalogDependencies: z.record(z.string(), z.string()).optional(),
  }),
  allowlist: z.array(allowlistEntrySchema),
});

type Policy = z.infer<typeof policySchema>;
type Allowlist = Policy['allowlist'];

type Violation = {
  packageName: string;
  severity: 'hard' | 'soft';
  rule: string;
  fieldPath?: string;
  message: string;
};

type OutputFormat = 'markdown' | 'text' | 'json';

function parseArgs(): { format: OutputFormat; policyPath: string } {
  const args = process.argv.slice(2);
  let format: OutputFormat = process.env.CI ? 'markdown' : 'text';
  let policyPath = path.join(repoRoot, 'package-policy.json');

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--format' || arg === '-f') {
      const next = args[i + 1];
      if (next === 'markdown' || next === 'text' || next === 'json') {
        format = next;
        i++;
      }
    } else if (arg?.startsWith('--format=')) {
      const value = arg.slice('--format='.length);
      if (value === 'markdown' || value === 'text' || value === 'json') {
        format = value;
      }
    } else if (arg === '--policy') {
      const next = args[i + 1];
      if (next) {
        policyPath = path.resolve(repoRoot, next);
        i++;
      }
    }
  }

  return { format, policyPath };
}

async function loadPolicy(policyPath: string): Promise<Policy> {
  const raw = await fs.readFile(policyPath, 'utf-8');
  const parsed = JSON.parse(raw);
  return policySchema.parse(parsed);
}

function isAllowlisted(allowlist: Allowlist, packageName: string, rule: string, fieldPath?: string): boolean {
  return allowlist.some(
    (entry) => entry.packageName === packageName && entry.rule === rule && entry.fieldPath === fieldPath,
  );
}

function checkPackage(pkg: Package, policy: Policy): Violation[] {
  const violations: Violation[] = [];
  const name = pkg.packageJson.name;
  const json = pkg.packageJson as Record<string, unknown>;
  const scripts = (json.scripts ?? {}) as Record<string, string>;
  const publishConfig = (json.publishConfig ?? {}) as Record<string, unknown>;

  for (const [key, expected] of Object.entries(policy.hardRules.scripts)) {
    const actual = scripts[key];
    if (actual === undefined) {
      if (!isAllowlisted(policy.allowlist, name, `scripts.${key}`)) {
        violations.push({
          packageName: name,
          severity: 'hard',
          rule: `scripts.${key}`,
          message: `missing required script "${key}" (expected: "${expected}")`,
        });
      }
    } else if (actual !== expected) {
      violations.push({
        packageName: name,
        severity: 'hard',
        rule: `scripts.${key}`,
        message: `script "${key}" is "${actual}" (expected: "${expected}")`,
      });
    }
  }

  for (const [key, expected] of Object.entries(policy.hardRules.optionalScripts ?? {})) {
    const actual = scripts[key];
    if (actual === undefined) {
      if (!isAllowlisted(policy.allowlist, name, `optionalScripts.${key}`)) {
        violations.push({
          packageName: name,
          severity: 'hard',
          rule: `optionalScripts.${key}`,
          message: `missing optional script "${key}" with no allowlist entry (expected: "${expected}")`,
        });
      }
    } else if (actual !== expected) {
      violations.push({
        packageName: name,
        severity: 'hard',
        rule: `optionalScripts.${key}`,
        message: `script "${key}" is "${actual}" (expected: "${expected}")`,
      });
    }
  }

  const expectedScripts = new Set([
    ...Object.keys(policy.hardRules.scripts),
    ...Object.keys(policy.hardRules.optionalScripts ?? {}),
  ]);
  for (const scriptName of Object.keys(scripts)) {
    if (expectedScripts.has(scriptName)) continue;
    if (!isAllowlisted(policy.allowlist, name, 'extraScript', `scripts.${scriptName}`)) {
      violations.push({
        packageName: name,
        severity: 'hard',
        rule: 'extraScript',
        fieldPath: `scripts.${scriptName}`,
        message: `extra script "${scriptName}" not in policy and not in allowlist`,
      });
    }
  }

  if (publishConfig.access !== policy.hardRules.publishConfig.access) {
    violations.push({
      packageName: name,
      severity: 'hard',
      rule: 'publishConfig.access',
      message: `publishConfig.access is ${JSON.stringify(publishConfig.access)} (expected: "${policy.hardRules.publishConfig.access}")`,
    });
  }
  if (publishConfig.registry !== policy.hardRules.publishConfig.registry) {
    violations.push({
      packageName: name,
      severity: 'hard',
      rule: 'publishConfig.registry',
      message: `publishConfig.registry is ${JSON.stringify(publishConfig.registry)} (expected: "${policy.hardRules.publishConfig.registry}")`,
    });
  }

  const depBuckets = ['dependencies', 'devDependencies', 'peerDependencies'] as const;
  for (const bucket of depBuckets) {
    const deps = (json[bucket] ?? {}) as Record<string, string>;
    for (const [depName, spec] of Object.entries(deps)) {
      if (spec.startsWith('workspace:') && spec !== policy.hardRules.workspaceDependencySpec) {
        violations.push({
          packageName: name,
          severity: 'hard',
          rule: 'workspaceDependencySpec',
          fieldPath: `${bucket}.${depName}`,
          message: `workspace dep "${depName}" is "${spec}" (expected: "${policy.hardRules.workspaceDependencySpec}")`,
        });
      }

      if (bucket !== 'peerDependencies') {
        const required = policy.hardRules.catalogDependencies?.[depName];
        if (required && spec !== required) {
          if (!isAllowlisted(policy.allowlist, name, 'directDependency', `${bucket}.${depName}`)) {
            violations.push({
              packageName: name,
              severity: 'hard',
              rule: 'catalogDependency',
              fieldPath: `${bucket}.${depName}`,
              message: `"${depName}" is "${spec}" (expected: "${required}")`,
            });
          }
        }
      }
    }
  }

  return violations;
}

function renderMarkdown(violations: Violation[], packageCount: number): string {
  if (violations.length === 0) {
    return ['## Package consistency report', '', `All ${packageCount} packages pass the policy.`, ''].join('\n');
  }

  const grouped = new Map<string, Violation[]>();
  for (const v of violations) {
    const list = grouped.get(v.packageName) ?? [];
    list.push(v);
    grouped.set(v.packageName, list);
  }

  const lines: string[] = [
    '## Package consistency report',
    '',
    `**${violations.length} violation(s) across ${grouped.size} / ${packageCount} package(s).** This is a non-blocking report.`,
    '',
    '| Package | Rule | Detail |',
    '| --- | --- | --- |',
  ];
  for (const [pkgName, list] of [...grouped.entries()].sort()) {
    for (const v of list) {
      const ruleLabel = v.fieldPath ? `${v.rule} (${v.fieldPath})` : v.rule;
      lines.push(`| \`${pkgName}\` | ${ruleLabel} | ${v.message.replace(/\|/g, '\\|')} |`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

function renderText(violations: Violation[], packageCount: number): string {
  if (violations.length === 0) {
    return `All ${packageCount} packages pass the policy.\n`;
  }

  const lines: string[] = [`${violations.length} violation(s) across ${packageCount} package(s):`];
  for (const v of violations) {
    const ruleLabel = v.fieldPath ? `${v.rule} (${v.fieldPath})` : v.rule;
    lines.push(`  - [${v.packageName}] ${ruleLabel}: ${v.message}`);
  }
  return `${lines.join('\n')}\n`;
}

async function main(): Promise<void> {
  const { format, policyPath } = parseArgs();

  let policy: Policy;
  try {
    policy = await loadPolicy(policyPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallback =
      format === 'markdown'
        ? `## Package consistency report\n\n> checker could not load policy: ${message}\n`
        : `policy load failed: ${message}\n`;
    process.stdout.write(fallback);
    return;
  }

  let packages: Package[];
  try {
    const result = await getPackages(repoRoot);
    packages = result.packages.filter((pkg) => {
      const name = pkg.packageJson.name;
      return typeof name === 'string' && name.startsWith('@sipe-team/');
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const fallback =
      format === 'markdown'
        ? `## Package consistency report\n\n> checker could not enumerate workspace packages: ${message}\n`
        : `workspace scan failed: ${message}\n`;
    process.stdout.write(fallback);
    return;
  }

  const violations: Violation[] = [];
  for (const pkg of packages) {
    try {
      violations.push(...checkPackage(pkg, policy));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      violations.push({
        packageName: pkg.packageJson.name,
        severity: 'hard',
        rule: 'checker.error',
        message: `checker threw while inspecting package: ${message}`,
      });
    }
  }

  let output: string;
  if (format === 'json') {
    output = `${JSON.stringify({ packageCount: packages.length, violations }, null, 2)}\n`;
  } else if (format === 'markdown') {
    output = renderMarkdown(violations, packages.length);
  } else {
    output = renderText(violations, packages.length);
  }
  process.stdout.write(output);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stdout.write(`## Package consistency report\n\n> checker crashed: ${message}\n`);
});
