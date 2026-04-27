import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

import StyleDictionary from 'style-dictionary';

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';
const SEMANTIC_LIGHT_DIR = 'tokens/semantic/light';

function hasJsonFiles(dir) {
  if (!existsSync(dir)) return false;
  const entries = readdirSync(dir, { recursive: true });
  return entries.some((f) => f.toString().endsWith('.json'));
}

function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Build primitive tokens (CSS + TypeScript types)
const primitive = new StyleDictionary({
  source: ['tokens/primitive/**/*.json'],
  hooks: {
    formats: {
      'typescript/token-names': ({ dictionary }) => {
        const groups = new Map();
        for (const token of dictionary.allTokens) {
          const category = token.path[0];
          if (!groups.has(category)) groups.set(category, []);
          groups.get(category).push(token.name);
        }

        const lines = ['/** Auto-generated — do not edit directly. */\n'];
        const typeNames = [];

        for (const [category, names] of groups) {
          const typeName = `${toPascalCase(category)}Token`;
          typeNames.push(typeName);
          lines.push(`export type ${typeName} =`);
          lines.push(`${names.map((n) => `  | '${n}'`).join('\n')};\n`);
        }

        lines.push('export type DesignToken =');
        lines.push(`${typeNames.map((t) => `  | ${t}`).join('\n')};\n`);

        lines.push(
          '/** Wraps a design token name in `var()` for use in inline styles. */',
          'export function cssVar<T extends DesignToken>(token: T): `var(--${T})` {',
          '  return `var(--${token})` as `var(--${T})`;',
          '}\n',
        );

        return lines.join('\n');
      },
    },
  },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: `${DIST}/`,
      files: [
        {
          destination: 'primitive.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: false },
        },
      ],
    },
    ts: {
      transforms: ['name/kebab'],
      buildPath: `${DIST_TS}/`,
      files: [
        {
          destination: 'primitive.ts',
          format: 'typescript/token-names',
        },
      ],
    },
  },
});
await primitive.buildAllPlatforms();

// Build semantic/light tokens — graceful no-op if directory is empty
if (hasJsonFiles(SEMANTIC_LIGHT_DIR)) {
  const semanticLight = new StyleDictionary({
    source: [`${SEMANTIC_LIGHT_DIR}/**/*.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `${DIST}/`,
        files: [
          {
            destination: 'semantic-light.css',
            format: 'css/variables',
            options: { selector: ':root', outputReferences: true },
          },
        ],
      },
    },
  });
  await semanticLight.buildAllPlatforms();
} else {
  mkdirSync(DIST, { recursive: true });
  writeFileSync(`${DIST}/semantic-light.css`, '/* semantic/light tokens not yet defined */\n');
}

// Concatenate all CSS into index.css
const parts = [readFileSync(`${DIST}/primitive.css`, 'utf-8'), readFileSync(`${DIST}/semantic-light.css`, 'utf-8')];
writeFileSync(`${DIST}/index.css`, parts.join('\n'));
console.log(`✓ ${DIST}/index.css generated`);

// TypeScript barrel
mkdirSync(DIST_TS, { recursive: true });
writeFileSync(`${DIST_TS}/index.ts`, "/** Auto-generated — do not edit directly. */\nexport * from './primitive';\n");
console.log(`✓ ${DIST_TS}/index.ts generated`);
