<template>
<!-- 导航 -->
<div>

  <nav-bar class="cart_navbar">
    <template v-slot:center>购物车({{cartLength}})</template>
  </nav-bar>

<!-- 商品的列表  -->
<cart-list>
</cart-list>

<!-- 底部汇总 -->
<cart-bottom-bar class="cart_bottom_bar"></cart-bottom-bar>

</div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartListItem from "./childComps/CartListItem"
import CartBottomBar from "./childComps/CartBottomBar"

import {mapGetters} from "vuex"

export default {
  name:"cart",
  components:{
    NavBar,
    CartList,
    CartListItem,
    CartBottomBar
  },
  computed:{
    ...mapGetters(["cartLength","cartList"])
  }
}
</script>


<style scoped>
.cart_navbar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.cart_bottom_bar{
  height: 40px;
}
</style>