<template>
  <div class="time-number2" style="height: 100%">
    <div class="title">
      <div>成果数量趋势</div>
      <el-radio-group v-model="radio" size="mini" @change="change">
        <el-radio-button label="近一年"></el-radio-button>
        <el-radio-button label="近半年"></el-radio-button>
        <el-radio-button label="近三月"></el-radio-button>
      </el-radio-group>
    </div>
    <v-chart :options="option"></v-chart>
  </div>
</template>



<script>
import { getCountThread } from '@/api/dashboard'

import * as echarts from 'echarts';

export default {
  data () {
    return {
      radio: "近一年",
      wholeDate: [],
      wholeData: [],
      date: [],
      data: [],
      option: {}
    }
  },

  methods: {
    parseData (data) {
      console.log('data', data);
      let now = new Date()
      let count = 0
      let year = now.getFullYear() - 1
      let month = now.getMonth() + 1
      for (let i = 0; i < 13; i++) {
        let str = year + '.' + month
        if (str === data[count].doc) {

          this.wholeDate.push(year + '/' + month)
          this.wholeData.push(data[count].number)
          count++
        } else {
          this.wholeDate.push(year + '/' + month)
          this.wholeData.push(0)
        }
        month++
        if (month > 12) {
          month = 1
          year = year + 1
        }
      }

    },

    change (value) {
      if (value === '近三月') {

        this.date = this.wholeDate.slice(-3)
        console.log('this.date', this.date);
        this.data = this.wholeData.slice(-3)
        this.option = this.getOption()

      } else if (value === '近半年') {
        this.date = this.wholeDate.slice(-6)
        this.data = this.wholeData.slice(-6)
        this.option = this.getOption()


      } else {
        this.date = this.wholeDate
        this.data = this.wholeData
        this.option = this.getOption()


      }
    },
    getOption () {
      return {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        toolbox: {
          feature: {

            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGup: false,
          show: true,
          //data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          data: this.date,
          axisLabel: {
            show: true,
            fontSize: 12,
            color: '#eee'
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          height: 20,
          left: '10%',
          right: '10%',
          bottom: '2%',
          start: 0,
          end: 100,
          textStyle: {
            color: '#d4ffff',
            fontSize: 11
          }
        }, {
          type: 'inside'
        }],
        series: [
          {
            name: '成果数量',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: '#d4ffff'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#74fbf5'
              }, {
                offset: 0,
                color: '#74fbf5'
              }])
            },
            data: this.data
          }
        ]
      }
    }
  },
  mounted () {
    getCountThread().then(res1 => {
      if (res1.code === 200) {
        //获取到近一年的数据
        this.parseData(res1.data)
        this.date = this.wholeDate
        this.data = this.wholeData
        this.option = this.getOption()
      } else {
        this.$message({
          message: res1.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
  },

}
</script>
<style lang="scss" scoped>
.time-number2 {
  width: 100%;
  height: 100%;
  .title {
    display: flex;
    padding-left: 10px;
    box-sizing: border-box;
    font-weight: 500;
    color: white;
    justify-content: space-between;
    font-size: 18px;
  }
  .echarts {
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
    margin-top: 3px;
    width: 100%;
    height: 80%;
  }
}
</style>