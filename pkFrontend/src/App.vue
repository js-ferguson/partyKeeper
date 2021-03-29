<template>
  <div id="app">
    <nav-component/>
    <router-view/>
  </div>
</template>

<script>
import NavComponent from './components/NavComponent.vue'
export default {
  components: { NavComponent },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
