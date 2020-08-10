<template>
    <li class="list-wrap" :data-id-type="item.id" :data-sort-type="item.sortid">
                         <!-- <input type="text" :value="item.id"><input type="text" :value="item.sortid"> -->
                        <dl class="sublist" @mousedown="movecard">
                            <dt class="list-title">
                                <div contentEditable='true'>{{item.listtitle}}</div>
                                <a href="javascript:;" class="more-btn">
                                    <i class="iconfont icon-gengduo"></i>
                                </a>
                                <div class="list-ctrl">
                                    <p>列表动态</p>
                                    <a href="javascript:;" class="close-btn">✖️</a>
                                    <ul>
                                        <li>
                                            <a href="javascript:;">添加卡</a>
                                            <a href="javascript:;">复制列表</a>
                                            <a href="javascript:;">移动列表</a>
                                        </li>
                                        <li><a href="javascript:;">排序依据</a></li>
                                        <li>
                                            <a href="javascript:;">移动此列表中所有卡片</a>
                                            <a href="javascript:;">归档这个列表中所有卡片</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">将此列表进行归档</a>
                                        </li>
                                    </ul>

                                </div>
                            </dt>
                            <dd  class="item"
                                 v-for="(v,k) in item.task" 
                                 :key="k"
                                 @mousedown="movelist"
                                 :data-id-type="v.id" :data-lis-type="v.lid" :data-sort-type="v.sortid"
                                 > 
                                <a>{{v.tasktitle}}</a>
                            </dd>
   
                            <dd class="add">
                                <a href="javascript:;">
                                    <i class="iconfont icon-tianjiarenwu"></i>
                                    <span>添加事项</span>
                                </a>
                                <div class="add-card">
                                    <textarea name="" id=""></textarea>
                                    <div class="btns">
                                        <button>添加卡片</button>
                                        <button>✖️</button>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </li>
</template>

<script>
export default {
   props:["item"],
   methods:{
     movecard(e){
        let card = e.currentTarget
       
        //复制新卡片
        let newcard = card.cloneNode(true);
            // console.log(newcard)   
            newcard.style.position = 'absolute'
            newcard.style.left = card.getBoundingClientRect().left+"px"
            newcard.style.top = card.getBoundingClientRect().top+"px"
            newcard.style.transform ="rotate(8deg)"
        let cardwrap = card.parentElement;
        //插入父节点
            cardwrap.appendChild(newcard);  
      
       //背景变色
            card.style.backgroundColor ="rgba(0,0,0,.2)";
            card.children.forEach(element => {
            element.style.visibility = "hidden"
           });
      
      //卡片拖动
      // 1.计算 鼠标到元素左边和顶部的距离
      let disx = e.clientX - newcard.offsetLeft;
      let disy = e.clientY - newcard.offsetTop;
      // console.log(disx,disy)
      // 2.鼠标移动 计算元素到窗口位置 鼠标位置 - 鼠标到元素距离
      document.onmousemove=(e)=>{
        let nowleft = e.clientX - disx
        let nowtop = e.clientY - disy
      //元素坐标计算
        newcard.style.left = nowleft +"px";
        newcard.style.top = nowtop +"px";
        
       //父组件碰撞事件
       this.$emit("knock",newcard,cardwrap)

      }
      //3.鼠标抬起
      document.onmouseup=()=>{
            card.style.backgroundColor ="";
            card.children.forEach(element => {
            element.style.visibility = "visible"
           });
       //删除克隆节点
            cardwrap.removeChild(newcard);  
      }
     },
     movelist(e){
         let list = e.currentTarget
         let sublist = e.currentTarget.parentElement
         let taskwrap = sublist.parentElement
         event.stopPropagation()
           //复制新列
        let newlist= list.cloneNode(true);
            newlist.style.position = 'absolute'
            newlist.style.left = list.getBoundingClientRect().left+"px"
            newlist.style.top = list.getBoundingClientRect().top+"px"
            newlist.style.transform ="rotate(8deg)"
        // let listwrap = list.parentElement;
        //插入父节点
            sublist.appendChild(newlist);  
        //背景变色
            list.style.backgroundColor ="rgba(0,0,0,.2)";
            list.children.forEach(element => {
            element.style.visibility = "hidden"
           });
       //卡片拖动
      // 1.计算 鼠标到元素左边和顶部的距离
      let disx = e.clientX - newlist.offsetLeft;
      let disy = e.clientY - newlist.offsetTop;    
       // 2.鼠标移动 计算元素到窗口位置 鼠标位置 - 鼠标到元素距离
      newlist.onmousemove=(e)=>{
        let nowleft = e.clientX - disx
        let nowtop = e.clientY - disy
      //元素坐标计算
        newlist.style.left = nowleft +"px";
        newlist.style.top = nowtop +"px";
        
       //父组件碰撞事件
        this.$emit("tasknock",taskwrap,newlist,list);
      } 
        //3.鼠标抬起
      document.onmouseup=()=>{
            list.style.backgroundColor ="";
            list.children.forEach(element => {
               element.style.visibility = ""
           });
       //删除克隆节点
            sublist.removeChild(newlist);  
          
      }
     }
   }
 
}
</script>

<style scoped>
.list-wrap {
  min-width: 272px;
  margin: 0 4px;
  height: 100%;
  -webkit-user-select: none; 
  user-select: none; 
}
.sublist {
  width: 272px;
  background-color: #e0e1e5;
  color: #192d50;
  border-radius: 5px;
}
.list-title {
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  text-indent: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.list-title .more-btn {
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  color: #192d50;
  border-radius: 5px;
  margin: 5px;
}
.list-title .more-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}
.item {
  width: 240px;
  line-height: 32px;
  padding: 6px 8px 2px;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 5px;
}
.item a {
  display: block;
  color: #192d50;
}
.add {
  line-height: 32px;
  padding-left: 15px;
  margin-top: 5px;
}
.add:hover {
  background: rgba(0, 0, 0, 0.15);
}
.add:hover span {
  text-decoration: underline;
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
.add-card {
  display: none;
}
.add-card textarea {
  width: 240px;
  min-height: 66px;
  border-radius: 10px;
  border: none;
}
.add-card button {
  height: 32px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
}
.list-ctrl {
  position: absolute;
  width: 280px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ebecf0;
  padding: 0 12px;
  display: none;
}
</style>