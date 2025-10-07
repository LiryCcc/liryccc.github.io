import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
      '@@': resolve(import.meta.dirname)
    }
  },
  server: {
    port: 19666
  }
});
