<template>
  <div>
  <Header  v-if="isLoggedIn" />
  <Sidebar v-if="isLoggedIn"  />  
  </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
export default {
name:"Dashboard",
data(){
  return{
showheader:true 
  }
},
 computed:{  
        isLoggedIn(){ 
          return this.$localStorage.token && this.$localStorage.token !== '' ; 
          }
 },
 mounted(){
    if(localStorage.getItem('token') !==''){
    // this.showheader=true;
  localStorage.setItem('headerCheack',true)
  console.log('after mount', localStorage.getItem('headerCheack'))

  }
},
components:{
    Header,
    Sidebar
}
}
</script>

<style>

</style>