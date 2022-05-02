<template>
  <div @click="ttt">
    121212
    <el-form :model="form">
      <el-form-item>
        <el-select  v-model="form.test">
          <el-option  label="选项1" value="选项1" ></el-option>
          <el-option   label="选项2" value="选项2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        test:''
      }
    }
  },
  methods:{
    ttt(){
      console.log("===",this.form.test)
    }
  }
}
</script>

<style>

</style>