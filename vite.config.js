import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Update the base path if deploying to a subfolder (e.g., GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: '/AlvisoPortfolio/',
});
