import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '@/views/no-page/Index.vue'

const createRoutes = (baseUrl: string) => {
  const router = createRouter({
    history: createWebHistory(baseUrl),
    routes: [
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/users/Index.vue')
      },
      {
        path: '/permission',
        name: 'permission',
        component: () => import('@/views/permission/Index.vue')
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('@/views/customer/Index.vue')
      },
      {
        path: '/error',
        component: PageNotFound
      },
      {
        path: '/:matchAll(.*)',
        redirect: 'error'
      }
    ]
  })
  return router
}

export default createRoutes
