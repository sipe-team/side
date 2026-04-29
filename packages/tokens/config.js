import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chdir } from 'node:process';

import StyleDictionary from 'style-dictionary';

chdir(import.meta.dirname);

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';

const allTokens = JSON.parse(readFileSync('../../tokens/tokens.json', 'utf-8'));

/** @param {string[]} setNames */
function mergeSets(setNames) {
  const merged = {};
  for (const name of setNames) {
    if (allTokens[name]) Object.assign(merged, allTokens[name]);
  }
  return merged;
}

/** @param {string} prefix */
function hasSetsByPrefix(prefix) {
  return Object.keys(allTokens).some(
    (key) => key !== '$metadata' && key.startsWith(prefix) && Object.keys(allTokens[key]).length > 0,
  );
}

/** @param {string} str */
function toPascalCase(str) {
  return str
    .split('-')
    .map((/** @type {string} */ word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const PRIMITIVE_SETS = ['primitive/color', 'primitive/radius', 'primitive/spacing', 'primitive/typography'];

// Build primitive tokens (CSS + TypeScript types)
const primitive = new StyleDictionary({
  tokens: mergeSets(PRIMITIVE_SETS),
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

// Build semantic/light tokens — graceful no-op if sets are absent
if (hasSetsByPrefix('semantic/light')) {
  const semanticLightSets = Object.keys(allTokens).filter(
    (key) => key !== '$metadata' && key.startsWith('semantic/light'),
  );
  const semanticLight = new StyleDictionary({
    tokens: mergeSets(semanticLightSets),
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
