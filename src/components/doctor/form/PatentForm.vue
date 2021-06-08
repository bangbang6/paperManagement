<template>
  <div class="paper-form">
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="title">上传专利</div>
    </div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="国内专利号" :style="{width:'400px'}" prop="relativeId" v-if="form.isUsa">
        <el-input v-model="form.relativeId"></el-input>
      </el-form-item>
      <el-form-item label="缴费时间" v-if="form.isUsa">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          size="small"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="驳回" v-if="form.isUsa">
        <el-checkbox v-model="form.isRefuse">是否被驳回</el-checkbox>
      </el-form-item>
      <el-form-item label="驳回原因" v-if="form.isRefuse" :style="{width:'400px'}">
        <el-input v-model="form.refuseReason"></el-input>
      </el-form-item>
      <el-form-item :label="form.isUsa?'专利名称(中)':'专利名称'" :style="{width:'400px'}" prop="title">
        <el-input v-model="form.title"></el-input>
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
              <!--  <el-form-item label="通讯">
                <el-checkbox v-model="author.connect"></el-checkbox>
              </el-form-item>
              <el-form-item label="一作">
                <el-checkbox v-model="author.first"></el-checkbox>
              </el-form-item>-->
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

      <el-form-item label="专利状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="prepare" v-if="form.status === 0">
        <el-form-item label="组别" prop="ofGroup0">
          <el-input v-model="form.ofGroup0" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="依托项目" prop="project0">
          <el-input v-model="form.project0" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks0" :style="{width:'220px'}"></el-input>
        </el-form-item>
      </div>
      <div class="meeting" v-if="form.status === 1">
        <el-form-item label="组别" prop="ofGroup1">
          <el-input v-model="form.ofGroup1" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="专利申请号" prop="applyNum1">
          <el-input v-model="form.applyNum1" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="专利申请日" prop="applyDate1">
          <el-date-picker
            v-model="form.applyDate1"
            type="date"
            :style="{width:'220px'}"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="专利权人" prop="institution1">
          <el-input v-model="form.institution1" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="代理单位" prop="agent1">
          <el-input v-model="form.agent1" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="依托项目" prop="project1">
          <el-input v-model="form.project1" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" :style="{width:'220px'}"></el-input>
        </el-form-item>
      </div>
      <div class="qikan" v-if="form.status === 2">
        <el-form-item label="组别" prop="ofGroup2">
          <el-input v-model="form.ofGroup2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="专利申请号" prop="applyNum2">
          <el-input v-model="form.applyNum2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="专利号" prop="patentNum2">
          <el-input v-model="form.patentNum2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="专利申请日" prop="applyDate2">
          <el-date-picker
            v-model="form.applyDate2"
            type="date"
            :style="{width:'220px'}"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="专利公告日" prop="publishDate2">
          <el-date-picker
            v-model="form.publishDate2"
            type="date"
            :style="{width:'220px'}"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="专利权人" prop="institution2">
          <el-input v-model="form.institution2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="代理单位" prop="agent2">
          <el-input v-model="form.agent2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="依托项目" prop="project2">
          <el-input v-model="form.project2" :style="{width:'220px'}"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" :style="{width:'220px'}"></el-input>
        </el-form-item>
      </div>

      <el-form-item :style="{display:'flex',justifyContent:'flex-end'}">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
/* import MeetingForm from './MeetingForm' */
import { uploadPatent } from '@/api/teacher.js'
import { getUserByChineseName } from '@/api/paper'

/* import QikanForm from './QikanForm.vue' */
export default {

  data () {

    return {
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
        ofGroup0: "",
        ofGroup1: "",
        ofGroup2: "",
        applyNum1: "",
        applyNum2: "",
        patentNum1: "",
        patentNum2: "",
        applyDate1: "",
        applyDate2: "",
        publishDate1: "",
        publishDate2: "",
        agent1: "",
        agent2: "",
        project0: "",
        project1: "",
        project2: "",
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
        ofGroup0: [{ required: true, message: '请输入组别', trigger: 'blur' }],
        ofGroup1: [{ required: true, message: '请输入组别', trigger: 'blur' }],
        ofGroup2: [{ required: true, message: '请输入组别', trigger: 'blur' }],
        status: [{ required: true, message: '请选择专利状态', trigger: 'change' }],
        project0: { required: true, message: '请输入依托项目', trigger: 'blur' },
        project1: { required: true, message: '请输入依托项目', trigger: 'blur' },
        project2: { required: true, message: '请输入依托项目', trigger: 'blur' },

        applyDate1: { required: true, message: '请输入专利申请日', trigger: 'change' },
        applyDate2: { required: true, message: '请输入专利申请日', trigger: 'change' },
        applyNum1: { required: true, message: '请输入专利申请号', trigger: 'blur' },
        applyNum2: { required: true, message: '请输入专利申请号', trigger: 'blur' },
        institution1: { required: true, message: '请输入专利权人', trigger: 'blur' },
        institution2: { required: true, message: '请输入专利权人', trigger: 'blur' },
        agent1: { required: true, message: '请输入代理单位', trigger: 'blur' },
        agent2: { required: true, message: '请输入代理单位', trigger: 'blur' },
        publishDate1: { required: true, message: '请输入专利公告日', trigger: 'change' },
        publishDate2: { required: true, message: '请输入专利公告日', trigger: 'change' },
        patentNum2: { required: true, message: '请输入专利号', trigger: 'blur' },
        relativeId: { required: true, message: '请输入国外专利号', trigger: 'blur' },

      }
    }
  },

  methods: {
    addAuthor () {
      this.form.authorsList.push({
        chineseName: "",
        englishName: "",
        email: "",
        connect: false,
        first: false
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

              }))
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

    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let statsProps = {
            ofGroup: this.form['ofGroup' + this.form.status],
            applyNum: this.form['applyNum' + this.form.status],
            applyDate: this.form['applyDate' + this.form.status],
            institution: this.form['institution' + this.form.status],
            agent: this.form['agent' + this.form.status],
            project: this.form['project' + this.form.project],
          }
          let formData = {
            ...this.form,
            ...statsProps,
            isRefuse: Number(this.form.isRefuse),
            isUsa: Number(this.form.isUsa),
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
          uploadPatent(formData).then(res => {
            console.log('res', res);
            if (res.code === 200) {
              this.$message({
                message: "上传成功",
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
    console.log('', this.$route.query.isUsa);
    console.log('isUsa', this.$route.query.isUsa);
    this.form.isUsa = this.$route.query.isUsa == 1 ? true : false
    console.log(this.form.isUsa)
  },
  watch: {
    '$route.query.isUsa': function (newV, oldV) {
      console.log('newV', newV, oldV);
      newV == 1 ? this.form.isUsa = true : this.form.isUsa = false
      console.log(this.form.isUsa)

    }
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
::v-deep .el-icon-circle-check {
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: inline-block;
}
::v-deep .el-input__suffix-inner {
  height: 30px;
}
</style>