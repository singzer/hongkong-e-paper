<template>
  <div>
    <el-form :label-position="labelPosition" :model="form" :rules="rules" ref="formData">
        <el-form-item label="模板画面">
        <el-select :placeholder="templateScreen" :disabled="true" v-model="form.templateScreen">
            <!-- <el-option label="区域一" value="shanghai"></el-option> -->
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
        </el-form-item>
        <el-form-item label="内容模板">
        <el-select v-model="form.templateContent"  placeholder="请选择活动区域" @change="selectChange">
            <el-option label="会议桌签" value="hd." ></el-option>
            <!-- <el-option label="会议桌签2" value="会议桌签2"></el-option> -->
            <el-option label="图书馆引导牌red" value="letter.red" ></el-option>
            <el-option label="图书馆引导牌black" value="letter.black" ></el-option>
            <!-- <el-option label="图书馆引导牌3" value="图书馆引导牌3"></el-option> -->
            <!-- <el-option label="图书馆引导牌4" value="图书馆引导牌4"></el-option> -->
        </el-select>
        </el-form-item>
        <el-form-item label="会议场所" prop="meetAdr" v-if="isShow">
        <el-input v-model="form.meetAdr" minlength="4" maxlength="8" show-word-limit autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" v-if="isShow">
        <el-input v-model="form.name" minlength="2" maxlength="4" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职称或描述" prop="describe" v-if="isShow">
        <el-input v-model="form.describe" minlength="2" maxlength="4" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="会议名称" prop="meetName" v-if="isShow">
        <el-input v-model="form.meetName"></el-input>
        </el-form-item>
        <el-form-item label="状态" id="1" prop="state" v-if="isShow">
        <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item label="文本内容" id="1" prop="text" v-if="!isShow">
        <el-input v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button @click="preview" >预 览</el-button>
        <el-button type="primary" @click="subForm('formData')" :plain="true"
            >上 传</el-button
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
        // 模板id
        formID:{
            type: Number,
            default:12
        },
        // 原内容索引
        tableStoreId:{
            type: Number,
            default:12
        }
        
    },
    data(){
        let validatekMeetAdr = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入会议场所'));
            } else if(value.length < 4 || value.length > 8){
                callback(new Error('会议场所长度为4-8位'));
            } else {
                callback();
            }
        };

        let validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入姓名'));
            } else if(value.length < 2 || value.length > 4){
                callback(new Error('姓名长度为2-4位'));
            } else {
                callback();
            }
        };

        let validateDescribe = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入职称或描述'));
            } else {
                callback();
            }
        };

        let validateMeetName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入会议名称'));
            } else if(value.length < 2 || value.length > 4){
                callback(new Error('会议名称长度为2-4位'));
            } else {
                callback();
            }
        };

        let validateState = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入状态'));
            } else {
                callback();
            }
        };
      
        return {
            form: {
                templateScreen: "", // 屏幕型号
                templateContent: "", // 内容模板
                meetAdr: "", // 会议场所
                name: "", // 姓名
                describe: "", // 职称或描述
                meetName: "", // 会议名称
                state: "", // 状态
                text: "", // 文本内容
            },
            rules:{
                checkActiveName: [
                    // { validator: validateForm, trigger: 'blur' },
                    { max:8, message: '不能超过8个字符',  trigger: 'blur'}
                ],
                meetAdr: [
                    { validator: validatekMeetAdr, trigger: 'blur' }
                ],
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                describe: [
                    { validator: validateDescribe, trigger: 'blur' }
                ],
                meetName: [
                    { validator: validateMeetName, trigger: 'blur' }
                ],
                state: [
                    { validator: validateState, trigger: 'blur' }
                ],
            },
            formLabelWidth: "120px",
            labelPosition: "right",
            isShow: true,
            initData: {
                name: "姓名",
                describe: "职称或描述",
                meetName: "会议名称",
                state: "状态",
                meetAdr: "会议场所",
                text: "文本内容",
            },
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
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                // spinner: 'el-icon-loading',
                target: '.box-card',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if (this.form.templateContent.split('.')[0] == "hd"){
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
            let data = encodeURIComponent(dataJson)
            let tempType = this.form.templateContent.split('.')[0] + this.$store.state.tableData[this.tableStoreId].epd_width + "" + this.$store.state.tableData[this.tableStoreId].epd_height + "" +this.form.templateContent.split('.')[1]
            // this.$refs.ttt.imgURL = `/api/form/preview?data=${data}`
            console.log(tempType)
            console.log(data)
            console.log("temp_data",data)

            this.$emit('formMes',{
                tempType: tempType,
                tempData: data,
            })
            setTimeout(() => {
                loading.close();
            }, 3000);
            return;
            }else{
                let dataJson = JSON.stringify({
                    text: this.form.text,
                })
                let tempType = this.form.templateContent.split('.')[0] + this.$store.state.tableData[this.tableStoreId].epd_width + "" + this.$store.state.tableData[this.tableStoreId].epd_height + "" +this.form.templateContent.split('.')[1]
                let data = encodeURIComponent(dataJson)
                console.log(tempType)
                console.log(data)
                this.$emit('formMes',{
                    tempType: tempType,
                    tempData: data,
                })
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        },

        // 提交表单给paperPaper组件
        subForm(value){
            let check = false;
            this.$refs[value].validate((valid) => {
                if (!valid) {
                    // this.$emit('formMes',this.form)
                    console.log('error submit!!');
                    return false;
                } else {
                    check = true;
                    return true;
                }
            });
            if(!check){
                this.$message('请填写内容')
                return ;
            }

            let temp_data = JSON.stringify({
                name: this.form.name,
                meetAdr: this.form.meetAdr,
                describe: this.form.describe,
                meetName: this.form.meetName,
                state: this.form.state,
                startTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                endTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
            })
            let temp_name = this.$store.state.tableData[this.tableStoreId].name
            let dataJson = {temp_name:temp_name,temp_data:encodeURIComponent(temp_data)}
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
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                // spinner: 'el-icon-loading',
                target: '.box-card',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if (value.split('.')[0] == "hd"){
                    this.isShow = true;
                    let date = new Date();
                    let dataJson = JSON.stringify({
                        name: this.initData.name,
                        meetAdr: this.initData.meetAdr,
                        describe: this.initData.describe,
                        meetName: this.initData.meetName,
                        state: this.initData.state,
                        startTime: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                        endTime: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                    })
                    value = value.split('.')[0] + this.$store.state.tableData[this.tableStoreId].epd_width + "" + this.$store.state.tableData[this.tableStoreId].epd_height + "" +value.split('.')[1]
                    let temp_data = encodeURIComponent(dataJson)
                    this.$emit('formMes',{
                    tempType: value,
                    tempData: temp_data,
                })
                setTimeout(() => {
                    loading.close();
                }, 3000);
                return;
            }
            if (value.split('.')[0] == "letter"){
                this.isShow = false;
                let dataJson = JSON.stringify({
                    text: this.initData.text,
                });
                let data = encodeURIComponent(dataJson)
                value = value.split('.')[0] + this.$store.state.tableData[this.tableStoreId].epd_width + "" + this.$store.state.tableData[this.tableStoreId].epd_height + "" +value.split('.')[1]
                this.$emit('formMes',{
                    tempType: value,
                    tempData: data,
                })
                setTimeout(() => {
                    loading.close();
                }, 2000);
                return;
            }
        },

    },
    mounted(){
        console.log("========")
    }

}
</script>

<style>
.el-form-item__error{
    margin-left: 80px;
}
</style>