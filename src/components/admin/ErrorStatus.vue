<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <el-button size="mini" type="primary" @click="$router.back()" v-if="role==='0'">返回</el-button>
          <div class="input-wrapper">
            <el-input size="mini" v-model="title" placeholder="论文标题" clearable></el-input>
            <el-input size="mini" v-model="author" placeholder="论文作者" clearable></el-input>
          </div>

          <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
          <el-table-column prop="author" label="作者" width="100">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.authors}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publicTypeName" label="发表类型" width="100"></el-table-column>
          <el-table-column prop="uploader" label="上传者" width="80">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.uploader}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="chainDate" label="上链时间">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.uploadChainDate)}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="exception" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="item === '题目重复'?'danger':'warning'"
                size="mini"
                effect="dark"
                v-for="item in scope.row.exception"
                :key="item"
              >{{item}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="paper-detail">
      <errorpaper-detail :paperId="paperId"></errorpaper-detail>
    </div>
  </div>
</template>
 
<script>
import ErrorpaperDetail from './ErrorpaperDetail'
import { getErrorList, getExceptionListByTitle } from '@/api/chain'
import { Message } from 'element-ui'
export default {
  components: { ErrorpaperDetail },
  data () {
    return {
      title: '',
      author: '',
      /* files: [
        {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      }
      ],*/
      tableData: [],
      paperId: -1,
    }
  },
  computed: {
    role () {
      return localStorage.getItem('role')
    }
  },
  methods: {
    handleRowClick (row) {
      this.paperId = row.id


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

    }
  },
  mounted () {

    if (+this.role === 0) {
      let title = this.$route.query.title
      getExceptionListByTitle(title).then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.files = res.data

          this.tableData = this.files

          this.paperId = this.tableData[0].id
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    } else if (+this.role === 1) {
      getErrorList().then(res => {
        console.log('errorList', res);
        if (res.code === 200) {
          this.files = res.data
          this.tableData = this.files
          this.title = this.$route.query.title

          this.search()
          this.paperId = this.tableData[0].id
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }


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
    /*  height: 100%; */
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
        .overflow {
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          width: 100%;
          white-space: nowrap;
        }
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
    /* height: 100%; */
  }
}
</style>