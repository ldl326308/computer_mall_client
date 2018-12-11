import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./components/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('./components/main.vue')
    },
    {
      path: '/info', 
      name: 'info',
      component: () => import('./components/computer-info.vue')
    }
  ]
})
