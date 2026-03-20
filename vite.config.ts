import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  // সরাসরি রিপোজিটরি পাথ দিয়ে দেওয়া হলো যেন কোনো কনফিউশন না থাকে
  base: '/moinul-portfolio4/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})