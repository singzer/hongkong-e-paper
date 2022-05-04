<template>
  <div>
    <el-card class="box-card">
      <img id="e-paper" :src="imgURLFormat" />
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    ePaperTemplate: {
      type: Object,
      default: function () {
        return {
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
        };
      },
    },
    imgURL: {
      type: Object,
      default: function () {
        return {
          // tempType:"hd640384",
          // tempData:"e25hbWUiOiLmtYvor5XkvJrorq4iLCJtZWV0QWRyIjoi5Lya6K6u5Zyw54K5IiwiZGVzY3JpYmUiOiLkvJrorq7mj4/ov7AiLCJtZWV0TmFtZSI6IuWQjeWtlyIsInN0YXRlIjoi5Lya6K6u5LitIiwic3RhcnRUaW1lIjoiMjAyMi01LTEiLCJlbmRUaW1lIjoiMTY6MzY6NTkifQ==",
        };
      },
    },
    imgKey: {
      type: Number,
      default: 1,
    },
    paperID: {
      type: Number,
      default: 0,
    },

    // formFormData
  },
  data() {
    return {
      //  imgURL:""
    };
  },
  computed: {
    // 图片路径
    imgURLFormat() {
      console.log("===", this.imgURL);
      let width = this.ePaperTemplate.width;
      let height = this.ePaperTemplate.height;
      let temp_name = this.ePaperTemplate.temp_name;
      let temp_data = this.ePaperTemplate.temp_data;
      console.log("temp_data", temp_data);
      let id = this.imgURL.random;
      console.log("paper", id);
      if (this.imgURL.tempData == null) {
        // console.log("===init===");
        // let initData = {
        //   meetAdr: "会议场所", // 会议场所
        //   name: "姓名", // 姓名
        //   describe: "职称或描述", // 职称或描述
        //   meetName: "会议名称", // 会议名称
        //   state: "状态", // 状态
        //   startTime: "2001-01-01", // 开始时间
        //   endTime: "18:00-20:00", // 结束时间
        // };
        // let initType;
        // if (width == "400") {
        //   initType = "hd400300";
        // } else {
        //   initType = "hd640384";
        // }
        // initData = encodeURIComponent(JSON.stringify(initData));
        return `/api/epd/img.bmp?width=${width}&height=${height}&type=${temp_name}&data=${temp_data}`;
      }
      console.log("===after===");
      console.log(this.imgURL.tempData);
      return `/api/epd/img.bmp?width=${width}&height=${height}&type=${this.imgURL.tempType}&data=${this.imgURL.tempData}`;
    },
  },
  mounted() {
    console.log("mounted");
    console.log(this.paperID);
    let width = this.$store.state.tableData[this.paperID].epd_width;
    let height = this.$store.state.tableData[this.paperID].epd_height;
    console.log(height);
    let xy = width / 390;
    height = height / xy;

    document.getElementById("e-paper").style.width = 390 + "px";
    document.getElementById("e-paper").style.height = height + "px";
  },
  created() {
    console.log("created");
    // let width = this.$store.state.tableData[this.paperID].epd_width;
    // let height = this.$store.state.tableData[this.paperID].epd_height;
    // let xy = width / 390;
    // height = height / xy;
    // document.getElementById("e-paper").style.width = 390 + "px";
    // document.getElementById("e-paper").style.height = height + "px";
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 450px;
  height: 400px;
  /* padding-top: 10%; */
  text-align: center;
  position: relative;
  background-color: grey;
}

#e-paper {
  width: 390px;
  height: 320px;
  background-color: grey;
  position: absolute;
  top: 50%;
  right: -37%;
  transform: translate(-50%, -50%);
}

#ttt {
  width: 100%;
  height: 100%;
}
</style>