<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style>
  html, body,#app {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    min-height: 100%;
  }

  body, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, th, td, p, form, button, input, textarea, fieldset, blockquote, img, iframe, pre, code, hr, legend {
    padding: 0;
    margin: 0;
  }

  *, :after, :before {
    box-sizing: content-box;
  }

  body {
    font-family: "Microsoft YaHei", "微软雅黑", "Hiragino Sans GB", tahoma, arial, simhei;
    color: #333;
    font: 12px Arial, Helvetica, sans-serif, Simsun;
  }

  a {
    text-decoration: none;
    outline: 0;
  }

  input, select, input, textarea {
    font-size: 12px;
    outline: 0;
  }

  select, input {
    vertical-align: middle;
  }

  address, cite, code, em, th, i, strong {
    font-style: normal;
    font-weight: normal;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
