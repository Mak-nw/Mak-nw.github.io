import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { includePartials } from './vite-plugin-include.js';
import { reviewMode } from './vite-plugin-review.js';

const pages = ['index', 'about', 'catalog', 'product', 'contact', 'services', 'design-system'];

export default defineConfig({
  plugins: [
    includePartials({ root: resolve(import.meta.dirname, 'src') }),
    reviewMode({ dir: resolve(import.meta.dirname, '../review') }),
  ],
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
