<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :show="show"
    @close="$emit('update:show', false)">
    <slot/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">{{ cancelText }}</el-button>
      <el-button type="primary" @click="onOk">{{ okText }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
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
  data() {
    return {
      visible: this.show
    };
  },
  watch: {
    show() { this.visible = this.show; }
  },
  methods: {
    onOk() {
      this.$emit('onOk');
    }
  }
};
</script>
