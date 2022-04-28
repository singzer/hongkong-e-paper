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
        <el-select v-model="form.templateContent"  placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm" :plain="true"
            >确 定</el-button
        >
    </el-form-item>
    </el-form>


    <!-- 563151515315 -->
  </div>
</template>

<script>
export default {
    props: {
        templateScreen: {
            type: String,
            default: '请选择活动区域'
        },
        formID:{
            type: Number,
            default:12
        }
    },
    data(){
      
        return {
            form: {
                templateScreen: "",
                templateContent: "",
                meetAdr: "",
                name: "",
                describe: "",
                meetName: "",
                state: "",
                // eID:null,
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
    methods:{
        // 提交表单给paperPaper组件
        subForm(){
            
            let dataJson = JSON.stringify({temp_name:"1212",temp_data:this.form})
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
        }
    },
    beforeMount(){
        let id = this.formID
        console.log(id)
    }
}
</script>

<style>

</style>