<template>
  <el-dialog
    v-bind="$attrs"
    :title="title"
    :visible.sync="visible"
    v-loading="loading"
    @close="$emit('update:show', false)"
    :show="show">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">{{cancelText}}</el-button>
      <el-button type="primary" @click="onOk">{{okText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        visible: this.show
      };
    },
    mounted(){
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      loading:{
        type:Boolean,
        default:false
      },
      okText: {
        type: String,
        default: '确 定'
      },
      cancelText: {
        type: String,
        default: '取 消'
      }
    },
    methods: {
      onOk () {
        this.$emit('onOk');
      }
    },
    watch: {
      show () { this.visible = this.show; }
    }
  };
</script>
