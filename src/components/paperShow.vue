<template>
  <div>
    <el-card class="box-card">
      <!-- src="http://sm.singzer.cn/epd/img.bmp" -->
          <img id="e-paper" v-lazy="imgURLFormat" />
    </el-card>
  </div>
</template>

<script>
import {Base64} from 'js-base64'
export default {
    props:{
      ePaperTemplate:{
            type: Object,
            default:function(){
                return {
                    width:'',
                    height:'',
                    temp_data:{
                          title: null,
                          user: "用户名",
                          test: "测试",
                          meetRoom: "会议室",
                          meetYMD: "2000-01-01",
                          meetStart: "14:30",
                          meetEnd: "15:30",
                          meetState: "会议中",
                    },
                    temp_name:'名字',
            }
          }
        },
      
      // formFormData
      fromFormData:{
        type: String,
      }
    },
    data() {
        return {
           imgURL:""
        }
    },
    computed:{
        // 图片路径
        imgURLFormat(){
          console.log(this.ePaperTemplate)
            let dataJson = JSON.stringify(this.ePaperTemplate.temp_data);
            let data = Base64.encode(dataJson);
            let width = this.ePaperTemplate.width;
            let height = this.ePaperTemplate.height;
            return `http://sm.singzer.cn/epd/img.bmp?width=${width}&${height}&data=${data}`;
        }
    },
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