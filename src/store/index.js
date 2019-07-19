import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let Store = new Vuex.Store({
  state: { // 仓库
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    // isLogin: false
  },
  getters: { // 监听state里面某个属性的变化，类似computed属性
    getUserInfo (state) {
      // state.userInfo.name = 666 // 不能在此改变state中的数据，不会报错，但是无效
      return state.userInfo
    },
    // LoginStatus (state) {
    //   return state.isLogin
    // }
  },
  // // 只能在这里才能改变state里面的数据，mutations必须是同步函数。原因是在mutation中混合异步调用会导致程序很难调试。用devtools很难追踪状态的改变。所以就定义了一个actions专门进行异步的处理。
  mutations: {
    handleUserName (state, newValue) {
      // setTimeout(() => {
      state.userInfo.name = newValue
      // }, 1000)
    },
    setLoginStatus (state, status) {
      state.isLogin = status
    }
  },
  actions: {
    changeUserName (context, newValue) { // context: 上下文
      setTimeout(() => {
        console.log(context, newValue)
        context.commit('handleUserName', newValue)
      }, 1000)
    }
  }

})

export default Store
