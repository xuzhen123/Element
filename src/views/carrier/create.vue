<template>
    <div class="xz-form">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input placeholder="名称，需保证唯一性"
                    v-model="createForm.name"
                    maxlength="50"
                    show-word-limit
                    clearable></el-input>
          <p class="tips">区分大小写；需保证唯一性，即：每个承运商仅限添加一次</p>
      </el-form-item>
      <el-form-item label="网站" prop="website">
          <el-input placeholder="网站，官网"
                    v-model="createForm.website"
                    maxlength="80"
                    show-word-limit
                    clearable></el-input>
      </el-form-item>
      <el-form-item label="热线" prop="hotline">
          <el-input placeholder="热线，客服电话"
                    v-model="createForm.hotline"
                    maxlength="50"
                    show-word-limit
                    clearable></el-input>
      </el-form-item>
      <el-form-item label="查询地址" prop="queryUrl">
          <el-input placeholder="查询地址"
                    v-model="createForm.queryUrl"
                    maxlength="150"
                    show-word-limit
                    clearable></el-input>
          <p class="tips">可使用'{0}'占位符以表示插入运单号，如：https://example.com/query/{0}</p>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit('createForm')">提交</el-button>
          <el-button @click="onReset('createForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import httpRequest  from 'network/httpRequest'
  export default {
    data () {
      return {
        createForm: {
            name: null,
            website: null,
            hotline: null,
            queryUrl: null,
        },
        rules: {
            name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
            ],
            website: [
                { max: 80, message: '长度在 80 个字符以内', trigger: 'blur' }
            ],
            hotline: [
                { max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
            ],
            queryUrl: [
                { max: 150, message: '长度在 150 个字符以内', trigger: 'blur' }
            ],
        },
        loading: false
      }
    },
    methods:{
      onSubmit(form){
        this.$refs[form].validate((valid) => {
            if (!valid) {
                return false;
            }
            this.loading = true;
            httpRequest({
              url:`/carrier/create`,
              method:'post',
              data:this.createForm
            }).then(response => {
              if (response) {
                    this.$message({
                        message: `承运商 #${this.createForm.name} 创建成功`,
                        type: 'success'
                    });
                }
                this.loading = false;
                this.$router.push('/carrier/list');
            })
        });
      },
      onReset(form){
        this.$refs[form].resetFields();
      }
    }
  }
</script>
