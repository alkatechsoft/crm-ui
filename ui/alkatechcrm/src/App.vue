<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/ethancoder.png"> -->
    <Header />
    <Sidebar2 />
    <!-- <login /> -->
    <!-- <Header data="Alkatech crm" msg="hi from Alkatech"/> -->

  </div>
</template> 
<script>

// import Login from './components/Login.vue';
import Sidebar2 from './components/Sidebar2.vue'; 
import Header from './components/Header.vue';


export default {
  name: 'App',
  components: {
    Header,
    Sidebar2
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
}
</style>
