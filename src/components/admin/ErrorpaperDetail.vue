<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{title}}</div>
        <div class="message">
          <div class="line">
            <span class="key bold">基本信息</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">作者</span>
            <span class="value">{{authors}}</span>
          </div>
          <div class="line">
            <span class="key">发表类型</span>
            <span class="value">{{publicTypeName}}</span>
          </div>
          <div class="line">
            <span class="key">期刊名称</span>
            <span class="value">{{name}}</span>
          </div>
          <div class="line">
            <span class="key">发表时间</span>
            <span class="value">{{formatDate(date)}}</span>
          </div>
          <div class="line">
            <span class="key">项目号</span>
            <span class="value">{{projectNum}}</span>
          </div>
          <div class="line">
            <span class="key">项目基金</span>
            <span class="value">{{projectFund}}</span>
          </div>
          <div class="line">
            <span class="key">上传者</span>
            <span class="value">{{uploader}}</span>
          </div>
          <div class="line">
            <span class="key">上传单位</span>
            <span class="value">{{organization}}</span>
          </div>
          <div class="line">
            <span class="key">上链时间</span>
            <span class="value">{{formatDate(chainDate)}}</span>
          </div>
        </div>
      </div>
      <div class="operation">
        <div class="op">
          <span class="bold">操作信息</span>
        </div>
        <div class="op-detail">
          <div class="col-line">
            <div class="con" v-for="(item,index) in histroys" :key="index">
              <i :class="`dot dot${index}`" :style="{top:(index*68)+'px'}"></i>
              <div
                :class="`bar bar${index}`"
                :style="{top:(index*68)+8+'px'}"
                v-if="index !== histroys.length-1"
              ></div>
            </div>
            <div class="time">
              <div class="con" v-for="(item,index) in histroys" :key="index">
                <span
                  :class="`time-item`"
                  :style="{top:(-3+index*68)+'px'}"
                >{{formatDate(item.updateTime)}}</span>
              </div>
            </div>
          </div>

          <div class="tags">
            <div class="tag" v-for="(item,index) in histroys" :key="index">
              <el-tag
                type="info"
                :class="`tag-item`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.updateUsername}}</el-tag>
              <!--  <el-tag
                type="info"
                :class="`tag-item2`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.updateUserOrg}}</el-tag>-->
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="item.updateUserOrg"
                width="800"
              >
                <el-tag
                  type="info"
                  :class="`tag-item2`"
                  :style="{top:(-1+(index*68))+'px'}"
                  size="mini"
                  slot="reference"
                >{{item.updateUserOrg}}</el-tag>
              </el-popover>
              <el-tag
                type="info"
                :class="`tag-item3`"
                :style="{top:(-1+(index*68))+'px'}"
                size="mini"
              >{{item.op}}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Message } from 'element-ui';
import { getErrorDetail, getHistory } from '@/api/chain'
export default {
  props: {
    paperId: Number
  },
  data () {
    return {
      title: '',
      authors: '',
      publicTypeName: '',
      projectNum: '',
      projectFund: '',
      uploader: '',
      organization: '',
      chainDate: new Date(),
      date: new Date(),
      name: '',
      histroys: [
        /* {
          operation: "修改论文",
          user: 'Adrain Hadopool',
          date: new Date()
        },
        {
          operation: "修改论文",
          user: '学生',
          date: new Date()
        },
        {
          operation: "上传论文",
          user: '代老师',
          date: new Date()
        }, */
      ]
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

    /* this.title = 'Trustzone-based secure lightweight wallet for hyperlerdger fabric'
    this.author = 'Weiqi Dai Qinyuan Zeli Wang Xiaobin Hai Jin'
    this.publicTypeName = '期刊'
    this.name = 'Journal of Parallel and Distributed Computing'
    this.date = new Date()
    this.projectNum = '0x0023104123'
    this.projectFund = '国家xx项目xx基金'
    this.uploader = '代老师'
    this.organization = '华中科技大学计算机学院cgcl实验室'
    this.chainDate = new Date() */
  },
  watch: {
    paperId: {
      handler: function (newV) {
        console.log('newV', newV);
        /* this.title = newV.title
        this.author = newV.author
        this.publicTypeName = newV.publicTypeName
        this.name = newV.name
        this.date = new Date()
        this.projectNum = newV.projectNum
        this.projectFund = newV.projectFund
        this.uploader = newV.uploader
        this.organization = '华中科技大学计算机学院cgcl实验室'
        this.chainDate = newV.chainDate */

        getErrorDetail(this.paperId).then(res => {
          if (res.code === 200) {

            res = res.data
            this.title = res.title
            this.authors = res.authors.join(',')
            this.publicTypeName = res.publicTypeName
            this.name = res.name
            this.date = res.uploadDate
            this.projectNum = res.projectNum
            this.projectFund = res.projectFund
            this.uploader = res.uploaderUsername
            this.organization = res.uploaderOrganization
            this.chainDate = res.uploadChainDate
          } else {
            Message({
              message: res.msg,
              status: 'error',
              duration: 1000
            })
          }
        })
        getHistory(this.paperId).then(res => {
          if (res.code === 200) {
            console.log('history', res);
            this.histroys = res.data
          } else {
            Message({
              message: res.msg,
              status: 'error',
              duration: 1000
            })
          }
        })
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.err-detail {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  .detail-wrapper {
    padding: 5px 10px;
    padding-top: 20px;

    box-sizing: border-box;
    .detail {
      .title {
        font-weight: bold;
        width: 70%;
        height: 60px;
      }
      .message {
        width: 100%;
        margin-top: 10px;
        .line {
          display: flex;
          padding-top: 5px;
          padding-bottom: 5px;
          box-sizing: border-box;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 12px;
            &.bold {
              font-weight: bold;
              font-size: 12px;
            }
          }
          .key {
            width: 60px;
          }
          .value {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
    .operation {
      font-size: 12px;
      margin-top: 20px;
      .op {
        .bold {
          font-weight: bold;
        }
      }
      .op-detail {
        display: flex;
        justify-content: space-around;

        .con {
          width: 40px;
          position: relative;
          margin-top: 25px;
          margin-left: 40px;
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;

            background: #1b60ec;
          }
          .bar {
            height: 60px;
            width: 1px;
            left: 4px;
            background: #87abf5;
            position: absolute;
          }
        }
        .time {
          position: relative;
          width: 150px;
          margin-left: 40px;
          .time-item {
            position: absolute;
            align-items: center;
          }
        }
        .tags {
          position: relative;
          width: 400px;
          margin-top: 22px;
          .tag-item {
            position: absolute;
            width: 100px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .tag-item2 {
            position: absolute;
            cursor: pointer;
            width: 100px;
            left: 100px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .tag-item3 {
            position: absolute;
            width: 100px;
            left: 200px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>