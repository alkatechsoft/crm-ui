<template>
    <div>
        <b-container fluid class="mt-4">
            <b-row v-if="!togetEditor ">
                <b-col>
                    <b-card>
                        <!-- partial:index.partial.html -->
                        <div v-if="!file" >
                            <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
                                <div class="dropZone-info" @change="onFileSelected">
                                    <span class="fa fa-cloud-upload dropZone-title"></span>
                                    <span class="dropZone-title">Drop file or click to upload</span>
                                    <div class="dropZone-upload-limit-info">
                                        <div>extension support: txt/html</div>
                                        <div>maximum file size: 5 MB</div>
                                    </div>
                                </div>
                                <input type="file" ref="myFile" @change="onFileSelected">
                            </div>
                        </div>
                        <div v-else class="dropZone-uploaded">
                            <div class="dropZone-uploaded-info">
                                <span class="dropZone-title">Uploaded</span> 
                                <button type="button" class="btn btn-primary removeFile" >Remove File</button>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
            <br/>
            <b-row v-if="togetEditor && file">
                <b-col>
                    <b-card class="bg-light ar-ckeditor">
                        <editor  v-model.lazy="htmlediotr"
                                api-key="no-api-key"
                                :init="{
                                            height: 1000,
                                            menubar: false,
                                            paste_data_images: true,
                                            plugins: [
                                              'advlist autolink lists link image charmap print preview anchor',
                                              'searchreplace visualblocks code fullscreen',
                                              'insertdatetime media table paste help wordcount code image fullscreen',
                                            ],
                                            toolbar:
                                              'undo redo | formatselect | bold italic backcolor | \
                                               alignleft aligncenter alignright alignjustify | \
                                               bullist numlist outdent indent | removeformat Sourcecode code image fullscreen anchor| help',
                                      }"
                        />
                        <br>
                        <b-row>
                            <b-col>
                                <b-form-group >
                                    <v-select class="style-chooser"
                                              v-model="selectedCategory"
                                              placeholder="Please select an category"
                                              size="lg"
                                              :options="TemplateCategory"
                                              :filterable="true"
                                              :multiple="true"
                                              :taggable="true"
                                              :create-option="option => ({value: option.toLowerCase(), label: option})"
                                    >
                                    </v-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group id="input-group-2" label-for="input-1">
                                    <div class="input-container">
                                        <b-form-input
                                                class="input-field"
                                                id="input-1"
                                                v-model.lazy="templateTitle"
                                                type="text"
                                                placeholder="Enter Template title"
                                        ></b-form-input>
                                    </div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-form-group  label-for="submit-template">
                            <b-button class="ripple" type="button" @click="submitTemplate()" variant="primary">
                                Submit
                            </b-button>
                            <b-button class="ripple" type="button" @click="removeSelectedFile()" variant="primary">
                                Reset
                            </b-button>
                        </b-form-group>
                    </b-card>
                </b-col>
               
            </b-row>
        </b-container>
    </div>
</template>
<script>
    // import Vue from 'vue'
    import axios from 'axios';
    import Editor from "@tinymce/tinymce-vue";
    export default {
        name: 'UploadEmailTemplate',
        components: {
            editor: Editor,
        },
        data() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            return {
                htmlediotr:null,
                templateTitle:null,
                categories:null,
                TemplateCategory: [],
                selectedCategory:null,
                file:'',
                togetEditor:false,
                dragging: false
            }
        },
        mounted() {
            // Set the initial number of Template Category
            this.axios.post('http://localhost:8080/lcrm-api/mtk-list-parent-category').then((response)=>{
                if(response.data.response_code === 200){
                    response.data.response_body.map((data) => this.TemplateCategory.push({ value: data.id, label: data.category_name }));
                }
            }).catch(function (error){
                console.log( 'error',error);
            });
        },
        methods: {
            onFileSelected(event) {
                var files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                    this.dragging = false;
                    return;
                }
                this.createFile(files[0]);
                let file = this.$refs.myFile.files[0];
                if(!file || file.type !== 'text/html') return;
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload =  evt => {
                    this.htmlediotr = evt.target.result;
                    this.togetEditor=true;
                }
                reader.onerror = evt => {
                    console.error(evt);
                }
            },
            createFile(file) {
                if (!file.type.match('text.*')) {
                    alert('please select text/html file');
                    this.dragging = false;
                    return;
                }
                if (file.size > 5000000) {
                    alert('please check file size no over 5 MB.');
                    this.dragging = false;
                    return;
                }
                this.file = file;
                this.dragging = false;
            },
            removeSelectedFile() {
                this.file = '';
                this.togetEditor=false;
                this.dragging=false;
                this.htmlediotr=null;
                this.templateTitle=null;
                this.categories=null;
            },
            submitTemplate(){
                if (this.selectedCategory.length>0){
                    var category_name = [];
                    for(var i=0; i<this.selectedCategory.length; i++){
                        category_name[i]=this.selectedCategory[i].label
                    }
                    this.categories=category_name;
                }
                axios.post('http://localhost:8080/lcrm-api/mtk-register-mail-template-text', {
                    template: this.htmlediotr,
                    title: this.templateTitle,
                    category_name: this.categories
                })
                    .then((response) =>  {
                        this.removeSelectedFile()
                        console.log(response);
                        alert(response.data.response_message)
                    })
                    .catch( (error) => {
                        console.log(error);
                    });
            },
        }
    }
