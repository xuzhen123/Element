<template>
    <div class="xz-form">
      <el-form ref="createForm" :model="createForm" :rules="rules" v-loading="loading">
        <el-form-item label="附件" prop="attachment">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" 
                                          :limit="1"
                                          :multiple="false"
                                          :before-upload="beforeUpload"
                                          accept=".xlsx"
                                          :on-remove="handleRemove">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">点击此处，<el-link type="primary" @click="downloadTemplate">下载模版</el-link></div>
          </el-upload>
        </el-form-item>
      <div style="text-align:right">
        <el-button type="primary" @click="submitForm('createForm')">提交</el-button>
      </div>
      </el-form>
    </div>
</template>

<script>
  import httpRequest  from 'network/httpRequest'
  export default {
    data () {
      return {
        createForm: {
              attachment: null,
          },
          rules: {
              attachment: [
                  {
                      required: true,
                      validator: (rule, value, callback) => {
                          if (this.createForm.attachment === null) {
                              callback(new Error('请选择附件'));
                          } else {
                              callback();
                          }
                      },
                      trigger: 'blur'
                  }
              ]
          },
          loading: false
      }
    },
    methods:{
      downloadTemplate(){
        this.loading = true;
        httpRequest({
          url:`/waybill/template?maxSize=1000`,
          timeout: 60000,
          method:'get'
        }).then(response => {
          let byteString = atob(response.bytes);
            let ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            let blob = new Blob([ia], {
                type: response.type
            });
            let link = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = response.name;
            link.click();
            window.URL.revokeObjectURL(url);
            this.loading = false;
        })
      },
      beforeUpload(file) {
          let _form = this.createForm;
          let _reader = new FileReader();
          _reader.onload = function () {
              if (!this.result) {
                  return;
              }
              let array = this.result.split(';base64,');
              _form.attachment = array[array.length - 1];
          };
          _reader.readAsDataURL(file);
          return false;
      },
      handleRemove() {
          this.createForm.attachment = null;
      },
      onSubmit(form) {
          this.$refs[form].validate((valid) => {
              if (!valid) {
                  return false;
              }

              this.loading = true;
              httpRequest({
                url: `/waybill/upload`,
                method:'post',
                timeout:60000,
                data:JSON.stringify(this.createForm.attachment)
              }).then(response => {
                this.$message({
                      message: `运单已上传，共计${response.total}，成功${response.success}`,
                      type: 'success'
                  });
                  this.loading = false;
                  this.$router.push(`/waybill/list`);
              })
          });
      },
    }
  }
</script>
