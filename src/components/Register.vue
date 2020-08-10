<template>
    <div class="box">
      <h1>注册</h1>
       <div>
        <label>邮箱</label>
        <input v-model="users.email" @blur="testemail" type="text" >
      </div>
      <div>
        <label>用户名</label>
        <input v-model="users.username" @blur="testusername"  type="text" >
      </div>
       <div>
        <label>密码</label>
        <input  v-model="users.pwd" v-on:input="testpwd" type="password" >
      </div>
       <div>
        <button :disabled="cansub" @click="sub">立即登录</button>
       </div>
       <router-link :to="{name:'Login'}">登录</router-link>
       <router-link :to="{name:'Register'}">注册</router-link>
       <p  v-show="checkInfo.showWarm" class="wrong">{{checkInfo.info}}</p>
  </div>
</template>

<script>
export default {
  name: 'Register',
 data(){
  return{
    checkInfo:{
      userPass:false,
      emailPass:false,
      pwdPass:false,
      info:"",
      showWarm:false
    },
    users:{
       email:"",
        username:"",
         pwd:""
   }
  } 
 },
 methods:{
   testusername(){
     if(this.users.username ===''){
         this.checkInfo.userPass=false;
         this.checkInfo.showWarm=true;
         this.checkInfo.info ="用户名不能为空"
     }else{
        this.checkInfo.userPass=true;
        this.checkInfo.showWarm=false;
     }
   },
   testemail(){
     if(this.users.email ===''){
         this.checkInfo.emailPass=false;
         this.checkInfo.showWarm=true;
         this.checkInfo.info ="邮箱不能为空"
     }else if(!/^\w+@[a-z0-9]+(.[a-z]+){1,3}/.test(this.users.email)){
         this.checkInfo.emailPass=false;
         this.checkInfo.showWarm=true;
         this.checkInfo.info ="邮箱输入错误"
     }else{
        this.checkInfo.showWarm=false;
        this.checkInfo.emailPass=true;
     }
   },
   testpwd(){
      if(this.users.pwd ===''){
         this.checkInfo.pwdPass=false;
          this.checkInfo.showWarm=true;
         this.checkInfo.info ="密码不能为空"
     }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(this.users.pwd) && this.users.pwd.length>8)){
         this.checkInfo.pwdPass=false;
         this.checkInfo.showWarm=true;
         this.checkInfo.info ="请输入数字和字母组合"
     }else{
       this.checkInfo.showWarm=false;
       this.checkInfo.pwdPass=true;
     }
   },
   sub(){
     this.$http.post("http://localhost:5000/user",this.users).then(res=>{
      if(res.data.status ==0){
            this.$router.push("/Login")
      }
     }).catch(err=>{
       return console.log(err)
     })
   }
 },
  computed:{
     cansub(){
        if(this.checkInfo.userPass && this.checkInfo.pwdPass && this.checkInfo.emailPass){
             return false
        }else{
          return true
        }
     },
   
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
     .box{margin:0 auto; width: 200px;}
     .box h1{text-align: center}
     .box label{display: block;font-size: 12px; margin-bottom: 5px; color: rgb(102, 102, 103)}
     .box input {width:200px; height:30px; outline: none ;padding: 0 5px; border: rgb(194, 196, 198) 1px solid;}
     .box button {width:214px; height:40px;background:rgb(42, 205, 153); border:none; color: #ffffff; outline: none; cursor: pointer;margin-top: 15px;margin-bottom: 20px}
    .box button:disabled{background: darkgray}
     button:hover{background: rgb(40, 184, 158)}
     .box div{margin-top: 10px}
     .wrong{color: coral; background: rgb(255, 232, 232);font-size: 13px; padding: 10px; width:194px;}
     a{text-decoration: none; color: gray; margin: 20px 0; font-size: 13px; padding: 0 10px;}
</style>