<template>
  <div>
      <b-container>
    <b-form  @submit.stop.prevent>
      <label for="feedback-email">Email</label>
      <b-form-input v-model="email" @keyup="emailvalidatoin" id="feedback-email"></b-form-input>
      <b-form-invalid-feedback >
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback  @keyup="emaiSearch">
        Looks Good.
      </b-form-valid-feedback>
     
      <!-- <label for="feedback-email">password</label>
      <b-form-input v-model="password" :state="passwordValidation" id="feedback-email"></b-form-input>
      <b-form-invalid-feedback :state="passwordValidation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="passwordValidation">
        Looks Good.
      </b-form-valid-feedback> -->
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
        emailValid:false,
        passwordValid:false
      }
    },
    methods:{
        emailvalidatoin(){
            // console.log(this.emailValid);
if(this.email.length>4){
            this.emailValid=true;

}else{
            this.emailValid=false;

}
 
                if(this.emailValid){
                    var emailtest1= document.getElementById("feedback-email");
                    emailtest1.classList.add("is-valid");
                    console.log(emailtest1)
                }else{
                    var emailtest2= document.getElementById("feedback-email");
                    emailtest2.classList.remove("is-valid");
                    console.log(emailtest2)
                } 
                            // console.log(this.emailValid);
            
        },
emaiSearch(){
    //  console.log(this.email);
          if(this.email.length > 1){
         this.emailValid=1;
        //  console.log(this.emailValid)
        }
         return true

}
    } 
  }
</script>