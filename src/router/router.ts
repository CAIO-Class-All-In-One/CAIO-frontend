import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import register from '../Login/UserRegister.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'register',
      component: register
    }
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  router.beforeEach((to,from,next) => {
    if (to.path === '/self_upload'){
      const user = localStorage.getItem('user')
      if(!user) return next('/')
    }
    next()
  })
  
  export default router