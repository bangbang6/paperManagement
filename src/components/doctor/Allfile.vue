<template>
  <div class="inner-wrapper">
    <div class="inner">
      <div class="select-items">
        <el-input placeholder="论文名" v-model="title" size="mini" clearable></el-input>
        <el-input placeholder="作者" v-model="author" size="mini" clearable></el-input>
        <el-input placeholder="项目号/项目基金" v-model="projectNum" size="mini" clearable></el-input>
        <el-select v-model="publicTypeName" placeholder="发表类型" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            size="mini"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
        style="width: 100%"
        size="mini"
        @row-click="handleRowClick"
      >
        <el-table-column prop="title" label="名称" width="480">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
            <el-tag
              size="mini"
              v-if="scope.row.error"
              effect="dark"
              :type="scope.row.type"
              :style="{marginLeft:'5px'}"
              @click="errorHandler(scope.row)"
            >{{scope.row.errorMessage}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="80"></el-table-column>
        <el-table-column prop="publicTypeName" label="发表类型"></el-table-column>
        <el-table-column prop="name" label="具体名称"></el-table-column>
        <el-table-column prop="projectNum" label="项目号"></el-table-column>
        <el-table-column prop="projectFund" label="项目基金"></el-table-column>
        <el-table-column prop="date" label="发表时间">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.date)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="..." label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="light"
              placement="bottom-start"
              style="margin-right: 5px"
              content="下载"
            >
              <el-link
                icon="el-icon-download"
                style="font-size: 18px;color: rgb(64, 158, 255)"
                @click="download(scope.$index)"
              ></el-link>
            </el-tooltip>
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
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      error: false,
      date: '',
      title: '',
      author: '',
      projectNum: '',
      publicTypeName: '',
      options: [

      ],
      tableData: [],
      files: [
        {
          title: 'Trustzone-based secure lightweight wallet for hyperlerdger fabric',
          author: '代老师',
          publicTypeName: '会议/top80',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          id: 1,
          date: new Date(),
          error: true,
          type: "danger",
          errorMessage: '题目重复'
        },
        {
          title: 'Trustzone-based secure lightweight wallet for hyperlerdger fabric',
          author: 'bang',
          publicTypeName: '会议/top80',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date(),
          id: 2,
          error: true,
          type: "danger",
          errorMessage: '题目重复'


        },
        {
          title: 'Foridar',
          author: 'bang',
          publicTypeName: '期刊/sci',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date(),
          id: 3,
          error: true,
          type: "warning",
          errorMessage: '多次修改'


        },
        {
          title: 'Foridar',
          author: 'bang',
          publicTypeName: '期刊/sci',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date(),
          id: 3,
          error: false
        }
      ]
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
    },
    search () {
      this.tableData = this.files
      if (this.title) {

        this.tableData = this.tableData.filter(file => file.title.indexOf(this.title) > -1)
      }
      if (this.author) {
        this.tableData = this.tableData.filter(file => file.authors.indexOf(this.author) > -1)
      }
      if (this.projectNum) {
        this.tableData = this.tableData.filter(file => { return file.projectNum.indexOf(this.projectNum) > -1 || file.projectFund.indexOf(this.projectNum) > -1 })
      }
      if (this.publicTypeName) {
        this.tableData = this.tableData.filter(file => file.publicTypeName.indexOf(this.publicTypeName) > -1)
      }
      if (this.date) {
        console.log('this.date', this.date);
        this.tableData = this.tableData.filter(file => {
          return file.date.getTime() > this.date[0].getTime() && file.date.getTime() < this.date[1].getTime()
        })
      }
      if (this.error) {
        this.tableData = this.tableData.filter(file => file.error)
      }
    },
    errorHandler (row) {
      let title = row.title
      let role = localStorage.getItem('role')
      if (role === '1') {
        this.$router.push({
          path: "/admin/errorStatus",
          query: {
            title: title
          }
        })
      }

    },
    handleRowClick (row) {
      console.log('row', row);
    },
    back (row) {
      this.$router.push({
        path: "/backforward",
        query: {
          id: row.id,
          title: row.title
        }
      })
    }


  },
  mounted () {
    this.tableData = this.files //files是整个文件 tableData是经过filter后的文件
  }
}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 80%;
  margin: auto;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: white;
  overflow-y: auto;

  .inner {
    padding-top: 50px;
    padding-left: 50px;
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
    }
  }
}
</style>
<style scoped lang='scss'>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
</style>
