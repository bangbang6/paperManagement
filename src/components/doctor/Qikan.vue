<template>
  <div class="meeting-message">
    <div class="input">
      <span>期刊:</span>
      <el-input v-model="qikan.name"></el-input>
    </div>
    <div class="input">
      <span>issn:</span>
      <el-input v-model="qikan.issn"></el-input>
    </div>
    <div class="input">
      <span>页码:</span>
      <el-input v-model="qikan.page"></el-input>
    </div>
    <div class="input">
      <span>doi:</span>
      <el-input v-model="qikan.doi"></el-input>
    </div>
    <div class="input">
      <span>年份:</span>
      <el-input v-model="qikan.year"></el-input>
    </div>
    <div class="input">
      <span>卷号:</span>
      <el-input v-model="qikan.juanhao"></el-input>
    </div>
    <div class="input">
      <span>期刊号:</span>
      <el-input v-model="qikan.qikanhao"></el-input>
    </div>
    <div class="input">
      <span>摘要:</span>
      <el-input v-model="qikan.zaiyao" type="textarea" :rows="6"></el-input>
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