<template>
  <div class="admin">
    <admin-number></admin-number>
    <div class="wrapper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">分类统计</div>
      </div>
      <div class="my-paper">
        <el-tree :data="paperData">
          <div slot-scope="{node,data}" class="item-wrapper">
            <div class="catrgory-item" v-if="node.level === 1 || node.level === 2">
              <div class="label">{{data.label}}</div>
              <div class="number">{{data.children?+data.children.length : 0}}</div>
            </div>
            <div v-if="node.level === 3" class="paper-item">
              <div class="paper-name">{{data.name}}</div>
              <div class="author-wrapper">
                <div v-for="item in data.authors" :key="item.id" class="author">{{item.name}}</div>
              </div>

              <div class="operation">
                <i class="el-icon-download"></i>
                <i class="el-icon-edit"></i>
              </div>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>
 
<script>
import AdminNumber from '../components/AdminNumber'
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
            name: "数据研究概论",
            authors: [
              { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }
            ]
          }],

        }, {

          label: "B类",
          level: 2,
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
    }
  }
}
</script>
 
<style lang="scss" scoped>
.admin {
  width: 60%;
  margin-left: 20%;
  box-sizing: border-box;
  .wrapper {
    margin-top: 20px;
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