import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

//axios for api for start
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//vee-validation library  
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';



// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('en', en);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component("v-select", vSelect);




import VueRouter from 'vue-router'
import Subscribers from './components/admin/dashboard/views/Subscribers'
import ImportSubscriber from './components/admin/dashboard/views/ImportSubscriber'
import ViewSubscriberByType from './components/admin/dashboard/views/ViewSubscriberByType'
import Subscribersbackup from './components/admin/dashboard/views/Subscribersbackup'
import UploadEmailTemplate from './components/admin/dashboard/views/UploadEmailTemplate'
import Groups from './components/admin/dashboard/views/Groups'
import Login from './components/admin/Login'

// import Sidebar from './components/admin/dashboard/Sidebar.vue'
// import Header from './components/admin/dashboard/Header.vue'
// import Dashboard from './components/admin/dashboard/Dashboard.vue'







Vue.prototype.$localStorage = new Vue({
  data: { 
     // token property returning the ls token value 
     token: window.localStorage.getItem('token'), 
     username:window.localStorage.getItem('username') 
  },
  watch:{ 
     // watcher listening for changes on the token property
     // to ensure the new value is written back to ls 
     token(value){ window.localStorage.setItem('token', value)},
     username(value){ window.localStorage.setItem('username', value)} 
  }
})










Vue.use(VueRouter)
const routes=[
  {
    name:'admin',
    path:'/admin', 
    component:Login
  },
  // {
  //   name:'dashboard',
  //   path:'/', 
  //   component:Dashboard
  // },
  {
    name:'clients',
    path:'/subscribers',
    component:Subscribers
  },
  {
    name:'ViewSubscriberByType',
    path: '/subscribers/:id', 
    component: ViewSubscriberByType
  },
  {
    name:'import-subscriber',
    path:'/import-subscriber', 
    component:ImportSubscriber
  },
  {
    name:'Subscribersbackup',
    path:'/Subscribersbackup', 
    component:Subscribersbackup
  },
  {
    name:'email-temp',
    path:'/email-temp', 
    component:UploadEmailTemplate
  },
  {
    name:'groups',
    path:'/groups', 
    component:Groups 
  }  
]



const router = new VueRouter({
  routes,
  mode: 'history'
})
Vue.config.productionTip = false  
const openRoutes=['admin'];
console.log(router.path);
console.log('router.path');
// const c=1;
router.beforeEach((to, from, next) => {
  if(openRoutes.includes(to.name)){
    next()
  } else if(localStorage.getItem('token')){
   next()
  } else {
    next('/admin')
  }
})
Vue.prototype.$appName = localStorage.getItem('token')
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
