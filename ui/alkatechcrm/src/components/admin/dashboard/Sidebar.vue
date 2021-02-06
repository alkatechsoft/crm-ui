<template>
  <div>
    <b-sidebar id="sidebar-backdrop" title="" :backdrop-variant="variant" backdrop shadow>
        <template #default="{hide}">
              <b-navbar-brand href="#">    
                <img alt="alkatech logo" src="./../../../assets/alkatech.png">
              </b-navbar-brand>
              
            <div class="px-3 py-2">
              <!-- <b-form-group label="Backdrop variant" label-for="">
                <b-form-select id="backdrop-variant" v-model="variant" :options="variants"></b-form-select>
              </b-form-group> -->
                <nav class="mb-3 s-sidenav-text">
                  <hr>
                  <b-nav vertical>
                    <b-nav-item to="clients" @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; Clients </b-nav-item>
                    <b-nav-item to="bulk-register" @click="hide"><i class="fa fa-file-excel" /> &nbsp; &nbsp; Bulk Registration </b-nav-item>
                    <b-nav-item to="email-temp" @click="hide"><i class="fa fa-upload" /> &nbsp; &nbsp; Email Template </b-nav-item>
                    <b-nav-item @click="logout"><i class="fa fa-user" /> &nbsp; &nbsp; Logout </b-nav-item>
                  </b-nav>
                </nav>
              
            </div>
        </template >
    </b-sidebar> 
  </div>
</template>

<script>
  export default {
    name:'Sidebar',
    data() {
      return {
        variant: 'dark',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ]
      }
    },
    methods:{
    logout(){
    localStorage.removeItem('token')
    this.$localStorage.token = ''
    console.log('on logout tokennnnnnn',this.$localStorage.token)

    this.$router.push('/admin')
    // console.log(window.location.href)
    // location.reload();
  }
 
    }
  }
</script>
<style scoped>
.s-sidenav-text{
  text-align: left;
}

  .s-fix-bottom-pposition{
    position: fixed;
    bottom:0;
    left:0;
  }
</style>