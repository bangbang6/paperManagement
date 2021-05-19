<template>
  <div class="repeat-main">
    <newHead></newHead>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
 
<script>
import newHead from '@/components/repeat/newHead'
export default {
  data () {
    return {
    }
  },
  components: {
    newHead
  }

}
</script>
 
<style lang="scss" scoped>
.repeat-main {
  width: 100%;
  height: 100%;
  .wrapper {
    /*background: rgb(242, 239, 236);*/
    width: 100%;
    //height: calc(100% - 70px);
      height: 96%;
    /*padding-top: 30px;*/
  }
}
</style>