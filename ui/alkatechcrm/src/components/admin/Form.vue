<template>
  <div>
      <b-container>
    <b-form  @submit.stop.prevent>
      <label for="feedback-user">Email</label>
      <b-form-input v-model="email" :state="emailValidation" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="emailValidation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="emailValidation">
        Looks Good.
      </b-form-valid-feedback>
     
      <label for="feedback-user">password</label>
      <b-form-input v-model="password" :state="passwordValidation" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="passwordValidation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="passwordValidation">
        Looks Good.
      </b-form-valid-feedback>
     </b-form>
      </b-container>
  </div>
</template>

<script>
   
//   const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  export default {
      name:'Form',
    data() {
      return {
        email: '',
        password: '',
        emailValid:'',
        passwordValid:''
      }
    },
    methods:{
emaiSearch(){
    
}
    },
    computed: {
      emailValidation() {
        return this.email.length > 4 && this.email.length < 13
      },
        passwordValidation() {
        return console.log(this.password.split('@'))
      }
    }
  }
</script>