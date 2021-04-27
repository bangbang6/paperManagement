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
        <el-table-column prop="title" label="名称" width="450">
          <template slot-scope="scope">
            <span
              :class="scope.row.exception.length>0?'exception':'normal'"
              :style="scope.row.exception.length>0?getWidth(scope.row.exception):''"
            >{{scope.row.title}}</span>
            <el-tag
              @click="handleErrorClick(scope.row)"
              :type="item === '题目重复'?'danger':'warning'"
              size="mini"
              effect="dark"
              v-for="item in scope.row.exception"
              :style="{marginLeft:'10px'}"
              :key="item"
            >{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="authors" label="作者" width="100">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.authors}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="publicTypeName" label="发表类型"></el-table-column>
        <el-table-column prop="name" label="具体名称">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectNum" label="项目号">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.projectNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectFund" label="项目基金">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.projectFund}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uploadChainDate" label="发表时间">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.uploadChainDate)}}</span>
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
                @click="download(scope.row.id)"
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
import { getChainPapers } from '@/api/chain'
import { downloadFile } from '@/api/paper'
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
      tableData: [],//筛选过的file
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
      ]
    }
  },
  methods: {
    download (id) {
      downloadFile(id)
    },

    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
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
          return file.uploadChainDate > this.date[0].getTime() && file.uploadChainDate < this.date[1].getTime()
        })
      }
      if (this.error) {
        this.tableData = this.tableData.filter(file => file.exception.length > 0)
      }
    },
    getWidth (exception) {
      return `width:${450 - exception.length * 100}px`
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
      let currentUser = localStorage.getItem('chineseName')
      if (role === '1') {
        localStorage.setItem('paperId', row.id)
        this.$router.push('/paperdetail')
      } else if (role === '0') {
        if (row.uploader === currentUser) {
          localStorage.setItem('paperId', row.id)
          this.$router.push('/undoPaperdetail')
        }
      }


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
    /* this.tableData = this.files //files是整个文件 tableData是经过filter后的文件
 */
    getChainPapers().then(res => {
      console.log('list', res);
      if (res.code === 200) {
        this.files = res.data
        this.tableData = this.files
      }
    })
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
      white-space: nowrap;
      .cell {
        display: flex;
        align-items: center;
        .overflow {
          overflow: hidden;
          text-overflow: ellipsis;
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
}
</style>
<style scoped lang='scss'>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
</style>
