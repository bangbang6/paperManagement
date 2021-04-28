<template>
  <div class="sale-body">
    <div class="sale-chart">
      <v-chart :options="options"></v-chart>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      options: {}
    }
  },

  methods: {
    renderOptions (data, axis) {
      return {
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        title: {

          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [{
          type: 'line',
          data,
          barWidth: "30%"
        }, {
          type: 'bar',
          data,
          barWidth: "30%"
        }],
        color: ['#A3D2F6', '#B2EAC0',],
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        }
      }
    }
  },
  mounted () {
    this.groupData = [320, 270, 480, 430, 280, 360, 296, 460, 520, 431, 372, 312]
    this.xAxis = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',


    ]
    this.options = this.renderOptions(this.groupData, this.xAxis)
  }




}
</script>

<style lang='scss' scoped>
.sale-body {
  width: 100%;
  height: 100%;
  display: flex;
  .echarts,
  .sale-chart {
    width: 100%;
    height: 100%;
  }
}
</style>