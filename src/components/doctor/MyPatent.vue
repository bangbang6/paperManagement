<template>
  <div class="inner-wrapper">
    <div class="inner">
      <div class="select-items">
        <el-input placeholder="专利名称" v-model="title" size="mini" clearable></el-input>
        <el-input placeholder="作者" v-model="authors" size="mini" clearable></el-input>
        <el-select v-model="status" placeholder="状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input placeholder="组别" v-model="ofGroup" size="mini" clearable></el-input>
        <el-input placeholder="专利号" v-model="patentNum" size="mini" clearable></el-input>

        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            size="mini"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></el-date-picker>
        </div>
        <el-checkbox v-model="error" border size="mini">
          <span>状态异常</span>
        </el-checkbox>
        <el-button type="primary" size="mini" class="btn" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        size="mini"
        @row-click="handleRowClick"
      >
        <el-table-column prop="title" label="发明名称" width="450">
          <template slot-scope="scope">
            <span
              :class=" [scope.row.exceptions.length>0?'exception':'normal']"
              :style="scope.row.exceptions.length>0?getWidth(scope.row.exceptions):''"
            >{{scope.row.title}}</span>
            <el-tag
              @click="handleErrorClick(scope.row)"
              :type="item === '题目重复'?'danger':'warning'"
              size="mini"
              effect="dark"
              v-for="item in scope.row.exceptions"
              :style="{marginLeft:'10px'}"
              :key="item"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="authors" label="发明人" width="200">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.authors}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="patentPerson" label="状态" width="120">
          <template slot-scope="scope">
            <span class="overflow">{{options[scope.row.status].label}}</span>
          </template>
        </el-table-column>
        <!--  <el-table-column prop="authors" label="申请人" width="200">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.authors}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="patentNum" label="申请号" width="130"></el-table-column>
        <!--  <el-table-column prop="typeNum" label="分类号" width="150">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.typeNum}}</span>
          </template>
        </el-table-column>-->
        <!--   <el-table-column prop="daili" label="代理人" width="60">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.daili}}</span>
          </template>
        </el-table-column>-->
        <!--  <el-table-column prop="dailiCon" label="代理机构" width="150">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.dailiCon}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="gongbuNum" label="组别" width="80">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.ofGroup}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="applyNum" label="专利申请日">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.applyDate)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="..." label="操作">
          <template slot-scope="scope">
            <!--<el-tooltip-->
            <!--effect="light"-->
            <!--placement="bottom-start"-->
            <!--style="margin-right: 5px"-->
            <!--content="下载"-->
            <!--&gt;-->
            <!--<el-link-->
            <!--icon="el-icon-download"-->
            <!--style="font-size: 18px;color: rgb(64, 158, 255)"-->
            <!--@click="download(scope.row.id)"-->
            <!--&gt;</el-link>-->
            <!--</el-tooltip>-->
            <el-tooltip
              effect="light"
              placement="bottom-start"
              style="margin-right: 5px"
              content="溯源"
            >
              <el-link
                icon="el-icon-attract"
                style="font-size: 18px;color: rgb(64, 158, 255)"
                @click="back(scope.row)"
              ></el-link>
            </el-tooltip>
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
</template>
 
<script>

