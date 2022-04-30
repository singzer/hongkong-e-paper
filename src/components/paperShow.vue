<template>
  <div>
    <el-card class="box-card">
      <!-- src="http://sm.singzer.cn/epd/img.bmp" -->
          <img id="e-paper" :src="imgURLFormat"  :key="imgKey"/>
    </el-card>
  </div>
</template>

<script>
// import {Base64} from 'js-base64'
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
      imgURL:{
        type:String,
        default:"eyJuYW1lIjoiMTMxMyIsIm1lZXRBZHIiOiIxMzEzIiwiZGVzY3JpYmUiOiIxMzExMzIiLCJtZWV0TmFtZSI6IjEzMjEzIiwic3RhdGUiOiIxMzIxMyIsInN0YXJ0VGltZSI6IjIwMjItNC0zMCIsImVuZFRpbWUiOiIwOjU3OjM4In0="
      },
      imgKey:{
        type:Number,
        default:0
      },
      paperID:{
        type:Number,
        default:0
      },
      
      // formFormData
    },
    data() {
        return {
          //  imgURL:""
        }
    },
    computed:{
        // 图片路径
        imgURLFormat(){
          // console.log(this.ePaperTemplate)
            let width = this.ePaperTemplate.width;
            let height = this.ePaperTemplate.height;
            if(this.imgURL == ""){
              return `http://sm.singzer.cn/epd/img.bmp?width=${width}&height=${height}&data=eyJuYW1lIjoiMTMxMyIsIm1lZXRBZHIiOiIxMzEzIiwiZGVzY3JpYmUiOiIxMzExMzIiLCJtZWV0TmFtZSI6IjEzMjEzIiwic3RhdGUiOiIxMzIxMyIsInN0YXJ0VGltZSI6IjIwMjItNC0zMCIsImVuZFRpbWUiOiIwOjU3OjM4In0=`;
            }
            return `http://sm.singzer.cn/epd/img.bmp?width=${width}&height=${height}&data=${this.imgURL}`;
        }
    },
    mounted(){
      console.log("mounted")
      console.log(this.paperID)
      let width = this.$store.state.tableData[this.paperID].epd_width;
      let height = this.$store.state.tableData[this.paperID].epd_height;
      console.log(height)
      let xy = width / 390;
      height = height / xy;
      
      document.getElementById("e-paper").style.width = 390 + "px";
      document.getElementById("e-paper").style.height = height + "px";
    },
    created(){
       console.log("created")
      // let width = this.$store.state.tableData[this.paperID].epd_width;
      // let height = this.$store.state.tableData[this.paperID].epd_height;
      // let xy = width / 390;
      // height = height / xy;
      // document.getElementById("e-paper").style.width = 390 + "px";
      // document.getElementById("e-paper").style.height = height + "px";
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