<template>
<div>
 <h1>file upload</h1>
 <input name="upload_excel" type="file" @change="onFileSelected" />
<b-button @click="onUpload">upload</b-button>
</div>
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
















