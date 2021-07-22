<template>
  <div>
    <el-table slot="xz-table" :data="roles">
      <el-table-column prop="id" label="编号" align="center" sortable></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
    
        <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
            <template slot-scope="scope">
                {{toDateTime(scope.row.dateCreated)}}
            </template>
        </el-table-column>
            <el-table-column fixed="right"
                              label="操作"
                              align="center">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="onBind(scope.row)"
                              round size="small">设置权限</el-button>
              </template>
           </el-table-column>
    </el-table>
      <el-drawer :visible.sync="drawer" :title="title" :destroy-on-close="true">
        <el-tree 
              :check-strictly="true"
              :highlight-current="true"
              :data="operations" 
              show-checkbox 
              node-key="id"
              default-expand-all
              :default-checked-keys="operation_checked"
              @check-change="checkChanged">          
        </el-tree>
      </el-drawer>
  </div>
</template>

<script>
  import {toDateTime} from 'common/format';
  import httpRequest  from 'network/httpRequest'
  export default {
    data () {
      return {
          title: '',
          loading: false,
          drawer: false,
          role: {},
          roles: [],
          operations: [],
          operation_checked: [],
      }
    },
    methods:{
      toDateTime: toDateTime,
      loadData(){
        this.loading = true
        httpRequest({
          url: `/role/list`,
          method: 'get',
        }).then(response => {
          this.roles = response
        })
      },
      onBind(row){
        this.title = `设置 #${row.name} 的权限`
        httpRequest({
          url: `/permission/role/${row.id}`,
          method: 'get'
        }).then(response => {        
          this.operation_checked = response
          this.role = row
          this.drawer = true
        })
      },
      checkChanged(data,isChecked){
        if(isChecked){
            httpRequest({
            url: `/permission/role`,
            method: 'put',
            data:{
              roleId: this.role.id,
              operationId: data.id
            }
          }).then(response => {
            this.$message({
              message: `角色 ${this.role.name} 绑定 ${data.label} 操作成功`,
              type: 'success'
            })
          })
        }
        else{
          httpRequest({
            url: `/permission/role`,
            method: 'delete',
            data:{
              roleId: this.role.id,
              operationId: data.id
            }
          }).then(response => {
            this.$message({
              message: `删除角色 ${this.role.name} 的权限 ${data.id} 成功`,
              type: 'info'
            })
          })
        }
      },
    },
    computed:{
      childrenOption(){
        return function (parentId,operations) {
          let _items = []
          operations.forEach(item => {
            if(item.parentId === parentId){
              let childrenNode = this.childrenOption(item.id,operations)
              _items.push({
                id: item.id,
                label: item.name,
                children: childrenNode
              })
            }
          })
          return _items
        }
      }
    },
    created(){
      this.loadData()

      httpRequest({
          url: `/operation/list`,
          method: 'get',
        }).then(response => {
          response.forEach(element => {                           
            if(element.parentId === null){               
              let childrenNode = this.childrenOption(element.id,response)
              this.operations.push({
                id: element.id,
                label: element.name,
                children: childrenNode
              })
            }  
          });
        })
    }
  }
</script>

