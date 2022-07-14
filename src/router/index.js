import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'search',
        component: () => import('@/views/Search')
      },
      {
        path: 'consult',
        component: () => import('@/views/Consult')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  }
]

const router = new VueRouter({
  routes
})

export default router
