<template>
  <div>
    <el-card class="box-card">
      <!-- src="http://sm.singzer.cn/epd/img.bmp" -->
          <img id="e-paper" v-lazy="imgURL" />
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
           imgURL:"http://sm.singzer.cn/epd/img.bmp"
        }
    },
    mounted(){

    },
    beforeCreate(){
      
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
    height: 400px;
    /* padding-top: 10%; */
    text-align: center;
    position: relative;
    background-color: grey;
  }

  #e-paper{
      width: 390px;
      height: 320px;
      background-color: grey;
      position: absolute;
      top: 50%;
      right: -37%;
      transform: translate(-50%,-50%);
  }

  #ttt{
    width: 100%;
    height: 100%;
  }
</style>