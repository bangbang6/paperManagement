<template>
  <!-- <div class="chat-wrapper-w"> -->
  <div class="chart-wrapper">
    <v-chart :options="categoryOptions2" />
  </div>
  <!-- <div class="chart-wrapper">
      <v-chart :options="categoryOptions2" />
  </div>-->
  <!-- </div> -->
</template>

<script>

const mockData = [
  {
    legondname: "安全组",
    value: 97,
    percent: "21.15%",
    itemStyle: {
      color: '#49a7f8'
    },
    name: "安全组 | 21.15%",

  },

  {
    legondname: "系统组",
    value: 67,
    percent: "22.30%",
    itemStyle: {
      color: '#236fff'
    },
    name: "系统组 | 22.30%"
  },

  {
    legondname: "大数据组",
    value: 92,
    percent: "15.4%",
    itemStyle: {
      color: '#9c00ff'
    },
    name: "大数据组 | 15.4%"

  },
  {
    legondname: "云计算组",
    value: 204,
    percent: "41.15%",
    itemStyle: {
      color: '#74fbf5'
    },
    name: "云计算组 | 41.15%"

  },
]
const mockData2 = [
  {
    legondname: "top80/A类/B类/C类",
    value: 21,
    percent: "11.5%",
    itemStyle: {
      color: '#74fbf5'
    },
    name: "top80/A类/B类/C类 | 11.5%"
  },
  {
    legondname: "trans/sci/中文期刊",
    value: 38,
    percent: "22.5%",
    itemStyle: {
      color: '#49a7f8'
    },
    name: "trans/sci | 22.5%"
  },
  {
    legondname: "专利",
    value: 97,
    percent: "54.5%",
    itemStyle: {
      color: '#9c00ff'
    },
    name: "专利 | 54.5%",

  },
  {
    legondname: "其他",
    value: 13,
    percent: "7%",
    itemStyle: {
      color: '#236fff'
    },
    name: "其他 | 7%"

  }
]
export default {
  data () {
    return {
      categoryOptions: {},
      categoryOptions2: {}
    }

  },
  mounted () {
    this.renderPieChart()
  },
  methods: {
    renderPieChart () {
      this.categoryOptions = {
        title: [/* {
          text: "文件分布",
          textStyle: {
            fontSize: 14,
            color: 'white',
          },
          left: 20,
          top: 20
        }, */ {
            text: "成果分布",
            x: "44.5%",
            y: "45%",
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'normal'
            }
          }],
        series: [{
          name: "category",
          type: 'pie',
          data: mockData,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legondname
              }
            }
          },
          center: ["45%", "50%"],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          /* itemStyle: {
            borderWidth:4px
          }, */
          clockwise: true
        }],
        /* legend: {
          type: 'scroll',
          orient: "vertical",
          height: 250,
          left: '65%',
          top: 'middle',
          textStyle: {
            color: "white",
            fontSize: '12px'
          }
        }, */
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
            return str
          }
        },

      }
      this.categoryOptions2 = {
        title: [{
          text: "类型统计",
          x: "44.5%",
          y: "45%",
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            color: 'white',
            fontWeight: 'normal'
          }
        }],
        series: [{
          name: "area",
          type: 'pie',
          data: mockData2,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legondname
              }
            }
          },
          center: ["45%", "50%"],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },

          clockwise: true
        }],

        /* legend: {
          type: 'scroll',
          orient: "vertical",
          height: 250,
          left: '45%',
          top: 'middle',
          textStyle: {
            color: "white"
          }
        }, */
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const str = /* params.seriesName + '</br>' + */ params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
            return str
          }
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
/* .chat-wrapper-w {
  width: 60%;
  height: 100%;
  background: rgb(48, 48, 48);
  display: flex;
  float: left;
} */
.chart-wrapper {
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);

  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>