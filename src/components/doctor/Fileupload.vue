<template>
  <div class="fileupload">
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      :action="action"
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
</template>

<script>

/* import { upload } from '@/api/file'
import { mapState } from 'vuex';
import { checkChannel } from '@/api/channel' */
export default {
  data () {
    return {
      action: '',
      loading: false,
      channels: [],
      channel: 'channel1',


    }
  },

  methods: {
    uploadFile: function (param) {
      //let loadingInstance = this.$loading({ target: dom });
      if (!this.channels.length) {
        alert('无可用通道,无法上传到服务器')
        return
      }

      const channelId = this.channels.filter((item) => {
        return item.channelName === this.channel
      })[0].id
      console.log(channelId);
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.loading = true
      if (!this.channel) {
        alert('请先选择通道')
        return
      }
      //formData.append("originUserId", userId);
      /*  upload(formData, channelId).then((res) => {
         console.log('file', res);
         if (res.data.code === 200) {
           this.loading = false
           alert(res.data.message)
         } else {
           alert(res.data.message)
           this.loading = false
         }
       }, err => {
         alert(err.message)
         this.loading = false
       }) */
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.loading = false

      this.$refs.upload.abort(file);
    },





  },
  mounted () {
    /*  checkChannel().then(res => {
       if (res.data.code === 200) {
         this.channels = res.data.data
 
       }
     }) */
  }
}
</script>

<style scoped lang='scss'>
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
