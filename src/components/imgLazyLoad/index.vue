<template>
  <div>
    <li v-for="(item, index) in banners" :key="index">
      <img v-lazyload="item">
    </li>
  </div>
</template>

<script>
  import banner1 from '../../imgs/timg.jpg';
  import banner2 from '../../imgs/timg (1).jpg';
  import banner3 from '../../imgs/timg (2).jpg';
  import banner4 from '../../imgs/timg (3).jpg';
  import banner5 from '../../imgs/timg (4).jpg';
  import banner6 from '../../imgs/timg (5).jpg';

  export default {
    name: 'index',
    data () {
      return {
        banners: [banner1, banner2, banner3, banner4, banner5, banner6]
      };
    }
  };
</script>

<style scoped>

</style>
