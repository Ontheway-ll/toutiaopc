import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'// 引入全局样式
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
