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
            <div class="number">{{data.children && +data.children.length}}</div>
          </div>
          <div
            v-if="node.level === 2"
            class="paper-item"
            @click="jumpToPaperDetail(node.data.id,data.status)"
          >
            <div class="paper-name">{{data.title}}</div>
            <div class="author-wrapper">{{data.authors}}</div>
            <div class="meeting">{{data.name}}</div>

            <!-- <div class="operation">
               <el-tooltip content="未发布" placement="bottom" effect="light" v-if="data.status">
                <i class="el-icon-warning-outline" style="color:red"></i>
            </el-tooltip>-->
            <!-- <span>已上链</span> -->
            <!-- <span>{{data.statusWord}}</span> -->
            <!-- <el-tooltip content="下载" placement="bottom" effect="light">
                <i class="el-icon-download"></i>
            </el-tooltip>-->
            <!-- <el-tooltip content="编辑" placement="bottom" effect="light">
                <i class="el-icon-edit"></i>
              </el-tooltip>
            </div>-->
          </div>
        </div>
      </el-tree>
    </div>
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="title">我的专利</div>
    </div>
    <div class="my-paper">
      <el-tree :data="patentData">
        <div slot-scope="{node,data}" class="item-wrapper">
          <div class="catrgory-item" v-if="node.level === 1">
            <div class="label">{{data.label}}</div>
            <div class="number">{{data.children && +data.children.length}}</div>
          </div>
          <div
            v-if="node.level === 2"
            class="paper-item"
            @click="jumpToPaperDetail(node.data.id,data.status)"
          >
            <span class="paper-name">{{data.title}}</span>
            <span class="author-wrapper">{{data.authors}}</span>
            <span class="author-wrapper">{{data.num}}</span>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>
 
<script>
import { getMyFilelist } from '@/api/user'
export default {
  data () {
    return {
      paperData: [

      ],
      patentData: [
        [
          {
            label: "发明",
            title: "一种区块链之间的跨链方法及主区块链",
            num: "202110150007 .7",
            authors: "代炜琦",
          },
          {
            label: "发明",
            title: "在区块链上签名、验证的方法及装置",
            num: "202120350007 .8",
            authors: "金海，代炜琦",
          },
          {
            label: "发明",
            title: "Blockchain node equipment and blockchain network system",
            num: "202110150002 .3",
            authors: "陆琦峰，代炜琦",
          }
        ],
        [
          {
            label: "实用新型",
            title: "一种基于区块链技术的数据存证系统",
            num: "202110150345 .6",
            authors: "代炜琦，陈婷婷",
          },
          {
            label: "实用新型",
            title: "Computer case for blockchain computing",
            num: "202010150072 .0",
            authors: "代炜琦，郭松",
          },
          {
            label: "实用新型",
            title: "Information processing device based on block chain payment",
            num: "202010150223 .4",
            authors: "代炜琦",
          }
        ],
        [
          {
            label: "外观设计",
            title: "区块链设备壳体",
            num: "202110150348 .9",
            authors: "代炜琦，王泽丽",
          },
          {
            label: "外观设计",
            title: "用于区块链浏览器图形用户界面的显示屏幕面板",
            num: "202010150006 .7",
            authors: "张严，代炜琦",
          },
        ]

      ],
    }
  },
  methods: {
    
    jumpToPaperDetail (id, status) {
      //这里专利做特殊处理
      if (typeof (id) === "undefined") {
        this.$router.push(`/patentdetail`)
        return
      }
      console.log('id', id);
      localStorage.setItem('paperId', id)
      if (+status === 3 || +status === 4 || +status === 6 || +status === 7) {
        this.$router.push(`/undoPaperDetail`)
      } else {
        this.$router.push('/paperdetail')
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
              /* statusWord: types[item2.status] */
            }))
          }
        })
        console.log('this.paperData', this.paperData);
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
    this.patentData = this.patentData.map((item, index) => {
      return {
        level: 1,
        label: index === 0 ? '发明' : index === 1 ? '实用新型' : "外观设计",
        children: item.map(item2 => ({
          ...item2,
          level: 2,
          /*  statusWord: types[item2.status] */
        }))
      }
    })
    console.log(this.patentData)
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
          width: 30%;

          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;

          overflow: hidden;
        }
        /* .operation {
          width: 10%;

          font-size: 12px;
          color: rgb(64, 158, 255);
          i {
            margin-left: 5px;
          }
        } */
      }
    }
  }
}
</style>