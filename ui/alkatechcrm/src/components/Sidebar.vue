<template>
  <div>
    <b-sidebar id="sidebar-backdrop" title="" :backdrop-variant="variant" backdrop shadow>
        <template #default="{hide}">
              <b-navbar-brand href="#">    
                <img alt="ethancoder logo" src="../assets/alkatech.png">
              </b-navbar-brand>
              
            <div class="px-3 py-2">
              <!-- <b-form-group label="Backdrop variant" label-for="">
                <b-form-select id="backdrop-variant" v-model="variant" :options="variants"></b-form-select>
              </b-form-group> -->
                <nav class="mb-3 s-sidenav-text">
                  <hr>
                  <b-nav vertical>
                    <b-nav-item active @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; Client</b-nav-item>
                    <b-nav-item href="#link-1" @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; All Logo</b-nav-item>
                    <b-nav-item href="#link-2" @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; Another Link</b-nav-item>
                    
                  </b-nav>
                     <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">Footer</strong>
        <b-button size="sm" @click="hide">Close</b-button>
       </div>
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