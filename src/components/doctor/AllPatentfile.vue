<template>
  <div class="inner-wrapper">
    <div class="inner">
      <div class="select-items">
        <el-input placeholder="发明名称" v-model="title" size="mini" clearable></el-input>
          <el-input placeholder="申请号" v-model="patentNum" size="mini" clearable></el-input>
          <el-input placeholder="分类号" v-model="typeNum" size="mini" clearable></el-input>
          <el-input placeholder="申请人" v-model="authors" size="mini" clearable></el-input>
          <el-input placeholder="发明人" v-model="patentPerson" size="mini" clearable></el-input>
          <el-input placeholder="代理人" v-model="daili" size="mini" clearable></el-input>
        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            size="mini"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="申请日期"
            end-placeholder="公布日期"
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
        <el-table-column prop="title" label="发明名称" width="300">
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
          <el-table-column prop="patentPerson" label="发明人" width="120">
              <template slot-scope="scope">
                  <span class="overflow">{{scope.row.patentPerson}}</span>
              </template>
          </el-table-column>
        <el-table-column prop="authors" label="申请人" width="200">
          <template slot-scope="scope">
            <span class="overflow">{{scope.row.authors}}</span>
          </template>
        </el-table-column>
          <el-table-column prop="patentNum" label="申请号" width="130"></el-table-column>
          <el-table-column prop="typeNum" label="分类号" width="150">
              <template slot-scope="scope">
              <span class="overflow">{{scope.row.typeNum}}</span>
          </template>
          </el-table-column>
        <el-table-column prop="daili" label="代理人" width="60">
            <template slot-scope="scope">
                <span class="overflow">{{scope.row.daili}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dailiCon" label="代理机构" width="150">
            <template slot-scope="scope">
                <span class="overflow">{{scope.row.dailiCon}}</span>
            </template>
        </el-table-column>
          <el-table-column prop="gongbuNum" label="申请公布号" width="150">
              <template slot-scope="scope">
                  <span class="overflow">{{scope.row.gongbuNum}}</span>
              </template>
          </el-table-column>
        <el-table-column prop="patentDate" label="申请公布日">
            <template slot-scope="scope">
                <span>{{formatDate(scope.row.patentDate)}}</span>
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

import { downloadFile } from '@/api/paper'
export default {
  data () {
    return {
      error: false,
      title: '',
      patentPerson: '',
      authors: '',
      patentNum: '',
      typeNum:'',
      daili:'',
      dailiCon:'',
      gongbuNum:'',
      date:'',
      patentDate:'',
      options: [
      ],
      tableData: [],//筛选过的file
      files: [//总的file
          {
           title: '区块链数据存储系统和方法',
           patentPerson: '谢超良,赵辉,王超',
           authors: '湖南智慧政务区块链科技有限公司',
           patentNum:'202103080007 .7',
           typeNum: 'G06Q20/10(2012.01)I',
           daili: '谢如意',
           dailiCon: '长沙心智力知识产权代理事务所(普通合伙) 43233',
           gongbuNum:'CN 2021385301 A',
           patentDate: new Date(2021,3,8),
           id: 1,
           date:new Date(),
           error: false,
           exception:[]
           // type: "danger",
           // errorMessage: '题目重复'
         },
         {
             title: '一种基于区块链技术的数据存证系统',
             patentPerson: ' 胡振生,罗汉军,王旭',
             authors: '湖南楚璧科技有限公司',
             patentNum:'2011910779271.X',
             typeNum: 'H04L9/32(20060101)',
             daili: '何园园',
             dailiCon: ' 深圳大域知识产权代理有限公司 44479',
             gongbuNum:'CN 201910779271 Y',
             patentDate:new Date(2019,10,7),
             date:new Date(),
             exception:['题目重复'],
             id: 1,
           error: true,
           type: "danger",

         },
         {
             title: '一种基于区块链技术的数据存证系统',
             patentPerson: '代炜琦，陈婷婷',
             authors: ' 蚂蚁区块链科技(上海)有限公司',
             patentNum:'202012311292.5',
             typeNum: 'H04L9/32(20060101)',
             daili: '周嗣勇',
             dailiCon: '北京博思佳知识产权代理有限公司',
             gongbuNum:'CN 202012311292 Y',
             date:new Date(),
             patentDate:new Date(2020,12,31),
             exception:['题目重复'],
           id: 2,
           error: true,
           type: "danger",
           errorMessage: '题目重复'
         },
         {
             title: '基于智能合约的区块链上参与方身份管理方法及系统',
             patentPerson: '张一锋',
             authors: '中钞信用卡产业发展有限公司北京智能卡技术研究院',
             patentNum:'202010131422.6',
             typeNum: 'G06Q20/40(2012.01)I',
             daili: '罗满',
             dailiCon: '北京集佳知识产权代理有限公司 11227',
             gongbuNum:'CN 202010131422 Y',
             date:new Date(),
             patentDate: new Date(2020,10,13),
             exception:[],
           id: 3,
           error: true,
           type: "danger",
           errorMessage: '多次修改'
         },
         {
             title: '区块链网络中信息的验证方法及系统',
             patentPerson: '金海，代炜琦',
             authors: '蚂蚁区块链科技(上海)有限公司',
             patentNum:'202010159269.1',
             typeNum: 'H04L9/32(20060101)',
             daili: '王宁',
             dailiCon: '广州华进联合专利商标代理有限公司 44224',
             gongbuNum:'CN 202010139269 A',
             date:new Date(),
             patentDate: new Date(2020,10,13),
             exception:[],
           id: 3,
           error: false
         },
          {
              title: '区块链集群处理系统和方法',
              patentPerson: '刘雄文,陆陈一帆,黄宇翔,司思',
              authors: '上海亿账通区块链科技有限公司',
              patentNum:'202008159276.1',
              typeNum: 'H04L29/08(2006.01)I',
              daili: '高杰 于志光',
              dailiCon: '深圳市沃德知识产权代理事务所(普通合伙) 44347',
              gongbuNum:'CN 202008150002 Y',
              date:new Date(),
              patentDate: new Date(2020,8,15),
              exception:[],
              id: 3,
              error: false
          },
          {
              title: '多区块链的分片处理方法和装置',
              patentPerson: '波林·贝尔纳特,丹尼尔·约瑟夫',
              authors: '深圳壹账通智能科技有限公司',
              patentNum:'202010139269.1',
              typeNum: 'H04L9/32(20060101)',
              daili: '成丽杰',
              dailiCon: '上海晨皓知识产权代理事务所(普通合伙)',
              gongbuNum:'GB 1714987.3 Y',
              patentDate:new Date(2020,10,13),
              exception:[],
              id: 3,
              error: false
          }
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
      if (this.patentNum) {
        this.tableData = this.tableData.filter(file => file.patentNum.indexOf(this.patentNum) > -1)
      }
      if (this.typeNum) {
        this.tableData = this.tableData.filter(file => file.typeNum.indexOf(this.typeNum) > -1)
      }
      if (this.authors) {
        this.tableData = this.tableData.filter(file => file.authors.indexOf(this.authors) > -1)
      }
      if (this.patentPerson) {
        this.tableData = this.tableData.filter(file => file.patentPerson.indexOf(this.patentPerson) > -1)
      }
        if (this.daili) {
            this.tableData = this.tableData.filter(file => file.daili.indexOf(this.daili) > -1)
        }
      if (this.date) {
          console.log(this.date)
        this.tableData = this.tableData.filter(file => {
          return file.patentDate > this.date[0].getTime() && file.patentDate < this.date[1].getTime()
        })
      }
      if (this.error) {
        this.tableData = this.tableData.filter(file => file.exception.length > 0)
      }
    },
    getWidth (exception) {
      return `width:${300 - exception.length * 100}px`
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
        this.$router.push('/paperdetail')
      let currentUser = localStorage.getItem('chineseName')
      if (role === '1') {
        localStorage.setItem('paperId', row.id)

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
     this.tableData = this.files //files是整个文件 tableData是经过filter后的文件

   /* getChainPapers().then(res => {
      console.log('list', res);
      if (res.code === 200) {
        //this.files = res.data
        this.tableData = this.files
      }
    })*/
  }
}
</script>

<style lang="scss" scoped>

.inner-wrapper {
  width: 80%;
  margin: auto;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

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
          width:100%;
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
}
</style>
<style scoped lang='scss'>
.el-input >>> .el-input__icon {
  line-height: 32px;
}
</style>
