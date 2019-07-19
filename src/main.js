// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import '@/assets/css/reset.css'
import '@/assets/css/common.scss'
// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/utils/axios.js'
import animate from 'animate.css'
Vue.prototype.$axios = axios

Vue.use(animate)
// Vue.use(vueSwiper) 在Home组件中使用了局部引入
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
