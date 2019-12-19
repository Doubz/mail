import Vue from 'vue'
import App from './App.vue'
import store from "./store"

import fastClick from "fastclick"
import VueLazyload from "vue-lazyload"

import toast from "components/common/Toast"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//解决300毫秒问题
fastClick.attach(document.body)

// 安装toast插件 使用Vue.use
Vue.use(toast)

// 安装vue-lazyload插件
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
