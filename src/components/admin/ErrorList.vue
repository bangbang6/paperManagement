<template>
  <div class="error-list">
    <div class="title">异常成果</div>
    <div class="list">
      <div class="list-item bold">
        <div class="status">状态</div>
        <div class="paper-title">论文名</div>
        <div class="author">作者</div>
        <div class="type">发表类型</div>
        <div class="date">上链时间</div>
      </div>
      <div
        class="list-item"
        v-for="(paper,index) in papers"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="paper-title">
          <el-tag
            :type="item === '题目重复'?'danger':'warning'"
            size="mini"
            effect="dark"
            v-for="item in paper.exception.slice(0,1)"
            :key="item"
          >{{item}}</el-tag>
        </div>
        <div class="paper-title overflow">{{paper.title}}</div>
        <div class="author overflow">{{paper.authors}}</div>
        <div class="type overflow">{{paper.publicTypeName}}</div>
        <div class="date overflow">{{formatDate(paper.uploadChainDate)}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getErrorList } from '@/api/chain'
export default {
  data () {
    return {
      papers: []
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },

    handleClick (index) {
      let title = this.papers[index].title
      this.$router.push({
        path: "/admin/errorStatus",
        query: { title: title }
      })
    }

  },
  mounted () {


    getErrorList().then(res => {
      if (res.code === 200) {
        this.papers = res.data.slice(0, 6)
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })

      }
    })
  }
}
</script>
 
<style lang="scss" scoped>
.error-list {
  overflow-y: auto;
  height: 100%;
  .title {
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
  }
  .list {
    top: 20px;
    .list-item {
      display: flex;
      border-bottom: 1px solid #eee;
      .paper-title,
      .author,
      .type,
      .date,
      .status {
        flex: 1;
        width: 20%;
        height: 20px;
        padding: 5px 5px;
        text-align: center;
        font-size: 12px;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }

      /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
      &.bold {
        font-weight: bold;
      }
    }
  }
}
</style>

 