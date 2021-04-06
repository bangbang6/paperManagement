<template>
  <div class="paper-detail">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <div>{{paper.title}}</div>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="left">
          <div class="zaiyao">
            <span>摘要:</span>
            <div>{{paper.paperAbstract}}</div>
          </div>
          <div class="authors2">
            <span :style="{marginTop:'6px'}">作者:</span>
            <div class="right2">
              <div class="author" v-for="(author,authorIndex) in paper.authors" :key="authorIndex">
                <div class="first-line">
                  <div class="chinese-name">
                    <span>中文名:</span>
                    <div>{{author.chineseName}}</div>
                  </div>
                  <div class="engish-name">
                    <span>英文名:</span>
                    <div>{{author.englishName}}</div>
                  </div>
                  <div class="email">
                    <span>邮箱:</span>
                    <div>{{author.email}}</div>
                  </div>
                  <!-- <div class="connect">
                    <span>通讯:</span>

                    <i class="el-icon-check" v-if="author.connect"></i>
                  </div>

                  <div class="first">
                    <span>一作:</span>
                    <i class="el-icon-check" v-if="author.first"></i>
                  </div>-->

                  <el-tag v-if="author.first">一作</el-tag>
                  <el-tag type="success" v-if="author.connect">通讯</el-tag>
                </div>
                <div class="group-wrapper">
                  <span>单位:</span>
                  <div class="wrapper2">
                    <div
                      class="group"
                      v-for="(organization,organizationIndex) in author.organization"
                      :key="organizationIndex"
                    >
                      <div>{{organization}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="input">
            <span>发布类型:</span>
            <div>{{paper.publicTypeName}}</div>
          </div>
          <div class="input">
            <span>名称:</span>
            <div>{{paper.name}}</div>
          </div>
          <div class="input">
            <span>网址:</span>
            <div>{{paper.website}}</div>
          </div>
          <div class="input">
            <span>论文状态:</span>
            <div>{{statusWord}}</div>
          </div>
          <div class="input" v-if="paper.hasAccepted === 1">
            <span>项目号:</span>

            <div>{{paper.projectNum}}</div>
          </div>
          <div class="input" v-if="paper.hasAccepted === 1">
            <span>项目基金:</span>
            <div>{{paper.projectFund}}</div>
          </div>
          <div class="input" v-if="role==='1' ">
            <span>查重率:</span>
            <div>{{passRate}}</div>
          </div>
          <div class="input" v-if="role==='1' ">
            <span>查重结果:</span>
            <div>{{passStatus}}</div>
          </div>
          <div class="meeting2-message" v-if="meetingShow">
            <div class="input">
              <span>时间:</span>
              <div>{{meetingTime}}</div>
            </div>
            <div class="input">
              <span>地点:</span>
              <div>{{paper.conferenceSite}}</div>
            </div>
          </div>
          <div class="meeting-message" v-if="qikanShow ">
            <div class="input">
              <span>issn:</span>
              <div>{{paper.periodicalIssn}}</div>
            </div>
            <div class="input">
              <span>页码:</span>
              <div>{{paper.periodicalPage}}</div>
            </div>
            <div class="input">
              <span>期刊号:</span>
              <div>{{paper.periodicalIssueNum}}</div>
            </div>
            <div class="input">
              <span>doi:</span>
              <div>{{paper.periodicalDoi}}</div>
            </div>

            <div class="input">
              <span>年份:</span>
              <div>{{paper.periodicalYear}}</div>
            </div>

            <div class="input">
              <span>卷号:</span>
              <div>{{paper.periodicalVolumeNum}}</div>
            </div>
          </div>
          <div class="repeat" v-if="role==='2'">
            <div class="file-result">
              <span class="text">查重结果:</span>
              <input type="file" @change="handleChange" />
            </div>
            <div class="file-rate">
              <span class="text">查重率:</span>
              <el-input v-model="repeat.rate" placeholder="百分比">
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="result">
              <span class="text">查重通过:</span>
              <el-radio v-model="repeat.success" label="1">是</el-radio>
              <el-radio v-model="repeat.success" label="0">否</el-radio>
            </div>
            <div class="btn" style="margin-top:20px">
              <el-button type="primary" @click="handleConfirm">确定</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="operation">
        <!--  <el-card shadow="always">
          <div class="download">
            <i class="el-icon-download"></i>
            <span>下载</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="see">
            <i class="el-icon-view"></i>
            <span>预览</span>
          </div>
        </el-card>-->
        <el-card shadow="always" v-if="role==='1'">
          <div class="download" @click="handle(1)">
            <i class="el-icon-circle-check"></i>
            <span>同意</span>
          </div>
        </el-card>
        <el-card shadow="always" v-if="role==='1'">
          <div class="red see" @click="handle(0)">
            <i class="el-icon-circle-close"></i>
            <span>拒绝</span>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>
 
<script>
import { Message } from 'element-ui'
import { getPaperDetail } from '@/api/paper'

import { uploadFile } from '@/api/teacher'
import { submitCheckResult } from '@/api/repeat'
import { reviewToPublic, reviewToUpChain } from '@/api/admin'
import { types } from '@/api/type'

export default {

  data () {
    return {
      paper: {


      },
      repeat: {
        rate: "",
        file: "",
        success: '1'
      },





    }
  },

  methods: {
    back () {
      this.$router.back()
    },
    handle (op) {
      console.log('this.paper.status', this.paper.status);
      let status = this.paper.status
      if (status === 2) {
        reviewToPublic({ paperId: this.paperId, op: op }).then(res => {
          if (res.code === 200) {
            Message.success(res.msg)
            this.$router.back()
          } else {
            Message.error(res.msg)
          }
        })
      } else if (status === 5) {
        reviewToUpChain({ paperId: this.paperId, op: op }).then(res => {
          if (res.code === 200) {
            Message.success(res.msg)
            this.$router.back()
          } else {
            Message.error(res.msg)
          }
        })
      }
    },
    reject () {

    },
    handleChange (e) {
      const file = e.target.files[0]
      console.log('file', file);

      let formData = new FormData();
      formData.append("file", file);
      uploadFile(formData).then(res => {
        if (res.code === 200) {
          this.fileId = res.msg
        } else {
          Message.error(res.msg)
        }
      })
    },
    handleConfirm () {
      if (!this.fileId || !this.repeat.rate || !this.repeat.success) {
        return
      }
      let data = {
        paperId: +this.paperId,
        isPassed: +this.repeat.success,
        rate: Number(this.repeat.rate),
        resultFileId: this.fileId
      }
      submitCheckResult(data).then(res => {
        if (res.code === 200) {
          Message.success({
            message: res.msg,


          })
          this.$router.back()
        } else {
          Message.error(res.msg)
        }
      })
    }

  },
  mounted () {
    this.paperId = localStorage.getItem('paperId')

    if (!this.paperId) {
      Message.error({
        onClose: () => {
          this.$router.back()
        },
        showClose: true,
        message: "论文id出错"
      })

    }
    getPaperDetail(+this.paperId).then(res => {
      if (res.code === 200) {


        this.paper = res.data
        /* this.paper.authors.group = res.data.authors.group ? res.data.authors.group.split(',') : []
        console.log('this.paper', this.paper); */
        let authors = res.data.authors
        this.paper.authors = authors.map(author => {
          return {
            ...author,
            organization: author.organization ? author.organization.split('#') : [],
            connect: author.correspondAuthor === 1,
            first: author.firstAuthor === 1,

          }
        })
        console.log('this.paper', this.paper);
      } else {
        Message.error(res.msg)
      }
    })


  },
  computed: {
    role () {
      return localStorage.getItem('role') || '1'
    },
    meetingTime () {
      if (!this.paper.conferenceTime) return ''
      return new Date(this.paper.conferenceTime).toLocaleDateString()
    },
    passStatus () {
      if (!this.paper.duplicateCheckResult) return ""
      return this.paper.duplicateCheckResult.isPassed ? '通过' : "不通过"
    },
    passRate () {
      if (!this.paper.duplicateCheckResult) return ""
      return this.paper.duplicateCheckResult.rate + '%'
    },
    statusWord () {
      return types[this.paper.status]
    },
    /*  if (res.data.publicTypeId === 1 || res.data.publicTypeId === 2 || res.data.publicTypeId === 7) {
        this.meeting.publicTypeId = res.data.publicTypeId
      } else {
        //处理只给了二层id的问题
        let publicTypeId = 1
        if (res.data.publicTypeId === 3 || res.data.publicTypeId === 4 || res.data.publicTypeId === 5 || res.data.publicTypeId === 6) {
          publicTypeId = 2
        } else if (res.data.publicTypeId === 8 || res.data.publicTypeId === 9 || res.data.publicTypeId === 10 || res.data.publicTypeId === 11) {
          publicTypeId = 7
        } */
    meetingShow () {
      return this.paper.publicTypeId === 1 || this.paper.publicTypeId === 2 || this.paper.publicTypeId === 3 || this.paper.publicTypeId === 4 || this.paper.publicTypeId === 5 || this.paper.publicTypeId === 6
    },
    qikanShow () {
      return this.paper.publicTypeId === 7 || this.paper.publicTypeId === 8 || this.paper.publicTypeId === 9 || this.paper.publicTypeId === 10 || this.paper.publicTypeId === 11
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
      .meeting2-message,
      .meeting-message {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        span {
          display: inline-block;
          width: 80px;
        }
      }
      .publish-message {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        span {
          display: inline-block;
          width: 80px;
        }
        .meeting-wrapper {
          display: flex;
          flex-direction: column;

          .el-input {
            width: 240px;
            margin-top: 20px;
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
          width: 90%;
          .author {
            border: 1px solid #eee;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            box-sizing: border-box;
            width: 100%;
          }
          .first-line {
            display: flex;
            .chinese-name,
            .engish-name,
            .email,
            .connect,
            .first {
              width: 20%;
              display: flex;
              align-items: center;
              margin-right: 15px;

              &.connect,
              &.first {
                width: 80px;
                span {
                  width: 40px;
                }
              }
              &.email {
                width: 200px;
              }
            }
          }
          .group-wrapper {
            display: flex;
            margin-top: 18px;
            span {
              width: 60px;
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
      .zaiyao {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
        display: flex;

        span {
          display: inline-block;
          width: 80px;
        }
      }
      .repeat {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        .file-result {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .text {
            width: 80px;
            display: inline-block;
          }
          .el-input {
            width: 140px;
          }
        }
        .file-rate {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .text {
            width: 80px;
            display: inline-block;
          }
          .el-input {
            width: 140px;
          }
        }
        .result {
          margin-top: 10px;

          .text {
            width: 80px;
            display: inline-block;
          }
        }
      }
    }
  }
  .operation {
    display: flex;
    margin-top: 20px;
    cursor: pointer;
    .el-card {
      width: 20%;
      margin-right: 20px;
      .download,
      .see {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgb(64, 158, 255);
        &.red {
          color: red;
        }
        i {
          font-size: 32px;
        }
        span {
          margin-top: 10px;
          font-size: 16px;
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
  .btn {
    width: 100%;
    margin-top: 10px;
    button {
      float: right;
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
span {
  font-weight: 600;
}
.card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 5px;
  box-sizing: border-box;
  font-size: 14px;
  background: rgb(64, 158, 255);
  color: white;
}
</style>