<template>
 <b-container fluid class="mt-2">
    <b-row>
    <b-col offset-lg="4" offset-md="3" offset-sm="3" lg="4" md="6" sm="6" offset="1" cols="10">
<b-card>
  <b-card-body>
    <b-form-group>
 <input name="upload_excel" type="file" @change="onFileSelected" />
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
















