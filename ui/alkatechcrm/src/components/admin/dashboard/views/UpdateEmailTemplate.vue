<template>
    <div>
        <ValidationObserver v-slot="{ handleSubmit }">

        <b-form  @submit.prevent="handleSubmit(updateTemplate)" class="mt-2">
        <b-container fluid class="mt-4">
            <b-card>
            <b-row >
                     <b-col>
                       <b-form-group 
                       >
                            <label style="float:left !important" for="template-category"
                            v-b-popover.hover="' Select Template Category'" title="Select Category"
                            ><b>Select Category*</b></label>
                           <b-form-select 
                           
                            @change="onChangeCategory()" v-model="selectedCategory" :options="TemplateCategory" placeholder="Filter By Category"></b-form-select>
                       </b-form-group>
                     </b-col>
                    <b-col>
                       <b-form-group  >
                            <label style="float:left !important" for="feedback-user"
                            v-b-popover.hover="' Select Template'" title="Select Template"
                            ><b>Select Template*</b></label>
                           <b-form-select  @change="onChangeTemplate()" v-model="selectedTemplates" :options="Templates"  placeholder="Select Template"></b-form-select>
                       </b-form-group>
                    </b-col>
            </b-row>
            <b-alert
                        :show="dismissCountDown"
                        dismissible
                        variant="success"
                        @dismissed="dismissCountDown=0"
                        @dismiss-count-down="countDownChanged"
                        class="elementToFadeInAndOut alert-custom-position mt-2"
                        v-if="isTemplateUpdate"
                    >
                    <p variant="success" class="text-float"
                    > <i class="fa fa-smile" /> Template Updated successfully
                    </p>
                    <b-progress
                            variant="warning"
                            :max="dismissSecs"
                            :value="dismissCountDown"
                            height="4px"
                    ></b-progress>
                    </b-alert>
                </b-card>

             <b-row  v-if="toggleEditor" class="mt-2">
                <b-col>
                    <b-card class="bg-light ar-ckeditor">
                        <input type="hidden" name="id" id="templateId" v-model="templateId">
                        <editor  v-model.lazy="htmlediotr"
                                api-key="no-api-key"
                                 readonly =true
                                :init="{
                                            height: 650,
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
          <ValidationProvider name="Category" rules="required" v-slot="{ errors }">

                                <b-form-group >
                                    <v-select class="style-chooser"
                                              v-model="TemplateSelectedCategory"
                                              placeholder="Please select an category"
                                              size="lg"
                                              :options="TemplateCategory"
                                              :filterable="true"
                                              :multiple="true"
                                              :taggable="true"
                                              :create-option="option => ({value: option.toLowerCase(), label: option})"
                                    >
                                    </v-select>
                                          <span class="text-float">{{ errors[0] }}</span>
                                </b-form-group>
          </ValidationProvider>
                            </b-col>
                            <b-col>
            <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
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
                                          <span class="text-float">{{ errors[0] }}</span>

                    </b-form-group>
            </ValidationProvider>
                            </b-col>
                        </b-row>
                        
                        <b-form-group  label-for="submit-template">
                            <b-button class="ripple" type="submit"  variant="primary">
                                Update
                            </b-button>
                        </b-form-group>
                    </b-card>
                </b-col>
             </b-row>
        </b-container>
        </b-form>
        </ValidationObserver>
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
                templateId:null,
                TemplateSelectedCategory:[],


                TemplateCategory: [{ value: null, text: 'All Categories',  default:true }],
                Templates:[{ value: null, text: 'Select a Template',default:true, disabled:true }],
                selectedTemplates:null,
                selectedCategory:null,



                toggleEditor:false,
                dismissSecs: 3,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                isTemplateUpdate: false
            }
        },
        mounted() {
            // Set the initial number of Template Category
            this.fetchCategories();
            this.fetchTemplates();



        },

        methods: {

            fetchCategories(){

                this.axios.post('http://localhost:8080/lcrm-api/mtk-list-parent-category').then((response)=>{
                    if(response.data.response_code === 200){
                        response.data.response_body.map((data) => this.TemplateCategory.push( { value: data.id, text: data.category_name, label: data.category_name   }));
                    }

                }).catch(function (error){
                    console.log( 'error',error);
                });
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            fetchTemplates($category_id){
                this.axios.post('http://localhost:8080/lcrm-api/mtk-list-mail-template',{
                    'category_id':$category_id,
                }).then((response)=>{
                    if(response.data.response_code === 200){
                        this.Templates=[];
                        this.Templates.push({value: null, text: 'Select a Template', default: true, disabled: true} ),
                        response.data.response_body.map((data) => this.Templates.push( { value: data.id, text: data.title  }));
                    }
                }).catch(function (error){
                    console.log( 'error',error);
                });
            },

            fetchTemplateData($templateId){
                this.axios.post('http://localhost:8080/lcrm-api/mtk-single-get-template',{
                    'id':$templateId,
                }).then((response)=>{
                    if(response.data.response_code === 200){
                        this.htmlediotr=response.data.response_body[0].template
                        this.templateTitle=response.data.response_body[0].title
                        this.templateId=response.data.response_body[0].id

                        this.axios.post('http://localhost:8080/lcrm-api/mtk-list-category-By-StringifyArray',{
                            'categoryString':response.data.response_body[0].categories,
                        }).then((categoryResponse)=>{
                            if(categoryResponse.data.response_code === 200){
                                this.TemplateSelectedCategory=[]
                                categoryResponse.data.response_body.map((data) => this.TemplateSelectedCategory.push({ value: data.id, text: data.category_name, label: data.category_name }));
                            }
                        }).catch(function (error){
                            console.log( 'error',error);
                        });
                    }

                }).catch(function (error){
                    console.log( 'error',error);
                });
            },
            onChangeCategory(){

                this.fetchTemplates(this.selectedCategory)

            },

            onChangeTemplate(){
                this.toggleEditor=true;
                this.fetchTemplateData(this.selectedTemplates)
            },

            removeSelectedFile() {
                this.htmlediotr='';
                this.templateTitle=null;
                this.categories=null;
                this.templateId=null;
                this.TemplateSelectedCategory=[];
                this.toggleEditor = false
            },
            updateTemplate(){
                if (this.TemplateSelectedCategory.length>0){
                    var category_name = [];
                    for(var i=0; i<this.TemplateSelectedCategory.length; i++){
                        category_name[i]=this.TemplateSelectedCategory[i].label
                    }
                    this.categories=category_name;
                         axios.post('http://localhost:8080/lcrm-api/mtk-update-sms-template', {
                    id: this.templateId,
                    template: this.htmlediotr,
                    title: this.templateTitle,
                    category_name: this.categories,
                }).then((response) =>  {
                        this.removeSelectedFile()
                        console.log(response);
                        // alert(response.data.response_message)
                        this.dismissCountDown = this.dismissSecs
                        this.isTemplateUpdate=true
                    })
                    .catch( (error) => {
                        console.log(error);
                    });
                 }
                 else{
                    this.isTemplateUpdate=false
                }
            }
           


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
 .alert-custom-position{
        position: fixed;
        bottom: 0px;
        right: 12px;
    }
    .removeFile {
        width: 200px;
    }
</style>














 
        


     