import { defineConfig } from 'cspell';

const cspellConfig = defineConfig({
  words: ['liry', 'lng', 'lngs', 'fluentui', 'languagedetector', 'ahooks', 'gomoku'],
  gitignoreRoot: ['.gitignore'],
  ignorePaths: ['node_modules', 'dist', 'pnpm-lock.yaml', 'package.json', 'coverage']
});

export default cspellConfig;
