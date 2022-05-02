<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#409EEF">
      <div id="header">
        <span id="header-title">墨水屏群控管理演示</span>
      </div>
    </el-menu>
    <div class="interval"></div>
    <table-content></table-content>
    <el-row>
      <el-button type="primary" id="btn" @click="subs">批量下发</el-button>
    </el-row>
  </div>
</template>

<script>
import TableContent from "./components/tableContent.vue";

export default {
  name: "App",
  data() {
    return {
      tableData: [],
      // 隐藏框
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      labelPosition: "right",
    };
    //===========================隐藏框=====================================
  },
  components: {
    "table-content": TableContent,
  },
  methods: {
    test(e) {
      // console.log(e.target.id);
      console.log(e);
      this.dialogFormVisible = true;
    },
    subs() {
      this.$store.state.formData.forEach((element, index) => {
        console.log("element", element);
        console.log("index", index);
        this.$ajax({
          method: "post",
          url: `/api/epd/device/${index}/setTemp`,
          data: {
            temp_data: element[index].temp_data,
            temp_name: element[index].temp_name,
          },
          dataType: "json",
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message("上传成功");
          } else {
            this.$message("上传失败");
            return;
          }
        });
      });
    },
  },
  mounted() {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
}

#header {
  height: 60px;
  padding-left: 2%;
  line-height: 60px;
}

#header-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-left: 20px;
}

.interval {
  height: 30px;
  background-color: #f5f7fa;
}

#bottom {
  position: flex;
  /* bottom: 999; */
  /* z-index: 999; */
  /* top: 20px; */
}

.el-table {
  font-size: 1.2rem;
}

#btn {
  float: right;
  margin-right: 2%;
  margin-top: 1%;
}

.el-form-item {
  margin-right: 0 !important;
  margin-left: 5%;
}
.el-form-item__label {
  position: absolute;
}
.el-form-item__content {
  width: 50%;
  padding-left: 80px;
}
.el-select,
.el-input_inner {
  width: 100%;
}
</style>
