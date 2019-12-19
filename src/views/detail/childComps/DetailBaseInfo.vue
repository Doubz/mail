<template>
  <div class="DetailBaseInfo" v-if="Object.keys(goods).length !== 0">
    <div class="BaseInfo_title">
      {{goods.title}}
    </div>
    <div class="BaseInfo_price">
      <span class="n_p">{{goods.newPrice}}</span>
      <span class="o_p">{{goods.oldPrice}}</span>
      <span class="desc">{{goods.discountDesc}}</span>
    </div>
    <div class="other_info">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services_info">
      <span v-for="index in (goods.services.length-2)"><img :src="imgsrc(index)"
          alt="">{{goods.services[index].name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    create() {},
    mounted() {},
    methods: {
      imgsrc(index) {
        return this.goods.services[index].icon ? this.goods.services[index].icon : ""
      }

    },
    computed: {

    }
  }

</script>


<style scoped>
  .DetailBaseInfo {
    padding: 0 5px;
    border-bottom: 5px solid #f2f5f8;
  }

  .BaseInfo_price {
    color: #222;
    height: 30px;
    margin: 10px 0;

  }
  .BaseInfo_title{
    margin-top: 15px;
  }

  .n_p {

    color: var(--color-tint);
    font-size: 24px;

  }

  .o_p {

    margin-left: 5px;
    font-size: 13px;
    text-decoration: line-through;
    color: #999;

  }

  .desc {
    background-color: var(--color-high-text);
    color: #fff;
    font-size: 13px;
    padding: 1px 8px;
    border-radius: 9px;
    display: inline-block;
    position: relative;
    top: -10px;
  }

  .other_info {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 5px 0;
    color: #999;
    border-bottom: 1px solid #ccc;
  }

  .services_info {
    margin: 15px 0;
  }

  .services_info img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
    margin-right: 3px;
  }

  .services_info span {
    margin-right: 5px;
    font-size: 13px;

  }

</style>
