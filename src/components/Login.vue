<template>
    <div class="box">
      <h1>登录</h1>
     
      <div>
        <label>用户名</label>
        <input @blur="testUsername"  v-model="users.username" :placeholder="users.username" type="text" >
      </div>
       <div>
        <label>密码</label>
        <input v-on:input="testPwd" v-model="users.pwd" type="password">
      </div>
       <div>
        <button @click="test" :disabled="cansub">立即登录</button>
       </div>
       <router-link :to="{name:'Login'}">登录</router-link>
       <router-link  :to="{name:'Register'}">注册</router-link>
       <!-- <button @click="test">测试</button> -->
       <p v-show="warmshow.show"  class="wrong">{{warmshow.warmInfo}}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      warmshow:{
        show: false,
        usernamePass:false,
         pwdPass:false,
         warmInfo:"用户名不能为空!"
      },
      users: {
        username:"",
        pwd:""
      }
    }
  },
 methods:{
    testUsername(){
            if(this.users.username=== ""){
                this.warmshow.usernamePass = false;
                this.warmshow.show = true;
                this.warmshow.warmInfo = "用户名不能为空"
            }else{
               this.warmshow.usernamePass = true;
               this.warmshow.show = false;
            }  
      },
       testPwd(){
            if(this.users.pwd === ""){
                this.warmshow.pwdPass = false;
                this.warmshow.show = true;
                this.warmshow.warmInfo = "密码不能为空"
            }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(this.users.pwd) && this.users.pwd.length>8)){
                 this.warmshow.pwdPass=false;
                 this.warmshow.show=true;
                 this.warmshow.warmInfo ="请输入数字和字母组合"
     }else{
               this.warmshow.pwdPass = true;
               this.warmshow.show = false;
            }  
         },
         test(){
           this.$http.post("http://localhost:5000/login",this.users).then(({data})=>{
                if(data.status===0){
                    console.log(data.info)
                    localStorage.setItem("mytoken",data.token);
                    this.$router.push("/home")
                }else{
                   console.log(data.info)
                }
           }).catch(err=>{
                console.log(err)
           })

         }
 },
  computed:{
     cansub(){
        if(this.warmshow.usernamePass &&  this.warmshow.pwdPass){
             return false
        }else{
          return true
        }
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
     .box{margin:0 auto; width: 200px;}
     .box h1{text-align: center}
    .box label{display: block;font-size: 12px; margin-bottom: 5px; color: rgb(102, 102, 103)}
     .box input {width:200px; height:30px; outline: none ;padding: 0 5px; border: rgb(194, 196, 198) 1px solid;}
     .box button {width:214px; height:40px; background:rgb(42, 205, 153);color: #ffffff; outline: none;border:none; cursor: pointer;margin-top: 15px;margin-bottom: 20px}
    .box button:disabled{background: darkgray}
     button:hover{background: rgb(40, 184, 158)}
     .box div{margin-top: 10px}
    .wrong{color: coral; background: rgb(255, 232, 232);font-size: 13px; padding: 10px; width:194px;}
     a{text-decoration: none; color: gray; margin: 20px 0; font-size: 13px; padding: 0 10px;}
</style>
