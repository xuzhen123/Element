<template>
    <div class="xz-form">
      <el-form :model="updatePwdForm" :rules="rules" ref="updatePwdForm" label-width="100px"> 
            <el-form-item label="编号">
              <span>{{user.id}}</span>
          </el-form-item>
          <el-form-item label="姓名">
              <span>{{user.fullName}}</span>
          </el-form-item>
          <el-form-item label="帐号">
              <span>{{user.userName}}</span>
          </el-form-item>
          <el-form-item label="新密码" prop="password1">
              <el-input placeholder="7~50位字母、字符、数字"
                        autocomplete="off"
                        v-model="updatePwdForm.password1"
                        minlength="7"
                        maxlength="50"
                        show-word-limit
                        show-password
                        clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
              <el-input placeholder="7~50位字母、字符、数字"
                        autocomplete="off"
                        v-model="updatePwdForm.password2"
                        minlength="7"
                        maxlength="50"
                        show-word-limit
                        show-password
                        clearable></el-input>
          </el-form-item>
          <el-form-item class="x-tx-cr">
              <el-button type="primary" @click="onSubmit('updatePwdForm')">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
</template>

<script>

  import httpRequest  from 'network/httpRequest'
  export default {
    data () {
      return {
          user: {},
          updatePwdForm: {
              password1: null,
              password2: null,
          },
          rules: {
              password1: [
                  { required: true, message: '请输入新密码', trigger: 'blur' },
                  { min: 7, max: 50, message: '长度在 7 到 50 个字符', trigger: 'blur' }
              ],
              password2: [
                  { required: true, message: '请输入确认密码', trigger: 'blur' },
                  { min: 7, max: 50, message: '长度在 7 到 50 个字符', trigger: 'blur' },
                  {
                      validator: (rule, value, callback) => {
                          if (value !== this.updatePwdForm.password1) {
                              callback(new Error('两次输入密码不一致'));
                          } else {
                              callback();
                          }
                      }, trigger: 'blur'
                  }
              ]
          },
          loading: true
      }
    },
    methods:{
      loadData(){
        this.loading = true
          httpRequest({
            url:  `/useraccount/get/${this.$route.params.id}`,
            method: 'get',
        }).then(response => {
          this.user = response
        })
      },
      onSubmit(form){
        this.$refs[form].validate((valid) => {
            if (!valid) {
                return false;
            }
            this.loading = true;
            httpRequest({
              url: `/useraccount/update/${this.$route.params.id}`,
              method: 'put',
              data: JSON.stringify(this.updatePwdForm.password2)
            }).then(response => {
              if (response) {
                    this.$message({
                        message: `用户 #${this.$route.params.id} 重置密码成功`,
                        type: 'success'
                    });
                }
                this.loading = false;
                this.$router.push('/manageruser/list');
            })
        });
      }
    },
    created(){
      this.loadData()
    },
  }
</script>

