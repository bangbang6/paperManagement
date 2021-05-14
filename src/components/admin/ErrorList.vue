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
import { Message } from 'element-ui'
import { getErrorList } from '@/api/chain'
export default {
  data () {
    return {
      papers: []
    }
  },
  methods: {
    formatDate (date) {
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
    /* this.papers = [

      {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      },
      {
        id:1,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Adrian Hope-Bailie,Stefan Thomas',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Adrian Hope-Bailie',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:2,
        title: "Interledger: Creating a Standard for Payments",
        author: 'Stefan Thomas,Adrian Hope-Bailie',
        publicTypeName: '会议/B类',
        name:'Journal of Parallel and Distributed Computing',
        uploader: 'Stefan Thomas',
        chainDate: '2021/4/15',
        status: '题目重复',
        type: 'danger',
        projectNum:'10.1109/TSFQ.2019.2928256',
        projectFund:'National Natural Science Foundation of Canada',
        organization:'300 Montgomery StSan Francisco',
        histroys: [
          {
            operation: "上传论文",
            user: 'Adrian Hope-Bailie',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: 'Stefan Thomas',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Stefan Thomas',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:3,
        title: 'GDPR-Compliant Personal Data Management: A Blockchain-Based Solution',
        author: 'Nguyen Binh Truong,Kai Sun,Gyu Myoung Lee',
        publicTypeName: '期刊/sci',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Nguyen Binh Truong',
        chainDate:'2021/4/14',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1109/TIFS.2019.2948287',
        projectFund: 'Imperial College London ',
        organization:'ETH Z¨urich and Cornell Tech',
        histroys: [
          {
            operation: "修改论文",
            user: 'Nguyen Binh Truong',
            date: '2021/4/18'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'Kai Sun',
            date: '2021/1/6'
          },
          {
            operation: "上传论文",
            user: 'Nguyen Binh Truong',
            date: '2021/1/3'
          }
        ]
      },
      {
        id:4,
        title: 'Innovative Technology for CPU Based Attestation and Sealing',
        author: 'ANATI, I., GUERON, S., JOHNSON, S',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'ANATI',
        chainDate:'2021/2/11',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.1009/TIFS.2020.7319343',
        projectFund: 'Office of the Director of National Intelligence ',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'GUERON, S',
            date: '2021/4/14'
          },
          {
            operation: "修改论文",
            user: 'ANATI, I',
            date: '2021/2/6'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:5,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Anil K. Jain',
        chainDate:'2021/3/21',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:6,
        title: 'Fingerprint Spoof Detector Generalization',
        author: 'Tarang Chugh,Anil K. Jain',
        publicTypeName: '期刊/trans',
        name: ' IEEE Transactions on Information Forensics and Security',
        uploader:'Tarang Chugh',
        chainDate:'2021/3/22',
        status: '题目重复',
        type: 'danger',
        projectNum: '10.13039/100011039',
        projectFund: 'Intelligence Advanced Research Projects Activity',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "上传论文",
            user: 'Tarang Chugh',
            date: '2021/3/22'
          },
          {
            operation: "上传论文",
            user: 'ANATI, I',
            date: '2021/1/23'
          }
        ]
      },
      {
        id:7,
        title: 'Reachable Workspace and Proximal Function Measures for Quantifying Upper Limb Motion',
        author: 'Robert P. Matthew,Sarah Seko,Gregorij Kurillo,Ruzena Bajcsy',
        publicTypeName: '期刊/B类',
        name: ' IEEE Journal of Biomedical and Health Informatics',
        uploader:'Robert P. Matthew',
        chainDate:'2020/4/23',
        status: '多次修改',
        type: 'warning',
        projectNum: '10.11039/291222931',
        projectFund: 'UCSF Department of Orthopaedic Surgery',
        organization:'IARPA Research and Development',
        histroys: [
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2021/4/19'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/7/31'
          },
          {
            operation: "修改论文",
            user: 'Sarah Seko',
            date: '2020/4/27'
          },
          {
            operation: "上传论文",
            user: 'Robert P. Matthew',
            date: '2020/4/23'
          }
        ]
      },
      {
        title: "Foridar",
        author: 'bang',
        publicTypeName: '期刊',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',



      }
    ] */

    getErrorList().then(res => {
      if (res.code === 200) {
        this.papers = res.data.slice(0, 14)
      } else {
        Message({
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