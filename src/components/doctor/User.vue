<template>
  <div class="center">
    <div class="info">
      <div class="left">
        <div class="title-wrapper">
          <div class="line"></div>
          <div class="title">资料管理</div>
        </div>
        <div class="avatual-wrapper">
          <img :src="imgSrc" class="avatual" />
          <el-button class="btn" type="primary">修改头像</el-button>
          <input type="file" class="upload" accept="image/*" @change="uploadHead" />
        </div>
      </div>
      <div class="right">
        <div class="name">
          <span>中文名:</span>
          <span>{{chineseName}}</span>
        </div>
        <div class="name">
          <span>学号:</span>
          <span>{{userNumber}}</span>
        </div>
        <div class="name">
          <span>英文名:</span>
          <span>{{englishName}}</span>
        </div>
          <div class="name">
              <span>所属组别:</span>
              <span>{{ofGroup}}</span>
          </div>
        <div class="tel">
          <span>邮箱:</span>
          <span>{{email}}</span>
        </div>
        <div class="work">
          <span :style="{width:'80px',display:'inline-block'}">所在单位:</span>
          <!--   <span>{{organization}}</span> -->
          <div class="wrapper" :style="{marginLeft:'5px',flex:1}">
            <div v-for="(item) in organizations" :key="item.label">{{`${item.label}`}}</div>
          </div>
        </div>

        <div class="change">
          <el-button type="primary" @click="dialogVisible = true">修改</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%">
      <div class="change-message">
        <div class="name">
          <span>中文名:</span>
          <el-input v-model="chineseName"></el-input>
        </div>
        <div class="name">
          <span>英文名:</span>
          <el-input v-model="englishName"></el-input>
        </div>
        <div class="name">
          <span>学号:</span>
          <el-input v-model="userNumber"></el-input>
        </div>
          <div class="name">
              <span>所属组别:</span>
              <el-input v-model="ofGroup"></el-input>
          </div>
        <div class="tel">
          <span>邮箱:</span>
          <el-input v-model="email"></el-input>
        </div>
        <div class="work">
          <span>单位:</span>
          <div class="wrapper">
            <div v-for="(group,groupIndex) in organizations" :key="groupIndex" class="group">
              <el-input v-model="group.label" type="textarea" :rows="1" :cols="50"></el-input>
              <el-button
                type="danger"
                size="mini"
                class="deleteBtn"
                @click="deleteGroup(groupIndex)"
              >删除</el-button>
            </div>
            <el-button
              type="primary"
              size="mini"
              class="addGroup"
              @click="addGroup()"
              :style="{marginTop:'10px'}"
            >新增</el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!--  <div class="paper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">论文统计</div>
      </div>
      <div class="paperNum">
        <div class="num-item">一作作文数:{{firstNum}}</div>
        <div class="num-item">通讯作文数:{{secondNum}}</div>
        <div class="num-item">其他:{{ThirdNum}}</div>
      </div>
    </div>-->
  </div>
</template>
 
<script>
import { updateUserInfo, getUserInfo, getAvatar, setAvatar } from '@/api/user'
import { Message } from 'element-ui'
import { Bus } from '../../main'
export default {
  data () {
    return {
      imgSrc: require("../../../public/avatual.png"),
      chineseName: "",
      englishName: "",
      email: "",
      userNumber: "",
      organizations: [{ label: "" }],
      radio: '1',
      ofGroup:"",
      firstNum: 666,
      secondNum: 666,
      ThirdNum: 666,
      dialogVisible: false,
      sex: "",
      organization: ""
    }

  },

  methods: {
    uploadHead (e) {
      const file = e.target.files[0]
      console.log('file', file);
      let formData = new FormData();
      formData.append("avatar", file);
      setAvatar(formData).then(res => {
        console.log('res', res);
        if (res.code === 200) {
          Message({
            message: res.msg,
            duration: 1000,
            type: 'success'
          })
          getAvatar().then(res => {
            if (res.code === 200) {
              console.log('res', res);
              this.imgSrc = `data:${res.data.type};base64,${res.data.data}`
              Bus.$emit('changeAvatual', this.imgSrc)
            } else {
              Message({
                message: res.msg,
                duration: 1000,
                type: 'error'
              })
            }

          })
        } else {
          Message({
            message: res.msg,
            duration: 1000,
            type: 'error'
          })
        }

      })
      /*   const reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.imgSrc = res.result
          console.log('file', file);
          
        }
        reader.readAsDataURL(file) */
    },
    addGroup () {
      this.organizations.push({ label: "" })
    },
    deleteGroup (index) {
      this.organizations.splice(index, 1)
    },
    handleUpdate () {
      this.dialogVisible = false
      let user = {
        chineseName: this.chineseName,
        email: this.email,
        englishName: this.englishName,
         ofGroup:this.ofGroup,
        organization: this.organizations.map(item => item.label).join('#')
      }
      updateUserInfo(user).then(res => {
        console.log('res', res);
      })
    },
  },
  computed: {

  },
  mounted () {
    getUserInfo().then(res => {
      if (res.code === 200) {
        /* localStorage.setItem('role', res.data.role) */
        console.log('res', res);
        this.chineseName = res.data.chineseName
        this.email = res.data.email
        this.organization = res.data.organization
        this.organizations = res.data.organization ? res.data.organization.split('#').map(item => ({ label: item })) : []
        this.userNumber = res.data.userNumber
        this.username = res.data.username
        this.ofGroup = res.data.ofGroup
        this.englishName = res.data.englishName
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
    getAvatar().then(res => {
      console.log('res', res);
      if (res.code === 200) {
        this.imgSrc = `data:${res.data.type};base64,${res.data.data}`
      }
    })
  }
}
</script>
 
<style lang="scss" scoped>
.center {
  width: 80%;
  overflow-y: auto;

  margin-left: 10%;
  background: white;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  /*  height: calc(100% - 50px); */
  height: 100%;
  .info {
    height: 400px;
    display: flex;
    .left {
      width: 20%;
      padding-left: 20px;
      box-sizing: border-box;
      .title-wrapper {
        height: 50px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 5px;
        .line {
          background-color: rgb(64, 158, 255);
          height: 20px;
          width: 2px;
        }
        .title {
          margin-left: 5px;
        }
      }
      .avatual-wrapper {
        width: 100%;
        margin-top: 20px;
        position: relative;
        .avatual {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .upload {
          opacity: 0;
          position: absolute;
          top: 120px;
          left: 0;
          width: 100px;

          height: 30px;
          line-height: 30px;
        }
        .btn {
          height: 30px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 120px;
          left: 0;
          width: 100px;
          cursor: pointer;
        }
      }
    }
    .right {
      flex: 1;
      padding-top: 50px;
      box-sizing: border-box;
      .name,
      .tel,
      .work,
      .sex,
      .change {
        margin-top: 20px;
        span:nth-child(2) {
          margin-left: 4px;
        }
        &.work {
          display: flex;
        }
      }
    }
  }
  .paper {
    .title-wrapper {
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 5px;
      .line {
        background-color: rgb(64, 158, 255);
        height: 20px;
        width: 2px;
      }
      .title {
        margin-left: 5px;
      }
    }
    .paperNum {
      width: 100%;
      display: flex;
      align-items: center;
      .num-item {
        margin-right: 40px;
      }
    }
  }
}
</style>
<style scoped lang='scss'>
.change-message {
  .name,
  .tel,
  .work,
  .sex {
    span {
      display: inline-block;
      width: 80px;
    }
    margin-bottom: 10px;
    display: flex;
  }
}
.work {
  .group {
    display: flex;
  }
}
</style>