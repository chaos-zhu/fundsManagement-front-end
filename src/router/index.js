import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/'
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
  base: '/funds-management/',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/capital-flow',
          component: CapitalFlow,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/account-setting',
          component: AccountSetting,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/expenditure-trend',
          component: ExpenditureTrend,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      // meta: {
      //   needLogin: false
      // }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
      // meta: {
      //   needLogin: false
      // }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, form, next) => {
  // console.log(this) // this指向路由对象router
  // console.log(vm) // undefined
  // vm.$message({ type: 'info', message: `请先登录`, center: true }) // 在这里的vm为undefined, 所以报错
  // console.log(to.path)
  if (to.path !== '/login' && to.path !== '/register') { // 如果访问的不是登录页或者注册页，则不需要做登录校验，直接调用next()
    if (localStorage.getItem('token')) {
      next() // 如果存在token则证明是登录状态的(需要return，否则还会继续往下走)
    } else {
      // 否则直接跳转到登录页，并标记请先登录
      next({
        name: 'login',
        params: {
          needLogin: true
        }
      })
    }
  } else {
    next()
  }
})

export default router
