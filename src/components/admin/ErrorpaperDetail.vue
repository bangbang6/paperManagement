<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{title}}</div>
        <div class="message">
          <div class="line">
            <span class="key bold">基本信息</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">作者</span>
            <span class="value">{{authors}}</span>
          </div>
          <div class="line">
            <span class="key">成果类型</span>
            <span class="value">{{achvType}}</span>
          </div>
          <div v-if="achvType==='会议论文'">
            <div class="line">
              <span class="key">会议类别</span>
              <span class="value">{{paperType}}</span>
            </div>
            <div class="line">
              <span class="key">会议全称</span>
              <span class="value">{{fullName}}</span>
            </div>
            <div class="line">
              <span class="key">会议时间</span>
              <span class="value">{{confTime}}</span>
            </div>
          </div>
          <div v-if="achvType==='期刊论文'">
            <div class="line">
              <span class="key">期刊类别</span>
              <span class="value">{{paperType}}</span>
            </div>
            <div class="line">
              <span class="key">期刊全称</span>
              <span class="value">{{fullName}}</span>
            </div>
            <div class="line">
              <span class="key">发表时间</span>
              <span class="value">{{formatDate(journalPublicDate)}}</span>
            </div>
          </div>
          <div v-if="achvType==='专利'">
            <div class="line">
              <span class="key">专利号</span>
              <span class="value">{{patentNum}}</span>
            </div>
            <div class="line">
              <span class="key">专利公告日</span>
              <span class="value">{{formatDate(publishDate)}}</span>
            </div>
            <div class="line">
              <span class="key">专利权人</span>
              <span class="value">{{institution}}</span>
            </div>
            <div class="line">
              <span class="key">代理单位</span>
              <span class="value">{{agent}}</span>
            </div>
          </div>
          <div v-if="achvType==='软件著作权'">
            <div class="line">
              <span class="key">证书号</span>
              <span class="value">{{certificateNumber}}</span>
            </div>
            <div class="line">
              <span class="key">登记号</span>
              <span class="value">{{registerNum}}</span>
            </div>
            <div class="line">
              <span class="key">登记日期</span>
              <span class="value">{{formatDate(registerDate)}}</span>
            </div>
            <div class="line">
              <span class="key">单位</span>
              <span class="value">{{scInstitution}}</span>
            </div>
          </div>
          <div class="line">
            <span class="key">项目信息</span>
            <span class="value">{{projectInfo}}</span>
          </div>

          <div class="line">
            <span class="key">上传者</span>
            <span class="value">{{uploader}}</span>
          </div>
          <div class="line">
            <span class="key">上传单位</span>
            <span class="value">{{uploadOgz}}</span>
          </div>
          <div class="line">
            <span class="key">上链时间</span>
            <span class="value">{{formatDate(upChainTime)}}</span>
          </div>
        </div>
      </div>
      <div class="operation">
        <div class="op">
          <span class="bold">操作信息</span>
        </div>
        <div class="op-detail">
          <div class="col-line">
            <div class="con" v-for="(item,index) in opHisList" :key="index">
              <i :class="`dot dot${index}`" :style="{top:(index*68)+'px'}"></i>
              <div
                :class="`bar bar${index}`"
                :style="{top:(index*68)+8+'px'}"
                v-if="index !== opHisList.length-1"
              ></div>
            </div>
            <div class="time">
              <div class="con" v-for="(item,index) in opHisList" :key="index">
                <span
                  :class="`time-item`"
                  :style="{top:(-3+index*68)+'px'}"
                >{{formatDate(item.updateTime)}}</span>
              </div>
            </div>
          </div>

          <div class="tags">
            <div class="tag" v-for="(item,index) in opHisList" :key="index">
              <el-tag
                type="info"
                :class="`tag-item`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.updateUsername}}</el-tag>
              <!--  <el-tag
                type="info"
                :class="`tag-item2`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.updateUserOrg}}</el-tag>-->
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="item.updateUserOrg"
                width="800"
              >
                <el-tag
                  type="info"
                  :class="`tag-item2`"
                  :style="{top:(-1+(index*68))+'px'}"
                  size="mini"
                  slot="reference"
                >{{item.updateUserOrg}}</el-tag>
              </el-popover>
              <el-tag
                type="info"
                :class="`tag-item3`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.op}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getErrorDetail, getErrorHistory } from '@/api/chain'
