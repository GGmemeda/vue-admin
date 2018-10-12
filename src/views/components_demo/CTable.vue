<template>
  <div class="common-section">

    <div class="search-bar-demo">
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
      :multiple-selection="tableSelection"
      @onPageChange="tablePageChange"
      @onSelectionItems="tableOnSelections"
      @onCtrlClick="tableClick"
    >
      <template slot-scope="{render}" slot="id">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ render.row.name }}</p>
          <p>id: {{ render.row.id }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ render.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </c-table>
    <c-dialog
      :show.sync="dialogVisible"
    >11111
    </c-dialog>
  </div>
</template>
<script>
export default {
  name: 'Test11',
  data() {
    return {
      dialogVisible: false,
      searchFields: [
        {
          placeholder: '请输入书内容',
          key: 'input',
          type: 'input'
        },
        {
          key: 'select',
          type: 'select',
          options: [{
            label: 'aa',
            value: 'key'
          }, {
            label: 'aa',
            value: 'key1'
          }]
        }
      ],
      tableSelection: [],
      searchData: {},
      tableHeaders: [
        {
          key: 'id',
          name: '编号',
          show: 'template',
          fixed: true
        }, {
          key: 'name',
          name: '姓名'
        }, {
          key: 'amount1',
          name: 'amount1'
        }, {
          key: 'amount2',
          name: 'amount2'
        }, {
          key: 'amount3',
          name: 'amount3'
        }],
      tableData6: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      tablePagination: { page: 1, pageSize: 10 }
    };
  },
  mounted: () => {

  },
  methods: {
    searchChange(data, field) {
      console.log(data, field);
    },
    tablePageChange(value) {
      console.log(value);
    },
    tableClick(row, type) {
      console.log(row);
      console.log(row + '===============' + type);
      if (type === 'edit') {
        this.dialogVisible = true;
      }
    },
    tableOnSelections(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>

</style>
