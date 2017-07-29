<template>
  <section class="login">
    <div class="form" @keyup.enter="doLogin">
      <p class="icon">
        <i class="fa fa-fire fa-2x"></i>
      </p>
      <p class="input">
        <i class="fa fa-user fa-fw"></i>
        <input id="userName"
               type="text"
               name="userName"
               placeholder="用户名"
               v-model.trim="name"
        >
      </p>
      <p class="input">
        <i class="fa fa-key fa-fw"></i>
        <input id="password"
               type="password"
               placeholder="密码"
               v-model.trim="pwd"
        >
      </p>
      <p class="info">{{info}}</p>
      <p>
        <button @click="doLogin()">登陆
        </button>
      </p>
    </div>
  </section>
</template>

<script>
// import Counter from './Counter'

export default {
  name: 'hello',
  components:{
    
  },
  data () {
    return {
      info:'',
      name:'',
      pwd:''
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
