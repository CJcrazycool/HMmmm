import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex
Vue.use(Vuex)

//按需导入 
import {addLocalGoods,getTotalCount,getLocalGoods,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'

const store = new Vuex.Store({
    //要操作的数据
    state:{
        buyCount:0
    },
    //取到仓库里的数据
    getters:{
        getBuyCount(state){
            // 如果刷新时等于0的话,就把本地存储的总数赋值给state总数
            // 否则,还是给操作后的值
            return state.buyCount == 0?getTotalCount():state.buyCount
        }
    },
    // 操作数据
    mutations:{
        addGoods(state,goods){
            state.buyCount = addLocalGoods(goods)
            
        },
        updateGoods(state,goods){
            state.buyCount = updateLocalGoods(goods)
            
        },
        deleteGoods(state,goodsId){
            state.buyCount = deleteLocalGoods(goodsId)
        }

    }
})


// 导出
export default store