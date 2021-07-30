<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
          <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
          <el-form label-width="80px" id="filter">
            <el-form-item label="运单编号">
              <el-input placeholder="运单编号"
                        v-model="filter.waybillId"
                        minlength="8"
                        maxlength="18"
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
          <el-form-item label="承运商">
              <el-select v-model="filter.carrierId"
                         placeholder="承运商" filterable remote
                         :remote-method="loadCarriers"
                         clearable>
                  <el-option v-for="item in carriers"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="运单号">
              <el-input placeholder="运单号"
                        v-model="filter.trackNumber"
                        minlength="4"
                        maxlength="30"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
              <el-select v-model="filter.status"
                         placeholder="运单状态"
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
        <el-table-column prop="id" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="txnId" label="交易号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="merchantId" label="商户号"></el-table-column>
        <el-table-column label="物流" align="center">
          <el-table-column prop="carrierId" label="名称" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" :href="scope.row.carrierWebsite">{{scope.row.carrierName}}</el-link>
              </template>
          </el-table-column>
          <el-table-column prop="trackNumber" label="运单号" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  <el-link target="_blank" type="primary" :href="scope.row.carrierQueryUrl">{{scope.row.trackNumber}}</el-link>
              </template>
          </el-table-column>
          <el-table-column prop="datePickup" label="揽收" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  {{toDateTime(scope.row.datePickup,'yyyy/MM/dd')}}
              </template>
          </el-table-column>
          <el-table-column prop="dateDelivered" label="*妥投" sortable show-overflow-tooltip>
              <template slot-scope="scope">
                  {{toDateTime(scope.row.dateDelivered,'yyyy/MM/dd')}}
              </template>
          </el-table-column>
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
                  <el-button v-if="scope.row.status===0" @click.native.prevent="onAudit(scope.row.id)" round size="small">审核</el-button>
                  </template>
      </el-table-column>
      </el-table>
    </xz-common-body>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {statuses} from 'enums/waybill'
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
        carriers: [],
        statuses: statuses,
        filter: {
            waybillId: null,
            merchantId: this.$route.query.merchantId,
            terminalId: this.$route.query.terminalId,
            txnId: this.$route.query.txnId,
            carrierId: this.$route.query.carrierId,
            trackNumber: null,
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
        waybillId: null,
      }
    },
    methods:{
      toDateTime: toDateTime,
      getText: getText,
      statusType(status) {
          switch (status) {
              case 0: return '';
              case 1: return 'success';
              case 2: return 'danger';
              default: return 'info';
          }
      },
      loadCarriers(name) {
        httpRequest({
          url:`/carrier/list`,
          methods:'get',
          params:{
            name: name,
            pageIndex: 1,
            pageSize: 100,
          }
        }).then(response =>{
          this.carriers = response.items;
        })
      },
      loadData(){
        this.loading = true;
        httpRequest({
          url:`/waybill/list`,
          method:'get',
          params:this.filter
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
      onAudit(row){

      }
    },
    created(){
      this.loadData()
    }
  }
</script>
