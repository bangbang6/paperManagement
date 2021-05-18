<template>
  <div class="login-main">
    <div class="head">
      <div class="title-wrapper">
          <div class="title">华中科技大学成果管理系统</div>
          <div class="sub-title">HUST ACHIEVEMENT MANAGEMENT SYSTEM</div>
      </div>
      <div class="nav" @click="navJump">
        <div :class="['nav-item',navIndex === 0?'blue':'']" data-item="0">登录</div>
        <div :class="['nav-item',navIndex === 1?'blue':'']" data-item="1">注册</div>
        <div :class="['nav-item',navIndex === 2?'blue':'']" data-item="2">修改密码</div>
      </div>
      <div class="tel-wrapper">
        <i class="iconfont">&#xe7ae;</i>
        <div class="tel">15798015790</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {

  computed: {

  },
  methods: {
    navJump (e) {

      if (e.target.dataset.item === '0') {

        this.$router.push('/login')
      } else if (e.target.dataset.item === '1') {

        this.$router.push('/register')
      } else if (e.target.dataset.item === '2') {
        this.$router.push('/changePassword')
      }


    },

  },
  watch: {
    $route: {
      handler: function (newV) {
        if (newV.name === 'login') {
          this.navIndex = 0
        }
        else if (newV.name === 'register') {
          this.navIndex = 1
        }
        else if (newV.name === 'changePassword') {
          this.navIndex = 2
        }
      },
      immediate: true
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