<template>
  <div class="head">
    <div class="title-wrapper">
      <div class="img-wrapper">
        <img src="../../../public/avatual.png" alt class="img" />
      </div>
      <div class="title">论文管理系统</div>
    </div>
    <div class="nav" @click="navJump">
      <div class="green nav-item">首页</div>
    </div>
    <div class="avaturl-wrapper">
      <div class="avaturl">
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="wrapper">
            <img :src="imgSrc" class="imgAvaturl" />
            <span :style="{marginLeft:'5px'}">{{chineseName}}</span>
            <i class="el-icon-arrow-down down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getAvatar } from '@/api/user'
import { Bus } from '../../main.js'
export default {
  props: {
    role: Number
  },
  data () {
    return {
      navIndex: 0,
      imgSrc: require("../../../public/avatual.png")
    }
  },
  computed: {
    chineseName () {
      return localStorage.getItem('chineseName') || 'admin'
    }
  },
  methods: {

    handleCommand (command) {
      console.log('xx');
      if (command === 'loginout') {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    getAvatar().then(res => {
      console.log('res', res);
      if (res.code === 200) {
        this.imgSrc = `data:${res.data.type};base64,${res.data.data}`
      }
    })
    Bus.$on('changeAvatual', (src) => {
      this.imgSrc = src
    })
  },

}
</script>
 
<style lang="scss" scoped>
.head {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #212121;
  .title-wrapper {
    margin-left: 50px;
    height: 35px;
    display: flex;
    align-items: center;
    .img-wrapper {
      width: 24px;
      height: 24px;
      .img {
        width: 24x;
        height: 24px;
        border-radius: 50%;
      }
    }
    .title {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }
  }
  .nav {
    display: flex;
    font-size: 12px;
    color: white;
    height: 100%;

    .nav-item {
      display: flex;
      align-items: center;
      font-weight: 600;
      padding-left: 10px;
      padding-right: 10px;
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
      &.green {
        background: #0bb976;
      }
    }
  }
  .avaturl-wrapper {
    margin-right: 50px;
    color: #412c21;
    font-size: 12px;
    .el-dropdown {
      .wrapper {
        cursor: pointer;
        display: flex;
        align-items: center;
        .imgAvaturl {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .down {
          margin-top: 6px;
          margin-left: 2px;
          font-size: 12px;
          cursor: pointer;
        }
      }
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
img {
  border-radius: 50%;
}
</style>