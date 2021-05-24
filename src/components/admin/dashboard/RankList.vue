<template>
  <div class="rank-list">
    <div class="title">
      各组成果
      <el-radio-group v-model="radio" style="margin-left: 35%" size="mini" @change="change">
        <el-radio-button label="1">现在</el-radio-button>
        <el-radio-button label="12">近一年</el-radio-button>
        <el-radio-button label="3">近三月</el-radio-button>
      </el-radio-group>
    </div>
    <v-chart :options="options"></v-chart>
  </div>
</template>
 
<script>
export default {
  data () {

    return {
      radio: "1",
      nowData: [132, 85, 93, 116],
      options: {
        xAxis: {
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          data: ['安全组', '云计算组', '系统组', '大数据组'],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          axisLabel: {
            color: 'white',
            height: 58,
            fontSize: 12

          },
          max: 3 // only the largest 4 bars will be displayed
        },
        series: {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: [],
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          },

          barWidth: '60%',
          itemStyle: {
            color: (params) => {
              var colorList = ['#74fbf5', '#49a7f8', '#9c00ff', '#236fff']
              return colorList[params.dataIndex]
            }
          }
        },
        grid: {
          left: 58,
          top: 20,
          bottom: 0
        },

        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {

    run (value) {
      let data = [...this.options.series.data]
      for (var i = 0; i < data.length; ++i) {
          data[i]+= +value;
      }
      this.options.series.data = data
    },
    init () {
      console.log('nowData', this.nowData);
      this.options.series.data = this.nowData

    },
    change (value) {
      if (value === '1') {
        this.timer && clearInterval(this.timer)
        this.init()
      } else {
          let data = [...this.options.series.data]
          for (var i = 0; i < data.length; ++i) {
              data[i] -= 5*+value;
          }
        this.options.series.data = data
        let count = 0
        this.timer = setInterval(() => {
          count++
          this.run(value)
          if (count === 5) clearInterval(this.timer)
        }, 1000)
      }
    },
  }
}
</script>
 
<style lang="scss" scoped>
.rank-list {
  //margin-top: 20px;
  width: 100%;
  height: 80%;
  .echarts {
    background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
    /*设置大小*/
    margin-top: 10px;
    background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem,
      0.9rem 0.15rem;
    background-color: #60626621;
    width: 100%;
    height: 100%;
  }
  .title {
    display: flex;
    padding-left: 10px;
    box-sizing: border-box;
    font-weight: 500;
    color: white;
    font-size: 18px;
    height: 20px;
  }
  .el-radio {
    margin-right: 10px;
  }
}
</style>