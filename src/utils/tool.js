import Vue from '@/main.js'
export function $loading (options = {fullscreen: true, text: '疯狂加载中...', background: 'rgba(0, 0, 0, 0.8)'}) {
  return Vue.$loading.service(options)
}

// 参数number为毫秒时间戳，必须是Number类型
export function formatTime (ms) {
  let date = new Date(ms)
  const y = date.getFullYear() // 年份
  const M = date.getMonth() + 1 // 月份
  const d = date.getDate() // 日
  const h = date.getHours() // 小时
  const m = date.getMinutes() // 分钟
  const s = date.getSeconds() // 秒
  return `${y}年${M}月${d}日${h}时${m}分${s}秒`
}
