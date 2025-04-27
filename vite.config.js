import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 10000,
    host: '0.0.0.0',
    allowedHosts: [
      'mytodolist-0p3e.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  },
  server: {
    port: 10000,
    host: '0.0.0.0'
  }
})
