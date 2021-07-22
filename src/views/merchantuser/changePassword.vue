<template>
    <div class="xz-form">
        <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="100px" @submit.native.prevent>
            <el-form-item label="编号">
                <span>{{user.id}}</span>
            </el-form-item>
            <el-form-item label="姓名">
                <span>{{user.name}}</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>{{user.email}}</span>
            </el-form-item>
            <el-form-item label="新密码" prop="password1">
                <el-input placeholder="7~50位字母、字符、数字"
                          autocomplete="off"
                          v-model="pwdForm.password1"
                          minlength="7"
                          maxlength="50"
                          show-word-limit
                          show-password
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input placeholder="7~50位字母、字符、数字"
                          autocomplete="off"
                          v-model="pwdForm.password2"
                          minlength="7"
                          maxlength="50"
                          show-word-limit
                          show-password
                          clearable></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
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
                pwdForm: {
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
                                if (value !== this.pwdForm.password1) {
                                    callback(new Error('两次输入密码不一致'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods:{
            submitForm(form){
                this.$refs[form].validate((valid) => {
                    if (!valid) {
                        return false;
                    }

                    httpRequest({
                        url: `/merchantuser/update/${this.$route.params.mid}/${this.$route.params.uid}`,
                        method: 'put',
                        data: JSON.stringify(this.pwdForm.password2)
                    }).then(response => {
                        if (response) {
                            this.$message({
                                message: `商户用户 #${this.$route.params.uid} 密码重置成功`,
                                type: 'success'
                            });
                        }
                        this.$router.push('/user/list');
                    })
                });
            }
        },
        created(){
            httpRequest({
                url: `/merchantuser/get/${this.$route.params.mid}/${this.$route.params.uid}`,
                method: 'get',
               
            }).then(response => {
                this.user = response
            })
        }
    }
</script>

