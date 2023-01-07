// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'
import App from './App'
import router from './router'
import api from './api/inter'
import './styles/index.scss'
import store from "./store";
import bus from './api/bus'

Vue.use(ElementUI)
Vue.use(Viewer)

Vue.config.productionTip = false

Vue.prototype.$ = $
Vue.prototype.$api = api;
Vue.prototype.$bus = bus;

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//requireAuth若为true则该路由需要判断是否登录
    if (sessionStorage.code) {
      next();
    }
    else {
      console.warn("localStorage.token已不存在了")
      next({//返回登录页面
        path: '/login',
      })
    }
  }
  else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
