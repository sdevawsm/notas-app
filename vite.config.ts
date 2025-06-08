import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          // console.log('Proxy rewrite:', path)
          return path
        }
      }
    }
  }
})
