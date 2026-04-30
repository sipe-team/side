import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chdir } from 'node:process';

import StyleDictionary from 'style-dictionary';

chdir(import.meta.dirname);

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';
const SEMANTIC_LIGHT_DIR = '../../tokens/semantic/light';

/** @param {string} dir */
function hasJsonFiles(dir) {
  if (!existsSync(dir)) return false;
  const entries = readdirSync(dir, { recursive: true });
  return entries.some((f) => f.toString().endsWith('.json'));
}

/** @param {string} str */
function toPascalCase(str) {
  return str
    .split('-')
    .map((/** @type {string} */ word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Primitive + Semantic 토큰을 합칠 때 같은 최상위 키(color, radius 등)가
 * shallow merge로 덮어씌워지지 않도록 재귀 병합.
 * @param {Record<string, unknown>} target
 * @param {Record<string, unknown>} source
 */
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        /** @type {Record<string, unknown>} */ (target[key]),
        /** @type {Record<string, unknown>} */ (source[key]),
      );
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Semantic 토큰 집합을 CSS 변수 파일로 빌드.
 * Primitive 토큰을 함께 로드해 cross-set 참조({color.gray.950} 등)를 해소하되,
 * filter로 참조값을 가진 semantic 토큰만 출력.
 * @param {string} setPrefix
 * @param {string} outputFile
 */
async function _buildSemanticPlatform(setPrefix, outputFile) {
  if (!hasSetsByPrefix(setPrefix)) {
    mkdirSync(DIST, { recursive: true });
    writeFileSync(`${DIST}/${outputFile}`, `/* ${setPrefix} tokens not yet defined */\n`);
    return;
  }

  const semanticSets = Object.keys(allTokens).filter((key) => key !== '$metadata' && key.startsWith(setPrefix));

  const sd = new StyleDictionary({
    tokens: deepMerge(mergeSets(PRIMITIVE_SETS), mergeSets(semanticSets)),
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `${DIST}/`,
        files: [
          {
            destination: outputFile,
            format: 'css/variables',
            // 참조값({...})을 가진 토큰만 출력 = semantic tokens only
            filter: (token) => {
              const origValue = token.original?.$value ?? token.original?.value ?? '';
              return typeof origValue === 'string' && origValue.startsWith('{');
            },
            options: { selector: ':root', outputReferences: true },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

const PRIMITIVE_SETS = ['primitive/color', 'primitive/radius', 'primitive/spacing', 'primitive/typography'];

// Build primitive tokens (CSS + TypeScript types)
const primitive = new StyleDictionary({
  source: ['../../tokens/primitive/**/*.json'],
  hooks: {
    formats: {
      'typescript/token-names-dts': ({ dictionary }) => {
        /** @type {Map<string, string[]>} */
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
          'export declare function cssVar<T extends DesignToken>(token: T): `var(--${T})`;\n',
        );

        return lines.join('\n');
      },
      'typescript/token-names-js': () =>
        [
          '/** Auto-generated — do not edit directly. */',
          'export function cssVar(token) {',
          '  return `var(--${token})`;',
          '}\n',
        ].join('\n'),
      'typescript/token-names-cjs': () =>
        [
          '/** Auto-generated — do not edit directly. */',
          "'use strict';",
          'function cssVar(token) {',
          '  return `var(--${token})`;',
          '}',
          'exports.cssVar = cssVar;\n',
        ].join('\n'),
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
          destination: 'primitive.d.ts',
          format: 'typescript/token-names-dts',
        },
        {
          destination: 'primitive.d.cts',
          format: 'typescript/token-names-dts',
        },
        {
          destination: 'primitive.js',
          format: 'typescript/token-names-js',
        },
        {
          destination: 'primitive.cjs',
          format: 'typescript/token-names-cjs',
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

// Build semantic tokens — dark color / radius / spacing
await _buildSemanticPlatform('semantic/dark', 'semantic-dark.css');
await _buildSemanticPlatform('semantic/radius', 'semantic-radius.css');
await _buildSemanticPlatform('semantic/spacing', 'semantic-spacing.css');

// Concatenate all CSS into index.css
const parts = [
  readFileSync(`${DIST}/primitive.css`, 'utf-8'),
  readFileSync(`${DIST}/semantic-dark.css`, 'utf-8'),
  readFileSync(`${DIST}/semantic-radius.css`, 'utf-8'),
  readFileSync(`${DIST}/semantic-spacing.css`, 'utf-8'),
  readFileSync(`${DIST}/semantic-light.css`, 'utf-8'),
];
writeFileSync(`${DIST}/index.css`, parts.join('\n'));
console.log(`✓ ${DIST}/index.css generated`);

// token-names barrel (.js + .d.ts — consumed via publishConfig ./token-names export)
mkdirSync(DIST_TS, { recursive: true });
writeFileSync(
  `${DIST_TS}/index.js`,
  "/** Auto-generated — do not edit directly. */\nexport * from './primitive.js';\n",
);
writeFileSync(`${DIST_TS}/index.d.ts`, "/** Auto-generated — do not edit directly. */\nexport * from './primitive';\n");
writeFileSync(
  `${DIST_TS}/index.cjs`,
  "/** Auto-generated — do not edit directly. */\n'use strict';\nmodule.exports = require('./primitive.cjs');\n",
);
writeFileSync(
  `${DIST_TS}/index.d.cts`,
  "/** Auto-generated — do not edit directly. */\nexport * from './primitive';\n",
);
console.log(`✓ ${DIST_TS}/index.js + index.cjs generated`);
