<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
          <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
          <el-form label-width="80px" id="filter">
            <el-form-item label="退款编号">
              <el-input placeholder="退款编号"
                        v-model="filter.refundId"
                        minlength="4"
                        maxlength="12"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="商户编号">
              <el-input placeholder="商户编号"
                        v-model="filter.merchantId"
                        minlength="4"
                        maxlength="12"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="终端编号">
              <el-input placeholder="终端编号"
                        v-model="filter.terminalId"
                        minlength="8"
                        maxlength="12"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="交易号">
              <el-input placeholder="交易号"
                        v-model="filter.txnId"
                        minlength="10"
                        maxlength="20"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="原因">
              <el-select v-model="filter.reason"
                         placeholder="退款原因"
                         clearable>
                  <el-option v-for="item in reasons"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="filter.status"
                         placeholder="退款状态"
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
          <template  slot-scope="props">
            <el-form label-position="left" inline class="xz-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="交易号">
                <span>{{ props.row.txnId }}</span>
              </el-form-item>
              <el-form-item label="商户">
                <span>{{ props.row.merchantId }}</span>
              </el-form-item>
              <el-form-item label="终端编号">
                <span>{{ props.row.terminalId }}</span>
              </el-form-item>
              <el-form-item label="原始交易金额">
                <span>{{props.row.originalCurrency}}{{props.row.originalAmount}}</span>
              </el-form-item>
              <el-form-item label="实际交易金额">
                <span>{{props.row.transactionCurrency}}{{props.row.transactionAmount}}</span>
              </el-form-item>
              <el-form-item label="结算金额">
                <span> {{props.row.settleCurrency}}{{props.row.settleAmount}}</span>
              </el-form-item>
              <el-form-item label="手续费">
                <span> {{props.row.settleCurrency}}{{props.row.settleFee}}</span>
              </el-form-item>
              <el-form-item label="退款原因">
                <span> {{getText(reasons,props.row.reason)}} </span>
              </el-form-item>
              <el-form-item label="退款状态">
                <span> {{getText(statuses,props.row.status)}} </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span> {{toDateTime(props.row.dateCreated)}} </span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span> {{toDateTime(props.row.dateUpdated)}} </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" ></el-table-column>
        <el-table-column prop="txnId" label="交易号" sortable width="170px"></el-table-column>
        <el-table-column prop="merchantId" label="商户" sortable></el-table-column>
        <el-table-column label="金额" align="center">
          <el-table-column prop="originalAmount" label="原始">
              <template slot-scope="scope">
                  {{scope.row.originalCurrency}}{{scope.row.originalAmount}}
              </template>
          </el-table-column>
          <el-table-column prop="transactionAmount" label="交易">
              <template slot-scope="scope">
                  {{scope.row.transactionCurrency}}{{scope.row.transactionAmount}}
              </template>
          </el-table-column>
          <el-table-column prop="settleAmount" label="结算">
              <template slot-scope="scope">
                  {{scope.row.settleCurrency}}{{scope.row.settleAmount}}
              </template>
          </el-table-column>
          <el-table-column prop="settleFee" label="手续费">
              <template slot-scope="scope">
                  {{scope.row.settleCurrency}}{{scope.row.settleFee}}
              </template>
          </el-table-column>
      </el-table-column>
      <el-table-column prop="reason" label="原因" sortable show-overflow-tooltip>
          <template slot-scope="scope">
              {{getText(reasons,scope.row.reason)}}
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable>
          <template slot-scope="scope">
              <el-tag :type="statusType(scope.row.status)">{{getText(statuses,scope.row.status)}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="dateCreated" label="创建时间" width="160px" sortable>
          <template slot-scope="scope">
              <el-tooltip :content="toDateTime(scope.row.dateUpdated)" placement="top" v-if="scope.row.dateUpdated">
                  <span>{{toDateTime(scope.row.dateCreated)}}</span>
              </el-tooltip>
              <span v-else>{{toDateTime(scope.row.dateCreated)}}</span>
          </template>
      </el-table-column>
      <el-table-column fixed="right"
                      label="操作"
                      width="95px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status===0||scope.row.status===2" @click.native.prevent="onLink(`/refund/audit/${scope.row.id}`)"
                        round size="small">审核</el-button>
        </template>
      </el-table-column>
      </el-table>
    </xz-common-body>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {reasons,statuses} from 'enums/refund'
  import {getText} from 'common/flagParse'
  import {toDateTime} from 'common/format';
  import httpRequest  from 'network/httpRequest'

  export default {
    components:{
      XzCommonBody
    },
    data () {
      return {
          loading: false,
          reasons: reasons,
          statuses: statuses,
          filter: {
              refundId: null,
              merchantId: this.$route.query.merchantId,
              terminalId: this.$route.query.terminalId,
              txnId: this.$route.query.txnId,
              reason: null,
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
          },
          drawer: false,
          refundId: null,
      }
    },
    methods: {
      toDateTime: toDateTime,
      getText: getText,
      statusType(status) {
          switch (status) {
              case 0: return '';
              case 1: return 'warning';
              case 2: return 'danger';
              case 3: return 'success';
              default: return 'info';
          }
      },
      loadData(){
        this.loading = true
        httpRequest({
          url: `/refund/list`,
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
      onLink(link){
        this.$router.push(link)
      }
    },
    created(){
      this.loadData()
    }
  }
</script>

