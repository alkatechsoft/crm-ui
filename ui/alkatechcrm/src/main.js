import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
 
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



import VueRouter from 'vue-router'
import Clientlist from './components/admin/dashboard/views/Clientlist'
import BulkRegistration from './components/admin/dashboard/views/BulkRegistration'
import Login from './components/admin/Login'

// import Sidebar from './components/admin/dashboard/Sidebar.vue'
// import Header from './components/admin/dashboard/Header.vue'
// import Dashboard from './components/admin/dashboard/Dashboard.vue'
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
    path:'/clients',
    component:Clientlist
  },
  {
    name:'bulk-register',
    path:'/bulk-register', 
    component:BulkRegistration
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
