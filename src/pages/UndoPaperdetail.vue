<template>
  <div class="paper-detail" @click="clear">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <span>{{paper.name}}</span>
        <div></div>
      </div>
      <div class="paper-info">
        <div class="left">
          <!-- <div class="input">
          <span>论文编号:</span>
          <el-input v-model="paper.paperNo"></el-input>
          </div>-->
          <div class="input">
            <span>论文标题:</span>
            <el-input v-model="paper.name"></el-input>
          </div>

          <div class="authors">
            <span>作者:</span>
            <el-table :data="paper.authorData" size="mini" @cell-click="click">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="中文名" prop="chineseName">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row[scope.column.property].status"
                  >{{scope.row.chineseName.label}}</div>
                  <el-input v-model="scope.row.chineseName.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="英文名" prop="engishName">
                <template slot-scope="scope">
                  <div v-if="scope.row[scope.column.property].status">{{scope.row.engishName.label}}</div>
                  <el-input v-model="scope.row.engishName.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" prop="email">
                <template slot-scope="scope">
                  <div v-if="scope.row[scope.column.property].status">{{scope.row.email.label}}</div>
                  <el-input v-model="scope.row.email.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="所在单位" prop="work">
                <template slot-scope="scope">
                  <div v-if="scope.row[scope.column.property].status">{{scope.row.work.label}}</div>
                  <el-input v-model="scope.row.work.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="通讯" width="60" prop="connect">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.connectStatus"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="一作" width="60" prop="first">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.firstStatus"></el-checkbox>
                </template>
              </el-table-column>
              <template slot="append">
                <div class="append" @click="add">
                  <div class="add">+</div>
                </div>
              </template>
            </el-table>
          </div>
          <div class="publish-message">
            <span>发表信息:</span>
            <div class="meeting-wrapper">
              <el-select v-model="meeting.selectType" placeholder="发表类别">
                <el-option
                  v-for="item in meeting.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input v-model="meeting.name" placeholder="名称"></el-input>
              <el-input v-model="meeting.com" placeholder="网址"></el-input>
              <el-date-picker
                v-model="meeting.endData"
                type="date"
                placeholder="截止日期"
                v-if="meeting.selectType === '1' || meeting.selectType ==='3'"
              ></el-date-picker>
            </div>
          </div>
          <div class="input">
            <span>查重结果:</span>
            <div>{{repeat.rate}}</div>
          </div>
          <div class="input">
            <span>论文状态:</span>
            <div>
              <el-radio v-model="paper.paperStatus" label="1">已收录</el-radio>
              <el-radio v-model="paper.paperStatus" label="2">未收录</el-radio>
            </div>
          </div>
        </div>
      </div>
      <Qikan v-if="paper.paperStatus === '1' & (meeting.selectType === '2' )" :qikan="qikan"></Qikan>
      <Meeting2
        v-if="paper.paperStatus === '1' & (meeting.selectType === '1' || meeting.selectType ==='3')"
        :meeting2="meeting2"
      ></Meeting2>
      <el-button type="primary" style="margin-top:20px;">提交</el-button>
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
import Meeting2 from '../components/doctor/Meeting2'
import Qikan from '../components/doctor/Qikan'
export default {
  components: {
    Meeting2, Qikan
  },
  data () {
    return {
      paper: {
        paperNo: '',
        name: "数据库系统概论",
        firstCommit: true,

        paperStatus: '2',
        authorData: [
          { chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, work: { label: "", status: true }, connectStatus: false, firstStatus: false },

        ],

      },
      repeat: {
        rate: "20.0%",
        file: ""
      },
      meeting: {
        endData: "",
        selectType: "",
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
    },
    clear () {

      this.paper.authorData.forEach(item => {
        for (let key in item) {
          if (key === 'connectStatus' || key === 'firstStatus') {
            continue
          }
          else item[key].status = true
        }
      })
    },
    click (row, column, cell, event) {
      console.log('row', row, column, cell, event);
      this.paper.authorData.forEach(item => {
        for (let key in item) {
          if (key === 'connectStatus' || key === 'firstStatus') {
            continue
          }
          else item[key].status = true
        }
      })
      row[column.property] && (row[column.property].status = false)
      event.stopPropagation()
    },
    add () {
      this.paper.authorData.push({ chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, work: { label: "", status: true }, connectStatus: false, firstStatus: false })
      console.log('this.paper.authorData', this.paper.authorData);
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

          .el-input {
            width: 240px;
            margin-top: 20px;
          }
        }
      }
      .authors {
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