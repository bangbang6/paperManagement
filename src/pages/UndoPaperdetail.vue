<template>
  <div class="paper-detail">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <span>{{paper.title}}</span>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="left">
          <!-- <div class="input">
          <span>论文编号:</span>
          <el-input v-model="paper.paperNo"></el-input>
          </div>-->
          <div class="input">
            <span>论文标题:</span>
            <el-input v-model="paper.title"></el-input>
          </div>
          <div class="input">
            <span>摘要:</span>
            <el-input v-model="paper.paperAbstract" type="textarea" :rows="5" :cols="60"></el-input>
          </div>

          <div class="authors2">
            <span :style="{marginTop:'6px'}">作者:</span>
            <div class="right2">
              <div class="author" v-for="(author,authorIndex) in paper.authors" :key="authorIndex">
                <div class="first-line">
                  <div class="chinese-name">
                    <span>中文名:</span>
                    <el-input v-model="author.chineseName"></el-input>
                  </div>
                  <div class="engish-name">
                    <span>英文名:</span>
                    <el-input v-model="author.englishName"></el-input>
                  </div>
                  <div class="email">
                    <span>邮箱:</span>
                    <el-input v-model="author.email"></el-input>
                  </div>
                  <div class="connect">
                    <span>通讯:</span>
                    <el-checkbox v-model="author.connect"></el-checkbox>
                  </div>
                  <div class="first">
                    <span>一作:</span>
                    <el-checkbox v-model="author.first"></el-checkbox>
                  </div>
                </div>
                <div class="group-wrapper">
                  <span>单位:</span>
                  <div class="wrapper2">
                    <div
                      class="group"
                      v-for="(group,groupIndex) in author.organization"
                      :key="groupIndex"
                    >
                      <el-input v-model="group.label" type="textarea" :rows="1" :cols="100"></el-input>
                      <el-button
                        type="danger"
                        size="mini"
                        class="deleteBtn"
                        @click="deleteGroup(authorIndex,groupIndex)"
                      >删除</el-button>
                    </div>
                    <div :style="{marginTop:'20px'}">
                      <el-button type="primary" size="mini" @click="addGroup(authorIndex)">新增</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-icon-wrapper" @click="addAuthor">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </div>
          </div>
          <div class="publish-message">
            <span>发表信息:</span>
            <div class="meeting-wrapper">
              <div class="select-wrapper">
                <el-select v-model="meeting.publicTypeId0" placeholder="发表类别">
                  <el-option
                    v-for="item in meeting.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="meeting.publicTypeId"
                  placeholder="具体类别"
                  v-if="meeting.publicTypeId0"
                  :style="{marginLeft:'20px'}"
                >
                  <el-option
                    v-for="item in meeting.options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="input-wrapper">
                <el-input v-model="paper.name" placeholder="名称"></el-input>
                <el-input v-model="paper.website" placeholder="网址"></el-input>
                <el-date-picker
                  v-model="paper.conferenceDeadline"
                  type="date"
                  placeholder="截止日期"
                  v-if="meeting.publicTypeId0 === 1 "
                ></el-date-picker>
              </div>
            </div>
          </div>

          <div
            class="input"
            v-if="paper.duplicateCheckResult && paper.duplicateCheckResult.resultFileId"
          >
            <span>查重结果:</span>
            <div>{{passStatus}}</div>
          </div>
          <div
            class="input"
            v-if="paper.duplicateCheckResult && paper.duplicateCheckResult.resultFileId"
          >
            <span>查重率:</span>
            <div>{{passRate}}</div>
            <el-button
              type="primary"
              size="mini"
              :style="{marginLeft:'20px'}"
              v-if="paper.duplicateCheckResult && paper.duplicateCheckResult.resultFileId"
              @click="downloadResultFile"
            >下载查重文件</el-button>
          </div>

          <div class="input">
            <span>论文状态:</span>
            <div>
              <el-radio v-model="paper.hasAccepted" :label="1">已收录</el-radio>
              <el-radio v-model="paper.hasAccepted" :label="0">未收录</el-radio>
            </div>
          </div>
          <div class="input" v-if="paper.hasAccepted === 1">
            <span>项目号:</span>
            <el-input v-model="paper.projectNum"></el-input>
          </div>
          <div class="input" v-if="paper.hasAccepted === 1">
            <span>项目基金:</span>
            <el-input v-model="paper.projectFund"></el-input>
          </div>
        </div>
      </div>

      <Qikan v-if="paper.hasAccepted === 1 && (meeting.publicTypeId0 === 7 )" :qikan="qikan"></Qikan>
      <Meeting2
        v-if="paper.hasAccepted === 1 && (meeting.publicTypeId0 === 1 )"
        :meeting2="meeting2"
      ></Meeting2>

      <div class="operation">
        <div class="card-wrapper">
          <el-card shadow="always" v-if="paper.fileId">
            <div class="download" @click="downloadFile">
              <i class="el-icon-download"></i>
              <span>下载</span>
            </div>
          </el-card>
        </div>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="submit">{{role === '0'?'修改':"提交"}}</el-button>
      </div>
    </el-card>
  </div>
