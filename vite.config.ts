import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// 修复storybook环境下的 DevTools 插件加载
const isStorybookProcess = process.env.npm_lifecycle_event === 'storybook' || process.env.npm_lifecycle_event === 'sb'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 库模式构建（打包到 dist）
  if (mode === 'lib') {
    return {
      plugins: [
        vue(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        lib: {
          entry: fileURLToPath(new URL('./include/index.ts', import.meta.url)),
          name: 'cosmo-lib',
          formats: ['es', 'cjs'],
          fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.js'),
        },
        rollupOptions: {
          external: ['vue', 'pinia', 'vue-router'],
          output: {
            globals: {
              vue: 'Vue',
              pinia: 'Pinia',
              'vue-router': 'VueRouter',
            },
          },
        },
      },
    }
  }

  // 开发模式（应用运行）
  return {
    plugins: [
      // 自动根据 src/pages 生成路由，并输出类型到 src/typed-router.d.ts
      VueRouter({
        routesFolder: 'src/pages',
        dts: 'src/typed-router.d.ts',
      }),
      vue(),
      !isStorybookProcess && vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
