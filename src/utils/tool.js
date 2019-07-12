import Vue from '@/main.js'
export function $loading (options = {fullscreen: true, text: '疯狂加载中...', background: 'rgba(0, 0, 0, 0.8)'}) {
  return Vue.$loading.service(options)
}
