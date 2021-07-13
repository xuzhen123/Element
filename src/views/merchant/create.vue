<template>
  <div class="xz-form">
    <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
      <el-form-item label="合同" prop="contractId">
        <el-select v-model="createForm.contractId"
                   placeholder="选择或搜索所属合同" clearable>
            <el-option v-for="item in contracts"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
        </el-select>
        <p class="tips">每个合同下可以有任意数量的商户</p>
    </el-form-item>
    <el-form-item label="名称" prop="name">
        <el-input placeholder="商户名称"
                  v-model="createForm.name"
                  minlength="2"
                  maxlength="50"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">便于识别或记忆的命名</p>
    </el-form-item>
    <el-form-item label="级别" prop="level">
        <el-select v-model="createForm.level"
                   placeholder="商户级别">
            <el-option v-for="item in levels"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value">
            </el-option>
        </el-select>
        <p class="tips">信任将免于终端、运单审核</p>
    </el-form-item>
    <el-form-item label="集成方式" prop="integrateModes">
        <el-checkbox-group v-model="createForm.integrateModes">
            <el-checkbox border v-for="item in integrateModes" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
        </el-checkbox-group>
        <p class="tips">直连(Direct)：在商户网站上收集卡信息；托管(Hosted)：在平台或渠道的页面收集卡信息</p>
    </el-form-item>
    <el-form-item label="结算币种" prop="settleCurrency">
        <el-input placeholder="结算币种"
                  v-model="createForm.settleCurrency"
                  minlength="3"
                  maxlength="3"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">ISO三位字母代码，大写；如美元：USD</p>
    </el-form-item>
    <el-form-item label="结算条件" prop="settleType">
        <el-select v-model="createForm.settleType"
                   placeholder="结算条件">
            <el-option v-for="item in settleTypes"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="结算周期" prop="settleDelay">
        <el-input placeholder="结算周期"
                  v-model="createForm.settleDelay"
                  minlength="1"
                  maxlength="4"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">单位：天；交易成功作为计时起点</p>
    </el-form-item>
    <el-form-item label="押金比例" prop="depositRate">
        <el-input placeholder="押金比例"
                  v-model="createForm.depositRate"
                  minlength="1"
                  maxlength="4"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">按交易额的百分比进行冻结，并在押金周期后解冻</p>
    </el-form-item>
    <el-form-item label="押金周期" prop="depositDelay">
        <el-input placeholder="押金周期"
                  v-model="createForm.depositDelay"
                  minlength="1"
                  maxlength="6"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">单位：天；从全额结算作为计时起点；必须短与结算周期</p>
    </el-form-item>
    <el-form-item label="提现手续费" prop="drawcashFee">
        <el-input placeholder="提现手续费"
                  v-model="createForm.drawcashFee"
                  minlength="1"
                  maxlength="18"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">每笔；相对于结算币种；最多两位小数表示</p>
    </el-form-item>
    <div class="x-divider-block"></div>
    <el-divider content-position="center">设置管理员</el-divider>
    <div class="x-divider-block"></div>
    <el-form-item label="姓名" prop="username">
        <el-input placeholder="管理员姓名"
                  v-model="createForm.username"
                  minlength="2"
                  maxlength="20"
                  show-word-limit
                  clearable></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="useremail">
        <el-input placeholder="管理员邮箱"
                  v-model="createForm.useremail"
                  minlength="5"
                  maxlength="80"
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
    <el-form-item>
        <el-button type="primary" @click="submitForm('createForm')">提交</el-button>
        <el-button @click="onReset('createForm')">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>

      import httpRequest  from 'network/httpRequest'
      import {levels,settleTypes,integrateModes,statuses} from 'enums/merchant'
      import { toInt } from 'common/flagParse';

      export default {
        data () {
          return {
            contracts: [],
            levels: levels,
            settleTypes: settleTypes,
            integrateModes: integrateModes,
            createForm: {
                contractId: null,
                name: null,
                level: 0,
                settleCurrency: 'CNY',
                settleType: 0,
                settleDelay: 7,
                depositRate: 0.1,
                depositDelay: 180,
                drawcashFee: 0,
                integrateModes: [],
                username: null,
                useremail: null,
                password1: null,
                password2: null,
            },
            rules: {
                contractId: [
                    { required: true, message: '请选择合同', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '请选择级别', trigger: 'blur' },
                ],
                settleCurrency: [
                    { required: true, message: '请输入结算货币', trigger: 'blur' },
                    { pattern: /^[A-Z]{3}$/, message: '标准的ISO字母代码', trigger: 'blur' }
                ],
                settleType: [
                    { required: true, message: '请选择结算类型', trigger: 'blur' },
                ],
                settleDelay: [
                    { required: true, message: '请输入结算周期', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '整数数值表示天数', trigger: 'blur' }
                ],
                depositRate: [
                    { required: true, message: '请输入押金比例', trigger: 'blur' },
                    { pattern: /^((([1-9]\d{0,18})|0)|-(([1-9]\d{0,18})|0))(\.\d{1,2})?$/, message: '最多2位小数表示的数值', trigger: 'blur' }
                ],
                depositDelay: [
                    { required: true, message: '请输入押金周期', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '整数数值表示天数', trigger: 'blur' }
                ],
                drawcashFee: [
                    { required: true, message: '请输入提现手续费', trigger: 'blur' },
                    { pattern: /^((([1-9]\d{0,18})|0)|-(([1-9]\d{0,18})|0))(\.\d{1,2})?$/, message: '最多2位小数表示的数值', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入管理员姓名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                useremail: [
                    { required: true, message: '请输入管理员邮箱', trigger: 'blur' },
                    { min: 5, max: 80, message: '长度在 5 到 80 个字符', trigger: 'blur' }
                ],
                password1: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
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
        methods: {
          submitForm(createForm){
            this.$refs[createForm].validate((valid) => {
              if(!valid){
                return false
              }

              this.loading = true;
              httpRequest({
                url:'/merchant/create',
                method:'post',
                data: this._createForm
              }).then((response) => {
                this.$message({                
                  message: `商户 #${response} 创建成功`,
                  type: 'success'
                })

                this.loading = false
                this.$router.push(`/merchant/list`)
              }).catch((error) => {
                console.log(error)
                this.$message.error('抱歉，商户创建失败')
              })
            })
          },
          loadContracts(){
            httpRequest({
              url: '/contract/list',
              methods: 'get',
            }).then(response => {
              this.contracts = response.items
            })
          },
          resetForm(createForm){
            this.$refs[createForm].resetFields();
          }
        },
        computed:{
          _createForm(){
            let data = this.createForm
            data.integrateModes = toInt(this.createForm.integrateModes);
            data.password = this.createForm.password2;
            delete data.password1;
            delete data.password2;

            return data
          }
        },
        created(){
          this.loadContracts()
        }
      }
</script>


