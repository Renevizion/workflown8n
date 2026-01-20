import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      writeBundle() {
        // Copy popup HTML and CSS after build
        mkdirSync('dist/popup', { recursive: true });
        copyFileSync('src/popup/index.html', 'dist/popup/index.html');
        copyFileSync('src/popup/popup.css', 'dist/popup/popup.css');
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.jsx'),
        content: resolve(__dirname, 'src/content/content.js'),
        background: resolve(__dirname, 'src/background/background.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'popup') {
            return 'popup/popup.js';
          }
          return '[name].js';
        },
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    copyPublicDir: true
  },
  publicDir: 'public'
});
