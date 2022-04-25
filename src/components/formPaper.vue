<template>
  <div>
    <el-form :label-position="labelPosition" :model="form">
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
        <el-form-item label="活动名称" >
        <el-input v-model="form.activeName"></el-input>
        </el-form-item>
        <el-form-item label="会议场所">
        <el-input v-model="form.meetAdr"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
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
        <el-button type="primary" @click="dialogFormVisible = false"
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
    },
    data(){
        return {
            form: {
                templateScreen: "",
                templateContent: "",
                activeName: "",
                meetAdr: "",
                name: "",
                describe: "",
                meetName: "",
                state: "",
            },
            formLabelWidth: "120px",
            labelPosition: "right",
        }
    }
}
</script>

<style>

</style>