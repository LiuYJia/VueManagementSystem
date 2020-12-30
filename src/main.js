// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import common from './common/common'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$common = common
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export default router

router.beforeEach((to, from, next) => {
  var userInfo = localStorage.getItem('backendToken')
  if (to.name !== 'login' && !userInfo){
    ElementUI.Message.error('登录超时，请重新登陆！')
    next('/')
  } else if (to.name == 'login' && userInfo){
    if(from.name){
      next ()
    }else{
      next ('/home')
    }
  }else{
    next()
  }
})