</template>
 
<script>
import { Message } from 'element-ui'
import Meeting2 from '../components/doctor/Meeting2'
import Qikan from '../components/doctor/Qikan'
import { getPaperDetail, downloadFile } from '@/api/paper'
import { getTypeTree } from '@/api/meeting'
import { updateFile } from '@/api/user'
export default {
  components: {
    Meeting2, Qikan
  },
  data () {
    return {
      paper: {

      },
      meeting2: {

      },
      meeting: {

        options: [],
        options2: [],
        publicTypeId0: -1,
        publicTypeId: -1
      },
      qikan: {}
    }
  },
  mounted () {
    this.paperId = localStorage.getItem('paperId')
    console.log(' this.paperId', this.paperId);
    if (!this.paperId) {

      Message({
        message: "论文id出错",
        type: 'error',
        duration: 1000
      })

      return
    }
    getTypeTree().then(res => {
      console.log('res', res);
      this.meeting.options = res.map(item => {
        return {
          id: item.id,
          children: item.children ? item.children : [],
          label: item.typeName,
          value: item.id
        }
      })
      getPaperDetail(+this.paperId).then(res2 => {
        if (res2.code === 200) {
          console.log('res2', res2);
          this.paper = res2.data
          let authors = res2.data.authors
          this.paper.authors = authors.map(author => {
            return {
              ...author,
              organization: author.organization ? author.organization.split('#').map(item => ({ label: item, status: false })) : [{ label: "", status: false }],
              connect: author.correspondAuthor === 1,
              first: author.firstAuthor === 1,
            }
          })

          this.qikan = {
            periodicalIssn: res2.data.periodicalIssn,
            periodicalDol: res2.data.periodicalDol,
            periodicalIssueNum: res2.data.periodicalIssueNum,
            periodicalIssuePage: res2.data.periodicalIssuePage,
            periodicalVolumnNum: res2.data.periodicalVolumnNum,
            periodicalYear: res2.data.periodicalYear
          }
          this.meeting2 = {
            conferenceTime: res2.data.conferenceTime,
            conferenceSite: res2.data.conferenceSite
          }
          this.meeting.publicTypeId0 = res2.data.publicTypeId > 7 ? 7 : 1
          //预先设置optiosn2
          this.meeting.options.forEach((item) => {

            if (item.value === this.meeting.publicTypeId0) {
              this.meeting.options2 = item.children.map(item => {
                return {
                  value: item.id,
                  id: item.id,
                  label: item.typeName.split('/')[1],
                  parentId: item.parentId
                }
              })

              this.meeting.publicTypeId = res2.data.publicTypeId

            }

          })



        } else {
          Message({
            message: res2.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    })


  },
  methods: {
    downloadFile () {
      downloadFile(this.paper.fileId)
    },
    downloadResultFile () {
      downloadFile(this.paper.duplicateCheckResult.resultFileId)
    },
    submit () {
      let paper = JSON.parse(JSON.stringify(this.paper))
      paper.authors = this.paper.authors.map(author => {

        return {
          ...author,
          organization: author.organization.map(item => (item.label)).join(',')
        }
      })

      let obj = {
        ...paper,
        ...this.meeting2,
        ...this.meeting,
        ...this.qikan,
        id: this.paperId
      }
      if (!obj.id || !obj.title || !obj.website || !obj.name || !obj.publicTypeId) {
        Message({
          message: "必要信息不能为空",
          type: 'error',
          duration: 1000
        })
        return
      }
      updateFile(obj).then(res => {
        if (res.code === 200) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          console.log('res', res);
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    back () {
      this.$router.back()
    },
    addAuthor () {
      this.paper.authors.push({ chineseName: "", englishName: "", email: "", organization: [{ label: "", status: false }], connect: false, first: false },)
    },
    addGroup (index1) {
      this.paper.authors[index1].organization.push({
        label: "", status: false
      })
    },
    deleteGroup (index1, index2) {
      this.paper.authors[index1].organization.splice(index2, 1)
    }

  },
  computed: {
    paperStatusWord () {
      return this.paperStatus === 0 ? "已发布" : "未发布"
    },
    passRate () {
      if (!this.paper.duplicateCheckResult) return
      return this.paper.duplicateCheckResult.rate + '%'
    },
    passStatus () {
      if (!this.paper.duplicateCheckResult) return
      return this.paper.duplicateCheckResult.isPassed ? '通过' : "未通过"
    },
    role () {
      return localStorage.getItem('role')
    }
  },
  watch: {
    'meeting.publicTypeId0': {
      handler (newV) {
        console.log('newV', newV);
        this.meeting.options.forEach((item) => {

          if (item.value === newV) {
            this.meeting.options2 = item.children.map(item => {
              return {
                value: item.id,
                id: item.id,
                label: item.typeName.split('/')[1],
                parentId: item.parentId
              }
            }

            )

          }

        })

      }
    }

  }
}
</script>
 
<style lang="scss" scoped>
.paper-detail {
  margin-top: 20px;
  width: 60%;
  margin-left: 20%;
  box-sizing: border-box;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    text-align: center;
  }

  .paper-info {
    display: flex;

    justify-content: space-between;
    .left,
    .right {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 80px;
        }
        .el-input {
          width: 200px;
        }
      }
      .publish-message {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        span {
          display: inline-block;
          width: 80px;
        }
        .meeting-wrapper {
          .select-wrapper {
            display: flex;
            .el-input {
              width: 240px;
              margin-top: 20px;
            }
          }
          .input-wrapper {
            display: flex;
            flex-direction: column;

            .el-input {
              width: 240px;
              margin-top: 20px;
            }
          }
        }
      }
      .authors2 {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
        display: flex;
        span {
          display: inline-block;
          width: 80px;
        }
        .right2 {
          .author {
            border: 1px solid #eee;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            box-sizing: border-box;
          }
          .first-line {
            display: flex;
            .chinese-name,
            .engish-name,
            .email,
            .connect,
            .first {
              display: flex;
              align-items: center;
              margin-right: 15px;
              &.connect,
              &.first {
                span {
                  width: 40px;
                }
              }
            }
          }
          .group-wrapper {
            display: flex;
            margin-top: 18px;
            span {
              width: 60px;
              margin-top: 4px;
            }
            .group {
              display: flex;
              margin-bottom: 5px;
              .deleteBtn {
                margin-left: 20px;
              }
            }
          }
          .add-icon-wrapper {
            display: flex;
            width: 100%;
            justify-content: center;
            font-size: 20px;
            height: 30px;
            align-items: center;
            border: 1px solid #eee;
            color: rgb(64, 158, 255);
            cursor: pointer;
          }
        }
      }
    }
  }
  .operation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    cursor: pointer;
    .card-wrapper {
      width: 80%;
      display: flex;
      .el-card {
        width: 20%;
        margin-right: 20px;
        .download,
        .see {
          display: flex;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 32px;
            color: rgb(64, 158, 255);
          }
          span {
            margin-top: 10px;
            font-size: 16px;
            color: rgb(64, 158, 255);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .title-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    i {
      cursor: pointer;
    }
  }
  .input {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 80px;
    }
    .el-input {
      width: 200px;
    }
  }
}
</style>
<style scoped lang='scss'>
.append {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .add {
    font-size: 24px;
    color: rgb(64, 158, 255);
  }
}
.card {
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
}
.btn-wrapper {
  width: 100%;
  margin-top: 10px;
  button {
    float: right;
  }
}
</style>