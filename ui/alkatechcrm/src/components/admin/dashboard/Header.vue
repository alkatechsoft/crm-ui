<template>
 
    <b-navbar class="s-nav-bg" toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">ALKATECH-CRM</b-navbar-brand>
        <b-navbar-toggle v-b-toggle.sidebar-backdrop target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-button  v-b-toggle.sidebar-backdrop class="btn ripple" type="submit" > <i class="fas fa-bars" variant="primary"></i> </b-button>
        </b-navbar-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
                <em><i class="fa fa-user" /></em>
            </template>
             <b-dropdown-item href="#">Profile</b-dropdown-item>
             <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import axios from 'axios';
export default {
name:'Header',
methods:{
  data(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    if(localStorage.removeItem('token')){
    this.$router.push('/admin')

    }
  },
  logout(){
    localStorage.removeItem('token')
    this.$router.push('/admin')
    console.log(window.location.href)
    location.reload();
  }
  //  computed: {
  //   abcd : function(){
  //     return this.$router.push('/admin')
  //   }
  // }
}
}
 
// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
//   document.getElementById("main").style.marginLeft = "250px";
// }

// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft= "0";
// }




</script>
<style scoped>
.s-nav-bg{
        background-color: #330a75!important;
}
.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: .3;
  transition: 0s;
}

/* btn styles */
.btn {
  background-color: #3e3ebb;
  color: #fff;
  font-size: 1.3rem;
  padding: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
  border: 2px solid #3e3ebb;
  outline: none;
  white-space: nowrap;
  font-weight: 500;
  vertical-align: middle;
  margin: 0px;
  box-shadow: 0 0 2px -2px rgba(29, 39, 231, .1),
    0 0 3px 0 rgba(29, 39, 231, .1),
    0 0 5px 0 rgba(29, 39, 231, .1),
    0 2px 2px -4px rgba(29, 39, 231, .1),
    0 4px 8px 0 rgba(29, 39, 231, .1),
    0 2px 15px 0 rgba(29, 39, 231, .1)
}
.btn:hover {
  background-color: #131BB4;
  border-color: #131BB4;
  color: #fff;
}
  .button.btn.ripple.btn-secondary:focus{
    background: #1d27e7;
  }
</style>