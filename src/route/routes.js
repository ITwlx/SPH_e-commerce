//导入路由模块
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import CartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// import myOrder from '@/pages/Center/myOrder'
import ourOrder from '@/pages/Center/ourOrder'
//路由的配置信息
export default [
    {
        path: "/center",
        component: Center,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        },
        children: [
            {
                path: '/center/myorder',
                // 路由懒加载
                component: ()=>import('@/pages/Center/myOrder')
            }, {
                path: '/center/ourorder',
                component: ourOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/addcartlist",
        component: CartSuccess,
        name: 'cartsuccess',
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        path: "/home",
        component: Home,
        meta: {
            //设置footer组件在login和register不显示
            show: true
        }
    },
    {
        // params传参需要占位
        path: '/search/:keyword?',
        component: Search,
        // 编程式路由导航 对象式跳转路由用到name属性
        name: 'sousuo',
        meta: {
            show: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/',
        redirect: '/home',
    }
]