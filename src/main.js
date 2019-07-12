// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// import { Button, Menu, Submenu, MenuItem, MenuItemGroup, Card, Table, TableColumn, Input, InputNumber, Form, FormItem, Row, Col, Upload, Message, Loading, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/utils/axios.js'
Vue.prototype.$axios = axios

// Vue.use(vueSwiper) 在Home组件中使用了局部引入
Vue.use(ElementUI)
// 按需引入element.UI
// Vue.use(Button)
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Input)
// Vue.use(InputNumber)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Upload)
// Vue.prototype.$message = Message
// Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading // spinner: 'iconfont icon-loading 自定义类名
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)

Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
