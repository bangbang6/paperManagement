<template>
  <div class="error-list">
    <div class="title">异常论文</div>
    <div class="list">
      <div class="list-item bold">
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
        <div class="paper-title">{{paper.title}}</div>
        <div class="author">{{paper.author}}</div>
        <div class="type">{{paper.publicTypeName}}</div>
        <div class="date">{{formatDate(paper.chainDate)}}</div>
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
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },

      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date()
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
      .paper-title,
      .author,
      .type,
      .date {
        flex: 1;
        height: 20px;
        padding: 5px 0;
        text-align: center;
        font-size: 12px;
      }
      &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      }
      &.bold {
        font-weight: bold;
      }
    }
  }
}
</style>