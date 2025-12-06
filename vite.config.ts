import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 库模式构建
  if (mode === 'lib') {
    return {
      plugins: [
        vue(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        },
      },
      build: {
        lib: {
          entry: fileURLToPath(new URL('./include/index.ts', import.meta.url)),
          name: 'cosmo-lib',
          formats: ['es', 'cjs'],
          fileName: (format) => {
            if (format === 'es') return 'index.mjs'
            return 'index.js'
          }
        },
        rollupOptions: {
          external: ['vue', 'pinia', 'vue-router'],
          output: {
            globals: {
              vue: 'Vue',
              pinia: 'Pinia',
              'vue-router': 'VueRouter'
            }
          }
        }
      }
    }
  }

  // 开发模式
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
