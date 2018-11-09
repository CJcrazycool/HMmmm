/**
 * 给 store/index.js 调用的，这个里面有 新增、修改、删除等方法
 */


// 初始化仓库
const KEY = "GOODS"

//一、先创建几个函数,方便调用
    // 1.取出本地存储的值
    const getLocalGoods = () => {
        return JSON.parse(localStorage.getItem(KEY) || '{}')
    }

    // //清空购物车
    // const deleteLocalGoods = () =>{
    //     return localStorage.removeItem(KEY)
    // }

 /**
  * 2.获取总数量
  * 
  * {88:2,89:3}   id作为key，数量作为值
  */

  const getTotalCount = () => {
    //   获取对象
    // *****************      *********************
    // *****************这里写错了,写成addLocalGoods()了,这里是获取对象,以后一定要注意,千万不能马虎,哇,找得我好辛苦*********************
    const localGoods = getLocalGoods()

    let totalCount = 0
    //循环遍历每个键的值
    for(var key in localGoods){
        totalCount+=localGoods[key]
    }
    return totalCount
  }

   /**
  * 把商品信息存储在本地
  * @param {*} goods 
  *     {goodsId:93,count:3}
  *     {goodsId:88,count:3}
  */

const addLocalGoods = goods =>{
    // 先用变量接收本地存储的对象
    const localGoods = getLocalGoods()
    // console.log(localGoods)
    // return
    // 判断
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId]+=goods.count   
    }else{
        // console.log(goods.goodsId)
        localGoods[goods.goodsId]=goods.count
    }
    

    //存储到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //调用获取总数量的方法
    return getTotalCount()
    
}

//修改数据
const updateLocalGoods = goods =>{
    // 先用变量接收本地存储的对象
    const localGoods = getLocalGoods()
    // console.log(localGoods)
    // 把修改后的count数量赋值给变量
    localGoods[goods.goodsId] = goods.count
    //存储到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //调用获取总数量的方法
    return getTotalCount()
    
}
/**
 * 删除商品信息
 * @param {s} goodsId 商品id
 */
//删除数组元素
const deleteLocalGoods = goodsId =>{
    // 先用变量接收本地存储的对象
    const localGoods = getLocalGoods()
    // console.log(localGoods)
    // 把修改后的count数量赋值给变量
    delete localGoods[goodsId]
    //存储到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //调用获取总数量的方法
    return getTotalCount() 
}

// 按需导出
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoods
}