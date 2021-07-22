<template>
  <div>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
            <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
            <el-form label-width="80px" id="filter">
                <el-form-item label="编号">
                  <el-input placeholder="编号"
                            v-model="filter.userId"
                            minlength="4"
                            maxlength="12"
                            clearable></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input placeholder="姓名"
                            v-model="filter.fullName"
                            minlength="2"
                            maxlength="20"
                            clearable></el-input>
              </el-form-item>
              <el-form-item label="帐号">
                  <el-input placeholder="帐号"
                            v-model="filter.userName"
                            minlength="2"
                            maxlength="30"
                            clearable></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="enabled">
                  <el-select v-model="filter.enabled"
                            placeholder="用户状态"
                            clearable>
                      <el-option v-for="item in statuses"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="起始日期">
                  <el-date-picker placeholder="起始日期"
                                  v-model="filter.dateStart"
                                  type="date"
                                  clearable
                                  :editable="false"
                                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="截止日期">
                  <el-date-picker placeholder="截止日期"
                                  v-model="filter.dateEnd"
                                  type="date"
                                  clearable
                                  :editable="false"
                                  value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
            </el-form>
        </el-collapse-item>
    </el-collapse>
    <el-table slot="xz-table" :data="pageList.items">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="xz-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="租户">
                <span>{{ props.row.tenantId }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ props.row.fullName }}</span>
              </el-form-item>
              <el-form-item label="账号">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="管理员">
                <span>{{ getText(types,props.row.administrative) }}</span>
              </el-form-item>
              <el-form-item label="MFA Key">
                <span>{{ props.row.mFAKey }}</span>
              </el-form-item>
              <el-form-item label="启用">
                <span>{{ getText(types,props.row.enabled) }}</span>
              </el-form-item>
              <el-form-item label="下次更改密码日期">
                <span>{{ toDateTime(props.row.dateReset) }}</span>
              </el-form-item>
              <el-form-item label="创建日期">
                <span>{{ toDateTime(props.row.dateCreated) }}</span>
              </el-form-item>
              <el-form-item label="修改日期">
                <span>{{ toDateTime(props.row.dateUpdated) }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" align="center" sortable></el-table-column>
        <el-table-column prop="fullName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="userName" label="帐号" align="center"></el-table-column>
        <el-table-column prop="administrative" label="管理员" align="center">
          <template slot-scope="scope">
            {{getText(types,scope.row.administrative)}}
        </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"  align="center" sortable>
          <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" :disabled="scope.row.administrative" @change="onStatus($event, scope.row.id)"></el-switch>
          </template>
      </el-table-column>
          <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
              <template slot-scope="scope">
                  {{toDateTime(scope.row.dateCreated)}}
              </template>
            </el-table-column>
              <el-table-column fixed="right"
                                label="操作"
                                width="185px">
                      <template slot-scope="scope">
                      <el-button-group>
                      <el-button @click.native.prevent="onLink(`/manageruser/updatePassword/${scope.row.id}`)"
                                  round size="small">重置密码</el-button>
                      <el-button @click.native.prevent="onBind(scope.row)"
                                  round size="small"
                                  v-if="!scope.row.administrative">绑定角色</el-button>
                      </el-button-group>
                      </template>
             </el-table-column>
    </el-table>
    </xz-common-body> 
    <el-drawer :visible.sync="drawer" :title="title" :destroy-on-close="true">
      <el-tree 
            :check-strictly="true"
            :highlight-current="true"
            :data="roles" 
            show-checkbox 
            node-key="id"
            default-expand-all
            :default-checked-keys="role_checked"
            @check-change="checkChanged">          
      </el-tree>
    </el-drawer>   
  </div>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {getText} from 'common/flagParse'
  import { boolean_1, boolean_2 } from '@/enums/common';
  import {toDateTime} from 'common/format';
  import httpRequest  from 'network/httpRequest'
  export default {
    components:{
      XzCommonBody
    },
    data () {
      return {
              loading: false,
              statuses: boolean_1,
              types: boolean_2,
              filter: {
                  userId: null,
                  fullName: null,
                  userName: null,
                  enabled: null,
                  dateStart: null,
                  dateEnd: null,
                  pageIndex: null,
                  pageSize: null,
              },
              pageList: {
                  items: [],
                  pageIndex: null,
                  pageSize: null,
                  totalItemCount: null,
                  totalPageCount: null,
              },
              drawer: false,
              title: '',
              selected_user: {},
              roles: [],
              role_checked: [],
        }
    },
    methods:{
      toDateTime: toDateTime,
         getText: getText,
      loadData(){
        this.loading = true
        httpRequest({
          url: `/useraccount/list`,
          method: 'get',
          params: this.filter
        }).then(response => {
                this.loading = false;
                this.pageList = response;
                this.filter.pageIndex = this.pageList.pageIndex;
                this.filter.pageSize = this.pageList.pageSize;
        })
      },
      onSubmit(){
        this.loadData()
      },
      onStatus(event,id){
        httpRequest({
          url: `/useraccount/set/${id}/status`,
          method: 'put',
          data: String(event)
        }).then(response => {
          if(response){
            this.$message({
              message: `用户 ${id} 状态变更成功`,
              type: 'success'
            })
            this.loadData()
          }
        })
      },
      onBind(data){
        this.title = `设置用户 #${data.fullName} 的角色`
        httpRequest({
          url: `/permission/user/${data.id}`,
          method: 'get'
        }).then(response => {
          this.role_checked = response 
          this.selected_user = data   
          this.drawer = true
        })
      },

      checkChanged(data,isChecked){
        if(isChecked){
            httpRequest({
            url: `/permission/user`,
            method: 'put',
            data:{
              roleId: data.id,
              userId: this.selected_user.id
            }
          }).then(response => {
            this.$message({
              message: `用户 ${this.selected_user.fullName} 分配到 ${data.label} 操作成功`,
              type: 'success'
            })
          })
        }
        else{
          httpRequest({
            url: `/permission/user`,
            method: 'delete',
            data:{
              roleId: data.id,
              userId: this.selected_user.id
            }
          }).then(response => {
            this.$message({
              message: `删除用户 ${this.selected_user.fullName} 所属的 ${data.label} 成功`,
              type: 'info'
            })
          })
        }
      },
      onLink(link){
        this.$router.push(link)
      }
    },
    created(){
      this.loadData()

      httpRequest({
          url: `/role/list`,
          method: 'get'
        }).then(response => {
          response.forEach(element => {
            this.roles.push({
              id: element.id,
              label: element.name,
              children: []
            })          
          });
        })
    }
  }
</script>
