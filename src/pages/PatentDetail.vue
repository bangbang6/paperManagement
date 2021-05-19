<template>
  <div class="paper-detail">
    <el-card shadow="always">
        <div class="title">
            <el-button type="primary" size="mini" @click="back">返回</el-button>
            <span>{{paper.title}}</span>
            <div></div>
        </div>
      <div class="paper-info">
        <div class="left">
            <div class="zaiyao">
                <span>专利标题:</span>
                <el-input v-model="paper.title"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请公布号:</span>
                 <el-input v-model="paper.gongbuhao"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请公布日:</span>
                <el-input v-model="paper.gongburi"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请号:</span>
                <el-input v-model="paper.shengqinghao"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请日:</span>
                <el-input v-model="paper.shengqingri"></el-input>
            </div>
            <div class="zaiyao">
                <span>申请人:</span>
                <el-input v-model="paper.patentPerson"></el-input>

            </div>
            <div class="group-wrapper">
                <span>地址:</span>
                <div class="wrapper2">
                    <div class="group" v-for="(address,index) in paper.location " :key="address">
                        <el-input v-model="address.label"></el-input>
                        <el-button
                                type="danger"
                                size="mini"
                                class="deleteBtn"
                                @click="deleteGroup(index)"
                        >删除</el-button>
                    </div>
                    <div :style="{marginTop:'5px'}">
                        <el-button type="primary" size="mini" @click="addGroup()">新增</el-button>
                    </div>
                </div>
            </div>
            <div class="group-wrapper">
                <span>发明人:</span>
                <div class="wrapper2">
                    <div class="group" v-for="(name,index) in paper.authors " :key="name">
                        <el-input v-model="name.label"></el-input>
                        <el-button
                                type="danger"
                                size="mini"
                                class="deleteBtn"
                                @click="deleteAuthors(index)"
                        >删除</el-button>
                    </div>
                    <div :style="{marginTop:'5px'}">
                        <el-button type="primary" size="mini" @click="addAuthors()">新增</el-button>
                    </div>
                </div>
            </div>
            <div class="zaiyao">
                <span>专利代理机构:</span>
                <el-input v-model="paper.instru"></el-input>
            </div>
            <div class="zaiyao">
                <span>代理人:</span>
                <el-input v-model="paper.dailiren"></el-input>
            </div>
            <div class="group-wrapper">
                <span>Int.CI:</span>
                <div class="wrapper2">
                    <div class="group" v-for="(name,index) in paper.intCI " :key="name">
                        <el-input v-model="name.label"></el-input>
                        <el-button
                                type="danger"
                                size="mini"
                                class="deleteBtn"
                                @click="deleteIntCI(index)"
                        >删除</el-button>
                    </div>
                    <div :style="{marginTop:'5px'}">
                        <el-button type="primary" size="mini" @click="addIntCI()">新增</el-button>
                    </div>
                </div>
            </div>
            <div class="input">
                <span style="width: 100px;display: inline-block;">摘要:</span>
                <el-input v-model="paper.abstract" type="textarea" :rows="6" :cols="60" style="flex: 1"></el-input>
            </div>
        </div>
      </div>
        <div class="operation">
        <el-card shadow="always">
          <div class="download">
            <i class="el-icon-download"></i>
            <span>下载</span>
          </div>
        </el-card>
        </div>
        <div class="btn-wrapper">
            <el-button type="primary" style="float: right">修改</el-button>
        </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      repeat: {
        rate: "",
        file: "",
        success: '1'
      },
        ruleForm: {
            title:'',
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        rules: {
            title: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
        },
        paper:{
          title:"一种区块链数据共享加密和解密方法、设备及存储介质",
          gongbuhao:"CN 111385301 A" ,
          gongburi:"2020.07.07",
          shengqinghao:"202010150007 .7",
          shengqingri:"2020 .03 .06",
          patentPerson: "湖南智慧政务区块链科技有限公司",
          location:[{label:"417000 湖南省娄底市娄星区万宝镇"},{label:"高铁南站广场东侧区块链产业园2楼"}],
          authors:[{label:"谢超良"},{label:"赵辉"},{label:"王超"}],
          instru:"长沙心智力知识产权代理事务所(普通合伙) 43233",
          dailiren:"谢如意",
          intCI:[{label:"H04L 29/06(2006 .01)"},{label:"H04L 29/08(2006 .01)"},{label:"H04L 9/00(2006 .01)"}],
          abstract:"本发明公开了一种区块链数据共享加密和解密方法、设备及存储介质，属于区块链技术领域。包括至少一个第一方创建同态代理重加密密钥对私钥A和公钥A1；对明文a进行加密得到密文a1；将密文a1上传到区块链；至少一个第二方创建同态代理重加密密钥对私钥B和公钥B1；对明文b进行加密得到密文b1；将密文b1上传到区块链；所述第一方和第二方均从区块链的智能合约获取公钥C1；第一方将公钥C1和私钥A进行代理重加密，得到密钥rekeyA，上传到区块链；第二方将公钥C1和私钥B进行代理重加密，得到密钥rekeyB，上传到区块链；其中，智能合约通过同态加密创建密钥对钥私C和公钥C1。解决了基于区块链的隐私数据进行安全计算的同态问题，减少了用户与区块链，用户与用户之间的交互流程，将链下的一些操作移到链上，使计算更具有可信力。"
        }
    }
  },

  methods: {
    back () {
      this.$router.back()
    },
    reject () {

    },
      addGroup () {
          this.paper.location.push({
              label:''
          })
      },
      deleteGroup (index) {
          this.paper.location.splice(index, 1)
      },
      addAuthors () {
          this.paper.authors.push({
              label:''
          })
      },
      deleteAuthors(index) {
          this.paper.authors.splice(index, 1)
      },
      addIntCI () {
          this.paper.intCI.push({
              label:''
          })
      },
      deleteIntCI(index) {
          this.paper.intCI.splice(index, 1)
      },

  },
  mounted () {
    this.paperId = localStorage.getItem('paperId')
  }
}
</script>

