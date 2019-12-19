<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
    <check-button :isChecked="isSelectAll" @click.native="selectAllCheck"  class="check_button"></check-button>
    <span>全选</span>
    </div>
    <div class="bottom-bar-middle">
      <span>合计: ¥{{TotalPrice}}</span>
    </div>
    <div class="bottom-bar-right">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton"

import {mapGetters} from "vuex"

export default {
  name:"CartBottomBar",
  components:{
    CheckButton
  },
  data(){
    return {
      isCheckAll:false
    }
  },
  computed:{
    ...mapGetters(['cartList']),
    TotalPrice(){
      return this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) => {
        let number = item.price.slice(1)
        let price = parseFloat(number)
        return preValue + price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll(){
      // return !(this.cartList.filter(item => !item.checked).length)
      if(this.cartList.length == 0)
      {
        return false
      }
      return !(this.cartList.find(item => !item.checked))
    }
  },
  methods:{
    selectAllCheck(){
      if(this.isCheckAll){
        this.cartList.map(item =>{
          item.checked = false
        })
        this.isCheckAll = !this.isCheckAll;
      }else{
        this.cartList.map(item =>{
          item.checked = true
        })
        this.isCheckAll = !this.isCheckAll
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  justify-content: space-between;
  background-color: #eee;

}
.check_button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.bottom-bar-left{
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size:14px;
}
.bottom-bar-middle{
  display: flex;
  align-items: center;
}
.bottom-bar-right{
  width: 100px;
  background-color: #FF4500;
  color: #fff;
  align-items: center;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>