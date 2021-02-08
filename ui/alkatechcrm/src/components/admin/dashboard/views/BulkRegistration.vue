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
            <i class="fa fa-upload upload" aria-hidden="true"></i>
            <b-form-group>
              <!-- <input name="upload_excel" type="file" @change="onFileSelected" /> -->

              <b-form-file
                class="opacity_0"
                id="s-input-file"
                @change="onFileSelected"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".csv,.xlsx"
                :disabled="busy"
              >
              </b-form-file>
              <div>
                <!-- <b-alert v-if="fileFormateError" variant="primary"><a href="#" class="alert-link">{{this.selectedFile.name}}</a></b-alert> -->
              </div>
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
              <b-badge
                variant="success"
                style="padding: 5px 5px"
                class="mt-2"
                v-if="fileName"
                ><b>File :</b> {{ this.selectedFile.name }}</b-badge
              >
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
            <b-form-group size="lg" class="mt-2">
              <b-button
                variant="primary"
                class="btn-block ripple"
                @click="onUpload"
                :disabled="busy"
                >Upload</b-button
              >
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>










<script>
import axios from "axios";

export default {
  data() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    return {
      selectedFile: null,
      fileName: false,
      fileFormateError: false,
      isUploadedError:'',
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      isUploaded:false
    };
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
            fileData.append(
            "upload_excel",
            this.selectedFile,
            this.selectedFile.name
            );
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
        // this.axios
        //   .post(
        //     "http://localhost:8080/lcrm-api/register-client-ExcelUpload",
        //     fileData
        //   )
        //   .then((response) => {
        //     console.log(response);
        //     this.processing = false;
        //   });
      }
    },
  },
};
</script>
<style scoped>
.opacity_0 {
  opacity: 0;
  cursor: pointer !important;
  right: 0%;
  top: 25%;
  position: absolute;
}
#s-input-file__BV_file_outer_>label {
    padding: 46px !important;
}
 
.custom-file-label {
  cursor: pointer !important;
}
.upload {
  font-size: 45px;
  color: #fff;
  cursor: pointer;
  background: #3e3ebb;
  padding: inherit;
  border-radius: 100%;
  box-shadow: 0px 1px 16px 0px #859294;
}
.card {
  border: 0px solid rgba(0, 0, 0, 0.125);
  top: 30%;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  /* padding: 1rem; */
  background: white;
  box-shadow: 0px 2px 10px 0px #888;
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
</style>
















