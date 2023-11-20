import { createRouter, createWebHistory } from 'vue-router'
// import PageNotFound from '@/views/PageNotFound.vue'

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
        component: () => import('@/views/permission/Index.vue'),
        children: [
          {
            path: 'role',
            name: 'role',
            component: () => import('@/views/Role.vue')
          }
        ]
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('@/views/customer/Index.vue')
      }
      // { path: '/:pathMatch(.*)*', name: 'notFound', component: PageNotFound }
    ]
  })
  return router
}

export default createRoutes
