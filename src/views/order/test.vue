<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
          <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
          <el-form label-width="80px" id="filter">
            <el-form-item label="交易号">
              <el-input placeholder="交易号"
                        v-model="filter.txnId"
                        minlength="10"
                        maxlength="20"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="商户编号">
              <el-input placeholder="商户编号"
                        v-model="filter.merchantId"
                        minlength="8"
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
          <el-form-item label="网关编号">
              <el-input placeholder="网关编号"
                        v-model="filter.gatewayId"
                        minlength="4"
                        maxlength="10"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="来源">
              <el-input placeholder="来源"
                        v-model="filter.source"
                        minlength="3"
                        maxlength="80"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="订单号">
              <el-input placeholder="订单号"
                        v-model="filter.orderId"
                        minlength="1"
                        maxlength="50"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="卡类型">
              <el-select v-model="filter.cardTypes"
                         placeholder="卡类型"
                         multiple
                         clearable>
                  <el-option v-for="item in cardTypes"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="卡号" v-if="!test">
              <el-input placeholder="卡号"
                        v-model="filter.cardNumber"
                        minlength="16"
                        maxlength="16"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input placeholder="邮箱"
                        v-model="filter.email"
                        minlength="5"
                        maxlength="80"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="IP地址">
              <el-input placeholder="IP地址"
                        v-model="filter.ipAddress"
                        minlength="7"
                        maxlength="150"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="原始货币" v-if="!test">
              <el-input placeholder="原始货币"
                        v-model="filter.originalCurrency"
                        minlength="3"
                        maxlength="3"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="原始金额" v-if="!test">
              <el-col :span="11">
                  <el-input placeholder="最小值"
                            v-model="filter.originalAmountMin"
                            maxlength="12"
                            clearable></el-input>
              </el-col>
              <el-col class="x-tx-cr" :span="2">~</el-col>
              <el-col :span="11">
                  <el-input placeholder="最大值"
                            v-model="filter.originalAmountMax"
                            maxlength="12"
                            clearable></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="结算货币" v-if="!test">
              <el-input placeholder="结算货币"
                        v-model="filter.settleCurrency"
                        minlength="3"
                        maxlength="3"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="结算金额" v-if="!test">
              <el-col :span="11">
                  <el-input placeholder="最小值"
                            v-model="filter.settleAmountMin"
                            maxlength="12"
                            clearable></el-input>
              </el-col>
              <el-col class="x-tx-cr" :span="2">~</el-col>
              <el-col :span="11">
                  <el-input placeholder="最大值"
                            v-model="filter.settleAmountMax"
                            maxlength="12"
                            clearable></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="账单国家" v-if="!test">
              <el-input placeholder="账单国家"
                        v-model="filter.billingCountry"
                        minlength="2"
                        maxlength="2"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="收货国家" v-if="!test">
              <el-input placeholder="收货国家"
                        v-model="filter.shippingCountry"
                        minlength="2"
                        maxlength="2"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="退款" prop="hasRefund" v-if="!test">
              <el-select v-model="filter.hasRefund"
                         placeholder="是否有退款"
                         clearable>
                  <el-option v-for="item in boolean_2"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="拒付" prop="hasChargeback" v-if="!test">
              <el-select v-model="filter.hasChargeback"
                         placeholder="是否有拒付"
                         clearable>
                  <el-option v-for="item in boolean_2"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="调单" prop="hasCopyRequest" v-if="!test">
              <el-select v-model="filter.hasCopyRequest"
                         placeholder="是否有调单"
                         clearable>
                  <el-option v-for="item in boolean_2"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="运单" prop="hasWaybill" v-if="!test">
              <el-select v-model="filter.hasWaybill"
                         placeholder="是否上传运单"
                         clearable>
                  <el-option v-for="item in boolean_2"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="filter.status"
                         placeholder="商户状态"
                         multiple
                         clearable>
                  <el-option v-for="item in statuses"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="原因" v-if="!test">
              <el-select v-model="filter.reasonCode"
                         placeholder="原因代码"
                         clearable>
                  <el-option v-for="item in reasons"
                             :key="item.value"
                             :label="item.text"
                             :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="起始时间">
              <el-date-picker placeholder="起始时间"
                              v-model="filter.dateStart"
                              type="datetime"
                              clearable
                              :editable="false"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
              <el-date-picker placeholder="截止时间"
                              v-model="filter.dateEnd"
                              type="datetime"
                              clearable
                              :editable="false"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <el-table slot="xz-table" :data="pageList.items">
        <el-table-column prop="txnId" label="交易号" align="center" width="170px" sortable></el-table-column>
        <el-table-column prop="orderId" label="订单号" align="center"></el-table-column>
        <el-table-column prop="merchantId" label="商户" align="center"></el-table-column>
        <el-table-column label="金额" align="center">
          <el-table-column prop="originalAmount" label="原始" min-width="90px" sortable>
              <template slot-scope="scope">
                  {{scope.row.originalCurrency}}{{scope.row.originalAmount}}
              </template>
          </el-table-column>
          <el-table-column prop="settleAmount" label="结算" min-width="100px" sortable>
              <template slot-scope="scope" sortable>
                  {{scope.row.settleCurrency}}{{scope.row.settleAmount}}
              </template>
          </el-table-column>
      </el-table-column>
      <el-table-column label="详情" align="center">
          <el-table-column label="卡类型" sortable>
              <template slot-scope="scope">
                  <el-tooltip :content="scope.row.cardNumber" placement="top">
                      <span>{{getText(cardTypes,scope.row.cardType)}}</span>
                  </el-tooltip>
              </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  {{scope.row.email}}
              </template>
          </el-table-column>
          <el-table-column prop="source" label="来源" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-tooltip :content="scope.row.terminalId.toString()" placement="top">
                      <span>{{scope.row.source}}</span>
                  </el-tooltip>
              </template>
          </el-table-column>
          <el-table-column prop="ipAddress" label="IP" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  {{scope.row.ipAddress}}
              </template>
          </el-table-column>
          <el-table-column prop="billingCountry" label="账单" width="80px" sortable>
              <template slot-scope="scope">
                  {{scope.row.billingCountry}}
              </template>
          </el-table-column>
          <el-table-column prop="shippingCountry" label="收货" width="80px" sortable>
              <template slot-scope="scope">
                  {{scope.row.shippingCountry}}
              </template>
          </el-table-column>
      </el-table-column>
      <el-table-column label="时间" align="center">
          <el-table-column prop="dateSuccess" label="成功" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  <template v-if="scope.row.dateSuccess!==null">
                      {{toDateTime(scope.row.dateSuccess)}}
                  </template>
              </template>
          </el-table-column>
          <el-table-column prop="dateCreated" width="155px" label="创建" sortable>
              <template slot-scope="scope">
                  <el-tooltip :content="toDateTime(scope.row.dateUpdated)" placement="top" v-if="scope.row.dateUpdated">
                      <span>{{toDateTime(scope.row.dateCreated)}}</span>
                  </el-tooltip>
                  <span v-else>{{toDateTime(scope.row.dateCreated)}}</span>
              </template>
          </el-table-column>
      </el-table-column>
      <el-table-column prop="status" label="状态" fixed="right" sortable>
          <template slot-scope="scope">
              <el-tooltip :content="getText(reasons,scope.row.reason)" placement="top" v-if="scope.row.reason!==null">
                  <el-tag :type="statusType(scope.row.status)">{{getText(statuses,scope.row.status)}}</el-tag>
              </el-tooltip>
              <el-tag :type="statusType(scope.row.status)" v-else>{{getText(statuses,scope.row.status)}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column fixed="right"
                      label="操作"
                      min-width="95px">
                      <template slot-scope="scope">
              <el-dropdown @command="onLink" v-if="!test&&(scope.row.status===3||scope.row.status===6)">
                <el-button round size="small">
                  执行<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{path:'/refund/create/',query:{txnId:scope.row.txnId}}">退款</el-dropdown-item>
                  <el-dropdown-item :command="{path:'/dispute/copyrequest/create',query:{txnId:scope.row.txnId}}">调单</el-dropdown-item>
                  <el-dropdown-item :command="{path:'/dispute/chargeback/create',query:{txnId:scope.row.txnId}}">拒付</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="onLink">
                  <el-button round size="small">
                    查看<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="scope.row.status===3||scope.row.status===6" :command="{path:'/refund/list',query:{txnId:scope.row.txnId}}">退款</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status===3||scope.row.status===6" :command="{path:'/waybill/list',query:{txnId:scope.row.txnId}}">运单</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status===3||scope.row.status===6" :command="{path:'/dispute/copyrequest/list',query:{txnId:scope.row.txnId}}">调单</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status===3||scope.row.status===6" :command="{path:'/dispute/chargeback/list',query:{txnId:scope.row.txnId}}">拒付</el-dropdown-item>
                  <el-dropdown-item v-if="!scope.row.test" :command="{path:'/demands/list',query:{txnId:scope.row.txnId}}">客诉</el-dropdown-item>
                  <el-dropdown-item :command="{path:`/order/hook/${scope.row.txnId}`}">异步通知</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template> 
      </el-table-column>
      </el-table>
    </xz-common-body>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {reasons, statuses} from 'enums/order'
  import {cardTypes} from 'enums/card'
  import {boolean_2} from 'enums/common'
  import {getText} from 'common/flagParse'
  import {toDateTime} from 'common/format'
  import httpRequest  from 'network/httpRequest'

  export default {
    components:{
      XzCommonBody
    },
    data () {
      return {
          loading: false,
          cardTypes: cardTypes,
          reasons: reasons,
          statuses: statuses,
          boolean_2: boolean_2,
          test: true,
          filter: {
              txnId: null,
              merchantId: this.$route.query.merchantId,
              terminalId: this.$route.query.terminalId,
              gatewayId: this.$route.query.gatewayId,
              source: null,
              orderId: null,
              cardTypes: [],
              cardNumber: null,
              email: null,
              ipAddress: null,
              originalCurrency: null,
              originalAmountMin: null,
              originalAmountMax: null,
              settleCurrency: null,
              settleAmountMin: null,
              billingCountry: null,
              shippingCountry: null,
              hasRefund: null,
              hasChargeback: null,
              hasCopyRequest: null,
              hasWaybill: null,
              test: true,
              status: [],
              reasonCode: null,
              dateStart: null,
              dateEnd: null,
              pageIndex: 1,
              pageSize: 20,
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
        getText: getText,
        statusType(status) {
            switch (status) {
                case 0: return 'info';
                case 1:
                case 3:
                case 6:
                    return 'success';
                case 2:
                case 5:
                    return 'warning';
                case 4: return 'danger';
                default: return '';
            }
        },
      loadData(){
        this.loading = true
        httpRequest({
          url: `/order/list`,
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

