<template>
  <el-card >
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchForm" label-width="100px" class="demo-form-inline" size='small'>
      <el-form-item label="收支类型">
        <el-select v-model="searchForm.type" placeholder="请选择收支类型" clearable class="search-form-item">
          <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支方式">
        <el-select v-model="searchForm.mode" placeholder="请选择收支方式" clearable class="search-form-item">
          <el-option v-for="item in modeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支原因">
        <el-cascader
          class="search-form-item"
          v-model="searchForm.reason"
          clearable
          :options="reasonArr"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="searchForm.explain" class="search-form-item" placeholder="支持模糊查询" clearable @keyup.enter.native="handleSearch"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="日期区间">
        <el-date-picker
          class="search-form-item"
          :editable="false"
          v-model="searchForm.date"
          type="datetimerange"
          placeholder="请选择一个时间段"
          style="width: 80%;"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size='mini' @click="handleSearch">查询</el-button>
        <el-button size='mini' type="success" @click="addFormVisible = true">新增记录</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="recordList"
      v-loading='loading'
      highlight-current-row>
      <el-table-column
        type="index"
        width="50">
        <!-- <template slot-scope="scope">
          <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
        </template> -->
      </el-table-column>
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
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.explain }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="附件"
        align='center'
        width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.fileName" placement="left">
            <el-button v-if="scope.row.filePath" size="mini" type="info" :loading="scope.row.downloadLoading" @click="downloadFile(scope.row._id, scope.row.fileName, scope.row)">下载</el-button>
          </el-tooltip>
            <span v-if="!scope.row.filePath" style="color: gray;">无</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align='center' width="220">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteRecord(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <el-pagination
      class="pagination"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>

    <!-- 新增 -->
    <el-dialog title="新增资金记录" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" ref="addForm" :rules="rules" size='small' label-width="80px" >
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="收支类型" prop='type'>
              <el-select v-model="addForm.type" placeholder="请选择收支类型" class="add-form-item">
                <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收支方式" prop='mode'>
              <el-select v-model="addForm.mode" placeholder="请选择收支方式" class="add-form-item">
                <el-option v-for="item in modeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收支原因"  prop='reason'>
              <el-cascader
                class="add-form-item"
                v-model="addForm.reason"
                :options="reasonArr"
                :props="{ expandTrigger: 'hover' }">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注说明">
              <el-input type="textarea" class="add-form-item" v-model="addForm.explain" :autosize="{ minRows: 5, maxRows: 8}" placeholder="请输入此次支出或收入详细的描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件上传">   
              <el-upload
                ref="upload"
                :multiple="false"
                :limit='1'
                :on-exceed='onExceed'
                :action="'随便'"
                :auto-upload="false"
                :http-request="request"
                :show-file-list="true">
                <el-button
                    slot="trigger"
                    size="mini"
                    type="primary"
                    :loading="uploadLoading">选取文件</el-button><br/>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button size='small' @click="addFormVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="addRecord" v-loading='isAdding'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改资金记录" :visible.sync="updateFormVisible" :close-on-click-modal="false" width='30%'>
      <el-form :model="updateForm" ref="updateForm" :rules="rules" size='small' label-width="80px" >
        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="收支类型" prop='type'>
              <el-select v-model="updateForm.type" placeholder="请选择收支类型">
                <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收支方式" prop='mode'>
              <el-select v-model="updateForm.mode" placeholder="请选择收支方式">
                <el-option v-for="item in modeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收支原因"  prop='reason'>
              <el-cascader
                v-model="updateForm.reason"
                :options="reasonArr"
                :props="{ expandTrigger: 'hover' }">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注说明">
              <el-input type="textarea" style="width: 50%;" v-model="updateForm.explain" :autosize="{ minRows: 5, maxRows: 8}" placeholder="请输入此次支出或收入详细的描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button size='small' @click="updateFormVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="updateRecord">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
import axios from 'axios'
import { formatTime } from '@/utils/tool.js'
import Upload from '@/components/Upload.vue'
export default {
    name: 'CapitalFlow',
    components: {
      Upload
    },
    data () {
      return {
        loading: false,
        isAdding: false,
        uploadLoading: false,
        addFormVisible: false,
        updateFormVisible: false,
        addForm: {
          type: null,
          mode: null,
          reason: null,
          explain: '',
          file: ''
        },
        updateForm: {
          type: null,
          mode: null,
          reason: null,
          explain: '',
        },
        searchForm: {
          date: '',
          type: [],
          mode: [],
          reason: '',
          explain: '',
          // test: {}
        },
        recordList: [],
        pageNum: 1,
        pageSize: 10,
        totalNum: 0,
        typeArr: [],
        modeArr: [],
        reasonArr: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        rules: {
          type: { required: true, message: "请选择收支类型", trigger: "blur"} ,
          mode: { required: true, message: "请选择收支方式", trigger: "blur" },
          reason: { required: true, message: "请选择收支原因", trigger: "blur" },
        }
      }
    },
    watch: {
      reasonArr: function (newValue) {
        let { pageSize } =this
        this.getRecordList({pageSize})
      }
    },
    created() {
      this.getParams()
    },
    methods: {
      // 查找
      handleSearch () {
        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        if(searchForm.date){
          searchForm.startTime = new Date(searchForm.date[0]).getTime()
          searchForm.endTime = new Date(searchForm.date[1]).getTime()
          delete searchForm.date
        }
        this.getRecordList(Object.assign({}, searchForm))
        return searchForm
      },
      // 文件超过限制则提示
      onExceed() {
        this.$message({ type: 'error',  message: '失败：最多只能添加一个附件', center: true })
      },
      // 自定义文件上传，调用this.$refs.upload.submit()方法即可触发，如未选择文件，此方法不会被触发
      request(option) {
        // console.log('submit')
        // console.log(option)
        this.addForm.file = option.file
      },
      // 新增
      addRecord () {
        this.$refs.addForm.validate((isOk) => {
          if(!isOk) return this.$message({type: 'error', message: '新增失败!请填写表单', center: true})
          this.isAdding = true
          this.$refs.upload.submit() // 调用自定义上传方法request
          let addForm = JSON.parse(JSON.stringify(this.addForm))
          let { type, mode, reason, explain } = addForm
          let url = '/api/funds/add'
          let formData = new FormData()
          if(typeof(addForm.type) === 'number') formData.append('type', type)
          if(typeof(addForm.mode) === 'number') formData.append('mode', mode)
          if(addForm.reason) formData.append('reason', reason[reason.length-1])
          if(addForm.explain) formData.append('explain', explain)
          if(addForm.file) formData.append('file', this.addForm.file) // 文件单独处理
          this.addForm.file = null // 无论有没有上传文件，应该释放原变量中的file对象
          this.$axios.post(url, formData)
            .then(({data}) => {
              if(data.code || data.code === 401) this.$message.error('新增失败:' + data)
              this.$message.success({message: '新增成功!', center: true})
              this.addFormVisible = false
              this.getRecordList() // 新增成功后重新请求数据
              // 清空addForm双向绑定的数据
              this.addForm = {
                type: null,
                mode: null,
                reason: null,
                explain: '',
                file: ''
              }
              // 去除列表中的文件
              this.$refs.upload.clearFiles()
              this.isAdding = false
            })
            .catch((err) => {
              this.$message.error('新增失败:' + err)
              this.isAdding = false
            })
        })
      },
      // 删除
      deleteRecord (id) {
        this.$confirm('确定删除该条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = '/api/funds/delete'
          this.$axios.post(url, { id })
            .then(({data}) => {
              if(data.code) return this.message.error(`删除失败：${data}`)
              this.$message.success({center: true, message: data.msg})
              let { pageNum, pageSize } = this
              let searchForm = this.handleSearch()
              this.getRecordList(Object.assign({}, searchForm, { pageNum, pageSize }))
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            center: true
          })
        })
      },
      // 修改
      updateRecord () {
        this.$refs.updateForm.validate((isOk) => {
          if(!isOk) return this.$message.error('错误表单')
          let url = '/api/funds/update'
          let updateForm = JSON.parse(JSON.stringify(this.updateForm))
          let { reason } = updateForm
          updateForm.reason = reason[reason.length-1]
          this.$axios.post(url, updateForm)
            .then((({data}) => {
              if(data.code) return this.$message.error(`错误：${data}`)
              this.$message.success({message: data.msg, center: true})
              this.updateFormVisible = false
              let { pageNum, pageSize } = this
              let searchForm = this.handleSearch()
              this.getRecordList(Object.assign({}, searchForm, { pageNum, pageSize }))
            }))
            .catch((err) => {
              this.$message.error(err)
            })
        })
      },
      // 修改前
      handleEdit (info) {
        this.updateFormVisible = true
        let reason, curReason = []
        if(info.type === '收入') {
          reason = this.reasonArr[0].children
          curReason[0] = "1"
        }
        if(info.type === '支出') {
          reason = this.reasonArr[1].children
          curReason[0] = "2"
        }
        reason.forEach(item => {
          if (item.label === info.reason) curReason[1] = item.value
        })
        if(curReason.length <= 1) curReason = null
        this.$set(this.updateForm, 'id', info['_id']) // 必传
        this.$set(this.updateForm, 'type', info.type === '收入' ? 0 : 1)
        this.$set(this.updateForm, 'mode', info.mode === '支付宝' ? 0 : (info.mode === '微信' ? 1 : 2))
        this.$set(this.updateForm, 'reason', curReason)
        this.$set(this.updateForm, 'explain', info.explain)
      },
      // 查询列表
      getRecordList (option = {}) {
        this.loading = true
        let url = '/api/funds/record'
        this.$axios.get(url, {params: option})
          .then(({data}) => {
            if(data.code) return // code为-1时后台代码出错
            let reasonArr = this.reasonArr[0].children.concat(this.reasonArr[1].children)
            data.data.list.forEach(item => {
              item.date = formatTime(Number(item.date)) // 处理日期
              item.fileName = item.fileName ? item.fileName.slice(14) : ''
              this.typeArr.forEach((typeItme) => {
                if(item.type === typeItme.value) item.type = typeItme.label
              })
              this.modeArr.forEach((modeItme) => {
                if(item.mode === modeItme.value) item.mode = modeItme.label
              })
              reasonArr.forEach ((reasonItme) => {
                if(item.reason === reasonItme.value) item.reason = reasonItme.label
              })
            })
            data.data.list.forEach(item => item.downloadLoading = false)
            this.recordList = data.data.list
            this.totalNum = data.data.total
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 处理文件下载
      downloadFile (id, fileName, row) {
        row.downloadLoading = true
        let url = `/api/funds/recordFile`
        this.$axios.get(url, { params: {id}, responseType: "arraybuffer"} ) // 指定响应类型：arraybuffer或blob（这里两种都可以使用，原因未知，路过的大佬求告知），如果不写下载的文件会乱码
          .then(({data}) => {
            let contentUrl = window.URL.createObjectURL(new Blob([data])) // params：object 可选: File对象、Blob对象、MediaSource对象。
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = contentUrl
            console.log(fileName)
            link.setAttribute('download', fileName) // 文件名称
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(contentUrl)
            this.$message.success('下载成功!')
          })
          .finally(() => {
            row.downloadLoading = false
          })
          // 记录下post请求解决方案
          // this.$axios({ method: 'post', url, responseType: 'blob', data: {fileName: 'test.txt'}})
      },
      // 换页
      handleCurrentChange (pageNum) {
        let { pageSize } =this
        let searchForm = this.handleSearch()
        this.getRecordList(Object.assign(searchForm, {pageNum, pageSize}))
      },
      getParams () {
        this.loading = true
        axios.all([this.$axios.get('/api/funds/type'), this.$axios.get('/api/funds/mode'), this.$axios.get('/api/funds/reason')])
          .then(arr => {
            let { data: typeData } = arr[0]
            let { data: modeData } = arr[1]
            let { data: reasonData } = arr[2]
            this.typeArr = typeData
            this.modeArr = modeData
            let reason = [
              {
                value: '1',
                label: '收入',
                children: reasonData.income
              },
              {
                value: '2',
                label: '支出',
                children: reasonData.expenditure
              }
            ]
            this.reasonArr = reason
            this.loading = false
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
.search-form-item {
  width: 180px;
}
.add-form-item {
  width: 80%;
}
</style>
