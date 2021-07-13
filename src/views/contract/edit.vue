<template>
    <div class="xz-form">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入合同名称" minlength="2" maxlength="50"></el-input>
            <p class="tips">一般一个自然人或主体对应一个合同</p>
          </el-form-item>
          <el-form-item label="参考号" prop="refNo">
            <el-input v-model="editForm.refNo" placeholder="纸质合同编号" minlength="2" maxlength="30"></el-input>
            <p class="tips">线下纸质合同编号，如果没有任意填写</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('editForm')">创建</el-button>
            <el-button @click="resetForm('editForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
    import httpRequest  from 'network/httpRequest'
    export default {
        data () {
            return {
                editForm:{
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
        methods:{
            submitForm(form){
                this.$refs[form].validate((valid) => {
                    if(!valid){
                        return false
                    } 
                    
                    httpRequest({
                        url: `/contract/update/${this.$route.params.id}`,
                        method: 'put',
                        data: this.editForm
                    }).then(response => {
                        this.$message({
                            message: `合同 #${this.$route.params.id} 编辑成功`,
                            type: 'success'
                        }) 

                        this.$router.push(`/contract/list/`)

                    })
            })
        },
        resetForm(form){
            this.$refs[form].resetFields();
      }
    },
    created(){
        console.log(this.$route.params.id)
        httpRequest({
            url:`/contract/get/${this.$route.params.id}`,
            method:'get'
        }).then(response => {
            this.editForm.name = response.name
            this.editForm.refNo = response.refNo
        })
    }
}
</script>

