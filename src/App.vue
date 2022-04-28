<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal"  background-color="#409EEF" >
      <div id="header">
        <span id="header-title">墨水屏群控管理演示</span>
      </div>
    </el-menu>
    <div class="interval"></div>
    <table-content></table-content>
    <el-row>
      <el-button type="primary" id="btn">批量下发</el-button>
    </el-row>

    <!-- <div class="interval" id="bottom"></div> -->
  </div>
</template>

<script>
import TableContent from './components/tableContent.vue'

export default {
  name: 'App',
  data(){
    return {
      tableData: [{
            model: '7.5英寸黑白红',
            ip: '192.168.1.3',
            mac: '00:00:00:00:00:00',
            ssid: 'singzer',
            signal: '-50db',
            battery: '100%',
            templateNumber: '1',
            state: '正常',
            refreshTime: '2022/3/23 16:36:18',
            lastTime: '2022/3/23 16:36:18',
            operate: '操作   编辑    上传'
          }, {
            model: '7.5英寸黑白红',
            ip: '192.168.1.3',
            mac: '00:00:00:00:00:00',
            ssid: 'singzer',
            signal: '-50db',
            battery: '100%',
            templateNumber: '1',
            state: '正常',
            refreshTime: '2022/3/23 16:36:18',
            lastTime: '2022/3/23 16:36:18',
            operate: '操作'
          }, {
            model: '7.5英寸黑白红',
            ip: '192.168.1.3',
            mac: '00:00:00:00:00:00',
            ssid: 'singzer',
            signal: '-50db',
            battery: '100%',
            templateNumber: '1',
            state: '正常',
            refreshTime: '2022/3/23 16:36:18',
            lastTime: '2022/3/23 16:36:18',
            operate: '操作'
          }, {
            model: '7.5英寸黑白红',
            ip: '192.168.1.3',
            mac: '00:00:00:00:00:00',
            ssid: 'singzer',
            signal: '-50db',
            battery: '100%',
            templateNumber: '1',
            state: '正常',
            refreshTime: '2022/3/23 16:36:18',
            lastTime: '2022/3/23 16:36:18',
            operate: '操作'
          }],
          // 隐藏框
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px',
      labelPosition: 'right',
    }
    //===========================隐藏框=====================================
  },
  components: {
    'table-content': TableContent,
  },
  methods: {
    test(e){
      // console.log(e.target.id);
      console.log(e)
      this.dialogFormVisible = true;
    }
  },
  mounted() {
    
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body{
    position: relative;
  }
  
  #header {
    height: 60px;
    padding-left: 2%;
    line-height: 60px;
  }

  #header-title{
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-left: 20px;
  }

  .interval {
    height: 30px;
    background-color: #F5F7FA;
  }

  #bottom {
    position: flex;
    /* bottom: 999; */
    /* z-index: 999; */
    /* top: 20px; */
  }

  .el-table{
    font-size: 1.2rem;
  
  }

  #btn{
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
