<template>
 <b-container fluid class="mt-2">
    <b-row>
    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">
<b-card>
  <b-card-body>
     <i class="fa fa-upload upload" aria-hidden="true"></i>
    <b-form-group>

 <!-- <input name="upload_excel" type="file" @change="onFileSelected" /> -->

 <b-form-file
 class="opacity_0" style="height:100px !important"
      @change="onFileSelected"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept=".csv"
    >
    </b-form-file>
    <div>
  <!-- <b-alert v-if="fileFormateError" variant="primary"><a href="#" class="alert-link">{{this.selectedFile.name}}</a></b-alert> -->
 
</div>
            <b-alert show class="elementToFadeInAndOut mt-2" variant="danger" v-if="fileFormateError"> <span variant="secondary" class="text-float" >Please upload .csv file only </span></b-alert>
            <b-alert > <span variant="secondary" class="text-float" v-if="fileFormateError">{{this.selectedFile.name}}</span></b-alert>
            <b-badge variant="success" style="padding:5px 20px" class="mt-2" v-if="fileName" ><b>selected file :</b> {{this.selectedFile.name}}</b-badge>
     <!-- <b-alert show variant="secondary">{{this.selectedFile.name}}</b-alert> -->


  </b-form-group>
            <b-form-group size="lg" class="mt-2">
            <b-button variant="primary" class="btn-block ripple" @click="onUpload">upload</b-button>
            </b-form-group>
  </b-card-body>
</b-card>
    </b-col>
</b-row>
 </b-container>
</template>










<script>
import axios from 'axios';

  export default {
    
    data() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

      return {
        selectedFile: null,
        fileName:false,
        fileFormateError:false, 
      }
    },
    methods:{
      onFileSelected(event){
      console.log(event);
      this.selectedFile = event.target.files[0];
      this.fileName = true;
      },
      onUpload(){
      const fileData = new FormData();
        fileData.append("upload_excel", this.selectedFile, this.selectedFile.name);
        console.log(fileData)
      if(this.selectedFile.name.split('.').pop()!=='csv'){
        this.fileFormateError=true;
        console.log('fileFormateError:',this.fileFormateError)
       console.log('extension is: ', this.selectedFile.name.split('.').pop())
      }
        this.axios.post('http://localhost:8080/lcrm-api/register-client-ExcelUpload', fileData ).then((response)=>{
        console.log(response);
        })
      }
    }
  }
</script>
<style scoped>
.opacity_0{
opacity: 0;
cursor: pointer !important;
right: 0%;
top:15%;
position: absolute;
}
 div.custom-file-label{
   height: 100px !important;
 }
 .custom-file-label{
cursor: pointer !important;
 }
 .upload{
   font-size: 45px;
    color: #fff;
    cursor: pointer;
    background:#3e3ebb;
    padding: inherit;
    border-radius: 100%;
    box-shadow:0px 1px 16px 0px #859294
 }
 .card{
      border: 0px solid rgba(0,0,0,.125);
      top:30%;
}
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    /* padding: 1rem; */
    background: white;
    box-shadow: 0px 2px 10px 0px #888;
    border-radius: inherit;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}
span{
  pointer-events: visible !important;
  cursor: pointer;
}
.elementToFadeInAndOut {
    -webkit-animation: fadeinout 2s linear forwards;
    animation: fadeinout 2s linear forwards;
}
div.custom-file-input{
  padding: 45px 0px !important;
}
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
.btn:hover {
  background-color: #131BB4;
  border-color: #131BB4;
  color: #fff;
}
  .button.btn.ripple.btn-secondary:focus{
    background: #1d27e7;
  }
@-webkit-keyframes fadeinout {
  0%,100% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeinout {
  0%,100% { opacity: 0; }
  100% { opacity: 1; }
}
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Browse';
  background: red !important;
}
</style>
















