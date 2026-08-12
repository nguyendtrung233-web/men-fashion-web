import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Tên repository GitHub của bạn là men-fashion-web
  base: '/men-fashion-web/',

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': projectRoot,
    },
  },

  server: {
    // Tắt HMR khi biến DISABLE_HMR bằng true
    hmr: process.env.DISABLE_HMR !== 'true',

    // Tắt theo dõi file để tiết kiệm tài nguyên
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
