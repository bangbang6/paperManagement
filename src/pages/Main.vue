<template>
  <div class="main">
    <newHead :role="0"></newHead>
    <div class="wrapper">
      <router-view></router-view>
    </div>
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
  .wrapper {
   // background: rgb(242, 239, 236);
    width: 100%;
   // height: calc(100% - 70px);
      height: 96%;
    /*padding-top: 30px;*/
  }
}
</style>