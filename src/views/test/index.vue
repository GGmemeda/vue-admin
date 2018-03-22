<template>
  <div>
    <router-link :to="{ path: '/api/about' }">go about page</router-link>
    <button @click="buttonClick">点击获取接口</button>
    <imglazy></imglazy>
  </div>
</template>
<script>
  import imglazy from '@/components/imgLazyLoad';
  import * as testApi from '@/api/test.js';

  export default {
    components: {
      imglazy
    },
    data () {
      return {};
    },
    methods: {
      buttonClick () {
        testApi.first({ aa: 'sdfsfsdf' }).then(
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
