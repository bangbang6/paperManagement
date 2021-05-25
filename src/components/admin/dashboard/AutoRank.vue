<template>
  <div class="sales-view-list">
    <div class="sales-view-title">近期成果列表</div>

    <div class="list-item-wrapper">
      <div class="list-item gray">
        <span style="width: 20px;"></span>
        <div class="list-item-name" style="width: 70px;">研究组</div>
        <div class="list-item-name" style="width: 60px;">发表人</div>
        <div class="list-item-name" style="width: 80px;">发表类型</div>
        <div class="list-item-name" style="width: 270px;">成果标题</div>
        <div class="list-item-name">时间</div>
      </div>
      <div class="list-item" v-for="item in rankData" :key="item.no">
        <div class="list-item-name" style="width: 10px">{{item.no}}</div>
        <div class="list-item-name" style="width: 70px">{{item.groupName}}</div>
        <div class="list-item-name overflow" style="width: 60px">{{item.name}}</div>
        <div class="list-item-name overflow" style="width: 80px">{{item.type}}</div>
        <div class="list-item-name overflow" style="width: 270px">{{item.fileName}}</div>
        <div class="list-item-address" style="text-align: left;padding-left: 10px">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rankData: [{
        no: 1,
        groupName: "安全组",
        name: "代炜琦",
        type: "期刊/sci",
        fileName: "SDTE: A Secure Blockchain-Based Data Trading Ecosystem",
        time: "2021/5/12"
      },
      {
        no: 2,
        groupName: "系统组",
        name: "金海",
        type: "会议/B类",
        fileName: "Internet of  Things Data Management Based on Block Chain and Edge Computing",
        time: "2021/5/3"
      },
      {
        no: 3,
        groupName: "数据组",
        name: "张宇峰",
        type: "期刊/中文期刊",
        fileName: "结合区块链和属性基的可信数据分发",
        time: "2021/4/22"
      },
      {
        no: 4,
        groupName: "计算组",
        name: "郭松",
        type: "会议/top80",
        fileName: "Ethereum smart contract security research: survey and future research opportunities",
        time: "2021/4/11"
      },
      {
        no: 5,
        groupName: "系统组",
        name: "王泽丽",
        type: "专利",
        fileName: "Blockchain Empowered Arbitrable Data Auditing Scheme for Network Storage as a Service",
        time: "2021/4/3"
      },
      {
        no: 6,
        groupName: "安全组",
        name: "任军",
        type: "专利",
        fileName: "Defeating Last-level Cache Side Channel Attacks in Cloud Computing",
        time: "2021/3/28"
      },
      {
        no: 7,
        groupName: "云计算组",
        name: "徐阳",
        type: "期刊/其它",
        fileName: "Data Sharing and  Tracing Scheme Based on Blockchain",
        time: "2021/3/22"
      },
      {
        no: 8,
        groupName: "大数据组",
        name: "金海",
        type: "专利",
        fileName: "Blockchain Empowered Arbitrable Data Auditing Scheme for Network Storage as a Service",
        time: "2021/3/7"
      }
      ].slice(0, 6)
      //.slice(0, 6)
    }
  }
}
</script>

<style lang='scss' scoped>
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sales-view-list {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(48, 48, 48);

  color: gray;
  .sales-view-subTitle {
    margin-top: 5px;
    font-size: 12px;

    color: gray;
  }
  .sales-view-title {
    font-size: 18px;

    color: white;
    font-weight: 500;
  }

  .list-item-wrapper {
    background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
    /*设置大小*/

    background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem,
      0.9rem 0.15rem;
    background-color: #60626621;
    margin-top: 10px;
    padding-left: 5px;
    height: 80%;
    .list-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      // height: 12.5%;
      padding: 6px 20px 6px 0;

      .list-item-no {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        //  height: 12.5%;
        box-sizing: border-box;

        &.top-no {
          background: #000;
          border-radius: 50%;
          color: #fff;
          font-weight: 500;
        }
      }

      .list-item-name {
        margin-left: 10px;
        color: gray;
        width: 40px;
      }
      .list-item-phone {
        margin-left: 40px;
        color: gray;
        width: 100px;
      }
      /* .list-item-number {
        margin-left: 80px;
        color: gray;
        width: 40px;
      } */
      .list-item-address {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>