<template>
  <div class="popbord">
    <div @click="isPop">
      <slot name="menu"></slot>
    </div>
    <div class="create-card card" v-if="isShow" ref="popboard">
      <p>创建看板</p>
      <a href="javascript:;" class="close-btn" @click="close" ref="close">✖️</a>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    isPop() {
      this.isShow = true;
      window.addEventListener('click',this.close)
      //数据变化视图还未渲染此时获取元素信息需在this.$nextTick()进行
      this.$nextTick(() => {
        let boardinfo = this.$refs.popboard.getBoundingClientRect();
        // console.log(boardinfo.right);

        if (boardinfo.right > window.innerWidth) {
          let left = -boardinfo.width + this.$el.offsetWidth;
          this.$refs.popboard.style.left = left + "px";
        }
      });
    },
    close(e){
        // 由于window绑定该事件事 点击打开按钮时会冒泡触发关闭事件，这里通过指定的元素和排除的原素触发
        if(!e.path.includes(this.$el) || e.path.includes(this.$refs.close)){
            // console.log(e.path)
            this.isShow = false        
        }
        window.removeEventListener('click',close)
    }
  }
};
</script>

<style>
.popbord {
  position: relative;
}
.create-card {
  position: absolute;
  left: 0;
}
</style>