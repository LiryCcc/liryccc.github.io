import { defineConfig } from 'cspell';

const cspellConfig = defineConfig({
  words: ['liry', 'lng', 'lngs', 'fluentui', 'languagedetector', 'ahooks'],
  gitignoreRoot: ['.gitignore'],
  ignorePaths: ['node_modules', 'dist', 'pnpm-lock.yaml', 'package.json']
});

export default cspellConfig;
