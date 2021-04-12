<template>
  <div class="all-file">
    <div class="wrapper">
      <div class="inner">
        <div class="select-items">
          <el-input placeholder="论文名" v-model="title"></el-input>
          <el-input placeholder="作者" v-model="author"></el-input>
          <el-input placeholder="项目号/项目基金" v-model="projectNum"></el-input>
          <el-select v-model="publicTypeName" placeholder="发表类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker v-model="date" type="date" placeholder="发表时间"></el-date-picker>
          <el-checkbox v-model="error" :class="{border:error}">
            <span>状态异常</span>
          </el-checkbox>
          <el-button type="primary" size="mini" class="btn" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" size="mini">
          <el-table-column prop="title" label="名称" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
              <el-tag
                size="mini"
                v-if="scope.row.error"
                type="danger"
                :style="{marginLeft:'5px'}"
              >状态异常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="180"></el-table-column>
          <el-table-column prop="publicTypeName" label="发表类型"></el-table-column>
          <el-table-column prop="name" label="具体名称"></el-table-column>
          <el-table-column prop="projectNum" label="项目号"></el-table-column>
          <el-table-column prop="projectFund" label="项目基金"></el-table-column>
          <el-table-column prop="date" label="发表时间"></el-table-column>
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
                  @click="back(scope.$index)"
                ></el-link>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
          title: '数据库',
          author: 'bang',
          publicTypeName: '期刊/sci',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date().toLocaleString().slice(0, 9),
          error: true
        },
        {
          title: '操作系统',
          author: 'bang',
          publicTypeName: '期刊/sci',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date().toLocaleString().slice(0, 9),
          error: true
        },
        {
          title: '数据库',
          author: 'bang',
          publicTypeName: '期刊/sci',
          name: '中国自然',
          projectNum: '2000',
          projectFund: 'xm2000',
          date: new Date().toLocaleString().slice(0, 9),
          error: false
        }
      ]
    }
  },
  methods: {
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
        this.tableData = this.tableData.filter(file => file.date === this.date)
      }
      if (this.error) {
        this.tableData = this.tableData.filter(file => file.error)
      }
    }


  },
  mounted () {
    this.tableData = this.files
  }
}
</script>
 
<style lang="scss" scoped>
.all-file {
  background: rgb(242, 239, 236);
  width: 100%;
  height: calc(100% - 78px);
  padding-top: 10px;
  .wrapper {
    width: 80%;
    margin: auto;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: white;
    .inner {
      padding-top: 50px;
      padding-left: 50px;
      .select-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-input {
          width: 160px;
        }
        .el-checkbox {
          &.border {
            padding: 5px 10px;
            box-sizing: border-box;
            border: 1px solid rgb(64, 158, 255);
          }
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
}
</style>
<style scoped>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
</style>
