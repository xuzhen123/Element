<template>
    <div class="xz-form">
        <el-form :model="auditForm" ref="auditForm"  label-width="100px">
            <el-form-item label="编号">
                <span>{{ auditForm.id }}</span>
              </el-form-item>
              <el-form-item label="交易号">
                <span>{{ auditForm.txnId }}</span>
              </el-form-item>
              <el-form-item label="商户">
                <span>{{ auditForm.merchantId }}</span>
              </el-form-item>
              <el-form-item label="终端编号">
                <span>{{ auditForm.terminalId }}</span>
              </el-form-item>
              <el-form-item label="原始交易金额">
                <span>{{auditForm.originalCurrency}} {{auditForm.originalAmount}}</span>
              </el-form-item>
              <el-form-item label="实际交易金额">
                <span>{{auditForm.transactionCurrency}} {{auditForm.transactionAmount}}</span>
              </el-form-item>
              <el-form-item label="结算金额">
                <span> {{auditForm.settleCurrency}} {{auditForm.settleAmount}}</span>
              </el-form-item>
              <el-form-item label="手续费">
                <span> {{auditForm.settleCurrency}} {{auditForm.settleFee}}</span>
              </el-form-item>
              <el-form-item label="退款原因">
                <span> {{getText(reasons,auditForm.reason)}} </span>
              </el-form-item>
              <el-form-item label="退款状态">
                <span> {{getText(statuses,auditForm.status)}} </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span> {{toDateTime(auditForm.dateCreated)}} </span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span> {{toDateTime(auditForm.dateUpdated)}} </span>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="onAuditAction(false)">拒绝</el-button>
                <el-button type="success" @click="onAuditAction(true)">通过</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {reasons,statuses} from 'enums/refund'
    import {getText} from 'common/flagParse'
    import {toDateTime} from 'common/format';
    import httpRequest  from 'network/httpRequest'
    export default {
       data () {
        return {
            reasons: reasons,
            statuses: statuses,
            auditForm:{}
        }         
       },
       methods:{    
        toDateTime: toDateTime,
        getText: getText,      
        loadData(){
            httpRequest({
            url: `/refund/get/${this.$route.params.id}`,
            method: 'get',
        }).then(response => {
            this.auditForm = response
            })
        },
        onAuditAction(boolValue){
            let _status_text = boolValue ? '通过' : '拒绝';
            let _status_enum = boolValue ? 3 : 1;

            this.$confirm(`确定将此退款设置为 ${_status_text} 吗？`,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>{
                httpRequest({
                    url:`/refund/set/${this.$route.params.id}`,
                    method:'put',
                    data: _status_enum
                }).then(response => {
                if (response) {
                        this.$message({
                            message: `退款 #${this.$route.params.id} 状态变更为${getText(statuses, _status_enum)}`,
                            type: 'success'
                        });
                    }
                    else {
                        this.$message.error(`退款 #${this.$route.params.id} 审核失败`);
                    }

                    this.$router.push('/refund/list')
                })
            })
        }
       },
       created(){
        this.loadData()
       }
    }
</script>
