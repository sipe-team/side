import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chdir } from 'node:process';

import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

chdir(import.meta.dirname);

// Register Tokens Studio transforms and preprocessor into Style Dictionary
register(StyleDictionary, { excludeParentKeys: true });

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';

const allTokens = JSON.parse(readFileSync('../../tokens/tokens.json', 'utf-8'));
const setOrder = allTokens.$metadata?.tokenSetOrder ?? [];

/**
 * Build a token dict scoped to the given sets, preserving the multi-set wrapper
 * so the tokens-studio preprocessor can strip the parent keys and merge sets.
 * @param {string[]} setNames
 */
function buildSetDict(setNames) {
  const dict = {};
  for (const name of setNames) {
    if (allTokens[name]) dict[name] = allTokens[name];
  }
  dict.$metadata = { tokenSetOrder: setNames.filter((n) => allTokens[n]) };
  return dict;
}

/** @param {string} prefix */
function hasSetsByPrefix(prefix) {
  return setOrder.some((key) => key.startsWith(prefix) && allTokens[key] && Object.keys(allTokens[key]).length > 0);
}

/** @param {string} str */
function toPascalCase(str) {
  return str
    .split('-')
    .map((/** @type {string} */ word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Recursively collect all leaf token paths within the given sets.
 * Used to compute which tokens belong exclusively to the semantic layer.
 * @param {string[]} setNames
 * @returns {Set<string>}
 */
function getLeafPaths(setNames) {
  const paths = new Set();
  function walk(obj, segments) {
    if (obj && '$value' in obj) {
      paths.add(segments.join('.'));
      return;
    }
    for (const [k, v] of Object.entries(obj ?? {})) {
      if (!k.startsWith('$') && v && typeof v === 'object') walk(v, [...segments, k]);
    }
  }
  for (const name of setNames) {
    if (allTokens[name]) walk(allTokens[name], []);
  }
  return paths;
}

/**
 * Recursively strip tokens that would create a circular reference when merged with primitives.
 * @param {object} setContent
 * @param {Set<string>} primLeafPaths
 * @returns {object}
 */
function _stripCircularAliases(setContent, primLeafPaths) {
  function clean(obj, segments) {
    if (!obj || typeof obj !== 'object') return obj;
    if ('$value' in obj) {
      const path = segments.join('.');
      if (primLeafPaths.has(path) && typeof obj.$value === 'string') {
        const ref = obj.$value.match(/^\{([^}]+)\}$/)?.[1];
        if (ref === path) return null;
      }
      return obj;
    }
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('$')) {
        result[k] = v;
        continue;
      }
      const cleaned = clean(v, [...segments, k]);
      if (cleaned !== null) result[k] = cleaned;
    }
    return result;
  }
  return clean(setContent, []);
}

const primitiveSets = setOrder.filter((k) => k.startsWith('primitive/'));
// @INFO: All semantic sets contribute to the dark theme (dark is the default)
const darkSets = setOrder.filter((k) => k.startsWith('semantic/'));

const primitiveLeafPaths = getLeafPaths(primitiveSets);
const darkLeafPaths = getLeafPaths(darkSets);
const semanticOnlyPaths = new Set([...darkLeafPaths].filter((p) => !primitiveLeafPaths.has(p)));

