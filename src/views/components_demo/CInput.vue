<template>
  <div>
    <c-input v-model="inputValue" clearable placeholder="请输入内容" @onSearch="searchClick" @change="inputChange">
      <el-select slot="prepend" v-model="select" placeholder="请选择">
        <el-option label="餐厅名" value="1"/>
        <el-option label="订单号" value="2"/>
        <el-option label="用户电话" value="3"/>
      </el-select>
      <el-button slot="append" icon="el-icon-search"/>
    </c-input>
  </div>
</template>

<script>
import CInput from '../../components/CInput';

export default {
  name: 'CInputDemo',
  components: {
    CInput
  },
  data() {
    return {
    };
  },
  methods: {
    inputChange(e) {
      debugger;
      console.log(e);
    },
    searchClick(e) {
      console.log(222);
    }
  }
};
</script>

<style scoped>

</style>
