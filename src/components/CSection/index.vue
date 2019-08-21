<template>
  <div class="section-wrapper">
    <div class="page-name">
      <span class="page-name-text">{{ pageName }}</span>
      <slot class="right-control" name="control" />
    </div>
    <div class="content-out">
      <el-scrollbar style="height:100%">
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      pageName: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .section-wrapper {
    margin: 0 24px;
    .page-name {
      padding: 16px 0 16px 19px;
      font-size: 20px;
      line-height: normal;
      background: #fff;
      font-weight: normal;
      font-stretch: normal;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 4px;
    }

    .content-out {
      height: calc(100vh - 150px);
      padding-bottom: 30px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
