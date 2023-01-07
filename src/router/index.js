import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'

Vue.use(Router)

// 解决重复跳转路由控制台抛异常问题
const originPush = Router.prototype.push
Router.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}

const router = new Router({
  // mode: 'history',
  base: '/vue-image-bed',
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
  ]
});

export default router
