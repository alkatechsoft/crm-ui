<template>
  <div>
    <b-container fluid>
          <!-- showUpdatePassword: {{ showUpdatePassword }}
    isOtpSend: {{ isOtpSend }} -->
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
          <b-card v-if="isForgetpwd" class="bg-light">
            <img alt="ethancoder logo" src="./../../assets/alkatech.png" />
            <ValidationObserver v-slot="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(onSubmit)" class="mt-2">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <b-form-group id="input-group-1" label-for="input-1">
                    <div class="input-container">
                      <i class="fa fa-envelope icon" style=""></i>
                      <b-form-input
                        class="input-field"
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                      ></b-form-input>
                    </div>
                    <span class="text-float">{{ errors[0] }}</span>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  name="password"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <b-form-group id="input-group-2" label-for="input-2">
                    <div class="input-container">
                      <i class="fas fa-lock icon"></i>
                      <b-form-input
                        class="input-field"
                        id="input-2"
                        v-model="form.password"
                        @keyup="authUpdate"
                        type="password"
                        placeholder="Enter password"
                      ></b-form-input>
                    </div>
                    <span class="text-float">{{ errors[0] }}</span>
                    <span class="text-float" v-if="isAuth"
                      >Invalid credentials try again</span
                    >
                  </b-form-group>
                </ValidationProvider>
                <b-form-group id="forgot-password" label-for="forgot-password">
                  <div class="input-container">
                    <b-nav vertical>
                      <b-nav-item  @click="forgetPassword">Forget Password </b-nav-item>
                    </b-nav>
                  </div>
                  <b-button class="ripple" type="submit" variant="primary"
                    >Submit
                    <b-spinner class="ml-2" v-if="isLoading" small></b-spinner>
                  </b-button>
                </b-form-group>
              </b-form>
            </ValidationObserver>
          </b-card>

<b-card v-if="isOtpSend" class="bg-light">
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form  @submit.prevent="handleSubmit(sendOtp)" >
    <p><b>Enter your email address and we will send OTP to reset your password.</b></p>
      <ValidationProvider
                  name="Email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
              <b-form-group id="input-group-1" label-for="input-1">
                      <div class="input-container">
                        <b-form-input
                          class="input-field"
                          id="forget-password"
                          v-model="resetPassword.emailForOtp"
                          @input="validatee"
                          type="email"
                          placeholder="Enter email"
                        ></b-form-input>
                      </div>
                    <span class="text-float">{{ errors[0] }}</span>
                    <span class="text-float" v-if="isInValidEmail"> Invalid Email Address try again </span>
              </b-form-group> 
      </ValidationProvider>
				<b-button type="submit" size="sm"  class="btn btn-primary btn-block btn-radius" v-bind:class="{ activeOpacity: isLoading }"> Send Otp to Email
            <b-spinner class="ml-2" v-if="isLoading" small></b-spinner>
        </b-button>
</b-form>
</ValidationObserver>
</b-card>


          <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->

        </b-col>
      </b-row>
    </b-container>
    <update-password :email="this.resetPassword.emailForOtp" v-if="showUpdatePassword"/>
  
  </div>
  
</template>

<script>
// import Vue from 'vue'

import axios from "axios";
import updatePassword from "./updatePassword";

axios.defaults.withCredentials = true;

export default {
  name: "Login",
  
  data() {
    axios.defaults.headers.common['Authorization'] =''; 
     return {
      form: {
        email: "",
        password: "",
      },
      resetPassword: {
      emailForOtp: ""
      },
      isLoading: false,
      isAuth: false,
      isForgetpwd: true,
      isOtpSend: false,
      isInValidEmail:false,
      showUpdatePassword:false
    }
  },
  components:{
  updatePassword
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      setTimeout(() => ((this.isLoading = false), (this.isAuth = true)), 1000);
      this.axios
        .post("http://localhost:8080/lcrm-api/login", this.form)
        .then((response) => {
          if (
            response.data.response_code === 200 &&
            response.data.response_body.access_token
          ) {
            localStorage.setItem(
              "token",
              response.data.response_body.access_token
            );
            this.$localStorage.token = response.data.response_body.access_token;
            this.$localStorage.username = response.data.response_body.userData[0].username;
            // localStorage.setItem('user_name', response.data.response_body.access_token);
            console.log("on login username", this.$localStorage.username);
            this.isAuth = false;
            console.log(response);
            this.$router.push("/subscribers");
          } else if (response.data.response_code === "401") {
            this.isAuth = true;
            this.$router.push("/admin");
            console.log(response.data.response_code);
          }
        });
    },
    validatee(){
   this.isInValidEmail = false
    },
    forgetPassword(){
    this.isForgetpwd = false
    this.isOtpSend = true
    },
    sendOtp(){
        this.isLoading = true;
        this.axios
        .post("http://localhost:8080/lcrm-api/forget-password", 
        { email: this.resetPassword.emailForOtp } 
        )
        .then((response) => {
              this.isLoading = false
           if (response.data.response_code === 200){
              this.isInValidEmail = false
              this.isOtpSend = false
              this.showUpdatePassword =true
            }else{
              this.isInValidEmail = true
              // this.isOtpSend = true
              this.isOtpSend = true
              this.showUpdatePassword =false

            }
           console.log(response)
        });
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

<style lang="scss" scoped>

  @import '../../admin/../css/login.css';
.btn{
    border-radius: 30px;
} 
.btn-radius{
    border-radius: 4px;
} 
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
</style>














 
        


     