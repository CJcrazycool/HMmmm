<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 外层循环 -->
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        
                                        <span>{{ item.title }}</span>
                                        <p>
                                            <!-- 内层循环 -->
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{ subitem.title }}&nbsp;
                                            </span>
                                            
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ item.title }}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{ subitem.title }}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel :interval="3000" arrow="always" height="341px">
                                    <el-carousel-item v-for="sliderItem in goodsData.sliderlist" :key="sliderItem.id">
                                        <img :src="sliderItem.img_url">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(topItem,index) in goodsData.toplist" :key="topItem.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img :src="topItem.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{ topItem.title }}</a>
                                    <span>{{ topItem.add_time | dateFormat }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="item in goodsListData" :key="item.level1cateid" class="section">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subItem in item.level2catelist" :key="subItem.subcateid" href="/goods/43.html">{{subItem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="dataItem in item.datas" :key="dataItem.artID">
                            <router-link :to="'/goodsinfo/'+dataItem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="dataItem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{dataItem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{dataItem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{dataItem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{dataItem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .el-carousel__item img{
        width:100%;
        height: 100%;
    }
</style>
<script>

    export default {
        data(){
            return {
                // 头部的数据
                goodsData:{},
                goodsListData:[]
            }
        },
        created(){
            // 获取头部的数据
            this.getGoodData()
            this.getGoodsListData()     
        },
        methods: {
            getGoodData(){
                const url = `site/goods/gettopdata/goods`
                this.$axios.get(url).then(res=>{
                    this.goodsData = res.data.message
                    // console.log(res.data.message);
                },err=>{
                    console.log(err); 
                })
            },
            getGoodsListData(){
                const url = `site/goods/getgoodsgroup`
                this.$axios.get(url).then(res=>{
                    this.goodsListData = res.data.message
                    // console.log(this.goodsListData);
                },err=>{
                    console.log(err); 
                })
            }
        }
    }
</script>






