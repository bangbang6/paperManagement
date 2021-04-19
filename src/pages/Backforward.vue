<template>
  <div class="backforward">
    <div class="title">
      <el-button type="primary" size="mini" @click="$router.back()" :style="{marginLeft:'40px'}">返回</el-button>
      <span>{{title}}</span>
      <span></span>
    </div>
    <div class="time-line">
      <el-timeline>
        <el-timeline-item
          v-for="item in historys"
          :timestamp="formatDate(item.updateTime)"
          :key="item.id"
          placement="top"
        >
          <div>
<<<<<<< HEAD
            <el-tag type="info">{{item.updateUsername}}</el-tag>
            <el-tag type="info">{{item.updateUserOrg}}</el-tag>
            <el-tag type="info">{{item.op}}</el-tag>
            <el-tag type="info">交易号:x4500003417800</el-tag>
            <el-tag type="info">区块号:200462014</el-tag>
          </div>
        </el-timeline-item>
=======
            <el-tag type="info">张老师</el-tag>
            <el-tag type="info">北京邮电大学网络空间安全学院</el-tag>
            <el-tag type="info">修改文件</el-tag>
            <el-tag type="info">交易号:0X8321e23a9231266</el-tag>
            <el-tag type="info">区块号:750432105</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/4/3" placement="top">
          <div>
            <el-tag type="info">王老师</el-tag>
            <el-tag type="info">广西密码学与信息安全重点实验室</el-tag>
            <el-tag type="info">修改文件</el-tag>
            <el-tag type="info">交易号:0Xaf323230133423</el-tag>
            <el-tag type="info">区块号:750432104</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/4/2" placement="top">
          <div>
            <el-tag type="info">张老师</el-tag>
            <el-tag type="info">北京邮电大学网络空间安全学院</el-tag>
            <el-tag type="info">修改文件</el-tag>
            <el-tag type="info">交易号:0X8321e23a9231265</el-tag>
            <el-tag type="info">区块号:750432103</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/4/1" placement="top">
          <div>
            <el-tag type="info">王老师</el-tag>
            <el-tag type="info">广西密码学与信息安全重点实验室</el-tag>
            <el-tag type="info">修改文件</el-tag>
            <el-tag type="info">交易号:0Xaf323230133422</el-tag>
            <el-tag type="info">区块号:750432102</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/3/28" placement="top">
          <div>
            <el-tag type="info">张老师</el-tag>
            <el-tag type="info">北京邮电大学网络空间安全学院</el-tag>
            <el-tag type="info">修改文件</el-tag>
            <el-tag type="info">交易号:0X8321e23a9231264</el-tag>
            <el-tag type="info">区块号:750432101</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/3/26" placement="top">
          <div>
            <el-tag type="info">代老师</el-tag>
            <el-tag type="info">华中科技大学cgcl实验室</el-tag>
            <el-tag type="info">上传文件</el-tag>
            <el-tag type="info">交易号:0X47456789138002</el-tag>
            <el-tag type="info">区块号:750432100</el-tag>
          </div>
        </el-timeline-item>
>>>>>>> 44199b1 (修改数据100%)
      </el-timeline>
    </div>
  </div>
</template>
 
<script>
import { getHistory } from '@/api/chain'
import { Message } from 'element-ui'
export default {
  methods: {
    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
  },
  data () {
    return {
      title: '',
      color: '#1b60ec',
      historys: []
    }
  },
  mounted () {
    this.title = this.$route.query.title + '溯源信息'
    getHistory(this.$route.query.id).then(res => {
      if (res.code === 200) {
        this.historys = res.data
      } else {
        Message({
          message: res.msg,
          status: 'error',
          duration: 1000
        })
      }
    })

  }
}
</script>
 
<style lang="scss" scoped>
.backforward {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  .title {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 18px;
  }
  .time-line {
    padding-top: 100px;
  }
  .el-tag {
    margin-right: 10px;
  }
}
</style>