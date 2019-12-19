// 引用vue核心
import Vue from "vue"
// 引用vue-router
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('views/home/home')
const Category = () => import('views/category/category')
const Cart = () => import('views/cart/cart')
const Profile = () => import('views/profile/profile')
const Detail = () => import('views/detail/detail')


// 1.安装插件必须的Vue.use
Vue.use(VueRouter)


// 路由相关映射记录
const routes = [
  {
    path:"",
    redirect:"/home"
  },
  {
    path:"/category",
    component:Category
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/profile",
    component:Profile
  },
  {
    path:"/cart",
    component:Cart
  },
  {
      // 使用动态路由的方式进行传递参数或者使用query的方式进行传递参数
    
    // 1.动态路由的方式
    path:"/detail/:id",
    component:Detail
  }
]

// 2.创建router
const router = new VueRouter({
  routes,
  mode: "history"
})


// 3.导出router给App.vue使用
export default router
