<template>
  <div class="table-content">
    <el-table :data="tableData" style="width: 100%; font-size: 15px">
      <el-table-column prop="number" label="编号" width="50"> </el-table-column>
      <el-table-column prop="name" label="名字">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击更改设备名字"
            placement="right"
          >
            <span class="text" @click="test(scope.$index)">{{
              scope.row.name
            }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
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
    test(e) {
      // this.templateScreen = this.tableData[e].model;
      // this.dialogFormVisible = true;\
      this.$prompt("请输入模板名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.$ajax({
          url: `/api/epd/device/${e + 1}/rename`,
          method: "POST",
          data: {
            name: value,
          },
          success: (res) => {
            if (res.code == 200) {
              this.$message.success("修改成功");
            } else {
              this.$message.error("修改失败");
            }
          },
        });
      });
    },
    imgURLMes(e) {
      this.imgURL = e;
    },

    // 展示编辑页面
    openFormScreen(e) {
      console.log("e", this.tableData.length);
      this.ePaperTemplate.width = this.tableData[e].width;
      this.ePaperTemplate.height = this.tableData[e].height;
      let formData_index = this.tableData[e].ID;
      if (this.$store.state.formData[formData_index] != null) {
        this.ePaperTemplate.temp_data =
          this.$store.state.formData[formData_index].temp_data;
        this.ePaperTemplate.temp_name =
          this.$store.state.formData[formData_index].temp_name;
      } else {
        this.ePaperTemplate.temp_name = this.tableData[e].temp_name;
        this.ePaperTemplate.temp_data = this.tableData[e].temp_data;
      }
      this.paperShowKey = Math.random();

      console.log("numn", this.tableStoreId);
      this.templateScreen = this.tableData[e].model;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2);
      console.log("end");
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
    let null_640384img = new Image();
    let null_400300img = new Image();
    null_640384img.src = "api/epd/img.bmp?width=640&height=384&type=&data=";
    null_400300img.src = "api/epd/img.bmp?width=400&height=300&type=&data=";
    null_640384img.width = "640";
    null_640384img.height = "384";
    null_640384img.style.backgroundColor = "red";
    null_640384img.id = "imgContent";

    null_400300img.width = "400";
    null_400300img.height = "300";
    null_400300img.style.backgroundColor = "red";
    null_400300img.id = "imgContent";
    this.$ajax.get("/api/epd/devices").then((res) => {
      // console.log(res.data)
      this.$store.commit("setTableData", res.data);
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
        // 预缓存数据
        let imgURL = `api/epd/img.bmp?width=${tableData.width}&height=${tableData.height}&type=${tableData.temp_name}&data=${tableData.temp_data}`;
        let current_img = new Image();
        let next_img = new Image();
        current_img.src = imgURL;
        current_img.width = tableData.width;
        current_img.height = tableData.height;
        current_img.style.backgroundColor = "red";
        current_img.id = "imgContent";
        if (res.data[i].next_temp_data != "") {
          let next_temp_name = res.data[i].next_temp_name;
          let next_temp_data = res.data[i].next_temp_data;
          next_img.src = `api/epd/img.bmp?width=${tableData.width}&height=${tableData.height}&type=${next_temp_name}&data=${next_temp_data}`;
          next_img.width = tableData.width;
          next_img.height = tableData.height;
          next_img.style.backgroundColor = "red";
          next_img.id = "imgContent";
        } else {
          switch (res.data[i].epd_width) {
            case 640:
              next_img = null_640384img;
              break;
            case 400:
              next_img = null_400300img;
              break;
          }
        }
        this.$store.commit("setImg", {
          key: String(i),
          value: {
            current_img: current_img,
            next_img: next_img,
          },
        });
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
            let img = new Image();
            img.src = `/api/epd/img.bmp?width=${item.epd_width}&height=${item.epd_height}&type=${item.temp_name}&data=${item.temp_data}`;
            img.width = item.epd_width;
            img.height = item.epd_height;
            img.style.backgroundColor = "red";
            img.id = "imgContent";
            this.$store.state.imgURL.get(String(index)).current_img = img;
          }
          if (item.next_temp_data != "") {
            let next_img = new Image();
            next_img.src = `/api/epd/img.bmp?width=${item.epd_width}&height=${item.epd_height}&type=${item.next_temp_name}&data=${item.next_temp_data}`;
            next_img.width = item.epd_width;
            next_img.height = item.epd_height;
            next_img.style.backgroundColor = "red";
            next_img.id = "imgContent";
            this.$store.state.imgURL.get(String(index)).next_img = next_img;
          } else {
            switch (item.epd_width) {
              case 640:
                this.$store.state.imgURL.get(String(index)).next_img =
                  null_640384img;
                break;
              case 400:
                this.$store.state.imgURL.get(String(index)).next_img =
                  null_400300img;
                break;
            }
          }

          if (item.temp_data == "") {
            this.$store.state.imgURL.get(String(index)).temp_data =
              item.epd_width == 640 ? null_640384img : null_400300img;
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
          this.tableData[index].last_refresh_at = new Date(
            item.last_refresh_at
          ).toLocaleString();
          this.tableData[index].UpdatedAt = new Date(
            item.UpdatedAt
          ).toLocaleString();
          this.tableData[index].ssid = item.ssid;
          this.tableData[index].ID = item.ID;
          this.tableData[index].width = item.epd_width;
          this.tableData[index].height = item.epd_height;
          this.tableData[index].temp_name = item.temp_name;
          this.tableData[index].temp_data = item.temp_data;
          this.tableData[index].model =
            item.epd_ver.length > 0
              ? item.epd_ver + "-" + item.epd_width + "*" + item.epd_height
              : item.epd_width + "*" + item.epd_height;
          this.tableData[index].number = index + 1;
          this.tableData[index].name = item.name;
        });
      });
    }, 5000);
  },
  created() {
    // let default_400300img_letter_black = new Image();
    // let default_letter_data = JSON.stringify({
    //   text: "文本内容",
    // });
    // default_letter_data = encodeURIComponent(default_letter_data);
    // default_400300img_letter_black.src =
    //   "/api/epd/img.bmp?width=400&height=300&type=letter400300black&data=" +
    //   default_letter_data;
    // let default_400300img_letter_red = new Image();
    // default_400300img_letter_red.src =
    //   "/api/epd/img.bmp?width=400&height=300&type=letter400300red&data=" +
    //   default_letter_data;
    // let default_640384img_letter_black = new Image();
    // default_640384img_letter_black.src =
    //   "/api/epd/img.bmp?width=640&height=384&type=letter640384black&data=" +
    //   default_letter_data;
    // let default_640384img_letter_red = new Image();
    // default_640384img_letter_red.src =
    //   "/api/epd/img.bmp?width=640&height=384&type=letter640384red&data=" +
    //   default_letter_data;
    // let default_640384img_hd = new Image();
    // let default_hd_data = JSON.stringify({
    //   name: "姓名",
    //   describe: "职称或描述",
    //   meetName: "会议名称",
    //   state: "状态",
    //   meetAdr: "会议场所",
    //   text: "文本内容",
    //   startTime: "2002-01-01",
    //   endTime: "10:20-12:00",
    // });
    // default_640384img_hd.src =
    //   "/api/epd/img.bmp?width=640&height=384&type=hd640384&data=" +
    //   default_hd_data;
    // let default_400300img_hd = new Image();
    // default_400300img_hd.src =
    //   "/api/epd/img.bmp?width=400&height=300&type=hd400300&data=" +
    //   default_hd_data;
    // this.$store.commit("setDefaultImg", {
    //   key: "default_400300img_letter_black",
    //   value: default_400300img_letter_black,
    // });
    // this.$store.commit("setDefaultImg", {
    //   key: "default_400300img_letter_red",
    //   value: default_400300img_letter_red,
    // });
    // this.$store.commit("setDefaultImg", {
    //   key: "default_640384img_letter_black",
    //   value: default_640384img_letter_black,
    // });
    // this.$store.commit("setDefaultImg", {
    //   key: "default_640384img_letter_red",
    //   value: default_640384img_letter_red,
    // });
    // this.$store.commit("setDefaultImg", {
    //   key: "default_640384img_hd",
    //   value: default_640384img_hd,
    // });
    // this.$store.commit("setDefaultImg", {
    //   key: "default_400300img_hd",
    //   value: default_400300img_hd,
    // });
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
