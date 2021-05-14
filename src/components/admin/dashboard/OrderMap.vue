<template>
  <div class="ordermapWrapper">
    <div class="loading" v-if="loading">加载中</div>
    <Vue-echarts :options="options" id="orderMap" v-else></Vue-echarts>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import VueEcharts from './VueEcharts.vue'
const geoCoordMap = {
  '江苏': [118.8062, 31.9208],
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  '吉林': [125.8154, 44.2584],
  '北京市': [116.4551, 40.2539],
  '辽宁': [123.1238, 42.1216],
  '河北': [114.4995, 38.1006],
  '天津': [117.4219, 39.4189],
  '山西': [112.3352, 37.9413],
  '陕西': [109.1162, 34.2004],
  '甘肃': [103.5901, 36.3043],
  '宁夏': [106.3586, 38.1775],
  '青海': [101.4038, 36.8207],
  '新疆': [87.9236, 43.5883],
  '四川': [103.9526, 30.7617],
  '重庆': [108.384366, 30.439702],
  '山东': [117.1582, 36.8701],
  '河南': [113.4668, 34.6234],
  '安徽': [117.29, 32.0581],
  '湖北': [114.3896, 30.6628],
  '浙江': [119.5313, 29.8773],
  '福建': [119.4543, 25.9222],
  '江西': [116.0046, 28.6633],
  '湖南': [113.0823, 28.2568],
  '贵州': [106.6992, 26.7682],
  '云南': [102.9199, 25.4663],
  '广东': [113.12244, 23.009505],
  '广西': [108.479, 23.1152],
  '海南': [110.3893, 19.8516],
  '上海': [121.4648, 31.2891]
}
const d1 = {
  '江苏': 10041,
  '黑龙江': 4093,
  '内蒙古': 1157,
  '吉林': 4903,
  '北京市': 2667,
  '辽宁': 8331,
  '河北': 13727,
  '天津': 681,
  '山西': 5352,
  '陕西': 38,
  '甘肃': 77,
  '宁夏': 65,
  '青海': 10,
  '新疆': 193,
  '四川': 309,
  '重庆': 77,
  '山东': 11666,
  '河南': 15717,
  '安徽': 15671,
  '湖北': 3714,
  '浙江': 3141,
  '福建': 955,
  '江西': 4978,
  '湖南': 778,
  '贵州': 33,
  '云南': 149,
  '广东': 1124,
  '广西': 125,
  '海南': 7,
  '上海': 2155

}
const colors = [
  ['#1DE9B6', '#1DE9B6', '#FFDB5C', '#FFDB5C', '#04B9FF', '#04B9FF'],
  ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'],
  ['#37A2DA', '#67E0E3', '#32C5E9', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#FB7293', '#E062AE', '#E690D1', '#E7BCF3', '#9D96F5', '#8378EA', '#8378EA'],
  ['#DD6B66', '#759AA0', '#E69D87', '#8DC1A9', '#EA7E53', '#EEDD78', '#73A373', '#73B9BC', '#7289AB', '#91CA8C', '#F49F42']
]
const citys = ['北京', '上海', '广东', '长沙', '江西', '湖北']
export default {
  data () {
    return {
      loading: true,
      options: { baseOptions: {} },
      publicPath: process.env.BASE_URL,
      littleDotData: [

      ]
    }
  },
  components: { VueEcharts },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let that = this
      axios.get(`${this.publicPath}map.json`).then(res => {
        console.log(res);
        echarts.registerMap('china', res.data)
        const barData = []
        const _options = {
          baseOption: {
            geo: { //geo表示自定义
              map: 'china',
              zoom: 1.1,
              roam: true,//可交互
              scaleLimit: {
                min: 0.5,
                max: 3
              },//放大缩小比例
              center: [110.83531246, 34.0267395887],
              itemStyle: { //每一块元素
                normal: {
                  borderColor: 'rgba(147, 235, 248, 1)',
                  borderWidth: 1,

                  areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                      offset: 0, color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(147, 235, 248, 0.2)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  shadowColor: 'rgba(128,217,248,1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: '#389BB7',
                  borderWidth: 0,

                }

              },
              label: { //标签显示
                emphasis: {
                  show: false
                }
              }
            }
          },

        }

        /* _options.options.push({
          backgroundColor: 'rgb(48, 48, 48)',
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: citys
          },
          series: [{
            type: 'bar',
            data: [0, 0, 0.5, 0.8, 0.9, 1.3, 1.5, 5]
          }]
        }) */

        that.options = _options
        that.loading = false
        that.littleDotData = that.initDot()

        that.options.baseOption = {
          ...that.options.baseOption,
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.littleDotData,
            symbolSize: function (val) {
              return val[2] / 1000
            },

            rippleEffect: {

              brushType: "stroke", //涟漪
            },
            hoverAnimation: true,//移上去有动画
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter (params) {
                  return params.data.name
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#74fbf5',/* colors[0][0], */
                shodowColor: '#74fbf5' /* colors[0][0] */
              }
            }
          }]

        }

      })


    },
    initDot () {
      var res = []

      for (let key in d1) {
        var geoCoord = geoCoordMap[key]
        if (geoCoord) {
          res.push({
            name: key,
            value: geoCoord.concat(d1[key])
          })
        }
      }
      return res
    }

  }
}
</script>

<style lang='scss' scoped>
.ordermapWrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(48, 48, 48);

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 36px;
    background: rgb(48, 48, 48);
  }

  #orderMap {
    width: 100%;
    height: 100%;
    padding-top: 40px;
  }
}
</style>