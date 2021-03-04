<template>

<div>

  <b-row>
    <b-col  offset-lg="0" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">
      <b-form-group
        label=""
        label-for="per-page-select"
        label-cols-sm="1"
        label-cols-md="1"
        label-cols-lg="1"
        label-cols-xl="2"
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
    <b-col  offset-lg="" xl="2" lg="3" offset-md="0" md="3" sm="3"  class="my-1">
      <b-form-group
        class="mb-0">
        <b-input-group size="sm">
          <b-form-select
            id="per-page-select"
            v-model="bulkAction"
            :options="bulkActionOptions"
            size="sm"
          ></b-form-select>
          <b-input-group-append>
            <b-button size="sm" @click="onBulkAction">action</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col offset-lg="1" xl="6" lg="5" offset-md="0" md="6" offset-sm="0"  sm="6" class="my-1">
      <b-form-group
        label=""
        label-for="filter-input"
        label-cols-sm="2"
        label-cols-lg="4"
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
    selectable
    id="table-transition-example"
    @row-selected="onRowSelected"

  >
    <template v-slot:cell()="{ value, item, field: { key }}">
      <template v-if="edit === item.id && key ==='status'"><b-form-select
        id="per-page-select"
        v-model="bulkAction"
        :options="bulkActionOptions"
        size="sm"
      ></b-form-select></template>
      <template v-if="edit !== item.id">{{ value }}</template>
      <b-form-input v-else-if="edit === item.id && key !=='status'" v-model="item[key]" />
    </template>

    <template #cell(actions)="row">
      <b-button-group>
        <b-button  variant="warning" size="sm">
          <font-awesome-icon v-if="edit === row.item.id" @click="onSave(row.item)" icon="check" class="text-denim-800  group-hover:text-denim-300" />
          <font-awesome-icon v-if="edit !== row.item.id"  @click="onEdit(row.item)" icon="pencil-ruler" class="text-denim-800  group-hover:text-denim-300" />
        </b-button>
        <b-button  variant="danger" size="sm">
          <font-awesome-icon  @click="onDelete(row.item)"  icon="trash" class="text-denim-800  group-hover:text-denim-300" />
        </b-button>
      </b-button-group>

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

</div>


</template>

<script>
    export default {
        name: "listScubscriber",
      props:['subscriberType'],
      data(){
        return {
          subscriberGroupType:'',
          edit: null,
          selectedItem:[],
          clientUpdat:[],
          bulkActionOptions:[{value: 'active', text: "Activate"},{value: 'deactivated', text: "Deactivate"},{value: 'delete', text: "Delete"},{value: 'suspended', text: "Suspend"}],
          bulkAction:null,
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
            { key: 'status', label: 'Status', sortable: false, sortDirection: 'desc' },
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

        this.fetchClientData(this.subscriberType);
      },
      methods:{
        fetchClientData(category_id){
          // Set the initial number of items
          this.$axios.post('list-client-by-category',
            {category_id:category_id}
          ).then((response)=>{
            this.items=response.data.response_body;
            this.totalRows = this.items.length
          }).catch(function (error){
            console.log( error);
          });
        },

        updateClientData(Itemdata){
          // Update Client Data
          this.$axios.post('edit-client',Itemdata
          ).then((response)=>{
            this.$toast.success(response.data.response_message)
          }).catch(function (error){
            console.log( error);
          });
        },

        deleteClientData(itemId){
          this.$axiosaxios.post('delete-client', {
            id:itemId,

          })
            .then((response) =>  {

              this.$toast.success( response.data.response_message)
              this.fetchClientData(this.subscriberType);
            })
            .catch( (error) => {
              console.log(error);
            });
        },

        BulkdeleteClientData(itemId, ItemStatus){
          this.$axiosaxios.post('delete-client', {
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
          this.fetchClientData(this.subscriberType);
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
        },
        onBulkAction(){
          if ( this.selectedItem !== null && this.bulkAction !== null ){
            var ItemStatus=null;
            if (this.bulkAction !=='delete'){
              ItemStatus=this.bulkAction;
            }
            this.selectedItem.map((data) =>
              this.BulkdeleteClientData(data.id, ItemStatus)
            );
            this.$toast.success('Bulk Action Successful')
            this.fetchClientData(this.subscriberType);
          }
        }
      }



    }
</script>

<style scoped>

</style>
