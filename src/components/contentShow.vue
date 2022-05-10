<template>
  <div>
    <el-button type="primary" @click="currentContent">当前内容</el-button>
    <el-button type="success" @click="nextContent">下次内容</el-button>
    <el-card id="contentCard">
      <!-- <img
        id="imgContent"
        :src="contentParams.contentURL"
        :height="height"
        :width="width"
        style="background-color: red"
        ref="imgContent"
      /> -->
      <!-- <div id="img-panel">12</div> -->
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    contentParams: {
      type: Object,
      default: function () {
        return { index: 0, contentURL: "12" };
      },
    },
  },
  data() {
    return {
      form: {
        test: "",
      },
      width: "",
      height: "",
    };
  },
  methods: {
    currentContent() {
      let img_panel = document.getElementById("contentCard").lastChild;
      if (img_panel.lastChild != null) {
        img_panel.removeChild(img_panel.lastChild);
      }
      img_panel.appendChild(
        this.$store.state.imgURL.get(String(this.contentParams.index))
          .current_img
      );
    },
    nextContent() {
      let img_panel = document.getElementById("contentCard").lastChild;
      if (img_panel.lastChild != null) {
        img_panel.removeChild(img_panel.lastChild);
      }
      img_panel.appendChild(
        this.$store.state.imgURL.get(String(this.contentParams.index)).next_img
      );
    },
  },
  mounted() {
    this.width =
      this.$store.state.tableData[this.contentParams.index].epd_width;
    this.height =
      this.$store.state.tableData[this.contentParams.index].epd_height;

    // const loading = this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    //   target: "#contentCard",
    // });
    console.log(
      "contentShow mounted",
      this.$store.state.imgURL.get(String(this.contentParams.index))
    );
    let img_panel = document.getElementById("contentCard").lastChild;

    img_panel.appendChild(
      this.$store.state.imgURL.get(String(this.contentParams.index)).current_img
    );
    // this.$refs["imgContent"].onload = () => {
    //   loading.close();
    // };
  },
};
</script>

<style>
#contentCard {
  position: relative;
  width: 100%;
  height: 450px;
  background-color: gray;
}
#imgContent {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>