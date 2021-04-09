<template>
  <div class="find-repeat">
    <el-card shadow="always">
      <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
        <el-table-column prop="title" label="论文标题" width="160"></el-table-column>

        <el-table-column prop="publicTypeName" label="发布类型" width="160"></el-table-column>
        <el-table-column prop="name" label="名称" width="80"></el-table-column>

        <el-table-column prop="conferenceDeadline" label="截止时间" width="80"></el-table-column>
        <el-table-column prop="authors" label="作者"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
import { checkPaper } from '@/api/repeat'
import { Message } from 'element-ui'
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

    checkPaper().then(res => {
      if (res.code === 200) {
        console.log('res', res);
        this.tableData1 = res.data.map(data => ({
          ...data,
          conferenceDeadline: data.conferenceDeadline ? new Date(data.conferenceDeadline).toLocaleDateString() : ''
        }))
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    })
    /*  getUserInfo().then(res=>{
       if(res.code === 200){
         localStorage.setItem('role',res.data.role)
       }else{
         Message({
           message:res.msg,
           duration:1000,
           type:'error'
         })
       }
     }) */
  }

}
</script>
 
<style lang="scss" scoped>
.find-repeat {
  width: 60%;
  margin-left: 20%;
}
</style>