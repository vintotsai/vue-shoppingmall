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
               v-model.trim="userName"
        >
      </p>
      <p class="input">
        <i class="fa fa-key fa-fw"></i>
        <input id="password"
               type="password"
               placeholder="密码"
               v-model.trim="userPwd"
        >
      </p>
      <p class="info">{{info}}</p>
      <p>
        <button @click="doLogin">登 录
        </button>
      </p>
    </div>
  </section>
</template>
<script>
  // import {mapActions} from 'vuex'
  // import {set}  from './../assets/js/cookieUtil'
  import axios from 'axios'

  export default{
    data(){
      return {
        userName: '',
        userPwd: '',
        info: ''
      }
    },
    methods: {
      doLogin(){
        if (!this.userName.length) return this.info = '请输入正常的用户名!'
        if (!this.userPwd.length) return this.info = '请输入正常的密码!'
        axios.post('/users/login',{userName:this.userName,userPwd:this.userPwd}).then((response)=>{
          let res = response.data;
          if(res.status == '1'){
            this.info = res.msg;
          }else{
            if(res.status == '0'){
              this.userName = res.result.userName
              this.$router.push({ path: 'goods' })
            }
          }
        }).catch((err)=>console.log(err.stack))
      },
      clearInfo(){
        this.info = ''
      },
      // ...mapActions(['login'])
    },
    // watch: {
    //   name: 'clearInfo',
    //   pwd: 'clearInfo'
    // }
  }
</script>
<style scoped>
  .login{
    height:800px;
  }
  .login .form{
    width: 500px;
    height: 400px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .form .icon i{
    transition: all 4s;
  }

  .form .icon i:hover{
    transform: rotate(1440deg);
  }

  .form p{
    height: 50px;
    text-align: center;
    transition: all 0.4s;
  }
  .form .info {
    margin: 10px;
    font-size: 12px;
    height: 20px;
    color: red;
  }
  .form p input{
    transition: all 0.4s;
    width: 200px;
    padding: 8px;
    border-bottom: 1px solid green;
  }
  .form p input:focus{
    width: 210px;
  }
  .form p button{
    transition: all 0.4s;
    color: black;
    border: 1px solid green;
    border-radius: 4px;
    width: 60px;
    height: 30px;
  }
  .form p button:hover{
    background-color: green;
    color: #FFF;
  }
</style>
