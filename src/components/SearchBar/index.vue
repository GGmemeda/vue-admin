<template>
  <div class="search-bar-out" v-if="fields" ref="searchBar">
    <template v-for="field in fields">
      <div class="search-item-out">
        <div class="search-item">
          <div class="title" :style='{width: field.labelWidth}' v-if="field.label">{field.label}：</div>
          <div :style="{width:(field.width?field.width:field.type==='searchInput'?220:180)+'px'}">
            <el-input v-bind="field.$el" v-on="field.$on" v-if="field.type==='input'" v-model="currentData[field.key]"
                      :placeholder="field.placeholder||'请填写内容'"></el-input>
            <el-select v-bind="field.$el"
                       v-on="field.$on"
                       v-else-if="field.type==='select'" v-model="currentData[field.key]"
                       :clearable="true"
                       @change="handleChange(field)"

            >
              <el-option
                v-if="field.options instanceof Array"
                v-for="item in field.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input-number v-bind="field.$el"
                             v-else-if="field.type==='inputNumber'" v-model="currentData[field.key]"
                             :placeholder="field.placeholder||'请填写内容'"
                             :clearable="true"
                             @change="handleChange(field)"
            >
            </el-input-number>
            <el-input
              v-else-if="field.type==='searchInput'"
              v-bind="field.$el"
              v-on="field.$on"
              :clearable="true"
              class="common-search-input"
              @keyup.native.enter="field.$onClick(currentData[field.key],currentData)"
              v-model="currentData[field.key]">
              <i  slot="append" @click="field.$onClick(currentData[field.key],currentData)" class="el-icon-search"></i>
            </el-input>
            <el-date-picker
              v-else-if="field.type==='date'"
              v-bind="field.$el"
              v-on="field.$on"
              :type="field.$el&&field.$el.type||'daterange'"
              style="width:100%"
              :range-separator="field.$el&&field.$el.separator||'-'"
              :start-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'开始日期'"
              :end-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'结束日期'"
              v-model="currentData[field.key]"
              @change="handleChange(field)"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
    </template>
    <el-button v-if="showSearchButton" type="primary" icon="el-icon-search">查询</el-button>
    <el-button class="refresh-button" @click="searchBarRefresh" type="primary" icon="el-icon-refresh"></el-button>
  </div>
</template>

<script>
  export default {
    name: 'search-bar',
    data () {
      return {
        currentData: this.value === undefined || this.value === null
          ? ''
          : this.value,
      };
    },
    props: {
      fields: {
        type: Array,
      },
      value: {
        type: Object,
      },
      showSearchButton: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleChange (field) {
        const changeData = this.currentData[field.key];
        this.$emit('onChange', changeData, field);
      },
      searchBarRefresh () {
        this.$emit('refresh', {});
      }
    },
    watch: {
      value: {
        handler () {
          this.currentData = this.value;
        },
        immediate: true,
        deep: true
      },

    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .search-bar-out {
    text-align: right;
    .search-item-out {
      margin-bottom: 20px;
      display: inline-block;
      align-items: center;
      margin-left: 20px;
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
    .common-search-input{
      /deep/ .el-input-group__append{
        background: #409EFF;
        color: #fff;
        border:1px solid #409EFF;
      }
    }
    .refresh-button {
      font-size: 18px;
      vertical-align: top;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      position: relative;
      margin-left: 20px;
      left: -4px;
    }
    /deep/ .el-date-editor .el-range-input {
      width: 42%;
    }
  }
</style>
