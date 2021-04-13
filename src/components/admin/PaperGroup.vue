<template>
  <div class="paper-group">
    <group-head></group-head>
    <div class="wrapper">
      <group-chart></group-chart>
    </div>
  </div>
</template>
 
<script>
import GroupHead from './GroupHead'
import GroupChart from './charts/GroupChart'
export default {
  components: {
    GroupHead, GroupChart
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