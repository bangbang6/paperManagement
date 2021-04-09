<template>
  <div class="edit-meeting">
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="top80会议">
        <div class="title-wrapper">
          <span>Tips:按下空格可搜索</span>
          <el-button type="primary" size="mini">确定</el-button>
        </div>
        <div class="items">
          <div class="item">
            <span>1.</span>
            <el-select v-model="value" placeholder="请选择" size="mini" filterable allow-create>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>2.</span>
            <el-select v-model="value2" placeholder="请选择" size="mini" filterable allow-create>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>3.</span>
            <el-select v-model="value3" placeholder="请选择" size="mini" filterable allow-create>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>4.</span>
            <el-select v-model="value4" placeholder="请选择" size="mini" filterable allow-create>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      value2: '',
      value3: '',
      value4: '',

    }
  },
  methods: {
    filter (message) {
      console.log(message);

    }
  }
}
</script>
 
<style lang="scss" scoped>
.edit-meeting {
  width: 60%;
  margin-left: 20%;
  margin-top: 20px;
  .title-wrapper {
    width: 100%;
    display: flex;
    align-items: center;

    justify-content: space-between;
    span {
      font-size: 14px;
    }
  }
  .items {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      align-items: center;
      margin-top: 10px;
      display: flex;
      margin-right: 20px;
      .select {
        width: 150px;
      }

      span {
        display: inline-block;
        width: 25px;
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang='scss'>
</style>