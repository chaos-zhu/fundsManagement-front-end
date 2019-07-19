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

// 简单的防抖函数
// 用处：当持续触发事件时(窗口的resize、scroll，输入框内容校验)，一定时间段内再触发事件
// 概念：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 原理：使用闭包 + timeout
export function debounce (fn, wait) {
  let timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
