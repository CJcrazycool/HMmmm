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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="order" :rules="rules" ref="ruleFormRef" label-width="150px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input style="width:500px" v-model="order.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="area">
                                        <v-distpicker
                                         :placeholders="placeholders"
                                         :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"
                                         @selected="onSelected">
                                        </v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input style="width:500px" v-model="order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input style="width:500px" v-model="order.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="name">
                                        <el-input style="width:300px" v-model="order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="name">
                                        <el-input style="width:300px" v-model="order.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付<em>手续费：0.00元</em></el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio-group @change="expressChange" v-model="order.express_id">
                                            <el-radio label="1">顺丰快递 <em>费用：20.00元</em></el-radio>
                                            <el-radio label="2">中通快递 <em>费用：10.00元</em></el-radio>
                                            <el-radio label="3">韵达快递 <em>费用：8.00元</em></el-radio>
                                        </el-radio-group>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="(item, index) in orderList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{ item.title }}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.sell_price }}.00
                                            </span>
                                        </td>
                                        <td align="center">{{ item.buycount }}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{ item.totalamount }}.00
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" style="height:35px;">{{order.message}}</textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}.00</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}.00</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click="goBack">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
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
//导入省市区联动插件
import VDistpicker from 'v-distpicker'
//导入获取商品本地存储的方法
import {getLocalGoods} from '../../common/localStorage.js'

export default {
        components: { VDistpicker },
        data(){
            var checkMobile = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('手机号码不能为空!'))
                }
                if((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)){
                    callback()
                }else{
                    callback(new Error("手机号不合法!"))
                }
            }
            return {
                // 订单列表
                orderList:[],
                // 总商品个数
                totalCount: 0,
                // 总商品金额
                totalPrice: 0,
                // 将来要提交给后台进行下单的数据
                order: {
                    accept_name:'李亚鹏',
                    area: {
                    // 所属区域,为了方便省事,写成与后台数据一致的键值对名称
                        province: {
                            code: '440000',
                            value: '广东省'
                        },
                        city: {
                            code: '440300',
                            value: '深圳市'
                        },
                        area: {
                            code: '440306',
                            value: '宝安区'
                        }
                    },
                    address:'庭威402',
                    mobile:'13812345678',
                    email:'liyapeng@163.vip.com',
                    post_code:'518000',
                    payment_id: '6', //支付方式
                    express_id: '1', //配送方式
                    expressMoment:20, // 快递费，默认是顺丰的快递费
                    message:'双击评论666',
                    goodsAmount:0
                },
                // 表单校验规则
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请输入所属地区', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' },
                    ],
                    mobile: [
                        {validator: checkMobile, trigger: 'blur' },
                    ]
                },
                // 占位符
                placeholders: {
                    province: '------- 省 --------',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
                },
                // // 默认初始值可以直接用上面我们给的order.area对象里面的
                // select: { province: '广东省', city: '广州市', area: '海珠区' },
            }
        },
        computed:{
            getTotalAmount(){
                return this.order.expressMoment + this.totalPrice
            }
        },
        created() {
            this.getGoodsOrder()
        },
        methods: {
            // 更换最后一项(区)时触发,返回省市区的值(对象)
            onSelected(data) {
                // 整个对象赋值给初始值this.order.area
                this.order.area = data
                // console.log(this.order.area)
            },
            // 获取订单详情
            getGoodsOrder(){
                // 获取本地存储数据
                const localGoods = getLocalGoods()
                console.log(localGoods)
                //先判断本地存储有没有值
                //ES6的方法,返回键组成的数组
                var keyArr = Object.keys(localGoods)
                // 如果键数组长度为零的话,就跳转购物车路由页面,重新计算添加的商品
                if(keyArr.length == 0){
                    this.$router.push({path: '/shopcart'})
                    return
                }
                //添加goodsids
                this.order.goodsids = this.$route.query.id
                const temObj = {}

                // console.log(this.$route.query)
                const url = `site/validate/order/getgoodslist/${this.$route.query.id}`
                this.$axios.get(url)
                .then(res=>{
                    res.data.message.forEach(item=>{
                        // 把本地存储的商品id对应的商品数量赋值给数组的buycount
                        item.buycount = localGoods[item.id]
                        item.totalamount = item.buycount*item.sell_price
                        // 给对象temObj添加属性
                        temObj[item.id] = item.buycount

                        this.totalCount += item.buycount
                        this.totalPrice += item.totalamount
                    })
                    this.orderList = res.data.message
                    // 给实例的order对象添加一个属性
                    this.order.goodsAmount = this.totalPrice
                    this.order.cargoodsobj = temObj

                    // console.log(this.order.cargoodsobj)
                    // 获取本地存储中的商品数量
                })
            },
            expressChange(labelValue){
                switch(labelValue){
                    case "1":
                        this.order.expressMoment = 20
                        break;
                    case "2":
                        this.order.expressMoment = 10
                        break;
                    case "3":
                        this.order.expressMoment = 8
                        break;
                    default:
                        break;
                }
            },
            goBack(){
                this.$router.go(-1)
            },
            // 确认提交
            goToOrder(){
                this.$refs.ruleFormRef.validate((valid) => {
                if (!valid) {
                    alert('error submit!!');
                    return
                }
                this.$axios.post('site/validate/order/setorder',this.order).then(res=>{
                    // console.log(res.data)
                    if(res.data.status === 0){
                        // 1.跳转到支付页面
                        this.$router.push({ path: '/payorder',query:{orderid:res.data.message.orderid} })

                        // 2.删除本地信息
                        //把商品Id转化为数组
                        const idArr = this.$route.query.id.split(",")
                        idArr.forEach(id=>{
                            this.$store.commit("deleteGoods",id)
                        })
                    }
                })
            });
        }
    }
}
</script>