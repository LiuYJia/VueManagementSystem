import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve=>require(['@/views/login/login'],resolve),//登陆
      hidden:true//控制左侧菜单
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/home',
      component: resolve=>require(['@/views/index/index'],resolve),//组件容器
      hidden:true//控制左侧菜单
    },
    {
      path: '/',
      name: '',
      leaf: true,
      iconClass:'el-icon-house',
      component: resolve=>require(['@/views/index/index'],resolve),//首页
      children:[
        { path:'/home',component: resolve=>require(['@/views/home/home'],resolve), name: '首页' }
      ]
    },
    {
      path: '/',
      name: '',
      leaf: true,
      iconClass:'el-icon-user',
      component: resolve=>require(['@/views/index/index'],resolve),//用户管理
      children:[
        { path:'/user',component: resolve=>require(['@/views/user/user'],resolve), name: '用户管理' }
      ]
    },
    {
      path: '/config',
      name: '系统配置',
      leaf: false,
      iconClass:'el-icon-setting',
      component: resolve=>require(['@/views/index/index'],resolve),//系统配置
      children:[
        { path:'/testStandard',component: resolve=>require(['@/views/config/testStandard'],resolve), name: '系统配置1-1' }
      ]
    }
  ]
})
