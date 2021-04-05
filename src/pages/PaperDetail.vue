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
                    <span>{{author.chineseName.label}}</span>
                  </div>
                  <div class="engish-name">
                    <span>英文名:</span>
                    <span>{{author.engishName.label}}</span>
                  </div>
                  <div class="email">
                    <span>邮箱:</span>
                    <span>{{author.email.label}}</span>
                  </div>
                  <div class="connect">
                    <span>通讯:</span>
                    <el-checkbox v-model="author.connect" disabled></el-checkbox>
                  </div>
                  <div class="first">
                    <span>一作:</span>
                    <el-checkbox v-model="author.first" disabled></el-checkbox>
                  </div>
                </div>
                <div class="group-wrapper">
                  <span>单位:</span>
                  <div class="wrapper2">
                    <div
                      class="group"
                      v-for="(group,groupIndex) in author.groups"
                      :key="groupIndex"
                    >
                      <span>{{group.label}}</span>
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
          <div class="meeting2-message" v-if="(paper.publicTypeId===1 || paper.publicTypeId === 3)">
            <div class="input">
              <span>时间:</span>
              <div>{{paper.conferenceTime}}</div>
            </div>
            <div class="input">
              <span>地点:</span>
              <div>{{paper.conferenceSite}}</div>
            </div>
          </div>
          <div class="meeting-message" v-if="(paper.publicTypeId===2) ">
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
              <el-input v-model="repeat.rate"></el-input>
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
          <div class="download">
            <i class="el-icon-circle-check"></i>
            <span>同意</span>
          </div>
        </el-card>
        <el-card shadow="always" v-if="role==='1'">
          <div class="red see">
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
        paperId: this.paperId,
        isPassed: +this.repeat.success,
        rate: this.repeat.rate,
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
        console.log('papaer', res);
        this.paper = res.data
      } else {
        Message.error(res.msg)
      }
    })


  },
  computed: {
    role () {
      return localStorage.getItem('role') || '1'
    },
    statusWord () {
      return types[this.paper.status]
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
</style>