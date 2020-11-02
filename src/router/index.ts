import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Recommend from '../application/Recommend/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/recommend',
    children: [
      {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend,
        // children: [
        //   {
        //     path: '/recommend/:id',
        //     name: 'Album',
        //     component: () => import('../application/Album/index.vue')
        //   }
        // ]
      },
      {
        path: '/singers',
        name: 'Singers',
        component: () => import('../application/Singers/index.vue')
        // children: [
        //   {
        //     path: '/singers/:id',
        //     name: 'Singer',
        //     component: () => import('../application/Singer/index.vue')
        //   }
        // ]
      },
      {
        path: '/rank',
        name: 'Rank',
        component: () => import('../application/Rank/index.vue')
        // children: [
        //   {
        //     path: '/singers/:id',
        //     name: 'Singer',
        //     component: () => import('../application/Singer/index.vue')
        //   }
        // ]
      },
    ]
  },
  {
    path: '/recommend/:id',
    name: 'Album',
    component: () => import('../application/Album/index.vue')
  },
  {
    path: '/singers/:id',
    name: 'Singer',
    component: () => import('../application/Singer/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../application/Search/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
