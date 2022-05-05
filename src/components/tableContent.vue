<template>
  <div class="table-content">
    <el-table :data="tableData" style="width: 100%; font-size: 15px">
      <el-table-column prop="number" label="编号" width="50"> </el-table-column>
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column prop="model" label="屏幕型号"> </el-table-column>
      <el-table-column prop="ip" label="设备IP"> </el-table-column>
      <el-table-column prop="mac" label="设备MAC"> </el-table-column>
      <el-table-column prop="ssid" label="SSID"> </el-table-column>
      <el-table-column prop="rssi" label="信号强度"> </el-table-column>
      <el-table-column prop="battery_percentage" label="电池电量">
      </el-table-column>
      <el-table-column prop="temp_name_format" label="模板名字">
        <!-- templateNumber -->
      </el-table-column>
      <el-table-column prop="state" label="内容状态"> </el-table-column>
      <el-table-column
        prop="last_refresh_at"
        label="刷新时间"
      ></el-table-column>
      <el-table-column prop="UpdatedAt" label="最后上线时间"></el-table-column>
      <el-table-column prop="operate" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            :id="scope.index"
            @click="openFormScreen(scope.$index)"
            >编辑设备</el-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="subContent(scope.$index)"
            >下发内容</el-button
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="openContentScreen(scope.$index)"
            >查看内容</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑设备"
      :visible.sync="dialogFormVisible"
      id="formcss"
      v-if="dialogFormVisible"
    >
      <el-row>
        <el-col :span="12">
          <form-paper
            :templateScreen="templateScreen"
            :formID="formID"
            @formMes="imgURLMes"
            :tableStoreId="tableStoreId"
          ></form-paper>
        </el-col>
        <el-col :span="12">
          <paper-show
            v-loading.lock="fullscreenLoading"
            :ePaperTemplate="ePaperTemplate"
            :imgURL="imgURL"
            :paperID="paperID"
            id="test"
          ></paper-show>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      title="查看内容"
      :visible.sync="dialogContentVisible"
      id="content"
      v-if="dialogContentVisible"
    >
      <el-row>
        <el-col>
          <content-show :contentParams="contentParams"></content-show>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    "form-paper": () => import("./formPaper.vue"),
    "paper-show": () => import("./paperShow.vue"),
    "content-show": () => import("./contentShow.vue"),
  },
  data() {
    return {
      tableData: [],
      formID: 12,
      tableStoreId: 12,
      fullscreenLoading: false,
      // 隐藏框
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogContentVisible: false,
      templateScreen: "232323",
      ePaperTemplate: {
        width: "",
        height: "",
        temp_data: "",
        // {
        //   title: null,
        //   user: "用户名",
        //   test: "测试",
        //   meetRoom: "会议室",
        //   meetYMD: "2000-01-01",
        //   meetStart: "14:30",
        //   meetEnd: "15:30",
        //   meetState: "会议中",
        // },
        temp_name: "名字",
      },
      formPaperData: "",
      imgURL: {},
      paperID: 0,
      contentParams: {},
      // paperShowKey:0,
    };
  },
  methods: {
    test() {
      // this.templateScreen = this.tableData[e].model;
      // this.dialogFormVisible = true;
    },
    imgURLMes(e) {
      this.imgURL = e;
    },

    // 展示编辑页面
    openFormScreen(e) {
      console.log("e", this.tableData.length);
      this.ePaperTemplate.width = this.tableData[e].width;
      this.ePaperTemplate.height = this.tableData[e].height;
      this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
      this.ePaperTemplate.temp_data = this.tableData[e].temp_data;
      this.paperShowKey = Math.random();

      console.log(this.tableStoreId);
      // switch (this.ePaperTemplate.width) {
      //   case 640:
      //     this.ePaperTemplate.temp_data.title = "测试会议";
      //     this.ePaperTemplate.temp_data.user = "用户名";
      //     this.ePaperTemplate.temp_data.test = "测试1111";
      //     this.ePaperTemplate.temp_data.meetRoom = "会议室";
      //     this.ePaperTemplate.temp_data.meetYMD = "2000-01-01";
      //     this.ePaperTemplate.temp_data.meetStart = "14:30";
      //     this.ePaperTemplate.temp_data.meetEnd = "15:30";
      //     this.ePaperTemplate.temp_data.meetState = "会议中";
      //     this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
      //     break;
      //   case 400:
      //     this.ePaperTemplate.temp_data.title = "测试会议";
      //     this.ePaperTemplate.temp_data.user = "用户名";
      //     this.ePaperTemplate.temp_data.test = "测试";
      //     this.ePaperTemplate.temp_data.meetRoom = "会议室2222";
      //     this.ePaperTemplate.temp_data.meetYMD = "2000-01-01";
      //     this.ePaperTemplate.temp_data.meetStart = "14:30";
      //     this.ePaperTemplate.temp_data.meetEnd = "15:30";
      //     this.ePaperTemplate.temp_data.meetState = "会议中";
      //     this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
      //     break;
      // }
      this.templateScreen = this.tableData[e].model;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
      this.formID = this.tableData[e].ID;
      this.fullscreenLoading = true;
      this.dialogFormVisible = true;
      this.tableStoreId = e;
      this.imgURL = {};
      this.paperID = e;
    },

    // 展示内容页面
    openContentScreen(e) {
      this.dialogContentVisible = true;
      // let id = this.$store.state.tableData[e].ID;
      let temp_name = this.$store.state.tableData[e].temp_name;
      let temp_data = this.$store.state.tableData[e].temp_data;
      let width = this.$store.state.tableData[e].epd_width;
      let height = this.$store.state.tableData[e].epd_height;
      this.contentParams = {
        index: e,
        contentURL: `/api/epd/img.bmp?width=${width}&height=${height}&type=${temp_name}&data=${temp_data}`,
      };
    },

    // 下发内容
    subContent(e) {
      let id = String(this.$store.state.tableData[e].ID);
      let formDatas = this.$store.state.formData[id];
      let url = `/api/epd/device/${id}/setTemp`;
      if (formDatas != null) {
        console.log("zks");
        this.$ajax({
          method: "post",
          url: url,
          data: {
            temp_name: formDatas.temp_name,
            temp_data: formDatas.temp_data,
          },
          dataType: "json",
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "下发成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "下发失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        id = String(this.$store.state.tableData[e].ID);
        url = `/api/epd/device/${id}/setTemp`;
        console.log("url", url);
        let temp_data =
          this.$store.state.tableData[e].next_temp_data == ""
            ? this.$store.state.tableData[e].temp_data
            : this.$store.state.tableData[e].next_temp_data;
        let temp_name =
          this.$store.state.tableData[e].next_temp_name == ""
            ? this.$store.state.tableData[e].temp_name
            : this.$store.state.tableData[e].next_temp_name;
        this.$ajax({
          url: url,
          method: "post",
          data: {
            temp_name: temp_name,
            temp_data: temp_data,
          },
          dataType: "json",
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "下发成功",
              type: "success",
            });
            return;
          }
          this.$message({
            url: url,
            message: "下发失败",
            type: "error",
          });
        });
      }
    },
  },
  computed: {},
  mounted() {
    this.$ajax.get("/api/epd/devices").then((res) => {
      // console.log(res.data)
      this.$store.commit("setTableData", res.data);
      console.log(this.$store.state.tableData);
      for (let i = 0; i < res.data.length; i++) {
        let tableData = {
          model: "",
          ip: "",
          mac: "",
          ssid: "",
          signal: "",
          battery_percentage: "",
          state: "",
          last_refresh_at: "",
          UpdatedAt: "",
          operate: "",
          ID: null,
          width: "",
          height: "",
          temp_name: "",
          number: null,
          name: "",
          temp_name_format: "",
        };
        tableData.ip = res.data[i].ip;
        tableData.mac = res.data[i].mac;
        tableData.rssi =
          res.data[i].rssi.length > 0 ? res.data[i].rssi + "db" : "";
        tableData.battery_percentage = res.data[i].battery_percentage + "%";
        tableData.last_refresh_at = new Date(
          res.data[i].last_refresh_at
        ).toLocaleString();
        tableData.UpdatedAt = new Date(res.data[i].UpdatedAt).toLocaleString();
        tableData.ssid = res.data[i].ssid;
        tableData.ID = res.data[i].ID;
        tableData.width = res.data[i].epd_width;
        tableData.height = res.data[i].epd_height;
        tableData.temp_name = res.data[i].temp_name;
        tableData.temp_data = res.data[i].temp_data;
        tableData.model =
          res.data[i].epd_ver.length > 0
            ? res.data[i].epd_ver +
              "-" +
              res.data[i].epd_width +
              "*" +
              res.data[i].epd_height
            : res.data[i].epd_width + "*" + res.data[i].epd_height;
        tableData.number = i + 1;
        tableData.name = res.data[i].name;
        if (tableData.temp_name.search("hd") != -1) {
          tableData.temp_name_format = "会议桌签";
        }
        if (tableData.temp_name.search("black") != -1) {
          tableData.temp_name_format = "图书馆引导牌黑底";
        }
        if (tableData.temp_name.search("red") != -1) {
          tableData.temp_name_format = "图书馆引导牌红底";
        }
        if (res.data[i].next_temp_data != "") {
          tableData.state = "等待唤醒";
        } else {
          tableData.state = "已刷新";
        }
        this.tableData.push(tableData);
        // console.log(tableData)
      }
    });
    document.getElementsByClassName(
      "el-table__body-wrapper"
    )[0].style.overflowX = "clip";
    setInterval(() => {
      this.$ajax.get("/api/epd/devices").then((res) => {
        this.$store.commit("setTableData", res.data);
        res.data.forEach((item, index) => {
          if (this.tableData[index].temp_data != item.temp_data) {
            this.tableData[index].temp_data = item.temp_data;
          }
          if (this.tableData[index].temp_name != item.temp_name) {
            this.tableData[index].temp_name = item.temp_name;
            if (item.temp_name.search("hd") != -1) {
              this.tableData.temp_name_format = "会议桌签";
            }
            if (item.temp_name.search("black") != -1) {
              this.tableData.temp_name_format = "图书馆引导牌黑底";
            }
            if (item.temp_name.search("red") != -1) {
              this.tableData.temp_name_format = "图书馆引导牌红底";
            }
          }
          if (this.tableData[index].next_temp_data != item.next_temp_data) {
            this.tableData[index].next_temp_data = item.next_temp_data;
            if (item.next_temp_data != "") {
              this.tableData[index].state = "等待唤醒";
            } else {
              this.tableData[index].state = "已刷新";
            }
          }
        });
      });
    }, 5000);
  },
};
</script>

<style>
.table-content {
  margin-left: 3%;
  margin-right: 3%;
  font-weight: lighter;
  color: black;
}

.el-table__header-wrapper .el-table__cell {
  background-color: red;
}

.el-table__body-wrapper .el-table__cell {
  color: #292421;
}

span {
  font-size: 15px;
}

#formcss .el-dialog {
  width: 1000px;
  height: 600px;
}

#content .el-dialog {
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
