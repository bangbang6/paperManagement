<template>
  <div class="paper-detail">
    <template>
      <div class="paper-form">
        <div class="title">
          <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
          <span>{{form.title}}</span>
          <div></div>
        </div>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item
            label="专利名称(中)"
            :style="{width:'400px'}"
            prop="relativeTitle"
            v-if="form.isUsa "
          >
            <span class="value">{{form.relativeTitle}}</span>
          </el-form-item>
          <el-form-item label="缴费时间" v-if="form.isUsa && form.payStarttime && form.payEndtime">
            <span>{{formatDate(form.payStarttime)}}</span>
            <span :style="{display:'inline-block',width:'20px',textAlign:'center'}">一</span>
            <span>{{formatDate(form.payEndtime)}}</span>
          </el-form-item>

          <el-form-item
            :label="form.isUsa?'专利名称(外)':'专利名称'"
            :style="{width:'400px'}"
            prop="title"
            v-if="form.title"
          >
            <span class="value">{{form.title}}</span>
          </el-form-item>

          <el-form-item label="发明人">
            <el-form
              v-for="(author,index) in form.authorsList"
              :model="author"
              :ref="'author'+index"
              :key="index"
              inline
              label-width="60px"
            >
              <el-card shadow="never">
                <div>
                  <el-form-item label="中文名">
                    <span>{{author.chineseName}}</span>
                  </el-form-item>
                  <el-form-item label="英文名">
                    <span>{{author.englishName}}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <span>{{author.email}}</span>
                  </el-form-item>
                </div>
                <el-form-item label="单位" class="organizationWrapper">
                  <div v-for="(organization,index2) in author.organizations" :key="index2">
                    <span>{{author.organization}}</span>
                  </div>
                </el-form-item>
              </el-card>
            </el-form>
          </el-form-item>

          <el-form-item label="专利状态" prop="status" v-if="statusWord">
            <span>{{statusWord}}</span>
          </el-form-item>
          <el-form-item label="组别" prop="ofGroup" v-if="form.ofGroup">
            <span>{{form.ofGroup}}</span>
          </el-form-item>
          <el-form-item label="依托项目" prop="project" v-if="form.project">
            <span>{{form.project}}</span>
          </el-form-item>
          <el-form-item label="专利申请号" prop="applyNum" v-if="form.applyNum">
            <span>{{form.applyNum}}</span>
          </el-form-item>

          <el-form-item label="专利申请日" prop="applyDate" v-if="form.applyDate">
            <span>{{formatDate(form.applyDate)}}</span>
          </el-form-item>
          <el-form-item label="授权公告日" prop="publishDate" v-if="form.publishDate">
            <span>{{formatDate(form.publishDate)}}</span>
          </el-form-item>
          <el-form-item label="专利权人" prop="institution" v-if="form.institution">
            <span>{{form.institution}}</span>
          </el-form-item>
          <el-form-item label="代理单位" prop="agent" v-if="form.agent">
            <span>{{form.agent}}</span>
          </el-form-item>
          <el-form-item label="备注" prop="remarks" v-if="form.remarks">
            <span>{{form.remarks}}</span>
          </el-form-item>

          <el-form-item label="驳回原因" v-if=" form.isUsa && form.isRefuse" :style="{width:'400px'}">
            <span>{{form.refuseReason}}</span>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
 
<script>
/* import MeetingForm from './MeetingForm' */
import { getUserByChineseName } from '@/api/paper'
import { getPatentVO, updatePatentVO } from '@/api/patent'

/* import QikanForm from './QikanForm.vue' */
export default {

  data () {

    return {
      status: 2,
      form: {
        title: "",
        status: "",
        authorsList: [{
          chineseName: "",
          englishName: "",
          email: "",
          organizations: [
            {
              label: ''
            }
          ],
          /*  connect: false,
           first: false */
        }],
        isRefuse: false,
        refuseReason: '',
        relativeId: '',

        ofGroup: "",
        applyNum: "",
        patentNum: "",
        applyDate: "",
        publishDate: "",
        agent: "",
        project: "",
        remarks: "",
        isUsa: false


      },
      options: [
        {
          label: '拟定申请',
          value: 0
        },
        {
          label: '申请未授权',
          value: 1
        },
        {
          label: '已授权',
          value: 2
        },
      ],

      rules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' },

        ofGroup: [{ required: true, message: '请输入组别', trigger: 'blur' }],
        status: [{ required: true, message: '请选择专利状态', trigger: 'change' }],



        applyDate: { required: true, message: '请输入专利申请日', trigger: 'change' },

        applyNum: { required: true, message: '请输入专利申请号', trigger: 'blur' },

        institution: { required: true, message: '请输入专利权人', trigger: 'blur' },

        agent: { required: true, message: '请输入代理单位', trigger: 'blur' },

        publishDate: { required: true, message: '请输入专利公告日', trigger: 'change' },
        patentNum: { required: true, message: '请输入专利号', trigger: 'blur' },
        relativeTitle: { required: true, message: '请输入国内专利号', trigger: 'blur' },

      }
    }
  },
  computed: {
    statusWord () {
      return this.options.filter(op => op.value === this.form.status).map(item => item.label)[0]
    }
  },
  methods: {
    handleChangeStatus (e) {
      if (e <= this.status) {
        this.$message({
          type: 'error',
          message: "禁止不合理修改状态",
          duration: 1000
        })
        this.form.status = this.status

      }
    },
    addAuthor () {
      this.form.authorsList.push({
        chineseName: "",
        englishName: "",
        email: "",

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
              organizations: res.data.organization ? res.data.organization.split('#').map(item => ({
                label: item

              })) : [{ label: "" }]
            }
            this.form.authorsList.splice(authorIndex, 1, author)


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
      this.form.authorsList[index1].organizations.push({ label: '' })
    },
    deleteOrganization (index1, index2) {
      this.form.authorsList[index1].organizations.splice(index2, 1)

    },
    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {

          let formData = {
            ...this.form,
            isRefuse: Number(this.form.isRefuse),
            isUsa: Number(this.form.isUsa),
            id: this.id,
            payStarttime: this.form.time[0],
            payEndtime: this.form.time[1],
            authorsList: this.form.authorsList.map(author => {
              let org = author.organizations.map(org => org.label).join('#')

              return {
                chineseName: author.chineseName,
                englishName: author.englishName,
                email: author.email,
                organization: org
              }
            })
          }
          updatePatentVO(formData).then(res => {
            console.log('res', res);
            if (res.code === 200) {
              this.$message({
                message: "修改成功",
                type: 'success',
                duration: 1000
              })
            } else {
              if (res.code === 200) {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 1000
                })
              }
            }
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
    this.id = this.$route.query.id || 32
    getPatentVO(this.id).then(res => {
      console.log('res', res);
      if (res.code === 200) {
        this.status = res.data.status
        this.form = {
          ...res.data,

          authorsList: res.data.authorsList.map(author => ({
            ...author,
            organizations: author.organization ? author.organization.split('#').map(item => ({ label: item })) : [{ label: "" }]
          }))
        }
      } else {
        this.$message({
          message: res.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
  },
  watch: {

  }

}
</script>
 
<style lang="scss" scoped>
.paper-form {
  width: 80%;
  margin-left: 10%;

  background: white;
  padding: 20px;
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
::v-deep .el-form-item__label {
  font-weight: 600;
}
.value {
  display: inline-block;
  width: 800px;
}
</style>
 