<template>
  <div id="detail" class="detail">
    <detail-nav-bar class="detail_nav" @tabNavClick="tabNavClick" ref="navbar"></detail-nav-bar>
    <scroll class="contentScroll" ref="scroll" @scroll="scroll" :probeType="3">
      <detail-swiper :images="topImages" class="detail-swiper"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-info :DetailInfo="detailInfo" @scrollRefresh="scrollRefresh"></detail-info>
      <detail-param-info ref="params" :paramsInfo="paramsInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>

      <goods-list ref="goods" :goods="recommends" class="goodslist"></goods-list>
    </scroll>
    <detail-bottom-bar @AddToCart="AddToCart"></detail-bottom-bar>
    <back-top class="backtop" @click.native="BackTop" v-show="IsShowBackTopComponent">
      <img width="40" height="40" src="~assets/img/common/top.png" alt="">
    </back-top>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from "views/detail/childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailInfo from "./childComps/DetailInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"



  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/common/BackTop/BackTop"
  import Toast from "components/common/Toast/Toast"


  import GoodsList from "components/content/goods/GoodsList"


  import {
    getDetail,
    Goods,
    shopInfo,
    getRecommend
  } from "network/detail.js"

  import {
    debounce
  } from "@/common/utils"

  import {
    itemListenerMixin
  } from "common/mixin"

  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
    },
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        detailItemListener: null,
        tabOffsetTops: [],
        IsShowBackTopComponent: false,
        message: "",
        show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.id = this.$route.params.id

      // 2.根据iid请求详情数据
      getDetail(this.id).then(res => {


        // 在这里进行数据的细分和抽离 不要把整个数据拿出来再做操作
        const data = res.result

        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages ? data.itemInfo.topImages : []

        // 2.获取商品基础信息 goodsbaseInfo
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        console.log(this.goods)

        // 3.创建店铺信息的对象
        this.shopInfo = new shopInfo(data.shopInfo)

        // 4.获取商品详情数据
        this.detailInfo = data.detailInfo.detailImage[0]

        // 5.获取商品参数
        this.paramsInfo = data.itemParams

        // 6.获取评论信息
        // 判断有可能评论没有信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }




      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      scrollRefresh() {
        this.$refs.scroll.refresh()

        this.tabOffsetTops.push(0)
        this.tabOffsetTops.push(this.$refs.params.$el.offsetTop - 44)
        this.tabOffsetTops.push(this.$refs.comment.$el.offsetTop - 44)
        this.tabOffsetTops.push(this.$refs.goods.$el.offsetTop - 44)
        this.tabOffsetTops.push(Number.MAX_VALUE)

      },
      tabNavClick(index) {
        this.$refs.scroll.scrollTo(0, -this.tabOffsetTops[index], 1000)
      },
      scroll(position) {
        const positionY = -position.y
        let length = this.tabOffsetTops.length
        // for(let i in this.tabOffsetTops){

        // if( this.$refs.navbar.currentIndex !== i &&   (i < length-1) && (positionY >= this.tabOffsetTops[i] && positionY < this.tabOffsetTops[i+1] ) || (i === length-1) && ( positionY >= this.tabOffsetTops[i]) ){

        //       console.log(i)
        //       this.$refs.navbar.currentIndex = i

        // }

        // }
        for (let i = 0; i < length - 1; i++) {
          if (this.$refs.navbar.currentIndex !== i && (positionY >= this.tabOffsetTops[i] && positionY < this
              .tabOffsetTops[i + 1])) {
            this.$refs.navbar.currentIndex = i
          }
        }


        // 3. 是否显示回到顶部
        this.IsShowBackTopComponent = -position.y > 1000
      },
      BackTop() {
        this.$refs.scroll.scrollTo(0, 0, 2000)
      },
      AddToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.oldPrice
        console.log(this.goods.oldPrice, product.price)
        product.iid = this.id

        // 2.将商品添加到购物车里

        // 不推荐直接操作state
        // this.$store.state.cartList.push(product)

        // 推荐通过mutations来操作state
        // this.$store.commit("addCart",product)

        // 这里我们mutations最好做的事情比较单一，如有逻辑操作 异步操作建议使用action
        this.$store.dispatch("addCart", product).then((res) => {
          // this.show = true
          // this.message = res

          // setTimeout(()=>{
          //   this.show=false
          //   this.message = ""
          // },1000)

          // this.$toast.show(res,2000)
          // console.log(this.$toast)
          this.$toast.show(res)

        })
      }
    },
    mounted() {

      // 监听图片加载完成时间，并实行refresh,使用防抖函数包装一层
      // let refresh = debounce(this.$refs.scroll.refresh,100)

      // this.detailItemListener= ()=>{
      //   refresh()
      // }
      // this.$bus.$on("imageLoad",this.detailItemListener)

    },
    activated() {

    },
    deactivated() {

    },
    destroyed() {
      // 这里因为detail是不在keep-alive的范围之内的，所以 离开页面不会调用方法deactivated 而会直接调用destroyed
      this.$bus.$off("imageLoad", this.detailItemListener)
    },
    mixins: [itemListenerMixin]
  }

</script>

<style scoped>
  .detail-swiper {
    width: 100%;
    height: 300px;
  }

  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail_nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .contentScroll {
    height: calc(100vh - 44px - 58px);
  }

  .goodslist {
    padding: 10px 0;
  }

  .backtop {
    position: fixed;
    width: 40px;
    height: 40px;
    z-index: 10;
    right: 25px;
    bottom: 90px;
  }

</style>
