<template>
  <div class="meeting2-message">
    <div class="input">
      <span>分类:</span>

      <el-select v-model="meeting2.publicTypeId2" placeholder="分类信息" :style="{width:'200px'}">
        <el-option
          v-for="item in meetingOptions2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-checkbox v-model="meeting2.isTop80" size="mini" :style="{marginLeft:'20px'}">是否是Top80</el-checkbox>
    </div>
    <div class="input">
      <span>会议缩写</span>
      <el-input v-model="meeting2.suoxie"></el-input>
    </div>
    <div class="input">
      <span>会议报告人</span>
      <el-input v-model="meeting2.reporter"></el-input>
    </div>
    <div class="input">
      <span>时间:</span>

      <el-date-picker
        v-model="meeting2.conferenceTime"
        type="daterange"
        size="mini"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
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



    this.meetingOptions2 = [
      {
        value: 1,
        label: 'CCF A'
      },
      {
        value: 2,
        label: 'CCF B'
      },
      {
        value: 3,
        label: 'CCF C'
      },
    ]
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