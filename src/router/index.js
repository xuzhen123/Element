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
 const MerchantUser = ()=> import('views/merchantuser/list')
 const Terminal = ()=> import('views/terminal/list')
 const TerminalEdit = ()=> import('views/terminal/edit')
 const MerchantUserChangePassword = ()=> import('views/user/changePassword')
 const Notice = ()=> import('views/notice/list')
 const NoticeCreate = ()=> import('views/notice/create')
 const ManagerUser = ()=> import('views/manageruser/list')
 const ManagerUserUpdatePassword = ()=> import('views/manageruser/updatePassword')
 const ManagerUserCreate = ()=> import('views/manageruser/create')
 const ManagerUserMfa = ()=> import('views/manageruser/mfa')
 const Role = ()=> import('views/role/list')
 const RoleCreate = ()=> import('views/role/create')
 


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
            path:'/merchant/edit/:id(\\d+)',
            component: MerchantEdit,
            meta:{
                title:'商户-编辑'
            }
        },
        {
            path:'/user/list',
            component: MerchantUser,
            meta:{
                title:'用户-列表'
            }
        },
        {
            path:'/user/:mid(\\d+)/:uid(\\d+)/changePassword',
            component: MerchantUserChangePassword,
            meta:{
                title:'用户-修改密码'
            }
        },
        {
            path:'/terminal/list',
            component: Terminal,
            meta:{
                title:'终端-列表'
            }
        },
        {
            path:'/terminal/edit/:id(\\d+)',
            component: TerminalEdit,
            meta:{
                title:'终端-编辑'
            }
        },
        {
            path:'/notice/list',
            component: Notice,
            meta:{
                title:'公告-列表'
            }
        },
        {
            path:'/notice/create',
            component: NoticeCreate,
            meta:{
                title:'公告-创建'
            }
        },
        {
            path:'/manageruser/list',
            component: ManagerUser,
            meta:{
                title:'员工用户-列表'
            }
        },
        {
            path:'/manageruser/updatePassword/:id(\\d+)',
            component: ManagerUserUpdatePassword,
            meta:{
                title:'员工用户-修改密码'
            }
        },
        {
            path:'/manageruser/create',
            component: ManagerUserCreate,
            meta:{
                title:'员工用户-创建'
            }
        },
        {
            path:'/manageruser/mfa',
            component: ManagerUserMfa,
            meta:{
                title:'员工用户-MFA'
            }
        },
        {
            path:'/role/list',
            component: Role,
            meta:{
                title:'角色-列表'
            }
        },
        {
            path:'/role/create',
            component: RoleCreate,
            meta:{
                title:'角色-创建'
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