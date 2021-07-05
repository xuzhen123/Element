<template>
  <div class="xz-form">
    <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="createForm.name" placeholder="请输入合同名称" minlength="2" maxlength="50"></el-input>
        <p class="tips">一般一个自然人或主体对应一个合同</p>
      </el-form-item>
      <el-form-item label="参考号" prop="refNo">
        <el-input v-model="createForm.refNo" placeholder="纸质合同编号" minlength="2" maxlength="30"></el-input>
        <p class="tips">线下纸质合同编号，如果没有任意填写</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('createForm')">创建</el-button>
        <el-button @click="resetForm('createForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
      import httpRequest  from '../../network/httpRequest'

      export default {
        data () {
          return {
            createForm:{
              name: null,
              refNo: null,
            },
            loading: false,
            rules: {
              name: [
                  { required: true, message: '请输入合同名称', trigger: 'blur' },
                  { min: 0, max: 50, message: '长度在 0 到 50 之间', trigger: 'blur' }
                ],
                refNo: [
                  { required: true, message: '请输入参考号', trigger: 'blur' },
                  { min: 0, max: 30, message: '长度在 0 到 30 之间', trigger: 'blur' }
                ],
            }
          }    
        },
        methods: {
          submitForm(createForm){
            this.$refs[createForm].validate((valid) => {
              if(!valid){
                return false
              }

              this.loading = true;
              httpRequest({
                url:'/contract/create',
                method:'post',
                data: this.createForm
              }).then((response) => {
                this.$message({                
                  message: `合同 #${response.data.data} 创建成功`,
                  type: 'success'
                })

                this.loading = false
                this.$router.push(`/contract/list`)
              }).catch((error) => {
                this.$message.error('抱歉，合同创建失败')
              })
            })
          },
          resetForm(createForm){
            this.$refs[createForm].resetFields();
          }
        }
      }
</script>

<style scoped>
  .xz-form{
    margin: 0 auto;
    max-width: 700px;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 1px 8px;
  }
  .tips{
    margin-top:5px;
    line-height: 1.5;
    color: #c0c4cc;
  }
</style>
