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
            @click="jumpToPaperDetail(node.data.id,data.status)"
          >
            <span class="paper-name">{{data.title}}</span>
            <span class="author-wrapper">{{data.authors}}</span>
            <span class="meeting">{{data.name}}</span>

            <div class="operation">
              <!--  <el-tooltip content="未发布" placement="bottom" effect="light" v-if="data.status">
                <i class="el-icon-warning-outline" style="color:red"></i>
              </el-tooltip>-->
              <span>{{data.statusWord}}</span>
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
import { getMyFilelist } from '@/api/user'
import { Message } from 'element-ui';
import { types } from '@/api/type'
export default {
  data () {
    return {
      paperData: [

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
  },
  mounted () {
    getMyFilelist().then(res => {
      if (res.code === 200) {
        console.log('res', res);
        this.paperData = res.data.map((item, index) => {
          return {
            level: 1,
            label: index === 0 ? '一作' : index === 1 ? '通讯' : "其他",
            children: item.map(item2 => ({
              ...item2,
              label: 2,
              statusWord: types[item2.status]
            }))
          }
        })
        console.log('this.paperData', this.paperData);
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
  }
}
</script>
 
<style lang="scss" scoped>
.right {
  width: 80%;
  margin-left: 10%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  /* height: calc(100% - 50px); */
  height: 100%;
  background: white;
  overflow-y: auto;

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
          width: 10%;
          float: right;
          font-size: 12px;
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