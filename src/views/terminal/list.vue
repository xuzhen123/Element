<template>
  <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
    <el-collapse accordion slot="filter">
      <el-collapse-item>
          <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
          <el-form label-width="80px" id="filter">
              <el-form-item label="终端编号">
                <el-input placeholder="请输入终端编号" v-model="filter.terminalId" minlength="4" maxlength="12" clearable></el-input>
            </el-form-item>
              <el-form-item label="商户编号">
                  <el-input placeholder="请输入商户编号" v-model="filter.merchantId" minlength="4" maxlength="12" clearable></el-input>
              </el-form-item>
              <el-form-item label="终端名称">
                  <el-input placeholder="请输入终端名称" v-model="filter.name" minlength="1" maxlength="20" clearable></el-input>
              </el-form-item>
              <el-form-item label="分类">
                  <el-input placeholder="请输入分类" v-model="filter.category" minlength="1" maxlength="100" clearable></el-input>
              </el-form-item>
              <el-form-item label="终端类型">
                <el-select v-model="filter.type" placeholder="请选择终端类型" clearable> 
                    <el-option v-for="item in types" 
                                :key="item.value" 
                                :value="item.value" 
                                :label="item.text">
                    </el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="终端状态">
                  <el-select v-model="filter.status" placeholder="请选择终端状态" clearable> 
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="xz-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>           
              <el-form-item label="名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="域名/包">
                <span>{{ props.row.source }}</span>
              </el-form-item>
              <el-form-item label="终端类型">
                <span>{{ getText(types,props.row.type) }}</span>
              </el-form-item>
              <el-form-item label="邮件提醒">
                <span>{{ getText(alerts,props.row.alerts,true) }}</span>
              </el-form-item>
              <el-form-item label="密钥">
                <span>{{ props.row.secretKey }}</span>
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
        <el-table-column prop="merchantName" label="商户" align="center"></el-table-column>
        <el-table-column prop="source" label="域名/包名" align="center" width="250"></el-table-column>
        <el-table-column prop="type" label="类型" align="center" sortable>
          <template slot-scope="scope">
              {{getText(types,scope.row.type)}}
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"  align="center" sortable>
        <template slot-scope="scope">
            <el-dropdown @command="onStatus">
                <el-button type="text">
                    <el-tag :type="statusType(scope.row.status)">{{getText(statuses,scope.row.status)}}</el-tag><i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="status in statuses" :command="{terminalId:scope.row.id,status:status.value}" :key="status.value">
                        <template v-if="status.value!==0&&status.value!==scope.row.status">
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
            <el-button @click.native.prevent="onLink(`/terminal/edit/${scope.row.id}`)"
                                      round size="small">编辑</el-button>
                                      <el-dropdown>
                                        <el-button round size="small">
                                          查看<i class="el-icon-arrow-down el-icon--right"></i>
                                      </el-button>
                                      
                                      <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item :command="{path:'/refund/list',query:{terminalId:scope.row.id}}">退款</el-dropdown-item>
                                      <el-dropdown-item :command="{path:'/waybill/list',query:{terminalId:scope.row.id}}">运单</el-dropdown-item>
                                      <el-dropdown-item :command="{path:'/copyrequest/list',query:{terminalId:scope.row.id}}">调单</el-dropdown-item>
                                      <el-dropdown-item :command="{path:'/chargeback/list',query:{terminalId:scope.row.id}}">拒付</el-dropdown-item>
                                      <el-dropdown-item :command="{path:'/demands/list',query:{terminalId:scope.row.id}}">客诉</el-dropdown-item>
                                      </el-dropdown-menu>
                                    </el-dropdown>
        </template>         
        </el-table-column>
    </el-table>

  </xz-common-body>
</template>

<script>
  import XzCommonBody from 'components/xzCommonBody/XzCommonBody'
  import {alerts,types,statuses} from 'enums/terminal'
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
        types: types,
        statuses: statuses,
        alerts: alerts,
        filter: {
            merchantId: this.$route.query.merchantId,
            terminalId: null,
            name: null,
            source: null,
            category: null,
            type: null,
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
      toDateTime: toDateTime,
      getText: getText,
      statusType(status) {
          switch (status) {
              case 0: return 'info';
              case 1: return 'success';
              case 2: return 'warning';
              case 3: return 'danger';
              default: return 'info';
          }
      },
      loadData(){
        this.loading = true
        httpRequest({
          url: `/terminal/list`,
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
      onStatus(command){
        httpRequest({
          url: `/terminal/set/${command.terminalId}`,
          method: 'put',
          data: command.status
        }).then(response => {
           this.$message({
              message: `终端 ${command.terminalId} 状态变更成功`,
              type: 'success'
            })    

           this.loadData()
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


