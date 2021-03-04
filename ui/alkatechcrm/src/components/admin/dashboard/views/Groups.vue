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
     <ValidationObserver v-slot="{ handleSubmit }">
        <b-form  @submit.prevent="handleSubmit(onSchedule)" class="mt-2">
          <ValidationProvider name="Group" rules="required" v-slot="{ errors }">
         <b-form-group id="input-temp-id-1" label-for="input-temp-id-1">
              <!-- <div class="input-container"> -->
                 <b-form-select v-model="Group" :options="groupList"></b-form-select>
             <span class="text-float">{{ errors[0] }}</span>

          </b-form-group>
          </ValidationProvider>

          <b-form-group>
               <b-form-datepicker v-model="execute_at_date" :min="min"  locale="en"></b-form-datepicker>
          </b-form-group>
           <ValidationProvider name="Time" rules="required" v-slot="{ errors }">

          <b-form-group>
          <b-form-input v-model="Time" type="time"></b-form-input>
             <span class="text-float">{{ errors[0] }}</span>
          </b-form-group>
           </ValidationProvider>
          <b-form-group>
              Group id : {{Group}}<br>
              date: {{execute_at_date}}<br>
              time: {{Time}}
          </b-form-group>
              <div>
              </div>
                <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="success"
                v-if="isScheduled"
              >
                <span variant="success" class="text-float"
                  > <i class="fa fa-smile" />  😇 Scheduled Succesfully at Date : {{execute_at_date}}Time : {{Time}}
                </span></b-alert
              >
             
              <!-- <b-alert show variant="secondary">{{this.selectedFile.name}}</b-alert> -->
             
            <b-form-group size="lg" class="mt-2">
              <b-button
              type="submit"
                variant="primary"
                class="btn-block ripple"
                @click="onSchedule"
                >Schedule</b-button
              >
            </b-form-group>
          </b-form>
     </ValidationObserver>
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
      let currentDate = new Date()
       currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      let minDate = new Date(currentDate)
      minDate.setMonth(minDate.getMonth())
      minDate.setDate(currentDate.getDate())
       
      return {
          groupList:[
              {
                  value: null, text: 'Select Group' 
              }
          ],
          Group: null,
          isScheduled:false,
          execute_at_date:null,
          Time:null,
          execute_at_days : null,
          month_recurrence: null,
          min: minDate
          }
  },
    methods:{
    onSchedule(){
     console.log('date......', this.dateValidate());
       let scheduledData = {
            template_lot_id  : this.Group,
            execute_at_time  : this.Time,
            execute_at_days  :this.execute_at_days,
            execute_at_date  : this.execute_at_date,
            month_recurrence : this.month_recurrence
          }
          console.log('scheduledData', scheduledData)
     this.axios.post('http://localhost:8080/lcrm-api/mtk-register-schedule-template',scheduledData).then((response)=>{
         if(response.data.response_code === 200){
           console.log('groupList', response.data.response_body);
         this.isScheduled=true
         }else{
           console.log('error...', response)
         }
        }).catch(function (error){
        console.log( error);
      });
  },
  // dateValidate(today){
  //   var date = new Date(today);
  //   console.log(today)
  // }
  // ,
    dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        // const day = date.getDay(date)
        const year = date.getFullYear(ymd)
        // const day = date.getDate()
        var currentDate = new Date();
        const getFullYear = date.getFullYear(currentDate)
        console.log(getFullYear,year,currentDate)
        // var today = new Date(date);
        // console.log('today date',today)
        // Return `true` if the date should be disabled
        return year  === getFullYear 
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