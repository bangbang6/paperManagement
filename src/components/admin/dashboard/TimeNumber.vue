<template>
  <div class="time-number">
    <div class="title">成果数量趋势</div>
    <v-chart :options="getOption()"></v-chart>
  </div>
</template>
 
<script>

export default {
  data () {
    return {

    }
  },
  methods: {
    getOption () {
      return {
        xAxis: {
          type: 'category',
          boundaryGup: false,
          show: true,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisLabel: {
            show: true,
            fontSize: 12,
            color: '#eee'
          }
        },
        yAxis: {
            show:false
        },
        tooltip: {
          show: true,
          formatter: (param) => {
            console.log('param', param);
            return `${param.name}发表:${param.data}`
          }
        },
        series: [{
          data: [10, 40, 12, 23, 10, 22, 34, 22, 58, 47, 36, 28],
          type: 'line',
          areaStyle: {
            color: '#236fff91',
          },
          itemStyle: {
            show: true,
            position: 'top',
            color: '#eee'
          },
          smooth: true,
          lineStyle: {
            width: 0
          },
          /* itemStyle: {
            opacity: 0
          } */
        }],
        grid: {
          top: 10,
          bottom: 50,
          left: 0,
          right: 0
        }
      }
    }
  },
}
</script>
 
<style lang="scss" scoped>

.time-number {

  width: 100%;
  height: 100%;
  .title {
    padding-left: 10px;
    box-sizing: border-box;
    font-weight: 500;
    color: white;
    font-size: 18px;
  }
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

      background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem, 0.9rem 0.15rem;
      background-color: #60626621;
      margin-top: 7px;
    width: 100%;
    height: 80%;
  }
}
</style>