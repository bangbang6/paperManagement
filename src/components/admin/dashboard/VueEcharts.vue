<template>
  <div class="echarts" ref="map"></div>
</template>

<script>
import Echarts from 'echarts'
export default {
  name: 'VueEcharts',
  props: {
    options: Object,
    theme: [String, Object]
  },
  data () {
    return {}
  },
  mounted () {
    let chart
    let dom
    if (!chart) {
      dom = this.$refs.map
      chart = Echarts.init(dom, this.theme)
    }
    if (this.options) {
      chart.setOption(this.options)
    }
  }
}
</script>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>