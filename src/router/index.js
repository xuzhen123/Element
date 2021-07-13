import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const Dashboard = ()=> import('views/dashboard/index')
 const Contract = ()=> import('views/contract/list')
 const ContractCreate = ()=> import('views/contract/create')
 const ContractEdit = ()=> import('views/contract/edit')
 const Merchant = ()=> import('views/merchant/list')
 const MerchantCreate = ()=> import('views/merchant/create')
 const MerchantEdit = ()=> import('views/merchant/edit')
 const MerchantUser = ()=> import('views/merchant/user')
 const Terminal = ()=> import('views/terminal/list')


 const router = new Router({
    routes: [
        {
            path:'/',
            redirect:'/dashboard'
        },
        {
            path:'/dashboard',
            component: Dashboard,
            meta:{
                title: '首页'
            }
        },
        {
            path:'/contract/list',
            component: Contract,
            meta:{
                title:'合同-列表'
            }
        },
        {
            path:'/contract/create',
            component: ContractCreate,
            meta:{
                title:'合同-创建'
            }
        },
        {
            path:'/contract/edit/:id(\\d+)',
            component: ContractEdit,
            meta:{
                title:'合同-编辑'
            }
        },
        {
            path:'/merchant/list',
            component: Merchant,
            meta:{
                title:'商户-列表'
            }
        },
        {
            path:'/merchant/create',
            component: MerchantCreate,
            meta:{
                title:'商户-创建'
            }
        },
        {
            path:'/merchant/edit:id(\\d+)',
            component: MerchantEdit,
            meta:{
                title:'商户-编辑'
            }
        },
        {
            path:'/merchant/user',
            component: MerchantUser,
            meta:{
                title:'商户-用户'
            }
        },
        {
            path:'/terminal/list',
            component: Terminal,
            meta:{
                title:'终端-列表'
            }
        },
     ],
     mode:'history',
     linkActiveClass:'active',
})

//前置全局导航守卫
//导航守卫 监听路由从哪里来 跳转到那里去 
//to from 代表路由
//next表示 继续执行下一步
router.beforeEach((to,from,next) => {
    document.title = to.matched[0].meta.title;
    next();
})

export default router