<template>
    <div class="xz-form">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input placeholder="名称"
                      v-model="createForm.name"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                      clearable></el-input>
            <p class="tips">建议按照部门或者职位区分</p>
        </el-form-item>
        <el-form-item class="x-tx-cr">
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
          },
          rules: {
              name: [
                  { required: true, message: '请输入名称', trigger: 'blur' },
                  { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
              ]
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
              url: `/role/create`,
              method: 'post',
              data: JSON.stringify(this.createForm.name)
            }).then(response => {
              this.$message({
                    message: `角色 ${this.createForm.name} 创建成功`,
                    type: 'success'
                });
                this.loading = false;
                this.$router.push('/role/list');
            })
        });
      },
      onReset(form) {
          this.$refs[form].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
