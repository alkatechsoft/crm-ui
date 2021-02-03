<template>
 <b-container fluid class="mt-2">
    <b-row>
    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">
<b-card>
  <b-card-body>
    <b-form-group>
      <i class="fa fa-upload upload" aria-hidden="true"></i>

 <!-- <input name="upload_excel" type="file" @change="onFileSelected" /> -->




 <b-form-file
 class="opacity_0"
      @change="onFileSelected"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
  </b-form-group>
            <b-form-group size="lg" class="mt-2">
            <b-button class="btn btn-primary" @click="onUpload">upload</b-button>
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
        selectedFile: null
      }
    },
    methods:{
      onFileSelected(event){
      console.log(event);
      this.selectedFile=event.target.files[0]
      },
      onUpload(){
      const fileData = new FormData();
        fileData.append("upload_excel", this.selectedFile, this.selectedFile.name);
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
 }
 .custom-file-label{
cursor: pointer !important;
 }
 .upload{
   font-size: 45px;
    color: #330a75;
    cursor: pointer;
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
</style>
















