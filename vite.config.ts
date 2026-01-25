/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

const copyIndexTo404Plugin = (): Plugin => {
  return {
    name: 'copy-index-to-404',
    writeBundle(option) {
      if (option.dir) {
        this.fs.copyFile(resolve(option.dir, 'index.html'), resolve(option.dir, '404.html'));
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexTo404Plugin()],
  resolve: {
    alias: {
      '@@': resolve(import.meta.dirname),
      '@': resolve(import.meta.dirname, 'src')
    }
  },
  build: {
    sourcemap: true
  },
  server: {
    port: 23825,
    host: '0.0.0.0'
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  },
  dev: {
    sourcemap: true
  }
});
