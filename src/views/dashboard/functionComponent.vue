<template functional>
  <div>
    {{ parent._data.name }}
    <div>{{ props.showTime }}</div>
    <div>说明一下，这是模板形式的functional组件</div>
  </div>
</template>

<script>
  //模板中的表达式会在函数式渲染上下文中求值
  export default {
    name: 'FunctionComponent'
  };
</script>

<docs>
  <div>111111</div>
  这是一个代码块
</docs>

