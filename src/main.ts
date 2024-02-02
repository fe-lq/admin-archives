import { h, createApp } from 'vue'
import { vueBridge } from '@garfish/bridge-vue-v3'

import App from './App.vue'
import createRoutes from './router'
import './scss/element.scss'

export const provider = vueBridge({
  rootComponent: App,
  appOptions: () => {
    return {
      el: '#app',
      render: () => h(App)
    }
  },
  handleInstance: (vueInstance, { basename, appName }) => {
    console.log(basename, appName)
    vueInstance.use(createRoutes(basename))
  }
})

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.use(createRoutes('/archives'))
  app.mount('#app')
}
