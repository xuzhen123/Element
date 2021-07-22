<template>
  <div class="xz-form">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
      <el-form-item label="商户名称" prop="name">
        <el-input v-model="editForm.name" placeholder="商户名称" minlength="2" maxlength="50" show-word-limit clearable></el-input>
        <p class="tips">便于识别或记忆的命名</p>
      </el-form-item>
      <el-form-item label="商户级别" prop="level">
        <el-select v-model="editForm.level"
                      placeholder="商户级别">
              <el-option v-for="item in levels"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value">
              </el-option>
          </el-select>
          <p class="tips">信任将免于终端、运单审核</p>
      </el-form-item>
      <el-form-item label="结算条件" prop="settleType">
        <el-select v-model="editForm.settleType"
                   placeholder="结算条件">
            <el-option v-for="item in settleTypes"
                       :key="item.value"
                       :label="item.text"
                       :value="item.value">
            </el-option>
        </el-select>
        <p class="tips"><b>注意：</b>改变结算条件会对当前商户所有未结算的数据产生影响</p>
    </el-form-item>
    <el-form-item label="结算周期" prop="settleDelay">
        <el-input placeholder="结算周期"
                  v-model="editForm.settleDelay"
                  minlength="1"
                  maxlength="4"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">单位：天；交易成功作为计时起点</p>
    </el-form-item>
    <el-form-item label="押金比例" prop="depositRate">
        <el-input placeholder="押金比例"
                  v-model="editForm.depositRate"
                  minlength="1"
                  maxlength="4"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">按交易额的百分比进行冻结，并在押金周期后解冻</p>
    </el-form-item>
    <el-form-item label="押金周期" prop="depositDelay">
        <el-input placeholder="押金周期"
                  v-model="editForm.depositDelay"
                  minlength="1"
                  maxlength="6"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">单位：天；从全额结算作为计时起点；必须短与结算周期</p>
    </el-form-item>
    <el-form-item label="提现手续费" prop="drawcashFee">
        <el-input placeholder="提现手续费"
                  v-model="editForm.drawcashFee"
                  minlength="1"
                  maxlength="18"
                  show-word-limit
                  clearable></el-input>
        <p class="tips">每笔；相对于结算币种；最多两位小数表示</p>
    </el-form-item>
    <el-form-item label="集成方式" prop="integrateModes">
        <el-checkbox-group v-model="editForm.integrateModes">
            <el-checkbox border v-for="item in integrateModes" :label="item.value" :key="item.value">{{item.text}}</el-checkbox>
        </el-checkbox-group>
        <p class="tips">直连(Direct)：在商户网站上收集卡信息；托管(Hosted)：在平台或渠道的页面收集卡信息</p>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {levels,settleTypes,integrateModes} from 'enums/merchant'
  import {toArray,toInt} from 'common/flagParse'
  import httpRequest  from 'network/httpRequest'
  export default {
    data () {
      return {
                levels: levels,
                settleTypes: settleTypes,
                integrateModes: integrateModes,
                editForm: {
                    name: null,
                    level: null,
                    settleType: null,
                    settleDelay: null,
                    depositRate: null,
                    depositDelay: null,
                    drawcashFee: null,
                    integrateModes: []
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                    ],
                    level: [
                        { required: true, message: '请选择级别', trigger: 'blur' },
                    ],
                    settleCurrency: [
                        { required: true, message: '请输入结算货币', trigger: 'blur' },
                        {
                            validator: (rule, value, callback) => {
                                if (!/^[A-Z]{3}$/.test(value)) {
                                    callback(new Error('标准的ISO字母代码'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    settleType: [
                        { required: true, message: '请选择结算类型', trigger: 'blur' },
                    ],
                    settleDelay: [
                        { required: true, message: '请输入结算周期', trigger: 'blur' },
                        {
                            validator: (rule, value, callback) => {
                                if (!/^[0-9]*$/.test(value)) {
                                    callback(new Error('整数数值表示天数'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
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
                },
                loading: true
            }
    },
    computed: {
      _editForm() {
                let data = this.editForm;
                data.integrateModes = toInt(this.editForm.integrateModes);
                return data;
            }
    },
    methods:{
      loadData(){
        httpRequest({
          url: `/merchant/get/${this.$route.params.id}`,
          method: 'get',
        }).then(response => {
          this.editForm = response
          this.editForm.integrateModes = toArray(integrateModes,response.integrateModes)
        })
      },

      submitForm(form){
        this.$refs[form].validate((valid) => {
              if (!valid) {
                  return false;
              }
              console.log(this._editForm)
              this.loading = true;
              httpRequest({
                url: `/merchant/update/${this.$route.params.id}`,
                method: 'put',
                data: this._editForm
              }).then(response => {
                if (response) {
                      this.$message({
                          message: `#${this.$route.params.id} 商户编辑成功`,
                          type: 'success'
                      });
                  }
                  this.loading = false;
                  this.$router.push(`/merchant/list`);
              })
          });
       }
    },
    created(){
      this.loadData()
    }
  }
</script>

