<template>
  <el-aside width="200px" >
    <el-menu :default-active="activeIndex">
      <el-menu-item index="consoleService" @click="jumpPage('consoleService')">
        <i class="el-icon-goods"></i>
        <span slot="title">概览</span>
      </el-menu-item>
      <el-menu-item index="consoleMyApplicantion" @click="jumpPage('consoleMyApplicantion')">
        <i class="el-icon-tickets"></i>
        <span slot="title">我的应用</span>
      </el-menu-item>
      <el-menu-item index="consoleMyDataSet" @click="jumpPage('consoleMyDataSet')">
        <i class="el-icon-news"></i>
        <span slot="title">我的数据集</span>
      </el-menu-item>
      <el-menu-item index="consoleMine" @click="jumpPage('consoleMine')">
        <i class="el-icon-setting"></i>
        <span slot="title">帐号信息</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  data(){
    return {
      activeIndex:"consoleService",
      attrRoute:"",
      routes:''
    }
  },
  watch:{
    $route(val){
      this.routes = this.$router.options.routes
    }
  },
  methods:{
    init(){
      if(this.$route.meta.attr){       
        this.activeIndex = this.$route.meta.attr
      }else{   
        this.activeIndex = this.$route.name
      }   
    },
    jumpPage(name){
      this.$router.push({name: name})
    }
  },
  mounted(){
    this.init()
  }
}
</script>
