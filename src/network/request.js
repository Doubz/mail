import axios from 'axios'
export function request(config) {

  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/v1",
    baseURL:"http://123.207.32.32:8000/api/v2",
    timeout: 5000
  })

  // 2.axios拦截器

  // 2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    // 拦截了要记得放行 返回出去
    return config


    // 一般作用是什么:
    // 1.比如config中的一些配置不符合服务器的要求
    // 2.比如每次发送网络请求，都希望看到一个请求图标或者进度条
    // 3.某些网络请求(比如登录(token))，必须携带一些特殊的信息
  },err => {
  })

  // 2.2享映拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },err => {
  })

  //3.发送真正的网络请求
  return instance(config)




  //   return new Promise((resolve,reject) =>{
  //     const instance = axios.create({
  //       baseURL:"http://123.207.32.32:8000",
  //       timeout:5000
  //     }) 

  //   instance(config).then(res => {
  //     resolve(res)
  //   }).catch(err => {
  //     reject(err)
  //   })
  // })

  // instance(config.baseConfig).then(res => {
  //   console.log(res)
  //   config.success(res)  
  // }).catch(err =>{
  //   console.log(err)
  //   config.failure(err)
  // })

}