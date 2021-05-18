<template>
  <div class="patent-message">
    <div class="paper-info">
      <div class="left">
        <!-- <div class="input">
          <span>专利编号:</span>
          <el-input v-model="paper.paperNo"></el-input>
        </div>-->
          <div class="input">
              <span>申请公布号:</span>
              <el-input v-model="paper.pushNum" style="margin-right: 15px"></el-input>
              <span>申请公布日:</span>
              <div class="block">
                  <el-date-picker
                          v-model="pushData"
                          type="date"
                          placeholder="选择日期">
                  </el-date-picker>
              </div>

          </div>
        <div class="input">
          <span>申请号:</span>
          <el-input v-model="paper.num"  style="margin-right: 15px"></el-input>
            <span>申请日期:</span>
            <div class="block" style="margin-right: 15px">
                <el-date-picker
                        v-model="patentTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <span>分类号:</span>
            <el-input v-model="paper.patentType" style="margin-right: 15px"></el-input>
        </div>
          <div class="input">
              <span>申请人:</span>
              <el-input v-model="paper.company" type="textarea" :rows="1"></el-input>
          </div>
          <div class="input">
          <span>地址:</span>
          <el-input v-model="paper.location" type="textarea" :rows="1" :cols="100"></el-input>
          </div>
        <div class="authors2">
          <span :style="{marginTop:'6px'}">发明人:</span>
          <div class="right2">
            <div class="author" v-for="(author,authorIndex) in paper.authors" :key="authorIndex">
              <div class="first-line">
                <div class="chinese-name">
                  <span>中文名:</span>
                  <el-input
                    v-model="author.chineseName.label"
                    @change="name=>getUser(name,authorIndex)"
                  ></el-input>
                </div>
                <div class="engish-name">
                  <span>英文名:</span>
                  <el-input v-model="author.englishName.label"></el-input>
                </div>
                <div class="email">
                  <span>邮箱:</span>
                  <el-input v-model="author.email.label"></el-input>
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
          <div class="input">
              <span>代理机构:</span>
              <el-input v-model="paper.daili" type="textarea" :rows="1" :cols="100"></el-input>
          </div>
          <div class="input">
              <span>代理人:</span>
              <el-input v-model="paper.daliPerson"></el-input>
          </div>

          <div class="input">
              <span>发明名称:</span>
              <el-input v-model="paper.patentName" type="textarea" :rows="1" ></el-input>
          </div>
        <div class="paperAbstract input">
          <span>摘要:</span>
          <el-input v-model="paper.paperAbstract" type="textarea" :rows="5" :cols="60"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getUserByChineseName } from '@/api/paper'
import { uploadFile } from '@/api/teacher'
import { Message } from 'element-ui'
export default {
  props: {
    patentMessage: Object
  },

  computed: {
    paper () {
      return this.patentMessage.paper
    },
    meeting () {
      return this.patentMessage.meeting
    }
  },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            patentTime: '',
            pushData: '',
        };
    },
  methods: {
    handleChange (e) {
      const file = e.target.files[0]
      console.log('file', file);

      let formData = new FormData();
      formData.append("file", file);
      uploadFile(formData).then(res => {
        if (res.code === 200) {
          this.paper.duplicateCheckResult.resultFileId = res.msg
          Message({
            message: "查重文件上传成功",
            type: 'success',
            duration: 1000
          })
        } else {
          Message({
            message: "查重文件上传失败",
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getUser (name, authorIndex) {
      getUserByChineseName(name).then(res => {
        if (res.code === 200) {
          if (res.data) {
            /*  authors: [
             { chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, organization: [{ label: "", status: true }], connect: false, first: false },
 
           ], */
            let author = {
              chineseName: { label: res.data.chineseName, status: true },
              englishName: { label: res.data.englishName, status: true },
              email: { label: res.data.email, status: true },
              organization: res.data.organization.split('#').map(item => ({
                label: item,
                status: true
              }))
            }
            this.paper.authors.splice(authorIndex, 1, author)


          }
        } else {
          /*  Message({
             type: 'error',
             duration: 1000,
             message: res.msg
           }) */
        }
      })
    },
    addAuthor () {
      this.paper.authors.push({ chineseName: { label: "", status: true }, englishName: { label: "", status: true }, email: { label: "", status: true }, organization: [{ label: "", status: true }], connect: false, first: false },)
    },
    addGroup (index1) {
      this.paper.authors[index1].organization.push({
        label: "",
        status: ""
      })
    },
    deleteGroup (index1, index2) {
      this.paper.authors[index1].organization.splice(index2, 1)
    }

  },
  watch: {
    'meeting.publicTypeId0': {
      handler (newV) {
        console.log('newV', newV);
        this.meeting.publicTypeId = ''
        this.meeting.options.forEach((item) => {

          if (item.value === newV) {
            this.meeting.options2 = item.children.map(item => {
              return {
                value: item.id,
                id: item.id,
                label: item.typeName.split('/')[1]
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
.author {
  .input {
    width: 100%;
    font-size: 14px;
    display: flex;
    // align-items: center;

    flex-wrap: wrap;
    .title {
      margin-top: 15px;
      width: 80px;
    }

    span {
      display: inline-block;
      width: 50px;
    }
    .writter-inner {
      .el-input {
        width: 100px;
      }
      .authorInput {
        padding-right: 10px;
        margin-top: 10px;

        box-sizing: border-box;
      }
      .iconfont {
        margin-top: 10px;
        margin-left: 10px;
        cursor: pointer;
        color: rgb(64, 158, 255);

        font-size: 18px;
      }
    }
  }
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
    .input2 {
      width: 100%;
      font-size: 14px;
      margin-top: 10px;
      display: flex;

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
        display: flex;
        flex-direction: column;
        .select-wrapper {
          display: flex;
          .el-select {
            width: 240px;

            margin-right: 20px;
          }
        }
        .el-input {
          width: 240px;
          margin-top: 20px;
        }
      }
    }
    /* .authors {
      width: 100%;
      font-size: 14px;
      margin-top: 20px;
      display: flex;
      span {
        display: inline-block;
        width: 80px;
        margin-top: 18px;
      }
    } */
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
</style>
<style >
.el-icon-arrow-up {
  height: 30px !important;
  line-height: 30px;
}
.el-icon-date {
  height: 40px;
}
</style>
<style lang='scss' scoped>
.repeat {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  margin-top: 16px;
  .file-result {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .text {
      width: 100px !important;
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
</style>