import { downloadFile } from '@/api/paper'
import { getUserPatents, findPatentsByQuery } from '@/api/patent'
export default {
  data () {
    return {
      totalPages: 0,
      totalElements: 0,
      error: false,
      title: '',
      patentNum: '',
      authors: '',
      status: '',
      ofGroup: '',
      date: '',
      page: 1,
      options: [
        {
          label: '拟定申请',
          value: 0
        },
        {
          label: '申请未授权',
          value: 1
        },
        {
          label: '已授权',
          value: 2
        },
      ],
      tableData: [],//筛选过的file
    }
  },
  methods: {
    download (id) {
      downloadFile(id)
    },

    formatDate (date) {
      if (!date) return null

      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    search () {

      this.page = 1
      let queryData = {
        title: this.title,
        authors: this.authors,
        status: this.status !== '' ? (this.options.filter(op => op.value == this.status).map(op => op.value))[0] : null,
        patentNum: this.patentNum,
        ofGroup: this.ofGroup,
        startTime: this.date ? this.date[0] : null,
        endTime: this.date ? this.date[1] : null,
        hasException: this.error,
        page: this.page - 1,
        size: 8

      }
      findPatentsByQuery(queryData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: res.msg
          })
        }
      })
    },
    getWidth (exception) {
      return `width:${440 - exception.length * 80}px`
    },
    handlePageChange (page) {
      this.page = page
      this.getPaperByPage()
    },
    getPaperByPage () {
      //普通分页
      if (this.title === '' && this.authors === '' && this.status === '' && this.date.length < 2 && this.error === false && this.patentNum === '' && this.ofGroup === '') {
        getUserPatents(this.page - 1).then(res => {
          console.log('list', res);
          if (res.code === 200) {

            this.tableData = res.data.content || []
            this.totalElements = res.data.totalElements

          } else {
            this.$message({
              type: 'error',
              duration: 1000,
              message: res.msg
            })
          }
        })

        return
      }
      //搜索分页
      let queryData = {
        title: this.title,
        authors: this.authors,
        status: this.status !== '' ? (this.options.filter(op => op.value == this.status).map(op => op.value))[0] : null,
        patentNum: this.patentNum,

        ofGroup: this.ofGroup,
        startTime: this.date ? this.date[0] : null,
        endTime: this.date ? this.date[1] : null,
        hasException: this.error,
        page: this.page - 1,
        size: 8

      }
      findPatentsByQuery(queryData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content || []
          this.totalElements = res.data.totalElements

        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: res.msg
          })
        }
      })
      // getChainPapers(this.page - 1).then(res => {
      //   console.log('list', res);
      //   if (res.code === 200) {

      //     this.tableData = res.data
      //   }
      // })
      // let res = await getChainPapers(this.page - 1)
      // if (res.code === 200) {
      //   this.tableData = res.data

      // } else {
      //   this.$message({
      //     type: 'error',
      //     duration: 1000,
      //     message: res.msg
      //   })
      // }
    },
    handleErrorClick (row) {
      let title = row.title
      let role = localStorage.getItem('role')
      if (role === '1') {
        this.$router.push({
          path: "/admin/errorStatus",
          query: {
            title: title
          }
        })
      } else {
        this.$router.push({
          path: '/teacher/errorStatus',
          query: {
            title: title
          }
        })
      }

    },
    handleRowClick (row) {
      console.log(row)
      this.$router.push({
        path: '/undoPatentdetail',
        query: {
          id: row.id
        }
      })
    },
    back (row) {
      this.$router.push({
        path: "/backforward",
        query: {
          id: row.id,
          title: row.title,
          category: 1
        }
      })
    }


  },
  mounted () {


    /* getChainPapers().then(res => {
       console.log('list', res);
       if (res.code === 200) {
         //this.files = res.data
         this.tableData = this.files
       }
     })*/
    getUserPatents().then(res => {
      if (res.code === 200) {
        this.tableData = res.data.content || []
        this.totalElements = res.data.totalElements

      } else {
        this.$message({
          message: res.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.inner-wrapper {
  background: white;
  margin: auto;
  height: 600px;

  overflow-y: auto;
  position: relative;

  .inner {
    padding-top: 10px;
    .select-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-input {
        width: 140px;
      }
      .el-date-editor {
        width: 300px;
      }
      .el-select {
        width: 140px;
      }

      .btn {
        margin-right: 50px;
      }
    }
    .el-table {
      margin-top: 20px;
      padding-right: 50px;
      box-sizing: border-box;
      white-space: nowrap;
      .cell {
        display: flex;
        align-items: center;
        .overflow {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;

          white-space: nowrap;
        }
        .exception {
          display: inline-block;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .normal {
          display: inline-block;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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
::v-deep .el-icon-arrow-up {
  height: 30px !important;
  line-height: 1 !important;
}
</style>
<style scoped lang='scss'>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
</style>
