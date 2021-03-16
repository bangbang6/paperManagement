<template>
  <div class="request">
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="发布审核">
        <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="shareUserChannelName" label="论文标题" width="80"></el-table-column>

          <el-table-column prop="sharedUserName" label="发布类型" width="80"></el-table-column>
          <el-table-column prop="sharedUserChannelName" label="名称" width="80"></el-table-column>
          <el-table-column prop="channelName" label="查重率" width="80"></el-table-column>
          <el-table-column prop="channelName" label="截止时间"></el-table-column>
          <el-table-column prop="channelName" label="作者"></el-table-column>
          <el-table-column prop="action" label="操作" width="160">
            <template slot-scope="scope">
              <el-radio v-model="scope.status" label="1">同意</el-radio>
              <el-radio v-model="scope.status" label="2">拒绝</el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="上链审核">
        <el-table :data="tableData2" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="shareUserChannelName" label="论文标题" width="80"></el-table-column>

          <el-table-column prop="sharedUserName" label="发布类型" width="80"></el-table-column>

          <el-table-column prop="channelName" label="会议名" width="160"></el-table-column>
          <el-table-column prop="channelName" label="作者"></el-table-column>
          <el-table-column prop="action" label="操作" width="160">
            <template slot-scope="scope">
              <el-radio v-model="scope.status" label="1">同意</el-radio>
              <el-radio v-model="scope.status" label="2">拒绝</el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
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
    }
  },
  mounted () {
    this.tableData1 = [{
      shareUserName: 'xxx',
      shareUserChannelName: 'yyy',
      id: 1
    }]
    this.tableData2 = [{
      shareUserName: 'xxx',
      shareUserChannelName: 'yyy',
      id: 1
    }]
    /* getAllRequest().then(res => {
      console.log('userRequest', res);
      if (res.data.code === 200) {
        this.parser(res.data.data)
      } else {
        alert(res.data.message)
      }
    }) */
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