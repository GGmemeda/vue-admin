<template>
  <div>
    <router-link :to="{ path: '/api/about' }">go about page</router-link>
    <button @click="buttonClick">点击获取接口</button>
    <imglazy></imglazy>
  </div>
</template>
<script>
  import api from '@/api/index.js';
  import imglazy from '@/components/imgLazyLoad';

  export default {
    components: {
      imglazy
    },
    data () {
      return {};
    },
    methods: {
      buttonClick () {
        api.test.first({ aa: 'sdfsfsdf' }).then(
          res => {
            console.log(res);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
      }
    }
  };
</script>
<style scoped>

</style>
