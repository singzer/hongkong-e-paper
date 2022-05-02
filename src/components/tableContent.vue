<template>
  <div class="table-content">
    <el-table :data="tableData" style="width: 100%; font-size: 15px">
      <el-table-column prop="model" label="屏幕型号"> </el-table-column>
      <el-table-column prop="ip" label="设备IP"> </el-table-column>
      <el-table-column prop="mac" label="设备MAC"> </el-table-column>
      <el-table-column prop="ssid" label="SSID" > </el-table-column>
      <el-table-column prop="signal" label="信号强度">
      </el-table-column>
      <el-table-column prop="battery" label="电池电量" >
      </el-table-column>
      <el-table-column prop="templateNumber" label="模板编号">
      </el-table-column>
      <el-table-column prop="state" label="内容状态">
      </el-table-column>
      <el-table-column prop="refreshTime" label="刷新时间"></el-table-column>
      <el-table-column prop="lastTime" label="最后上线时间"></el-table-column>
      <el-table-column prop="operate" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" :id="scope.index" @click="openFormScreen(scope.$index)" 
            >编辑设备</el-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text">下发内容</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="openContentScreen(scope.$index)">查看内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑设备" :visible.sync="dialogFormVisible" id="formcss" v-if="dialogFormVisible">
      <el-row>
        <el-col :span="12">
          <div @click="test">12121212</div>
          <form-paper :templateScreen="templateScreen" :formID="formID" @formMes="imgURLMes" :tableStoreId="tableStoreId"></form-paper>
        </el-col>
        <el-col :span="12">
          <paper-show v-loading.lock="fullscreenLoading" :ePaperTemplate="ePaperTemplate" :imgURL="imgURL" :paperID="paperID" id="test"></paper-show>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="编辑设备" :visible.sync="dialogContentVisible" class="ttt" prop="test">
      <content-show prop="test"></content-show>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components: {
    "form-paper": () => import('./formPaper.vue'),
    "paper-show": () => import('./paperShow.vue'),
    "content-show":() => import('./contentShow.vue')
  },
  data() {
    return {
      tableData: [
      ],
      formID:12,
      tableStoreId:12,
      fullscreenLoading: false,
      // 隐藏框
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogContentVisible:false,
      templateScreen:"232323",
      ePaperTemplate:{
        width:'',
        height:'',
        temp_data:{
              title: null,
              user: "用户名",
              test: "测试",
              meetRoom: "会议室",
              meetYMD: "2000-01-01",
              meetStart: "14:30",
              meetEnd: "15:30",
              meetState: "会议中",
        },
        temp_name:'名字',
      },
      formPaperData:"",
      imgURL:{},
      paperID: 0,
      // paperShowKey:0,
    };
  },
  methods: {
    test() {
      // this.templateScreen = this.tableData[e].model;
      // this.dialogFormVisible = true;
      
    },
    imgURLMes(e){
      this.imgURL = e;
    },
    previews(e){
      console.log(e);
      this.fullscreenLoading = e
    },
    // 展示编辑页面
    openFormScreen(e) {
        this.ePaperTemplate.width = this.tableData[e].width;
        this.ePaperTemplate.height = this.tableData[e].height;
        this.paperShowKey = Math.random();
        console.log(this.tableStoreId);
        switch(this.ePaperTemplate.width){
          case 640:
            this.ePaperTemplate.temp_data.title = "测试会议";
            this.ePaperTemplate.temp_data.user = "用户名";
            this.ePaperTemplate.temp_data.test = "测试1111";
            this.ePaperTemplate.temp_data.meetRoom = "会议室";
            this.ePaperTemplate.temp_data.meetYMD = "2000-01-01";
            this.ePaperTemplate.temp_data.meetStart = "14:30";
            this.ePaperTemplate.temp_data.meetEnd = "15:30";
            this.ePaperTemplate.temp_data.meetState = "会议中";
            this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
            break;
          case 400:
            this.ePaperTemplate.temp_data.title = "测试会议";
            this.ePaperTemplate.temp_data.user = "用户名";
            this.ePaperTemplate.temp_data.test = "测试";
            this.ePaperTemplate.temp_data.meetRoom = "会议室2222";
            this.ePaperTemplate.temp_data.meetYMD = "2000-01-01";
            this.ePaperTemplate.temp_data.meetStart = "14:30";
            this.ePaperTemplate.temp_data.meetEnd = "15:30";
            this.ePaperTemplate.temp_data.meetState = "会议中";
            this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
            break;
        }
        this.templateScreen = this.tableData[e].model;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
        this.formID = this.tableData[e].id
        this.fullscreenLoading = true;
        this.dialogFormVisible = true;
        this.tableStoreId = e;
        this.imgURL = {};
        this.paperID = e;
      },

    // 展示内容页面
    openContentScreen(e){
      this.dialogContentVisible = true
      console.log(e)
    },

    
  },
  computed:{
    
  },
  mounted() {
    this.$ajax.get("/api/epd/devices").then(res => {
      // console.log(res.data)
      this.$store.commit("setTableData", res.data);
      console.log(this.$store.state.tableData)
      for(let i = 0; i < res.data.length; i++ ){
        let tableData = {
        model: "",
        ip: "",
        mac: "",
        ssid: "",
        signal: "",
        battery: "",
        templateNumber: "",
        state: "",
        refreshTime: "",
        lastTime: "",
        operate: "",
        id:null,
        width:"",
        height:"",
        temp_name:""
      };
        tableData.ip = res.data[i].ip
        tableData.mac = res.data[i].mac
        tableData.signal = res.data[i].rssi.length >0 ? res.data[i].rssi + "db" : ""
        tableData.battery = res.data[i].battery_percentage + "%"
        tableData.templateNumber = res.data[i].ID
        tableData.refreshTime = new Date(res.data[i].UpdatedAt).toLocaleString()
        tableData.lastTime = new Date(res.data[i].last_refresh_at).toLocaleString()
        tableData.ssid = res.data[i].ssid
        tableData.id = res.data[i].ID
        tableData.width = res.data[i].epd_width
        tableData.height = res.data[i].epd_height
        tableData.temp_name = res.data[i].temp_name
        tableData.model = res.data[i].epd_ver.length > 0 ? res.data[i].epd_ver + "-" + res.data[i].epd_width + "*" + res.data[i].epd_height : res.data[i].epd_width + "*" + res.data[i].epd_height
        if(res.data[i].battery_is_charging == true){
          tableData.state = "正常"
        }else{
          tableData.state = "不正常"
        }
        this.tableData.push(tableData)
        // console.log(tableData)
      }
    })
    document.getElementsByClassName('el-table__body-wrapper')[0].style.overflowX = 'clip';
  },
  
};
</script>

<style>
.table-content{
  margin-left: 3%;
  margin-right: 3%;
  font-weight: lighter;
  color: black;
}


.el-table__header-wrapper .el-table__cell{
  background-color: red;
}

.el-table__body-wrapper .el-table__cell{
  color: #292421;
}

span{
  font-size: 15px;
}

.el-dialog{
    width: 1000px;
    height: 600px;
  }



/* @media (min-width: 1200px) and (max-width: 2000px){
  .el-dialog{
    width: 1000px;
    height: 600px;
  }
} */

@media (max-width: 1200px) {
  
}
</style>
