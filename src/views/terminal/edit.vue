<template>
    <div class="xz-form">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
            <el-form-item label="编号">
                <span>{{editForm.id}}</span>
            </el-form-item>
            <el-form-item label="商户">
                <span>{{editForm.merchantName}}</span>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input placeholder="终端名称"
                          v-model="editForm.name"
                          minlength="2"
                          maxlength="20"
                          show-word-limit
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="域名/包名" prop="source">
                <el-input placeholder="终端域名/包名"
                          v-model="editForm.source"
                          minlength="3"
                          maxlength="80"
                          show-word-limit
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-input placeholder="分类"
                          v-model="editForm.category"
                          maxlength="100"
                          show-word-limit
                          clearable></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="editForm.type"
                           placeholder="终端类型">
                    <el-option v-for="item in types"
                               :key="item.value"
                               :label="item.text"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提醒" prop="alerts">
                <el-checkbox-group v-model="editForm.alerts">
                    <el-checkbox border v-for="item in alerts" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
  import {toArray,toInt} from 'common/flagParse'
  import httpRequest  from 'network/httpRequest'
  import {alerts,types,statuses} from 'enums/terminal'
  export default {
    data () {
        return {
            types: types,
            alerts: alerts,
            statuses: statuses,
            editForm: {
                name: null,
                source: null,
                category: null,
                type: null,
                alerts: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                source: [
                    { required: true, message: '请输入域名/包名', trigger: 'blur' },
                    { min: 3, max: 80, message: '长度在 3 到 80 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' },
                ],
                category: [
                    { max: 100, message: '长度在 100 个字符以内', trigger: 'blur' }
                ],
            },
            loading: true
        }
    },
    computed: {
        _editForm() {
            let data = this.editForm;
            data.alerts = toInt(this.editForm.alerts);
            return data;
        }
    },
    methods: {
        loadData(){
            httpRequest({
                url: `/terminal/get/${this.$route.params.id}`,
                method: 'get',
            }).then(response => {
                this.editForm = response
                this.editForm.alerts = toArray(alerts, response.alerts);
            })
        },
        submitForm(form){
            this.$refs[form].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.loading = true;
                httpRequest({
                    url: `/terminal/update/${this.$route.params.id}`,
                    method: 'put',
                    data: this._editForm
                }).then(response => {
                    if (response) {
                        this.$message({
                            message: `#${this.$route.params.id} 终端编辑成功`,
                            type: 'success'
                        });
                    }
                    this.loading = false;
                    this.$router.push(`/terminal/list`);
                })
            });
        }
    },
    created(){
        this.loadData()
    }
  }
</script>
