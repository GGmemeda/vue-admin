<template>
  <div class="section-wrapper">
    <div class="page-name">
      <span class="page-name-text">{{this.pageName}}</span>
      <slot class="right-control" name="control"></slot>
    </div>
    <div class="content-out">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
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
    height: calc(100vh - 75px);
    .page-name {
      padding: 16px 0 16px 40px;
      font-size: 20px;
      line-height: normal;
      background: #fff;
      font-weight: normal;
      font-stretch: normal;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 20px;
    }

    .content-out {
      height: calc(100vh - 150px);
      padding-bottom: 30px;
      overflow: auto;
    }
  }
</style>
