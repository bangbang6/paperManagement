<template>
  <div class="meeting-message">
    <div class="input">
      <span>issn:</span>
      <el-input v-model="qikan.periodicalIssn"></el-input>
    </div>
    <div class="input">
      <span>页码:</span>
      <el-input v-model="qikan.periodicalPage"></el-input>
    </div>
    <div class="input">
      <span>doi:</span>
      <el-input v-model="qikan.periodicalDoi"></el-input>
    </div>

    <div class="input">
      <span>年份:</span>
      <el-input v-model="qikan.periodicalYear"></el-input>
    </div>
    <div class="input">
      <span>卷号:</span>
      <el-input v-model="qikan.periodicalVolumeNum"></el-input>
    </div>

    <div class="input">
      <span>期刊号:</span>
      <el-input v-model="qikan.periodicalIssueNum"></el-input>
    </div>
    
    <div class="input">
      <span>期刊号:</span>
      <el-input v-model="qikan.periodicalIssueNum"></el-input>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    qikan: Object
  },
  data () {
    return {

    }
  }
}
</script>
 
<style lang="scss" scoped>
.meeting-message {
  width: 100%;
  font-size: 14px;
  margin-top: 10px;

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
}
</style>