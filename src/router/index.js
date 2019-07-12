import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = () => import('@/page/Index.vue')
const Login = () => import('@/page/Login.vue')
const Register = () => import('@/page/Register.vue')
const Home = () => import('@/page/main/Home.vue')
const CapitalFlow = () => import('@/page/main/CapitalFlow.vue')
const AccountSetting = () => import('@/page/main/AccountSetting.vue')
const ExpenditureTrend = () => import('@/page/main/ExpenditureTrend.vue')
const NotFound = () => import('@/page/NotFound.vue')

let router = new Router({
  mode: 'history',
  // base: '/funds-management/',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: Home
        },
        {
          path: '/capital-flow',
          component: CapitalFlow
        },
        {
          path: '/account-settings',
          component: AccountSetting
        },
        {
          path: '/expenditure-trend',
          component: ExpenditureTrend
        }
      ]
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, form, next) => {
  console.log(to)
  console.log(form)
  next()
})

export default router
