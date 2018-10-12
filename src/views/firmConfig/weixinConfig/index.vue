<template>
  <div class="common-section">
    <div class="search-bar-out">
      <c-search
        :data="searchData"
        :fields="searchFields"
        @onChange="searchChange"
      />
    </div>
    <c-table
      :headers="tableHeaders"
      :data-source="tableData6"
      :total="tableData6.length"
      :pagination="tablePagination"
      :show-buttons="tableButtons"
      @onPageChange="tablePageChange"
    >
      <template slot-scope="{render}" slot="status">
        <el-switch
          v-model="render.row.status===0"
          active-color="#13ce66"
          inactive-color="#ff4949"/>
      </template>
    </c-table>
  </div>
</template>
<script>
export default {
  name: 'CompanyConfig',
  data() {
    return {
      dialogVisible: false,
      searchFields: [
        {
          placeholder: '请输入商户名称或编号',
          key: 'input',
          type: 'input',
          width: 200
        }
      ],
      tableButtons: [],
      searchData: {},
      tableHeaders: [
        {
          key: 'id',
          name: '序号',
          fixed: true
        }, {
          key: 'name',
          name: '商户编号'
        }, {
          key: 'amount1',
          name: '商户名称'
        }, {
          key: 'status',
          show: 'template',
          name: '微信点餐总开关'
        }],
      tableData6: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          status: 0
        }
      ],
      tablePagination: { page: 1, pageSize: 10 }
    };
  },
  methods: {
    searchChange(data, field) {
      console.log(data, field);
    },
    tablePageChange(value) {
      console.log(value);
    }
  }
};
</script>
