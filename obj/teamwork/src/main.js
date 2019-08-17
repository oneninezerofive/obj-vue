import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//引入css样式
import '../src/style/bootstrap-responsive.min.css'
import '../src/style/matrix-style.css'
import '../src/style/matrix-style2.css'
import '../src/style/bootstrap.min.css'
import '../src/style/matrix-media.css'
import '../src/style/select2.css'
import '../src/style/uniform.css'
//全局引入
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

import 'vant/lib/index.css'
//引入vant样式
import Vant from './vant/index'
// import router from './router'
Vant()


//跨域
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //全局更改
import qs from 'qs'
// import router from './router'
Vue.prototype.$qs = qs;
//把插件或者方法放到vue的原型链上
Vue.prototype.$axios = axios

//引入其他路由文件
const Tabbar = () => import('./views/Tabbar.vue');
const Username = () => import('./views/Tabbar/Username.vue');
const Add = () => import('./views/Tabbar/Add.vue');
const Changepwd = () => import('./views/Tabbar/Changepwd.vue');
const Shop = () => import('./views/Tabbar/Shop.vue');
const Order = () => import('./views/Tabbar/Order.vue');
const GoodList = () => import('./views/Tabbar/shop/GoodList.vue');
const Addgd = () => import('./views/Tabbar/shop/Addgd.vue');

//路由
const routes = [
  // 放路由文件
  {
    name: 'tabbar',
    path: '/',
    component: Tabbar,
    children: [{
      name: 'username',
      path: '/tabbar/username',
      component: Username,
    }, {
      name: 'add',
      path: '/tabbar/add',
      component: Add,
    }, {
      name: 'changepwd',
      path: '/tabbar/changepwd',
      component: Changepwd,
    }, {
      name: 'shop',
      path: '/tabbar/shop',
      component: Shop,
    },
    {
      name: 'order',
      path: '/tabbar/order',
      component: Order,
    },
    {
      name: 'username',
      path: '/tabbar/username',
      component: Username,
    }, {
      name: 'add',
      path: '/tabbar/add',
      component: Add,
    }, {
      name: 'changepwd',
      path: '/tabbar/changepwd',
      component: Changepwd,
    }, {
      name: 'shop',
      path: '/tabbar/shop',
      component: Shop,
    }, {
      name: 'goodList',
      path: '/tabbar/goodList',
      component: GoodList
    }, {
      name: 'addGd',
      path: '/tabbar/addGd',
      component: Addgd,
    },

    ]
  },

]

const router = new VueRouter({
  // (缩写) 相当于 routes: routes
  routes
})

new Vue({
  router,
  // MintUI,
  render: h => h(App)
}).$mount('#app')