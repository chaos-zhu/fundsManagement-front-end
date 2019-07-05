import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = () => import('@/page/Index.vue')
const Login = () => import('@/page/Login.vue')
const Register = () => import('@/page/Register.vue')
const NotFound = () => import('@/page/NotFound.vue')

export default new Router({
  mode: 'history',
  // base: '/funds-management/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }
  ]
})
