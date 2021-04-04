<template>
  <div class="file-message" @click="clear">
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

        <div class="authors">
          <span>作者:</span>
          <el-table :data="paper.authors" size="mini" @cell-click="click">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="中文名" prop="chineseName">
              <template slot-scope="scope">
                <div v-if="scope.row[scope.column.property].status">{{scope.row.chineseName.label}}</div>
                <el-input v-model="scope.row.chineseName.label" v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column label="英文名" prop="englishName">
              <template slot-scope="scope">
                <div v-if="scope.row[scope.column.property].status">{{scope.row.englishName.label}}</div>
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
              >
                <el-option
                  v-for="item in meeting.options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>

            <el-input v-model="meeting.name" placeholder="名称"></el-input>
            <el-input v-model="meeting.website" placeholder="网址"></el-input>
            <el-date-picker
              v-model="meeting.conferenceDeadline"
              type="date"
              placeholder="截止日期"
              v-if="meeting.publicTypeId === 1 || meeting.publicTypeId ===3"
            ></el-date-picker>
          </div>
        </div>

        <div class="input">
          <span>论文状态:</span>
          <div>
            <el-radio v-model="paper.hasAccepted" :label="1">已收录</el-radio>
            <el-radio v-model="paper.hasAccepted" :label="0">未收录</el-radio>
            <el-checkbox v-model="paper.firstCommit">是否为第一次投稿</el-checkbox>
          </div>
        </div>
        <Qikan
          v-if="paper.hasAccepted === 1 && (meeting.selectType === 7 )"
          :qikan="fileMessage.qikan"
        ></Qikan>
        <Meeting2
          v-if="paper.hasAccepted === 1 && (meeting.selectType === 1 || meeting.selectType ===2)"
          :meeting2="fileMessage.meeting2"
        ></Meeting2>
      </div>
    </div>
  </div>
</template>
 
<script>
import Meeting2 from './Meeting2'
import Qikan from './Qikan'
export default {
  props: {
    fileMessage: Object
  },
  computed: {
    paper () {
      return this.fileMessage.paper
    },
    meeting () {
      return this.fileMessage.meeting
    }
  },
  components: {
    Meeting2, Qikan
  },
  data () {
    return {



    }
  },
  methods: {

    clear () {

      this.paper.authors.forEach(item => {
        for (let key in item) {
          if (key === 'connectStatus' || key === 'firstStatus') {
            continue
          }
          else item[key].status = true
        }
      })
    },
    click (row, column, cell, event) {
      this.paper.authors.forEach(item => {
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
      this.paper.authors.push({ chineseName: { label: "", status: true }, englishName: { label: "", status: true }, email: { label: "", status: true }, group: { label: "", status: true }, connectStatus: false, firstStatus: false })
      console.log('this.paper.authorData', this.paper.authors);
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
        .select-wrapper {
          display: flex;
          .el-select {
            width: 240px;

            margin-right: 20px;
          }
        }
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
<style >
.el-icon-arrow-up {
  height: 30px !important;
  line-height: 30px;
}
.el-icon-date {
  height: 40px;
}
</style>