import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './webapp',
  build: {
    outDir: '../dist/webapp',
    emptyOutDir: true,
  },
});
