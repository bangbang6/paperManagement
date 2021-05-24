<template>
  <div class="rank-list">
    <div class="title">各组成果
        <el-radio-group v-model="radio" style="margin-left: 25%" @change="change">
            <el-radio  label="1">现在</el-radio>
            <el-radio  label="2">近一月</el-radio>
            <el-radio  label="3">近三月</el-radio>
        </el-radio-group>>
    </div>
    <v-chart :options="options"></v-chart>
  </div>
</template>
 
<script>
export default {
  data () {
    let mockData = []
    for (let i = 0; i < 4; ++i) {
      mockData.push(0);
    }
    return {
        radio:"1",
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
          data: mockData,
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

    setTimeout(() => {
      this.run();
    }, 0);
    setInterval(() => {
      this.run();
    }, 3000);
  },
  methods: {
      run () {
          let data = [...this.options.series.data]

          for (var i = 0; i < data.length; ++i) {
              if (Math.random() > 0.9) {
                  data[i] += Math.round(Math.random() * 50);
              }
              else {
                  data[i] += Math.round(Math.random() * 10);
              }
          }
          this.options.series.data = data
      },

      change(value){
          console.log("选中："+value);
          let data = [...this.options.series.data]
          for (var j = 0; j < data.length; ++j) {
              data[j] = 0;
          }
          for (var i = 0; i < data.length; ++i) {
              if (Math.random() > 0.9) {
                  data[i] += Math.round(Math.random() * 50);
              }
              else {
                  data[i] += Math.round(Math.random() * 10);
              }
          }
          this.options.series.data = data
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
      linear-gradient(to bottom,#74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
      /*设置大小*/
      margin-top: 10px;
      background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem, 0.9rem 0.15rem;
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
    .el-radio{
        margin-right: 10px;
    }
}
</style>