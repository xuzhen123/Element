<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
        <el-collapse accordion slot="filter">
            <el-collapse-item>
                <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
                <el-form label-width="80px" id="filter">
                    <el-form-item label="合同编号">
                        <el-input placeholder="请输入合同编号" v-model="filter.contractId" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="合同名称">
                        <el-input placeholder="请输入合同名称" v-model="filter.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="参考号">
                        <el-input placeholder="参考号" v-model="filter.refNo" clearable></el-input>
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
          <el-table slot="xz-table" :data="pageList.items">
            <el-table-column prop="id" label="编号" align="center" sortable></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="refNo" label="参考号" align="center"></el-table-column>
            <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
                <template slot-scope="scope">
                    {{toDateTime(scope.row.dateCreated)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
               <template slot-scope="scope">
                <el-link icon="el-icon-edit"  @click="onLink(`/contract/edit/${scope.row.id}`)"  style="margin-right:8px">编辑</el-link>
                <el-dropdown>
                    <el-button type="success" size="small" round>其它<i class="el-icon-arrow-down el-icon--right"></i></el-button>                   
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>商户</el-dropdown-item>
                            <el-dropdown-item>报表</el-dropdown-item>
                          </el-dropdown-menu>                                    
                </el-dropdown>
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
        name: 'Contract',
        components:{
            XzCommonBody,
        },
        data(){
            return{
                loading: false,
                filter: {
                    contractId: null,
                    name: null,
                    refNo: null,
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
                }
            }
        },
        methods:{
            toDateTime: toDateTime,
            loadData(){
                this.loading = true;  
                httpRequest({
                    url:'/contract/list',
                    method:'GET',
                    params: this.filter
                }).then(response=> {
                    this.loading = false;
                    this.pageList = response;
                    this.filter.pageIndex = this.pageList.pageIndex;
                    this.filter.pageSize = this.pageList.pageSize;
                })   
              },
            onSubmit(){
                this.loadData()
              },
            onLink(route) {
                this.$router.push(route);
            },
        },
        created(){
            this.loadData()
        }
    }
</script>
