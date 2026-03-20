import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  base: './', // এটি নিশ্চিত করবে যে তোমার সাইট সব প্ল্যাটফর্মে সঠিকভাবে লোড হবে
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})