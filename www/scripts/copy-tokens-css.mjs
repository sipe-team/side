#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '..', '..', 'packages', 'tokens', 'dist', 'index.css');
const outDir = path.resolve(__dirname, '..', 'src', '.generated');
const out = path.resolve(outDir, 'tokens.css');

// Docusaurus's CSS minifier drops contents of `@layer theme { ... }` blocks
// because it cannot parse :root nested inside a cascade layer. Unwrap the
// outer `@layer theme { ... }` wrapper produced by vanilla-extract so the
// raw :root declarations land in the docs bundle as plain CSS.
const raw = fs.readFileSync(src, 'utf-8');
const unwrapped = raw.replace(/@layer theme\s*\{([\s\S]*?)\n\}/g, '$1');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, unwrapped);
console.log(`[copy-tokens-css] ${out}`);
