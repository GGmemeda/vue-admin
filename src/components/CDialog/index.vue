<template>
  <el-dialog
    class="c-common-dialog"
    :title="title"
    :visible.sync="visible"
    v-loading="loading"
    v-el-drag-dialog
    @close="closeModal"
    v-bind="$attrs"
    :show="show">
    <slot></slot>
    <div slot="footer" class="dialog-footer"   v-if="!hiddenButton">
      <slot name="footer" >
        <el-button @click="show = false">{{cancelText}}</el-button>
        <el-button type="primary" @click="onOk">{{okText}}</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
  import elDragDialog from '@/directive/el-dragDialog'
  export default {
    name:'CDialog',
    directives:{
      elDragDialog
    },
    data () {
      return {
        visible: this.show
      };
    },
    mounted(){
    },
    props: {
      hiddenButton:{
        type:Boolean,
        default:false
      },
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
      closeModal(){
        this.$emit('update:show', false);
        this.$emit('close', false);
      },
      onOk () {
        this.$emit('onOk');
      }
    },
    watch: {
      show () { this.visible = this.show; }
    }
  };
</script>
<style scoped rel="stylesheet/scss" lang="scss"  >
  .c-common-dialog{
    /deep/ .el-dialog__title{
      user-select: none;
    }
  }

</style>
