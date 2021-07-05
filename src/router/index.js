import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const Dashboard = ()=> import('../views/dashboard/index')
 const Contract = ()=> import('../views/contract/list')
 const Merchant = ()=> import('../views/merchant/list')
 const ContractCreate = ()=> import('../views/contract/create')


 const router = new Router({
    routes: [
        {
            path:'/',
            redirect:'/dashboard'
        },
        {
            path:'/dashboard',
            component: Dashboard,
        },
        {
            path:'/contract/list',
            component: Contract,
        },
        {
            path:'/contract/create',
            component: ContractCreate,
        },
        {
            path:'/merchant/list',
            component: Merchant,
        },
     ],
     mode:'history',
     linkActiveClass:'active',
})

export default router