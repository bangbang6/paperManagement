<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="info-wrapper">
        <i class="iconfont">&#xe678;</i>
        <div class="info">{{info}}</div>
        <!--  <i class="iconfont toggle" @click="toggle">&#xe624;</i> -->
      </div>

      <div class="account">
        <el-input placeholder="账号" v-model="username">
          <i slot="prefix" class="iconfont">&#xe627;</i>
        </el-input>
      </div>
      <div class="password">
        <el-input placeholder="密码" v-model="password" type="password">
          <i slot="prefix" class="iconfont">&#xe663;</i>
        </el-input>
      </div>
      <div class="role">
        <el-radio v-model="role" label="0">老师</el-radio>
        <el-radio v-model="role" label="1">管理员</el-radio>
        <el-radio v-model="role" label="2">查重</el-radio>
      </div>
      <el-button type="primary" class="btn" @click="register">注册</el-button>
      <div class="register-wrapper">
        <div class="register" @click="$router.push('/')">已经有账号?登录</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Message } from 'element-ui'
import { register } from '@/api/user'
export default {
  data () {
    return {

      role: '0',
      account: "",
      password: "",
      username: ""
    }
  },
  computed: {
    info () {
      return this.role === '0' ? '老师注册' : this.role === '1' ? "管理注册" : "查重注册"
    }
  },
  methods: {
    /*  toggle () {
       this.role = (this.role + 1) % 2
     }, */
    register () {
      if (this.role === '0') {
        register(this.username, this.password).then(res => {
          if (res.code === 200) {
            console.log('res', res);
            localStorage.setItem('token', res.data.token)
            this.$router.push('/userCenter')
            localStorage.setItem('role', '0')
          } else {
            Message.error(res.msg)
          }
        })


      } else if (this.role === '1') {

        register(this.username, this.password).then(res => {
          if (res.code === 200) {
            console.log('res', res);
            localStorage.setItem('token', res.data.token)
            this.$router.push('/admin')

            localStorage.setItem('role', '1')
          } else {
            Message.error(res.msg)
          }
        })
      } else {

        register(this.username, this.password).then(res => {
          if (res.code === 200) {
            console.log('res', res);
            localStorage.setItem('token', res.data.token)
            this.$router.push('/repeat')
            localStorage.setItem('role', '2')
          } else {
            Message.error(res.msg)
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
</style>