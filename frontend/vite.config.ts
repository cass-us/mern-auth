import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Fixed: Added missing slashes
        changeOrigin: true, // Fixed: Typo in "changeOrigion" -> "changeOrigin"
      },
    },
  },

  
});
