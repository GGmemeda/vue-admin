<template>
  <div class="c-table-out">
    <el-table
      v-loading="loading"
      ref="CTable"
      :header-row-class-name="'c-table-header'"
      :row-class-name="rowClassName"
      v-bind="$attrs"
      class="c-table"
      v-on="getListeners()"
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
              :style="{color: singleButton.color||'#409EFF'}"
              @click="handleClick(scope.row,singleButton.key)"
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

<script lang="ts">
  import {Component, Prop, Vue, Emit} from 'vue-property-decorator'

  interface PageProvider {
    page: number,
    pageSize: number,
    pageSizeSelection: number[]
  }
  @Component({})
  export default class CommonTable extends Vue {
    @Prop({default: () => ({border: false, fixed: false}), type: Object}) public tableOptions?: object
    @Prop({default: () => [], required: true}) private headers?: any[]
    @Prop([String, Boolean]) private showIndex!: string | boolean
    @Prop() private multipleSelection!: any[]
    @Prop({type: Object, default: () => ({pageSize: 10, page: 1})}) private pagination!: PageProvider
    @Prop([Boolean]) private loading?: boolean
    @Prop({default: 'total, sizes, prev, pager, next, jumper', type: String}) private paginationLayout?: string
    @Prop({default: () => ({label: '操作', className: ' '}), type: Object}) private operation?: object
    @Prop({default: 1, type: Number}) private total?: number
    @Prop({
      default: () => ([
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
        }])
    }) private showButtons?: any[] | boolean

    private currentPage: any = this.pagination && this.pagination.page || 1
    private currentPageSize: any = this.pagination && this.pagination.pageSize || 10
    private pageSizeSelection: any[] = this.pagination && this.pagination.pageSizeSelection || [10, 20, 50]

    private getListeners() {
      const events: any = {}
      const eventsUse: any = this.$listeners
      Object.keys(eventsUse).map((ele: any) => {
        if (ele !== 'onPageChange' && ele !== 'onCtrlClick') {
          events[ele] = this.$listeners[ele]
        }
      })
      return Object.keys(eventsUse).length > 0 ? events : this.$listeners
    }

    private mounted() {
      console.log('进来了')
    }

    // 分页数据改变事件
    @Emit('onPageChange')
    private handleSizeChange(val: any) {
      this.pagination.pageSize = val
      return this.pagination
    }

    @Emit('onPageChange')
    private handleCurrentChange(val: any) {
      this.pagination.page = val
      // this.$emit('onPageChange', this.pagination)
      return this.pagination
    }

    // 单行点击
    @Emit('onRowClick')
    private rowClick(Row: any, Event: any, Column: any) {
      if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
        return
      }
      return {row: Row, event: Event, column: Column}
    }

    // 操作点击
    private handleClick(row: any, type: any) {
      this.$emit('onCtrlClick', row, type)
    }

    // 多选
    private handleSelectionChange(val: any) {
      this.$emit('update:multipleSelection', val)
      this.$emit('onSelectionItems', val)
    }


    // 提供多选控制项
    private toggleSelection(rows: any) {
      const currentTable: any = this.$refs.CTable
      if (rows) {
        rows.forEach((row: any) => {
          currentTable.toggleRowSelection(row)
        })
      } else {
        currentTable.clearSelection()
      }
    }
  }
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
