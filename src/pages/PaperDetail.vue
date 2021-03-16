<template>
  <div class="paper-detail">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <span>{{paper.name}}</span>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="left">
          <div class="zaiyao">
            <span>摘要:</span>
            <div>{{paper.zaiyao}}</div>
          </div>
          <div class="authors">
            <span>作者:</span>
            <el-table :data="paper.authorData" size="mini">
              <el-table-column label="中文名" prop="chineseName"></el-table-column>
              <el-table-column label="英文名" prop="engishName"></el-table-column>
              <el-table-column label="邮箱" prop="email"></el-table-column>
              <el-table-column label="所在单位" prop="work"></el-table-column>
              <el-table-column label="通讯" width="60" prop="connect"></el-table-column>
              <el-table-column label="一作" width="60" prop="first"></el-table-column>
            </el-table>
          </div>

          <div class="input">
            <span>发布类型:</span>
            <div>{{meeting.selectType}}</div>
          </div>
          <div class="input">
            <span>名称:</span>
            <div>{{meeting.name}}</div>
          </div>
          <div class="input">
            <span>网址:</span>
            <div>{{meeting.com}}</div>
          </div>
          <div class="input">
            <span>论文状态:</span>
            <div>{{paper.paperStatus}}</div>
          </div>
          <div
            class="meeting2-message"
            v-if="(meeting.selectType==='1' || meeting.selectType === '3') && (meeting.name)"
          >
            <div class="input">
              <span>会议:</span>
              <div>{{meeting2.name}}</div>
            </div>
            <div class="input">
              <span>时间:</span>
              <div>{{meeting.time}}</div>
            </div>
            <div class="input">
              <span>地点:</span>
              <div>{{address.time}}</div>
            </div>
          </div>
          <div class="meeting-message" v-if="(meeting.selectType==='2') && (qikan.name)">
            <div class="input">
              <span>期刊:</span>
              <div>{{qikan.name}}</div>
            </div>
            <div class="input">
              <span>issn:</span>
              <div>{{qikan.issn}}</div>
            </div>
            <div class="input">
              <span>页码:</span>
              <div>{{qikan.page}}</div>
            </div>
            <div class="input">
              <span>期刊:</span>
              <div>{{qikan.name}}</div>
            </div>
            <div class="input">
              <span>doi:</span>
              <div>{{qikan.doi}}</div>
            </div>

            <div class="input">
              <span>年份:</span>
              <div>{{qikan.year}}</div>
            </div>
            <div class="input">
              <span>期刊:</span>
              <div>{{qikan.name}}</div>
            </div>
            <div class="input">
              <span>卷号:</span>
              <div>{{qikan.juanhao}}</div>
            </div>
            <div class="input">
              <span>期刊号:</span>
              <div>{{qikan.qikanhao}}</div>
            </div>
          </div>
          <div class="repeat" v-if="role==='2'">
            <div class="file-result">
              <span class="text">查重结果:</span>
              <input type="file" />
            </div>
            <div class="file-rate">
              <span class="text">查重率:</span>
              <el-input v-model="repeat.rate"></el-input>
            </div>
            <div class="result">
              <span class="text">查重通过:</span>
              <el-radio v-model="repeat.success" label="1">是</el-radio>
              <el-radio v-model="repeat.success" label="2">否</el-radio>
            </div>
            <div class="btn" style="margin-top:20px">
              <el-button type="primary">确定</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="operation">
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
      </div>-->
    </el-card>
  </div>
</template>
 
<script>

export default {

  data () {
    return {
      paper: {
        paperNo: '',
        name: "数据库系统概论",
        firstCommit: true,

        paperStatus: '已发布',
        authorData: [
          { chineseName: 'lzb' }

        ],
        zaiyao: ""

      },
      repeat: {
        rate: "",
        file: "",
        success: '1'
      },
      meeting: {
        endData: "",

        selectType: '2',
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

    }
  },
  methods: {
    back () {
      this.$router.back()
    }

  },
  computed: {
    role () {
      return localStorage.getItem('role')
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
      .authors,
      .zaiyao {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
        display: flex;
        span {
          display: inline-block;
          width: 80px;
          margin-top: 18px;
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