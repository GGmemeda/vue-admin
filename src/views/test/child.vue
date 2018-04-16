<template>
  <div>
    <child-child></child-child>
    <slot :name="items.cname"></slot>
    <slot :addr="items.addr"></slot>
    <slot age="18"></slot>
  </div>
</template>

<script>
  import childChild from './child-child';

  export default {
    name: 'child',
    data () {
      return {
        items: {
          name: 11,
          addr: 'dfsd'
        }
      };
    },
    components: {
      childChild
    }
  };
</script>

<style scoped>

</style>
