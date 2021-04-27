<template>
  <div class="request">
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="发布审核">
        <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="title" label="论文标题" width="180">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publicTypeName" label="发布类型" width="85"></el-table-column>
          <el-table-column prop="name" label="名称" width="160">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="website" label="网址" width="140">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.website}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkRate" label="查重率" width="80"></el-table-column>
          <el-table-column prop="conferenceDeadline" label="截止时间" width="80"></el-table-column>
          <el-table-column prop="authors" label="作者">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.authors}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="reviewToPublic(scope.row.id,1)">同意</el-button>
              <el-button type="danger" size="mini" @click="reviewToPublic(scope.row.id,0)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="上链审核">
        <el-table :data="tableData2" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="title" label="论文标题" width="180">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.title}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="publicTypeName" label="发布类型" width="100"></el-table-column>

          <el-table-column prop="name" label="名称" width="140">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="website" label="网址" width="140">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.website}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkRate" label="查重率" width="80">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.checkRate+"%"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="authors" label="作者">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.authors}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="reviewToUpChain(scope.row.id,1)">同意</el-button>
              <el-button type="danger" size="mini" @click="reviewToUpChain(scope.row.id,0)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { getToAcceptedReviewPapers, getToPublicReviewPapers, reviewToPublic, reviewToUpChain } from '@/api/admin'
export default {
  data () {
    return {
      tableData1: [],
      tableData2: [],
      groupDisable: false
    }
  },
  methods: {

    clickRow (row, column) {
      console.log('column', column);
      if (column.property === 'action') return
      localStorage.setItem('paperId', row.id)
      this.$router.push('/paperDetail')
    },
    reviewToPublic (id, op) {
      reviewToPublic({ paperId: id, op: op }).then(res => {
        if (res.code === 200) {

          Message({
            message: '已发邮件通知用户文件审批完成',
            type: 'success',
            duration: 2000
          })
          this.getPublic()
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    reviewToUpChain (id, op) {
      MessageBox.confirm('此操作将以当前身份进行签名后上链, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reviewToUpChain({ paperId: id, op: op }).then(res => {
          if (res.code === 200) {
            console.log('res', res);
            Message({
              message: '已发邮件通知各作者文件已上链',
              type: 'success',
              duration: 2000
            })
            this.getReview()
          } else if (res.code === 409) {
            Message({
              message: '链上有同名文件,将触发异常',
              type: 'warning',
              duration: 1000
            })
            this.getReview()

          } else {
            Message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      }).catch(() => {
        Message({
          message: '已取消',
          type: 'success',
          duration: 1000
        })
      })

    },
    getPublic () {
      getToPublicReviewPapers().then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.tableData1 = res.data.map(item => {
            return {
              ...item,
              checkRate: item.checkRate + '%',
              conferenceDeadline: item.conferenceDeadline ? new Date(item.conferenceDeadline).toLocaleDateString() : ''
            }
          })
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getReview () {
      getToAcceptedReviewPapers().then(res => {
        if (res.code === 200) {
          console.log('res', res);
          this.tableData2 = res.data

        } else {
          console.log('res', res);
          Message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  },

  mounted () {
    this.getPublic()
    this.getReview()

  },
  /*  watch: {
     tableData1: {
       handler (newValue, oldValue) {
         console.log(newValue, oldValue);
       },
       deep: true
     }
   } */
}
</script>
 
<style lang="scss" scoped>
.request {
  width: 80%;
  margin-left: 10%;
  height: calc(100% - 50px);

  overflow-y: auto;
  overflow-x: hidden;
  .tab {
    width: 100%;
    margin-top: 20px;

    .table {
      width: 100%;
      .overflow {
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;

        white-space: nowrap;
      }
    }
  }
}
</style>