<template>
  <div>
    <c-input clearable @onSearch="searchClick"  placeholder="请输入内容" v-model="inputValue"  @change="inputChange">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </c-input>
    富文本编辑器
    <c-quill v-model="editorContent" @change="quillChange"></c-quill>
  </div>
</template>

<script>
  import CInput from '../../components/CInput';
  import CQuill from '../../components/CQuill/index.vue'
  export default {
    name: 'CInput_demo',
    components: {
      CInput,
      CQuill
    },
    data () {
      return {
        editorContent:'<p>就是测试一波</p>',
        inputValue:'aaaaa'
      };
    },
    methods: {
      inputChange (e) {
        debugger;
        console.log(e);
      },
      searchClick(e){
        console.log(222);
      },
      quillChange(value){
        console.log(value)
      }
    }
  };
</script>

<style scoped>

</style>
