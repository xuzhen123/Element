<template>
    <el-container>
      <xz-menu></xz-menu>
      <el-container direction="vertical">
        <el-header>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>
          <el-main>
            <router-view />          
         </el-main>        
      </el-container>      
    </el-container>
</template>

<script>

    import XzMenu from '../xzMenu/XzMenu';

    export default {
        name: 'XzContainer',
        components:{
            XzMenu,
        }
    }
</script>

<style>
    body{
        margin: 0;
    }
    .el-footer{
        padding-bottom: 3px;
    }
    .xz-footer-p{
        text-align: center!important;
        font-size: 12px;
    }
    .el-header {
    font-size: 12px;
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }
  .el-main{
      background-color: #f0f2f7;
  }
</style>