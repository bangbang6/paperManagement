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
          <el-input v-model="name" placeholder="姓名"></el-input>
        </div>
        <div class="tel">
          <el-input v-model="tel" placeholder="联系方式"></el-input>
        </div>
        <div class="work">
          <el-input v-model="work" placeholder="所在组别"></el-input>
        </div>
        <div class="sex-wrapper">
          <div class="sex">性别:</div>
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </div>

        <div class="save">
          <el-button type="primary">保存修改</el-button>
        </div>
      </div>
    </div>
    <div class="paper">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">论文统计</div>
      </div>
      <div class="paperNum">
        <div class="num-item">一作作文数:{{firstNum}}</div>
        <div class="num-item">二作作文数:{{secondNum}}</div>
        <div class="num-item">通讯作文数:{{ThirdNum}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      imgSrc: require("../../public/avatual.png"),
      name: "",
      tel: "",
      work: "",
      radio: '1',
      firstNum: 666,
      secondNum: 666,
      ThirdNum: 666,
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
      .sex-wrapper,
      .save {
        margin-top: 20px;
      }
      .sex-wrapper {
        display: flex;
        align-items: center;
      }
      .sex {
        padding-right: 20px;
        box-sizing: border-box;
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