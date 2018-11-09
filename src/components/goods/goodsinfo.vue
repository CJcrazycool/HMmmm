<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- 如果有数据就创建显示元素 -->
        <div v-if="goods.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                <div class="magnifier-container">
                                    <div class="images-cover"></div>
                                    <!--当前图片显示容器-->
                                    <div class="move-view"></div>
                                    <!--跟随鼠标移动的盒子-->
                                </div>
                                <div class="magnifier-assembly">
                                    <div class="magnifier-btn">
                                        <span class="magnifier-btn-left">&lt;</span>
                                        <span class="magnifier-btn-right">&gt;</span>
                                    </div>
                                    <!--按钮组-->
                                    <div class="magnifier-line">
                                        <ul class="clearfix animation03">
                                            <li v-for="item in goods.imglist" :key="item.id">
                                                <div class="small-img">
                                                    <img :src="item.thumb_path" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <!--缩略图-->
                                </div>
                                <div class="magnifier-view"></div>
                                <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="buyCount" :min="1" :max="goods.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                    <!-- 样式绑定三元写法 -->
                                        <a :class="isShow ? '' : 'selected'" @click="isShow = false" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li>
                                        <a :class="isShow ? 'selected' : ''" @click="isShow = true" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            
                            <!-- 商品介绍 -->
                            <div v-show="!isShow" class="tab-content entry" style="display: block;">
                                <div style="padding: 10px;" v-html="goods.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShow" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="textareaRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postCommentData" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFormat("YYYY-MM-DD hh:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2,4,8,10]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{ item.title }}</a>
                                            <span>{{ item.add_time | dateFormat }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        >
            <div class="animateImg" ref="animateImgRef" v-if="goods.imglist" v-show="isShowAnimateImg">
            <img width="50" height="50" :src="goods.imglist[0].thumb_path">
            </div>
        </transition>
    </div>

</template>
<!-- 导入css -->
<style>
/*导入放大镜css*/ 
    @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';

    /* 设置飞入购物车图片的初始定位 */ 
    .animateImg {
        position: absolute;
        width:50px;
        height:50px;
        left:0;
        top:0;
    }
    .animateImg img {
        width: 100%;
        height: 100%;
    }
</style>


<script>
// 导入放大镜插件
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'
// 按需导入iview的Affix
    import { Affix } from 'iview'

// 注册goodsinfo的私有组件
    export default {
        components: {
            Affix
        },
        data(){
            return {
                goods:{},
                buyCount: 1,//购买数量
                isShow: false,
                pageIndex: 1,
                pageSize: 2,
                total: 0,
                commentList:[],
                isShowAnimateImg: false,
                addToShopCartOffset: null,
                shoppingCartCount: null
            }
        },
        created() {
            this.getGoodsData()
            this.getCommentListData()
        },
        watch:{
            // $route是属性
            $route(){
                this.getGoodsData()
                this.getCommentListData()
            }
        },
        updated() {
              $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
        },
        methods: {
            // 获取商品数据
            getGoodsData(){
                // axios配置
                const url = `site/goods/getgoodsinfo/${this.$route.params.postId}`
                this.$axios.get(url).then(res=>{
                    // console.log(res.data.message)
                    this.goods = res.data.message
                    // console.log(this.goods)
                    // 等dom元素渲染完毕才能获取偏移量
                    setTimeout(()=>{
                        this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()
                        // console.log(this.addToShopCartOffset)
                        $(this.$refs.animateImgRef).css({
                            left: this.addToShopCartOffset.left,
                            top: this.addToShopCartOffset.top
                        })

                        //拿到上角购物车字样的偏移量
                    this.shoppingCartCount = $("#shoppingCartCount").offset()
                    // console.log(this.shoppingCartCount)
                    },200)
                })
                
            },
            // 获取商品评论列表
            getCommentListData(){
                const url = `site/comment/getbypage/goods/
                ${this.$route.params.postId
                }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                // 路径的问号后面不许空格或换行

                this.$axios.get(url).then(res=>{
                    // console.log(res.data)
                    this.total = res.data.totalcount
                    this.commentList = res.data.message
                })
            },
            // 评论分页
            // 1.切换页容量
            handleSizeChange(pageSize) {
                // 每切换页容量,就跳到第一页
                this.pageIndex = 1
                this.pageSize = pageSize
                // console.log(`每页 ${val} 条`);
                this.getCommentListData()

            },
            // 2.切换页码
            handleCurrentChange(pageIndex) {
                this.pageIndex = pageIndex
                // console.log(`当前页: ${val}`);
                this.getCommentListData()
            },
            //提交评论  
            
            // 2.点击提交评论发送请求添加评论
            // 3.重新渲染评论列表
            postCommentData(){
                // 1.获取评论框的内容(文本)
                const txtContent = this.$refs.textareaRef.value
                // console.log(txtContent)
                if($.trim(txtContent)==''){
                    this.$message({
                    showClose: true,
                    message: '评论不能为空哟!!!',
                    type: 'warning'
                    });
                    return;
                }
                // axios配置
                const url = `site/validate/comment/post/goods/${this.$route.params.postId}`
                this.$axios.post(url,{commenttxt:txtContent}).then(res=>{
                    // console.log(res.data)
                    // 清空评论框
                    this.$refs.textareaRef.value == ''
                    //跳转到第一页
                    this.pageIndex = 1
                    // 重新加载所有评论
                    this.getCommentListData()

                    this.$message({
                    showClose: true,
                    message: '评论成功!',
                    type: 'warning'
                    });
                })
            },
            //加入到购物车
            addToShopCart(){
                // alert("haha")
                this.isShowAnimateImg = true

                //准备好载荷
                const goods = {
                    goodsId: this.$route.params.postId,
                    count:this.buyCount
                }
                this.$store.commit('addGoods',goods)
            
            },

            
            // 动画钩子
            beforeEnter(el){
                el.style.left = this.addToShopCartOffset.left+'px';
                el.style.top = this.addToShopCartOffset.top+'px';   
                el.style.transform = "scale(1)"
            },
            enter(el,done){
                // 刷新动画帧
                
                el.style.transition = "all .5s"
                el.offsetWidth;
                el.style.left = this.shoppingCartCount.left+'px';
                el.style.top = this.shoppingCartCount.top+'px';
                el.style.transform = "scale(0.5)"
                done()
            },
            afterEnter(el){
                this.isShowAnimateImg = false
            }
        }
    }
</script>
