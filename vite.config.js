import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 别名
  resolve: {
    alias: {
      '@': '/src'
      }
    }
})
