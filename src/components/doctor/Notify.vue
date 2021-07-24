<template>
  <div class="notify">
    <div class="category">
      <el-tabs v-model="activeName">
        <el-tab-pane label="消息通知" name="通知" class="tab">
          <el-card shadow="always" v-for="paper in undoPapers" :key="paper.id" class="card">
            <div class="left">
              <img src="@/assets/dblp.png" alt class="dblppng" />
            </div>
            <div class="right" :style="{width:'100%'}">
              <div class="title">
                <span>{{`你有新的${paper.publicType===1?'会议':'期刊'}在dblp上发表:`}}</span>
                <span class="paperTitle">{{paper.title}}</span>
                <el-tag
                  size="mini"
                  type="success"
                  :style="{float:'right'}"
                  effect="dark"
                >{{paper.year}}</el-tag>
              </div>
              <div class="authors">
                <span>作者:</span>
                <span>{{paper.authors}}</span>
              </div>
              <div class="doi">
                <span>doi:</span>
                <a :href="paper.doi" class="doia">{{paper.doi}}</a>
              </div>
              <div class="operation">
                <el-button size="mini" type="primary" @click="jumpToWrite(paper.id)">去填写</el-button>
                <el-button size="mini" type="danger" @click="ingore(paper.id)">忽略</el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
 
<script>
import { getUndoDblpData, doDblpData } from '@/api/dblp'
import { Message } from 'element-ui'
import { Bus } from '@/main.js'

export default {
  data () {
    return {
      activeName: '通知',
      undoPapers: []
    }
  },
  methods: {
    ingore (id) {
      doDblpData(id).then(res => {
        if (res.code === 200) {
          Message({
            type: "success",
            duration: '1000',
            message: "已忽略"
          })
          this.init()
        } else {
          Message({
            type: "error",
            duration: '1000',
            message: "失败"
          })
        }
      })
    },
    init () {
      getUndoDblpData().then(res => {
        if (res.code === 200) {
          console.log('paper', res.data)
          this.undoPapers = res.data
          Bus.$emit('refresh')
        }
      })
    },
    jumpToWrite (id) {
      this.$router.push({
        path: "/teacher/fileManagement",
        query: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.init()

  }
}
</script>
 
<style lang="scss" scoped>
.notify {
  width: 100%;
  .category {
    width: 80%;

    margin-left: 10%;
    font-size: 12px;
    ::v-deep .el-card__body {
      display: flex;
      .left {
        width: 80px;
        display: flex;

        align-items: center;
      }
      .dblppng {
        width: 56px;
        height: 56px;
      }
      .operation {
        margin-top: 10px;
      }
      .doi {
        margin-top: 10px;
        .doia {
          margin-left: 4px;
          color: #007fff;
        }
      }
      .authors {
        margin-top: 10px;
      }
      .title {
        width: 100%;
        .paperTitle {
          margin-left: 6px;
          color: #007fff;
        }
      }
    }
  }
}
</style>