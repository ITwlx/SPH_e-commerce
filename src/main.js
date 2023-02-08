import Vue from 'vue'
import App from './App.vue'
import router from '@/route'

// 引入vuex
import store from '@/store/index'

//引入注册全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 全局引入轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 全局引入分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入element-ui
import { Button, MessageBox, Message, } from 'element-ui'
Vue.use(Button)


//引入mockServejs--mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
// 引入所有的API
import * as API from '@/api'

//图片懒加载
import wlx from '@/assets/wlx.jpg'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: wlx
})

//自定义插件
// import plugin from '@/plugins/myPlugins'
// Vue.use(plugin,{
//   name:'upper'
// })

new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API,
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$message = Message;
  },
  router,
  store
}).$mount('#app')
