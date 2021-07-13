<template>
    <div>
        <slot name="filter"></slot>

        <div>
            <slot name="xz-table"></slot>
        </div>
    
        <el-pagination background layout="prev, pager, next, sizes, total" 
                                :total="pageList.totalItemCount" 
                                :page-count="pageList.totalPageCount" 
                                :pager-count="5" 
                                :page-size="pageList.pageSize"
                                :current-page="pageList.pageIndex"
                                @size-change="sizeChange"
                                @current-change="currentChange">
            
        </el-pagination>
    </div>
</template>

<script>

    export default {
        name: 'XzCommonBody',
        props: {
            filter: {
                type: Object,
                required: true
            },
            pageList: {
                type: Object,
                required: true,
                default: function () {
                    return {
                        items: [],
                        pageIndex: null,
                        pageSize: null,
                        totalItemCount: null,
                        totalPageCount: null,
                    }
                }
            },
            dataLoad: {
                type: Function,
                required: true
            },
        },
        components:{
        },
        data(){
            return{
                //tableData:null
            }
        },
        methods:{
            sizeChange(i){
              this.filter.pageIndex = 1;
              this.filter.pageSize = i;
              this.dataLoad();
            },
            currentChange(i){
              this.filter.pageIndex = i;
              this.dataLoad();
            }
      }
    }
</script>

<style>
    .el-pagination{
      text-align: center;
      margin-top: 10px;
    }
</style>