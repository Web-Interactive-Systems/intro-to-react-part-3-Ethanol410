import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

const isDev = process.env.NODE_ENV === 'development';

console.log('isDev', isDev);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    drop: isDev ? [] : ['console', 'debugger']
  },
  build: {
    minify: isDev ? false : 'esbuild'
  }
})
