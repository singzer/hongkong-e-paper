<template>
  <div>
    <el-form :label-position="labelPosition" :model="form" :rules="rules">
        <el-form-item label="模板画面">
        <el-select :placeholder="templateScreen" :disabled="true">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="内容模板">
        <el-select v-model="form.templateContent"  placeholder="请选择活动区域" @change="selectChange">
            <el-option label="会议桌签1" value="会议桌签1"></el-option>
            <el-option label="会议桌签2" value="会议桌签2"></el-option>
            <el-option label="图书馆引导牌1" value="图书馆引导牌1"></el-option>
            <el-option label="图书馆引导牌2" value="图书馆引导牌2"></el-option>
            <el-option label="图书馆引导牌3" value="图书馆引导牌3"></el-option>
            <el-option label="图书馆引导牌4" value="图书馆引导牌4"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="会议场所">
        <el-input v-model="form.meetAdr" minlength="4" maxlength="8" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="姓名">
        <el-input v-model="form.name" minlength="2" maxlength="4" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职称或描述">
        <el-input v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="会议名称">
        <el-input v-model="form.meetName"></el-input>
        </el-form-item>
        <el-form-item label="状态" id="1">
        <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button @click="preview" >预 览</el-button>
        <el-button type="primary" @click="subForm" :plain="true"
            >上 传</el-button
        >
    </el-form-item>
    </el-form>


    <!-- 563151515315 -->
  </div>
</template>

<script>
import {Base64} from 'js-base64'
export default {
    props: {
        templateScreen: {
            type: String,
            default: '请选择活动区域'
        },
        formID:{
            type: Number,
            default:12
        },
        tableStoreId:{
            type: Number,
            default:12
        }
        
    },
    data(){
      
        return {
            form: {
                templateScreen: "", // 屏幕型号
                templateContent: "", // 内容模板
                meetAdr: "", // 会议场所
                name: "", // 姓名
                describe: "", // 职称或描述
                meetName: "", // 会议名称
                state: "", // 状态
            },
            rules:{
                checkActiveName: [
                    // { validator: validateForm, trigger: 'blur' },
                    { max:8, message: '不能超过8个字符',  trigger: 'blur'}
                ]
            },
            formLabelWidth: "120px",
            labelPosition: "right",
        }
    },
    computed: {
        tableStore(){
            return this.$store.state.tableData[this.tableStoreId]
        }
    },
    methods:{
        // 预览
        preview(){
            let date = new Date()
            let dataJson = JSON.stringify({
                name: this.form.name,
                meetAdr: this.form.meetAdr,
                describe: this.form.describe,
                meetName: this.form.meetName,
                state: this.form.state,
                startTime: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                endTime: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
            })
            let data = Base64.encode(dataJson)
            // this.$refs.ttt.imgURL = `/api/form/preview?data=${data}`
            console.log(data)
            this.$emit('formMes',data)
        },

        // 提交表单给paperPaper组件
        subForm(){
            
            let dataJson = JSON.stringify({temp_name:"1212",temp_data:{
                name: this.form.name,
                meetAdr: this.form.meetAdr,
                describe: this.form.describe,
                meetName: this.form.meetName,
                state: this.form.state,
                startTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                endTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            }})
            console.log(dataJson)
            this.$ajax({
                method: "post",
                url: `/api/epd/device/${this.formID}/setTemp`,
                data: dataJson,
                dataType:"json",
            }).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.$message('上传成功')
                }else{
                    this.$message('上传失败')
                }
            })
        },

        // selectChange
        selectChange(value){
            console.log(value)
        }
    },
    mounted(){
        console.log("========")
    }

}
</script>

<style>

</style>