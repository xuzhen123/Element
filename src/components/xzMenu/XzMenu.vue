<template>
    <el-aside width="12%">
      <!-- :default-openeds="['0']" -->
      <el-menu router :default-active="$route.path" theme="dark">
        <el-menu-item index="/dashboard"><i class="el-icon-s-home"></i><span>Dashboard</span></el-menu-item>       
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-office-building"></i><span>开户管理</span></template>
          <el-submenu index="1-1">
            <template slot="title"><i class="el-icon-collection"></i> 合同</template>
            <el-menu-item index="/contract/create">创建</el-menu-item>
            <el-menu-item index="/contract/list">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <template slot="title"><i class="el-icon-school"></i> 商户</template>
            <el-menu-item index="/merchant/create">创建</el-menu-item>
            <el-menu-item index="/merchant/list">列表</el-menu-item>
            <el-menu-item index="/merchant/user">用户</el-menu-item>
          </el-submenu>     
          <el-menu-item index="/terminal/list"><i class="el-icon-monitor"></i> 终端</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-tickets"></i><span>交易管理</span> </template>
          <el-submenu index="2-1">
            <template slot="title"><i class="el-icon-document"></i> 订单</template>
            <el-menu-item index="2-2">测试</el-menu-item>
            <el-menu-item index="2-3">正式</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-4"><i class="el-icon-document-remove"></i> 退款</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-guide"></i><span>发货管理</span> </template>
          <el-submenu index="3-1">
            <template slot="title"><i class="el-icon-truck"></i> 承运商</template>
            <el-menu-item index="3-2">创建</el-menu-item>
            <el-menu-item index="3-3">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3-4">
            <template slot="title"><i class="el-icon-notebook-2"></i> 运单</template>
            <el-menu-item index="3-5">上传</el-menu-item>
            <el-menu-item index="3-6">列表</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-headset"></i><span>客户支持</span> </template>
          <el-submenu index="4-1">
            <template slot="title"><i class="el-icon-postcard"></i> 邮件</template>
            <el-menu-item index="3-1">创建</el-menu-item>
            <el-menu-item index="3-2">列表</el-menu-item>
          </el-submenu>      
          <el-submenu index="4-2">
            <template slot="title"><i class="el-icon-document-delete"></i> 争议</template>
            <el-menu-item-group>
              <template slot="title">拒付</template>
              <el-menu-item index="4-2-1">新增</el-menu-item>
              <el-menu-item index="4-2-2">列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">调单</template>
              <el-menu-item index="4-2-3">新增</el-menu-item>
              <el-menu-item index="4-2-4">列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4-3"><i class="el-icon-phone-outline"></i> 客诉</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-alarm-clock"></i><span>风控中心</span></template>
          <el-submenu index="5-1">
            <template slot="title"><i class="el-icon-pie-chart"></i> 数据源</template>
            <el-menu-item index="5-2">创建</el-menu-item>
            <el-menu-item index="5-3">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5-4">
            <template slot="title"><i class="el-icon-paperclip"></i> 规则</template>
            <el-menu-item index="5-5">创建</el-menu-item>
            <el-menu-item index="5-6">列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="5-7"><i class="el-icon-document"></i> 订单</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-wallet"></i><span>财务中心</span></template>
          <el-menu-item index="6-1"><i class="el-icon-money"></i> 提现</el-menu-item>
          <el-submenu index="6-2">
            <template slot="title"><i class="el-icon-coin"></i> 汇率</template>
            <el-menu-item index="6-2-1">新建</el-menu-item>
            <el-menu-item index="6-2-2">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="6-3">
            <template slot="title"><i class="el-icon-data-line"></i> 报表</template>
            <el-menu-item index="6-3-1">概览</el-menu-item>
            <el-menu-item index="6-3-2">流水</el-menu-item>
            <el-menu-item-group>
              <template slot="title">交易</template>
              <el-menu-item index="6-3-3">汇总</el-menu-item>
              <el-menu-item index="6-3-4">明细</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">结算</template>
              <el-menu-item index="6-3-5">汇总</el-menu-item>
              <el-menu-item index="6-3-6">明细</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"><i class="el-icon-files"></i><span>渠道配置</span></template>
          <el-submenu index="7-1">
            <template slot="title"><i class="el-icon-key"></i> 商户号</template>
            <el-menu-item index="7-2">创建</el-menu-item>
            <el-menu-item index="7-3">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="7-4">
            <template slot="title"><i class="el-icon-mobile"></i> 网站</template>
            <el-menu-item index="7-5">创建</el-menu-item>
            <el-menu-item index="7-6">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="7-7">
            <template slot="title"><i class="el-icon-cpu"></i> 网关</template>
            <el-menu-item index="7-8">创建</el-menu-item>
            <el-menu-item index="7-9">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="7-10">
            <template slot="title"><i class="el-icon-odometer"></i> 限额</template>
            <el-menu-item index="7-11">创建</el-menu-item>
            <el-menu-item index="7-12">列表</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="8">
          <template slot="title"><i class="el-icon-setting"></i><span>系统管理</span></template>
          <el-submenu index="8-1">
            <template slot="title"><i class="el-icon-chat-line-square"></i> 公告</template>
            <el-menu-item index="8-2">创建</el-menu-item>
            <el-menu-item index="8-3">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="8-4">
            <template slot="title"><i class="el-icon-user"></i> 员工</template>
            <el-menu-item index="8-5">创建</el-menu-item>
            <el-menu-item index="8-6">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="8-7">
            <template slot="title"><i class="el-icon-medal"></i> 角色</template>
            <el-menu-item index="8-8">创建</el-menu-item>
            <el-menu-item index="8-9">列表</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>  
 
</template>

<script>
  export default {
      name: 'XzMenu'
  }
</script>

<style scoped>

  .el-aside{
      background-color:#f4f6f8;
      height: 100%; 
      color: #409EFF;
    } 

  /* .el-menu .el-submenu{
    background-color:rgb(81, 88, 104)
    } */
   /* .el-menu-item{
    background-color:rgb(231, 233, 238);
   } */

</style>