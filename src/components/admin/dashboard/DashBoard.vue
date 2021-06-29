<template>
  <div class="dashboard">
    <div class="radios">
      <el-radio-group v-model="organization" size="mini">
        <el-radio-button label="系统组"></el-radio-button>
        <el-radio-button label="分布式组">分布式组</el-radio-button>
        <el-radio-button label="安全组"></el-radio-button>
        <el-radio-button label="大数据组"></el-radio-button>
      </el-radio-group>
      <el-select v-model="teacher" placeholder="老师名称" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="header">
      <center-header></center-header>
    </div>
    <div class="content">
      <div class="left">
        <div class="map">
          <hust-map></hust-map>
        </div>
        <div class="liquid">
          <!--<time-number></time-number>-->
          <time-number2></time-number2>
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
// import TimeNumber from './TimeNumber.vue'
import TimeNumber2 from './TimeNumber2.vue'
export default {
  components: { CenterHeader, HustMap, AutoRank, Category, ErrorList, TimeNumber2, RankList },
  data () {
    return {
      options: [
        {
          value: 1,
          label: "代玮琪"
        },
        {
          value: 2,
          label: "余辰"
        },
      ],
      teacher: "",
      organization: "系统组"
    }
  }
}
</script>

<style lang='scss' scoped>
.dashboard {
  height: 100%;
  background: rgb(48, 48, 48);
  .radios {
    height: 40px;
    padding-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    .el-select {
      margin-left: 20px;
    }
  }
  .header {
    height: 16%;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .content {
    box-sizing: border-box;
    height: calc(84% - 40px);
    display: flex;
    .left {
      padding-left: 40px;

      box-sizing: border-box;
      width: 40%;

      height: 100%;
      .map {
        box-sizing: border-box;
        padding-top: 0.15rem;
        width: 100%;
        height: 50%;
        overflow: hidden;
      }
      .liquid {
        box-sizing: border-box;
        width: 100%;
        height: 50%;
      }
    }
    .middle {
      margin-right: 5px;
      padding-left: 20px;
      box-sizing: border-box;
      width: 36%;
      height: 100%;
      .rank {
        margin-left: 3px;
        height: 50%;
      }
      .error {
        height: 50%;
      }
    }
    .right {
      margin-left: 5px;
      width: 24%;
      height: 100%;
      padding-left: 20px;
      //padding-bottom: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      .category {
        width: 100%;
        height: 50%;
      }
      .category-rank {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-radio-button__inner {
  display: inline-block;
  background: rgb(48, 48, 48);
  border: #c0c4cc 1px solid;
  color: white;
}
::v-deep .el-input__inner {
  display: inline-block;
  background: rgb(48, 48, 48);
  color: white;
}
::v-deep el-select-dropdown__wrap {
  display: inline-block;
  background: rgb(48, 48, 48);
  color: white;
}
</style>