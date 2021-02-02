<template>
  <div>
  <Header />
  <Sidebar />
  </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
export default {
name:"Dashboard",
components:{
    Header,
    Sidebar
}
}
</script>

<style>

</style>