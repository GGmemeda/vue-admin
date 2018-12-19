<template>
  <div class="dashboard-container">
    <span @click="showChild">首页模板哦</span>
    <childComponent v-if="status" :show-time="'当前时间'"></childComponent>
  </div>
</template>
<script>
  import childComponent from './functionComponent';
export default {
  components: {
    childComponent
  },
  mounted(){
  },
  data(){
    return {
      name:'我是弟弟组件',
      status:false,
      // docs:childComponent.__showDocs
    }
  },
  methods:{
    showChild(){
      this.status=!this.status;
    }
  }
};
</script>
<style>
  .dashboard-container {
    padding: 8px;
  }
</style>

