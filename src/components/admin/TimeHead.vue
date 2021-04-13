<template>
  <div class="menu-wrapper">
    <div class="title">单位时间发表论文数</div>
    <div class="menu-right">
      <el-radio-group size="mini" v-model="text">
        <el-radio-button label="今年"></el-radio-button>
        <el-radio-button label="去年"></el-radio-button>
        <el-radio-button label="前年"></el-radio-button>
      </el-radio-group>
      <el-date-picker
        size="mini"
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        class="sales-view-date-picker"
        :picker-options="getOption()"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '今年',
      date: null,

    }
  },
  methods: {
    handleClick (pick, days) {
      let start = new Date()
      let end = new Date()
      start = start.setTime(start.getTime() - days * 24 * 3600 * 1000)
      pick.$emit('pick', [start, end])
    },
    getOption () {
      return {
        shortcuts: [
          {
            text: "最近一周",
            onClick: (pick) => {
              this.handleClick(pick, 7)
            }

          },
          {
            text: "最近一个月",
            onClick: (pick) => {
              this.handleClick(pick, 30)
            }
          },
          {
            text: "最近三个月",
            onClick: (pick) => {
              this.handleClick(pick, 92)
            }
          },
        ]
      }

    },
    handleSelect (index) {
      this.$emit('changeIndex', index)
    }
  }
}
</script>

<style lang='scss' scoped>
.menu-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  .title {
    font-weight: 600;
    font-size: 14px;
  }
  .sales-view-menu {
    width: 100%;
    padding-left: 20px;

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      margin: 0 20px;
    }
  }

  .menu-right {
    position: absolute;
    top: 0;
    right: 20px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .sales-view-date-picker {
      margin-left: 20px;
    }
  }
}
</style>