<template>
  <div class="c-table-out">
    <el-table
      v-loading="loading"
      ref="CTable"
      :header-row-class-name="'c-table-header'"
      :row-class-name="rowClassName"
      v-bind="$attrs"
      class="c-table"
      v-on="eventListeners"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="multipleSelection"
        type="selection"
        align="center"
        width="40">
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
          :width="item.width?item.width:''"
          :align="item.align"
          :sortable="item.sortable"
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
          :width="item.width"
          :align="item.align"
          :sortable="item.sortable"
          :min-width="item.minWidth ? item.minWidth : ''"
        >

          <template slot-scope="scope">
            <template v-if="!item.overflow">
              {{scope.row[item.key]}}
            </template>
            <template v-if="item.overflow">
              <el-tooltip class="item" effect="dark" :content="scope.row[item.key]" placement="top">
                <div class="table-text-overflow">
                  {{scope.row[item.key]}}
                </div>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        column-key="operation"
        :label="operation.label||'操作'"
        :header-cell-class-name="'header-operate'"
        :width="showButtons.length*35>55?showButtons.length*35:55"
        :fixed="tableOptions.fixed?false:'right'"
        :min-width="operation.minWidth ? operation.minWidth : ''"
        :class-name="operation.className? 'table-operation '+operation.className:'table-operation '"
        v-if="showButtons&&showButtons.length>0"
        align="center"
      >
        <template slot-scope="scope" v-if="showButtons">
          <el-tooltip v-for="(singleButton,key) in showButtons" :key="key" class="item" effect="dark"
                      :content="singleButton.name" placement="top">
            <el-button
              :style="{color: singleButton.color||'#409EFF'}" @click="handleClick(scope.row,singleButton.key)"
              type="text"
              :icon="singleButton.icon?singleButton.icon:''"
              style="font-size: 15px"
              size="small">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      :current-page="currentPage"
      :page-sizes="pageSizeSelection"
      :page-size="currentPageSize"
      :layout="paginationLayout"
      :total="total"
      class="c-table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  export default {
    props: {
      // 表头
      headers: {
        type: Array,
        default: () => [],
        required: true
      },
      showIndex: [String, Boolean],
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
            border: false,
            fixed: false
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
            className: ' '
          };
        }
      },
      //数据总数
      total: {
        type: Number,
        default: 1
      },
      //通用表格操作展示
      showButtons: {
        type: [Array, Boolean],
        default: function () {
          return [
            {
              key: 'look',
              name: '查看',
              icon: 'el-icon-view'
            }, {
              key: 'edit',
              name: '编辑',
              icon: 'el-icon-edit-outline'
            }, {
              key: 'delete',
              name: '删除',
              color: 'red',
              icon: 'el-icon-delete'
            }];
        }
      }
    },
    computed: {
      eventListeners() {
        const events = {};
        console.log(this.$listeners);
        Object.keys(this.$listeners).map(ele => {
          if (ele !== 'onPageChange' && ele !== 'onCtrlClick') {
            events[ele] = this.$listeners[ele];
          }
        });
        return events;
      },

    },
    data() {
      return {
        currentPage: this.pagination && this.pagination.page || 1,
        currentPageSize: this.pagination && this.pagination.pageSize || 10,
        pageSizeSelection: this.pagination && this.pagination.pageSizeSelection || [10, 20, 50],
      };
    },
    methods: {
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.$emit('onPageChange', this.pagination);
      },
      rowClick(Row, Event, Column) {
        if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
          return;
        }
        const data = {row: Row, event: Event, column: Column};
        this.$emit('onRowClick', data);
      },
      handleClick(row, type) {
        this.$emit('onCtrlClick', row, type);
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
        this.$emit('onPageChange', this.pagination);
      },
      handleSelectionChange(val) {
        this.$emit('update:multipleSelection', val);
        this.$emit('onSelectionItems', val);
      },
      rowClassName(rowdata) {
        const data = this.$attrs.data;
        let className = data[rowdata.rowIndex].class ? data[rowdata.rowIndex].class : '';
        if (className.length === 0) {
          return;
        }
        className = className.join(' ');
        return className;
      },
      // 提供多选控制项
      toggleSelection(rows) {
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
<style rel="stylesheet/scss" lang="scss">
  .c-table-out {
    .c-table {
      width: 100%;

      td {
        padding: 7px 0 !important;
      }

      th {
        padding: 14px 0;
      }

      .c-table-header {
        th {
          background-color: #fafafa;
        }

        border-radius: 4px 4px 4px 4px;
      }

      .table-text-overflow {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .c-table-pagination {
      text-align: right;
      margin-top: 30px;
    }
  }
</style>
