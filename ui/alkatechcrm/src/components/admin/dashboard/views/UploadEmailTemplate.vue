 
<template>
<div>
 <b-container fluid class="mt-4">
    <b-row>
 

    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">

    <b-card class="bg-light">
     <ValidationObserver v-slot="{ handleSubmit }">
        <b-form  @submit.prevent="handleSubmit(onUploadData)" class="mt-2">
           <b-form-group id="input-group-1" label-for="input-1">
              <div class="input-container">
                 <b-form-select v-model="selected" :options="category"></b-form-select>
                 <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                 </div>
          </b-form-group>
          <ValidationProvider name="title" rules="required" v-slot="{ errors }">
         <b-form-group id="input-group-2" label-for="input-1">
              <div class="input-container">
              <b-form-input  class="input-field" id="input-1" v-model="title" type="text" placeholder="Enter title" ></b-form-input>            
              </div>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
      </ValidationProvider>
         <b-form-group id="input-group-3" label-for="input-3">
          <div class="input-container">
          <b-form-file
            class="opacity_0"
            @change="onFileSelected"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          >
          </b-form-file>
           
              </div>
              <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="danger"
                v-if="fileFormateError"
              >
                <span variant="secondary" class="text-float"
                  >Please upload email template (.html file only)
                </span></b-alert
              >
         </b-form-group>
               <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="success"
                v-if="isUploaded"
              >
                <span variant="success" class="text-float"
                  > <i class="fa fa-smile" /> Uploaded Succesfully
                </span></b-alert
              >
          <b-form-group id="submit-template"  label-for="submit-template">
          <b-button class="ripple" type="submit" variant="primary"> Submit  
          </b-button>
          </b-form-group>
        </b-form>
    </ValidationObserver>
    </b-card>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">selected: {{ selected }} template: {{template}} title:{{ title }}  category:{{ category }}</pre>
    </b-card> -->
    </b-col>
    
      </b-row>
   </b-container>
   </div>
</template>

<script>
// import Vue from 'vue'

import axios from 'axios';


// axios.defaults.withCredentials = true;

  export default {
      name:'UploadEmailTemplate',
    data() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 
      return {
       selected: 0,
       template:null,
       title:null,
       fileFormateError: false,
       isUploaded:false,
        category: [
          { value: null, text: 'Category not available' }
        ]
      }
    },
      mounted() {
      // Set the initial number of items
        this.axios.post('http://localhost:8080/lcrm-api/mtk-list-parent-category').then((response)=>{
         if(response.data.response_code === 200){
          console.log('categrylist', response.data.response_body);
         let getData = response.data.response_body.map((data) => ({ value: data.id, text: data.category_name }));
        this.category=getData;
        console.log(getData.length);
         }else{
           console.log('error', response.data.response_body)
         }
        })
    },
    methods: {
       onFileSelected(event){
       this.fileFormateError = false;

      alert('file selected')
      console.log(event);
      this.template=event.target.files[0]
      console.log(this.template)
      },
      onUploadData() {
        alert('submiited')
        console.log('onsubit..')
        const formData = new FormData();
        formData.append("template", this.template, this.template.name);

if (this.template.name.split(".").pop() !== "html") {
        this.fileFormateError = true;
        console.log("fileFormateError:", this.fileFormateError);
        console.log("extension is: ", this.selectedFile.name.split(".").pop());
      } else{
        this.fileName = false;
      
        formData.append("title", this.title);
        formData.append("categories", this.selected);
        console.log('mmmmm',formData)
        this.axios.post('http://localhost:8080/lcrm-api/mtk-register-mail-template-file', formData).then((response)=>{
           console.log('responce : ',response.data.response_code)
         if(response.data.response_code === 200){
           console.log(Response.data.response_body)
            this.isUploaded=true
           alert('vbvbvb')

         }else{
           alert('asas')
            this.isUploaded=true

         }
        })
       }
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
.text-float{
}
</style>














 
        


     