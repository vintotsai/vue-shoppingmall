// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from 'vuex'
import {store} from './store'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'
import 'font-awesome/css/font-awesome.min.css'

import VueLazyload from 'vue-lazyload'

import infiniteScroll from 'vue-infinite-scroll'

import {currency} from './util/currency'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'



Vue.config.productionTip = false

// Vue.use(VueLazyload) // 图片加载前动画
Vue.use(VueLazyload,{
  loading: './../static/loading-svg/loading-bars.svg'
})

// 滚动加载
Vue.use(infiniteScroll)

// elm ui
Vue.use(ElementUI)

// Vue.use(Vuex)

// 定义全局过滤器
Vue.filter("currency",currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
