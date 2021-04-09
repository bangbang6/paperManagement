<template>
  <div class="head">
    <div class="title-wrapper">
      <div class="title">华中科技大学论文管理系统</div>
      <div class="sub-title">HUST THESIS MANAGEMENT SYSTEM</div>
    </div>
    <div class="nav" @click="navJump">
      <div :class="['nav-item',navIndex === 0?'blue':'']" data-item="0" v-if="role===1">首页</div>
      <div :class="['nav-item',navIndex === 1?'blue':'']" data-item="1" v-if="role===0">用户中心</div>
      <div :class="['nav-item',navIndex === 1?'blue':'']" data-item="1" v-else>论文审核</div>

      <div :class="['nav-item',navIndex === 2?'blue':'']" data-item="2" v-if="role===0">上传论文</div>
      <div :class="['nav-item',navIndex === 2?'blue':'']" data-item="2" v-else>编辑会议</div>
      <div :class="['nav-item',navIndex === 3?'blue':'']" data-item="3" v-if="role===0">我的论文</div>
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
      } else {
        if (e.target.dataset.item === '0') {

          this.$router.push('/admin')
        } else if (e.target.dataset.item === '1') {

          this.$router.push('/admin/paperRequest')
        } else if (e.target.dataset.item === '2') {
          this.$router.push('/admin/editMeeting')

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
img {
  border-radius: 50%;
}
</style>