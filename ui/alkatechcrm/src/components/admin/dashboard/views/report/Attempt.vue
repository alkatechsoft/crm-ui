<template>
    <b-container fluid class="mt-2">
        <!-- User Interface controls -->
        <b-card>
        <!-- scheduler_id: {{this.$route.params.id}} -->
            <b-navbar class="s-nav-bg" toggleable="sm" type="dark" variant="i nfo" style="height:40px; background:#ebebeb; margin-bottom:1rem; box-shadow:rgba(0, 0, 0, 0.15) 0px 0.3rem .4rem !important; border-radius: inherit;" >
                <!-- <b-navbar-brand href="#">ALKATECH-CRM</b-navbar-brand> -->
                <h6><b>Campaign Name :</b>  {{this.$route.params.title}}</h6>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-button size="sm" class= "" :to="'/report/'" variant="primary" style="margin-right: -15px;"> <i class="fa fa-arrow-left " aria-hidden="true"> &nbsp; Back</i></b-button>
                </b-navbar-nav>
            </b-navbar>
        <hr>
        
            <b-row>
                <b-col  offset-lg="0" offset-xl="0" xl="2" lg="3" offset-md="0" offset-sm="0" md="3" sm="3"  class="my-1">
                    <b-form-group
                            label=""
                            label-for="per-page-select"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-0"
                           >
                        <b-input-group size="sm">
                             <b-input-group-prepend>
                                <b-button >Filter</b-button>
                            </b-input-group-prepend>
                        <b-form-select
                                id="per-page-select"
                                v-model="perPage"
                                :options="pageOptions"
                                size="sm">
                                </b-form-select>
                                
                        </b-input-group>
                    </b-form-group>
                </b-col>
              
                <b-col offset-lg="4" offset-xl="7" xl="3" lg="5" offset-md="4" md="5" offset-sm="4"  sm="5" class="my-1">
                    <b-form-group
                            label=""
                            label-for="filter-input"
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
                    head-variant="light"
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
                    selectable
                    id="table-transition-example"
                    @row-selected="onRowSelected"
            >
               >

                <template #cell(actions) ="row" >
                    <!-- <i v-if="edit === row.item.id" class="fas fa-check" @click="onSave(row.item)" ></i>
                    <i v-if="edit !== row.item.id" class="fas fa-pencil" @click="onEdit(row.item)" ></i>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <i class="fas fa-trash" @click="onDelete(row.item)" ></i> -->
 
                    <b-col>
                     <b-button-group>
                        <!-- <b-button size="sm" :to="'/report/'+row.item.scheduler_id+'/'+row.item.title" class="btn" variant="primary">View</b-button> -->
                        <b-button @click="getDetaildReport(row.item.id, row.item.execute_at_date)" variant="success" size="sm"> <i class="fa fa-download" /> &nbsp;Detailed Report </b-button>
                     </b-button-group>
                    </b-col>
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
                <!-- {{ selectedItem }} -->
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
                subscriberGroupType:this.$route.params.categoryName,
                edit: null,
                selectedItem:[],
                clientUpdat:[],
                bulkAction:null,
                groupTitle:null,
                templateFiles:[
                    { value: null, text: 'Asign Template' }
                ],
                templateSelected:null,
                modes: ['multi', 'single', 'range'],
                items: [],
                fields: [
                    { key: 'execute_at_date', label: 'Execute At', sortable: false, sortDirection: 'desc' },
                    { key: 'execute_at_time', label: 'Execute At Time', sortable: false, sortDirection: 'desc' },
                    { key: 'mail_clicked', label: 'Mail Clicked'},
                    { key: 'mail_opened', label: 'Mail Opened'},
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
                }, text : 'sampleText',
                csv: [],
                execution_date:null
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
            this.fetchClientData();

        },
        methods: {
        detailedCsvReport(){
        let csv = '\ufeff' + 'Sender Email, Recipient Email, Mail Clicked, Mail Opened\n'
        console.log('csv',this.csv);
        this.csv.forEach(el => {
            var line = el['senderEmail'] + ',' + el['recipientEmail']  + ',' + el['mailClicked']  + ',' + el['mailOpened'] + '\n'
            csv += line
        })
        var blob = new Blob([ csv ], { "type" : "csv/plain" });
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        let date = new Date();
        console.log(date)
        // link.download = 'reportCsv.csv'
        link.download = this.$route.params.title + '-' +this.execution_date + '-report.csv'
        link.click()
        },
        getDetaildReport(id, date){
        this.axios.post('http://192.168.1.14:80/lcrm-api/mtk-report-list-all-tracker-based-helper',
        { helper_id: id }
        ).then((response)=>{
            this.csv=[];
            this.execution_date = date
                    // this.items=response.data.response_body;
                    response.data.response_body.map((data) => this.csv.push({senderEmail: data.sender_email, recipientEmail: data.recipient_email, mailClicked: data.mail_clicked, mailOpened:data.mail_opened }));
                    this.totalRows = this.items.length
                    this.detailedCsvReport();
                    console.log('response on click',response);
                     console.log('csv-in-response',this.csv);
                }).catch(function (error){
                    console.log( error);
                });
            },
            fetchClientData(){
                // Set the initial number of items        
                let scheduleId = {scheduler_id:this.$route.params.id}
                this.axios.post('http://192.168.1.14:80/lcrm-api/mtk-report-list-all-helper-based-scheduler',scheduleId).then((response)=>{
                    // this.items=response.data.response_body;
                    response.data.response_body.map((data) => this.items.push({execute_at_date: this.dateFormate(data.created_at), execute_at_time: data.execute_at_time, mail_clicked: data.mail_clicked, mail_opened:data.mail_opened, id:data.id, actions:''}));
                    this.totalRows = this.items.length
                }).catch(function (error){
                    console.log( error);
                });
            },
             dateFormate(dateSrting) {
                var date= dateSrting.split('T')
                return date[0]
              },
            updateClientData(Itemdata){
                // Update Client Data
                this.axios.post('http://localhost:8080/lcrm-api/edit-client',Itemdata
                ).then((response)=>{
                    alert(response.data.response_message)
                }).catch(function (error){
                    console.log( error);
                });
            },

            deleteClientData(itemId){
                axios.post('http://localhost:8080/lcrm-api/delete-client', {
                    id:itemId,

                })
                    .then((response) =>  {
                        alert(response.data.response_message)
                        this.fetchClientData();
                    })
                    .catch( (error) => {
                        console.log(error);
                });
            },

            BulkdeleteClientData(itemId, ItemStatus){
                axios.post('http://localhost:8080/lcrm-api/delete-client', {
                    id:itemId,
                    status:ItemStatus
                })
                    .catch( (error) => {
                        console.log(error);
                    });
            },

            onEdit(item) {
                this.edit = this.edit !== item.id ? item.id : null;
            },
            onSave(item){

                // on click save row
                var data= {};
                this.fields.map(function(value) {
                    data[value.key]=item[value.key];
                });
                data['id']=item['id'];
                this.updateClientData(data)
                this.fetchClientData();
                this.edit = this.edit !== item.id ? item.id : null;
            },
            onDelete(item){
                // on click delete row

                if(confirm("Do you really want to delete?")){
                    this.deleteClientData(item.id)
                }
            },

            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            onRowSelected(items) {
                this.selectedItem=items
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
</style> 

 