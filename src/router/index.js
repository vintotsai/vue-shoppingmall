import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import GoodsList from './../views/GoodsList'
import Image from './../views/Image'
import Title from './../views/Title'
import Cart from './../views/Cart'



Vue.use(Router)

export default new Router({
  mode:'hash', // hash和history
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList,
      children:[
        {
          path:'image',
          name:'image',
          component:Image
        },
        {
          path:'title',
          name:'title',
          component:Title
        },
      ]
    },
    // {
    //   path: '/goodslist/:goodsId/user/:username',
    //   name: 'GoodsList',
    //   component: GoodsList
    // }, 
    {
      path:'/cart',
      name:'cart',
      component:Cart,
    }
  ]
})
