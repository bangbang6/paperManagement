<template>
  <!-- <div class="chat-wrapper-w"> -->
  <div class="chart-wrapper">
    <div class="sales-view-title">成果类型占比</div>
    <v-chart :options="categoryOptions2" />
  </div>
  <!-- <div class="chart-wrapper">
      <v-chart :options="categoryOptions2" />
  </div>-->
  <!-- </div> -->
</template>

<script>


import { getCountByType } from '@/api/dashboard'

export default {
  data () {
    return {
      categoryOptions2: {},
      typeData: []
    }

  },

  mounted () {
    getCountByType().then(res => {
      if (res.code === 200) {
        console.log('res4', res);
        this.typeData = this.parseData(res.data)
        console.log('this.typeData', this.typeData);
        this.renderPieChart()
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })

      }
    })

  },
  methods: {
    parseData (data) {
      let sum = data.reduce((prev, next) => prev + next, 0)
      let names = ['会议', '期刊', '专利', '软著']
      let colors = ['#74fbf5', '#49a7f8', '#9c00ff', '#236fff']
      return data.map((item, index) => ({
        legondname: names[index],
        value: item,
        percent: `${(item * 100 / sum).toFixed(2)}%`,
        itemStyle: {
          color: colors[index]
        },

      }))
    },
    renderPieChart () {
      this.categoryOptions2 = {
        title: [{
          text: "类型统计",
          x: "44.5%",
          y: "45%",
          textAlign: 'center',
          textStyle: {
            fontSize: 20,
            color: 'white',
            fontWeight: 'normal'
          }
        }],
        series: [{
          name: "area",
          type: 'pie',
          data: this.typeData,
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
          radius: ['65%', '80%'],
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
.sales-view-title {
  font-size: 18px;
  color: white;
  font-weight: 500;
}
/* .chat-wrapper-w {
  width: 60%;
  height: 100%;
  background: rgb(48, 48, 48);
  display: flex;
  float: left;
} */
.chart-wrapper {
  width: 100%;
  height: 80%;
  background: rgb(48, 48, 48);

  .echarts {
    margin-top: 10px;
    background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
    /*设置大小*/

    background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem,
      0.9rem 0.15rem;
    background-color: #60626621;
    width: 100%;
    height: 100%;
  }
}
</style>
