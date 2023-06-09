import { createRouter, createWebHistory } from 'vue-router'
import { close, start } from '~/utils/nporgress'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/login.vue'),
  },

  {
    path: '/',
    name: 'layout',
    component: () => import('~/layout/layout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('~/pages/dashboard/dashboard.vue'),
      },

      {
        path: 'user-control',
        name: 'user-control',
        component: () => import('~/pages/user-control/user-control.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由 前置守卫
router.beforeEach((to, from, next) => {
  start()
  if (to.path === '/login' || to.path === '/') {
    next()
  } else {
    if (useStore.token.value) {
      next()
    } else {
      next('/login')
    }
  }
})
// 路由 后置守卫
router.afterEach(() => {
  close()
})

export default router
