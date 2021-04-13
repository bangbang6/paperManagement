<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-input size="mini" v-model="title" placeholder="论文标题" clearable></el-input>
            <el-input size="mini" v-model="author" placeholder="论文作者" clearable></el-input>
          </div>

          <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" size="mini">
          <el-table-column prop="title" label="名称" width="100"></el-table-column>
          <el-table-column prop="author" label="作者" width="100"></el-table-column>
          <el-table-column prop="publicTypeName" label="发表类型" width="80"></el-table-column>
          <el-table-column prop="uploader" label="上传者" width="80"></el-table-column>
          <el-table-column prop="chainDate" label="上链时间">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.chainDate)}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="状态">
            <template>
              <el-tag type="danger" size="mini">论文重复</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="paper-detail">
      <errorpaper-detail></errorpaper-detail>
    </div>
  </div>
</template>
 
<script>
import ErrorpaperDetail from './ErrorpaperDetail'
export default {
  components: { ErrorpaperDetail },
  data () {
    return {
      title: '',
      author: '',
      files: [
        {
          title: 'MinierFord',
          author: 'Ethipia',
          publicTypeName: 'top80',
          uploader: 'bang',

          chainDate: new Date()
        },
        {
          title: 'MinierFord',
          author: 'Ethipia',
          publicTypeName: 'top80',
          uploader: 'bang',

          chainDate: new Date()
        },
        {
          title: 'Foridar',
          author: 'Ethipia',
          publicTypeName: 'sci',
          uploader: 'user1',

          chainDate: new Date()
        },
      ],
      tableData: []
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

    }
  },
  mounted () {
    this.tableData = this.files
  }
}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .error-status {
    width: 40%;
    margin-left: 8%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    background: white;
    height: calc(100% - 20px);
    .content-wrapper {
      padding-top: 50px;
      padding-left: 20px;
      .selects {
        display: flex;
        justify-content: space-between;
        .el-input {
          margin-right: 20px;
          width: 120px;
        }
        .el-button {
          margin-right: 10px;
        }
      }
      .el-table {
        margin-top: 20px;
      }
    }
  }
  .paper-detail {
    width: 40%;
    margin-left: 2%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    background: white;
    height: calc(100% - 20px);
  }
}
</style>