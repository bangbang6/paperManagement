<template>
  <div class="main">
    <newHead :role="0"></newHead>
    <router-view></router-view>
  </div>
</template>
 
<script>
import newHead from '../components/newHead'

export default {
  components: {
    newHead
  },
  data () {
    return {
    }
  }

}
</script>
 
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>