import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
            return 'popup.js';
          }
          return '[name].js';
        },
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Copy public folder to dist
    copyPublicDir: true
  },
  publicDir: 'public'
});
