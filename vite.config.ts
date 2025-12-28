/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@@': resolve(import.meta.dirname),
      '@': resolve(import.meta.dirname, 'src')
    }
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
