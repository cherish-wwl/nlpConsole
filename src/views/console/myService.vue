<template>
  <div>
    <title-tool @querySearch="querySearch"></title-tool>
    <el-row>
        <el-button 
          v-for=" item in applicationList" 
          :key="item.id" 
          class="selfbutton2"
          :class="currentApplicationId== item.id ?'active':''"
          @click="changeApplication(item)">
          <span :title="item.name">{{ item.name | formatString}}</span>
           <br/>
          <span>接入服务({{item.snum}}) </span>
        </el-button>
        <el-button         
          class="selfbutton2"
          @click="jumpApplicationPage">
          <span>+</span>
          <span>创建应用 </span>
           <br/>
          <span class="underline"   @click="jumpApplicationPage">查看更多应用 </span>
        </el-button>
    </el-row>
    <br />
    <br />
    <el-row>
      <span @click="showAllService">我的服务</span>
      >
      <span>{{applicationName}}</span>
      <el-select v-model="currentServiceClassId" @change="changeServiceClass" placeholder="请选择">
        <el-option
          v-for="item in serviceClassData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-input  
        class="inputwidth1" 
        @change="querySearch" v-model="keyword" 
        suffix-icon="el-icon-search" 
        placeholder="输入想要检索的关键字">
      </el-input>
    </el-row>
    <br/>
    <el-row>
      <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
        <el-table-column prop="seviceName" label="服务名称" min-width="180"></el-table-column>
        <el-table-column prop="classType" label="所属类型" min-width="180"></el-table-column>
        <el-table-column prop="times" label="调用次数"></el-table-column>
        <el-table-column prop="failTimes" label="调用失败"></el-table-column>
        <el-table-column prop="perOfFail" label="失败率"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="seeDetails(scope.row)">查看详情</el-button>
            <el-button size="mini" type="text" @click="seeDocument(scope.row)">接口文档</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br />
    <el-row class="text_center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
import { titleTool } from "@/views/console/components/index"
import { getApplicationListbyNum, getRootServiceClass, getServicesListByAId} from "@/api/myService"
export default {
  components:{
    titleTool
  },
  filters:{
    formatString(val){
      if(val.length > 10){
        return val.substring(0,8)+"..."
      }else{
        return val
      }
    }
  },
  data(){
    return {
      currentPage:1,
      pageSize:10,
      totalNum:8,
      tableHeight:"250",
      currentApplicationId:'',
      applicationName:'全部',
      currentServiceClassId:'',
      keyword:'',
      applicationList:[],
      serviceClassData:[],
      tableData:[]
    }
  },
  methods:{
    // 查询
    querySearch(keyword){
      console.log("触发查询："+keyword)
      this.currentPage = 1
      this.loadingTableData()
    },
    // 点击应用
    changeApplication(item){
      console.log("更改应用："+item.name)
      this.currentApplicationId = item.id
      this.applicationName = item.name
      this.currentPage = 1
      this.loadingTableData()
    },
    // 改变一级服务分类
    changeServiceClass(val){
      this.currentPage = 1
      this.loadingTableData()
    },
    // 展示所有服务
    showAllService(){
      this.currentApplicationId = ""
      this.applicationName = "全部"
      this.currentServiceClassId = ""
      this.keyword = ''
      this.currentPage = 1
      this.loadingTableData()
    },
    // 跳转到应用页面
    jumpApplicationPage(){
      this.$router.push({path:"/myApplicantion"})
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.loadingTableData()
    },
    handleSizeChange(val){
      this.pageSize = val
      this.currentPage = 1
      this.loadingTableData()
    },
    loadingTableData(){
      // 加载表格数据
      console.log("加载表格数据")
      let params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        aId: this.currentApplicationId,
        sCId: this.currentServiceClassId,
        keyword: this.keyword
      }
      getServicesListByAId(params).then(res => {
        this.tableData = res.data
        this.totalNum = res.total
      })
    },
    seeDetails(row){
      this.$router.push({name:'consoleServiceDetail',query:{cId:row.classId,sId:row.id}})
    },
    seeDocument(row){
      this.$router.push({name:'consoleTechDocument',query:{id:row.seviceName}})
    }

  },
  mounted(){
    // console.log(document.getElementById("app-main").offsetHeight)
    this.tableHeight = document.getElementById("app-main").offsetHeight - 100

    // start===========可删===============静态数据================
    this.serviceClassData =[
      {
        id:'001',
        name:"基础服务"
      },{
        id:'002',
        name:'应用服务'
      }
    ]
    this.tableData =  [
      {
        seviceName: '最大切割',
        classType: '词性标语',
        times: '34',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"001002",
        id:"001002003"
      }, {
        seviceName: 'CRF新词发现',
        classType: '分词',
        times: '79',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"001003",
        id:"001002001"
      }, {
        seviceName: 'CRF',
        classType: '实体识别',
        times: '14',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"001006",
        id:"001002007"
      }, {
        seviceName: '默认CRF模型',
        classType: '实体识别',
        times: '34',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"041002",
        id:"001302003"
      },
      {
        seviceName: '最大切割',
        classType: '词性标语',
        times: '34',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"0011002",
        id:"0010020203"
      }, {
        seviceName: 'CRF新词发现',
        classType: '分词',
        times: '79',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"0014002",
        id:"0010020403"
      }, {
        seviceName: 'CRF',
        classType: '实体识别',
        times: '14',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"0010w02",
        id:"001002wq003"
      }, {
        seviceName: '默认CRF模型',
        classType: '实体识别',
        times: '34',
        failTimes:'0',
        perOfFail:'0.00%',
        classId:"0010024",
        id:"0010020034"
      }
    ]
    this.applicationList = [
      {
        id:'001',
        name:"基础服务应用12312313",
        snum:12
      },{
        id:'002',
        name:'应用服务应用1231231231312',
        snum:123
      }
    ]
    // end==========================静态数据================

    // 加载应用列表
    getApplicationListbyNum({snum:5}).then(res => {
      console.log(res)
      
    })
    // 加载一级分类列表
    getRootServiceClass().then(res =>{
      console.log(res)
    })
    // 加载所有服务
    this.loadingTableData()
  }
}
</script>
