<template>
  <div class="center-header">
    <div class="center-header-wrapper">
      <div
        class="center-header-item"
        v-for="(item, index) in headerData"
        :key="index"
        @click="jump(index)"
      >
        <div class="center-header-left">
          <i :class="[item.icon,item.color]" class="icon"></i>
        </div>
        <div class="center-header-right">
          <div class="title">{{item.title}}</div>
          <div class="sub-title">{{item.subTitle}}</div>
          <div class="total">{{item.value}}</div>
        </div>
      </div>
    </div>
    <!--   <div class="project-wrapper">
      <div class="project" v-for="(item, index) in project" :key="index">
        <div class="project-img">
          <img :src="item.img" />
        </div>
        <div class="project-text">{{item.title}}</div>
        <div class="project-value">{{item.value}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
const headerMockData = { "headerData": { "value": [{ "title": "成果总数", "subTitle": "The Achievement Number", "value": 72, "icon": "el-icon-star-off", color: 'pink' }, { "title": "用户总数", "subTitle": "The Total User Number", "value": 2465, "icon": "el-icon-user", color: "blue" }, { "title": "区块数", "subTitle": "The Block Number", "value": 6391, "icon": "el-icon-coin", color: 'block' }, { "title": "交易数", "subTitle": "The Transaction Number", "value": 17352, "icon": "el-icon-sort", color: 'connect' }, { "title": "异常数", "subTitle": "The Number Of Abnormal", "value": 341, "icon": "el-icon-warning-outline", color: 'red' }] }, "project": { "value": [{ "title": "转化率", "value": "13.16%", "img": "https://www.youbaobao.xyz/datav-res/success.png" }, { "title": "退单率", "value": "5.73%", "img": "https://www.youbaobao.xyz/datav-res/failed.png" }] } }
export default {
  data () {
    return {
      headerData: headerMockData.headerData.value
    }
  },
  methods: {
    jump (index) {
      if (index === 5) {
        this.$router.push('/admin/errorStatus')
      }
    }
  }
}


</script>

<style lang="scss" scoped>
.center-header {

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);

  box-sizing: border-box;

  .center-header-wrapper {
    display: flex;
    width: 100%;
    padding-left: 10px;
    padding-right: 5px;
    box-sizing: border-box;
    .center-header-item {
        margin-left: 10px;
        background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
        linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
        linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
        linear-gradient(to bottom,#74fbf5, #74fbf5) left bottom no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
        linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
        /*设置大小*/

        background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem, 0.9rem 0.15rem;
        background-color: #60626621;
      flex: 1;
      width: 16%;
      display: flex;
      /*  margin-left: 60px; */
      /* margin-left: 20px; */

      .center-header-left {
        margin-top: 7px;
        .icon {
          font-size: 32px;
        }
        .green {
          color: #49a7f8;
        }
        .blue {
          color: #74fbf5;
        }
        .yellow {
          color: #01a684;
        }
        .pink {
          color: #e8950e;
        }
        .red {
          color: #ff3000;
        }
        .block {
          color: #f56c6c;
        }
        .connect {
          color: #e6a23c;
        }
      }

      .center-header-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        width: 280px;
        color: white;
        .title {
          font-size: 16px;
        }

        .sub-title {
          font-size: 12px;
          letter-spacing: 1px;
          color: gray;
          margin-top: 2px;
        }

        .total {
          //font-family: DIN;
          font-size: 26px;
          //font-weight: bolder;
          // letter-spacing: 2px;
          margin-top: 10px;
        }
      }
    }
  }

  /* .project-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .project {
      display: flex;
      flex-direction: column;
      align-items: center;

      .project-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
      }

      img {
        width: 100%;
        height: 100%;
      }

      .project-text {
        font-size: 18px;
        margin-top: 10px;
      }

      .project-value {
        font-size: 28px;
        font-weight: 700;
        margin-top: 5px;
      }
    }
  } */
}
</style>