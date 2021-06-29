<template>
  <div
    class="paper-form"
    v-loading.fullScreen.lock="loading"
    element-loading-text="正在上传"
    element-loading-spinner="el-icon-loading"
  >
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="title">上传论文</div>
    </div>
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="论文标题" :style="{width:'400px'}" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="作者">
        <el-form
          v-for="(author,index) in form.authorList"
          :model="author"
          :ref="'author'+index"
          :key="index"
          inline
          label-width="60px"
        >
          <el-card shadow="never">
            <div>
              <el-form-item label="中文名">
                <el-input
                  v-model="author.chineseName"
                  :style="{width:'160px'}"
                  @change="name=>getUser(name,index)"
                ></el-input>
              </el-form-item>
              <el-form-item label="英文名">
                <el-input v-model="author.englishName" :style="{width:'160px'}"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="author.email" :style="{width:'160px'}"></el-input>
              </el-form-item>
              <el-form-item label="通讯">
                <el-checkbox v-model="author.correspondAuthor"></el-checkbox>
              </el-form-item>
              <el-form-item label="一作">
                <el-checkbox v-model="author.firstAuthor"></el-checkbox>
              </el-form-item>
            </div>
            <el-form-item label="单位" class="organizationWrapper">
              <div v-for="(organization,index2) in author.organizations" :key="index2">
                <el-input v-model="organization.label" :style="{width:'740px'}"></el-input>
                <el-button
                  type="danger"
                  size="mini"
                  :style="{marginLeft:'20px'}"
                  @click="deleteOrganization(index,index2)"
                >删除</el-button>
              </div>

              <el-button
                type="primary"
                size="mini"
                :style="{marginTop:'10px'}"
                @click="addOrganization(index)"
              >新增</el-button>
            </el-form-item>
          </el-card>
        </el-form>
        <div class="add-icon-wrapper" @click="addAuthor">
          <i class="el-icon-circle-plus-outline"></i>
        </div>
      </el-form-item>
      <!-- <el-form-item label="论文状态">
        <el-radio-group v-model="form.status" size="mini">
          <el-radio-button label="录用"></el-radio-button>
          <el-radio-button label="发表"></el-radio-button>
          <el-radio-button label="收录"></el-radio-button>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="发表类型" prop="publicType">
        <el-select v-model="form.publicType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-checkbox v-model="form.confIsTop80" :style="{marginLeft:'20px'}">是否为top80</el-checkbox>
      </el-form-item>

      <div class="meeting" v-if="form.publicType === 1">
        <el-form-item label="会议类别" prop="confType">
          <el-select v-model="form.confType" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议全称" prop="fullName">
          <el-input v-model="form.fullName" placeholder="会议全称" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="会议缩写">
          <el-input v-model="form.shortName" placeholder="会议缩写" :style="{width:'220px'}"></el-input>
        </el-form-item>

        <el-form-item label="会议时间">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            size="small"
            :style="{width:'460px'}"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="会议地点">
          <el-input v-model="form.confPlace" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="页码">
          <el-input v-model="form.pageNumStart" :style="{width:'100px'}"></el-input>
          <span :style="{display:'inline-block',width:'30px',textAlign:'center'}">一</span>
          <el-input v-model="form.pageNumEnd" :style="{width:'100px'}"></el-input>
          <el-checkbox v-model="form.confIsElectronic" :style="{marginLeft:'20px'}">电子版</el-checkbox>
        </el-form-item>
        <el-form-item label="会议报告人">
          <el-input v-model="form.confReporter" :style="{width:'220px'}"></el-input>
        </el-form-item>
      </div>
      <div class="qikan" v-if="form.publicType === 2">
        <el-form-item label="期刊类别" prop="journalType1">
          <el-select v-model="form.journalType1" placeholder="请选择" :style="{width:'220px'}">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>

          <el-select
            v-model="form.journalType2"
            placeholder="请选择"
            :style="{width:'220px',marginLeft:'20px'}"
          >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="期刊全称" prop="fullName">
          <el-input v-model="form.fullName" placeholder="期刊全称" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="期刊缩写">
          <el-input v-model="form.shortName" placeholder="期刊缩写" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="卷号">
          <el-input v-model="form.journalVolumeNum" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="期号">
          <el-input v-model="form.journalIssueNum" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="页码">
          <el-input v-model="form.journalPageNumStart" :style="{width:'100px'}"></el-input>
          <span :style="{display:'inline-block',width:'30px',textAlign:'center'}">一</span>
          <el-input v-model="form.journalPageNumEnd" :style="{width:'100px'}"></el-input>
        </el-form-item>
        <el-form-item label="发表日期">
          <el-date-picker
            v-model="form.journalPublishTime"
            type="date"
            placeholder="选择日期"
            :style="{width:'220px'}"
          ></el-date-picker>
          <el-checkbox v-model="form.firstPublish" :style="{marginLeft:'20px'}">是否为首发</el-checkbox>
        </el-form-item>
        <el-form-item label="ISSN/ISBN">
          <el-input v-model="form.issn" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="doi">
          <el-input v-model="form.doi" :style="{width:'220px'}"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="项目信息">
        <div v-for="(project,index) in form.projects" :key="index">
          <el-input v-model="project.projectNum" :style="{width:'220px'}" placeholder="项目号"></el-input>
          <el-input
            v-model="project.projectFund"
            :style="{width:'220px',marginLeft:'20px'}"
            placeholder="项目基金"
          ></el-input>
          <i class="el-icon-circle-plus-outline icon2" @click="addProject"></i>
        </div>
      </el-form-item>
      <el-form-item :style="{display:'flex',justifyContent:'flex-end'}">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
