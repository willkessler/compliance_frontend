import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
  build: {
    rollupOptions: {
      external: [
        /.*~/,  // Ignore Emacs backup files
        /^#.*#$/  // Ignore Emacs autosave files
      ]
    }
  }
});
