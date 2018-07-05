<template>
  <div>
    <title-tool  @querySearch="querySearch"></title-tool>
    <el-row>
      <el-table :data="tableData" :max-height="tableHeight" border style="width: 100%">
        <el-table-column prop="seviceName" label="数据名称" min-width="180"></el-table-column>
        <el-table-column prop="classType" label="数据类型" min-width="180"></el-table-column>
        <el-table-column prop="times" label="提供者"></el-table-column>
        <el-table-column prop="failTimes" label="数据规模"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">下载</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
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
import { getDataSetList } from "@/api/myDataSet"
export default {
  data () {
    return {
      currentPage:1,
      pageSize:10,
      totalNum:8,
      tableHeight:"250",
      keyword:'',
      tableData: [
        {
          seviceName: '最大切割',
          classType: '词性标语',
          times: '34',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: 'CRF新词发现',
          classType: '分词',
          times: '79',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: 'CRF',
          classType: '实体识别',
          times: '14',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: '默认CRF模型',
          classType: '实体识别',
          times: '34',
          failTimes:'0',
          perOfFail:'0.00%'
        },
        {
          seviceName: '最大切割',
          classType: '词性标语',
          times: '34',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: 'CRF新词发现',
          classType: '分词',
          times: '79',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: 'CRF',
          classType: '实体识别',
          times: '14',
          failTimes:'0',
          perOfFail:'0.00%'
        }, {
          seviceName: '默认CRF模型',
          classType: '实体识别',
          times: '34',
          failTimes:'0',
          perOfFail:'0.00%'
        }]
    }
  },
  components:{
    titleTool
  },
  methods:{
    querySearch(keyword){
      console.log("触发查询："+keyword)
      this.keyword = keyword
      this.currentPage = 1
      this.loadingTableData()
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
        keyword: this.keyword
      }
      getDataSetList(params).then(res => {
        this.tableData = res.data
        this.totalNum = res.total
      })
    }
  },
  mounted() {
    this.tableHeight = document.getElementById("app-main").offsetHeight - 100
    this.loadingTableData()
  }

}
</script>
