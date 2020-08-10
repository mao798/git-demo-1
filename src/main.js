import Vue from 'vue'
import App from './App.vue'
import  router from './router'
import axios from 'axios'
import store from './store'

import  "@/assets/reset.css"
Vue.config.productionTip = false
Vue.prototype.$http= axios;

//发送请求前拦截器:
Vue.prototype.$http.interceptors.request.use(function(config){
  let token = localStorage.getItem("mytoken");
  if(token){
        config.headers.withCredentials = true;
        //授权 Authorization   令牌 Bearer '+token    为了验证使用者的身份,需要客户端向服务器端提供一个可靠的验证信息,称为Token,这个token通常由Json数据格式组成
        config.headers.common['Authorization'] = 'Bearer '+token;
  }
  return config;
})

//解决token过期无法获取数据
Vue.prototype.$http.interceptors.response.use(response=>{
  return response;
},err=>{
// console.log(err.response);
if(err.response.status===401){
   router.push("/login");
}
})




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
