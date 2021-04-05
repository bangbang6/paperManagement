<template>
  <div class="head">
    <div class="title-wrapper">
      <div class="title">华中科技大学论文管理系统</div>
      <div class="sub-title">HUST THESIS MANAGEMENT SYSTEM</div>
    </div>
    <div class="nav">
      <div class="blue">首页</div>
    </div>
    <div class="tel-wrapper">
      <i class="iconfont">&#xe7ae;</i>
      <div class="tel">15798015790</div>
      <div class="avaturl" style="margin-left:20px">
        <el-dropdown trigger="click" @command="handleCommand">
          <img :src="imgSrc" class="imgAvaturl" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      imgSrc: require("../../../public/avatual.png")
    }
  },
  methods: {
    handleCommand (command) {
      console.log('xx');
      if (command === 'loginout') {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.head {
  margin-left: 15%;
  width: 70%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .title-wrapper {
    height: 35px;
    .title {
      font-size: 18px;
      font-weight: 400;
    }
    .sub-title {
      font-size: 12px;
      color: rgb(149, 151, 153);
    }
  }
  .nav {
    display: flex;
    font-size: 16px;
    .nav-item {
      margin-right: 30px;
      cursor: pointer;
    }
    .blue {
      color: #409eff;
    }
  }
  .tel-wrapper {
    display: flex;
    color: gray;
    align-items: center;
    .tel {
      margin-left: 10px;
    }
  }
}
</style>
<style scoped>
.imgAvaturl {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>