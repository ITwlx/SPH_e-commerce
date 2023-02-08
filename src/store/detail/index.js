//detail的小仓库

// 引入uuid的游客身份证明
import { GetUUID } from '@/utils/uuid_token'
//引入发送请求的接口
import { reqGetGoodInfo, reqAddtoCart } from "@/api"
const actions = {
    async getgoodInfo({ commit }, skuid) {
        let result = await reqGetGoodInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 对购物车商品进行增减
    async getGoodUpdate({ commit }, { skuId, skuNum }) {
        let result = await reqAddtoCart(skuId, skuNum)
        // 判断成功还是失败
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    }
}
const mutations = {
    GETGOODINFO(state, gooddetailInfo) {
        state.gooddetailInfo = gooddetailInfo
    }
}
const state = {
    gooddetailInfo: {},
    uuid_token: GetUUID()
}
//简化数据
const getters = {
    categoryView(state) {
        return state.gooddetailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.gooddetailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.gooddetailInfo.spuSaleAttrList || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}