import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
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
  },
  {
    path: '/collection',
    component: () => import('@/views/Collection')
  },
  {
    path: '/sendhouse',
    component: () => import('@/views/SendHouse')
  },
  {
    path: '/published',
    component: () => import('@/views/Published')
  },
  {
    path: '/details',
    component: () => import('@/views/HouseDetails')
  },
  {
    path: '/xiaoqu',
    component: () => import('@/views/SendHouse/components/xiaoqu')
  }
]

const router = new VueRouter({
  routes
})

export default router
