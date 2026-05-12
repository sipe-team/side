#!/usr/bin/env node
/**
 * Build-time props extraction.
 * Usage: node scripts/extract-props.mjs --component <name>
 */

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const outputDir = path.resolve(__dirname, '..', 'src', '.generated', 'props');

function toPascalCase(name) {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function formatType(type) {
  if (!type) return { name: 'unknown' };
  if (Array.isArray(type.value)) {
    return {
      name: type.name,
      value: type.value.map((v) => (typeof v === 'object' ? v.value : v)),
    };
  }
  return { name: type.name };
}

function extractProps(name) {
  const reactDocgenTypescript = require('react-docgen-typescript');
  const source = path.resolve(repoRoot, 'packages', name, 'src', `${toPascalCase(name)}.tsx`);
  if (!fs.existsSync(source)) throw new Error(`Source file not found: ${source}`);

  const parser = reactDocgenTypescript.withDefaultConfig({
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) => (prop.parent ? !prop.parent.fileName.includes('node_modules') : true),
  });
  const [doc] = parser.parse(source);
  if (!doc) return [];

  return Object.values(doc.props).map((p) => ({
    name: p.name,
    type: formatType(p.type),
    defaultValue: p.defaultValue ? { value: p.defaultValue.value } : null,
    required: p.required,
    description: p.description || '',
  }));
}

const args = process.argv.slice(2);
const idx = args.indexOf('--component');
const name = args[idx + 1];
// Restrict to lowercase alphanumeric+hyphen so the resolved source path cannot escape packages/.
if (idx === -1 || !name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Usage: node scripts/extract-props.mjs --component <name>');
  process.exit(1);
}

const props = extractProps(name);
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.resolve(outputDir, `${name}.json`), JSON.stringify(props, null, 2));
console.log(`[extract-props] ${name}: ${props.length} props`);
