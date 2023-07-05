import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3009,
    hmr: {
      port:3009,
    },
    watch:{
        usePolling:true,
    }
  }
})
