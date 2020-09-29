import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用
// dayjs().locale('zh-cn').format() // 当前实例使用
Vue.filter('relatveTime', value => {
  return dayjs().to(dayjs(value))
})
