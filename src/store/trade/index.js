// Trade 页面的小仓库
import {reqAddressInfo,reqTradeInfo} from '@/api'
const actions = {
    //获取交易页用户地址
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit("GETADDRESSINFO",result.data)
        }
    },
    // 获取交易页商品信息
    async getTradeInfo({commit}){
        let result = await reqTradeInfo()
        if(result.code == 200){
            commit('GETTRADEINFO',result.data)
        }
    }
}
const mutations = {
    GETADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    },
    GETTRADEINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const state = {
     addressInfo:[],
     orderInfo:{}
}
const getters ={}
export default {
    actions,
    mutations,
    state,
    getters
}