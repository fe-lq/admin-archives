import { h, createApp } from 'vue'
// import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
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
  handleInstance: (vueInstance, { basename, appName, props, appRenderInfo }) => {
    console.log(basename, appName, props, appRenderInfo)
    vueInstance.use(createRoutes(basename))
    // vueInstance.use(ElementPlus)
    // vueInstance.provide(stateSymbol, createState());
  }
})

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.use(createRoutes('/archives'))
  app.mount('#app')
}
