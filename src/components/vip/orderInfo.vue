<template>
    <div>
          <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </a>
                                            <h3>

                                                ivanyb

                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/orderlist" class="">
                                                                <i class="iconfont icon-arrow-right"></i>交易订单</a>
                                                        </p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <a href="javascript:void(0)" class="add">
                                                <i class="iconfont icon-reply"></i>返回</a>
                                            <ul>
                                                <li class="selected">
                                                    <a href="javascript:;">查看订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="order-progress">
                                            <ul>
                                                <li class="first active">
                                                    <div class="progress">下单</div>
                                                    <div class="info">{{orderinfo.add_time | dateFormat("YYYY-MM-DD HH:mm:ss")}}</div>
                                                </li>
                                                <li class="">
                                                    <div class="progress">已付款</div>
                                                    <div class="info">{{orderinfo.payment_time | dateFormat("YYYY-MM-DD HH:mm:ss")}}</div>
                                                </li>
                                                <li class="">
                                                    <div class="progress">已经发货</div>
                                                    <div class="info">{{orderinfo.express_time | dateFormat("YYYY-MM-DD HH:mm:ss")}}</div>
                                                </li>
                                                <li class="last">
                                                    <div class="progress">已完成</div>
                                                    <div class="info">{{orderinfo.complete_time | dateFormat("YYYY-MM-DD HH:mm:ss")}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="form-box accept-box form-box1">
                                            <dl class="head form-group">
                                                <dd>
                                                    订单号：{{orderinfo.order_no}}

                                                    <router-link :to="'/payorder?orderid='+orderinfo.id" class="btn-pay">去付款</router-link>
                                                    <!---->
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>订单状态：</dt>
                                                <dd>
                                                    待付款
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>快递单号：</dt>
                                                <dd>

                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>支付宝</dd>
                                            </dl>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th align="left">商品信息</th>
                                                        <th width="60%">名称</th>
                                                        <th width="10%">单价
                                                        </th>
                                                        <th width="10%">数量</th>
                                                        <th width="10%">金额</th>
                                                    </tr>
                                                    <tr v-for="(item, index) in goodslist" :key="item.id">
                                                        <td width="60">
                                                            <img :src="item.imgurl" class="img">
                                                        </td>
                                                        <td align="left">
                                                            <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                                                        </td>
                                                        <td align="center">
                                                            <s>￥{{item.real_price}}</s>
                                                            <p>￥{{item.goods_price}}</p>
                                                        </td>
                                                        <td align="center">{{item.quantity}}</td>
                                                        <td align="center">￥{{item.goods_price*item.quantity}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="7" align="right">
                                                            <p>商品金额：
                                                                <b class="red">￥{{order_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                                                <b class="red">￥{{orderinfo.express_fee}}</b>
                                                            </p>
                                                            <p style="font-size: 22px;">应付总金额：
                                                                <b class="red">￥{{payable_amount}}</b>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="form-box accept-box">
                                            <dl class="head form-group">
                                                <dd>收货信息</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>顾客姓名：</dt>
                                                <dd>{{orderinfo.accept_name}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{orderinfo.area}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>联系电话：</dt>
                                                <dd>{{orderinfo.mobile}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>电子邮箱：</dt>
                                                <dd>{{orderinfo.email}} </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>备注留言：</dt>
                                                <dd>{{orderinfo.message}}</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                goodslist:[],//商品列表
                orderinfo:{},//订单信息
                order_amount:0,// 商品金额
                payable_amount:0//应付总金额,包含运费

            }
        },
        created() {
            this.getorderdetial()
        },
        methods: {
            getorderdetial(){
                // console.log(this.$route.query.orderid)
                this.$axios.get(`site/validate/order/getorderdetial/${this.$route.query.orderid}`)
                .then(res=>{
                    if(res.data.status !== 1){    
                        this.goodslist = res.data.message.goodslist
                        this.orderinfo = res.data.message.orderinfo
                        // console.log(this.goodslist,this.orderinfo)
                        // 拿到快递费
                        this.express_fee = this.orderinfo.express_fee
                        // 计算商品总金额
                        res.data.message.goodslist.forEach(item=>{
                            this.order_amount += item.goods_price * item.quantity
                            
                        })
                        // 应付总金额(加上运费)
                        this.payable_amount = this.order_amount + this.express_fee

                        // 应该先添加好属性在把整个对象赋值给实例的属性
                        
                    }else{
                        alert(res.data.message)
                    }
                   
                })
            }
        }
    }
</script>