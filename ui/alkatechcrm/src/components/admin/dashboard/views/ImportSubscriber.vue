<template>
  <b-container fluid class="mt-4">
    <b-card class="card-style">
    <b-row>
      <b-col lg="4">
          <b-card-body>
            <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b>Passed Records</b> 
              <b-badge variant="primary" pill>{{this.Passed_Records}}</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b>Faild Records</b>
              <b-badge variant="primary" pill>{{this.Failed_Records}}</b-badge>
            </b-list-group-item>
            </b-list-group>
          </b-card-body>
      </b-col>
      <b-col lg="8">
       
    <b-card-body>
      
     <!-- <b-form inline>
     -->
       <b-row>
      
<b-col lg ="12">
<b-list-group>
  <b-list-group-item variant="info" class="d-flex justify-content-between align-items-center mb-2">
    <p style="text-align:left;"><b>Support Formate :</b>.csv,.xlsx <b>Sheet Formate:</b> email, fullname</p>
    <b-badge variant="info"  >
      <a style="color:white; text-decoration:none" href="./files/clients.xlsx" download class="p-3" size="lg"  variant="info" >
      <!-- <a style="color:white; text-decoration:none" href="./../../../../files/demo.csv" download class="p-3" size="lg"  variant="info" > -->
      <i class="fa fa-download" /> &nbsp;
      demo files</a>
    </b-badge>
  </b-list-group-item>
</b-list-group>
  <!-- <b-form-group >
             <b-alert
                show
                class="elementToFadeInAndOut mt-0"
                variant="primary"
                v-if="true">
              <p style="text-align:left;"><b>Support Formate :</b>.csv,.xls,.xlsx <b>Sheet Formate:</b> email, username</p>
           </b-alert>
        </b-form-group> -->
    </b-col>
    <!-- <b-col lg="2">
   <b-form-group >
            <a href="C:/Users/Alka-Tech-110/Documents/GitHub/crm-ui/ui/alkatechcrm/src/assets/demo.csv" class="btn" size="sm"  variant="info" download>demo filess</a>
    </b-form-group>

    </b-col> -->
  </b-row>
<b-row>
 <b-col> 

    <b-form-group >
      <v-select class="style-chooser"
        v-model="selectCategory"
        placeholder="seclect"
        size="lg" 
        :options="category"
        :filterable="true"
        :multiple="true"
        :taggable="true"
        :create-option="option => ({value: option.toLowerCase(), label: option})" 
        
        >
        
      </v-select>
      
    </b-form-group>
 </b-col>
 <b-col>
   
  <b-form-file
    id="s-input-file"
    @change="onFileSelected"
    placeholder="Choose a file "
    drop-placeholder="Drop file here..."
    accept=".csv,.xlsx"
    :disabled="busy"
    size=""
  >
  </b-form-file>
 </b-col>   
