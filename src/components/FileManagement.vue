<template>
  <div class="fileManagement">
    <div class="left-wrapper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">上传文件</div>
      </div>
      <div class="left">
        <FileUpload></FileUpload>
      </div>
    </div>

    <div class="right">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">我的论文</div>
      </div>
      <div class="my-paper">
        <el-tree :data="paperData" @node-click="handleNodeClick">
          <div slot-scope="{node,data}" class="item-wrapper">
            <div class="catrgory-item" v-if="node.level === 1">
              <div class="label">{{data.label}}</div>
              <div class="number">{{+data.children.length}}</div>
            </div>
            <div
              v-if="node.level === 2"
              class="paper-item"
              @click="jumpToPaperDetail(node.data.paperId)"
            >
              <div class="paper-name">{{data.name}}</div>
              <div class="author-wrapper">
                <div v-for="item in data.authors" :key="item.id" class="author">{{item.name}}</div>
              </div>

              <div class="operation">
                <el-tooltip content="未发布" placement="bottom" effect="light" v-if="data.status">
                  <i class="el-icon-warning-outline" style="color:red"></i>
                </el-tooltip>
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
import FileUpload from './Fileupload'
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
              { name: '鹿晗', id: 0 }, { name: '王一博', id: 1 }
            ]
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
        }, {
          level: 1,
          label: '未发布',
          children: [{

            level: 2,
            name: "数据研究概论",
            paperId: 10,
          }],
        }
      ]
    }
  },
  methods: {
    jumpToPaperDetail (id) {
      console.log('id', id);
      localStorage.setItem('paperId', id)
      this.$router.push('/paperDetail')
    },
    /*  renderContent (h, { node, data }) {
       console.log('data', data);
       if (node.level === 1) {
         return (
           <span>{node.label}</span>
         )
       } else if (node.level === 2) {
 
         return (
           <div class='paper-item'>
 
             <i class="el-icon-edit"></i>
 
 
           </div>
         )
 
       }
     }, */
    handleNodeClick () {

    }
  },
  components: {
    FileUpload
  }
}
</script>
 
<style lang="scss" scoped>
.fileManagement {
  width: 60%;
  margin-left: 20%;
  .left-wrapper {
    width: 100%;
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
    .left {
    }
  }
  .right {
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

