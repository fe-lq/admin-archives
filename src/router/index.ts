import { createRouter, createWebHistory } from 'vue-router'
import Users from '@/views/users/Index.vue'
import Permission from '@/views/permission/Index.vue'
import Customer from '@/views/customer/Index.vue'

const createRoutes = (baseUrl: string) => {
  const router = createRouter({
    history: createWebHistory(baseUrl),
    routes: [
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/permission',
        name: 'permission',
        component: Permission
        // component: () => import('@/views/permission/Index.vue')
      },
      {
        path: '/customer',
        name: 'customer',
        component: Customer
        // component: () => import('@/views/customer/Index.vue')
      }
    ]
  })
  return router
}

export default createRoutes
