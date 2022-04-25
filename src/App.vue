<template>
  <div id="app">
    <el-menu class="el-menu-demo" mode="horizontal"  background-color="#409EEF" >
      <div id="header">
        12131313
        <span id="header-title">墨水瓶群控管理演示</span>
      </div>
    </el-menu>
    <div class="interval"></div>
    <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="model"
        label="屏幕型号">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="设备IP">
      </el-table-column>
      <el-table-column
        prop="mac"
        label="设备MAC">
      </el-table-column>
      <el-table-column
        prop="ssid"
        label="SSID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="signal"
        label="信号强度"
        width="100">
      </el-table-column>
      <el-table-column
        prop="battery"
        label="电池电量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="templateNumber"
        label="模板编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        label="内容状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="refreshTime"
        label="刷新时间">
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="最后上线时间">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="350">
        <template slot-scope="scope">
          <el-button type="text" :id="scope.index" @click="test(scope.$index)">编辑设备</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text">编辑设备</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="text">编辑设备</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    

    <!-- <el-dialog title="编辑设备" :visible.sync="dialogFormVisible" >
      <el-row>
        <el-col :span="12">
            <div>
              <el-form :model="form" :label-position="labelPosition">
              <el-form-item label="屏幕型号">
                <el-select placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="内容模板">
                <el-select placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动名称">
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label="会议场所">
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label="职称或描述">
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label="会议名称">
                  <el-input></el-input>
              </el-form-item>
              <el-form-item label="状态">
                  <el-input></el-input>
              </el-form-item>
            </el-form>
            </div>
        </el-col>
        <el-col :span="12">
          <div>

          </div>
        </el-col>
      </el-row>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
    <el-row style="position:fixed;bottom:0px;right:4%">
      <el-button type="primary" id="btn">批量下发</el-button>
    </el-row>
    <table-content></table-content>
    

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
    document.getElementsByClassName('el-table__body-wrapper')[0].style.overflowX = 'clip';
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
