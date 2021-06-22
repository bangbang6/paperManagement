<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <el-button size="mini" type="primary" @click="$router.back()" v-if="role==='0'">返回</el-button>

        <div class="selects">
          <div class="input-wrapper" :style="{display:'flex'}">
            <el-input size="mini" v-model="title" placeholder="论文标题" clearable></el-input>
            <el-input size="mini" v-model="authors" placeholder="论文作者" clearable></el-input>
            <el-select v-model="types" placeholder="发表类型" size="mini" multiple>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              size="mini"
              end-placeholder="结束日期"
              :style="{width:'240px'}"
            ></el-date-picker>

            <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>

        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          size="mini"
          @row-click="handleRowClick"
        >
          <el-table-column prop="title" label="名称" width="100">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="80">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.authors}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="80"></el-table-column>
          <el-table-column prop="uploader" label="组别" width="70">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.group}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="chainDate" label="上链时间" width="80">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.upChainTime)}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="exception" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="item === '题目重复'?'danger':'warning'"
                size="mini"
                effect="dark"
                v-for="item in scope.row.exceptionTypes"
                :key="item"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="+totalElements"
        :page-size="8"
        @current-change="handlePageChange"
        :current-page="page"
      >></el-pagination>
    </div>
    <div class="paper-detail">
      <errorpaper-detail :paperId="paperId" :type="type"></errorpaper-detail>
    </div>
  </div>
</template>
 
<script>
import ErrorpaperDetail from './ErrorpaperDetail'
import { getErrorList } from '@/api/chain'
export default {
  components: { ErrorpaperDetail },
  data () {
    return {
      title: '',
      authors: '',
      totalElements: 0,
      page: 1,
      tableData: [],
      date: [],
      paperId: -1,
      type: '论文',
      types: [],
      options: [
        {
          value: 0,
          label: '论文'
        },
        {
          value: 1,
          label: '专利'
        },
        {
          value: 2,
          label: '软件著作权'
        },
      ]
    }
  },
  computed: {
    role () {
      return localStorage.getItem('role')
    }
  },

  methods: {
    handleRowClick (row) {
      this.paperId = row.achvId

      this.type = row.type
    },
    handlePageChange (page) {
      this.page = page
      getErrorList({ page: this.page - 1, size: 8, title: this.title, authors: this.authors, types: this.types, startTime: this.date ? this.date[0] : null, endTime: this.date ? this.date[1] : null }).then(res => {
        console.log('errorList', res);
        if (res.code === 200) {
          this.totalElements = res.data.totalElements

          this.tableData = res.data.content
          this.title = this.$route.query.title


          this.paperId = this.tableData[0].achvId
          this.type = this.tableData[0].type

        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    formatDate (date) {
      if (!date) return null

      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    search () {
      getErrorList({ page: this.page - 1, size: 8, title: this.title, authors: this.authors, types: this.types, startTime: this.date ? this.date[0] : null, endTime: this.date ? this.date[1] : null }).then(res => {
        console.log('errorList', res);
        if (res.code === 200) {
          this.totalElements = res.data.totalElements

          this.tableData = res.data.content



          this.paperId = this.tableData[0].achvId
          this.type = this.tableData[0].type

        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })

    }
  },
  mounted () {
    let title = this.$route.query.title
    this.title = title
    getErrorList({ page: this.page - 1, size: 8, title: title }).then(res => {
      console.log('errorList', res.data);
      if (res.code === 200) {
        this.totalElements = res.data.totalElements
        this.tableData = res.data.content
        this.title = this.$route.query.title


        this.paperId = this.tableData[0].achvId
        this.type = this.tableData[0].type
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })


  }
}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .error-status {
    position: relative;
    width: 40%;
    margin-left: 8%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    background: white;
    height: calc(100% - 20px);
    /*  height: 100%; */
    .content-wrapper {
      padding-top: 50px;
      padding-left: 20px;
      .selects {
        display: flex;
        align-content: space-between;
        height: 80px;
        width: 100%;
        .input-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          .el-input {
            margin-right: 10px;
            width: 120px;
          }
          .el-select {
            margin-right: 20px;
          }
          .el-date-editor {
            margin-right: 10px;
          }
        }
      }

      .el-table {
        margin-top: 20px;
        .overflow {
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          width: 100%;
          white-space: nowrap;
        }
      }
    }
    .el-pagination {
      position: absolute;
      bottom: 60px;
      display: flex;
      width: 100%;
      padding: 0 !important;
      justify-content: center;
    }
  }
  .paper-detail {
    width: 40%;
    margin-left: 2%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    background: white;
    height: calc(100% - 20px);
    /* height: 100%; */
  }
}
::v-deep .el-input__icon {
  line-height: 1 !important;
}
</style>