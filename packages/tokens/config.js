import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chdir } from 'node:process';

import StyleDictionary from 'style-dictionary';

chdir(import.meta.dirname);

// ─── Types ───────────────────────────────────────────────────────────────────
/**
 * @typedef {{ $value: unknown, $type?: string, $description?: string }} DtcgToken
 * @typedef {{ [key: string]: DtcgToken | DtcgTokenGroup }} DtcgTokenGroup
 * @typedef {{ glob: string }} PrimitiveConfig
 * @typedef {{ glob: string, output: string, required: boolean }} SemanticEntry
 * @typedef {{ primitive: PrimitiveConfig, semantic: SemanticEntry[] }} BuildManifest
 */

/** @type {BuildManifest} */
const manifest = JSON.parse(readFileSync('./tokens.build.json', 'utf-8'));

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** @param {string} str */
function toPascalCase(str) {
  return str
    .split('-')
    .map((/** @type {string} */ word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * 파일 경로 또는 glob 패턴에 해당하는 JSON 파일 존재 여부 확인.
 * @param {string} globOrPath
 * @returns {boolean}
 */
function hasMatchingFiles(globOrPath) {
  if (!globOrPath.includes('*')) {
    return existsSync(globOrPath);
  }
  const baseDir = globOrPath.replace(/\/\*\*\/\*\.json$/, '').replace(/\/\*\.json$/, '');
  if (!existsSync(baseDir)) return false;
  return /** @type {string[]} */ (readdirSync(baseDir, { recursive: true })).some((f) =>
    f.toString().endsWith('.json'),
  );
}

// ─── Semantic build ───────────────────────────────────────────────────────────

/**
 * Semantic 토큰을 CSS 변수 파일로 빌드.
 * Primitive 토큰을 `include`로 로드해 cross-set 참조({color.gray.950} 등)를 해소하되,
 * `source`에 지정된 semantic 토큰만 출력.
 * @param {SemanticEntry} entry
 */
async function buildSemanticPlatform({ glob, output, required }) {
  if (!hasMatchingFiles(glob)) {
    if (required) {
      throw new Error(
        `[tokens] Required semantic token set not found: "${glob}"\n` +
          `→ Add the token file/directory or remove the entry from tokens.build.json.`,
      );
    }
    mkdirSync(DIST, { recursive: true });
    writeFileSync(`${DIST}/${output}`, `/* ${glob} not yet defined */\n`);
    return;
  }

  const sd = new StyleDictionary({
    include: [manifest.primitive.glob],
    source: [glob],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: `${DIST}/`,
        files: [
          {
            destination: output,
            format: 'css/variables',
            options: { selector: ':root', outputReferences: true },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

// ─── Primitive build ──────────────────────────────────────────────────────────

const primitive = new StyleDictionary({
  source: [manifest.primitive.glob],
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
        { destination: 'primitive.d.ts', format: 'typescript/token-names-dts' },
        { destination: 'primitive.d.cts', format: 'typescript/token-names-dts' },
        { destination: 'primitive.js', format: 'typescript/token-names-js' },
        { destination: 'primitive.cjs', format: 'typescript/token-names-cjs' },
      ],
    },
  },
});
await primitive.buildAllPlatforms();

// ─── Semantic builds (manifest-driven) ───────────────────────────────────────

for (const entry of manifest.semantic) {
  await buildSemanticPlatform(entry);
}

// ─── index.css (concat) ───────────────────────────────────────────────────────

const parts = [
  readFileSync(`${DIST}/primitive.css`, 'utf-8'),
  ...manifest.semantic.map(({ output }) => readFileSync(`${DIST}/${output}`, 'utf-8')),
];
writeFileSync(`${DIST}/index.css`, parts.join('\n'));
console.log(`✓ ${DIST}/index.css generated`);

// ─── token-names barrel ───────────────────────────────────────────────────────

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
