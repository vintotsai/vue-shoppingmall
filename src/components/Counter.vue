<template>
  <div>
    <button @click="increase">+</button>
    <button v-on:click="decrease">-</button>
    <p>
      <span>{{num}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props:["num"],
  data() {
    return {}
  },
  methods: {
    increase() {
      this.$emit("inc")
    },
    decrease() {
      if (!this.num <= 0) this.$emit("dec");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
