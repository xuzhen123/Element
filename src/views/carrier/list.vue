<template>
    <xz-common-body :filter.sync="filter" :isLoading.sync="loading" :pageList="pageList" :dataLoad="loadData">
      <el-collapse accordion slot="filter">
        <el-collapse-item>
          <template slot="title">查询<i class="el-icon-search" style="padding-left: 5px;"></i></template>
          <el-form label-width="80px" id="filter">
            <el-form-item label="名称">
              <el-input placeholder="名称"
                        v-model="filter.name"
                        minlength="2"
                        maxlength="20"
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="官网">
              <el-input placeholder="官网"
                        v-model="filter.website"
                        minlength="2"
                        maxlength="20"
                        clearable></el-input>
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
          <template slot-scope="scope">
            <el-form label-position="left" inline class="xz-table-expand">
              <el-form-item label="编号">
                <span>{{ scope.row.id }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ scope.row.name }}</span>
              </el-form-item>
              <el-form-item label="网站">
                <span>{{ scope.row.website }}</span>
              </el-form-item>
              <el-form-item label="热线">
                <span>{{ scope.row.hotline }}</span>
              </el-form-item>
              <el-form-item label="查询地址">
                <span>{{ scope.row.queryUrl }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{toDateTime(scope.row.dateCreated)}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" ></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="website" label="网站" show-overflow-tooltip></el-table-column>
        <el-table-column prop="hotline" label="热线" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dateCreated" label="创建时间" sortable>
            <template slot-scope="scope">
                {{toDateTime(scope.row.dateCreated)}}
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
            name: null,
            website: null,
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
      }
    },
    methods:{
      toDateTime:toDateTime,
      loadData(){
        httpRequest({
          url:`/carrier/list`,
          method:'get',
          params: this.filter
        }).then(response => {
          this.pageList = response;
          this.filter.pageIndex = this.pageList.pageIndex;
          this.filter.pageSize = this.pageList.pageSize;
        })
      },
      onSubmit(){
        this.loadData()
      }
    },
    created(){
      this.loadData()
    }
  }
</script>
