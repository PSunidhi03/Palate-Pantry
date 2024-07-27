import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'], // Allow access to the parent directory
    },
    // Optionally set a different root directory if needed
    root: '.', // The root directory for the project
  },
})
