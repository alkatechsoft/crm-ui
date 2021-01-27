import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Link1 from './components/admin/dashboard/views/Link1'
import Link2 from './components/admin/dashboard/views/Link2'
import Link3 from './components/admin/dashboard/views/Link3'
import Login from './components/admin/Login'
Vue.use(VueRouter)
const routes=[
  {path:'/admin', component:Link1},
  {path:'/link1', component:Login},
  {path:'/link2', component:Link2},
  {path:'/link3', component:Link3}
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
Vue.config.productionTip = false  

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
