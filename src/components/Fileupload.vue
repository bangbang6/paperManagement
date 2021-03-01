<template>
  <div class="fileupload">
    <div class="channel">
      <el-radio-group v-model="channel">
        <el-radio-button
          class="channel-btn"
          v-for="item in channels"
          :key="item.id"
          :label="item.channelName"
          size="sm"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div class="paper-info">
      <div class="input">
        <span>论文编号：</span>
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        论文编号：
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        论文标题
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        期刊编号
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        所属期刊
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        期刊等级
        <el-input v-model="paper.no"></el-input>
      </div>
      <div class="input">
        期刊页码
        <el-input v-model="paper.no"></el-input>
      </div>
    </div>
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
      paper: {
        no: ''
      }
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
  .paper-info {
    display: flex;
    flex-wrap: wrap;
    .input {
      display: flex;
      width: 200px;
      font-size: 14px;
      span {
        display: inline-block;
        width: 100px;
      }
      .el-input {
        height: 20px;
        .el-input__inner {
          height: 20px;
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
