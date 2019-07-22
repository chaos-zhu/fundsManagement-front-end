import Vue from '@/main.js'
import axios from 'axios'
console.log('Current environment：' + process.env.NODE_ENV)
let instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : '/fm-management',
  timeout: 3000,
  headers: {}
})

instance.interceptors.request.use((config) => {
  let token = localStorage.token
  config.headers['T-Access-Token'] = token ? token.substring(1, token.length - 1) : null // 坑：后台接收到的token字符串带双引号的，前端可以处理下，直接去掉
  return config // 必须return配置
})

instance.interceptors.response.use((res) => {
  let data = res.data
  if (data.code === 401) {
    // Vue.$message({ type: 'info', message: `请先登录：${data.msg.message}`, center: true })
    Vue.$router.push('/login')
  }
  return res
})

export default instance
