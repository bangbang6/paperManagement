<template>
  <div class="inner-wrapper">
    <div class="inner">
      <div class="select-items">
        <el-input placeholder="论文名" v-model="title" size="mini" clearable></el-input>
        <el-input placeholder="作者" v-model="author" size="mini" clearable></el-input>
        <el-input placeholder="项目号/项目基金" v-model="projectNum" size="mini" clearable></el-input>
        <el-select v-model="publicTypeName" placeholder="发表类型" size="mini" multiple>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
        <el-input placeholder="会议/期刊名" v-model="fullName" size="mini" clearable></el-input>
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
        style="width: 100%;"
        size="mini"
        @row-click="handleRowClick"
      >
        <el-table-column prop="title" label="名称" width="450">
          <template slot-scope="scope">
            <span
              :class="scope.row.exceptions.length>0?'exception':'normal'"
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
        <el-table-column prop="authors" label="作者" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.authors}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeNames" label="发表类型" width="140"></el-table-column>
        <el-table-column prop="fullName" label="名称">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.fullName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectNum" label="项目号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="overflow">{{getProjectNum(scope)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectFund" label="项目基金" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="overflow">{{getProjectFund(scope)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uploadChainDate" label="发表时间">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.uploadChainDate)}}</span>
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
      @current-change="handlePageChange"
      :current-page="page"
      :page-size="8"
    >></el-pagination>
  </div>
</template>
 
<script>
import { findMyPapersByQuery } from '@/api/chain'
import { downloadFile } from '@/api/paper'
export default {

  data () {

    return {
      files: [//总的file
        /*  {
           title: 'Trustzone-based secure lightweight wallet for hyperlerdger fabric',
           author: 'Weiqi Dai,Qinyuan Wang,Zeli Wang,Xiaobin Lin',
           publicTypeName: '会议/B类',
           name: 'JPDC',
           projectNum: '02.0129/TSFQ.2016.9831256',
           projectFund: 'National Natural Science Foundation of China',
           id: 1,
           date: '2021/3/02',
           error: false,
           // type: "danger",
           // errorMessage: '题目重复'
         },
         {
           title: 'Interledger: Creating a Standard for Payments',
           author: 'Adrian Hope-Bailie,Stefan Thomas',
           publicTypeName: '会议/B类',
           name: 'WWW’16 Companion',
           projectNum: '10.1109/TSFQ.2019.2928256',
           projectFund: 'National Natural Science Foundation of Canada',
           date: '2016/4/15',
           id: 2,
           error: true,
           type: "danger",
           errorMessage: '题目重复'
         },
         {
           title: 'Interledger: Creating a Standard for Payments',
           author: 'Stefan Thomas,Adrian Hope-Bailie',
           publicTypeName: '会议/B类',
           name: 'WWW’16 Companion',
           projectNum: '10.1109/TSFQ.2019.2928256',
           projectFund: 'National Natural Science Foundation of Canada',
           date: '2016/4/15',
           id: 2,
           error: true,
           type: "danger",
           errorMessage: '题目重复'
         },
         {
           title: 'Tesseract: Real-Time Cryptocurrency Exchange',
           author: 'Iddo Bentov,Yan Ji,Fan Zhang',
           publicTypeName: '期刊/B类',
           name: 'JPDC',
           projectNum: '12.0712/WSAW.2019.9321256',
           projectFund: 'National Natural Science Foundation of Canada',
           date: '2019/8/12',
           id: 3,
           error: true,
           type: "warning",
           errorMessage: '多次修改'
         },
         {
           title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
           author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
           publicTypeName: '期刊/sci',
           name: ' IEEE Transactions on Information Forensics and Security',
           projectNum: '10.1109/TIFS.2019.2948287',
           projectFund: 'Imperial College London ',
           date: '2021/04/12',
           id: 3,
           error: false
         } */
      ],
      error: false,
      date: '',
      title: '',
      author: '',

      projectNum: '',
      publicTypeName: '',
      totalElements: 0,
      totalPages: 0,
      page: 1,
      fullName: "",
      options: [
        {
          value: 1,
          label: "trans"
        },
        {
          value: 2,
          label: "sci"
        },
      ],
      tableData: [],//筛选过的file

    }
  },
  methods: {
    getProjectNum (scope) {
      console.log('scope', scope);
      if (!scope.row.projects) return ''
      let arr = scope.row.projects.map(item => item.projectNum)
      return arr.join(',')
    },
    getProjectFund (scope) {
      if (!scope.row.projects) return ''
      let arr = scope.row.projects.map(item => item.projectFund)
      return arr.join(',')
    },
    portout () {

    },
    portin () {

    },
    getPaperByPage () {

      //搜索分页
      let queryData = {
        title: this.title,
        numOrFund: this.projectNum,
        types: this.publicTypeName,
        fullName: this.fullName,
        startTime: this.date ? this.date[0] : null,
        endTime: this.date ? this.date[1] : null,
        authors: this.author,
        hasException: this.error,
        page: this.page - 1,
        size: 8

      }
      findMyPapersByQuery(queryData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content || []
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          // console.log(res.data.totalPages)
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
    handlePageChange (page) {
      this.page = page
      this.getPaperByPage()
    },
    handlePrev (page) {
      this.page = page
      this.getPaperByPage()
    },
    handleNext (page) {
      this.page = page
      this.getPaperByPage()
    },
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
        numOrFund: this.projectNum,
        types: this.publicTypeName,
        fullName: this.fullName,
        startTime: this.data ? this.date[0] : null,
        endTime: this.data ? this.date[1] : null,
        authors: this.author,
        hasException: this.error,
        page: this.page - 1,
        size: 8

      }
      findMyPapersByQuery(queryData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.content || []
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
    getWidth (exceptions) {
      return `width:${440 - exceptions.length * 80}px`
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
      let role = localStorage.getItem('role')
      console.log('row', row);
      /* let currentUser = localStorage.getItem('chineseName') */
      if (role === '1') {
        localStorage.setItem('paperId', row.id)
        this.$router.push('/paperdetail')
      } else if (role === '0') {
        localStorage.setItem('paperId', row.id)
        this.$router.push({
          path: '/undoPaperdetail',
          query: {
            id: row.id,

          }
        })
      }


    },
    back (row) {
      this.$router.push({
        path: "/backforward",
        query: {
          id: row.id,
          title: row.title,
          category: 0
        }
      })
    }


  },
  mounted () {
    /* this.tableData = this.files //files是整个文件 tableData是经过filter后的文件
 */
    this.getPaperByPage()

  }
}
</script>

<style lang="scss" scoped>
.inner-wrapper {
  background: white;
  position: relative;
  margin: auto;
  height: 600px;

  /*  padding: 10px; */
  box-sizing: border-box;
  overflow-y: auto;

  .inner {
    padding-top: 10px;
    .header {
      display: flex;
      justify-content: flex-end;
      padding-right: 50px;
    }
    .select-items {
      margin-top: 10px;
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
        width: 200px;
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
          width: 350px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .normal {
          display: inline-block;
          width: 440px;
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
</style>
<style scoped lang='scss'>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
::v-deep .el-select__tags span {
  display: flex;
}
</style>
