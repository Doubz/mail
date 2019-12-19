<template>
  <div class="goodsitem" @click="itemClick">
    <img  v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goodsinfo">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsitem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit("itemImageLoad")
      },
      itemClick() {

        this.$router.push("/detail/"+ this.goodsitem.iid )
      }
    }
  }

</script>

<style scoped>
  .goodsitem {
    width: 48%;
    text-align: center;
    padding-bottom: 40px;
    position: relative;
  }

  .goodsitem img {
    width: 100%;
    border-radius: 5px;
  }

  .goodsitem p {
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .goodsitem .price {
    color: var(--color-high-text);
    font-size: 12px;
  }

  .goodsitem .collect {
    font-size: 12px;
    margin-left: 20px;
    position: relative;
  }

  .collect::before {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    background: url("~assets/img/common/collect.svg") 0 0 / 14px 14px;
    color: red;
    top: -1px;
    left: -14px;
  }

  .goodsinfo {
    position: absolute;
    width: 100%;
  }

</style>
