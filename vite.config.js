import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'), // ✅ SADE VE DOĞRU
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: chunkInfo =>
          chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
        assetFileNames: assetInfo =>
          assetInfo.name?.endsWith('.html')
            ? '[name].[ext]'
            : 'assets/[name]-[hash][extname]',
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({ sort: 'mobile-first' }),
  ],
}));
