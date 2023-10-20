import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PageView1.vue'

const createRoutes = (baseUrl: string) => {
  return createRouter({
    history: createWebHistory(baseUrl),
    routes: [
      {
        path: '/goods/page1',
        name: 'page1',
        component: HomeView
      },
      {
        path: '/goods/page2',
        name: 'page2',
        component: () => import('../views/PageView2.vue')
      }
    ]
  })
}

export default createRoutes
