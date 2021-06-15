<template>
  <div class="user-center">
    <div class="top">
      <div class="left" @click="dialogVisible = true">
        <el-card>
          <div class="wrapper">
            <div class="user-left">
              <div class="pic">
                <img :src="imgSrc" class="avatual" />
                <input type="file" class="upload" accept="image/*" @change="uploadHead" @click.stop />
              </div>
              <div class="chinese-name">{{chineseName}}</div>
              <div class="english-name">英文名:{{englishName}}</div>
            </div>
            <div class="user-right">
              <div class="email">邮箱:{{email}}</div>
              <div class="orgs">
                <span>单位:</span>
                <!--   <span>{{organization}}</span> -->
                <div class="wrapper1" :style="{marginLeft:'5px',flex:1 }">
                  <div
                    v-for="(item) in organizations.slice(0,1)"
                    :key="item.label"
                    :style="{marginBottom:'5px'}"
                  >{{`${item.label}`}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div class="wrapper" :style="{color:'#00A885'}">
            <div class="card-left">
              <div class="title">我的成果</div>
              <div class="number">{{achvCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-gavel"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{color:'#E64C65'}">
            <div class="card-left">
              <div class="title">我的会议</div>
              <div class="number">{{huiyiCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-laptop"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper">
            <div class="card-left">
              <div class="title">我的期刊</div>
              <div class="number">{{qikanCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-equalizer"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{color:'#E38C09'}">
            <div class="card-left">
              <div class="title">我的专利</div>
              <div class="number">{{patentCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-equalizer"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{color:'#909399'}">
            <div class="card-left">
              <div class="title">我的软著</div>
              <div class="number">{{softwareCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-yelp"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{color:'#FF3A30'}">
            <div class="card-left">
              <div class="title">异常</div>
              <div class="number">{{exceptionCount}}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-Error-Outline"></i>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="bottom">
      <el-card>
        <el-radio-group v-model="myRadio" size="mini">
          <el-radio-button label="我的论文"></el-radio-button>
          <el-radio-button label="我的专利"></el-radio-button>
          <el-radio-button label="我的软著"></el-radio-button>
        </el-radio-group>
        <my-paper v-if="myRadio === '我的论文'"></my-paper>
        <my-patent v-if="myRadio === '我的专利'"></my-patent>
        <my-software v-if="myRadio === '我的软著'"></my-software>
      </el-card>
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
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleUpdate" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import MyPaper from './MyPaper.vue'
import MyPatent from './MyPatent.vue'
import MySoftware from './MySoftware.vue'
import { updateUserInfo, getUserInfo, getAvatar, setAvatar } from '@/api/user'
import { getMyDashboard } from '@/api/dashboard'
import { Bus } from '../../main'
export default {
  components: { MyPaper, MyPatent, MySoftware },
  data () {
    return {
      myRadio: '我的论文',
      imgSrc: require("../../../public/avatual.png"),
      chineseName: "",
      englishName: "",
      email: "",
      userNumber: "",
      organizations: [{ label: "" }],
      radio: '1',
      ofGroup: "",
      dialogVisible: false,
      sex: "",
      organization: "",
      achvCount: 29,
      exceptionCount: 6,
      huiyiCount: 6,
      patentCount: 1,
      qikanCount: 4,
      softwareCount: 2,
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
          this.$message({
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
              this.$message({
                message: res.msg,
                duration: 1000,
                type: 'error'
              })
            }

          })
        } else {
          this.$message({
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
        ofGroup: this.ofGroup,
        organization: this.organizations.map(item => item.label).join('#')
      }
      updateUserInfo(user).then(res => {
        console.log('res', res);
        if (res.code === 200) {
          this.achvCount = res.achvCount
          this.exceptionCount = res.exceptionCount
          this.huiyiCount = res.huiyiCount
          this.patentCount = res.patentCount
          this.qikanCount = res.qikanCount
          this.softwareCount = res.softwareCount
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }

      })
    },
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
        this.$message({
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
    getMyDashboard().then(res => {
      console.log('mydash', res);
    })
  }
}
</script>
 
<style lang="scss" scoped>
.user-center {
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;

  .top {
    display: flex;
    height: 240px;
    .left {
      width: 36%;
      height: 200px;
      cursor: pointer;

      .el-card {
        width: 100%;
        height: 220px;
        .wrapper {
          display: flex;

          .user-left {
            flex: 1 0 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .pic {
              margin-top: 20px;
              position: relative;
              cursor: pointer;

              .avatual {
                width: 60px;
                height: 60px;
                border-radius: 50%;
              }
              .upload {
                opacity: 0;
                position: absolute;
                top: 0px;
                left: 0;

                width: 60px;

                height: 60px;
                border-radius: 50%;
              }
            }
            .chinese-name {
              font-size: 14px;
              margin-top: 10px;
              font-weight: bold;
            }
            .english-name {
              font-size: 12px;
              margin-top: 10px;
            }
          }
          .user-right {
            flex: 1 0 70%;
            display: flex;
            flex-direction: column;
            font-size: 12px;
            margin-top: 10px;
            .email,
            .orgs {
              margin-top: 20px;
              display: flex;
            }
          }
        }
      }
    }
    .right {
      margin-left: 20px;

      width: 64%;
      display: flex;
      height: 220px;
      flex-wrap: wrap;
      .el-card {
        width: 32%;
        margin-right: 8px;

        &:nth-child(1) {
          margin-bottom: 8px;
        }
        &:nth-child(2) {
          margin-bottom: 8px;
        }
        &:nth-child(3) {
          margin-bottom: 8px;
        }
        .wrapper {
          display: flex;
          .card-left {
            flex: 1 0 60%;
            text-align: center;
            font-size: 14px;
            .number {
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
            }
          }
          .card-right {
            flex: 1 0 40%;
            display: flex;
            align-items: center;
            i {
              font-size: 30px;
            }
          }
        }
      }
    }
  }
  .bottom {
    height: 600px;
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