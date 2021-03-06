<template>
  <div>
    <b-container fluid>
       
      <b-row>
        <b-col
          offset-lg="4"
          offset-md="3"
          offset-sm="3"
          lg="4"
          md="6"
          sm="6"
          offset="1"
          cols="10"
        >
<b-card v-if="true" class="bg-light">
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form  @submit.prevent="handleSubmit(updatePwd)" >
    <p><b>Update Password Along with OTP we send to your email address email :{{email}}</b></p>
      <ValidationProvider
                  name="otp"
                  rules="required"
                  v-slot="{ errors }"
                >
              <b-form-group id="input-group-otp" label-for="otp">
                      <div class="input-container">
                        <b-form-input
                          class="input-field"
                          id="otp-field"
                          v-model="form.otp"
                          @input="otpValidate"
                          type="text"
                          placeholder="Enter otp"
                        ></b-form-input>
                      </div>
                    <span class="text-float">{{ errors[0] }}</span>

              </b-form-group> 

      </ValidationProvider>
             <ValidationProvider
                  name="New Password"
                  vid="confirmPassword"
                  rules="required"
                  v-slot="{ errors }"
                >
              <b-form-group id="input-group-1" label-for="input-1">
                      <div class="input-container">
                        <b-form-input
                          class="input-field"
                          id="forget-password"
                          v-model="confirmPassword"
                          type="password"
                          placeholder="Enter New Password"
                        ></b-form-input>
                      </div>
                    <span class="text-float">{{ errors[0] }}</span>
              </b-form-group> 
      </ValidationProvider>
				
       <ValidationProvider
                  name="password"
                  rules="confirmed:confirmPassword"
                  v-slot="{ errors }"
                >
              <b-form-group id="input-group-1" label-for="input-1">
                      <div class="input-container">
                          <b-form-input
                          vid="confirmation"
                          class="input-field"
                          id="forget-password"
                          v-model="form.password"
                           type="password"
                          placeholder="Confirm Password"

                        ></b-form-input>  
                       
                          
                      </div>

                    <span class="text-float">{{ errors[0] }}</span>
                    <span class="text-float" v-if="isInValidOtp"> Invalid Otp</span>
               </b-form-group> 
               <!-- <b-form-group>  -->
              
              <a @click="resendOtp" class="pull-right resend-otp " variant="danger" v-bind:class="{ activeOpacity: isResendOtpLoading }" style="float:left !important; cursor:pointer; text-decoration: none; color:red; font-weight:bold ">
                    <b-spinner class="ml-2" v-if="isResendOtpLoading" small></b-spinner>
                Resend otp</a>
                <span v-if="resendOtpMsg">otp send successfully</span>
               <!-- </b-form-group>  -->


      </ValidationProvider>
        <b-button type="submit" size="sm"  class="btn btn-primary btn-block" v-bind:class="{ activeOpacity: isLoading }">Update Password
                    <b-spinner class="ml-2" v-if="isLoading" small></b-spinner>
        </b-button>
</b-form>
</ValidationObserver>
</b-card>
    <forget-password   v-if="showForgetPassword"/>
 
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import Vue from 'vue'

import axios from "axios";

axios.defaults.withCredentials = true;

export default {
  name: "Login",
  props: ['email'],
  data() {
    axios.defaults.headers.common['Authorization'] =''; 
    return {
      form: {
        email: this.email,
        password: "",
        otp:"",
      },
      isLoading: false,
      isResendOtpLoading: false,
      resendOtpMsg:false,
      isAuth: false,
      isInValidOtp:false,
      confirmPassword:"",
      showForgetPassword:false
    };
  },
  methods: {
    updatePwd(){
      this.isLoading = true;
        this.axios
        .post("http://localhost:8080/lcrm-api/reset-password", 
        this.form)
        .then((response) => {
              this.isLoading = false;
           if (
            response.data.response_code === 200){
              this.isInValidOtp = false
              location.reload()
              this.$router.push("/admin");
            }else{
              this.isInValidOtp =  true
            }
           console.log(response)
        });
    },
    resendOtp(){
        this.isResendOtpLoading = true;
        this.axios
        .post("http://localhost:8080/lcrm-api/forget-password", 
        { email: this.form.email } 
        )
        .then((response) => {
              this.isResendOtpLoading = false
           if (response.data.response_code === 200){
              this.isInValidEmail = false
              this.isOtpSend = false
              this.showUpdatePassword =true
              this.resendOtpMsg = true
            }else{
              this.isInValidEmail = true
              // this.isOtpSend = true
              this.isOtpSend = true
              this.showUpdatePassword =false

            }
           console.log(response)
        });
    
    },
    otpValidate() {
      this.isInValidOtp = false
      this.resendOtpMsg=false
    },
    authUpdate() {
      this.isAuth = false;
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.card {
    border: 0px solid rgba(0, 0, 0, 0.125);
    top: 30%;
  }
  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.5rem;
    background: white;
    box-shadow: 0px 2px 10px 0px #888;
    border-radius: inherit;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
  
  /*Create ripple effec*/
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
    transition: transform 0.5s, opacity 1s;
  }
  
  .ripple:active:after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }
  
  /* btn styles */
  .btn {
    background-color: #3e3ebb;
    color: #fff;
    min-width: 160px;
    font-size: 1.1rem;
    padding: 4px 12px;
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
    font-weight: 400;
    vertical-align: middle;
    margin: 0px;
    box-shadow: 0 0 2px -2px rgba(29, 39, 231, 0.1),
      0 0 3px 0 rgba(29, 39, 231, 0.1), 0 0 5px 0 rgba(29, 39, 231, 0.1),
      0 2px 2px -4px rgba(29, 39, 231, 0.1), 0 4px 8px 0 rgba(29, 39, 231, 0.1),
      0 2px 15px 0 rgba(29, 39, 231, 0.1);
  }
  .btn:hover {
    background-color: #131bb4;
    border-color: #131bb4;
    color: #fff;
  }
  .button.btn.ripple.btn-secondary:focus {
    background: #1d27e7;
  }
  .icon {
    border-radius: 0.25rem 0rem 0rem 0.25rem;
    padding: 10px;
    background: #ff357e;
    color: white;
    min-width: 14%;
    text-align: center;
  }
  .input-container {
    text-align: left;
    display: flex;
    width: 100%;
    margin-bottom: 5px;
  }
  .input-field {
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 0rem 0.25rem 0.25rem 0rem;
  }
  .activeOpacity{
  opacity: .5;
  }
  
</style>














 
        


     