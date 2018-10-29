<template>
  <div class="c-table-out">
    <el-table
      class="c-table"
      v-loading="loading"
      :data="dataSource"
      ref="CTable"
      :span-method="spanMethod"
      :border="tableOptions.border"
      :height="tableOptions.height"
      :stripe="tableOptions.stripe"
      :row-class-name="rowClassName"
      :highlight-current-row="tableOptions.highlightCurrentRow"
      @current-change="handleRowCurrentChange"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="multipleSelection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="50"></el-table-column>
      <template v-for="(item,key) in headers">
        <el-table-column
          v-if="item.show !== false && item.show === 'template'"
          :key="key"
          :prop="item.key"
          :label="item.name"
          :width='item.width?item.width:""'
          :min-width="item.minWidth ? item.minWidth : ''"
        >
          <template slot-scope="scope">
            <slot :name="item.key" :render="scope" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.show !== false && item.show !== 'template'"
          :key="key"
          :prop="item.key"
          :label="item.name"
          :width='item.width'
          :min-width="item.minWidth ? item.minWidth : ''"
        >
        </el-table-column>
      </template>
      <el-table-column
        column-key="operation"
        :label="operation.label||'操作'"
        :width="showButtons.length*70"
        :fixed="tableOptions.fixed?false:'right'"
        :min-width="operation.minWidth ? operation.minWidth : ''"
        :class-name="'table-operation '+operation.className?operation.className:''"
        v-if="showButtons&&showButtons.length>0"
      >
        <template slot-scope="scope" v-if="showButtons">
          <el-button v-for="(singleButton,key) in showButtons" :key="key"
                     :style="{color: singleButton.color||'#409EFF'}" @click="handleClick(scope.row,singleButton.key)"
                     type="text"
                     :icon="singleButton.icon?singleButton.icon:''"
                     size="small">{{singleButton.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="c-table-pagination"
      v-if="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizeSelection"
      :page-size="currentPageSize"
      :layout='paginationLayout'
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      // 表头
      headers: {
        type: Array,
        default: [],
        required: true
      },
      showIndex:[String],
      //表格数据参数
      dataSource: {
        type: Array,
        default: []
      },
      // 复选框
      multipleSelection: {
        type: Array,
        default: null
      },
      //当前页数，每页记录数，每页记录数选择项
      pagination: {
        type: Object,
        default: null
      },
      //表格属性
      tableOptions: {
        type: Object,
        default: function () {
          return {
            border: true,
            fixed:false
          };
        }
      },
      //loading
      loading: {
        type: Boolean,
        default: false
      },
      //分页默认显示UI
      paginationLayout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      //操作配置，包括width,min-width
      operation: {
        type: Object,
        default: function () {
          return {
            label: '操作',
            className:''
          };
        }
      },
      //数据总数
      total: {
        type: Number,
        default: 1
      },
      //行列合并方法
      spanMethod: {
        type: Function,
      },
      //通用表格操作展示
      showButtons: {
        type: Array,
        default: function () {
          return [
            {
              key: 'look',
              name: '查看',
            }, {
              key: 'edit',
              name: '编辑',
              icon: '<i class="el-icon-edit"></i>'
            }, {
              key: 'delete',
              name: '删除',
              color: 'red'
            }];
        }
      }
    },
    data () {
      return {
        currentPage: this.pagination.page || 1,
        currentPageSize: this.pagination.pageSize || 10,
        pageSizeSelection: this.pagination.pageSizeSelection || [10, 20, 50],
      };
    },
    methods: {
      handleSizeChange (val) {
        this.pagination.pageSize = val;
        this.$emit('onPageChange', this.pagination);
      },
      rowClick (Row, Event, Column) {
        if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
          return;
        }
        const data = { row: Row, event: Event, column: Column };
        this.$emit('onRowClick', data);
      },
      handleRowCurrentChange (val) {
        this.$emit('tableRowChange', val);
      },
      handleClick (row, type) {
        this.$emit('onCtrlClick', row, type);
      },
      handleCurrentChange (val) {
        this.pagination.page = val;
        this.$emit('onPageChange', this.pagination);
      },
      handleSelectionChange (val) {
        this.$emit('onSelectionItems', val);
      },
      rowClassName (rowdata) {
        const data = this.dataSource;
        let className = data[rowdata.rowIndex].class ? data[rowdata.rowIndex].class : '';
        if (className.length === 0) { return; }
        className = className.join(' ');
        return className;
      },
      // 提供多选控制项
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.CTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.CTable.clearSelection();
        }
      }
    }
  };
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .c-table-out {
    .c-table{
      width: 100%;
    }
    .c-table-pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
</style>