export default {
  props: {
    paperId: Number,
    type: String
  },
  computed: {
    typeNum () {
      return this.type === '论文' ? 0 : this.type === '专利' ? 1 : 2
    }
  },
  data () {
    return {
      title: '',
      authors: '',
      achvType: '',
      paperType: "",
      fullName: "",
      confTime: "",
      projectInfo: [],
      uploader: "",
      uploadOgz: "",
      upChainTime: "",
      journalPublicDate: "",
      patentNum: "",
      publishDate: "",
      institution: "",
      agent: "",
      certificateNumber: "",
      registerNum: "",
      registerDate: "",
      scInstitution: "",
      opHisList: [

      ]
    }
  },
  methods: {
    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
  },
  mounted () {
    console.log('this.paperId', this.paperId);
    console.log('this.type', this.type);
    if (this.paperId === -1) return
    getErrorDetail(this.paperId, this.typeNum).then(res => {
      if (res.code === 200) {

        res = res.data
        this.title = res.title
        this.authors = res.authors
        this.achvType = res.achvType
        this.paperType = res.paperType
        this.confTime = res.confTime
        this.projectInfo = res.projectInfo
        this.uploader = res.uploader
        this.uploadOgz = res.uploadOgz
        this.upChainTime = res.upChainTime
        this.journalPublicDate = res.journalPublicDate
        this.patentNum = res.patentNum
        this.publishDate = res.publishDate
        this.institution = res.institution
        this.agent = res.agent
        this.certificateNumber = res.certificateNumber
        this.registerNum = res.certificregisterNumateNumber
        this.registerDate = res.registerDate
        this.scInstitution = res.scInstitution
        this.uploadOgz = res.uploadOgz
        this.fullName = res.fullName


      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
    getErrorHistory(this.paperId, this.typeNum).then(res => {
      if (res.code === 200) {
        this.opHisList = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
  },
  watch: {
    paperId: {
      handler: function (newV) {
        console.log('newV', newV);
        /* this.title = newV.title
        this.author = newV.author
        this.publicTypeName = newV.publicTypeName
        this.name = newV.name
        this.date = new Date()
        this.projectNum = newV.projectNum
        this.projectFund = newV.projectFund
        this.uploader = newV.uploader
        this.organization = '华中科技大学计算机学院cgcl实验室'
        this.chainDate = newV.chainDate */


        getErrorDetail(this.paperId, this.typeNum).then(res => {
          if (res.code === 200) {

            res = res.data
            this.title = res.title
            this.fullName = res.fullName
            this.authors = res.authors
            this.achvType = res.achvType
            this.paperType = res.paperType
            this.confTime = res.confTime
            this.projectInfo = res.projectInfo
            this.uploader = res.uploader
            this.uploadOgz = res.uploadOgz
            this.upChainTime = res.upChainTime
            this.journalPublicDate = res.journalPublicDate
            this.patentNum = res.patentNum
            this.publishDate = res.publishDate
            this.institution = res.institution
            this.agent = res.agent
            this.certificateNumber = res.certificateNumber
            this.registerNum = res.certificregisterNumateNumber
            this.registerDate = res.registerDate
            this.scInstitution = res.scInstitution
            this.organization = res.organization
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
        getErrorHistory(this.paperId, this.typeNum).then(res => {
          if (res.code === 200) {
            this.opHisList = res.data
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
  }
}
</script>
 
<style lang="scss" scoped>
.err-detail {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  .el-table td,
  .el-table th.is-leaf {
    color: black;
  }
  .el-tag.el-tag--info {
    color: black;
  }
  .detail-wrapper {
    padding: 5px 10px;
    padding-top: 20px;

    box-sizing: border-box;
    .detail {
      .title {
        font-weight: bold;
        width: 70%;
        height: 60px;
      }
      .message {
        width: 100%;
        margin-top: 10px;
        .line {
          display: flex;
          padding-top: 5px;
          padding-bottom: 5px;
          box-sizing: border-box;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 12px;
            &.bold {
              font-weight: bold;
              font-size: 12px;
            }
          }
          .key {
            width: 60px;
          }
          .value {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
    .operation {
      font-size: 12px;
      margin-top: 20px;
      .op {
        .bold {
          font-weight: bold;
        }
      }
      .op-detail {
        display: flex;
        justify-content: space-around;

        .con {
          width: 40px;
          position: relative;
          margin-top: 25px;
          margin-left: 40px;
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;

            background: #1b60ec;
          }
          .bar {
            height: 60px;
            width: 1px;
            left: 4px;
            background: #87abf5;
            position: absolute;
          }
        }
        .time {
          position: relative;
          width: 150px;
          margin-left: 40px;
          .time-item {
            position: absolute;
            align-items: center;
          }
        }
        .tags {
          position: relative;
          width: 400px;
          margin-top: 22px;
          .tag-item {
            position: absolute;
            width: 100px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .tag-item2 {
            position: absolute;
            cursor: pointer;
            width: 100px;
            left: 100px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .tag-item3 {
            position: absolute;
            width: 100px;
            left: 200px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>