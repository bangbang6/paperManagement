<template>
  <div class="find-repeat">
    <el-card shadow="always">
      <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
        <el-table-column prop="shareUserChannelName" label="论文标题" width="160"></el-table-column>

        <el-table-column prop="sharedUserName" label="发布类型" width="80"></el-table-column>
        <el-table-column prop="sharedUserChannelName" label="名称" width="80"></el-table-column>

        <el-table-column prop="channelName" label="截止时间"></el-table-column>
        <el-table-column prop="channelName" label="作者"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      tableData1: []
    }
  },
  methods: {
    clickRow (row) {
      console.log('row', row);
      localStorage.setItem('paperId', row.id)
      this.$router.push('/paperDetail')
    }
  },
  mounted () {
    this.tableData1 = [
      { shareUserChannelName: "数据库系统概论", id: 1 }
    ]
  }
}
</script>
 
<style lang="scss" scoped>
.find-repeat {
  width: 60%;
  margin-left: 20%;
}
</style>