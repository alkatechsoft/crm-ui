<template>
    <b-container fluid class="mt-2">
        <!-- User Interface controls -->

        <b-card>
            <b-modal size="lg" ida="my-modal"
                     :id="infoModal.id"
                     :title="infoModal.title"
                     ok-only
                     @hide="resetInfoModal"
                     :header-bg-variant="headerBgVariant"
                     :header-text-variant="headerTextVariant"
                     :body-bg-variant="bodyBgVariant"
                     :body-text-variant="bodyTextVariant"
                     :footer-bg-variant="footerBgVariant"
                     :footer-text-variant="footerTextVariant"
            >
                <div style="background:rgba(132, 191, 255, 0.75); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; margin-bottom:1rem" class="p-3">

                    <ValidationObserver v-slot="{ handleSubmit }">

                        <b-form  inlijne @submit.prevent="handleSubmit(onMailSchedule)" cla ss="mt-2">
                            <b-col lg="12">
                                <ValidationProvider name="template" rules="required" v-slot="{ errors }">
                                    <b-form-group id="input-group-1" label-for="input-1">
                                        <b-form-select v-model="templateSelected" :options="templateFiles" @change="onTemplateAssign(tempAssign)"></b-form-select>
                                        <!-- <div class="text-float">{{ errors[0] }}</div> -->
                                    </b-form-group>
                                    <div class="text-float">{{ errors[0] }}</div>
                                </ValidationProvider>
                            </b-col>
                            <b-col lg="12">
                                <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
                                    <b-form-group>
                                        <b-form-input
                                                id="input-title"
                                                v-model="campaignTitle"
                                                @change="onTemplateAssign(tempAssign)"
                                                type="text"
                                                placeholder="Enter title"
                                        ></b-form-input>
                                        <!-- <span class="text-float">{{ errors[0] }}</span> -->
                                    </b-form-group>
                                    <!-- <span class="text-float">{{ errors[0] }}</span> -->
                                    <div class="text-float">{{ errors[0] }}</div>

                                </ValidationProvider>
                            </b-col>
                            <b-col lg="">
                                <b-form-group>
                                    <b-button
                                            v-if="mailNow"
                                            id="create-campaign"
                                            variant="primary"
                                            type="submit"
                                            class="btn-block ripple"
                                    ><i class="fas fa-envelope-square"></i> &nbsp;&nbsp; Mail Now</b-button>
                                    <b-alert
                                            :show="dismissCountDown"
                                            dismissible
                                            variant="success"
                                            @dismissed="dismissCountDown=0"
                                            @dismiss-count-down="countDownChanged"
                                            class="elementToFadeInAndOut alert-custom-position mt-2"
                                            v-if="isMailNow"
                                    >
                                        <p variant="success" class="text-float"
                                        > <i class="fa fa-smile" /> Added To Queue successfully
                                        </p>
                                        <b-progress
                                                variant="warning"
                                                :max="dismissSecs"
                                                :value="dismissCountDown"
                                                height="4px"
                                        ></b-progress>
                                    </b-alert>
                                </b-form-group>

                                <b-row cols="2">
                                    <b-col>
                                        <b-form-checkbox @change="schedule" switch size="lg">Schedule</b-form-checkbox>
                                    </b-col>
                                    <b-col  >
                                        <b-form-group>
                                            <b-form-checkbox v-if="scheduleNow" @change="repeatSchedule" switch size="lg">Repeat</b-form-checkbox>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        Repeat : {{scheduleRepeat}}
                                        Monthly : {{month_recurrence}}
                                        Yearly : {{year_recurrence}}
                                        template : {{templateSelected}}
                                        campaignTitle: {{campaignTitle}}
                                    </b-col>
                                </b-row>



                            </b-col>
                            <b-col v-if="scheduleNow">

                                <b-row v-if="scheduleRepeat">
                                    <b-col lg="6" sm="6" class="ss-label " >
                                        <b-form-group>

                                            <input type="radio" id="cat" name="repeat1"  @change="monthly" value="on" />
                                            <label  class=" ripple" for="cat">Monthly</label>
                                            <input type="radio" id="dog"  name="repeat1" @change="weekly" value="on" />
                                            <label  class=" ripple" for="dog">Weekly</label>
                                            <input  class=" ripple" type="radio" id="pig" name="repeat1" @change="yearly" value="on" />
                                            <label   class=" ripple" for="pig">yearly</label>
                                        </b-form-group>
                                        <!-- <b-form-group class="fa-plus-align">
                                          <b-button @change="schedule" switch size="sm"><i class="fa fa-plus" /></b-button>
                                        </b-form-group> -->
                                    </b-col>
                                </b-row>
                                <b-row v-if="scheduleRepeat">
                                    <b-col v-if="isWeekly">
                                        <b-form-group>
                                            <b-form-checkbox-group
                                                    v-model="selectedDays"
                                                    :options="optionsDays"
                                                    name="buttons-1"
                                                    buttons
                                                    button-variant="primary"
                                                    class="ripple"
                                            ></b-form-checkbox-group>
                                        </b-form-group>
                                    </b-col>
                                </b-row>





                                <hr>

                                <!-- selected:{{selected}}
                                selectedays:{{selectedDays}} -->
                                <ValidationProvider name="Date" rules="required" v-slot="{ errors }">
                                    <b-form-group v-if="isWeeklyActive" class="mt-3">
                                        <b-form-datepicker v-model="execute_at_date" :min="min"  locale="en"></b-form-datepicker>
                                        <span class="text-float">{{ errors[0] }}</span>
                                    </b-form-group>
                                </ValidationProvider>
                                <ValidationProvider name="Time" rules="required" v-slot="{ errors }">

                                    <b-form-group>
                                        <b-form-input v-model="Time" type="time"></b-form-input>
                                        <span class="text-float">{{ errors[0] }}</span>
                                    </b-form-group>
                                </ValidationProvider>





                                <b-form-group>
                                    <b-button
                                            id="create-campaign"
                                            variant="primary"
                                            type="submit"
                                            class="btn-block"
                                    ><i class="fas fa-watch"></i> &nbsp;&nbsp; Save</b-button>
                                    <b-alert
                                            :show="dismissCountDown"
                                            dismissible
                                            variant="success"
                                            @dismissed="dismissCountDown=0"
                                            @dismiss-count-down="countDownChanged"
                                            class="elementToFadeInAndOut alert-custom-position mt-2"
                                            v-if="isMailNow"
                                    >
                                        <p variant="success" class="text-float"
                                        > <i class="fa fa-smile" /> Added To Queue successfully
                                        </p>
                                        <b-progress
                                                variant="warning"
                                                :max="dismissSecs"
                                                :value="dismissCountDown"
                                                height="4px"
                                        ></b-progress>
                                    </b-alert>
                                </b-form-group>
                            </b-col>
                            <b-col v-if="scheduleNow">
                                <hr>
                            </b-col>
                        </b-form>
                    </ValidationObserver>

                </div>
            </b-modal>
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
                    selectable
                    responsive="sm"
                    ref="selectableTable"
                    @row-selected="onRowSelected"
                    :tbody-transition-props="transProps"
                    id="table-transition-example"
            >
                <template v-slot:cell()="{item,field: { key }}" >
                    <!-- <h4 v-if="key">{{item.subscriberType}} <b-badge>{{item.count}}</b-badge></h4> -->
                    <b-col >

                    {{item.subscriberType}}
                    <b-badge variant="primary" v-if="key" pill> {{item.count}}</b-badge>
                    </b-col>
                </template>
                <template #table-colgroup="scope">
                <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{ width: field.key === 'subscriberType' ? '70%' : '30%' }">
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
                        <b-button size="sm" :to="'/subscribers/'+row.item.id+'/'+row.item.subscriberType" class="btn" variant="primary">View</b-button>
                        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">Send Email</b-button>
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
            <p>
                Selected Rows:<br>
                items :: {{items.id}}<br>
                seleted:: {{ selected }}<br>
                selected template:
                {{templateSelected}}<br>
                group title: <br>
                {{campaignTitle}}
            </p>
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
            let currentDate = new Date()
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
            let minDate = new Date(currentDate)
            minDate.setMonth(minDate.getMonth())
            minDate.setDate(currentDate.getDate())
            return {
                tempAssign:'mtk-register-alot-user-to-template',
                isMailNow:false,
                isMailNowError:false,
                campaignTitle:null,
                campaignId:null,
                scheduleNow:false,
                scheduleRepeat: false,
                mailNow:true,
                execute_at_date:null,
                Time:null,
                min: minDate,
                month_recurrence: null,
                year_recurrence: null,
                isWeekly: false,
                isWeeklyActive:true,
                templateFiles:[
                    { value: null, text: 'Asign Template' }
                ],
                templateSelected:null,
                modes: ['multi', 'single', 'range'],
                items: [],
                fields: [
                    { key: 'subscriberType', label: 'Subscriber Type' , sortable: false, sortDirection: 'desc' },
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
                dismissSecs: 300,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                headerBgVariant: 'primary',
                headerTextVariant: 'light',
                bodyBgVariant: 'light',
                bodyTextVariant: 'dark',
                footerBgVariant: 'primary',
                footerTextVariant: 'dark',
                infoModal: {
                    id: 'info-modala',
                    title: '',
                    modelData: ''
                },
                selectedDays: [], // Must be an array reference!
                optionsDays: [
                    { text: 'Sun', value: 'sun' },
                    { text: 'Mon', value: 'mon' },
                    { text: 'Tue', value: 'tue' },
                    { text: 'Wed', value: 'wed' },
                    { text: 'Thur', value: 'thu' },
                    { text: 'Fri', value: 'fri' },
                    { text: 'Sat', value: 'sat' }
                ]
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
            var currentDate = new Date();
            console.log('current time',currentDate.getTime("HH:mm"));
            console.log(localStorage.getItem('token'))
            this.axios.post('http://localhost:8080/lcrm-api/list-client').then((response)=>{
                console.log(response);
                // this.items=response.data.response_body;
                // console.log(this.items)
                // this.totalRows = this.items.length
            })
            this.axios.post('http://localhost:8080/lcrm-api/mtk-list-mail-template').then((responseData)=>{
                responseData.data.response_body.map((data) => this.templateFiles.push({ value: data.id, text: data.title }));
                console.log(responseData)
            })
            this.axios.post('http://localhost:8080/lcrm-api/count-client-by-category').then((response)=>{
                if(response.data.response_code === 200){
                    console.log('count-client-by-category', response.data.response_body);

                    response.data.response_body.map((data) => this.items.push({subscriberType: data.subscriberType ,  count:data.count, id:data.id, userArray:data.userArray, actions:''}));
                    console.log("itemssssssssss",this.items)
                    this.totalRows = this.items.length
                }else{
                    this.category.push({ value: null, label: ' 👀 No Category Found' })
                }
            }).catch(function (error){
                console.log( error);
            });


        },
        methods: {
            onTemplateAssign(){
                if(this.templateSelected !=null && this.campaignTitle !=null){
                    console.log('groupData', this.selected)
                    //  this.selected.map((data) => this.selectedTypeUsersID.push(data.userArray));
                    //  this.selectedTypeUsersID=this.selected[0].userArray
                    let asisgnTempData = {
                        users:this.infoModal.modelData.userArray,
                        template:this.templateSelected,
                        title:this.campaignTitle,
                        id:this.campaignId
                    }
                    console.log('dataaaaaaaa:::::::::', asisgnTempData)
                    this.axios.post('http://localhost:8080/lcrm-api/' + this.tempAssign, asisgnTempData).then((response)=>{
                        console.log('responce : ',response.data.response_code, response.data.response_body.id)
                        if(response.data.response_code === 200){
                            this.isMailNow=false

                            this.isMailNowError=false;
                            this.dismissCountDown = this.dismissSecs
                            this.campaignId=response.data.response_body[0].id
                            this.title=''
                            // alert('createdd');
                            this.campaignId !=null ? this.tempAssign='mtk-update-alot-user-to-template':this.tempAssign
                        }
                    })
                }
            },
            dateFormating( date = new Date) {
                var year = date.getFullYear()
                var month = date.getMonth()
                var day = date.getDate()
                month++
                month = month < 10 ? '0'+month : month;
                day = day < 10 ? '0'+day : day;
                var getDate = year + '-' + month + '-' + day;
                // var getDate = day + '-' + month + '-' + year;
                return getDate
            },
            timeFormating( date = new Date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds()
                var date1 = date.getDate
                console.log('datttttttttt',date1)
                minutes++;
                // hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                seconds = seconds < 10 ? '0'+seconds : seconds;
                var getTime = hours + ':' + minutes + ':' +seconds

                return getTime;
            },
            schedule(){
                this.scheduleNow = !this.scheduleNow
                this.mailNow = !this.mailNow
                this.month_recurrence = null
                this.year_recurrence = null
                this.scheduleRepeat= null
            },
            repeatSchedule(){
                this.scheduleRepeat = !this.scheduleRepeat
                this.month_recurrence = null
                this.year_recurrence = null
                this.isWeekly = false

            },
            monthly(){
                this.month_recurrence = 'on'
                this.year_recurrence = null
                this.isWeekly = false
                this.isWeeklyActive = true
            },
            yearly(){
                this.year_recurrence = 'on'
                this.month_recurrence = null
                this.isWeekly = false
                this.isWeeklyActive = true

            },
            weekly(){
                this.year_recurrence = null
                this.month_recurrence = null
                // this.isWeekly = true
                this.isWeekly = !this.isWeekly
                this.isWeeklyActive = !this.isWeeklyActive
            },
            onMailSchedule(){
                // console.log('date......', this.dateValidate());

                let scheduledData = {
                    template_lot_id  : this.campaignId,
                    execute_at_time  : this.timeFormating(),
                    execute_at_days  : this.selectedDays,
                    execute_at_date  : this.dateFormating(),
                    month_recurrence : this.month_recurrence,
                    year_recurrence : this.year_recurrence
                }
                console.log('scheduledData', scheduledData)
                this.axios.post('http://localhost:8080/lcrm-api/mtk-register-schedule-template',scheduledData).then((response)=>{
                    if(response.data.response_code === 200){
                        this.isMailNow=true
                        console.log('groupList', response.data.response_body);
                        this.isScheduled=true
                    }else{
                        console.log('error...', response)
                    }
                }).catch(function (error){
                    console.log( error);
                });
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

</style> 

 