// 登录注册页面小仓库
import { reqGetCode, reqGetUserInfo ,reqUserLogin,reqLoginUser,reqLoginOut} from '@/api'
import {getToken, setToken,removeToken} from '@/utils/token'
const actions = {
    // 获取注册手机号验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    // 获取用户注册完成信息
    async GetUserInfo({ commit },  data ) {
        let result = await reqGetUserInfo(data)
        if(result.code == 200){
            return 'ok'
        }else{
            Promise.reject(new Error('faile'))
        }
    },
    // 用户登录【token】
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code == 200){
            setToken(result.data.token)
            commit('USERLOGIN',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户登录后的信息
    async getLoginUser({commit}){
        let result = await reqLoginUser()
        if(result.code == 200){
            commit('GETLOGINUSER',result.data)
            return 'ok'
        }else{
           return Promise.reject(new Error('faile123'))
        }
    },
    // 退出登录
    async loginOut({commit}){
        let result =await reqLoginOut()
        if(result.code == 200){
            commit("LOGINOUT")
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,data){
        state.token = data.token
    },
    GETLOGINUSER(state,userinfo){
        state.userinfo = userinfo
    },
    LOGINOUT(state){
        state.token = '',
        removeToken(),
        state.userinfo = {}

    }
}
const state = {
    code: '',
    token:getToken(),
    userinfo:{}
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}