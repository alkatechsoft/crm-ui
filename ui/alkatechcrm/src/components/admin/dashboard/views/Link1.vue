<template>
<div>
 <b-container fluid>
    <b-row>
 

    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">

    <b-card class="bg-light">
    <ValidationObserver v-slot="{ handleSubmit }">
        <b-form  @submit.prevent="handleSubmit(onSubmit)" class="mt-2">
        <ValidationProvider name="fname" rules="required|alpha" v-slot="{ errors }">
         <b-form-group id="u-f-namne-group" label-for="u-f-name">
              <div class="input-container">   
              <b-form-input  class="input-field" id="u-f-name" v-model="form.fname" type="email" placeholder="Enter First Name" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
       </ValidationProvider>
        <ValidationProvider name="lname" rules="required|alpha" v-slot="{ errors }">
         <b-form-group id="u-l-name-group" label-for="u-l-name">
              <div class="input-container">
              
              <b-form-input  class="input-field" id="u-l-name" v-model="form.lname" type="email" placeholder="Enter Last Name" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
      </ValidationProvider>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
         <b-form-group id="u-email-group" label-for="u-email">
              <div class="input-container">
              
              <b-form-input  class="input-field" id="u-email" v-model="form.email" type="email" placeholder="Enter email" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
      </ValidationProvider>
        <ValidationProvider name="contact" rules="required|email" v-slot="{ errors }">
         <b-form-group id="u-contact-group" label-for="u-contact">
              <div class="input-container">
              
              <b-form-input  class="input-field" id="u-contact" v-model="form.contact" type="email" placeholder="Enter Contact" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
      </ValidationProvider>
        <ValidationProvider name="company" rules="required" v-slot="{ errors }">
         <b-form-group id="u-company-group" label-for="u-company">
              <div class="input-container">
              
              <b-form-input  class="input-field" id="u-company" v-model="form.company" type="email" placeholder="Enter Company/ Brand Name" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
      </ValidationProvider>
          <b-button class="ripple" type="submit" variant="primary">Submit</b-button>

        </b-form>
    </ValidationObserver>
    </b-card>

    </b-col>
    
      </b-row>
   </b-container>
   </div>
</template>



<script>
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  export default {
      name:'Login',
    data() {
      return {
        form: {
          fname: '',
          lname:'',
          email:'',
          contact:'',
          company:'' 
        }
      }
    },
    methods: {
      onSubmit() {
        alert(JSON.stringify(this.form))
      },
 
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>


<style>

</style>