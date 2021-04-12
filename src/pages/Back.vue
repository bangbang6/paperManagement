<template>
  <div class="table-wrapper">
    <div class="btns">
      <el-button type="primary" size="mini" @click="back">返回</el-button>
      <div class="text">{{text}}</div>
      <div class="btns-wrapper">
        <!-- <el-button type="primary" size="mini" @click="backAll">全部溯源</el-button> -->
        <el-button type="primary" size="mini" @click="backagain">溯源</el-button>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
 
<script>
import { backward, backwardAgain } from '@/api/file'
import { mapState } from 'vuex'
import { Graph } from '@antv/x6';
import { Shape } from '@antv/x6'
export default {
  data () {
    return {
      tableData: [],
      txId: 0,
    }
  },
  computed: {
    dataId () {
      return localStorage.getItem('dataId')
    },
    text () {
      if (this.tableData.length) return this.tableData[0].fileName + '溯源过程'
      else return ''
    }
  },
  methods: {
    renderGraph () {
      const index = this.tableData.length
      const { user, dst_chain, src_chain, type_tx, fileName } = this.tableData[0]
      const rect = new Shape.Rect({
        id: `node${index - 1}`,
        x: 40 + Math.floor((index - 1) / 4) * 450,
        y: 40 + (index - 1) % 4 * 100,
        width: 400,
        height: 40,
        label: `${user}   ${type_tx}   ${fileName}(${src_chain}) `,
        zIndex: 2,
        attrs: {
          label: {
            fontSize: '12px'
          }
        }
      })
      const edge = new Shape.Edge({
        id: `edge${index - 1}`,
        source: `node${index - 2}`,
        target: `node${index - 1}`,
        zIndex: 1,
      })
      this.graph.addNode(rect)
      this.graph.addEdge(edge)
    },
    initGragh () {
      this.graph = new Graph({
        container: document.getElementById('container'),
        scroller: {
          enabled: true,
          className: 'my-scroller'
        },
      });
      const { user, dst_chain, src_chain, type_tx, fileName } = this.tableData[0]
      const rect = new Shape.Rect({
        id: `node0`,
        x: 40,
        y: 40,
        width: 400,
        height: 40,
        label: `${user}   ${type_tx}   ${fileName}(${src_chain}) `,
        zIndex: 2,
        attrs: {
          label: {
            fontSize: '12px'
          }
        }
      })
      this.graph.addNode(rect)
    },
    backAll () {
      if (this.dataId) {
        return
      }
      //todo 全部溯源
    },
    parser (record) {
      return {
        fileName: record.fileName.split('/').slice(-1)[0],
        ...record.record
      }
    },
    back () {
      this.$router.back(-1)
    },
    backagain () {
      if (!this.txId || !this.dataId) {
        return
      }
      backwardAgain(this.dataId, this.txId).then(res => {
        console.log('res', res);
        if (res.data.code === 200) {
          console.log('again', res.data.data);
          this.txId = res.data.data.record.this_tx_id
          this.tableData.unshift(this.parser(res.data.data))
          this.renderGraph()
        } else {
          alert(res.data.message)
        }
      }, reject => {
        console.log(reject);
        alert(reject.message)
      })
    }
  },
  mounted () {
    backward(this.dataId).then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data);
        this.txId = res.data.data.record.this_tx_id
        this.tableData.push(this.parser(res.data.data))
        this.initGragh()
      } else {
        alert(res.data.message)
      }
    })
  }
}
</script>
 
<style lang="scss" scoped>
.table-wrapper {
  margin-top: 40px;
  height: 600px;
  .btns {
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: white;
  }
  #container {
    width: 100%;
    height: 90%;
    background: white;
  }
}
</style>