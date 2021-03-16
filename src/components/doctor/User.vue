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
          <span>英文名:</span>
          <span>{{engishName}}</span>
        </div>
        <div class="sex">
          <span>性别:</span>
          <span>{{sex}}</span>
        </div>
        <div class="tel">
          <span>邮箱:</span>
          <span>{{email}}</span>
        </div>
        <div class="work">
          <span>所在单位:</span>
          <span>{{work}}</span>
        </div>

        <div class="change">
          <el-button type="primary" @click=" dialogVisible = true">修改</el-button>
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
          <el-input v-model="engishName"></el-input>
        </div>
        <div class="sex">
          <span>性别:</span>
          <el-input v-model="sex"></el-input>
        </div>
        <div class="tel">
          <span>邮箱:</span>
          <el-input v-model="email"></el-input>
        </div>
        <div class="work">
          <span>所在单位:</span>

          <el-input v-model="work"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="paper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">论文统计</div>
      </div>
      <div class="paperNum">
        <div class="num-item">一作作文数:{{firstNum}}</div>
        <div class="num-item">通讯作文数:{{secondNum}}</div>
        <div class="num-item">其他:{{ThirdNum}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      imgSrc: require("../../../public/avatual.png"),
      chineseName: "廖振邦",
      engishName: "",
      email: "1578015790@hust.com",
      work: "",
      radio: '1',
      firstNum: 666,
      secondNum: 666,
      ThirdNum: 666,
      dialogVisible: false,
      sex: ""
    }

  },
  methods: {
    uploadHead (e) {
      const file = e.target.files[0]
      console.log('file', file);
      const reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.imgSrc = res.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
 
<style lang="scss" scoped>
.center {
  width: 60%;
  margin-top: 20px;
  margin-left: 20%;
  box-shadow: 0 0 2px #eaeaea;
  height: 600px;
  .info {
    height: 400px;
    display: flex;
    .left {
      width: 20%;
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
</style>