<template>
   <b-container fluid class="mt-4">
    <!-- User Interface controls -->
    <b-row>
        <b-col>
            <b-card>
            <b-button class= "" :to="'/email-temp/new'" variant="primary" style="    margin-right: -15px;">  <i class="fa fa-plus mr-2" aria-hidden="true" />  &nbsp; Add New Template </b-button>
            </b-card>

                

        </b-col>
        <b-col>
            <b-card>
             <b-button class= "" :to="'/email-temp/update'" variant="primary" style="    margin-right: -15px;">   Select Existing Template </b-button>

            </b-card>
        </b-col>
    </b-row>
   </b-container>
</template>

<script>
export default {
name:'manageTemplate'
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