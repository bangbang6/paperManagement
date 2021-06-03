<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="info-wrapper">
        <i class="iconfont">&#xe678;</i>
        <div class="info">用户注册</div>
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
        <el-input placeholder="密码" v-model="password" :type="showPass ?'text':'password'">
          <i slot="prefix" class="iconfont">&#xe663;</i>

          <i slot="suffix" @click="showPass=!showPass" v-if="showPass" class="iconfont">&#xe601;</i>
          <i slot="suffix" @click="showPass=!showPass" v-else class="iconfont">&#xe8ff;</i>
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

      <el-button type="primary" class="btn" @click="register">注册</el-button>
      <div class="register-wrapper">
        <div class="register" @click="$router.push('/')">已经有账号?登录</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { register, sendEmail } from '@/api/user'
export default {
  data () {
    return {

      email: "",
      password: "",
      username: "",
      capchar: "",
      btnDisabled: false,
      showPass: false,
      seconds: 0,
      icon1: 'icon-eye-open',
      icon2: 'icon-eye-close'
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
    /*  toggle () {
       this.role = (this.role + 1) % 2
     }, */
    submitChachar () {
      if (!this.email || !this.username) {
        this.$message({
          message: '填写邮箱和用户名',
          type: 'error',
          duration: 1000
        })
        return
      }
      sendEmail(this.email, this.username).then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.btnDisabled = true
          this.seconds = 60
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
    register () {

      register(this.email, this.username, this.password, this.capchar).then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.$message({
            message: res.msg,
            duration: 1000,
            type: 'success'
          })
          this.$router.push('/login')


        } else {
          this.$message({
            message: res.msg,
            type: 'error',
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
  background: url('../../assets/bg1.png');
  //background: url('../../assets/background.jpeg');
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
  padding-left: 50px;
}
.el-input__suffix {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>