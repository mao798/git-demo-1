import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.config.productionTip = false

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home'

Vue.use(VueRouter)
let router = new VueRouter({
  mode:"history",
  routes:[{
    path:'/login',
    name:'Login',
    component:Login
  },{
    path:'/register',
    name:'Register',
    component:Register
  },{
    path:'/home',
    name:'Home',
    component:Home
  }]
})
export default router