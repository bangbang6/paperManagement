<template>
  <div class="repeat-main">
    <Head></Head>
    <router-view></router-view>
  </div>
</template>
 
<script>
import Head from '@/components/repeat/Head'
export default {
  data () {
    return {
    }
  },
  components: {
    Head
  }
  
}
</script>
 
<style lang="scss" scoped>
.repeat-main {
  width: 100%;
}
</style>