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
          <el-button type="text" :id="scope.index" @click="openFullScreen1(scope.$index)" v-loading.fullscreen.lock="fullscreenLoading"
            >编辑设备</el-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text">下发内容</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text">查看内容</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑设备" :visible.sync="dialogFormVisible" id="formcss">
      <el-row>
        <el-col :span="12">
          <form-paper :templateScreen="templateScreen"></form-paper>
        </el-col>
        <el-col :span="12">
          <paper-show></paper-show>
        </el-col>
      </el-row>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    "form-paper": () => import('./formPaper.vue'),
    "paper-show": () => import('./paperShow.vue')
  },
  data() {
    return {
      tableData: [
      ],
      fullscreenLoading: false,
      // 隐藏框
      dialogTableVisible: false,
      dialogFormVisible: false,
      templateScreen:"232323",
    };
  },
  methods: {
    test(e) {
      console.log(this.tableData[e].model);
      this.templateScreen = this.tableData[e].model;
      this.dialogFormVisible = true;
    },
    openFullScreen1(e) {
        
        this.templateScreen = this.tableData[e].model;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
        this.fullscreenLoading = true;
        this.dialogFormVisible = true;
      },
    // openFullScreen2(e) {
    //   this.fullscreenLoading = true;
    //   this.templateScreen = this.tableData[e].model;
    //   this.dialogFormVisible = true;
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    //   setTimeout(() => {
    //     loading.close();
    //   }, 2000);
    // }
  },
  mounted() {
    this.$ajax.get("/api/epd/devices").then(res => {
      console.log(res.data)

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
      };
        tableData.ip = res.data[i].ip
        tableData.mac = res.data[i].mac
        tableData.signal = res.data[i].rssi.length >0 ? res.data[i].rssi + "db" : ""
        tableData.battery = res.data[i].epd_ver + "%"
        tableData.templateNumber = res.data[i].ID
        tableData.refreshTime = new Date(res.data[i].UpdatedAt).toLocaleString()
        tableData.lastTime = new Date(res.data[i].last_refresh_at).toLocaleString()
        tableData.ssid = res.data[i].ssid
        switch (res.data[i].epd_width){
          case 640:
            tableData.model = "7.5寸黑白红";
            break;
          case 400:
            tableData.model = "4.2寸黑白红"
            break;
        }
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
