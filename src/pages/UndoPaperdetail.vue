<template>
  <div class="paper-detail" @click="clear">
    <el-card shadow="always">
      <div class="title">
        <el-button type="primary" size="mini" @click="back">返回</el-button>
        <span>{{paper.title}}</span>
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
            <el-input v-model="paper.title"></el-input>
          </div>

          <!-- <div class="authors">
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
              <el-table-column label="英文名" prop="englishName">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row[scope.column.property].status"
                  >{{scope.row.englishName.label}}</div>
                  <el-input v-model="scope.row.englishName.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" prop="email">
                <template slot-scope="scope">
                  <div v-if="scope.row[scope.column.property].status">{{scope.row.email.label}}</div>
                  <el-input v-model="scope.row.email.label" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column label="所在单位" prop="group">
                <template slot-scope="scope">
                  <div v-if="scope.row[scope.column.property].status">{{scope.row.group.label}}</div>
                  <el-input v-model="scope.row.group.label" v-else></el-input>
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
          </div>-->
          <div class="authors2">
            <span :style="{marginTop:'6px'}">作者:</span>
            <div class="right2">
              <div class="author" v-for="(author,authorIndex) in paper.authors" :key="authorIndex">
                <div class="first-line">
                  <div class="chinese-name">
                    <span>中文名:</span>
                    <el-input v-model="author.chineseName.label"></el-input>
                  </div>
                  <div class="engish-name">
                    <span>英文名:</span>
                    <el-input v-model="author.engishName.label"></el-input>
                  </div>
                  <div class="email">
                    <span>邮箱:</span>
                    <el-input v-model="author.email.label"></el-input>
                  </div>
                  <div class="connect">
                    <span>通讯:</span>
                    <el-checkbox v-model="author.connect"></el-checkbox>
                  </div>
                  <div class="first">
                    <span>一作:</span>
                    <el-checkbox v-model="author.first"></el-checkbox>
                  </div>
                </div>
                <div class="group-wrapper">
                  <span>单位:</span>
                  <div class="wrapper2">
                    <div
                      class="group"
                      v-for="(group,groupIndex) in author.groups"
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
          <div class="publish-message">
            <span>发表信息:</span>
            <div class="meeting-wrapper">
              <div class="select-wrapper">
                <el-select v-model="meeting.publicTypeId" placeholder="发表类别">
                  <el-option
                    v-for="item in meeting.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="meeting.publicTypeId2"
                  placeholder="具体类别"
                  v-if="meeting.publicTypeId"
                  :style="{marginLeft:'20px'}"
                >
                  <el-option
                    v-for="item in meeting.options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="input-wrapper">
                <el-input v-model="paper.name" placeholder="名称"></el-input>
                <el-input v-model="paper.website" placeholder="网址"></el-input>
                <el-date-picker
                  v-model="paper.conferenceDeadline"
                  type="date"
                  placeholder="截止日期"
                  v-if="meeting.publicTypeId === 1 || meeting.publicTypeId ===2"
                ></el-date-picker>
              </div>
            </div>
          </div>
          <div class="input">
            <span>查重结果:</span>
            <div>{{paper.duplicateCheckResultId}}</div>
          </div>
          <div class="input">
            <span>论文状态:</span>
            <div>
              <el-radio v-model="paper.hasAccepted" :label="1">已收录</el-radio>
              <el-radio v-model="paper.hasAccepted" :label="0">未收录</el-radio>
            </div>
          </div>
        </div>
      </div>
      <Qikan v-if="paper.hasAccepted === 1 && (meeting.publicTypeId === 7 )" :qikan="qikan"></Qikan>
      <Meeting2
        v-if="paper.hasAccepted === 1 && (meeting.publicTypeId === 1 || meeting.publicTypeId ===2)"
        :meeting2="meeting2"
      ></Meeting2>
      <el-button type="primary" style="margin-top:20px;" @click="submit">提交</el-button>
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
import { Message } from 'element-ui'
import Meeting2 from '../components/doctor/Meeting2'
import Qikan from '../components/doctor/Qikan'
import { getPaperDetail } from '@/api/paper'
import { getTypeTree } from '@/api/meeting'
import { updateFile } from '@/api/user'
export default {
  components: {
    Meeting2, Qikan
  },
  data () {
    return {
      paper: {

      },
      meeting2: {

      },
      meeting: {

        options: [],
        options2: [],
        publicTypeId2: '',
        publicTypeId: ''
      },
      qikan: {}
    }
  },
  mounted () {
    this.paperId = localStorage.getItem('paperId')
    console.log(' this.paperId', this.paperId);
    if (!this.paperId) {

      Message.error("论文id出错")

      return
    }
    getPaperDetail(+this.paperId).then(res => {
      if (res.code === 200) {
        console.log('res', res);
        this.paper = res.data
        this.qikan = {
          periodicalIssn: res.data.periodicalIssn,
          periodicalDol: res.data.periodicalDol,
          periodicalIssueNum: res.data.periodicalIssueNum,
          periodicalIssuePage: res.data.periodicalIssuePage,
          periodicalVolumnNum: res.data.periodicalVolumnNum,
          periodicalYear: res.data.periodicalYear
        }
        this.meeting2 = {
          conferenceTime: res.data.conferenceTime,
          conferenceSite: res.data.conferenceSite
        }
        if (res.data.publicTypeId === 1 || res.data.publicTypeId === 2 || res.data.publicTypeId === 7) {
          this.meeting.publicTypeId = res.data.publicTypeId
        } else {
          //处理只给了二层id的问题
          let publicTypeId = 1
          if (res.data.publicTypeId === 3 || res.data.publicTypeId === 4 || res.data.publicTypeId === 5 || res.data.publicTypeId === 6) {
            publicTypeId = 2
          } else if (res.data.publicTypeId === 8 || res.data.publicTypeId === 9 || res.data.publicTypeId === 10 || res.data.publicTypeId === 11) {
            publicTypeId = 7
          }
          this.meeting.publicTypeId = publicTypeId
          this.meeting.publicTypeId2 = res.data.publicTypeId

        }

      } else {
        Message.error(res.msg)
      }
    })
    getTypeTree().then(res => {
      console.log('res', res);
      this.meeting.options = res.map(item => {
        return {
          id: item.id,
          children: item.children ? item.children : [],
          label: item.typeName,
          value: item.id
        }
      })

    })
  },
  methods: {
    submit () {
      let obj = {
        ...this.paper,
        ...this.meeting2,
        ...this.meeting,
        ...this.qikan,
        id: this.paperId
      }
      if (!obj.id || !obj.title || !obj.website || !obj.name || !obj.publicTypeId) {
        Message.error('必要信息不能为空')
        return
      }
      updateFile(obj).then(res => {
        if (res.code === 200) {
          console.log('res', res);
        } else {
          Message.error(res.msg)
        }
      })
    },
    back () {
      this.$router.back()
    },
    addAuthor () {
      this.paper.authors.push({ chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, groups: [{ label: "", status: true }], connect: false, first: false },)
    },
    addGroup (index1) {
      this.paper.authors[index1].groups.push({
        label: "",
        status: ""
      })
    },
    deleteGroup (index1, index2) {
      this.paper.authors[index1].groups.splice(index2, 1)
    }

  },
  computed: {
    paperStatusWord () {
      return this.paperStatus === 0 ? "已发布" : "未发布"
    }
  },
  watch: {
    'meeting.publicTypeId': {
      handler (newV) {
        console.log('newV', newV);
        this.meeting.publicTypeId2 = ''
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
          .select-wrapper {
            display: flex;
            .el-input {
              width: 240px;
              margin-top: 20px;
            }
          }
          .input-wrapper {
            display: flex;
            flex-direction: column;

            .el-input {
              width: 240px;
              margin-top: 20px;
            }
          }
        }
      }
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