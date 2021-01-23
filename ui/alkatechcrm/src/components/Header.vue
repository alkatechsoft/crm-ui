<template>

   <div>
    <link scoped rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

       <!-- start simple toogle and if-else toggole -->
       <!-- <h4 v-if="show">Conditional rendering if block</h4> -->
       <!-- <h4 v-else>Conditional rendering else block</h4> -->
       <b-button v-on:click="toogle">toogle</b-button>
       <!-- end simple toogle and if-else toggole -->

       <b-button v-on:click="click__event('hi it is click event')">click here</b-button>
      <!-- get data through props -->
       <h3>{{data}}</h3>
       <h6>{{msg}}</h6>
        <div>
                 <b-table>This is a table</b-table>
                <b-table striped hover :items="employees" :fields="fields"><b-table>This is a table</b-table></b-table>
           <table class="table">
  <thead>
    <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>contact</th>
        <th>sallary</th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="employee in employees" :key="employee.id">
                        <td>{{employee.id}}</td>
                        <td>{{employee.name}}</td>
                        <td>{{employee.email}}</td>
                        <td>{{employee.contact}}</td>
                        <td>{{employee.salary}}</td>
    </tr>
  </tbody>
</table>

            <!-- <table>
                <tbody>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>contact</th>
                        <th>sallary</th>
                     </tr>
                    <tr v-for="employee in employees" :key="employee.id">
                        <td>{{employee.id}}</td>
                        <td>{{employee.name}}</td>
                        <td>{{employee.email}}</td>
                        <td>{{employee.contact}}</td>
                        <td>{{employee.salary}}</td>
                    </tr>
                </tbody>
            </table> -->
           
        </div>
   </div>
</template>

 <script>
export default {
name:"Sidebar",
props:{
  data:String,
  msg:String
},methods:{
    click__event(event){
        console.log(event);
    },
    toogle() {this.show=!this.show}
},data12(){
    return {show:true}
},data(){
    return {
        fields:['id.','name','email','contact','salary'],
        employees:[
            {id:1, name:'name1', email:'email1@gmail.com', contact:'9999999888', salary:'30,0000'},
            {id:2, name:'name2', email:'email2@gmail.com', contact:'9999999888', salary:'31,0000'},
            {id:3, name:'name3', email:'email3@gmail.com', contact:'9999999888', salary:'32,0000'},
            {id:4, name:'name4', email:'email4@gmail.com', contact:'9999999888', salary:'33,0000'},
            {id:5, name:'name5', email:'email5@gmail.com', contact:'9999999888', salary:'34,0000'},
            {id:6, name:'name6', email:'email6@gmail.com', contact:'9999999888', salary:'35,0000'},
            {id:7, name:'name7', email:'email7@gmail.com', contact:'9999999888', salary:'36,0000'}
            ]
        }
    }
}
</script>