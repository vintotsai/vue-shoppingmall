<template>
  <div class="hello">
    <h2>{{msg}}</h2>
    <p>Parent:{{parentnum}}</p>
    <Counter v-bind:num="parentnum" v-on:inc="increament" v-on:dec="decreament"></Counter>
  </div>
</template>

<script>
import Counter from './Counter'

export default {
  name: 'hello',
  components:{
    Counter
  },
  data () {
    return {
      parentnum:10,
      msg:'Hello.vue'
    }
  },
  methods:{
    increament(){
      this.parentnum++
    },
    decreament(){
      this.parentnum--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.hello{
  border: 1px solid grey;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
