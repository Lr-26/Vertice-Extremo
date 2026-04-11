import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.VERCEL ? '/' : '/vertice-extremo/',
    plugins: [react()],
    server: {
        hmr: {
            overlay: true
        },
        port: 5176,
        proxy: {
            '/api': {
                target: 'http://localhost:5002',
                changeOrigin: true
            }
        }
    }
})
