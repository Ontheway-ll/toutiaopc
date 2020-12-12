// Vue.use会调用对象中的install方法，install方法的第一个参数是vue对象
import LayoutHeader from './home/layout-header'
import LayoutSide from './home/layout-side'
import BreadCrumb from './common/bread-cumb'
export default {
  install: function (Vue) {
    // 全局注册组件,第一个组件名，第二个组件对象
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-side', LayoutSide)
    Vue.component('bread-cumb', BreadCrumb)
  }
}
