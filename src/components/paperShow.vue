<template>
  <div>
    <el-card class="box-card">
        <!-- <iframe src="/test.html" height="430px" width="425px" style="position:absolute;right:5%;top:0px"></iframe> -->
        <div id="e-paper">

        </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    }
}
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
    height: 350px;
    padding-top: 10%;
  }

  #e-paper{
      width: 390px;
      height: 320px;
      background-color: red;
      position: absolute;
      top: 3%;
      right: 5%;
  }
</style>