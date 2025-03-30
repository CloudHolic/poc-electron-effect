import {defineConfig} from "vite";
import path from "path";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, './src/main'),
      '@preload': path.resolve(__dirname, './src/preload'),
      '@renderer': path.resolve(__dirname, './src/renderer')
    }
  },
  root: path.resolve(__dirname, './src/renderer'),
  publicDir: path.resolve(__dirname, './src/renderer/public'),
  build: {
    outDir: path.resolve(__dirname, './.vite/build/renderer'),
    chunkSizeWarningLimit: 1024,
    sourcemap: process.env.MODE !== 'production',
    minify: process.env.MODE === 'production',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/renderer/index.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          // vendor: ['zustand', '@effect/io', '@effect/data']
        }
      }
    },
    assetsInlineLimit: 0,
    emptyOutDir: false
  },
  optimizeDeps: {
    exclude: ['electron']
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    postcss: './postcss.config.js'
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});