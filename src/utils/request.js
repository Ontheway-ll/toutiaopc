// 二次封装axios
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 请求拦截器的开发,传入两个函数，成功和失败
axios.interceptors.request.use(function (config) {
  // config就是所有请求的信息，把配置返回，配置作为请求参数进行请求
//   debugger,在返回之前最佳的注入taoken
  debugger
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = (`Bearer +${token}`)// 统一注册token
  return config
}, function (error) {
  // 失败时，会有一个错误，直接reject，
//   失败时执行第二个axios,支持promise，失败了直接reject
  return Promise.reject(error)
})

export default axios
