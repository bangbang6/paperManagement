<template>
  <div class="error-list" style="border-color: #795da3">
    <div class="title">异常成果列表</div>
    <div class="list">
      <div class="list-item gray" style="text-align: left">
        <div class="status" style="width: 15%">状态</div>
        <div class="title" style="width: 40%">成果标题</div>
        <div class="name" style="width: 20%;">发表人</div>
        <div class="name" style="width: 10%;">类型</div>

        <div class="date" style="width: 15%;">时间</div>
      </div>
      <div
        class="list-item"
        v-for="(paper,index) in papers"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="status" style="width: 15%">
          <el-tag
            v-for="ex in paper.exceptionTypes.slice(0,1)"
            :key="ex"
            :type="ex === '题目重复'?'danger':'primary]'"
            size="mini"
            effect="dark"
          >{{ex}}</el-tag>
        </div>
        <div class="title overflow" style="width: 40%">{{paper.title}}</div>
        <div class="name overflow" style="width: 20%">{{paper.authors}}</div>
        <div class="name overflow" style="width: 10%">{{paper.type}}</div>

        <div class="date overflow" style="width: 15%">{{formatDate(paper.upChainTime)}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getErrorList } from '@/api/dashboard.js'
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
        console.log('res2', res.data)
        this.papers = res.data
      } else {
        this.$message({
          message: res.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
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
    background: linear-gradient(to left, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) right top no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to bottom, #74fbf5, #74fbf5) left bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat,
      linear-gradient(to left, #74fbf5, #74fbf5) right bottom no-repeat;
    /*设置大小*/

    background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem,
      0.9rem 0.15rem;
    background-color: #60626621;
    padding-left: 10px;
    height: 80%;
    color: white;
    margin-top: 10px;
    .list-item {
      display: flex;
      /* border-bottom: 1px solid gray; */
      // height: 12.5%;
      padding: 6px 20px 6px 0;
      align-items: center;
      .name,
      .title,
      .date,
      .status {
        //flex: 1;
        // height: 12.5%;
        /* padding: 0 5px; */
        /*  text-align: center; */
        font-size: 12px;
        height: 18px;
        padding: 0 5px;
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
        color: white;
      }
    }
  }
}
</style>

/*  mounted () {
    /* this.papers = [
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
    ].slice(0, 6) */
  
    //.slice(0, 6)
  } */