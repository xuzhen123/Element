<template>
  <div class="xz-form">
    <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
      <el-form-item label="主题" prop="subject">
        <el-input placeholder="主题，标题"
                  v-model="createForm.subject"
                  minlength="2"
                  maxlength="50"
                  show-word-limit
                  clearable></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
        <el-input type="textarea"
                  rows="10"
                  placeholder="内容，正文"
                  v-model="createForm.content"
                  minlength="2"
                  show-word-limit
                  clearable></el-input>
    </el-form-item>
    <el-form-item label="有效期" prop="dateExpired">
        <el-date-picker placeholder="有效日期"
                        v-model="createForm.dateExpired"
                        type="date"
                        clearable
                        :editable="false"
                        style="width:100%"
                        value-format="yyyy-MM-dd"></el-date-picker>
        <p class="tips">可选；在指定的日期时间内被提醒于商户</p>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('createForm')">创建</el-button>
        <el-button @click="resetForm('createForm')">重置</el-button>
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
            subject: null,
            content: null,
            dateExpired: null,
        },
        rules: {
            subject: [
                { required: true, message: '请输入主题', trigger: 'blur' },
                { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入内容', trigger: 'blur' },
            ],
            dateExpired: [
                {
                    validator: (rule, value, callback) => {
                        if (!value) {
                            callback();
                        }
                        let expired = new Date(value),
                            now = new Date();
                        if (expired < now) {
                            callback(new Error('有效日期应晚于当前日期'));
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
    methods:{
      submitForm(form){
        this.$refs[form].validate((valid) => {
            if (!valid) {
                return false;
            }
            
            this.loading = true;
            httpRequest({
              url: `/notice/create`,
              method: 'post',
              data: this.createForm
            }).then(response => {
              this.$message({
                    message: `公告 #${response} 发布成功`,
                    type: 'success'
                });
                this.loading = false;
                this.$router.push(`/notice/list`);
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
