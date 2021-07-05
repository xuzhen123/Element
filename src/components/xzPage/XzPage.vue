<template>
 <div class="xz-page">
    <el-pagination background layout="prev, pager, next, sizes, total" 
                                :total="PageList.length" 
                                :page-count="2" 
                                :pager-count="5" 
                                :page-size="10"> 
    </el-pagination>
 </div>
</template>

<script>
  export default {
      name: 'XzPage',
      props: {
        PageList:{
          type: Array,
          default: function(){
            return []
          }
        }
      },
  }
</script>

<style scoped>
  .xz-page{
      text-align: center;
      margin-top: 10px;
  }
</style>