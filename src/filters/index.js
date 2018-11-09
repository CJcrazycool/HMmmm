//导入
//1.因为要用到Vue
import Vue from 'vue'
// 2.日期处理
import moment from 'moment'

// 注册全局过滤器
Vue.filter('dateFormat',(input,formatStr='YYYY-MM-DD')=>{
    return moment(input).format(formatStr)
})