<template>
  <div v-if="fields" class="search-bar-out">
    <template v-for="field in fields">
      <div class="search-item-out">
        <div class="search-item">
          <div v-if="field.label" :style="{width: field.labelWidth}" class="title">{field.label}：</div>
          <div :style="{width: (field.width || 160)+'px'}">
            <el-input
              v-if="field.type==='input'"
              v-model="data[field.key]"
              :placeholder="field.placeholder||'请填写内容'"
              size="middle"/>
            <el-select
              v-else-if="field.type==='select'"
              v-model="data[field.key]"
              :placeholder="field.placeholder||'请选择'"
              size="middle"
              @change="handleChange(field)"
            >
              <el-option
                v-for="item in field.options"
                v-if="field.options instanceof Array"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-input-number
              v-else-if="field.type==='inputNumber'"
              v-model="data[field.key]"
              :placeholder="field.placeholder||'请填写内容'"
              size="middle"
              @change="handleChange(field)"/>
          </div>
        </div>
      </div>
    </template>
    <el-button type="primary" icon="el-icon-search">查询</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    fields: {
      type: Array
    },
    data: {
      type: Object,
      default: {},
      required: true
    },
    showSearchButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleChange(field) {
      const changeData = this.data[field.key];
      this.$emit('onChange', changeData, field)
    }
  }
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .search-bar-out {
    .search-item-out {
      margin-bottom: 12px;
      display: inline-block;
      align-items: center;
      margin-right: 20px;
      .search-item {
        display: flex;
        vertical-align: middle;
        align-items: center;
        .title {
          text-align: left;
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
          color: #343434;
          margin-right: 10px;
        }

        .warning {
          color: red;
          text-align: center;
          margin-left: 105px;
        }
      }
      .buttonGroup {
        align-self: center;
        margin-left: 24px;
        float: right;
        height: 47px;
        button {
          height: 30px;
          font-size: 14px;
          border: none;
          padding: 0;
          margin-right: 0;
        }
        .search-bar-close {
          font-size: 14px;
          position: absolute;
          cursor: pointer;
          bottom: 2px;
          right: 15px;
          i {
            margin-left: 16px;
          }
        }
      }
    }
  }
</style>
