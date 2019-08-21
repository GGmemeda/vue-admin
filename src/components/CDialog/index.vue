<template>
  <el-dialog
    v-loading="loading"
    v-el-drag-dialog
    class="c-common-dialog"
    :title="title"
    :visible.sync="visible"
    v-bind="$attrs"
    :show="show"
    @close="closeModal"
  >
    <slot />
    <div v-if="!hiddenButton" slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button @click="show = false">
          {{ cancelText }}
        </el-button>
        <el-button type="primary" @click="onOk">
          {{ okText }}
        </el-button>
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
    data () {
      return {
        visible: this.show
      };
    },
    watch: {
      show () { this.visible = this.show; }
    },
    mounted(){
    },
    methods: {
      closeModal(){
        this.$emit('update:show', false);
        this.$emit('close', false);
      },
      onOk () {
        this.$emit('onOk');
      }
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
