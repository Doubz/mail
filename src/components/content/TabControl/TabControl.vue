<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span  >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit("tabClick",index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
  }
  .tab-control-item{
    flex: 1;
    text-align: center;
  }
  .tab-control-item span{ 
    font-size:15px;
    padding: 5px 0;
  }
  .active span{
    border-bottom: 1px solid var(--color-high-text);
    color: var(--color-high-text);

  }
</style>