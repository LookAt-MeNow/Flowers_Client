
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
//$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch'
//http://43.139.117.157:8080/
//'/api/public/v1/home/catitems
// /api/public/v1/home/floordata
//$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//http://chenfei.site:8080/api/public/v1/goods/detail?goods_id=15
$http.baseUrl = 'http://43.139.117.157:8080'

//封装弹窗
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
 uni.showToast({
   title,
   duration,
   icon: 'none',
 })
}
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif