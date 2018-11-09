<template>
    <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/cart.html">购物车</a>
                </div>
            </div>

            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <!--购物车头部-->
                        <div class="cart-head clearfix">
                            <h2>
                                <i class="iconfont icon-cart"></i>我的购物车</h2>
                            <div class="cart-setp">
                                <ul>
                                    <li class="first active">
                                        <div class="progress">
                                            <span>1</span>
                                            放进购物车
                                        </div>
                                    </li>
                                    <li>
                                        <div class="progress">
                                            <span>2</span>
                                            填写订单信息
                                        </div>
                                    </li>
                                    <li class="last">
                                        <div class="progress">
                                            <span>3</span>
                                            支付/确认订单
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--购物车头部-->
                        <!--商品列表-->
                        <div class="cart-box">
                            <input id="jsondata" name="jsondata" type="hidden">
                            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                                <tbody>
                                    <tr>
                                        <th width="48" align="center">
                                            <a>选择</a>
                                        </th>
                                        <th align="left" colspan="2">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="104" align="center">数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                        <th width="54" align="center">操作</th>
                                    </tr>
                                    <tr v-for="(item,index) in goodList" :key="item.id">
                                        <td width="48" align="center">
                                            <el-switch v-model="item.isSelected">
                                            </el-switch>
                                        </td>
                                        <td align="left" colspan="2">
                                            <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                                <span>{{item.title}}</span>
                                            </div>
                                        </td>
                                        <td width="84" align="left">{{item.sell_price}}</td>
                                        <td width="104" align="center">
                                            <inputnumber :goodsId="item.id" :count="item.buycount" @goodsCountChange="getChangeGoods"></inputnumber>
                                        </td>
                                        <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                        <td width="54" align="center">
                                            <a @click="deleteGoods(index)" href="javascript:void(0)">删除</a>
                                        </td>
                                    </tr>
                                    <tr v-if="goodList.length === 0">
                                        <td colspan="10">
                                            <div class="msg-tips">
                                                <div class="icon warning">
                                                    <i class="iconfont icon-tip"></i>
                                                </div>
                                                <div class="info">
                                                    <strong>购物车没有商品！</strong>
                                                    <p>您的购物车为空，
                                                        <a href="/index.html">马上去购物</a>吧！</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="right" colspan="8">
                                            已选择商品
                                            <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                            <span class="red">￥</span>
                                            <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--/商品列表-->
                        <!--购物车底部-->
                        <div class="cart-foot clearfix">
                            <div class="right-box">
                                <button class="button" @click="continueBuy">继续购物</button>
                                <button class="submit" @click="goToPay">立即结算</button>
                            </div>
                        </div>
                        <!--购物车底部-->
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
    .shopInfo {
        display: flex;  
        align-items: center;
    }

        
</style>

<script>

// 导入本地存储数据
import {getLocalGoods} from '../../common/localStorage.js'
//导入子组件
import inputnumber from '../subcomponents/inputnumber.vue'

    export default{
        components: {
            inputnumber
        },
        data(){
            return {
                goodList:[]
            }
        },
        created() {
            
            this.getGoodListData()
        },
        computed:{
            //获取总数量
            getTotalCount(){
                let totalCount = 0
                this.goodList.forEach(item=>{
                    if(item.isSelected){
                        totalCount+= item.buycount
                    }
                })
                return totalCount
            },
            //获取总金额
            getTotalAmount(){
                let totalAmount = 0
                this.goodList.forEach(item=>{
                    if(item.isSelected){
                        totalAmount +=item.buycount*item.sell_price
                    }
                })
                return totalAmount
            },

        },
        
        methods:{
            // 点击切换商品列表组件页面
            continueBuy(){
                console.log("111111")
                this.$router.push({path: '/goodslist'})
            },
            // 点击切换下单组件页面(带参数:商品的id)
            goToPay(){
                const ids = []
                this.goodList.forEach(item => {
                    if(item.isSelected){
                        ids.push(item.id)
                    }
                })
                if(this.goodList.length === 0){
                    this.$message({
                        showClose: true,
                        message: '至少需要选择一件商品下单!!!',
                        type: 'error'
                    });
                    return
                }
                // 通过编程式导航,跳转到下单页面(带)
                this.$router.push({ 
                    path: '/order',
                    query: {id: ids.join(',')}
                    })
            },
            getGoodListData(){
                // 获取本地存储
                const localGoods = getLocalGoods()
                // console.log(localGoods)
                
                const keys = Object.keys(localGoods)
                // console.log(keys)

                // 判断是否有值
                if(keys.length === 0){
                    return false;
                }

                // 发送请求
                const url = `site/comment/getshopcargoods/${keys.join(',')}`//把数组转成用逗号分隔的字符串
                // console.log(url)
                this.$axios.get(url).then(res=>{
                    res.data.message.forEach(item=>{
                        item.buycount = localGoods[item.id]
                        item.isSelected = true  
                    })
                    // console.log(res.data.message)
                    // 赋值给goodList
                    this.goodList = res.data.message
                    // console.log(this.goodList)
                })
            },
            //改变数量
            getChangeGoods(changeGoods){
                // console.log(changeGoods)
                this.goodList.forEach(item=>{
                    if(changeGoods.goodsId === item.id){
                        item.buycount = changeGoods.count
                    }
                })

                // 准备好载荷
                this.$store.commit('updateGoods',changeGoods)
                
            },
            //删除商品
            deleteGoods(index){
                // 使用elemen-ui框架
                this.$confirm(`是否删除下标为${index}的商品?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });    
                    this.$store.commit('deleteGoods',this.goodList[index].id)
                    this.goodList.splice(index,1)
                    console.log(this.goodList)
                //提交
                })
                .catch(() => {});
            },
        }
    }
</script>