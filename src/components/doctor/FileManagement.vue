<template>
  <div class="fileManagement">
    <div class="left-wrapper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">上传文件</div>
      </div>
      <file-message :fileMessage="fileMessage"></file-message>
      <div class="left">
        <div class="fileupload">
          <el-upload
            class="upload-demo"
            ref="upload"
            action
            drag
            multiple
            :http-request="uploadFile"
            :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div v-loading="loading" style="marginTop:20px"></div>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
 
<script>
import { uploadFile, uploadPaper } from '@/api/teacher'
import { getTypeTree } from '@/api/meeting'
import FileMessage from './FileMessage'
import { Message } from 'element-ui';
export default {
  data () {
    return {
      fileMessage: {
        qikan: {
          periodicalDoi: "",

          periodicalIssn: "",
          periodicalPage: "",
          periodicalYear: "",
          periodicalVolumeNum: "",
          periodicalIssueNum: "",
          paperAbstract: "",

        },
        meeting2: {

          conferenceSite: "",
          conferenceTime: "",
          paperAbstract: "",

        },
        paper: {
          paperAbstract: '',
          id: '',
          title: "",
          firstPublish: true,
          projectNum: "",
          projectFund: "",
          hasAccepted: 0,
          authors: [
            { chineseName: { label: "", status: true }, englishName: { label: "", status: true }, email: { label: "", status: true }, organization: [{ label: "", status: true }], connect: false, first: false },

          ],
          duplicateCheckResult: {
            isPassed: 1,
            rate: 0,
            resultFileId: ''
          },
          needCheck: true
        },
        meeting: {
          conferenceDeadline: "",
          publicTypeId: "",
          publicTypeId0: "",
          name: "",
          website: "",
          options: [],
          options2: []
        },
      },
      loading: false,
      fileId: ""

    }
  },
  methods: {

    uploadFile: function (param) {
      //let loadingInstance = this.$loading({ target: dom });


      let fileObject = param.file;

      let formData = new FormData();
      formData.append("file", fileObject);

      uploadFile(formData).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.fileId = res.msg
          Message({
            message: '文件上传成功',
            type: 'success',
            duration: 1000
          })

        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })




    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.loading = false

      this.$refs.upload.abort(file);
    },
    parse (authors) {
      authors.forEach(author => {
        if (author.connect === true) {
          author.correspondAuthor = 1
        } else {
          author.correspondAuthor = 0
        }
        if (author.first === true) {
          author.firstAuthor = 1

        } else {
          author.firstAuthor = 0
        }
      })
      console.log('authors', authors);
      return authors.map(author => {
        return {

          chineseName: author.chineseName.label,
          englishName: author.englishName.label,
          email: author.email.label,
          organization: author.organization.map(group => group.label).join('#'),
          correspondAuthor: author.correspondAuthor,
          firstAuthor: author.firstAuthor
        }
      })
    },
    submit () {
      /* let formData = new FormData() //通过formdata拼接数据 */
      console.log('this.fileMessage', this.fileMessage);
      if (!this.fileId || !this.fileMessage.paper.title || !this.fileMessage.meeting.website || !this.fileMessage.meeting.name || !this.fileMessage.meeting.publicTypeId) {
        Message({
          message: "必要信息不能为空",
          type: 'error',
          duration: 1000
        })
        return
      }


      const { qikan, meeting2, paper, meeting } = this.fileMessage
      let obj = {
        ...qikan,
        ...meeting2,
        ...paper,
        ...meeting,
        firstPublish: paper.firstPublish ? 1 : 0,
        authors: this.parse(paper.authors),
        publicTypeId: meeting.publicTypeId,
        fileId: this.fileId,
        needCheck: Number(paper.needCheck),
        duplicateCheckResult: {
          ...paper.duplicateCheckResult,
          rate: Number(paper.duplicateCheckResult.rate)
        }
      }




      console.log('obj', obj);

      uploadPaper(obj).then(res => {
        if (res.code === 200) {
          Message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push('/teacher/myfile')
          }, 1000)
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }

  },
  components: {
    FileMessage
  },
  mounted () {
    getTypeTree().then(res => {
      console.log('res', res);
      this.fileMessage.meeting.options = res.map(item => {
        return {
          id: item.id,
          children: item.children ? item.children : [],
          label: item.typeName,
          value: item.id
        }
      })
    })
  }
}
</script>
 
<style lang="scss" scoped>
.fileManagement {
  width: 60%;
  margin-left: 20%;
  .left-wrapper {
    width: 100%;
    .title-wrapper {
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 5px;
      .line {
        background-color: rgb(64, 158, 255);
        height: 20px;
        width: 2px;
      }
      .title {
        margin-left: 5px;
      }
    }
    .left {
      .fileupload {
        .channel {
          width: 100%;
          margin: 40px 0;
          .channel-btn {
            margin-right: 20px;
          }
        }
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
            width: 50%;
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
          }
        }
        .upload-demo {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
.el-upload-dragger {
  width: 300px;
}
.el-input {
  height: 30px;
  .el-input__inner {
    height: 30px;
  }
}
</style>
