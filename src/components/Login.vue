<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="info-wrapper">
        <i class="iconfont">&#xe678;</i>
        <div class="info">{{info}}</div>
        <i class="iconfont toggle" @click="toggle">&#xe624;</i>
      </div>

      <div class="account">
        <el-input placeholder="账号" v-model="account">
          <i slot="prefix" class="iconfont">&#xe627;</i>
        </el-input>
      </div>
      <div class="password">
        <el-input placeholder="密码" v-model="password">
          <i slot="prefix" class="iconfont">&#xe663;</i>
        </el-input>
      </div>
      <el-button type="primary" class="btn" @click="login">登录</el-button>
      <div class="register-wrapper">
        <div class="register">没有账号?去注册</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {

      role: 0,
      account: "",
      password: "",
      name: ""
    }
  },
  computed: {
    info () {
      return this.role === 0 ? '用户登录' : "管理登录"
    }
  },
  methods: {
    toggle () {
      this.role = (this.role + 1) % 2
    },
    login () {
      if (this.role === 1) {
        this.$router.push('/admin')
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 600px;
  background: url('../assets/background.jpeg');
  background-size: cover;
  justify-content: flex-end;

  display: flex;

  .login {
    .info-wrapper {
      display: flex;
      height: 40px;
      align-items: center;
      .info {
        margin-left: 10px;
      }
      .toggle {
        margin-left: 10px;
        cursor: pointer;
      }
    }
    margin-top: 100px;
    background: white;
    width: 360px;
    margin-right: 100px;
    height: 400px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    padding: 5px 10px;

    .account {
      margin-top: 20px;

      align-items: center;

      .iconfont {
        line-height: 40px;
        color: black;
      }
    }

    .password {
      margin-top: 20px;
      .iconfont {
        line-height: 40px;
        color: black;
      }
    }
    .btn {
      width: 100%;
      margin-top: 20px;
    }
    .register-wrapper {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      .register {
        color: red;
        font-size: 14px;
      }
    }
  }
}
</style>
<style lang='scss'>
.el-input__prefix {
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.el-input--prefix .el-input__inner {
  padding-left: 50px;
}
</style>