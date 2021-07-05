<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
        <el-collapse accordion slot="filter">
            <el-collapse-item>
                <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
                <el-form label-width="80px">
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
            <el-table-column prop="id" label="编号" sortable></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="refNo" label="参考号"></el-table-column>
            <el-table-column prop="dateCreated" label="创建时间" sortable></el-table-column>
            <el-table-column label="操作">
               <template slot-scope="scope">
                <el-button type="primary" size="small" round>编辑</el-button>         
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
    import httpRequest  from '../../network/httpRequest'

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
            loadData(){
                this.loading = true;  
                httpRequest({
                    url:'/contract/list',
                    method:'GET',
                    params: this.filter
                }).then(response=> {
                    this.loading = false;
                    this.pageList = response.data.data;
                    console.log(this.pageList);
                    this.filter.pageIndex = this.pageList.pageIndex;
                    this.filter.pageSize = this.pageList.pageSize;
                })   
              },
            onSubmit(){
                this.loadData()
              },

        },
        created(){
            this.loadData()
        }
    }
</script>

<style>
    .el-collapse{
       margin-bottom: 10px;
    }
    .el-collapse-item__header{
        padding-left: 12px;
    }
    .el-form{
        /* 1.子元素水平铺开display: flex */
        /* 2.子元素平均分割flex:1 */
        /* 3.自动换行显示 flex-wrap:wrap */
        display: flex; 
        flex: 1;
        flex-wrap: wrap;
    }
   .el-form>.el-form-item>.el-input__inner{
        width: 220px;
    }

</style>
