<template>
<div>
 <b-container fluid>
    <b-row>
    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">
    <b-card class="bg-light">
    <img alt="ethancoder logo" src="./../../assets/alkatech.png">

        <b-form @submit="onSubmit"  class="mt-2">
          <b-form-group id="input-group-1" label-for="email-check">
              <div class="input-container">
              <i class="fa fa-envelope icon" style=""></i>
              <b-form-input  class="input-field" id="email-check" @keyup="emailvalidation" v-model="form.email" type="email" placeholder="Enter Form1 email" required></b-form-input>
                <b-form-invalid-feedback >
                Your user ID must be 5-12 characters long.
                </b-form-invalid-feedback>
                <!-- <b-form-valid-feedback>
                Looks Good.
                </b-form-valid-feedback> -->
              </div>
          </b-form-group>

          <b-form-group id="input-group-2"   label-for="input-2">
              <div class="input-container">
                <i class="fas fa-lock icon"></i>
                <b-form-input class="input-field" id="input-2" v-model="form.password" type="password" placeholder="Enter Form1 password" required></b-form-input>
              </div>
          </b-form-group>
          <b-button class="ripple" type="submit" variant="primary">Submit</b-button>
        </b-form>
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
  export default {
      name:'Login',
    data() {
      return {
        form: {
        email: '',
        password: '',
        emailValid:false,
        passwordValid:false
        } 
      }
    },
    methods: {
        emailvalidation(){
        console.log(this.emailValid)
            
            if(this.form.email.length>4){
            this.emailValid=true;
            console.log(this.emailValid)

            }else{
            this.emailValid=false;
            }
            if(this.emailValid){
                document.getElementById("email-check").classList.add("is-valid");
            }else{
                document.getElementById("email-check").classList.remove("is-valid");
            } 
            // console.log(this.emailValid);
        },
      onSubmit(event) {
        event.preventDefault();
       var obj = { email: this.form.email, password: this.form.password};
        alert(JSON.stringify(obj))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        // this.show = false
        // this.$nextTick(() => {
        //   this.show = true
        // })
      }
    }
  }
</script>

<style scoped>

.card{
      border: 0px solid rgba(0,0,0,.125);
}
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.5rem;
    background: white;
    box-shadow: 0px 2px 10px 0px #888;
    border-radius: inherit;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
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
  .icon{
    border-radius: 0.25rem 0rem 0rem 0.25rem;
    padding: 10px;
    background: #ff357e;
    color: white;
    min-width: 14%;
    text-align: center;
     } 
  .input-container {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}
.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 0rem 0.25rem 0.25rem 0rem;
}
</style>














 
        


     