<template>
  <div class="meeting-message">
    <div class="input">
      <span>分类:</span>
      <el-select v-model="qikan.publicTypeId2" placeholder="分类信息" :style="{width:'200px'}">
        <el-option
          v-for="item in qikanOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="qikan.publicTypeId3"
        placeholder="分类信息"
        v-if="qikan.publicTypeId2"
        :style="{marginLeft:'20px',width:'200px'}"
      >
        <el-option
          v-for="item in qikanOptions2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-checkbox v-model="qikan.firstPublish" size="mini" :style="{marginLeft:'20px'}">是否首发</el-checkbox>
    </div>
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
      <span>期刊缩写:</span>
      <el-input v-model="qikan.suoxie"></el-input>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    qikan: Object
  },
  data () {
    this.qikanOptions = [
      {
        value: 1,
        label: "ACM Trans"
      },
      {
        value: 2,
        label: "ACM期刊"
      },
      {
        value: 3,
        label: "IEEE Trans"
      },
      {
        value: 4,
        label: "IEEE期刊"
      },
      {
        value: 5,
        label: "IEEE期刊-IEEE Access"
      },
      {
        value: 6,
        label: "其他"
      },
    ]


    this.qikanOptions2 = [
      {
        value: 7,
        label: 'CCF A'
      },
      {
        value: 8,
        label: 'CCF B'
      },
      {
        value: 9,
        label: 'CCF C'
      },
    ]


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