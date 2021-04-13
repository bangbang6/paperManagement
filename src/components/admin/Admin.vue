<template>
  <div class="admin">
    <admin-number></admin-number>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="word-wrapper">
          <div class="line"></div>
          <div class="title">分类统计</div>
        </div>

        <div class="right">
          <div class="categorys">
            <el-radio v-model="category" label="1" size="mini">组别</el-radio>
            <el-radio v-model="category" label="2" size="mini">会议等级</el-radio>
          </div>
          <div class="time-picker">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="my-paper">
        <el-tree :data="paperData">
          <div slot-scope="{node,data}" class="item-wrapper">
            <div class="catrgory-item" v-if="node.level === 1 || node.level === 2">
              <div class="label">{{data.label}}</div>
              <div class="number">{{data.children?+data.children.length : 0}}</div>
            </div>
            <div
              v-if="node.level === 3"
              class="paper-item"
              @click="jumpToPaperDetail(node.data.paperId)"
            >
              <div class="paper-name">{{data.name}}</div>
              <div class="author-wrapper">
                <div
                  v-for="item in data.authors"
                  :key="item.id"
                  class="author"
                  @click="jumpToUserDetail"
                >{{item.name}}</div>
              </div>

              <div class="operation">
                <el-tooltip content="下载" placement="bottom" effect="light">
                  <i class="el-icon-download"></i>
                </el-tooltip>
                <el-tooltip content="编辑" placement="bottom" effect="light">
                  <i class="el-icon-edit"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>
 
<script>
import AdminNumber from './AdminNumber'
export default {
  components: {
    AdminNumber
  },
  data () {
    return {
      paperData: [{
        level: 1,
        label: '安全组',

        children: [{

          level: 2,
          label: "A类",

          children: [{
            level: 3,
            label: "A类",
            paperId: 0,
            name: "数据研究概论",
            authors: [
              { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }
            ]
          }],

        }, {

          label: "B类",
          level: 2,
          id: 1,
          name: "数据研究概论2",
          authors: [
            { name: '鹿晗2', id: 0 }, { name: '王一博2', id: 1 }
          ]

        }]
      }, {
        level: 1,
        label: '系统组',
        children: [{

          level: 2,

        }]
      }, {
        level: 1,
        label: '分布式',
        children: [{

          level: 2
        }]
      }],
      category: '1',
      timeRange: "",
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {
    jumpToUserDetail () {

    },
    jumpToPaperDetail (id) {
      console.log('id', id);
      localStorage.setItem('paperId', id)
      this.$router.push('/paperDetail')
    }
  },
  watch: {
    timeRange (newVal, oldVal) {
      console.log('newVale oldValue', newVal, oldVal);
    },
    category (newVal) {
      console.log('newVal', newVal);
      if (newVal === '2') {
        this.paperData = [{
          level: 1,
          label: 'Top80',

          children: [{

            level: 2,
            label: "A类",

            children: [{
              level: 3,
              label: "顶级",
              paperId: 0,
              name: "数据研究概论",
              authors: [
                { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }
              ]
            }],

          }, {

            label: "B类",
            level: 2,
            id: 1,
            name: "数据研究概论2",
            authors: [
              { name: '鹿晗2', id: 0 }, { name: '王一博2', id: 1 }
            ]

          }]
        }, {
          level: 1,
          label: '期刊',
          children: [{

            level: 2,

          }]
        }, {
          level: 1,
          label: '普通会议',
          children: [{

            level: 2
          }]
        }]
      } else if (newVal === '1') {
        this.paperData = [{
          level: 1,
          label: '安全组',

          children: [{

            level: 2,
            label: "A类",

            children: [{
              level: 3,
              label: "A类",
              paperId: 0,
              name: "数据研究概论",
              authors: [
                { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }
              ]
            }],

          }, {

            label: "B类",
            level: 2,
            id: 1,
            name: "数据研究概论2",
            authors: [
              { name: '鹿晗2', id: 0 }, { name: '王一博2', id: 1 }
            ]

          }]
        }, {
          level: 1,
          label: '系统组',
          children: [{

            level: 2,

          }]
        }, {
          level: 1,
          label: '分布式',
          children: [{

            level: 2
          }]
        }]
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.admin {
  width: 80%;
  margin-left: 10%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  background: white;
  height: calc(100% - 50px);
  .wrapper {
    margin-top: 20px;
    .title-wrapper {
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
      padding-left: 5px;
      .word-wrapper {
        display: flex;
        .line {
          background-color: rgb(64, 158, 255);
          height: 20px;
          width: 2px;
        }
        .title {
          margin-left: 5px;
        }
      }

      .right {
        display: flex;
        align-items: center;
        .categorys {
          width: 200px;
        }
        .timer-picker {
          width: 200px;
        }
      }
    }
    .my-paper {
      .item-wrapper {
        width: 100%;
        .catrgory-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .number {
            color: rgb(64, 158, 255);
          }
        }

        .paper-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .paper-name {
            width: 200px;
            font-size: 14px;
          }
          .author-wrapper {
            display: flex;
            .author {
              font-size: 14px;
              margin-right: 10px;
            }
          }

          .operation {
            color: rgb(64, 158, 255);
            i {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>