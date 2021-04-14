<template>
  <div class="backforward">
    <div class="title">
      <span></span>
      <span>{{title}}</span>
      <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
    </div>
    <div class="time-line">
      <el-timeline>
        <el-timeline-item timestamp="2021/4/12" placement="top">
          <div>
            <el-tag type="info">代老师</el-tag>
            <el-tag type="info">修改文件</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/4/3" placement="top">
          <div>
            <el-tag type="info">bang</el-tag>
            <el-tag type="info">修改文件</el-tag>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/4/2" placement="top">
          <div>
            <el-tag type="info">代老师</el-tag>
            <el-tag type="info">上传文件</el-tag>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      title: '',
      color: '#1b60ec'
    }
  },
  mounted () {
    this.title = this.$route.query.title + '溯源过程'
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
}
</style>