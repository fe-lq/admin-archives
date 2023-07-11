import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PageView1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'page1',
      component: HomeView
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('../views/PageView2.vue')
    }
  ]
})

export default router
