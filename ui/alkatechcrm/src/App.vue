<template>
  <div id="app">
    <!-- <Header />
    <Sidebar /> -->
    <Dashboard />
<router-view></router-view>

  </div>
</template>

<script>
// import Login from './components/admin/Login.vue'
// import Sidebar from './components/admin/dashboard/Sidebar.vue'
// import Header from './components/admin/dashboard/Header.vue'
import Dashboard from './components/admin/dashboard/Dashboard.vue'







export default {
  name: 'App',
  components: {
  Dashboard
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px; */
}
</style>
 