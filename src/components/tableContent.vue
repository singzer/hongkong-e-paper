<template>
  <div id="table-content">
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
          <el-button type="text" :id="scope.index" @click="test(scope.$index)"
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
        {
          model: "7.5英寸黑白红",
          ip: "192.168.1.3",
          mac: "00:00:00:00:00:00",
          ssid: "singzer",
          signal: "-50db",
          battery: "100%",
          templateNumber: "1",
          state: "正常",
          refreshTime: "2022/3/23 16:36:18",
          lastTime: "2022/3/23 16:36:18",
          operate: "操作   编辑    上传",
        },
        {
          model: "7.5英寸黑白红",
          ip: "192.168.1.3",
          mac: "00:00:00:00:00:00",
          ssid: "singzer",
          signal: "-50db",
          battery: "100%",
          templateNumber: "1",
          state: "正常",
          refreshTime: "2022/3/23 16:36:18",
          lastTime: "2022/3/23 16:36:18",
          operate: "操作",
        },
        {
          model: "7.5英寸黑白红",
          ip: "192.168.1.3",
          mac: "00:00:00:00:00:00",
          ssid: "singzer",
          signal: "-50db",
          battery: "100%",
          templateNumber: "1",
          state: "正常",
          refreshTime: "2022/3/23 16:36:18",
          lastTime: "2022/3/23 16:36:18",
          operate: "操作",
        },
        {
          model: "7.5英寸黑白红",
          ip: "192.168.1.3",
          mac: "00:00:00:00:00:00",
          ssid: "singzer",
          signal: "-50db",
          battery: "100%",
          templateNumber: "1",
          state: "正常",
          refreshTime: "2022/3/23 16:36:18",
          lastTime: "2022/3/23 16:36:18",
          operate: "操作",
        },
      ],
      // 隐藏框
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
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
  },
};
</script>

<style>
#table-content{
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

/* @media (min-width: 1200px) and (max-width: 2000px){
  .el-dialog{
    width: 1000px;
    height: 600px;
  }
} */

@media (max-width: 1200px) {
  .el-dialog{
    width: 500px;
    height: 300px;
  }
}
</style>
