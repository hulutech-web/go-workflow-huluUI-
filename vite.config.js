import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_API_URL } = env;
  
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等      
        imports: ['vue'],
      }),
    ],
    // 别名
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})