</script>
<style scoped>
    .card {
        border: 0px solid rgba(0, 0, 0, .125);
    }
    .card-body {
        flex: 1 1 auto;
        min-height: 1px;
        padding: 1.5rem;
        background: white;
        box-shadow: 0px 2px 10px 0px #888;
        border-radius: inherit;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
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
        transition: transform .5s, opacity 1s;
    }
    .ripple:active:after {
        transform: scale(0, 0);
        opacity: .3;
        transition: 0s;
    }
    /* btn styles */
    .btn {
        background-color: #3e3ebb;
        color: #fff;
        min-width: 160px;
        font-size: 1.3rem;
        padding: 6px 12px;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        transition: 0.3s;
        border-radius: 30px;
        border: 2px solid #3e3ebb;
        outline: none;
        white-space: nowrap;
        font-weight: 500;
        vertical-align: middle;
        margin: 0px;
        box-shadow: 0 0 2px -2px rgba(29, 39, 231, .1),
        0 0 3px 0 rgba(29, 39, 231, .1),
        0 0 5px 0 rgba(29, 39, 231, .1),
        0 2px 2px -4px rgba(29, 39, 231, .1),
        0 4px 8px 0 rgba(29, 39, 231, .1),
        0 2px 15px 0 rgba(29, 39, 231, .1)
    }
    .btn:hover {
        background-color: #131BB4;
        border-color: #131BB4;
        color: #fff;
    }
    .button.btn.ripple.btn-secondary:focus {
        background: #1d27e7;
    }
    .icon {
        border-radius: 0.25rem 0rem 0rem 0.25rem;
        padding: 10px;
        background: #ff357e;
        color: white;
        min-width: 14%;
        text-align: center;
    }
    .input-container {
        text-align: left;
        display: flex;
        width: 100%;
        margin-bottom: 5px;
    }
    .input-field {
        width: 100%;
        padding: 10px;
        outline: none;
        border-radius: 0rem 0.25rem 0.25rem 0rem;
    }
    .text-float {
    }
    .fa-frown {
        color: red;
        font-size: 20px;
    }
    .dropZone {
        width: 100%;
        height: 200px;
        position: relative;
        border: 2px dashed #eee;
    }
    .dropZone:hover {
        border: 2px solid #2e94c4;
    }
    .dropZone:hover .dropZone-title {
        color: #1975A0;
    }
    .dropZone-info {
        color: #A8A8A8;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0, -50%);
        text-align: center;
    }
    ..dropZone-title {
        color: #787878;
    }
    .dropZone input {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .dropZone-upload-limit-info {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }
    .dropZone-over {
        background: #5C5C5C;
        opacity: 0.8;
    }
    .dropZone-uploaded {
        width: 80%;
        height: 200px;
        position: relative;
        border: 2px dashed #eee;
    }
    .dropZone-uploaded-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #A8A8A8;
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0, -50%);
        text-align: center;
    }
    .removeFile {
        width: 200px;
    }
</style>
