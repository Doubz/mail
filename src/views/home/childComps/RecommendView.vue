<template>
  <div class="recommend">
    <div class="recommendItem" v-for="item in recommends" :key="item.link" >
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"RecommendView",
  props:{
    recommends:{
      type:Array,
       default(){
         return []
       }
    }
  }
}
</script>

<style>
.recommend{
  width: 100vw;
  display: flex;
  padding-bottom: 30px;

  border-bottom: 10px solid #eee;
}
.recommend .recommendItem{
  flex: 1;
}
.recommendItem img{
  width: 70%;
  display: block;
  margin: 10px auto;
}
.recommendItem > a > div{
  text-align: center;
  
}



</style>