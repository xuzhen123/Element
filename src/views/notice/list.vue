<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
            <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
            <el-form label-width="80px" id="filter">
                  <el-form-item label="编号">
                    <el-input placeholder="编号"
                              v-model="filter.noticeId"
                              minlength="6"
                              maxlength="18"
                              clearable></el-input>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-date-picker placeholder="请选择日期" type="date" v-model="filter.dateStart" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label=" 截止日期">
                    <el-date-picker placeholder="请选择日期" type="date" v-model="filter.dateEnd" clearable></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
            </el-form>
        </el-collapse-item>
    </el-collapse>

    <el-table slot="xz-table" :data="pageList.items" @expand-change="expendChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="xz-table-expand" v-for="(item,index) in noticeDetails" :key="index">
            <el-divider content-position="center">编号 {{ item.id }} 的详情</el-divider>
            <el-form-item label="公告编号">
              <span>{{ item.noticeId }}</span>
            </el-form-item> 
            <el-form-item label="用户编号">
              <span>{{ item.userId }}</span>
            </el-form-item> 
            <el-form-item label="租户编号">
              <span>{{ item.tenantId }}</span>
            </el-form-item>  
            <el-form-item label="来源">
              <span>{{ item.source }}</span>
            </el-form-item>  
            <el-form-item label="公告内容">
              <span>{{ item.content }}</span>
            </el-form-item>  
            <el-form-item label="创建日期">
              <span>{{ toDateTime(item.dateCreated) }}</span>
            </el-form-item>           
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="公告编号" align="center" sortable></el-table-column>
      <el-table-column prop="subject" label="主题" align="center"></el-table-column>
      <el-table-column prop="dateExpired" label="有效期" sortable width="130px">
        <template slot-scope="scope">
            <template v-if="scope.row.dateExpired!==null">
                {{toDateTime(scope.row.dateExpired,'yyyy/MM/dd')}}
            </template>
        </template>
    </el-table-column>
      <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
          <template slot-scope="scope">
              {{toDateTime(scope.row.dateCreated)}}
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="onDelete(scope.row.id)" type="danger" round size="small">删除</el-button>
      </template>         
      </el-table-column>
  </el-table>

    </xz-common-body>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {toDateTime} from 'common/format';
  import httpRequest  from 'network/httpRequest'

  export default {
    components:{
      XzCommonBody
    },
    data () {
      return {
              loading: false,
              filter: {
                  noticeId: null,
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
              noticeDetails: {}
          }
      },
      methods:{
        toDateTime: toDateTime,
        loadData(){

          this.loading = true;
          httpRequest({
            url: `/notice/list`,
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
        expendChange(row){       
          httpRequest({
            url: `/noticecomment/${row.id}/list`,
            method: 'get',
          }).then(response => {
            this.noticeDetails = response.items
          })
        },
        onDelete(id){
          httpRequest({
            url: `/notice/delete/${id}`,
            method: 'delete',
          }).then(response => {
            if(response){
              this.$message({
                message: `公告 ${id} 删除成功`,
                type: 'success'
              })
              this.loadData()
            }
          })
        }
      },
      created(){
        this.loadData()
      }
    }
</script>
