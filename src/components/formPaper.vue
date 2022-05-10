<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :model="form"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="模板画面">
        <el-select :disabled="true" v-model="form.templateScreen">
          <!-- <el-option label="区域一" value="shanghai"></el-option> -->
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="内容模板">
        <el-select
          v-model="form.templateContent"
          placeholder="请选择活动区域"
          @change="selectChange"
        >
          <el-option label="会议桌签" value="hd."></el-option>
          <!-- <el-option label="会议桌签2" value="会议桌签2"></el-option> -->
          <el-option label="图书馆引导牌red" value="letter.red"></el-option>
          <el-option label="图书馆引导牌black" value="letter.black"></el-option>
          <!-- <el-option label="图书馆引导牌3" value="图书馆引导牌3"></el-option> -->
          <!-- <el-option label="图书馆引导牌4" value="图书馆引导牌4"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="null">
        <el-input v-model="form.deviceName"></el-input>
      </el-form-item>
      <el-form-item label="会议场所" prop="meetAdr" v-if="isShow">
        <el-input
          v-model="form.meetAdr"
          minlength="4"
          maxlength="8"
          show-word-limit
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" v-if="isShow">
        <el-input
          v-model="form.name"
          minlength="2"
          maxlength="4"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="职称或描述" prop="describe" v-if="isShow">
        <el-input
          v-model="form.describe"
          maxlength="21"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="会议名称" prop="meetName" v-if="isShow">
        <el-input v-model="form.meetName"></el-input>
      </el-form-item>
      <el-form-item label="请选择状态" id="1" prop="state" v-if="isShow">
        <!-- <el-input v-model="form.state"></el-input> -->
        <el-select v-model="form.state">
          <el-option label="已开始" value="已开始"></el-option>
          <el-option label="已结束" value="已结束"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文本内容" id="1" prop="text" v-if="!isShow">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="preview">预 览</el-button>
        <el-button type="primary" @click="subForm('formData')" :plain="true"
          >上 传</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    templateScreen: {
      type: String,
      default: "请选择活动区域",
    },
    // 模板id
    formID: {
      type: Number,
      default: 12,
    },
    // 原内容索引
    tableStoreId: {
      type: Number,
      default: 12,
    },
  },
  data() {
    let validatekMeetAdr = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入会议场所"));
      } else if (value.length < 4 || value.length > 8) {
        callback(new Error("会议场所长度为4-8位"));
      } else {
        callback();
      }
    };

    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else if (value.length < 2 || value.length > 4) {
        callback(new Error("姓名长度为2-4位"));
      } else {
        callback();
      }
    };

    let validateDescribe = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入职称或描述"));
      } else {
        callback();
      }
    };

    let validateMeetName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入会议名称"));
      } else {
        callback();
      }

      //   if (value === "") {
      //     callback(new Error("请输入会议名称"));
      //   } else if (value.length < 2 || value.length > 4) {
      //     callback(new Error("会议名称长度为2-4位"));
      //   } else {
      //     callback();
      //   }
    };

    let validateState = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入状态"));
      } else {
        callback();
      }
    };

    return {
      form: {
        templateScreen: "屏幕型号", // 屏幕型号
        templateContent: "", // 内容模板
        meetAdr: "", // 会议场所
        name: "", // 姓名
        describe: "", // 职称或描述
        meetName: "", // 会议名称
        state: "", // 状态
        deviceName: "", //设备名称
        text: "文本内容", // 文本内容
      },
      rules: {
        checkActiveName: [
          // { validator: validateForm, trigger: 'blur' },
          { max: 8, message: "不能超过8个字符", trigger: "blur" },
        ],
        meetAdr: [{ validator: validatekMeetAdr, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        describe: [{ validator: validateDescribe, trigger: "blur" }],
        meetName: [{ validator: validateMeetName, trigger: "blur" }],
        state: [{ validator: validateState, trigger: "blur" }],
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
      previewLock: 0,
      cacheData: {},
      select_loading: null,
      preview_loading: null,
      deviceName: "", // 起始设备名字
    };
  },
  computed: {
    tableStore() {
      return this.$store.state.tableData[this.tableStoreId];
    },
  },
  methods: {
    // 预览
    preview() {
      let e_paperDom = document.getElementById("e-paper");
      if (this.form.templateContent.split(".")[0] == "hd") {
        if (21 < this.form.describe.length) {
          this.form.describe = this.form.describe.substring(0, 19) + "...";
        }
        if (8 < this.form.meetName.length) {
          this.form.meetName = this.form.meetName.substring(0, 7) + "...";
        }
        let date = new Date();
        let Month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let Hour =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let Minute =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let HourNext = Number(Hour) + 2 > 24 ? 24 : Hour + 2;
        let dataJson = JSON.stringify({
          name: this.form.name,
          meetAdr: this.form.meetAdr,
          describe: this.form.describe,
          meetName: this.form.meetName,
          state: this.form.state,
          startTime: date.getFullYear() + "-" + Month + "-" + Day,
          endTime: Hour + ":" + Minute + "-" + HourNext + ":" + Minute,
        });
        let data = encodeURIComponent(dataJson);
        let tempType =
          this.form.templateContent.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          this.form.templateContent.split(".")[1];
        if (
          e_paperDom.getAttribute("src").split("&")[3].split("=")[1] == data
        ) {
          return;
        }
        if (this.preview_loading != null) {
          console.log("loadingValue", this.preview_loading);
          this.preview_loading.close();
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          // spinner: 'el-icon-loading',
          target: ".box-card",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.preview_loading = loading;
        this.$emit("formMes", {
          tempType: tempType,
          tempData: data,
          random: Math.random(),
        });
        e_paperDom.onload = () => {
          loading.close();
        };
        return;
      } else {
        let dataJson = JSON.stringify({
          text: this.form.text,
        });
        let tempType =
          this.form.templateContent.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          this.form.templateContent.split(".")[1];
        let data = encodeURIComponent(dataJson);
        if (
          e_paperDom.getAttribute("src").split("&")[3].split("=")[1] == data
        ) {
          return;
        }
        this.$emit("formMes", {
          tempType: tempType,
          tempData: data,
        });
        if (this.preview_loading != null) {
          console.log("loadingValue", this.preview_loading);
          this.preview_loading.close();
        }
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          // spinner: 'el-icon-loading',
          target: ".box-card",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.preview_loading = loading;
        console.log("testLoading", loading);
        e_paperDom.onload = function () {
          loading.close();
        };
        return;
      }
    },

    // 上传图片
    subForm(value) {
      console.log(this.form);

      let check = false;
      this.$refs[value].validate((valid) => {
        if (!valid) {
          // this.$emit('formMes',this.form)
          console.log("error submit!!");
          return false;
        } else {
          check = true;
          console.log("success submit!!");
          return true;
        }
      });
      if (!check) {
        this.$message("请填写内容");
        return;
      }

      if (this.form.templateContent.split(".")[0] == "hd") {
        let date = new Date();
        let Month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let Hour =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let Minute =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let HourNext = Hour + 2 > 24 ? 24 : Hour + 2;
        let dataJson = JSON.stringify({
          name: this.form.name,
          meetAdr: this.form.meetAdr,
          describe: this.form.describe,
          meetName: this.form.meetName,
          state: this.form.state,
          startTime: date.getFullYear() + "-" + Month + "-" + Day,
          endTime: Hour + ":" + Minute + "-" + HourNext + ":" + Minute,
        });
        let temp_data = encodeURIComponent(dataJson);
        let temp_name =
          this.form.templateContent.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          this.form.templateContent.split(".")[1];
        this.$ajax({
          method: "post",
          url: `/api/epd/device/${this.formID}/setTemp`,
          data: {
            temp_name: temp_name,
            temp_data: temp_data,
          },
          dataType: "json",
        }).then((res) => {
          if (res.code == 200) {
            // // vux 设置预备要上传的内容
            this.$store.commit("setFormData", {
              index: this.$store.state.tableData[this.tableStoreId].ID,
              data: {
                temp_data: temp_data,
                temp_name: temp_name,
              },
            });
            this.$message("上传成功");
          } else {
            this.$message("上传失败");
            return;
          }
        });
        console.log("rename");
        this.$ajax({
          method: "post",
          url: `/api/epd/device/${this.formID}/rename`,
          data: {
            name: this.form.deviceName,
          },
          dataType: "json",
        }).then((res) => {
          if (res.code == 200) {
            this.$message("修改成功");
          } else {
            this.$message("修改失败");
            return;
          }
        });

        return;
      } else {
        let dataJson = JSON.stringify({
          text: this.form.text,
        });
        let temp_name =
          this.form.templateContent.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          this.form.templateContent.split(".")[1];
        let temp_data = encodeURIComponent(dataJson);
        this.$ajax({
          method: "post",
          url: `/api/epd/device/${this.formID}/setTemp`,
          data: {
            temp_name: temp_name,
            temp_data: temp_data,
          },
          dataType: "json",
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$store.commit("setFormData", {
              index: this.$store.state.tableData[this.tableStoreId].ID,
              data: {
                temp_data: temp_data,
                temp_name: temp_name,
              },
            });
            this.$message("上传成功");
          } else {
            this.$message("上传失败");
            return;
          }
        });
        this.$ajax({
          method: "post",
          url: `/api/epd/device/${this.formID}/rename`,
          data: {
            name: this.form.deviceName,
          },
          dataType: "json",
        }).then((res) => {
          if (res.code == 200) {
            this.$message("修改成功");
          } else {
            this.$message("修改失败");
            return;
          }
        });
      }
    },

    // selectChange
    selectChange(value) {
      let e_paperDom = document.getElementById("e-paper");
      if (this.select_loading != null) {
        this.select_loading.close();
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        target: ".box-card",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.select_loading = loading;
      if (value.split(".")[0] == "hd") {
        this.isShow = true;
        // let date = new Date();
        let dataJson = JSON.stringify({
          name: this.initData.name,
          meetAdr: this.initData.meetAdr,
          describe: this.initData.describe,
          meetName: this.initData.meetName,
          state: this.initData.state,
          // startTime:
          //   date.getFullYear() +
          //   "-" +
          //   (date.getMonth() + 1) +
          //   "-" +
          //   date.getDate(),
          // endTime:
          //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
          startTime: "2002-01-01",
          endTime: "10:20-12:00",
        });
        value =
          value.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          value.split(".")[1];
        let temp_data = encodeURIComponent(dataJson);
        this.$emit("formMes", {
          tempType: value,
          tempData: temp_data,
        });
        e_paperDom.onload = () => {
          loading.close();
        };
        return;
      }
      if (value.split(".")[0] == "letter") {
        this.isShow = false;
        let dataJson = JSON.stringify({
          text: this.initData.text,
        });
        let data = encodeURIComponent(dataJson);
        value =
          value.split(".")[0] +
          this.$store.state.tableData[this.tableStoreId].epd_width +
          "" +
          this.$store.state.tableData[this.tableStoreId].epd_height +
          "" +
          value.split(".")[1];
        this.$emit("formMes", {
          tempType: value,
          tempData: data,
        });
        e_paperDom.onload = () => {
          loading.close();
        };
        return;
      }
    },
  },
  mounted() {
    let formData_index = this.$store.state.tableData[this.tableStoreId].ID;
    this.form.deviceName = this.$store.state.tableData[this.tableStoreId].name;
    this.deviceName = this.form.deviceName;
    if (this.$store.state.formData[formData_index] != null) {
      let temp_data = decodeURIComponent(
        this.$store.state.formData[formData_index].temp_data
      );
      temp_data = JSON.parse(temp_data);
      if (
        this.$store.state.formData[formData_index].temp_name.search("hd") != -1
      ) {
        this.form.templateContent = "hd.";
        this.form.meetAdr = temp_data.meetAdr;
        this.form.describe = temp_data.describe;
        this.form.meetName = temp_data.meetName;
        this.form.state = temp_data.state;
        this.form.name = temp_data.name;
        this.isShow = true;
      }
      if (
        this.$store.state.formData[formData_index].temp_name.search("black") !=
        -1
      ) {
        this.form.templateContent = "letter.black";
        this.form.text = temp_data.text;
        this.isShow = false;
      }
      if (
        this.$store.state.formData[formData_index].temp_name.search("red") != -1
      ) {
        this.form.templateContent = "letter.red";
        this.form.text = temp_data.text;
        this.isShow = false;
      }
    } else {
      let temp_data = this.$store.state.tableData[this.tableStoreId].temp_data;
      temp_data = decodeURIComponent(temp_data);
      temp_data = JSON.parse(temp_data);
      if (
        this.$store.state.tableData[this.tableStoreId].temp_name.search("hd") !=
        -1
      ) {
        this.form.templateContent = "hd.";
        this.form.meetAdr = temp_data.meetAdr;
        this.form.describe = temp_data.describe;
        this.form.meetName = temp_data.meetName;
        this.form.state = temp_data.state;
        this.form.name = temp_data.name;
        console.log("this.form", this.form);
        this.isShow = true;
      }
      if (
        this.$store.state.tableData[this.tableStoreId].temp_name.search(
          "black"
        ) != -1
      ) {
        this.form.templateContent = "letter.black";
        this.form.text = temp_data.text;
        this.isShow = false;
      }
      if (
        this.$store.state.tableData[this.tableStoreId].temp_name.search(
          "red"
        ) != -1
      ) {
        this.form.templateContent = "letter.red";
        this.form.text = temp_data.text;
        this.isShow = false;
      }
    }
  },
};
</script>

<style>
.el-form-item__error {
  margin-left: 80px;
}
</style>