// Build primitive tokens (CSS + TypeScript types)
const primitive = new StyleDictionary({
  tokens: buildSetDict(primitiveSets),
  preprocessors: ['tokens-studio'],
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

        lines.push('export type PrimitiveToken =');
        lines.push(`${typeNames.map((t) => `  | ${t}`).join('\n')};\n`);

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
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
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

// Build semantic/dark tokens — dark is the default theme, output to :root
// @NOTE: semantic/light is not yet developed; add a symmetric block when light sets are defined
if (hasSetsByPrefix('semantic/dark')) {
  const semanticDarkDict = buildSetDict(primitiveSets);
  for (const name of darkSets) {
    if (allTokens[name]) semanticDarkDict[name] = _stripCircularAliases(allTokens[name], primitiveLeafPaths);
  }
  semanticDarkDict.$metadata = { tokenSetOrder: [...primitiveSets, ...darkSets].filter((n) => allTokens[n]) };

  const semanticDark = new StyleDictionary({
    // @ts-expect-error - Style Dictionary's type definitions don't allow for the multi-set wrapper structure used by tokens-studio
    tokens: semanticDarkDict,
    preprocessors: ['tokens-studio'],
    hooks: {
      formats: {
        'typescript/semantic-token-names-dts': ({ dictionary }) => {
          /** @type {Map<string, string[]>} */
          const groups = new Map();
          for (const token of dictionary.allTokens) {
            if (!semanticOnlyPaths.has(token.path.join('.'))) continue;
            const category = token.path[0];
            if (!groups.has(category)) groups.set(category, []);
            groups.get(category).push(token.name);
          }

          const lines = ['/** Auto-generated — do not edit directly. */\n'];
          const typeNames = [];

          for (const [category, names] of groups) {
            const typeName = `Semantic${toPascalCase(category)}Token`;
            typeNames.push(typeName);
            lines.push(`export type ${typeName} =`);
            lines.push(`${names.map((n) => `  | '${n}'`).join('\n')};\n`);
          }

          lines.push('export type SemanticToken =');
          lines.push(`${typeNames.map((t) => `  | ${t}`).join('\n')};\n`);

          return lines.join('\n');
        },
      },
    },
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: `${DIST}/`,
        files: [
          {
            destination: 'semantic-dark.css',
            format: 'css/variables',
            // Only emit tokens that are unique to the semantic layer.
            filter: (token) => semanticOnlyPaths.has(token.path.join('.')),
            options: { selector: ':root', outputReferences: true },
          },
        ],
      },
      ts: {
        transforms: ['name/kebab'],
        buildPath: `${DIST_TS}/`,
        files: [
          {
            destination: 'semantic.d.ts',
            format: 'typescript/semantic-token-names-dts',
          },
          {
            destination: 'semantic.d.cts',
            format: 'typescript/semantic-token-names-dts',
          },
        ],
      },
    },
  });
  await semanticDark.buildAllPlatforms();
} else {
  mkdirSync(DIST, { recursive: true });
  writeFileSync(`${DIST}/semantic-dark.css`, '/* semantic/dark tokens not yet defined */\n');
}

// Concatenate all CSS into index.css
const parts = [readFileSync(`${DIST}/primitive.css`, 'utf-8'), readFileSync(`${DIST}/semantic-dark.css`, 'utf-8')];
writeFileSync(`${DIST}/index.css`, parts.join('\n'));
console.log(`✓ ${DIST}/index.css generated`);

// Single public CSS entrypoint: Style Dictionary values + the vanilla-extract `--side-*` bridge.
// Both layers are required — the bridge maps `--side-x` onto `--x`, and only Style Dictionary
// defines `--x`. Shipping them as one file means a consumer cannot import half the chain.
// `dist/index.css` is emitted by tsup's vanilla-extract plugin, which runs before this script.
const bridgeCss = readFileSync('dist/index.css', 'utf-8');
writeFileSync('dist/styles.css', `${parts.join('\n')}\n${bridgeCss}`);
console.log('✓ dist/styles.css generated');

// token-names barrel (.js + .d.ts — consumed via publishConfig ./token-names export)
mkdirSync(DIST_TS, { recursive: true });

writeFileSync(
  `${DIST_TS}/index.js`,
  "/** Auto-generated — do not edit directly. */\nexport * from './primitive.js';\n",
);
writeFileSync(
  `${DIST_TS}/index.cjs`,
  "/** Auto-generated — do not edit directly. */\n'use strict';\nmodule.exports = require('./primitive.cjs');\n",
);

/**
 * Relative specifiers in declaration files must carry the runtime extension, otherwise node16 ESM
 * resolution fails to find the sibling modules. The semantic layer is types-only and needs no
 * runtime module: TypeScript resolves `./semantic.js` to `semantic.d.ts` by extension substitution.
 * @param {'.js' | '.cjs'} ext
 */
const barrelDts = (ext) =>
  [
    '/** Auto-generated — do not edit directly. */',
    `export * from './primitive${ext}';`,
    `export * from './semantic${ext}';`,
    'export type DesignToken = PrimitiveToken | SemanticToken;',
    '/** Wraps a design token name in `var()` for use in inline styles. */',
    'export declare function cssVar<T extends DesignToken>(token: T): `var(--${T})`;\n',
  ].join('\n');
writeFileSync(`${DIST_TS}/index.d.ts`, barrelDts('.js'));
writeFileSync(`${DIST_TS}/index.d.cts`, barrelDts('.cjs'));
console.log(`✓ ${DIST_TS}/index.js + index.cjs generated`);
