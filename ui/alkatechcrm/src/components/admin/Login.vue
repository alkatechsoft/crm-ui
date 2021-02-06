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
          <b-card class="bg-light">
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
                      <b-nav-item to="link1">Forget Password </b-nav-item>
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
          <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
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
  data() {
    axios.defaults.headers.common['Authorization'] =''; 

    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
      isAuth: false,
    };
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
            this.$router.push("/clients");
          } else if (response.data.response_code === "401") {
            this.isAuth = true;
            this.$router.push("/admin");

            console.log(response.data.response_code);
          }
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
  border-radius: 30px;
  border: 2px solid #3e3ebb;
  outline: none;
  white-space: nowrap;
  font-weight: 500;
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
.text-float {
}
</style>














 
        


     