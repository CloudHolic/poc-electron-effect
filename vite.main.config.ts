import {defineConfig} from "vite";
import path from "path";
import {builtinModules} from "module";

export default defineConfig({
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, './src/main'),
      '@preload': path.resolve(__dirname, './src/preload'),
      '@renderer': path.resolve(__dirname, './src/renderer')
    }
  },
  build: {
    outDir: path.resolve(__dirname, './.vite/build'),
    sourcemap: 'inline',
    minify: process.env.MODE === 'production',
    lib: {
      entry: path.resolve(__dirname, './src/main/main.ts'),
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
        ...builtinModules.flatMap(m => [m, `node:${m}`]),
      ],
      output: {
        entryFileNames: '[name].js'
      }
    },
    assetsInlineLimit: 0,
    emptyOutDir: true
  }
});