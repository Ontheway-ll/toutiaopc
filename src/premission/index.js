// 前置路由路由守卫,在mainjs中引入
// 注册全局前置守卫
import router from '../router/index'
router.beforeEach(function (to, from, next) {
  // 判断是去哪个页面，如果以/home为开头，判断有没有token，
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('./login')
    }
  } else {
    next()
  }
})
