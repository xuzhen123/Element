<template>
    <el-container>
      <xz-menu></xz-menu>
      <el-container direction="vertical">
        <el-header>
            <el-dropdown @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 5px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="userId">修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>您好：{{userName}}</span>
          </el-header>
          <el-main>
            <router-view />          
         </el-main>        
      </el-container>      
    </el-container>
</template>

<script>

    import XzMenu from '../xzMenu/XzMenu';
    import store from 'store/index';

    export default {
        name: 'XzContainer',
        components:{
            XzMenu,
        },
        data(){
          return{
            userId: store.state.user.id,
            userName: store.state.user.userName
          }
        },
        methods:{
          handleCommand(command){
            this.$router.push(`/manageruser/updatePassword/${command}`)
          }
        }
    }
</script>
