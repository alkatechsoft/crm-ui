 
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Link1 from './components/admin/dashboard/views/Link1'
import Link2 from './components/admin/dashboard/views/Link2'
import Link3 from './components/admin/dashboard/views/Link3'
export default router({
routes: [
    {path:'/login', component:Login},
    {path:'/link1', component:Link1},
    {path:'/link2', component:Link2},
    {path:'/link3', component:Link3}
]
})

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



Vue.use(VueRouter)
 
Vue.config.productionTip = false  

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
