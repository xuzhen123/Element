<template>
    <div class="xz-form">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
        <el-form-item label="姓名" prop="fullName">
          <el-input placeholder="姓名"
                    v-model="createForm.fullName"
                    minlength="2"
                    maxlength="20"
                    show-word-limit
                    clearable></el-input>
      </el-form-item>
      <el-form-item label="帐号" prop="userName">
          <el-input placeholder="帐号，一般为姓名全拼"
                    v-model="createForm.userName"
                    minlength="2"
                    maxlength="30"
                    show-word-limit
                    clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password1">
          <el-input placeholder="7~50位字母、字符、数字"
                    autocomplete="off"
                    v-model="createForm.password1"
                    minlength="7"
                    maxlength="50"
                    show-word-limit
                    show-password
                    clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
          <el-input placeholder="7~50位字母、字符、数字"
                    autocomplete="off"
                    v-model="createForm.password2"
                    minlength="7"
                    maxlength="50"
                    show-word-limit
                    show-password
                    clearable></el-input>
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
              fullName: null,
              userName: null,
              password1: null,
              password2: null,
          },
          rules: {
              fullName: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                  { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
              ],
              userName: [
                  { required: true, message: '请输入帐号', trigger: 'blur' },
                  { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' },
                  {
                      validator: (rule, value, callback) => {
                          if (!/[0-9a-zA-Z]/.test(value)) {
                              callback(new Error('帐号应该为字母或数字'));
                          } else {
                              callback();
                          }
                      }, trigger: 'blur'
                  }
              ],
              password1: [
                  { required: true, message: '请输入新密码', trigger: 'blur' },
                  { min: 7, max: 50, message: '长度在 7 到 50 个字符', trigger: 'blur' }
              ],
              password2: [
                  { required: true, message: '请输入确认密码', trigger: 'blur' },
                  { min: 7, max: 50, message: '长度在 7 到 50 个字符', trigger: 'blur' },
                  {
                      validator: (rule, value, callback) => {
                          if (value !== this.createForm.password1) {
                              callback(new Error('两次输入密码不一致'));
                          } else {
                              callback();
                          }
                      }, trigger: 'blur'
                  }
              ]
          },
          loading: false
      }
    },
    computed: {
          _createForm() {
              let data = this.createForm;
              data.password = this.createForm.password2;
              delete data.password1;
              delete data.password2;
              return data;
          }
      },
    methods:{
      onSubmit(form) {
          this.$refs[form].validate((valid) => {
              if (!valid) {
                  return false;
              }
              this.loading = true;
              httpRequest({
                url: `/useraccount/create`,
                method: 'post',
                data: this._createForm
              }).then(response => {
                this.$message({
                      message: `用户 #${response} 创建成功`,
                      type: 'success'
                  });
                  this.loading = false;

                  this.$router.push('/manageruser/list')
              })
          });
      },
      onReset(form) {
          this.$refs[form].resetFields();
      }
    }
  }
</script>