</b-row>
 

 <b-form-group>
          <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="success"
                v-if="isUploaded"
              >
                <span variant="success" class="text-float"
                  > <i class="fa fa-smile" /> Uploaded Succesfully
                </span></b-alert
              >
                 <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="danger"
                v-if="isUploadedError"
              >
                <span variant="danger" class="text-float"
                  ><i class="fa fa-frown mr-2" />{{this.isUploadedError}}
                </span></b-alert
              >
              <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="danger"
                v-if="fileFormateError"
              >
                <span variant="secondary" class="text-float"
                  >Please upload .csv,.xlsx file only
                </span></b-alert
              >
              <b-alert>
                <span
                  variant="secondary"
                  class="text-float"
                  v-if="fileFormateError"
                  >{{ this.selectedFile.name }}</span
                ></b-alert
              >
              <!-- <b-badge
                variant="success"
                style="padding: 5px 5px"
                class="mt-2"
                v-if="fileName"
                ><b>File :</b> {{ this.selectedFile.name }}</b-badge
              > -->
              <!-- <b-alert show variant="secondary">{{this.selectedFile.name}}</b-alert> -->
              <b-overlay
                :show="busy"
                no-wrap
                @shown="onShown"
                @hidden="onHidden"
              >
                <template #overlay>
                  <div
                    v-if="processing"
                    class="text-center p-4 bg-primary text-light rounded"
                  >
                    <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                    <i class="fa fa-cloud-upload-alt" />
                    <div class="mb-3">Uploading...</div>
                    <b-progress
                      min="1"
                      max="20"
                      :value="counter"
                      variant="success"
                      height="3px"
                      class="mx-n4 rounded-0"
                    ></b-progress>
                  </div>
                  <div
                    v-else
                    ref="dialog"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="form-confirm-label"
                    class="text-center p-3"
                  >
                    <p>
                      <strong id="form-confirm-label">Are you sure?</strong>
                    </p>
                    <div class="d-flex">
                      <b-button
                        size="sm"
                        variant="outline-danger"
                        class="mr-3"
                        @click="onCancel"
                      >
                        Cancel
                      </b-button>
                      <b-button
                        size="sm"
                        variant="outline-success"
                        @click="onOK"
                        >OK</b-button
                      >
                    </div>
                  </div>
                </template>
              </b-overlay>
            </b-form-group>
            <b-form-group class="mt-0">
              <b-button
                variant="primary"
                class="btn-block ripple"
                @click="onUpload"
                :disabled="busy"
                >Upload</b-button
              >
            </b-form-group>
            <!-- <b-col lg="12"><b-button  class="btn-block ripple ">Small Button</b-button></b-col> -->

    <!-- </b-form> -->
  </b-card-body>
         
      </b-col>

      </b-row>
      <b-row class="" v-if="showExcludedData">
      <b-col>
          
        <b-card-body class="custom-scroll mt-2">
           <b-alert
                show
                class="elementToFadeInAndOut mt-2"
                variant="danger"
                v-if="1"
              >
                <span variant="danger" class="text-float"
                  ><i class="fa fa-frown mr-2" /> Excluded Data ( Either they are duplicate or missing required field)
                </span></b-alert
              >
             <b-table striped hover :items="excludedData" :fields="fields" ></b-table>
       </b-card-body>
      </b-col>
    </b-row>
    </b-card>

      
  </b-container>
</template>










<script>
import axios from "axios";
export default {
  data() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return {
       fields: [],
      excludedData: [],
      showExcludedData:false,
      selectedFile: null,
      selectCategory:null,
      selectedCategoryData:[{value:'avc',label:'hjhj'}],
      fileName: false,
      fileFormateError: false,
      isUploadedError:'',
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      isUploaded:false,
      reportData:[],
      Passed_Records:null,
      Failed_Records:null,
     category: [{ value: null, label: 'Please select an option' }],
    }
  },
   mounted() {
      // Set the initial number of items
        this.axios.post('http://localhost:8080/lcrm-api/lcrm-list-parent-category').then((response)=>{
         if(response.data.response_code === 200){
          console.log('categrylist', response.data.response_body);
          response.data.response_body.map((data) => this.category.push({ value: data.id, label: data.category_name }));
         console.log('carttttttttttttt',this.category);
         }else{
           this.category.push({ value: null, label: ' 👀 No Category Found' })
          }
        }).catch(function (error){
        console.log( error);
      });
      // this.reset()
    },
  beforeDestroy() {
    this.clearInterval();
  },

  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus();
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus();
    },
    // onSubmit() {
    //   this.processing = false
    //   this.busy = true
    // },
    onCancel() {
      this.busy = false;
    },
    onOK() {
      this.counter = 1;
      this.processing = true;
      // Simulate an async request
      this.clearInterval();
      this.interval = setInterval(() => {
        if (this.counter < 100) {
          this.counter = this.counter + 1;
        } else {
          this.clearInterval();
          this.$nextTick(() => {
            this.busy = this.processing = false;
            const fileData = new FormData();
            var category_name = [];
            for(var i=0; i<this.selectCategory.length; i++){
            console.log('category_name', this.selectCategory[i].label)
            category_name[i]=this.selectCategory[i].label
            this.selectedCategoryData[i]=this.selectCategory[i].label
            }
            console.log(category_name);
            for (var  k = 0; k < category_name.length; k++) {
                fileData.append('category_name[]', category_name[k]);
            }
            fileData.append(
            "upload_excel",
            this.selectedFile,
            this.selectedFile.name,
            );
            // fileData.append("category_name", category_name1);
            this.axios
              .post(
                "http://localhost:8080/lcrm-api/register-client-ExcelUpload",
                fileData
              )
              .then((response) => {
                // this.processing = false;
                console.log(response.data.response_message, response.data.response_code)
                if(response.data.response_code === 200){
                this.fileName=false
                this.processing = false;
                this.isUploaded=true
                let errors = response.data.response_description.Excluded_Records;
                if(errors.length===0){
                  this.showExcludedData=false
                }else{
                  this.showExcludedData=true
                }
               this.Passed_Records =  response.data.response_description.Passed_Records;
               this.Failed_Records =  response.data.response_description.Failed_Records;
              let getErrorData = Object.keys(errors).map((field) => {
                        return {
                          fieldName: field,
                          message: errors[field],
                        };
                      });
                console.log('reports ::', getErrorData)
          for(var k=0; k<errors.length; k++ ){
                    // getErrorData.map((data) => this.fields.push(data.message));
           this.excludedData.push(errors[k])
          }








                 this.excludedData.push(response.data.response_description.Excluded_Records);
                }else{
                this.isUploadedError=response.data.response_message
                this.fileName=false
                console.log('respopnse error', this.response.data.response_message)
                }
              });
          });
        }
      }, 10);
    },
    onFileSelected(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
      this.fileName = true;
      this.fileFormateError = false;
      this.isUploadedError='';
      this.isUploaded=false
    
    },
    onUpload() {
      const fileData1 = new FormData();
      fileData1.append(
        "upload_excel",
        this.selectedFile,
        this.selectedFile.name
      );


      console.log(fileData1);
      if (this.selectedFile.name.split(".").pop() !== "csv" && this.selectedFile.name.split(".").pop() !== "xlsx") {
        this.fileFormateError = true;
        this.fileName = false;
        console.log("fileFormateError:", this.fileFormateError);
        console.log("extension is: ", this.selectedFile.name.split(".").pop());
      } else {
        this.busy = true;
      }
    },
  },
};
</script>
<style scoped>
 
 .vs__search, .vs__search:focus{
   font-size: 30px !important;
 }
