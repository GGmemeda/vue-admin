<template>
  <div v-if="fields" ref="searchBar" class="search-bar-out">
    <template v-for="field in fields">
      <div :key="field.key" class="search-item-out">
        <div class="search-item">
          <div v-if="field.label" :style="{width: field.labelWidth}" class="title">
            {{ field.label||'' }}
          </div>
          <div :style="{width:(field.width?field.width:field.type==='searchInput'?220:180)+'px'}">
            <el-input
              v-if="field.type==='input'"
              v-model="currentData[field.key]"
              v-bind="field.$el"
              :placeholder="field.placeholder||'请填写内容'"
              size="medium"
              v-on="field.$on"
            />
            <el-select
              v-else-if="field.type==='select'"
              v-model="currentData[field.key]"
              v-bind="field.$el"
              :clearable="true"
              size="medium"
              v-on="field.$on"
              @change="handleChange(field)"
            >
              <template v-if="field.options instanceof Array">
                <el-option
                  v-for="item in field.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </template>
            </el-select>
            <el-input-number
              v-else-if="field.type==='inputNumber'" v-model="currentData[field.key]"
              v-bind="field.$el"
              :placeholder="field.placeholder||'请填写内容'"
              :clearable="true"
              size="medium"
              @change="handleChange(field)"
            />
            <el-input
              v-else-if="field.type==='searchInput'"
              v-model="currentData[field.key]"
              v-bind="field.$el"
              :clearable="true"
              size="medium"
              class="common-search-input"
              v-on="field.$on"
              @keyup.native.enter="field.$onClick(currentData[field.key],currentData)"
            >
              <template v-if="field.prepend" slot="prepend">
                <slot :name="field.prepend" />
              </template>
              <i slot="append" class="el-icon-search" @click="field.$onClick(currentData[field.key],currentData)" />
            </el-input>
            <el-date-picker
              v-else-if="field.type==='date'"
              v-model="currentData[field.key]"
              v-bind="field.$el"
              :type="field.$el&&field.$el.type||'daterange'"
              :range-separator="field.$el&&field.$el.separator||'-'"
              :start-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'开始日期'"
              :end-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'结束日期'"
              size="medium"
              style="width:100%"
              v-on="field.$on"
              @change="handleChange(field)"
            />
          </div>
        </div>
      </div>
    </template>
    <el-button v-if="showSearchButton" type="primary" icon="el-icon-search">
      查询
    </el-button>
    <el-button size="medium" class="refresh-button" type="primary" icon="el-icon-refresh"
               @click="searchBarRefresh"
    />
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    props: {
      fields: {
        type: Array,
        default: ()=>''
      },
      value: {
        type: Object,
        default: ()=>''
      },
      showSearchButton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentData: this.value === undefined || this.value === null
          ? ''
          : this.value,
      };
    },
    watch: {
      value: {
        handler() {
          this.currentData = this.value;
        },
        immediate: true,
        deep: true
      },

    },
    methods: {
      handleChange(field) {
        const changeData = this.currentData[field.key];
        this.$emit('onChange', changeData, field);
      },
      searchBarRefresh() {
        this.$emit('refresh', {});
      }
    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .search-bar-out {
    text-align: left;
    white-space: nowrap;

    .search-item-out + .search-item-out {
      margin-left: 20px;
    }

    .search-item-out {
      margin-bottom: 20px;
      display: inline-block;
      align-items: center;

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
          margin-right: 15px;
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

    .common-search-input {
      /deep/ .el-input-group__append {
        background: #409EFF;
        color: #fff;
        border: 1px solid #409EFF;
      }

      /deep/ .el-input-group__prepend {
        background-color: #f5f7fa;
        color: #909399;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 4px 0 0 4px;
        padding: 0 20px;
        width: 1px;
        white-space: nowrap;
        border-right: none;
      }
    }

    .refresh-button {
      font-size: 18px;
      vertical-align: top;
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      position: relative;
      margin-left: 20px;
      left: -4px;
    }

    /deep/ .el-date-editor .el-range-input {
      width: 42%;
    }
  }
</style>
