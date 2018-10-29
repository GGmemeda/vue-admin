<template>
  <div class="instruction-wrapper">
    <div class="instruction-top">统一思维：1.事件更改项请统一使用onChange方法名表示</div>
    <ul class="instruction-ul">
      <li class="components-line" v-for="item in items">{{item.name}}: {{item.text}}
      <div>{{item.instruction}}</div></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'instruction',
    data () {
      return {
        items: [
          {
            name: '表格组件',
            text: '<c-table></c-table>',
            instruction:'全局注册,可随处使用'
          },
          {
            name: '搜索栏',
            text: '<c-search></c-search>',
            instruction:'全局注册,可随处使用'
          },
          {
            name: '统一弹框',
            text: '<c-dialog></c-dialog>',
            instruction:'全局注册,可随处使用'
          },
          {
            name: 'form表单二次封装',
            text: '<c-form></c-form>',
            instruction:'需要局部注册使用'
          }
        ]
      };
    }
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .instruction-wrapper {
    .instruction-top{
      padding: 10px;
    }
    .instruction-ul {
      list-style-type: decimal;
      .components-line{
        font-size: 18px;
        line-height: 40px;
      }
    }
  }
</style>
