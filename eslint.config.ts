import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = defineConfig(compat.extends('next/core-web-vitals', 'next/typescript'));

export default eslintConfig;