.card-style {
  top: 10%;
  
}
.card {
  border: 0px solid rgba(0, 0, 0, 0.125);
  top: 10%;
  box-shadow: 0px 2px 10px 0px #888;
  
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  /* padding: 1rem; */
  background: white;
  /* box-shadow: 0px 2px 10px 0px #888; */
  border-radius: inherit;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
#__BVID__33__BV_file_outer_ > label{
  padding: 45px !important;
}
span {
  pointer-events: visible !important;
  cursor: pointer;
}
.elementToFadeInAndOut {
  -webkit-animation: fadeinout 2s linear forwards;
  animation: fadeinout 2s linear forwards;
}
div.custom-file-input {
  padding: 45px 0px !important;
}
.btn {
  background-color: #3e3ebb;
  color: #fff;
  min-width: 160px;
  font-size: 1.3rem;
  padding: 6px 12px;
  min-width: 0px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
  /* border-radius: 0px; */
  border: 2px solid #3e3ebb;
  outline: none;
  white-space: nowrap;
  font-weight: 500;
  vertical-align: middle;
  margin: 0px;
  box-shadow: 0 0 2px -2px rgba(29, 39, 231, 0.1),
    0 0 3px 0 rgba(29, 39, 231, 0.1), 0 0 5px 0 rgba(29, 39, 231, 0.1),
    0 2px 2px -4px rgba(29, 39, 231, 0.1), 0 4px 8px 0 rgba(29, 39, 231, 0.1),
    0 2px 15px 0 rgba(29, 39, 231, 0.1);
}

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
.btn:hover {
  background-color: #131bb4;
  border-color: #131bb4;
  color: #fff;
}
.button.btn.ripple.btn-secondary:focus {
  background: #1d27e7;
}
@-webkit-keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "Browse";
  background: red !important;
}
.alert{margin-bottom: -3px;}
.fa-frown{
  color: red;
  font-size: 20px;
}
.fa-smile{
  color: green;
    font-size: 18px;
}
p {
    margin-top: 0;
    margin-bottom: 0;
}
/* #vs1__combobox{
  padding: 4px 3px !important;
} */
 
</style>
















