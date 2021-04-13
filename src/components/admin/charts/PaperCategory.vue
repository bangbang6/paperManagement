<template>
  <div class="paper-category">
    <v-chart :options="options"></v-chart>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    const color = ['#71D4D4', '#A3D2F6', '#CEDD79', '#FACFA9', '#C3B6E6']
    const data = [
      {
        key: "top80",
        name: "top80",
        value: 240
      },
      {
        key: "sci",
        name: "sci",
        value: 180
      },
      {
        key: "trans",
        name: "trans",
        value: 200
      },
      {
        key: "A类会议",
        name: "A类会议",
        value: 180
      },
      {
        key: "B类会议",
        name: "B类会议",
        value: 200
      },
    ]
    this.options = {
      backgroundColor: 'white',

      series: [{

        name: '访问来源',
        type: 'pie',
        radius: '70%',
        selectedMode: 'multiple',
        selectedOffset: 10,
        clockwise: true,
        center: ['40%', '50%'],
        color,

        data: data,
        roseType: 'radius',
        label: {
          normal: {
            show: true,
            position: 'outter',
            formatter: function (params) {
              return params.data.key + ':' + params.data.value
            }
          }
        },
        labelLine: {
          normal: {
            length: 1,
            length2: 0,
            smooth: true
          }
        }

      }],
      legend: {
        show: true,
        type: 'scroll',
        height: 250,
        orient: 'vertical',
        left: '75%',
        top: 'middle',
        textStyle: {
          color: '#8c8c8c'
        },

      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const str = "类型:" + params.data.key + '</br>' + "数量:" + params.data.value
          return str
        }
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.paper-category {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 80%;
  }
}
</style>