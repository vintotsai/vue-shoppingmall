<template>
  <div>
     商品列表页<br>
     <span>商品ID：{{$route.params.goodsId}}</span><br>
     <span>用户：{{$route.params.username}}</span><br>
     <router-link to="/goods/title">商品标题</router-link>
     <router-link to="/goods/image">商品图片</router-link>
     <div><router-view></router-view></div>
     <router-link to="/cart">跳转到购物车</router-link><br>
     <button @click="toCart">button - 跳转到购物车</button>
  </div>
  
</template>
<script>
export default {
  name:'GoodsList',
  data(){
    return {}
  },
  methods:{
    toCart(){
      console.log(typeof this.$router)
      // this.$router.push('/cart')
      // this.$router.push({path:'/cart'})
      this.$router.push({path:'/cart?userId=123'})
    },
  }
}
</script>
<style>

</style>

