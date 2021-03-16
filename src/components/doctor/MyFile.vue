<template>
  <div class="right">
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="title">我的论文</div>
    </div>
    <div class="my-paper">
      <el-tree :data="paperData">
        <div slot-scope="{node,data}" class="item-wrapper">
          <div class="catrgory-item" v-if="node.level === 1">
            <div class="label">{{data.label}}</div>
            <div class="number">{{+data.children.length}}</div>
          </div>
          <div
            v-if="node.level === 2"
            class="paper-item"
            @click="jumpToPaperDetail(node.data.paperId,data.status)"
          >
            <span class="paper-name">{{data.name}}</span>
            <span class="author-wrapper">{{getAuthorName(data.authors)}}</span>
            <span class="meeting">{{data.meeting}}</span>

            <div class="operation">
              <el-tooltip content="未发布" placement="bottom" effect="light" v-if="data.status">
                <i class="el-icon-warning-outline" style="color:red"></i>
              </el-tooltip>
              <!-- <el-tooltip content="下载" placement="bottom" effect="light">
                <i class="el-icon-download"></i>
              </el-tooltip>-->
              <!-- <el-tooltip content="编辑" placement="bottom" effect="light">
                <i class="el-icon-edit"></i>
              </el-tooltip>-->
            </div>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      paperData: [
        {
          level: 1,
          label: '一作',

          children: [{
            status: 0,
            level: 2,
            name: "数据研究概论",
            paperId: 1,
            authors: [
              { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }, { name: '张艺兴', id: 2 }, { name: '黄子韬', id: 3 }, { name: '吴亦凡', id: 4 }, { name: '黄晓明', id: 4 }, { name: '黄晓明', id: 4 }
            ],
            meeting: 'science nature'
          }, {
            status: 1,

            level: 2,
            name: "数据研究概论2",
            authors: [
              { name: '鹿晗2', id: 0 }, { name: '王一博2', id: 1 }
            ]

          }]
        }, {
          level: 1,
          label: '通讯',
          children: [{

            level: 2,

          }]
        }, {
          level: 1,
          label: '其他',
          children: [{

            level: 2
          }]
        }
      ]
    }
  },
  methods: {
    jumpToPaperDetail (id, status) {
      console.log('id', id);
      localStorage.setItem('paperId', id)
      if (status === 0) {
        this.$router.push(`/paperDetail`)
      } else {
        this.$router.push('/undoPaperdetail')
      }

    },
    getAuthorName (authors) {

      return authors && authors.map(item => item.name).join(',')
    }
  }
}
</script>
 
<style lang="scss" scoped>
.right {
  width: 60%;
  margin-left: 20%;
  flex: 1;
  box-sizing: border-box;
  .title-wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
    .line {
      background-color: rgb(64, 158, 255);
      height: 20px;
      width: 2px;
    }
    .title {
      margin-left: 5px;
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
          display: block;
          width: 30%;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .author-wrapper {
          width: 30%;
          white-space: nowrap;
          overflow: hidden;
          font-size: 14px;
          text-overflow: ellipsis;
          margin-right: 10px;
          display: block;

          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .meeting {
          display: block;
          width: 30%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .operation {
          width: 3%;
          float: right;
          color: rgb(64, 158, 255);
          i {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>