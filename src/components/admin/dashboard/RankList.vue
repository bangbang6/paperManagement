<template>
  <div class="rank-list">
    <div class="title">成果数目</div>
    <v-chart :options="options"></v-chart>
  </div>
</template>
 
<script>
export default {
  data () {
    let mockData = []
    for (let i = 0; i < 4; ++i) {
      mockData.push(Math.round(Math.random() * 200));
    }
    return {

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
          barWidth: '10',
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
          data[i] += Math.round(Math.random() * 2000);
        }
        else {
          data[i] += Math.round(Math.random() * 200);
        }
      }

      this.options.series.data = data


    }
  }
}
</script>
 
<style lang="scss" scoped>
.rank-list {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: calc(100% - 20px);
  }
  .title {
    padding-left: 10px;
    box-sizing: border-box;
    font-weight: 500;
    color: white;
    font-size: 18px;
    height: 20px;
  }
}
</style>