<template>
  <b-container fluid class="mt-2">
    <!-- User Interface controls -->
    <b-card>
    <!-- <b-row style="background:rgb(132 191 255 / 75%);; margin-bottom:1rem; box-shadow:rgb(51 10 117) 0px 0px 3px 1px; border-radius: inherit;" class="pt-1">
   
      <b-col  offset-lg="0"
          offset-md="3"
          offset-sm="3"
          lg="3"
          md="6"
          sm="6"
          offset="1"
          cols="6">
        <h4><b>Subscriber Type :</b>  Doctors</h4>
      </b-col>
        <b-col  offset-lg="7"
          offset-md="3"
          offset-sm="3"
          lg="2"
          md="6"
          sm="6"
          offset="1"
          cols="6">
        <b-button class="pt-0" :to="'/subscribers/'" variant="primary"> <i class="fa fa-arrow-left " aria-hidden="true"> &nbsp; Back</i></b-button>
      </b-col>
 
    </b-row> -->


  <b-navbar class="s-nav-bg" toggleable="sm" type="dark" variant="i nfo" style="height:40px; background:rgb(132 191 255 / 75%);; margin-bottom:1rem; box-shadow:rgb(51 10 117) 0px 0px 3px 1px; border-radius: inherit;" >
        <!-- <b-navbar-brand href="#">ALKATECH-CRM</b-navbar-brand> -->
        <h6><b>Subscriber Type :</b>  Doctors</h6>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <b-button class= "" :to="'/subscribers/'" variant="primary" style="    margin-right: -15px;"> <i class="fa fa-arrow-left " aria-hidden="true"> &nbsp; Back</i></b-button>

        </b-navbar-nav>
       
    </b-navbar>


    <b-row>
      <b-col  offset-lg="" lg="2" offset-md="0" md="5" sm="4"  class="my-1">
        <b-form-group
          label="Filter"
          label-for="per-page-select"
          label-cols-sm="2"
          label-cols-md="2"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    <b-col offset-lg="6" lg="4" offset-md="2" md="5" offset-sm="1"  sm="7" class="my-1">
        <b-form-group
          label=""
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="xs"
      show-empty
      small
      @filtered="onFiltered"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      @row-selected="onRowSelected"
      :tbody-transition-props="transProps"
      id="table-transition-example"
    >
    
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>
  <template #cell(actions)="">  
    <b-button size="sm">
       Update
    </b-button> <b-button size="sm">
       Delete
    </b-button>
  </template>
   
      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
       <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
  
     <b-row>
      <b-col sm="7" md="3" lg="2" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
        
      </b-col>
    </b-row>
   
    </b-card>
  </b-container>
</template>

 
 <script>
import axios from 'axios';

  export default {
    data() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token'); 
      return {
        groupTitle:null,
        templateFiles:[
           { value: null, text: 'Asign Template' }
        ],
        templateSelected:null,
        modes: ['multi', 'single', 'range'],
         items: [],
        fields: [
          { key: 'username', label: 'Name', sortable: false, sortDirection: 'desc' },
          { key: 'email', label: 'Email', sortable: false, sortDirection: 'desc' },
          { key: 'contact', label: 'Contact', sortable: false, sortDirection: 'desc' },
          { key: 'actions', label: 'Actions' }
        ],
        selectMode: 'multi',
        selected: [],
        selectedUsersID:[],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show More" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
        console.log(localStorage.getItem('token'))
        this.axios.post('http://crmback.projectdemotest.com/lcrm-api/list-client-by-category',
        {category_id:this.$route.params.id}
        ).then((response)=>{
        console.log(response);
        this.items=response.data.response_body;
        console.log(this.items)
        this.totalRows = this.items.length
        })
        this.axios.post('http://crmback.projectdemotest.com/lcrm-api/mtk-list-mail-template').then((responseData)=>{
          responseData.data.response_body.map((data) => this.templateFiles.push({ value: data.id, text: data.title }));
          console.log(responseData)
        })
   this.axios.post('http://crmback.projectdemotest.com/lcrm-api/count-client-by-category').then((response)=>{
         if(response.data.response_code === 200){
          console.log('count-client-by-category', response.data.response_body);
         }else{
           this.category.push({ value: null, label: ' 👀 No Category Found' })
          }
        }).catch(function (error){
        console.log( error);
      });


    },
    methods: {
      onGroupCreate(){
         console.log('groupData', this.selected)
         this.selected.map((data) => this.selectedUsersID.push(data.id));
         console.log('users::::', this.selectedUsersID, this.groupTitle, this.templateSelected)
         let createGroupData = {
           users:this.selectedUsersID,
           title:this.groupTitle,
           template:this.templateSelected
         }
         console.log('dataaaaaaaa:::::::::', createGroupData)
         this.axios.post('http://crmback.projectdemotest.com/lcrm-api/mtk-register-alot-user-to-template', createGroupData).then((response)=>{
           console.log('responce : ',response.data.response_code)
         if(response.data.response_code === 200){
            this.isUploaded=true
            this.isUploadedError=false;
            this.title=''
         }
         })
      },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },

      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
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
</style> 

 