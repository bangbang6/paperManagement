<template>
  <div class="paper-time">
    <time-head></time-head>
    <div class="wrapper">
      <time-chart></time-chart>
    </div>
  </div>
</template>
 
<script>
import TimeHead from './TimeHead'
import TimeChart from './TimeChart'
export default {
  components: {
    TimeHead, TimeChart
  },
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
.paper-time {
  width: 100%;
  height: 100%;
  .wrapper {
    width: 100%;
    height: 80%;
  }
}
</style>