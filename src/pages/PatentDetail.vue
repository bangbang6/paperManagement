<template>
  <div class="paper-detail"  >
    <el-card shadow="always" style="height: 900px">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <div>一种区块链数据共享加密和解密方法、设备及存储介质</div>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="left">
            <div class="zaiyao">
                <span>申请公布号:</span>
                <el-input value="CN 111385301 A"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请公布日:</span>
                <el-input value="2020.07.07"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请号:</span>
                <el-input value="202010150007 .7"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请日:</span>
                <el-input value="2020 .03 .06"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请人:</span>
                <el-input value="湖南智慧政务区块链科技有限公司"></el-input>
            </div>
            <div class="zaiyao">
                <span>地址:</span>
                <el-input value="417000 湖南省娄底市娄星区万宝镇
                    高铁南站广场东侧区块链产业园2楼"></el-input>
            </div>
            <div class="zaiyao">
                <span>发明人:</span>
                <el-input value="谢超良 赵辉 王超"></el-input>
            </div>
            <div class="zaiyao">
                <span>专利代理机构:</span>
                <el-input value="长沙心智力知识产权代理事务所(普通合伙) 43233"></el-input>
            </div>
            <div class="zaiyao">
                <span>代理人:</span>
                <el-input value="谢如意"></el-input>
            </div>
            <div class="zaiyao">
                <span>Int.CI:</span>
                <el-input value="H04L 29/06(2006 .01)
                    H04L 29/08(2006 .01)
                    H04L 9/00(2006 .01)"></el-input>
            </div>
          <div class="zaiyao">
            <span>摘要:</span>
             <el-input value="本发明公开了一种区块链数据共享加密和
                解密方法、设备及存储介质，属于区块链技术领
                域。包括至少一个第一方创建同态代理重加密密
                钥对私钥A和公钥A1；对明文a进行加密得到密文
                a1；将密文a1上传到区块链；至少一个第二方创
                建同态代理重加密密钥对私钥B和公钥B1；对明
                文b进行加密得到密文b1；将密文b1上传到区块
                链；所述第一方和第二方均从区块链的智能合约
                获取公钥C1；第一方将公钥C1和私钥A进行代理
                重加密，得到密钥rekeyA，上传到区块链；第二方
                将公钥C1和私钥B进行代理重加密，得到密钥
                rekeyB，上传到区块链；其中，智能合约通过同态
                加密创建密钥对钥私C和公钥C1。解决了基于区
                块链的隐私数据进行安全计算的同态问题，减少
                了用户与区块链，用户与用户之间的交互流程，
                将链下的一些操作移到链上，使计算更具有可信
                力。"></el-input>
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
        </div>
        <div class="btn-wrapper">
            <el-button type="primary" style="float: right">修改</el-button>
        </div>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
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
    reject () {

    },
  },
  mounted () {
    this.paperId = localStorage.getItem('paperId')
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
        .span {
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
          width: 100px;
        }
        div {
          flex: 1;
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