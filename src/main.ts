import { h, createApp } from 'vue'
// import { createPinia } from 'pinia'
import { vueBridge } from '@garfish/bridge-vue-v3'

import App from './App.vue'
import createRoutes from './router'

export const provider = vueBridge({
  rootComponent: App,
  appOptions: () => {
    return {
      el: '#app',
      render: () => h(App)
    }
  },
  handleInstance: (vueInstance, { basename, dom, appName, props, appRenderInfo }) => {
    console.log(basename, dom, appName, props, appRenderInfo)
    vueInstance.use(createRoutes(basename))
    // vueInstance.provide(stateSymbol, createState());
  }
})

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.use(createRoutes('/archives'))
  app.mount('#app')
}
