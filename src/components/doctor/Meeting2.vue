<template>
  <div class="meeting2-message">
    <div class="input">
      <span>时间:</span>
      <el-date-picker v-model="meeting2.conferenceTime" type="date" placeholder="会议时间"></el-date-picker>
    </div>
    <div class="input">
      <span>地点:</span>
      <el-input v-model="meeting2.conferenceSite"></el-input>
    </div>
    
  </div>
</template>
 
<script>
export default {
  props: {
    meeting2: Object
  },
  data () {
    return {

    }
  }
}
</script>
 
<style lang="scss" scoped>
.meeting2-message {
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