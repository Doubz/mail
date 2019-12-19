<template>
  <div class="shop_info" v-if="Object.keys(shopInfo).length !== 0">
    <div class="info_top">
      <img :src="shopInfo.shopLogo" width="45" height="45" alt=""><span>{{shopInfo.name}}</span>
    </div>
    <div class="info_middle">
      <div class="info_middle_left shop_middle-item">
        <div class="info_sells">
          <div class="sells_count">
            {{shopInfo.cSells | sellCountFilter}}
          </div>
          <div class="sumSells">
            总销量
          </div>
        </div>
        <div class="goods_count">
          <div class="goods_number">
            {{shopInfo.cGoods}}
          </div>
          <div class="allgoods">
            全部宝贝
          </div>
          <div></div>
        </div>
      </div>
      <div class="info_middle_right shop_middle-item">
        <div v-for="item in shopInfo.score"><span class="score_desc">{{item.name}}</span><span class="score" :class="{isScore:item.isBetter}">{{item.score}}</span><span class="better" :class="{isBetter:item.isBetter}">{{item.isBetter?"高":"低"}}</span></div>

      </div>
    </div>

    <div class="info_bottom">
      <div class="shop_enter">进店逛逛</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shopInfo: {
        type: Object,
        default: {}
      }
    },
    data(){
      return {
      }
    },
    computed: {

    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value / 10000).toFixed(1) + '万'
      }
    }
  }

</script>

<style scoped>
  .shop_info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }

  .info_top {
    line-height: 45px;
    margin-left: 10px;
  }

  .info_top img {
    vertical-align: middle;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
    margin-right: 10px;
  }

  .info_middle {
    margin-top: 15px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .shop_middle-item {
    flex: 1;
    -webkit-box-flex: 1;
  }
  .info_middle_left{
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    color: #333333;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }
  .sells_count,.goods_number{
    font-size:18px;
  }
  .sumSells,.allgoods{
    font-size:12px;
    margin-top: 8px;
  }
  .info_middle_right{
    font-size:13px;
    color: #333333;
    display: flex;
    flex-direction: column;
  }
  .info_middle_right div{
    display: flex;
    justify-content: space-evenly;
    margin: 7px;

  }
  .info_middle_right div span{
    text-align: left;    
    display: block;
  }
  .score_desc{
    width: 55px;
  }
  .score{
    width: 40px;
    color: #5ea732;

  }
  .better{
    background-color: #5ea732;
    color: #fff;
  }
  .isBetter{
    background-color: #f13e3a;
    color: #fff;
  }
  .isScore{
    color: #f13e3a;

  }
  .info_bottom{
    text-align: center;
  }
  .shop_enter{
    display: inline-block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    color: #666;
    background-color:#f2f5f8;
    font-size:14px;
    margin-top: 10px;
    border-radius: 8px;
  }


</style>
