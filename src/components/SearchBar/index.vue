<template>
  <div class="search-bar-out" v-if="fields">
    <template v-for="field in fields">
      <div class="search-item-out">
        <div class="search-item">
          <div class="title" :style='{width: field.labelWidth}' v-if="field.label">{field.label}：</div>
          <div :style="{width: (field.width || 180)+'px'}">
            <el-input v-bind="field.$el" v-if="field.type==='input'" v-model="data[field.key]"
                      :placeholder="field.placeholder||'请填写内容'"></el-input>
            <el-select v-bind="field.$el"
                       v-else-if="field.type==='select'" v-model="data[field.key]"
                       :placeholder="field.placeholder||'请选择'"
                       clearable="true"
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
                             v-else-if="field.type==='inputNumber'" v-model="data[field.key]"
                             :placeholder="field.placeholder||'请填写内容'"
                             clearable="true"
                             @change="handleChange(field)"
            >
            </el-input-number>
            <el-input
              v-else-if="field.type==='searchInput'"
              v-bind="field.$el"
              v-on="field.$on"
              clearable="true"
              @keyup.native.enter="field.$onClick(data[field.key],data)"
              v-model="data[field.key]">
              <i slot="suffix" @click="field.$onClick(data[field.key],data)" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-date-picker
              v-else-if="field.type==='date'"
              v-bind="field.$el"
              :type="field.$el&&field.$el.type||'daterange'"
              style="width:100%"
              @change="handleChange(field)"
              :range-separator="field.$el&&field.$el.separator||'-'"
              :start-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'开始日期'"
              :end-placeholder="field.$el&&field.$el.placeholder&&field.$el.placeholder[0]||'结束日期'"
              v-model="data[field.key]"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
    </template>
    <el-button v-if="showSearchButton" type="primary" icon="el-icon-search">查询</el-button>
    <el-button @click="searchBarRefresh()" type="primary" icon="el-icon-refresh"></el-button>
  </div>
</template>

<script>
  export default {
    name: 'search-bar',
    props: {
      fields: {
        type: Array,
      },
      data: {
        type: Object,
        test: '',
        default: {},
        required: true,
      },
      showSearchButton: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleChange (field) {
        console.log(field);
        const changeData = this.data[field.key];
        this.$emit('onChange', changeData, field);
      },
      searchBarRefresh () {
        this.$emit('refresh', this.data);
      }
    }
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
    /deep/ .el-date-editor .el-range-input {
      width: 42%;
    }
  }
</style>
