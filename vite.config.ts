import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      // VueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [AntDesignVueResolver()]
      }),
      Components({
        resolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: false })]
      })
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "./src/scss/element.scss";`
    //     }
    //   }
    // },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: env.VITE_APP_FE,
    server: {
      port: 8090,
      cors: true,
      origin: env.VITE_APP_FE
    }
  })
}
