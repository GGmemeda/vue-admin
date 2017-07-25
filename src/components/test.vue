<template>
<div>
  <button  @click="buttonClick">点击获取接口</button>
  <button  @click="buttonClick1">点击获取接口1</button>
</div>
</template>
<script>
  import Api from '@/api/index.js'
  export default {
    data () {
      return {
      }
    },
    methods: {
      buttonClick () {
        Api.test.first({aa: 'sdfsfsdf'}).then(
          res => {
            console.log(res)
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
      },
      buttonClick1 () {
        Api.test.second({aa: 'sdfsfsdf'}).then(
          res => {
            console.log(res)
          }
        ).catch(
          error => {
            console.log(error)
          }
        )
      }
    }
  }
</script>
<style scoped>

</style>
