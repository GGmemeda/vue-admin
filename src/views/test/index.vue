<template>
  <div>
    <router-link :to="{ path: '/api/about' }">go about page</router-link>
    <child>
      <template slot-scope="props">
        <span>{{ props.name }}</span>
        <span>{{ props.addr }}</span>
        <span>{{ props.age }}</span>
      </template>
    </child>
    <div>
      <!--<router-link :to="{ path: '/components/downNumber' }">downNumber component</router-link>-->
    </div>
    <button @click="buttonClick">点击获取接口</button>
    <imglazy></imglazy>

  </div>
</template>
<script>
  import imglazy from '@/components/imgLazyLoad';
  import child from './child';
  import * as testApi from '@/api/test.js';

  export default {
    components: {
      imglazy,
      child
    },
    data () {
      return {};
    },
    created () {
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
