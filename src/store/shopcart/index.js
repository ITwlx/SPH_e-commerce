import { reqCartList, reqDeleteCartList, reqCartListIschecked } from "@/api"
const actions = {
    // 获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车数据
    async delShopcart({ commit }, skuId) {
        let result = await reqDeleteCartList(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车是否选中
    async getCartIschecked({ commit }, { skuId, isChecked }) {
        let result = await reqCartListIschecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 清除所有选中商品
    clearAllChecked(context) {
        let promiseAll = []
        // 从这里循环选中商品，并删除
        context.getters.cartData.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? context.dispatch('delShopcart', item.skuId) : ''
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    // 控制是否全选
    isCheckedAll(context, checked) {
        let promiseAll = []
        context.getters.cartData.cartInfoList.forEach((item) => {
            let promise = context.dispatch('getCartIschecked', { skuId: item.skuId, isChecked: checked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartData) {
        state.cartData = cartData
    }
}
const state = {
    cartData: []
}
const getters = {
    cartData(state) {
        return state.cartData[0] || {}
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}