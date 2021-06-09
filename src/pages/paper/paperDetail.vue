<template>
  <div class="paper-form">
    <div class="title">
      <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
      <span>{{form.title}}</span>
      <div></div>
    </div>
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="论文标题" :style="{width:'400px'}" prop="title">
        <span>{{form.title}}</span>
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
                <span>{{form.chineseName}}</span>
              </el-form-item>
              <el-form-item label="英文名">
                <span>{{form.englishName}}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{form.email}}</span>
              </el-form-item>
              <el-tag v-if="author.firstAuthor" :style="{marginRight:'5px'}">一作</el-tag>
              <el-tag type="success" v-if="author.connectAuthor">通讯</el-tag>
            </div>
            <el-form-item label="单位" class="organizationWrapper">
              <div v-for="(organization,index2) in author.organizations" :key="index2">
                <span>{{organization.label}}</span>
              </div>
            </el-form-item>
          </el-card>
        </el-form>
      </el-form-item>
      <el-form-item label="论文状态">
        <span>{{form.status}}</span>
      </el-form-item>
      <el-form-item label="发表类型" prop="publicType">
        <span>{{form.publicType}}</span>

        <!--  <el-checkbox v-model="form.confIsTop80" :style="{marginLeft:'20px'}">是否为top80</el-checkbox> -->
      </el-form-item>

      <div class="meeting" v-if="form.publicType === 1">
        <el-form-item label="会议类别" prop="confType">
          <span>{{form.confType}}</span>
        </el-form-item>
        <el-form-item label="会议全称" prop="fullName">
          <span>{{form.fullName}}</span>
        </el-form-item>
        <el-form-item label="会议缩写">
          <span>{{form.shortName}}</span>
        </el-form-item>

        <el-form-item label="会议时间">
          <!--  <el-date-picker
            v-model="form.time"
            type="daterange"
            size="small"
            :style="{width:'460px'}"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>-->
          <span>{{formatDate(form.starTtime)}}</span>
          <span :style="{display:'inline-block',width:'20px',textAlign:'center'}">一</span>
          <span>{{formatDate(form.endTime)}}</span>
        </el-form-item>
        <el-form-item label="会议地点">
          <span>{{form.confPlace}}</span>
        </el-form-item>
        <el-form-item label="页码">
          <!-- <el-input v-model="form.pageNumStart" :style="{width:'100px'}"></el-input>
          <span :style="{display:'inline-block',width:'30px',textAlign:'center'}">一</span>
          <el-input v-model="form.pageNumEnd" :style="{width:'100px'}"></el-input>-->
          <span>{{formatDate(form.pageNumStart)}}</span>
          <span :style="{display:'inline-block',width:'20px',textAlign:'center'}">一</span>
          <span>{{formatDate(form.pageNumEnd)}}</span>
          <!--  <el-checkbox v-model="form.confIsElectronic" :style="{marginLeft:'20px'}">电子版</el-checkbox> -->
        </el-form-item>
        <el-form-item label="会议报告人">
          <span>{{form.confReporter}}</span>
        </el-form-item>
      </div>
      <div class="qikan" v-if="form.publicType === 2">
        <el-form-item label="期刊类别" prop="journalType1">
          <!--  <el-select v-model="form.journalType1" placeholder="请选择" :style="{width:'220px'}">
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
          </el-select>-->
          <span>{{form.journalType1}} {{form.journalType2}}</span>
        </el-form-item>

        <el-form-item label="期刊全称" prop="fullName">
          <span>{{form.fullName}}</span>
        </el-form-item>
        <el-form-item label="期刊缩写">
          <span>{{form.shortName}}</span>
        </el-form-item>
        <el-form-item label="卷号">
          <span>{{form.journalVolumeNum}}</span>
        </el-form-item>
        <el-form-item label="期号">
          <span>{{form.journalIssueNum}}</span>
        </el-form-item>
        <el-form-item label="页码">
          <span>{{formatDate(form.pageNumStart)}}</span>
          <span :style="{display:'inline-block',width:'20px',textAlign:'center'}">一</span>
          <span>{{formatDate(form.pageNumEnd)}}</span>
        </el-form-item>
        <el-form-item label="发表日期">
          <span>{{form.journalPublishTime}}</span>

          <!-- <el-checkbox v-model="form.firstPublish" :style="{marginLeft:'20px'}">是否为首发</el-checkbox> -->
        </el-form-item>
        <el-form-item label="ISSN/ISBN">
          <span>{{form.issn}}</span>
        </el-form-item>
        <el-form-item label="doi">
          <span>{{form.doi}}</span>
        </el-form-item>
      </div>

      <el-form-item label="项目信息">
        <div v-for="(project,index) in form.projects" :key="index">
          <!--  <el-input v-model="project.projectNum" :style="{width:'220px'}" placeholder="项目号"></el-input>
          <el-input
            v-model="project.projectFund"
            :style="{width:'220px',marginLeft:'20px'}"
            placeholder="项目基金"
          ></el-input>-->
          <span>{{project.project.projectNum}}</span>
          <span>{{project.projectFund}}</span>
          <!--   <i class="el-icon-circle-plus-outline icon2" @click="addProject"></i> -->
        </div>
      </el-form-item>
      <!--  <el-form-item :style="{display:'flex',justifyContent:'flex-end'}">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
 
<script>
/* import MeetingForm from './MeetingForm' */
import { uploadPaper } from '@/api/teacher.js'
import { getConfType, getJournalType2, getJournalType1 } from '@/api/type.js'
import { getUserByChineseName, getPaperDetail } from '@/api/paper'

/* import QikanForm from './QikanForm.vue' */
export default {

  data () {
    this.statusOptions = [
      '录用',
      '发表',
      '收录'
    ]
    return {
      publicType: '',
      status: '',
      form: {

        title: "",
        status: "",
        publicType: "",
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
        website: "",
        pageNumStart: "",
        pageNumEnd: "",
        confIsElectronic: "",
        confReporter: "",

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
        doi: ''


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

    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },

  },
  mounted () {
    Promise.all([getConfType(), getJournalType1(), getJournalType2()]).then(options => {

      this.options2 = options[0].data.map((item, index) => ({ value: index + 1, label: item }))
      this.options3 = options[1].data.map((item, index) => ({ value: index + 1, label: item }))
      this.options4 = options[2].data.map((item, index) => ({ value: index + 1, label: item }))
    })
    this.id = this.$route.query.id || 89
    console.log('this.id', this.id);
    getPaperDetail(this.id).then(res => {
      console.log('res', res);
      if (res.code === 200) {
        this.publicType = res.data.publicType

        this.form = {
          ...res.data,
          time: [res.data.confStartTime, res.data.confEndTime],
          firstPublish: Boolean(res.data.firstPublish),
          confIsTop80: Boolean(res.data.confIsTop80),
          status: res.data.status == 0 ? '录用' : res.data.status == 1 ? '发表' : "收录",
          authorList: res.data.authorList.map(author => ({
            ...author,
            organizations: author.organization ? author.organization.split('#').map(item => ({ label: item })) : [{ label: "" }],
            correspondAuthor: Boolean(author.correspondAuthor),
            firstAuthor: Boolean(author.firstAuthor),
          }))
        }
        this.status = this.form.status
      } else {
        this.$message({
          message: res.msg,
          duration: 1000,
          type: 'error'
        })
      }
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
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    align-items: center;
    text-align: center;
    .content {
      flex: 1;
      margin-left: 5px;
    }
    .el-button {
      width: 60px;
    }
  }
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