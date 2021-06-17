<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="info-wrapper">
        <i class="iconfont">&#xe678;</i>
        <div class="info">修改密码</div>
        <!--  <i class="iconfont toggle" @click="toggle">&#xe624;</i> -->
      </div>

      <div class="account">
        <el-input placeholder="邮箱" v-model="email">
          <i slot="prefix" class="iconfont">&#xe600;</i>
        </el-input>
      </div>
      <div class="account">
        <el-input placeholder="用户名" v-model="username">
          <i slot="prefix" class="iconfont">&#xe627;</i>
        </el-input>
      </div>
      <div class="password">
        <el-input placeholder="新密码" v-model="password" type="password">
          <i slot="prefix" class="iconfont">&#xe663;</i>
        </el-input>
      </div>

      <div class="capchar">
        <el-input placeholder="验证码" v-model="capchar" type="text" class="capchar-input">
          <i slot="prefix" class="iconfont">&#xe667;</i>
        </el-input>
        <el-button
          @click="submitChachar"
          :disabled="btnDisabled"
          type="primary"
          size="mini"
        >{{btnInfo}}</el-button>
      </div>

      <el-button type="primary" class="btn" @click="handleClick">确定</el-button>
      <div class="register-wrapper">
        <div class="register" @click="$router.push('/')">已有账号?去登录</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { toPassword, rePassword } from '@/api/user'
export default {
  data () {
    return {

      role: '0',
      account: "",
      password: "",
      username: "",
      seconds: 0,
      capchar: '',
      email: '',
      btnDisabled: false
    }
  },
  computed: {
    btnInfo () {
      if (this.seconds > 0) {
        return `${this.seconds}s`
      } else {
        return '发送'
      }

    }
  },
  methods: {
    submitChachar () {
      if (!this.email || !this.username) {
        this.$message({
          message: '填写邮箱和用户名',
          type: 'error',
          duration: 1000
        })
        return
      }
      toPassword(this.email, this.username).then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.btnDisabled = true
          this.seconds = 10
          let timer = setInterval(() => {
            this.seconds = this.seconds - 1
            if (this.seconds === 0) {
              this.btnDisabled = false
              clearInterval(timer)
            }
          }, 1000)

        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    handleClick () {
      rePassword(this.email, this.password, this.username, this.capchar).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.msg,
            duration: 1000
          })
          this.$router.push('/login')
        } else {
          this.$message({
            type: "error",
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>
 
<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 600px;
    //background-color: #ecf5ff7a;
  background: url('../../assets/bg1.png');
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
    .capchar {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .iconfont {
        line-height: 40px;
        color: black;
      }
      .capchar-input {
        width: 80%;
      }
    }
    .role {
      width: 100%;
      display: flex;
      align-items: center;
      height: 20px;
      margin-top: 20px;
      margin-left: 10px;
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
        cursor: pointer;
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
  padding-left: 50px !important;
}
</style>