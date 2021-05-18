<template>
  <div class="sale-body">
    <div class="sale-chart">
      <v-chart :options="options" style="color: white;"></v-chart>
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
            color: '#999'
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
            /* lineStyle: {
              type: 'dotted',
              color: '#eee'
            } */
            show: false
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + '文章数为:' + params.data
          }
        },
        series: [{
          type: 'line',
          data,
          barWidth: "30%"
        }, {
          type: 'bar',
          data,
          barWidth: "30%",

        }],
        color: ['#9c00ff', '#236fff', '#74fbf5', '#A3D2F6', '#B2EAC0',],
        grid: {
          top: 0,
          left: 0,
          right: 10,
          bottom: 20
        }
      }
    }
  },
  mounted () {
    this.groupData = [400, 200, 260, 180, 420, 500, 670, 480, 220, 350, 140, 540]
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