<template>
  <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
    <el-collapse accordion slot="filter">
        <el-collapse-item>
            <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
            <el-form label-width="80px" id="filter">
                <el-form-item label="合同编号">
                    <el-input placeholder="请输入合同编号" v-model="filter.contractId" clearable></el-input>
                </el-form-item>
                <el-form-item label="商户编号">
                    <el-input placeholder="请输入商户编号" v-model="filter.merchantId" clearable></el-input>
                </el-form-item>
                <el-form-item label="商户名称">
                  <el-input placeholder="请输入商户名称" v-model="filter.name" clearable></el-input>
              </el-form-item>
                <el-form-item label="级别" prop="level">
                    <el-select v-model="filter.level"
                          placeholder="商户级别"
                          clearable>
                          <el-option v-for="item in levels"
                                      :key="item.value"
                                      :label="item.text"
                                      :value="item.value">
                          </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select v-model="filter.status"
                             placeholder="商户状态"
                             clearable>
                      <el-option v-for="item in statuses"
                                 :key="item.value"
                                 :label="item.text"
                                 :value="item.value">
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
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="合同">
                <span>{{ props.row.contractId }}</span>
              </el-form-item>
              <el-form-item label="级别">
                <span>{{ getText(levels,props.row.level) }}</span>
              </el-form-item>
              <el-form-item label="集成方式">
                <span>{{ getText(integrateModes,props.row.integrateModes,true) }}</span>
              </el-form-item>
              <el-form-item label="结算币种">
                <span>{{ props.row.settleCurrency }}</span>
              </el-form-item>
              <el-form-item label="结算类型">
                <span>{{ getText(settleTypes,props.row.settleType) }}</span>
              </el-form-item>
              <el-form-item label="押金比例">
                <span>{{ props.row.depositRate }}</span>
              </el-form-item>
              <el-form-item label="押金周期">
                <span>{{ props.row.depositDelay }}天</span>
              </el-form-item>
              <el-form-item label="提现手续费">
                <span>{{ props.row.drawcashFee }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ getText(statuses,props.row.status) }}</span>
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
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="contractName" label="合同" align="center"></el-table-column>
        <el-table-column prop="level" label="级别" align="center">
          <template slot-scope="scope">
            {{getText(levels,scope.row.level)}}
         </template>
        </el-table-column>
        <el-table-column prop="integrateModes" label="集成方式" align="center">
          <template slot-scope="scope">
            <span v-for="item in getText(integrateModes,scope.row.integrateModes,true)" :key="item">{{item}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结算" align="center">
          <el-table-column prop="settleCurrency" label="结算币种" align="center" sortable> </el-table-column>
          <el-table-column prop="settleType" label="结算类型" align="center" sortable>
              <template slot-scope="scope">
                  {{getText(settleTypes,scope.row.settleType)}}
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="押金" align="center" sortable>
          <el-table-column prop="depositRate" label="比例" align="center" sortable></el-table-column>
          <el-table-column prop="depositDelay" label="周期" align="center" sortable>
              <template slot-scope="scope">
                  <span>{{scope.row.depositDelay}}天</span>
              </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center"> 
          <template slot-scope="scope">
            <el-dropdown @command="onStatus">
                <el-button type="text">
                    <el-tag>{{getText(statuses,scope.row.status)}}</el-tag><i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="status in statuses" :command="{merchantId:scope.row.id,status:status.value}" :key="status.value">
                        <template v-if="status.value!==scope.row.status">
                            {{status.text}}
                        </template>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
        </el-table-column>      
        <el-table-column prop="dateCreated" label="创建时间" align="center" sortable>
          <template slot-scope="scope">
              {{toDateTime(scope.row.dateCreated)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
           <template slot-scope="scope">
            <el-button type="text" size="small" @click="onLink(`/merchant/edit/${scope.row.id}`)">编辑</el-button>
            <el-button type="text" size="small">配置</el-button>
            <el-dropdown>
                <el-button type="success" size="small" round>查看<i class="el-icon-arrow-down el-icon--right"></i></el-button>                   
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>用户</el-dropdown-item>
                        <el-dropdown-item>终端</el-dropdown-item>
                        <el-dropdown-item>订单</el-dropdown-item>
                        <el-dropdown-item>退款</el-dropdown-item>
                        <el-dropdown-item>运单</el-dropdown-item>
                        <el-dropdown-item>调单</el-dropdown-item>
                        <el-dropdown-item>拒付</el-dropdown-item>
                        <el-dropdown-item>客诉</el-dropdown-item>
                        <el-dropdown-item>提现</el-dropdown-item>
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
  import {levels,settleTypes,integrateModes,statuses} from 'enums/merchant'
  import {getText,toInt} from 'common/flagParse'
  import {toDateTime} from 'common/format';
  import httpRequest  from 'network/httpRequest'

  export default {
    components:{
      XzCommonBody,  
    },
    data () {
      return {
        loading: false,
        levels: levels,
        settleTypes: settleTypes,
        integrateModes: integrateModes,
        statuses: statuses,
        filter: {
            contractId: this.$route.query.contractId,
            merchantId: null,
            name: null,
            level: null,
            status: null,
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
      getText: getText,
      toDateTime: toDateTime,
      loadData(){
        this.loading = true;  
        httpRequest({
          url: '/merchant/list',
          methods: 'get',
          params: this.filter
        }).then(response => {
          this.loading = false;
          this.pageList = response;
          this.filter.pageIndex = this.pageList.pageIndex;
          this.filter.pageSize = this.pageList.pageSize;
        })
      },
      onSubmit(){
        this.loadData();
      },
      onStatus(command){
        httpRequest({
          url: `/merchant/set/${command.merchantId}`,
          method: 'put',
          data: String(command.status)
        }).then(response => {
          if(response){
            this.$message({
              message: `商户 ${command.merchantId} 状态变更成功`,
              type: 'success'
            })

            this.loadData();
          }
        })
      },
      onLink(link){
        this.$router.push(link)
      }
    },
    created(){
      this.loadData();
    }
  }
</script>