/* import MeetingForm from './MeetingForm' */
import { uploadPaper } from '@/api/teacher.js'
import { getConfType, getJournalType2, getJournalType1 } from '@/api/type.js'
import { getUserByChineseName } from '@/api/paper'
import { MessageBox } from 'element-ui'

/* import QikanForm from './QikanForm.vue' */
export default {

  data () {

    return {
      loading: false,
      form: {
        title: "",
        status: "录用",
        publicType: 1,
        authorList: [{
          chineseName: "",
          englishName: "",
          email: "",
          organizations: [
            {
              label: ''
            }
          ],
          correspondAuthor: false,
          firstAuthor: false
        }],
        projects: [
          {
            projectNum: '',
            projectFund: ''
          }
        ],
        //meeting
        confType: "",
        confIsTop80: false,
        fullName: "",
        shortName: "",
        time: "",
        confPlace: "",
        pageNumStart: "",
        pageNumEnd: "",
        confIsElectronic: "",
        confReporter: "",
        confirm: false,
        //qikan
        journalType1: '',
        journalType2: '',
        journalIssueNum: '',
        journalPageNumStart: '',
        journalPageNumEnd: '',
        journalPublishTime: '',
        firstPublish: false,

        journalVolumeNum: '',
        issn: '',
        doi: '',
        options2: [],

      },
      options: [
        {
          label: '会议',
          value: 1
        },
        {
          label: '期刊',
          value: 2
        },
      ],

      rules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' },
        confType: [{ required: true, message: '请输入会议类别', trigger: 'change' }],
        publicType: [{ required: true, message: '请输入发表类型', trigger: 'change' }],
        journalType1: { required: true, message: '请输入期刊类型', trigger: 'blur' },

        fullName: { required: true, message: '请输入全称', trigger: 'blur' },
      }
    }
  },

  methods: {
    addAuthor () {
      this.form.authorList.push({
        chineseName: "",
        englishName: "",
        email: "",
        correspondAuthor: false,
        firstAuthor: false
      })
    },
    getUser (name, authorIndex) {
      getUserByChineseName(name).then(res => {
        if (res.code === 200) {
          if (res.data) {
            /*  authors: [
             { chineseName: { label: "", status: true }, engishName: { label: "", status: true }, email: { label: "", status: true }, organization: [{ label: "", status: true }], connect: false, first: false },
 
           ], */
            let author = {
              chineseName: res.data.chineseName,
              englishName: res.data.englishName,
              email: res.data.email,
              organizations: res.data.organization.split('#').map(item => ({
                label: item

              })),
              correspondAuthor: false,
              firstAuthor: false
            }
            this.form.authorList.splice(authorIndex, 1, author)


          }
        } else {
          /*  Message({
             type: 'error',
             duration: 1000,
             message: res.msg
           }) */
        }
      })
    },
    addOrganization (index1) {
      this.form.authorList[index1].organizations.push({ label: '' })
    },
    deleteOrganization (index1, index2) {
      this.form.authorList[index1].organizations.splice(index2, 1)

    },
    addProject () {
      this.form.projects.push({
        projectNum: '',
        projectFund: ''
      })
    },
    submit () {
      this.loading = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          let status = 0
          if (this.form.publicType == 1) {
            status = 0
          } else {
            if (this.form.journalVolumeNum === '') {
              status = 0

            } else {
              status = 1

            }
          }

          let formData = {
            ...this.form,
            firstPublish: Number(this.form.firstPublish),
            confIsTop80: Number(this.form.confIsTop80),
            status: status,
            confIsElectronic: Number(this.form.confIsElectronic),

            confStartTime: this.form.time[0],
            confEndTime: this.form.time[1],
            authorList: this.form.authorList.map(author => {
              let org = author.organizations.map(org => org.label).join('#')
              return {
                chineseName: author.chineseName,
                englishName: author.englishName,
                correspondAuthor: Number(author.correspondAuthor),
                firstAuthor: Number(author.firstAuthor),
                email: author.email,
                organization: org
              }
            })
          }
          uploadPaper(formData).then(res => {
            this.loading = false
            console.log('res', res);
            if (res.code === 200) {
              this.$message({
                message: "上传成功",
                type: 'success',
                duration: 1000
              })
              /* this.$refs.form.resetFields()
              for (let i = 0; i < this.form.authorsList.length; i++) {
                console.log('this.$refs.author0', this.$refs.author0);
                this.$refs['author' + i].resetFields()
              } */
              this.$router.push('/teacher/userCenter')
            } else if (res.code === 409) {
              MessageBox.confirm('链上有同名文件会触发异常', '提示', {
                confirmButtonText: '继续上传',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                formData.confirm = true
                uploadPaper(formData).then(res2 => {
                  if (res2.code === 200) {
                    this.$message({
                      message: "上传成功",
                      type: 'success',
                      duration: 1000
                    })
                  } else {
                    this.$message({
                      message: res.msg,
                      type: 'error',
                      duration: 1000
                    })
                  }
                })
              }).catch(() => {

                this.$message({
                  message: '已取消',
                  type: 'success',
                  duration: 1000
                })
              })
            }
            else {
            this.loading = false

              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000
              })
            }
          }, () => {
            this.loading = false

          })


        } else {
          this.$message({
            type: 'error',
            message: '请填写必要信息',
            duration: 1000
          })
        }
      });

    }
  },
  mounted () {


    Promise.all([getConfType(), getJournalType1(), getJournalType2()]).then(options => {

      this.options2 = options[0].data.map((item, index) => ({ value: index + 1, label: item }))
      this.options3 = options[1].data.map((item, index) => ({ value: index + 1, label: item }))
      this.options4 = options[2].data.map((item, index) => ({ value: index + 1, label: item }))
    })
  }

}
</script>
 
<style lang="scss" scoped>
.paper-form {
  width: 80%;
  margin-left: 10%;

  background: white;
  padding: 20px;
  box-sizing: border-box;
  /* height: calc(100% - 50px); */
  /*   overflow-y: auto; */

  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

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
  .organizationWrapper {
    width: 100%;
    align-items: center;
  }
  .add-icon-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 20px;
    height: 30px;
    align-items: center;
    border: 1px solid #eee;
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .icon2 {
    font-size: 20px;
    color: rgb(64, 158, 255);
    cursor: pointer;

    margin-left: 20px;
  }
}
::v-deep .el-icon-arrow-up {
  height: 30px !important;
  line-height: 1 !important;
}
</style>