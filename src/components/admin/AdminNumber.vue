<template>
  <div class="admin-number">
    <div class="title-wrapper">
      <div class="line"></div>
      <div class="title">论文总数</div>
    </div>
    <el-row :gutter="6" class="row">
      <el-col :span="4" class="col" v-for="item in categorys" :key="item.id">
        <el-card shadow="always">
          <div class="name">{{item.name}}</div>
          <div class="number">{{item.number}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      categorys: [
        { id: 0, name: '安全组', number: "16200" }
      ]
    }
  }
}
</script>
 
<style lang="scss" scoped>
.admin-number {
  .title-wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
    .line {
      background-color: rgb(64, 158, 255);
      height: 20px;
      width: 2px;
    }
    .title {
      margin-left: 5px;
    }
  }
  .row {
    .col {
      margin-top: 10px;
      .name {
        font-size: 14px;
        color: rgb(64, 158, 255);
        width: 100%;
      }
      .number {
        margin-top: 10px;
      }
    }
  }
}
</style>
<style>
.el-card__body {
}
</style>