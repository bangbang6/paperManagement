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
import TimeChart from './charts/TimeChart'
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
.wrapper {
  width: 100%;
  height: 360px;
}
</style>