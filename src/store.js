import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


let store = new Vuex.Store({
    state: {
        list:[]
    },    //导入数据相当于data
    getters: {},  //派生数据 相当与computed
    mutations: {
        getData(state,data){
            state.list = data
        }
    }, //修改数据 相当于methods
    actions: {
        getDate(context){
            Vue.prototype.$http.get("http://localhost:5000/list").then(({data})=>{
            //   console.log(data,context)
              context.commit("getData",data)
            })
        }, updateSortid(context,datas){
            Vue.prototype.$http.put("http://localhost:5000/updatesortid",datas).then(res=>{
            //   console.log(data,context)  
               console.log(res)
            //    context.commit("getData",res.data)
            })
        },
         updatelistid(context,datas){
            Vue.prototype.$http.put("http://localhost:5000/updatelistid",datas).then(res=>{
            //   console.log(data,context)  
               console.log(res)
            //    context.commit("getData",res.data)
            })
        },

        addbord(context,data){
            console.log(data)
            Vue.prototype.$http.post("http://localhost:5000/list",data).then(res=>{
                // console.log(res)
                context.commit("getData",res.data)
            })
        }
        
    }    //异步修改提交
})


export default store;