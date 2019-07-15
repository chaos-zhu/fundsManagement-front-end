<template>
  <el-card >
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size='small'>
      <el-form-item label="时间区间">
        <el-input v-model="searchForm.date" placeholder="选择时间区间"></el-input>
      </el-form-item>
      <el-form-item label="收支类型">
        <el-select v-model="searchForm.type" placeholder="请选择收支类型">
          <el-option v-for="item in typeArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支方式">
        <el-select v-model="searchForm.mode" placeholder="请选择收支方式">
          <el-option v-for="item in modeArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支原因">
        <el-cascader
          v-model="searchForm.reason"
          :options="reasonArr"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChangeReason">
        </el-cascader>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="searchForm.explain" placeholder="支持模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size='mini' @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="recordList"
      style="width: 100%">
      <el-table-column
        header-align='center'
        align='center'
        label="创建时间"
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收支类型"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
          <!-- <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover> -->
        </template>
      </el-table-column>
      <el-table-column
        label="收支方式"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.mode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="收支原因"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注说明"
        align='center'
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.explain }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="附件"
        align='center'
        width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.file ? '无' : '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <el-pagination
      class="pagination"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
  </el-card>

</template>

<script>
import axios from 'axios'
import { formatTime } from '@/utils/tool.js'
export default {
    name: 'CapitalFlow',
    data () {
      return {
        recordList: [],
        pageNum: 1,
        pageSize: 7,
        totalNum: 0,
        searchForm: {
          date: '',
          type: [],
          mode: [],
          reason: '',
          explain: ''
        },
        typeArr: [],
        modeArr: [],
        reasonArr: [],
      }
    },
    created() {
      let { pageSize } =this
      this.getRecordList({pageSize})
      this.getParams()
    },
    methods: {
      handleSearch () {
        console.log(123)
      },
      getRecordList (option = {}) {
        let url = '/api/funds/record'
        this.$axios.get(url, {params: option})
          .then(({data}) => {
            if(data.code) return this.$message.error('请求失败，请联系管理员')
            data.data.list.forEach(item => {
              item.date = formatTime(Number(item.date))
            })
            this.recordList = data.data.list
            this.totalNum = data.data.total
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 换页
      handleCurrentChange (pageNum) {
        let { pageSize } =this
        this.getRecordList({pageNum, pageSize})
      },
      handleChangeReason (result) {
        console.log(result)
      },
      getParams () {
        axios.all([this.$axios.get('/api/funds/type'), this.$axios.get('/api/funds/mode'), this.$axios.get('/api/funds/reason')])
          .then(arr => {
            let { data: typeData } = arr[0]
            let { data: modeData } = arr[1]
            let { data: reasonData } = arr[2]
            this.typeArr = typeData
            this.modeArr = modeData
            let reason = [
              {
                value: 0,
                label: '支出',
                children: reasonData.expenditure
              },
              {
                value: 1,
                label: '收入',
                children: reasonData.income
              }
            ]
            this.$nextTick(() => {

              this.reasonArr = reason
            })
          })
          .catch(err => {
            this.$message.error('获取支持类型错误：'+err)
          })
      }
    },
}
</script>

<style lang="scss" scoped>
.pagination{
  float: right;
  margin: 30px;
}
</style>
