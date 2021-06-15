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
    <v-chart :options="getOption()"></v-chart>
  </div>
</template>



<script>
import { getCountThread } from '@/api/dashboard'

import * as echarts from 'echarts';
var data = [Math.random() * 300];
var base = + new Date();
var oneMonth = 24 * 3600 * 1000 * 30;
var date = [];
for (var i = 1; i <= 12; i++) {
  var now = new Date(base -= oneMonth);
  date.push([now.getFullYear(), now.getMonth() + 1].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}
date.reverse();
data.reverse();
export default {
  data () {
    return {
      radio: "近一年",
      date: date,
      data: data
    }
  },
  computed: {
    radioMonth () {
      return this.radio === '近一年' ? 12 : this.radio === '近三个月' ? 6 : 3
    }
  },
  methods: {
    helper (value) {
      var data = [Math.floor(21 * Math.random()) + 30];
      var base = + new Date();
      var oneMonth = 24 * 3600 * 1000 * 30;
      var date = [];
      var flag = 1;
      for (var i = 1; i <= value; i++) {
        var now = new Date(base -= oneMonth);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round(10 * Math.random() * flag + data[i - 1]));
        flag = -1 * flag;
      }
      date.reverse();
      data.reverse();
      console.log(data);
      this.date = date;
      this.data = data;
      this.getOption();
    },
    change (value) {
      if (value === '近三月') {
        console.log(value)
        this.helper(3);
      } else if (value === '近半年') {
        console.log(value)
        this.helper(6);
      } else {
        this.helper(12);
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
    getCountThread(this.radioMonth).then(res1 => {
      if (res1.code === 200) {
        console.log('res1', res1);
      } else {
        this.$message({
          message: res1.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
  },
  watch: {
    radioMonth (newV) {
      getCountThread(newV).then(res1 => {
        if (res1.code === 200) {
          console.log('res1', res1);
        } else {
          this.$message({
            message: res1.msg,
            duration: 1000,
            type: 'error'
          })
        }
      })
    }
  }
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