<template>
  <div class="new-admin">
    <div class="left">
      <div class="cards">
        <el-card shadow="never">
          <div class="wrapper paper">
            <div class="icon">
              <i class="iconfont">&#xe606;</i>
            </div>

            <div class="info">
              <div class="word">论文</div>
              <div class="word">{{paperNumber}}</div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never">
          <div class="wrapper work">
            <i class="iconfont">&#xe67e;</i>

            <div class="info">
              <div class="word">单位</div>
              <div class="word">{{organizationNumber}}</div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never">
          <div class="wrapper user">
            <i class="iconfont">&#xe604;</i>

            <div class="info">
              <div class="word">用户</div>
              <div class="word">{{userNumber}}</div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never">
          <div class="wrapper error">
            <i class="iconfont">&#xe6f9;</i>

            <div class="info">
              <div class="word">异常</div>
              <div class="word">{{errorNumber}}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="bar">
        <paper-group></paper-group>
      </div>
      <div class="line">
        <paper-time></paper-time>
      </div>
    </div>
    <div class="right">
      <div class="list">
        <error-list></error-list>
      </div>
      <div class="pie">
        <div class="bold">各类型论文占比</div>
        <paper-category></paper-category>
      </div>
    </div>
  </div>
</template>
 
<script>
import PaperGroup from './PaperGroup'
import PaperTime from './PaperTime'
import ErrorList from './ErrorList'
import PaperCategory from './charts/PaperCategory'
export default {
  components: {
    PaperGroup, PaperTime, ErrorList, PaperCategory
  },
  data () {
    return {
      paperNumber: 0,
      organizationNumber: 0,
      userNumber: 0,
      errorNumber: 0,
    }
  }
}
</script>
 
<style lang="scss" scoped>
.new-admin {
  background: rgb(242, 239, 236);
  display: flex;
  .left {
    width: 70%;
    margin-top: 10px;
    margin-left: 40px;
    padding-right: 20px;
    box-sizing: border-box;
    background: rgb(242, 239, 236);
    .cards {
      display: flex;
      width: 100%;
      height: 100px;
      .el-card {
        width: 25%;
        height: 100px;
        .wrapper {
          display: flex;

          align-items: center;
          &.user {
            color: #e8950e;
          }
          &.paper {
            color: #01a684;
          }
          &.work {
            color: #ae4c4a;
          }
          &.error {
            color: #144bee;
          }
          .word {
            color: #62a1df;
          }
          .iconfont {
            font-size: 50px;
          }
          .info {
            margin-left: 40px;
            font-size: 18px;
            div:nth-child(2) {
              margin-top: 10px;
            }
          }
        }
      }
    }
    .bar {
      width: 100%;
      height: 400px;
      margin-top: 40px;
      background: white;
      padding: 20px;

      box-sizing: border-box;
    }
    .line {
      width: 100%;
      height: 400px;
      margin-top: 40px;
      background: white;
      padding: 20px;

      box-sizing: border-box;
    }
  }
  .right {
    width: 30%;
    margin-top: 10px;

    background: rgb(242, 239, 236);
    margin-right: 20px;
    box-sizing: border-box;
    .list {
      background: white;
      height: 540px;
      padding: 10px 20px;
      box-sizing: border-box;
    }
    .pie {
      margin-top: 40px;
      background: white;
      height: 400px;
      padding: 10px 20px;
      box-sizing: border-box;
      .bold {
        height: 40px;
        font-weight: bold;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>