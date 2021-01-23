<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/ethancoder.png"> -->
     <Sidebar />
    <login />
    <Header data="Alkatech crm" msg="hi from Alkatech"/>
    <Drawer />
   

  </div> 
</template> 
<script>

import Login from './components/Login.vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';


export default {
  name: 'App',
  components: {
    Login,
    Header,
    Sidebar,
    Drawer
  }
} 
</script> 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
