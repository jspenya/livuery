<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <b-button variant="success">
      Hello, world!
    </b-button>
    <div class="row">
      <div class="col-md-6">1st col</div>
      <div class="col-md-6">2nd col</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
