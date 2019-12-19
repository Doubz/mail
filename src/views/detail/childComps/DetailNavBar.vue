<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="left_back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center >
        <div class="titles">
        <span v-for="(item,index) in titles" :class="{active:currentIndex===index}" @click="titlesClick(index)">{{item}}</span>
        </div>
      </template>
    </nav-bar>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles:["商品","参数","评论","推荐"],
        currentIndex:0
      }
    },
    methods:{
      titlesClick(index){
        this.currentIndex = index
        this.$emit("tabNavClick",index)
      },
      backClick(){
        // 两种方式都可以
        this.$router.back()
        // this.$router.go(-1)
      }
    }
  }

</script>

<style scoped>
.titles{
  font-size:14px;
  
}
.titles span{
  padding: 0 10px;
}
.active{
  color: var(--color-tint);
}
.left_back img{
  margin-top: 10px;
  padding-left: 15px;
}
</style>
