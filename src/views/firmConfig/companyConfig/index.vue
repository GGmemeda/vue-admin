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
      @onSelectionItems="tableOnSelections"
      @onCtrlClick="tableClick"
    >
      <template slot-scope="{render}" slot="status">
        <el-switch
          v-model="render.row.status===0"
          active-color="#13ce66"
          inactive-color="#ff4949"/>
      </template>
    </c-table>
    <c-dialog
      :show.sync="dialogVisible"
      :title="'数据库配置'"
      class="company-modal"
      ok-text="保存"
      @onOk="dialogOk"
    >
      <c-form ref="cForm" :content="formFields" @onChange="onFormValueChange"/>
    </c-dialog>
  </div>
</template>
<script>
import CForm from '../../../components/CForm';
import { Dbconfig } from '../../../api';

export default {
  name: 'CompanyConfig',
  components: {
    CForm
  },
  data() {
    return {
      dialogVisible: false,
      formFields: [
        {
          $type: 'input',
          $id: 'name',
          label: '名称',
          $el: {
            placeholder: '请输入'
          },
          rules: [
            { required: true, message: '请输入名称' }
          ]
        }, {
          $type: 'input',
          $id: 'IP',
          label: 'IP',
          $el: {
            placeholder: '请输入'
          }
        }, {
          $type: 'input',
          $id: 'amount',
          label: '端口',
          $el: {
            placeholder: '请输入'
          }
        }, {
          $type: 'input',
          $id: 'user',
          label: '账号',
          $el: {
            placeholder: '请输入'
          }
        }, {
          $type: 'input',
          $id: 'pwd',
          label: '密码',
          $el: {
            placeholder: '请输入'
          }
        }],
      searchFields: [
        {
          placeholder: '请输入企业名称或编码',
          key: 'input',
          type: 'input',
          width: 200
        }
      ],
      tableButtons: [
        {
          key: 'edit',
          name: '编辑',
          icon: 'el-icon-edit'
        }
      ],
      searchData: {},
      tableHeaders: [
        {
          key: 'id',
          name: '企业编号',
          fixed: true
        }, {
          key: 'name',
          name: '企业名称'
        }, {
          key: 'amount1',
          name: '数据库名称'
        }, {
          key: 'amount2',
          name: 'IP'
        }, {
          key: 'amount3',
          name: '端口'
        }, {
          key: 'status',
          show: 'template',
          name: '启用'
        }],
      tableData6: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          status: 0
        }
      ],
      tablePagination: { page: 1, pageSize: 10 },
      listData: {
        size: 10,
        index: 1
      }
    };
  },
  created() {
    console.log(this.listData);
    this.getDbConfigList(this.listData);
  },
  methods: {
    getDbConfigList(Data) {
      Dbconfig.DbConfigList(Data).then(res => {
        if (res.code === 0) {
          debugger;
        }
      });
    },
    onFormValueChange(data) {
      debugger;
      console.log(data);
    },
    dialogOk() {
      console.log(111);
      this.$refs['cForm'].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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

<style scoped rel="stylesheet/scss" lang="scss">
  .company-modal {
    //针对scoped是有style进行深度查找元素
    /deep/ .el-dialog__header {
      text-align: center;
    }
    /deep/ .dialog-footer {
      text-align: center;
    }
  }
</style>
