<template>
  <div class="repeat-wrapper">
    <div class="find-repeat">
      <el-card shadow="always">
        <el-table :data="tableData1" class="table" size="mini" @row-click="clickRow">
          <el-table-column prop="title" label="论文标题" width="360">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.title}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="publicTypeName" label="发布类型" width="160"></el-table-column>
          <el-table-column prop="name" label="名称" width="240">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="conferenceDeadline" label="截止时间" width="80"></el-table-column>
          <el-table-column prop="authors" label="作者">
            <template slot-scope="scope">
              <span class="overflow">{{scope.row.authors}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
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
.repeat-wrapper {
  width: 100%;
  background: rgb(242, 239, 236);

  .find-repeat {
    width: 80%;
    margin-left: 10%;
    /* overflow-y: auto; */
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    height: 100%;
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>