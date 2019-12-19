<template>
  <div id="home">
    <NavTab class="home-nav">
      <template v-slot:center>购物街</template>
    </NavTab>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"  class="tab-control1" v-show="isShowTabControl"  />

    <Scroll class="content1" ref="scroll" :probeType="3" @uploadmore="uploadmore" @scroll="contentPosition" :pullUpLoad="true" >
      <home-swiper :banners="banners"> </home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"   />
      <goods-list :goods="showGoods" />
    </Scroll>
    <back-top class="backtop" @click.native="BackTop" v-show="IsShowBackTopComponent" >
      <img width="40" height="40" src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavTab from "components/common/navbar/NavBar"
  import TabControl from "components/content/TabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/common/BackTop/BackTop"

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home"

  import {
    debounce
  } from "common/utils"

  import {
    itemListenerMixin
  } from "common/mixin"



  export default {
    name: "home",
    components: {
      NavTab,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: "pop",
        IsShowBackTopComponent:false,
        tabControlOffsetTop:0,
        isShowTabControl : false,
        saveY : 0,
        itemImgListener:null
      }
    },
    created() {


      // 1.请求多个数据 
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")



    },
    mounted() {
      //  监听item中的图片加载完成

      // 1.图片加载完成的事件监听
      // 先进行一次防抖动包装

      // const refresh = debounce(this.$refs.scroll.refresh)


      // this.itemImgListener = ()=>{
      //   //调用防抖动包装之后的
      //   refresh()
      // }
      // this.$bus.$on("itemImageLoad",this.itemImgListener)

      // 2.获取tabControl的offsetTop
      // 每个组件都有一个叫$el的属性用于取得组件中的元素
      // 是mounted生命周期函数是在真实DOM加载完了，但是没有加载完图片，所以你获取的offsetTop可能是不准确的（偏小）
      // console.log(this.$refs.tabControl.$el.offsetTop)

      // 这里我们需要监听img加载完成的事件，当img加载完成，我们再获取tabControl的元素offsetTop
      
      this.$bus.$on("imageLoad",() =>{
        this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
      })
      
    },
    destroyed(){
      console.log("-------")
    },
    activated(){
      console.log("activated")

      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)

    },
    deactivated(){
      console.log("deactivated")
      this.saveY = this.$refs.scroll.scroll.y

      this.$bus.$off("imageLoad",this.itemImgListener)
    },
    methods: {
      /*
       ** 网络请求相关
       */

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
        })
      },


      /*
       ** 处理tab事件
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break;
          case 1:
            this.currentType = "new"
            break;
          case 2:
            this.currentType = "sell"
            break;
          default:
            break;
        }

        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },
      // 处理回到顶部
      BackTop(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },

      //判断回到顶部图片的位置 
      contentPosition(position){
        // 1.判断backtop组件 是否显示
        this.IsShowBackTopComponent = -position.y > 1000.0 ? true:false

        // 2.判断当前scroll是否大于tabControl的位置 大于则吸顶

        this.isShowTabControl = (-position.y) > (this.tabControlOffsetTop-42)

      },
      uploadmore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },


    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins:[itemListenerMixin]
  }

</script>


<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;

  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    background-color: #fff;
    padding: 10px 0;
  }
  .tab-control1 {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .content1{
    height: calc(100vh - 94px);
    overflow: hidden;

  }
  .backtop{
    position: fixed;
    width: 40px;
    height: 40px;
    z-index: 10;
    right:0 ;
    bottom: 50px;
  }


</style>
