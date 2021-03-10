<template>
  <div class="fileupload">
    <div class="paper-info">
      <div class="left">
        <div class="input">
          <span>论文编号:</span>
          <el-input v-model="paper.paperNo"></el-input>
        </div>
        <div class="input">
          <span>论文标题:</span>
          <el-input v-model="paper.name"></el-input>
        </div>

        <div class="input">
          <span>论文状态:</span>
          <div>
            <el-radio v-model="paper.paperStatus" label="1">已收录</el-radio>
            <el-radio v-model="paper.paperStatus" label="2">未出版</el-radio>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="input">
          <span>期刊编号:</span>
          <el-input v-model="paper.qikanNo"></el-input>
        </div>
        <div class="input">
          <span>期刊等级:</span>
          <el-input v-model="paper.qikanLevel"></el-input>
        </div>
        <div class="input">
          <span>期刊页码:</span>
          <el-input v-model="paper.page"></el-input>
        </div>
      </div>
    </div>
    <div class="author">
      <div class="input">
        <span class="title">论文作者:</span>
        <div class="writter-inner">
          <div class="yizuo">
            <span>一作:</span>
            <el-input
              v-for="(item,index) in paper.authors.yizuo"
              :key="index"
              v-model="paper.authors.yizuo[index]"
              class="authorInput"
              :placeholder="(index+1)"
            ></el-input>
            <i class="iconfont" @click="addAuthor(0)">&#xe612;</i>
          </div>
          <div class="tongxun">
            <span>通讯:</span>
            <el-input
              v-for="(item,index) in paper.authors.tongxun"
              :key="index"
              v-model="paper.authors.tongxun[index]"
              class="authorInput"
              :placeholder="(index+1)"
            ></el-input>
            <i class="iconfont" @click="addAuthor(1)">&#xe612;</i>
          </div>
          <div class="yizuo">
            <span>其他:</span>
            <el-input
              v-for="(item,index) in paper.authors.others"
              :key="index"
              v-model="paper.authors.others[index]"
              class="authorInput"
              :placeholder="(index+1)"
            ></el-input>
            <i class="iconfont" @click="addAuthor(2)">&#xe612;</i>
          </div>
        </div>
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
        paperNo: '',
        name: "",
        page: "",
        qikanLevel: "",
        qikanNo: "",
        paperStatus: '1',
        authors: {
          yizuo: [''],
          tongxun: [""],
          others: ['']
        }
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
    addAuthor (index) {
      //index 表示是哪个类的作者正在添加
      if (index === 0) {
        this.paper.authors.yizuo.push('')
      } else if (index === 1) {
        this.paper.authors.tongxun.push('')
      } else this.paper.authors.others.push('')

      console.log('authors', this.paper.authors);
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
