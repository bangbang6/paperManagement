<template>
  <div class="fileManagement">
    <div class="left-wrapper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">上传文件</div>
      </div>
      <file-message :fileMessage="fileMessage"></file-message>
      <div class="left">
        <FileUpload></FileUpload>
      </div>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
 
<script>
import FileUpload from './Fileupload'
import FileMessage from './FileMessage'

export default {
  data () {
    return {
      fileMessage: {
        qikan: {
          doi: "",
          name: "",
          issn: "",
          page: "",
          year: "",
          juanhao: "",
          qikanhao: "",
          zaiyao: ""
        },
        meeting2: {
          name: "",
          address: "",
          time: "",
          zaiyao: ""
        },
        paper: {
          paperNo: '',
          name: "",
          firstCommit: true,

          paperStatus: '1',
          authorData: [
            { chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, work: { label: "", status: true }, connectStatus: false, firstStatus: false },

          ],

        },
        meeting: {
          endData: "",
          selectType: "",
          selectType2: "",
          options: [{
            value: '1',
            label: 'Top80'
          }, {
            value: '2',
            label: '期刊'
          }, {
            value: '3',
            label: '普通会议'
          }],
        },
      }

    }
  },
  methods: {



    submit () {
      console.log(this.fileMessage.qikan);
    }

  },
  components: {
    FileUpload, FileMessage
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
    }
  }
}
</style>

