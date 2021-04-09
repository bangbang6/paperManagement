<template>
  <div class="request">
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="发布审核">
        <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="title" label="论文标题" width="80"></el-table-column>

          <el-table-column prop="publicTypeName" label="发布类型" width="80"></el-table-column>
          <el-table-column prop="name" label="名称" width="80"></el-table-column>
          <el-table-column prop="website" label="网址" width="140"></el-table-column>
          <el-table-column prop="checkRate" label="查重率" width="80"></el-table-column>
          <el-table-column prop="conferenceDeadline" label="截止时间" width="80"></el-table-column>
          <el-table-column prop="authors" label="作者"></el-table-column>
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
          <el-table-column prop="title" label="论文标题" width="80"></el-table-column>

          <el-table-column prop="publicTypeName" label="发布类型" width="80"></el-table-column>

          <el-table-column prop="name" label="名称" width="160"></el-table-column>
          <el-table-column prop="website" label="网址" width="140"></el-table-column>
          <el-table-column prop="checkRate" label="查重率" width="80"></el-table-column>
          <el-table-column prop="authors" label="作者"></el-table-column>
          <el-table-column prop="action" label="操作" width="160">
            <template>
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
            message: res.msg,
            type: 'success',
            duration: 1000
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
      reviewToUpChain({ paperId: id, op: op }).then(res => {
        if (res.code === 200) {
          Message({
            message: res.msg,
            type: 'success',
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
  width: 60%;
  margin-left: 20%;
  .tab {
    width: 100%;
    margin-top: 20px;
    .table {
      width: 100%;
    }
  }
}
</style>