import { h, createApp } from 'vue'
// import { createPinia } from 'pinia'
import { vueBridge } from '@garfish/bridge-vue-v3'

import App from './App.vue'
import createRoutes from './router'

export const provider = vueBridge({
  rootComponent: App,
  appOptions: ({ basename }) => ({
    el: '#app',
    render: () => h(App),
    router: createRoutes(basename)
  }),
  handleInstance: (vueInstance, { basename, appName, props }) => {
    console.log(basename, appName, props)
    // vueInstance.provide
    // vueInstance.use(router)
    // vueInstance.provide(stateSymbol, createState());
  }
})

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.mount('#app')
}
