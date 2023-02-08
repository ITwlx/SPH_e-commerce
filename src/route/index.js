//路由信息页
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store'
//引入路由配置模块
import routes from './routes'
// 让编程式路由导航不在下面报错
let originPush = VueRouter.prototype.push
// 重写push|replace 方法
// 第一个参数：告诉原来的push方法，往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call | apply
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递函数：call传递函数参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写replace方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 对外暴露VueRouter类的实例
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior (to, from, savedPosition) {
        return {y : 0}
    }
})

// 全局守卫 前置守卫（在路由之间进行判断
router.beforeEach(async (to,from,next)=>{
    // to:跳转到哪个路由
    // from:从哪个路由跳转
    // next:放行函数 next()放行 next(path)放行指定路由       next(false)
    let name = store.state.user.userinfo.name
    let token = store.state.user.token
    // 如果用户登录，有token  放行进入下一个判断
    if(token){
        // 用户登录后不允许去login页面 定位到home
        if(to.path == '/login'){
            next('/')
        }
        else{
            // 如果token存在，用户名存在 放行
            if(name){
                next()
                // 如果没有用户信息，派发action让用户储存用户信息后再跳转
            }else{
                try {
                    await store.dispatch('getLoginUser')
                    next()
                } catch (error) {
                    // 如果token过期
                    await store.dispatch('loginOut')
                    next('/login') 
                }
            }
        }
        // 用户未登录
    }else{
        if(to.path == '/trade'||to.path.indexOf('pay') != -1 || to.path.indexOf('center')!=-1){
            // this.$route.query = to.path
            next('/login?redirect='+to.path)
        }else{
            next()
        }
        
    }
    
})

export default router