<template>
  <div class="dashboard">
    <div class="header">
      <center-header></center-header>
    </div>

    <div class="content" style="padding-left: 0;padding-top: 0px">
      <div class="map">
        <order-map></order-map>
      </div>
      <div class="rank" style="margin-left: 0">
        <auto-rank></auto-rank>
      </div>
        <div class="error" >
            <error-list></error-list>
        </div>
    </div>
    <div class="footer">
      <category></category>

      <div class="areaRank">
        <block-number></block-number>
      </div>
    </div>
  </div>
</template>

<script>
import CenterHeader from './CenterHeader.vue'
import OrderMap from './OrderMap.vue'
import AutoRank from './AutoRank.vue'
import Category from './Category.vue'

import BlockNumber from './BlockNumber.vue'
import ErrorList from './ErrorList.vue'
export default {
  components: { CenterHeader, OrderMap, AutoRank, Category, BlockNumber, ErrorList },

}
</script>

<style lang='scss' scoped>
.dashboard {
  height: 100%;
  background: rgb(48, 48, 48);
  .content {
    //padding:20px;
    box-sizing: border-box;
    height: 58%;
    display: flex;
    .map {
      height: 100%;
      width: 40%;
    }

    .rank {
      height: 100%;
      //width:80%;
      width: 35%;
      margin-left: 20px;
      padding-right: 5%;
    }
    .error {
      height: 100%;
      //width:80%;
      width: 28%;
    }
  }
  .header {
    height: 15%;
  }
  .footer {
    margin-bottom: 20px;
    height: 23%;
    width: 100%;
    background: rgb(48, 48, 48);
    .areaRank {
      width: 38%;
      height: 100%;
      float: right;
    }
  }
}
</style>