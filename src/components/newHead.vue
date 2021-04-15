<template>
  <div class="head">
    <div class="title-wrapper">
      <div class="img-wrapper">
        <img src="../../public/avatual.png" alt class="img" />
      </div>
      <div class="title">论文管理系统</div>
    </div>
    <div class="nav" @click="navJump">
      <div :class="['nav-item',navIndex === 0?'green':'']" data-item="0" v-if="role===1">首页</div>
      <div :class="['nav-item',navIndex === 1?'green':'']" data-item="1" v-if="role===0">用户中心</div>
      <div :class="['nav-item',navIndex === 1?'green':'']" data-item="1" v-else>论文审核</div>

      <div :class="['nav-item',navIndex === 2?'green':'']" data-item="2" v-if="role===0">上传论文</div>
      <div :class="['nav-item',navIndex === 2?'green':'']" data-item="2" v-else>编辑会议</div>
      <div :class="['nav-item',navIndex === 3?'green':'']" data-item="3" v-if="role===0">我的论文</div>
      <div :class="['nav-item',navIndex === 4?'green':'']" data-item="4" v-if="role===0">链上论文</div>
      <div :class="['nav-item',navIndex === 4?'green':'']" data-item="4" v-if="role===1">链上论文</div>
      <div :class="['nav-item',navIndex === 5?'green':'']" data-item="5" v-if="role===1">异常预警</div>
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
import { Bus } from '../main.js'
export default {
  props: {
    role: Number
  },
  data () {
    return {
      navIndex: 0,
      imgSrc: require("../../public/avatual.png")
    }
  },
  computed: {
    chineseName () {
      return localStorage.getItem('chineseName') || 'admin'
    }
  },
  methods: {
    navJump (e) {
      if (this.role === 0) {
        if (e.target.dataset.item === '1') {

          this.$router.push('/teacher/userCenter')
        } else if (e.target.dataset.item === '2') {
          this.$router.push('/teacher/fileManagement')
        }
        else if (e.target.dataset.item === '3') {
          console.log('e', e);
          this.$router.push('/teacher/myfile')

        }
        else if (e.target.dataset.item === '4') {
          console.log('e', e);
          this.$router.push('/teacher/allfile')

        }
      } else {
        if (e.target.dataset.item === '0') {

          this.$router.push('/admin')
        } else if (e.target.dataset.item === '1') {

          this.$router.push('/admin/paperRequest')
        } else if (e.target.dataset.item === '2') {
          this.$router.push('/admin/editMeeting')

        }
        else if (e.target.dataset.item === '4') {
          console.log('e', e);
          this.$router.push('/admin/allfile')

        }
        else if (e.target.dataset.item === '5') {
          console.log('e', e);
          this.$router.push('/admin/errorStatus')

        }
      }
    },
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
  watch: {
    $route: {
      handler: function (newV) {
        if (newV.name === 'user' || newV.name === 'paperRequest') {
          this.navIndex = 1
        }
        else if (newV.name === 'AdminMain') {
          this.navIndex = 0
        }
        else if (newV.name === 'fileManagement' || newV.name === 'editMeeting') {
          this.navIndex = 2
        } else if (newV.name === 'myfile') {
          this.navIndex = 3
        }
        else if (newV.name === 'allfile') {
          this.navIndex = 4
        }
        else if (newV.name === 'errorStatus') {
          this.navIndex = 5
        }
      },
      immediate: true
    }

  }
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