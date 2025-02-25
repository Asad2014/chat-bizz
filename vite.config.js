import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Optional for dev mode
    port: process.env.PORT || 5173, // Fallback for local dev
  },
  build: {
    outDir: 'dist', // Matches Railway’s default expectation
  },
})