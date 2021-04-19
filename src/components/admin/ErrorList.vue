<template>
  <div class="error-list">
    <div class="title">异常论文</div>
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
          <el-tag :type="paper.type" size="mini" effect="dark">{{paper.status}}</el-tag>
        </div>
        <div class="paper-title overflow">{{paper.title}}</div>
        <div class="author overflow">{{paper.author}}</div>
        <div class="type overflow">{{paper.publicTypeName}}</div>
        <div class="date overflow">{{formatDate(paper.chainDate)}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      papers: []
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
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
    this.papers = [

      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'danger',


      },

      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'warning',


      },
      {
        title: "Foridar1111111111111",
        author: 'bang2222222222222',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang2222222',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '多次修改',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',



      }
    ]
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
    margin-top: 20px;
    .list-item {
      display: flex;
      border-bottom: 1px solid #eee;
      .paper-title,
      .author,
      .type,
      .date,
      .status {
        flex: 1;
        height: 20px;
        padding: 5px 5px;
        text-align: center;
        font-size: 12px;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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