<style lang="scss" scoped>
.paper-detail {
    height: 100%;
  margin-top: 20px;
  width: 60%;
  margin-left: 20%;
  box-sizing: border-box;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    text-align: center;
  }

  .paper-info {
    display: flex;
    justify-content: space-between;
    .left
        {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input {
        width: 100%;
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 80px;
        }
        .el-input {
          width: 200px;
        }
      }
      .zaiyao {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
        display: flex;
        span {
          display: inline-block;
          width: 100px;
        }
        div {
          flex: 1;
        }
      }
        .group-wrapper{
            width: 100%;
            font-size: 14px;
            margin-top: 20px;
            display: flex;

            span {
                display: inline-block;
                width: 100px;
                margin-top: 4px;
            }
            div {
                flex: 1;
            }
            input{
                width: 100%;
            }
            .wrapper2{
                .group{
                    display: flex;
                    margin-bottom: 5px;
                }
            }
        }
    }
  }
  .operation {
    display: flex;
    margin-top: 20px;
    cursor: pointer;
    .el-card {
      width: 20%;
      margin-right: 20px;
      .download,
      .see {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgb(64, 158, 255);
        &.red {
          color: red;
        }
        i {
          font-size: 32px;
        }
        span {
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .title-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    i {
      cursor: pointer;
    }
  }
  .input {
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 80px;
    }
    .el-input {
      width: 200px;
    }
  }
  .btn {
    width: 100%;
    margin-top: 10px;
    button {
      float: right;
    }
  }
}
</style>
<style scoped lang='scss'>
.append {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .add {
    font-size: 24px;
    color: rgb(64, 158, 255);
  }
}
span {
  font-weight: 600;
}
.card {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 5px;
  box-sizing: border-box;
  font-size: 14px;
  background: rgb(64, 158, 255);
  color: white;
}
</style>