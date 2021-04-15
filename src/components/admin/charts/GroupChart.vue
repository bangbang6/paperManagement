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
        series: {
          type: 'bar',
          data,
          barWidth: "30%"
        },
        color: '#FF9502'/* '#A3D2F6'/* '#FF9502' */,
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
    this.groupData = [400, 200, 260, 180, 420, 500, 670, 480, 220, 350, 140, 540]
    this.xAxis = [
      '学院一',
      '学院二',
      '学院三',
      '学院四',
      '学院伍',
      '学院六',
      '学院七',
      '学院八',
      '学院九',
      '学院十',
      '学院十一',
      '学院十二',

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
    /* background: #4e9cd8; */
  }
}
</style>