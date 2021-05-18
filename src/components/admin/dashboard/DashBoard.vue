<template>
  <div class="dashboard">
    <div class="header">
      <center-header></center-header>
    </div>
    <div class="content">
      <div class="left">
        <div class="map">
          <hust-map></hust-map>
        </div>
      </div>
      <div class="middle">
        <div class="rank">
          <auto-rank></auto-rank>
        </div>
        <div class="error">
          <error-list></error-list>
        </div>
      </div>
      <div class="right">
        <div class="category">
          <category></category>
        </div>
        <div class="category-rank">
          <rank-list></rank-list>
        </div>
        <div class="liquid">
          <time-number></time-number>
        </div>
      </div>
    </div>

    <!-- <div class="content" style="padding-left: 0;padding-top: 0px">
      <div class="map">
        <hust-map></hust-map>
      </div>
      <div class="rank" style="margin-left: 0">
        <auto-rank></auto-rank>
      </div>
      <div class="error">
        <error-list></error-list>
      </div>
    </div>
    <div class="footer">
      <category></category>

      <div class="areaRank">
        <block-number></block-number>
      </div>
    </div>-->
  </div>
</template>

<script>
import CenterHeader from './CenterHeader.vue'
// import OrderMap from './OrderMap.vue'
import HustMap from './HustMap.vue'
import AutoRank from './AutoRank.vue'
import Category from './Category.vue'

import ErrorList from './ErrorList.vue'
import RankList from './RankList.vue'
import TimeNumber from './TimeNumber.vue'
export default {
  components: { CenterHeader, HustMap, AutoRank, Category, ErrorList, TimeNumber, RankList },

}
</script>

<style lang='scss' scoped>
.dashboard {
  height: 100%;
  background: rgb(48, 48, 48);
  .header {
    height: 15%;
  }
  .content {
    box-sizing: border-box;
    height: 85%;
    display: flex;
    .left {
      padding-left: 40px;
      padding-top: 5px;
      padding-bottom: 20px;
      box-sizing: border-box;
      width: 40%;

      height: 100%;
      .map {
        height: 100%;
      }
    }
    .middle {
      padding-left: 20px;
      box-sizing: border-box;
      width: 36%;
      height: 100%;
      .rank {
        height: 50%;
      }
      .error {
        height: 50%;
      }
    }
    .right {
      width: 24%;
      height: 100%;
      padding-bottom: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      .category {
        width: 100%;
        height: 33.3%;
      }
      .category-rank {
        width: 100%;
        height: 26%;
      }
      .liquid {
        padding-top: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 40.3%;
      }
    }
  }
}
</style>