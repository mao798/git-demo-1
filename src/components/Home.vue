<template>
<div class="container">
     <Header></Header>
     <Subtitle></Subtitle>
     <ul class="plan-list">
         <Listitem 
            v-for="(item,key) in list" 
            :item="item" 
            :key="key"
            @knock = knock
            @tasknock = tasknock
            ref = "listwrap"
         >
         </Listitem>
         <li class="addcard">
             <input  type="text" placeholder="输入内容" ref="addtittle" @blur="post">
         </li>
     </ul>
</div>
 
</template>

<script>
import Header from "@/components/minicomponents/Header"
import Subtitle from "@/components/minicomponents/Subtitle"
import Listitem from "@/components/minicomponents/Listitem"
import {mapState} from "vuex"
export default {
    data(){
            return {
                isShow:false
            }
        }
    ,
    name:"Home",
    components:{
        Header,
        Subtitle,
        Listitem
        },
        created(){
            this.$store.dispatch("getDate");
        },
        computed:{
            ...mapState(['list'])
        },
        methods:{
            knock(newcard,cardwrap){
            //   console.log(newcard) 
              let listwrap = this.$refs['listwrap']
              for (let i=0;i<listwrap.length;i++){
                  if(listwrap[i].$el!= cardwrap){
                        //如果拖动组件不是与自身碰撞就检查碰撞
                       let result =  this.isknocked(listwrap[i].$el,newcard)
                       //如果碰撞过半交换元素
                       if(result && result.ishalf){
                           this.changelement(listwrap[i].$el,cardwrap)
                       
                       //数据更新
                       let id1 = cardwrap.getAttribute("data-id-type");
                       let sortid1 = cardwrap.getAttribute("data-sort-type");
                       let id2 = listwrap[i].$el.getAttribute("data-id-type");
                       let sortid2 = listwrap[i].$el.getAttribute("data-sort-type");
                       let datas = {
                           id1,
                           sortid1,
                           id2,
                           sortid2
                       };
                         console.log(datas)
                     //触发事件跟新接口
                       this.$store.dispatch("updateSortid",datas);
                       }
                       
                  }
              }
            },
            //检测碰撞
            isknocked(knocktarget,newcard){
                let {top:ktop,left:kleft} = knocktarget.getBoundingClientRect();
                let {top:ntop,left:nleft} = newcard.getBoundingClientRect();
                //被碰撞元素坐标
                let kminy = ktop
                let kmaxy = kleft + knocktarget.offsetHeight
                let kminx = kleft
                let kmaxx = kleft + knocktarget.offsetWidth
                //拖动元素坐标
                let nminy = ntop
                let nmaxy = nleft + newcard.offsetHeight
                let nminx = nleft
                let nmaxx = nleft + newcard.offsetWidth
                // console.log(kminy,kmaxy,kminx,kmaxx,nminy,nmaxy,nminx,nmaxx)
                if(kminx<nmaxx && kmaxx>nminx && kminy<nmaxy && kmaxy>nminy){
                    // console.log("碰撞了")
                    let ishalf
                    if(kmaxx>nmaxx){
                            //  console.log("向右")
                             ishalf = (knocktarget.offsetWidth/2 > kmaxx - nmaxx)?true:false
                    }else{
                             ishalf = (knocktarget.offsetWidth/2 > nmaxx - kmaxx)?true:false
                    }
                    //task碰撞判断元素放的位置
                    let direct
                    let tcenterY = kminy + knocktarget.offsetHeight/2
                    let ncenterY = nminy + newcard.offsetHeight/2
                    if(tcenterY<ncenterY){
                       direct = "dwon"    
                    }else{
                       direct = "up"     
                    }
                   return {
                       ishalf,
                       direct
                   }
                }
            },
            //交换元素
            changelement(ela,elb){
                //通过父级找元素在集合中的位置
                let fatherela = ela.parentNode; 
                let fatherelb = elb.parentNode;
                let elaindex = [...fatherela.children].indexOf(ela);
                let elbindex = [...fatherelb.children].indexOf(elb);
                // console.log(elaindex,elbindex,fatherela==fatherelb)
                //交换元素位置
                fatherela.insertBefore(elb,fatherela.children[elaindex])
                fatherelb.insertBefore(ela,fatherelb.children[elbindex])
            },

            //任务拖动
            tasknock(taskwrap,newlist,list){
                  let listwrap = this.$refs['listwrap']
                      for(let i=0;i<listwrap.length;i++){
                            if(listwrap[i].$el != taskwrap){
                                let result =  this.isknocked(listwrap[i].$el,newlist)
                                    // console.log(result)
                                        if(result && result.ishalf){
                                             let sublist =listwrap[i].$el.getElementsByClassName("sublist")[0];
                                             let tasklist = sublist.getElementsByClassName("item");
                                            if(tasklist.length>0){
                                                //有任务
                                                for(let i=0; i<tasklist.length;i++){
                                                    if(tasklist[i] !=newlist){
                                                        let result =  this.isknocked(tasklist[i],newlist);
                                                        //碰撞且过半
                                                        if(result && result.ishalf){
                                                            
                                                                if(result.direct =="dwon"){
                                                                    console.log(result.direct)
                                                                   sublist.insertBefore(list,tasklist[i].nextSibling);
                                                                }else{
                                                                    sublist.insertBefore(list,tasklist[i]);
                                                                }
                                                                break;
                                                        }else{
                                                            //与listwarp碰撞但没碰到list
                                                            sublist.insertBefore(list,sublist.getElementsByClassName("add")[0])
                                                             
                                                        }   
                                                    }
                                                }
                                                }else{
                                                //无任务
                                                sublist.insertBefore(list,sublist.getElementsByClassName("add")[0])
                                      }                     
                                      break  ;

                                    }
                            }


                  }
            },

            post(){
               let val =  this.$refs.addtittle.value
               let data = {name:val,sortid:this.list.length + 1}
               if(val.trim()!==''){
                   this.$store.dispatch("addbord",data)
                    this.$refs.addtittle.value = ''
               }
            }
        }
        
}
</script>

<style scoped>
.container {
  background: #4bbf6c;
  height: 100vh;
  overflow-y: hidden;
}
.plan-list {
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  height: 100%;
}

.add a {
  display: block;
  color: #6b778c;
}
.add-list {
  display: block;
  width: 264px;
  height: 32px;
  line-height: 32px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  text-indent: 10px;
}
.addcard{width:200px;  height: 100px; background: #cccccc;}
.addcard input{ height: 100%; border: none; width:100%}
</style>