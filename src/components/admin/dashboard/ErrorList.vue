<template>
  <div class="error-list" style="border-color: #795da3">
    <div class="title">异常成果</div>
    <div class="list">
      <div class="list-item gray" style="text-align: left">
        <div class="status" style="width: 65px">状态</div>
        <div class="name" style="width: 56px;padding-left: 10px">发表人</div>
        <div class="title" style="width: 290px">成果标题</div>
        <div class="date" style="width: 80px;padding-left: 10px">时间</div>
      </div>
      <div
        class="list-item"
        v-for="(paper,index) in papers"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="status">
          <el-tag :type="paper.type" size="mini" effect="dark" style="width: 65px;">{{paper.status}}</el-tag>
        </div>
        <div class="name overflow" style="width: 60px;padding-left: 10px">{{paper.name}}</div>
        <div class="title overflow" style="width: 290px">{{paper.title}}</div>
        <div class="date overflow" style="width: 80px;padding-left: 10px">{{formatDate(paper.date)}}</div>
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
        status: '标题重复',
        name: "陆琦峰",
        title: "Model  for  data  access  control  and  sharing  based  on  blockchain",
        date: "2020/7/14",
        type: 'danger'
      },
      {
        status: '标题重复',
        name: "刘海坤",
        title: "Model  for  data  access  control  and  sharing  based  on  blockchain",
        date: "2020/7/8",
        type: 'danger'

      },
      {
        status: '多次修改',
        name: "陈婷婷",
        title: "E-Commerce Model Oriented to Cloud Computing and Internet of Things Technology",
        date: "2020/6/21",
        type: 'warning'
      },
      {
        status: '标题重复',
        name: "廖小飞",
        title: "A Blockchain Based  Decentralized Data Security Mechanism for the Internet of Things",
        date: "2020/6/11",
        type: 'danger'
      },
      {
        status: '多次修改',
        name: "李倩",
        title: "Design and Implementation of Smart Classroom Based on Internet of Things and Cloud Computing",
        date: "2020/6/8",
        type: 'warning'
      },
      {
        status: '多次修改',
        name: "李鹏",
        title: "The role of expert feedback in the development of pre-service teachers’ professional vision of classroom management in an online blended learning environment",
        date: "2020/5/26",
        type: 'warning'
      },

      {
        status: '标题重复',
        name: "陆琦峰",
        title: "A Blockchain Based  Decentralized Data Security Mechanism for the Internet of Things",
        date: "2020/5/8",
        type: 'danger'
      },
      {
        status: '多次修改',
        name: "陆琦峰",
        title: "A Deep Reinforcement Learning Based Offloading Game in Edge Computing",
        date: "2020/4/17",
        type: 'warning'
      }
    ].slice(0, 6)
  }
}
</script>
 
<style lang="scss" scoped>
.error-list {
  color: white;
  overflow-y: auto;
  background: rgb(48, 48, 48);
  height: 100%;
  .title {
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 500;
  }
  .list {
    color: gray;
    margin-top: 10px;
    .list-item {
      display: flex;
      /* border-bottom: 1px solid gray; */
      height: 20px;
      padding: 6px 20px 6px 0;
      align-items: center;
      .name,
      .title,
      .date,
      .status {
        //flex: 1;
        height: 20px;
        /* padding: 0 5px; */
        /*  text-align: center; */
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
      &.gray {
        color: gray;
      }
    }
  }
}
</style>