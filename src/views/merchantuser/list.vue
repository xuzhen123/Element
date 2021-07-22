<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
        <el-collapse accordion slot="filter">
            <el-collapse-item>
                <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
                <el-form class="xz-filter" label-width="80px" id="filter">
                    <el-form-item label="商户编号">
                        <el-input placeholder="请输入商户编号" v-model="filter.merchantId" minlength="4" maxlength="12" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input placeholder="请输入姓名" v-model="filter.name" minlength="2" maxlength="50" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请输入邮箱" v-model="filter.email" minlength="5" maxlength="80" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="filter.enabled" placeholder="请选择状态" clearable> 
                            <el-option v-for="item in statuses" 
                                        :key="item.value" 
                                        :value="item.value" 
                                        :label="item.text">
                            </el-option>
                        </el-select>
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
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="merchantName" label="商户" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center" width="250"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.enabled" @change="onStatus($event,scope.row.merchantId,scope.row.id)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
                <template slot-scope="scope">
                    {{toDateTime(scope.row.dateCreated)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
               <template slot-scope="scope">
                <el-button type="info" size="small" round @click.native.prevent="onLink(`/user/${scope.row.merchantId}/${scope.row.id}/changepassword`)">修改密码</el-button>
            </template>         
            </el-table-column>
        </el-table>
    </xz-common-body>
</template>

<script>
    import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
    import {boolean_1} from 'enums/common'
    import {getText} from 'common/flagParse'
    import {toDateTime} from 'common/format';
    import httpRequest  from 'network/httpRequest'

    export default {
        components:{
            XzCommonBody
        },
        data () {
            return {
                statuses: boolean_1,
                loading: false,
                filter: {
                    merchantId: this.$route.query.merchantId,
                    name: null,
                    email: null,
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
                }
            }
        },
        methods:{
            toDateTime: toDateTime,
            loadData(){
                this.loading = true;  
                httpRequest({
                    url:'/merchantuser/list',
                    method:'get',
                    params: this.filter
                }).then(response=> {
                    this.loading = false;
                    this.pageList = response;
                    this.filter.pageIndex = this.pageList.pageIndex;
                    this.filter.pageSize = this.pageList.pageSize;
                })   
              },
            onSubmit(){
                this.loadData();
              },
            onStatus(booleanValue, merchantId, userId){

                httpRequest({
                    url: `/merchantuser/set/${merchantId}/${userId}`,
                    method: 'put',
                    data: String(booleanValue)
                }).then(response => {
                    this.$message({
                        type: 'success',
                        message: `用户 ${userId} 状态变更成功`
                    })

                    this.loading = false;
                    this.loadData();
                })
            },
            
            onLink(link){
                this.$router.push(link)
            }
        },
        created(){
            this.loadData()
        }
    }
</script>

<style scoped>

</style>
