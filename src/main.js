// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
//引入api
import api from './api/index.js'
import store from './store/store'

//import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from "vue"


// 将API方法绑定到全局
Vue.prototype.$api = api
//Vue.prototype.$axios = axios;
Vue.use(ElementUI)

Vue.config.productionTip = false
//require('./mock.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (createElement) => createElement(App),
  template: '<App/>'
})
//getMD时间管理过滤器
Vue.filter('getMD',function (input) {
  return input.split(' ')[0];
})
