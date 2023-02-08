// home模块的vuex小仓库
import { reqCategoryList, reqBannerlist, reqFloorlist} from '@/api'
const actions = {
    async getcategory({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('GETCATEGORY', result.data)
        }
    },
    async getBannerlist({ commit }) {
        let result = await reqBannerlist()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorlist({commit}){
       let result =  await reqFloorlist()
       if(result.code == 200){
        commit('GETFLOORLIST',result.data)
       }
    }
}
const mutations = {
    GETCATEGORY(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerlist) {
        
        state.bannerlist = bannerlist
    },
    GETFLOORLIST(state,floorlist){
        state.floorlist = floorlist
    }
}
const state = {
    categoryList: [],
    bannerlist: [],
    floorlist:[]
}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}