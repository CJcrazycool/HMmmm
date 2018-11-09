import Vue from 'vue'
import VueRouter from "vue-router"
// 导入axios
import axios from 'axios'
//把axios挂载在Vue原型上
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true //设置携带cookie

Vue.use(VueRouter)

// 导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import login from '../components/account/login.vue'
// import order from '../components/order/order.vue'
// import payorder from '../components/pay/payorder.vue'
// import paySuccess from '../components/pay/paySuccess.vue'
// import vipCenter from '../components/vip/vipCenter.vue'
// import orderInfo from '../components/vip/orderInfo.vue'
// import myOrders from '../components/vip/myOrders.vue'


// 路由懒加载
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')
// 设置路由规则
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:postId',component:goodsinfo},
        {path:'/shopcart',component:shopcart},
        {path:'/login',component:login},
        // 路由元信息和导航守卫配合起来检验那些路径需要做登录验证的
        {path:'/order',component:order,meta: { checkoutLogin: true }},
        {path:'/payorder',component:payorder,meta: { checkoutLogin: true }},
        {path:'/paySuccess',component:paySuccess,meta: { checkoutLogin: true }},
        {path:'/vipCenter',component:vipCenter,meta: { checkoutLogin: true }},
        {path:'/orderInfo',component:orderInfo,meta: { checkoutLogin: true }},
        {path:'/myOrders',component:myOrders,meta: { checkoutLogin: true }},
    ]
})

// 拦截所有路由跳转
router.beforeEach((to,from,next)=>{
    // 如果不是去登录页面, 就记录上一次(想去)的页面
    if(to.path!=='/login'){
        // console.log(to.fullPath)
        localStorage.setItem('wantVisitPath',to.fullPath)    
    }
    if(to.meta.checkoutLogin){//需要进行登录验证
        //在这里需要检查是否登录
        axios.get('site/account/islogin').then(res=>{
            // console.log(res.data.code)
            if(res.data.code==='logined'){//登陆过
                next()
            }else{
                router.push({path:'/login'})
            }
        })
    }else{
        next()
    }

})

// 导出成员
export default router