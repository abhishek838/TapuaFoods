import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/TapuaFoods/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false
  }
})
