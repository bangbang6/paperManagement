<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="info-wrapper">
        <i class="iconfont">&#xe678;</i>
        <div class="info">{{info}}</div>
        <!--  <i class="iconfont toggle" @click="toggle">&#xe624;</i> -->
      </div>

      <div class="account">
        <el-input placeholder="邮箱" v-model="email">
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
      <div class="role">
        <el-radio v-model="role" label="0">老师</el-radio>
        <el-radio v-model="role" label="1">管理员</el-radio>
        <el-radio v-model="role" label="2">查重</el-radio>
      </div>
      <el-button type="primary" class="btn" @click="login">登录</el-button>
      <div class="register-wrapper">
        <div class="register" @click="$router.push('/register')">没有账号?去注册</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Message } from 'element-ui'
import { login } from '@/api/user'
export default {
  data () {
    return {

      role: '0',
      email: "",
      password: "",
      username: "",
      showPass: false
    }
  },
  computed: {
    info () {
      return this.role === '0' ? '老师登录' : this.role === '1' ? "管理登录" : "查重登录"
    }
  },
  methods: {
    /*  toggle () {
       this.role = (this.role + 1) % 2
     }, */
    login () {
      if (this.role === '0') {
        login(this.email, this.password).then(res => {
          if (res.code === 200) {
            console.log('resInfo', res);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('role', '0')
            this.$router.push('/teacher')
            localStorage.setItem('chineseName', res.data.user.user.chineseName)
          } else {
            Message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })


      } else if (this.role === '1') {

        login(this.email, this.password).then(res => {
          if (res.code === 200) {
            console.log('resInfo', res);
            localStorage.setItem('chineseName', res.data.user.user.chineseName)

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('role', '1')
            this.$router.push('/admin')


          } else {
            Message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      } else {

        login(this.email, this.password).then(res => {
          if (res.code === 200) {
            console.log('resInfo', res);
            localStorage.setItem('chineseName', res.data.user.user.chineseName)

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('role', '2')
            this.$router.push('/repeat')

          } else {
            Message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })

      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 600px;
  background: url('../../assets/background.jpeg');
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