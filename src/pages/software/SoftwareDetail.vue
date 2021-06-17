<template>
  <div class="paper-form">
    <div class="title">
      <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
      <span class="value">{{form.title}}</span>
      <div></div>
    </div>

    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="版权名称" :style="{width:'400px'}" prop="title">
        <span>{{form.title}}</span>
      </el-form-item>

      <el-form-item label="著作人">
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
                <span :style="{width:'160px'}">{{author.chineseName}}</span>
              </el-form-item>
              <el-form-item label="英文名">
                <span :style="{width:'160px'}">{{author.englishName}}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span :style="{width:'160px'}">{{author.email}}</span>
              </el-form-item>
              <!--  <el-form-item label="通讯">
                <el-checkbox v-model="author.connect"></el-checkbox>
              </el-form-item>
              <el-form-item label="一作">
                <el-checkbox v-model="author.first"></el-checkbox>
              </el-form-item>-->
            </div>
            <el-form-item label="单位" class="organizationWrapper">
              <div
                v-for="(organization,index2) in author.organizations"
                :key="index2"
                :style="{marginBottom:'10px',width:'740px'}"
              >
                <span>{{organization.label}}</span>
              </div>
            </el-form-item>
          </el-card>
        </el-form>
      </el-form-item>

      <el-form-item label="版权状态" prop="status">
        <span :style="{width:'160px'}">{{form.status == 0?'拟定申请':'申请通过'}}</span>
      </el-form-item>
      <div class="prepare" v-if="form.status === 0">
        <!-- <el-form-item label="组别" prop="ofGroup">
          <el-input v-model="form.ofGroup" :style="{width:'220px'}"></el-input>
        </el-form-item>-->
        <el-form-item label="依托项目" v-if="form.project">
          <span :style="{width:'220px'}">{{form.project}}</span>
        </el-form-item>
        <el-form-item label="备注" v-if="form.remarks">
          <span :style="{width:'220px'}">{{form.remarks}}</span>
        </el-form-item>
      </div>
      <div class="meeting" v-if="form.status === 1">
        <!-- <el-form-item label="组别" prop="ofGroup">
          <el-input v-model="form.ofGroup" :style="{width:'220px'}"></el-input>
        </el-form-item>-->
        <el-form-item label="证书号" prop="certificateNumber" v-if="form.certificateNumber">
          <span :style="{width:'220px'}">{{form.certificateNumber}}</span>
        </el-form-item>
        <el-form-item label="登记号" prop="registerNum" v-if="form.registerNum">
          <span :style="{width:'220px'}">{{form.registerNum}}</span>
        </el-form-item>
        <el-form-item label="登记日期" prop="registerDate" v-if="form.registerDate">
          <span :style="{width:'220px'}">{{formatDate(form.registerDate)}}</span>
        </el-form-item>
        <el-form-item label="单位" prop="institution" v-if="form.institution">
          <span :style="{width:'220px'}">{{form.institution}}</span>
        </el-form-item>

        <el-form-item label="依托项目" v-if="form.project">
          <span :style="{width:'220px'}">{{form.project}}</span>
        </el-form-item>
        <el-form-item label="备注" v-if="form.remarks">
          <span :style="{width:'220px'}">{{form.remarks}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
 
<script>
/* import MeetingForm from './MeetingForm' */
import { upload, getSoftwareVO } from '@/api/software.js'
import { getUserByChineseName } from '@/api/paper'

/* import QikanForm from './QikanForm.vue' */
export default {

  data () {
    return {
      status: "",
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

        project: "",
        remarks: "",
        registerNum: "",
        certificateNumber: "",
        registerDate: "",
        institution: "",
      },
      options: [
        {
          label: '拟定申请',
          value: 0
        },
        {
          label: '申请通过',
          value: 1
        },

      ],

      rules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' },

        certificateNumber: { required: true, message: '请输入证书号', trigger: 'blur' },
        status: { required: true, message: '请选择专利状态', trigger: 'change' },


        registerNum: { required: true, message: '请输入登记号', trigger: 'change' },
        registerDate: { required: true, message: '请输入登记日期', trigger: 'blur' },
        institution: { required: true, message: '请输入单位', trigger: 'blur' },

      }
    }
  },

  methods: {
    handleStatusChange (e) {
      console.log('e', e, this.status);
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
        email: ""
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

              })) : [{ label: '' }]
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
          if (this.form.isUsa == 0) {
            this.form.time = []
            this.form.relativeId = ''
          }
          let formData = {
            ...this.form,



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

          upload(formData).then(res => {
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
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000
              })
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

    },

  },
  mounted () {
    this.id = this.$route.query.id || 2
    getSoftwareVO(this.id).then(res => {
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
    margin-bottom: 20px;
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
::v-deep .el-icon-circle-check {
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
}
::v-deep .el-input__suffix-inner {
  height: 30px;
}
::v-deep .el-icon-arrow-up {
  height: 30px;

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