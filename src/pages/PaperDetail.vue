<template>
  <div class="paper-detail">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <span>{{paperName}}</span>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="input">
          <span class="key">论文编号:</span>

          <span>{{paperNo}}</span>
        </div>

        <div class="input status">
          <span class="key">论文状态:</span>

          <span>
            {{paperStatusWord}}
            <el-popover placement="right" width="240" trigger="manual" v-model="visible">
              <div class="right">
                <div class="title-wrapper">
                  <div class="title">期刊信息</div>
                  <div class="delete">
                    <i
                      class="el-icon-circle-close"
                      style="color:red;font-size:20px"
                      @click="visible = !visible"
                    ></i>
                  </div>
                </div>
                <div class="input">
                  <span>期刊编号:</span>
                  <el-input v-model="uploadPaper.qikanNo"></el-input>
                </div>
                <div class="input">
                  <span>期刊等级:</span>
                  <el-input v-model="uploadPaper.qikanLevel"></el-input>
                </div>
                <div class="input">
                  <span>期刊页码:</span>
                  <el-input v-model="uploadPaper.page"></el-input>
                </div>
                <div class="btn">
                  <el-button type="primary" size="mini" @click="upload">确定</el-button>
                </div>
              </div>
              <el-tooltip content="上传" placement="bottom" effect="light" slot="reference">
                <i class="el-icon-top" v-if="paperStatus === 1 " @click="visible = !visible"></i>
              </el-tooltip>
            </el-popover>
          </span>
        </div>

        <div class="input">
          <span class="key">期刊编号:</span>
          <span>{{qikanNo}}</span>
        </div>
        <div class="input">
          <span class="key">期刊等级:</span>
          <span>{{qikanLevel}}</span>
        </div>
        <div class="input">
          <span class="key">期刊页码:</span>
          <span>{{page}}</span>
        </div>
        <div class="input">
          <span class="key">论文作者:</span>
          <div class="writter">
            <div class="yizuo">
              <span class="key">一作:</span>
              <span
                v-for="(author,index) in authors.yizuo"
                :key="index"
                class="author-name"
              >{{author}}</span>
            </div>
            <div class="tongxun">
              <span class="key">通讯:</span>
              <span
                v-for="(author,index) in authors.tongxun"
                :key="index"
                class="author-name"
              >{{author}}</span>
            </div>
            <div class="others">
              <span class="key">其他:</span>
              <span
                v-for="(author,index) in authors.others"
                :key="index"
                class="author-name"
              >{{author}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="operation">
        <el-card shadow="always">
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
        </el-card>
      </div>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      paperName: "数据库系统统计",
      paperNo: "822",
      paperStatus: 1,
      qikanNo: "341",
      qikanLevel: "top80",
      page: "14-16",
      visible: false,
      authors: {
        yizuo: ['廖振邦'],
        tongxun: ['赵文浩'],
        others: ['卢振辉', '夏梓翼', '寓言'],
      },
      uploadPaper: {
        qikanNo: '',
        qikanLevel: '',
        page: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    upload () {
      this.visible = !this.visible
    }
  },
  computed: {
    paperStatusWord () {
      return this.paperStatus === 0 ? "已发布" : "未发布"
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
    .input {
      display: flex;
      margin-top: 20px;
      &.status {
        align-items: center;
      }
      span {
        font-weight: normal;
        display: inline-block;
        height: 100%;
        i {
          color: rgb(64, 158, 255);
          font-size: 16px;
          cursor: pointer;
        }
      }

      span.key {
        display: inline-block;
        color: black;
        font-weight: bold;

        width: 80px;
      }
      .writter {
        .yizuo,
        .others,
        .tongxun {
          margin-bottom: 10px;
          .key {
            font-weight: normal;
            width: 50px;
          }
          .author-name {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .operation {
    display: flex;
    margin-top: 100px;
    cursor: pointer;
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