<template>
    <b-container fluid class="mt-2">
        <!-- User Interface controls -->
        <b-card>
            <b-row>
                <b-col offset-lg="0" offset-xl="0" xl="2" lg="3" offset-md="0" offset-sm="0" md="3" sm="3"  class="my-1">
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
                                size="sm"
                        ></b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col  offset-lg="4" offset-xl="7" xl="3" lg="5" offset-md="4" md="5" offset-sm="4"  sm="5" class="my-1">
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
                    sticky-header 
                    head-variant="light"
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
                    selectable
                    responsive="sm"
                    ref="selectableTable"
                    @row-selected="onRowSelected"
                    :tbody-transition-props="transProps"
                    id="table-transition-example"
            >
             
                <template #table-colgroup="scope">
                <col v-for="field in scope.fields"
                    :key="field.key"
                    :style="{ width: field.key === 'actions' ? '10%' : '40%' }">
                </template>
                <!-- <template #cell(html)=""> -->
                    <!-- <b-list-group-item> <b-badge v-html="data.value"></b-badge></b-list-group-item>
                    <b-nav-item to="subscribers" @click="hide"><i class="fa fa-address-card" /> &nbsp; &nbsp; Subscribers </b-nav-item>
                    <b-button size="sm">
                        Delete
                    </b-button> -->
                  
                <!-- </template> -->
                <template #cell(name)="row">
                    {{ row.value.first }} {{ row.value.last }}
                </template>
                <template #cell(actions)="row" >
                    <b-col  >
                     <b-button-group>
                        <b-button size="sm" :to="'/report/'+row.item.scheduler_id+'/'+row.item.title" class="btn" variant="primary">View</b-button>
                     </b-button-group>
                    </b-col>
                </template>

                <!-- <template #cell(status)="">
                    <b-button-group>
                        <b-form-checkbox switch>active</b-form-checkbox>
                    </b-button-group>
                </template> -->

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
            <!-- <p>
                Selected Rows:<br>
                items :: {{items.id}}<br>
                seleted:: {{ selected }}<br>
                selected template:
                {{templateSelected}}<br>
                group title: <br>
                {{campaignTitle}}
            </p> -->
            <!-- Selected Rows:<br>
            {{selected}} -->
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
            <!-- Info modal -->
            <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
              <pre>{{ infoModal.modelData }}</pre>
            </b-modal> -->

        </b-card>
    </b-container>
</template>


<script>
    import axios from 'axios';
    export default {
        data() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            return {
                modes: ['multi', 'single', 'range'],
                items: [],
                fields: [
                    { key: 'title', label: 'Campaign Name', sortable: true, sortDirection: 'asc' },
                    { key: 'attempts', label: 'Attempts', sortable: true, sortDirection: 'desc' },
                    // { key: 'html', label: 'Actions' },
                    {key: 'actions', label: 'actions'}
                ],
                selectMode: 'single',
                selected: [],
                selectedTypeUsersID:[],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15, { value: 100, text: "Show More" }],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: [],
                busy: false,
                processing: false,
                infoModal: {
                    id: 'info-modala',
                    title: '',
                    modelData: ''
                },
              
                
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
 
            this.axios.post('http://192.168.1.14/lcrm-api/mtk-report-list-all-scheduler').then((response)=>{
                if(response.data.response_code === 200){

                    response.data.response_body.map((data) => this.items.push({title: data.title, attempts: data.attempts, scheduler_id:data.id, actions:''}));
        // this.items=response.data.response_body;
                  
                  console.log("itemssssssssss",this.items)
                    this.totalRows = this.items.length
                }else{
                    this.category.push({ value: null, label: ' 👀 No data Found' })
                }
            }).catch(function (error){
                console.log( error);
            });


        },
        methods: {
            
        clearInterval() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      onShown() {
        // Focus the dialog prompt
        this.$refs.dialog.focus()
      },
      onHidden() {
        // In this case, we return focus to the submit button
        // You may need to alter this based on your application requirements
        this.$refs.submit.focus()
      },
      onSubmit() {
        this.processing = false
        this.busy = true
      },
    onCancel() {
      this.busy = false;
    },
    
          
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            info(item, index, button) {
                // this.infoModal.title = `Row index: ${index}`
                this.infoModal.title = `Create Campaign`
                // this.infoModal.modelData = JSON.stringify(item, null, 2)
                this.infoModal.modelData = item
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.modelData = ''
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
            test: function(){
                alert("keyup")
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
    .ripple {
        position: relative;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
    }

    .ripple:after {
        modelData: "";
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
        transition: transform 0.5s, opacity 1s;
    }

    .ripple:active:after {
        transform: scale(0, 0);
        opacity: 0.3;
        transition: 0s;
    }
    .alert-custom-position{
        position: fixed;
        bottom: 0px;
        right: 12px;
    }
    .elementToFadeInAndOut1 {
        -webkit-animation: fadeinout 2s linear forwards;
        animation: fadeinout 8s linear forwards;
    }
    .modal-header{
        background: rgb(255, 0, 0) !important;
    }
    .fa-plus-align{
        /* text-align: end; */
        /* display: none; */
    }


    /* Choose all input elements that have the attribute: type="radio" and make them disappear.*/
    input[type="radio"] {
        display:none;
    }

    /* The label is what's left to style.
    As long as its 'for' attribute matches the input's 'id', it will maintain the function of a radio button. */
    .ss-label:last-child{
        border-radius: 0px 5px 5px 0px  !important;

    }
    .ss-label{
        /* text-align: -webkit-right !important; */
    }
    label {
        padding: 7px;
        display: table-cell;;
        /* border: 0px solid rgb(20, 4, 94); */
        background: #007bff;
        cursor: pointer;
        color: #fff;
    }
    label:nth-child(2) {
        border-radius: 5px 0px 0px 5px !important;
    }
    label:nth-child(6) {
        border-radius: 0px 5px 5px 0px !important;
    }
    .blank-label {
        display: none;
    }

    /* The '+' is the adjacent sibling selector.
    It selects what ever element comes right after it,
    as long as it is a sibling. */
    input[type="radio"]:checked + label {
        background: rgb(20, 4, 94);
        color: #fff;
    }
    .btn-group{
        display: flex;
    }
    .btn-primary:not(:disabled):not(.disabled).active {
        background: #14045e !important;
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
        transition: transform 0.5s, opacity 1s;
    }
    .ripple:active:after {
        transform: scale(0, 0);
        opacity: 0.3;
        transition: 0s;
    }
.b-overlay{
     margin-left: 15px;
    margin-right: 15px;
}
</style> 

 