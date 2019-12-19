<template>
  <div id="app">
    <keep-alive exclude="detail">
    <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar"
import router from "./router"


export default {
  name: 'app',
  components: {
    MainTabBar
  },
  router
}
</script>

<style>
 @import "assets/css/base.css";
</style>
