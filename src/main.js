// 导入vue
import Vue from 'vue'
// import ElementUI from 'element-ui'
// load一定要按官方文档写小写'l'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  loading:require('./statics/site/images/01.gif')
})

//导入根组件
import App from './App.vue'

// Vue.use(ElementUI)

//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui'

// 使用
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// 全局导入样式
// import 'element-ui/lib/theme-chalk/index.css';
import "./statics/site/css/style.css"


Vue.config.productionTip = false


// 导入路由对象
import './filters'
import router from './router'
import store from './store'

new Vue({
  //渲染根组件
  render: h => h(App),
  //注入根实例
  router,
  store
}).$mount('#app')
