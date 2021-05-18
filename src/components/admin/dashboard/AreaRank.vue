<template>
  <div class="activate-user">
    <div class="title">地区医院文件排行</div>
    <div class="list-wrapper">
      <div class="list-inner" v-for="(item, index) in headerData" :key="index">
        <div class="list">
          <div class="list-title">{{item.title}}</div>
          <div class="list-separator-wrapper">
            <div class="list-separator" />
          </div>
          <!-- <div class="chart-wrapper">
            <div class="img-wrapper">
              <img :src="item.img" />
            </div>
          </div>-->
          <!--  <div class="category-wrapper">
            <transform-category
              :data="['商家', '订单数', '销售额']"
              :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']"
            />
          </div>-->
          <div class="tab">
            <div class="tabItem">医院</div>
            <div class="tabItem center">下载量</div>
            <div class="tabItem green center">上传量</div>
          </div>
          <div class="list-content-wrapper">
            <div
              class="list-item-wrapper"
              v-for="(listItem, index) in listData[index].shop"
              :key="index"
            >
              <div class="list-item">{{listItem.shop}}</div>
              <div class="list-item">{{listItem.order}}</div>
              <div class="list-item list-item-sales">{{listItem.sales}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts'
const mockData = [
  {
    "city": "武汉",
    "rate": "-12%",
    "shop": [
      { "shop": "同济医院", "order": 484, "sales": 9447 },
      { "shop": "同济医院", "order": 718, "sales": 9068 },
      { "shop": "同济医院", "order": 332, "sales": 5756 },
      { "shop": "同济医院", "order": 532, "sales": 5692 }
    ]
  },
  {
    "city": "北京",
    "rate": "-22%",
    "shop": [
      { "shop": "同济医院", "order": 432, "sales": 4345 },
      { "shop": "同济医院", "order": 603, "sales": 6807 },
      { "shop": "同济医院", "order": 949, "sales": 13409 },
      { "shop": "同济医院", "order": 270, "sales": 4905 }
    ]
  },
  {
    "city": "上海",
    "rate": "+22%",
    "shop": [
      { "shop": "同济医院", "order": 836, "sales": 14813 },
      { "shop": "同济医院", "order": 525, "sales": 6987 },
      { "shop": "同济医院", "order": 799, "sales": 13950 },
      { "shop": "同济医院", "order": 853, "sales": 8657 }
    ]
  },
]
export default {
  name: 'AreaRank',
  data () {
    return {
      headerData: [],
      listData: []
    }
  },


  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let currentData = mockData
      this.headerData = [{
        title: currentData[0].city,
        img: 'https://img.alicdn.com/tfs/TB1Z171qebviK0jSZFNXXaApXXa-30-29.png'
      }, {
        title: currentData[1].city,
        img: 'https://img.alicdn.com/tfs/TB1b8Tzq7T2gK0jSZFkXXcIQFXa-28-24.png'
      }, {
        title: currentData[2].city,
        img: 'https://img.alicdn.com/tfs/TB12MbzqYY1gK0jSZTEXXXDQVXa-28-30.png'
      }]
      this.listData = currentData
    }
  }

}
</script>

<style lang="scss" scoped>
.activate-user {
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);
  padding-right: 20px;
  box-sizing: border-box;
  color: white;
  .title {
    font-size: 16px;
    //margin-left: 20px;
    //padding-left: 7px;
    box-sizing: border-box;
  }

  .list-wrapper {
    display: flex;
    width: 100%;
    height: 130px;
    margin-top: 5px;
    box-sizing: border-box;

    .list-inner {
      flex: 0 0 33.33%;
      width: 33.33%;

      box-sizing: border-box;

      .list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: rgb(48, 48, 48);
        .tab {
          width: 100%;
          height: 25px;
          display: flex;
          .tabItem {
            width: 33.3%;
            flex: 1;
            line-height: 25px;

            font-size: 12px;
            &.green {
              color: #74fbf5;
            }
            &.center {
              display: flex;
              justify-content: center;
            }
          }
        }
        .list-title {
          font-size: 14px;
          padding-top: 10px;
          box-sizing: border-box;
        }

        .list-separator-wrapper {
          position: relative;
          height: 5px;
          background: rgb(47, 47, 47);

          .list-separator {
            position: absolute;

            right: 15px;
            width: 15px;
            height: 5px;
            background: rgb(50, 50, 50);
          }
        }

        .chart-wrapper {
          position: relative;
          width: 100%;
          height: 80px;
          margin-top: 20px;

          .img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;

            img {
              width: 42px;
              height: 42px;
              margin-top: 60px;
            }
          }

          .chart {
            width: 100%;
            height: 100%;
          }
        }

        /*  .category-wrapper {
          margin-top: 20px;
        } */

        .list-content-wrapper {
          flex: 1;
          height: 60px;
          overflow: hidden;

          .list-item-wrapper {
            display: flex;
            height: 33.33%;
            margin-top: 2px;
            .list-item {
              display: flex;
              justify-content: center;
              flex: 0 0 33.33%;
              width: 33.33%;

              line-height: 20px;
              font-size: 12px;
            }
            .list-item-sales {
              color: #74fbf5;
            }
          }
        }
      }
    }
  }
}
</style>