import { createApp } from 'vue'
import App from './App.vue'
import createRoutes from './router'
import './scss/element.scss'

export const provider = ({ dom, basename }: any) => {
  let app: any
  return {
    render() {
      app = createApp(App)
      // 使用store时配置
      // app.provide(stateSymbol, createState())
      app.use(createRoutes(basename))
      app.mount(dom ? dom.querySelector('#app') : document.querySelector('#app'))
    },
    destroy() {
      if (app) {
        app.unmount(dom ? dom.querySelector('#app') : document.querySelector('#app'))
      }
    }
  }
}

if (!window.__GARFISH__) {
  // 非微前端环境直接运行
  const app = createApp(App)
  app.use(createRoutes('/archives'))
  app.mount('#app')
} else {
  __GARFISH_EXPORTS__.provider = provider
}
