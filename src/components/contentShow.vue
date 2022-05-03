<template>
  <div>
    <el-card id="contentCard">
      <img
        id="imgContent"
        :src="contentParams.contentURL"
        :height="height"
        :width="width"
        style="background-color: red"
        ref="imgContent"
      />
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
  methods: {},
  mounted() {
    this.width =
      this.$store.state.tableData[this.contentParams.index].epd_width;
    this.height =
      this.$store.state.tableData[this.contentParams.index].epd_height;

    const loading = this.$loading({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
      target: "#contentCard",
    });
    this.$refs["imgContent"].onload = () => {
      loading.close();
    };
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