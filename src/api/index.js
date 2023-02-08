// 当前这个模块：API继续统一管理
import requests from './request'

//引入mockrequest
import mockrequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList 无参数
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 发请求：axios 发请求返回结果是Promise对象
// export const reqCategoryList = () => {
//     return requests({
//         url: '/product/getBaseCategoryList',
//         method: 'get'
//     })
// }

//获取banner轮播图
// export const reqBannerlist = () =>{
//     return mockrequests({
//         url:'/banner',
//         method:'get'
//     })
// }
export const reqBannerlist = () => mockrequests.get('/banner')

// 获取floor轮播图
export const reqFloorlist = () => {
    return mockrequests({
        url: '/floor',
        method: 'get'
    })
}

// 获取search页面里面的数据
export const reqSearchInfo = (params) => {
    return requests(
        {
            url: '/list',
            method: "post",
            data: params
        }
    )
}

// export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取详情页的数据 /api/item/{ skuId }  GET
export const reqGetGoodInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// 添加到购物车/对现有购物车数据进行改动  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddtoCart = (skuId,skuNum)=> requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

// 获取服务器购物车列表 /api/cart/cartList  GET
export const reqCartList = ()=>requests({url:'cart/cartList',method:'get'})

// 删除购物车商品  /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartList = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改购物车中是否选中的状态  /api/cart/checkCart/{skuId}/{isChecked}  get
export const reqCartListIschecked = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取注册页面的验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 获取注册用户信息 /api/user/passport/register POST
export const reqGetUserInfo = (data)=>requests({url:`/user/passport/register`,data,method:'post'})

// 用户登录，获取token /api/user/passport/login post phone password
export const reqUserLogin = (data) =>requests({url:'/user/passport/login',data,method:'post'})

// 用户登录后，保存用户的token用于校验用户 /api/user/passport/auth/getUserInfo get
export const reqLoginUser = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录 /api/user/passport/logout  get
export const reqLoginOut = ()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息 /api/order/auth/trade get
export const reqTradeInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data) =>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
 
// 获取支付信息 /api/payment/weixin/createNative/{orderId} 'get'
export const reqPaymentInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 检测订单的支付状态 /api/payment/weixin/queryPayStatus/{orderId}  'get'
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表 /api/order/auth/{page}/{limit} get
export const reqOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})