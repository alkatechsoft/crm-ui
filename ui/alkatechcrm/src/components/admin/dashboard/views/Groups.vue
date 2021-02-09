<template>
 
   <b-container fluid class="mt-2">
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
        <b-card>
          <b-card-body>
        <b-form-group id="input-group-1" label-for="input-1">
              <!-- <div class="input-container"> -->
                 <b-form-select v-model="selected" :options="groupList"></b-form-select>
          </b-form-group>

          <b-form-group>
          <b-form-input v-model="date" type="date"></b-form-input>
          </b-form-group>

          <b-form-group>
          <b-form-input v-model="time" type="time"></b-form-input>
          </b-form-group>

          <b-form-group>
              {{time}}
              {{date}}
          </b-form-group>
              <div>
              </div>
                <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="success"
                v-if="isResponceData"
              >
                <span variant="success" class="text-float"
                  > <i class="fa fa-smile" /> Uploaded Succesfully
                </span></b-alert
              >
             
              <!-- <b-alert show variant="secondary">{{this.selectedFile.name}}</b-alert> -->
             
            <b-form-group size="lg" class="mt-2">
              <b-button
                variant="primary"
                class="btn-block ripple"
                @click="onUpload"
                >Schedule</b-button
              >
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
data(){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 
return {
    groupList:[
        {
             value: null, text: 'Select Group' 
        }
    ],
    selected: null,
    isResponceData:false,
    date:null,
    time:null
    }
},
    methods:{
    onSchedule(){
  this.axios.post('http://localhost:8080/lcrm-api/mtk-list-alot-user-to-template').then((response)=>{
         if(response.data.response_code === 200){
          console.log('groupList', response.data.response_body);
         console.log('carttttttttttttt',response.data.response_body.id);
           response.data.response_body.map((data)=> this.groupList.push({ value: data.id, text: data.title }))

         }else{
           this.groupList.push({ value: null, text: ' 👀 No Category Found' })
           console.log('nocatfound...',response)
         }
        }).catch(function (error){
        console.log( error);
      });
}
},
mounted()
{
  this.axios.post('http://localhost:8080/lcrm-api/mtk-list-alot-user-to-template').then((response)=>{
         if(response.data.response_code === 200){
          console.log('groupList', response.data.response_body);
         console.log('carttttttttttttt',response.data.response_body.id);
           response.data.response_body.map((data)=> this.groupList.push({ value: data.id, text: data.title }))

         }else{
           this.groupList.push({ value: null, text: ' 👀 No Category Found' })
           console.log('nocatfound...',response)
         }
        }).catch(function (error){
        console.log( error);
      });
}
}
</script>

<style>

</style>