// search模块的vuex小仓库

//引入模块
import { reqSearchInfo } from "@/api"
const actions = {
    async getSearchlist({commit},params={}){
      let result =  await reqSearchInfo(params)
      if(result.code == 200){
        commit('GETSEARCHLIST',result.data)
      }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchlist){
        state.searchlist = searchlist
    }
}
const state = {
    searchlist : {}
}

// 计算属性：getters作用是计算返回的数据（简化仓库的数据）
const getters = {
    // search里面的产品数据
    // state是当前仓库的，不是大仓库的
    goodsList(state){
        return state.searchlist.goodsList || []
    },
    attrsList(state){
        return state.searchlist.attrsList || []
    },
    trademarkList(state){
        return state.searchlist.trademarkList || []
    }

}
export default {
    actions,
    mutations,
    state,
    getters
}