<template>
  <div class="admin-main">
    <Head :role="1"></Head>
    <router-view></router-view>
  </div>
</template>
 
<script>
import Head from '../components/Head'
/* import newHead from '../components/newHead' */
export default {
  components: {
    Head,
  },
  data () {
    return {
    }
  }

}
</script>
 
<style lang="scss" scoped>
.admin-main {
  width: 100%;
}
</style>