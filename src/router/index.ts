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
  router.beforeEach((to, from) => {
    // ...
    console.log(to, from, '导航了')
    // 返回 false 以取消导航
    return true
  })
  return router
}

export default createRoutes
