<template>
  <quill-editor
    ref="selfEditor"
    v-model="currentValue"
    :options="editorOption"
    class="quill-editor-out"
    @change="onEditorChange($event)"
  />
</template>

<script>
  import { quillEditor } from 'vue-quill-editor';

  export default {
    name: 'CQuill',
    components: {
      quillEditor
    },
    data () {
      return {
        currentValue: this.value === undefined || this.value === null
          ? ''
          : this.value,
        editorOption: {
          placeholder: '请输入内容',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      };
    },
    props: {
      value: { type: String },
      change: {
        type: Function,
        default: () => null
      }
    },
    computed: {
      editor () {
        return this.$refs.selfEditor.quill;
      }
    },
    watch: {
      value () {
        this.currentValue = this.value;
      }
    },
    mounted () {
    },
    methods: {
      onEditorChange (value) {
        this.$emit('change', value);
      }
    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .quill-editor-out {
    line-height: normal;
    /deep/ .ql-container {
      min-height: 100px;
      background: #fff;
    }
    /deep/ .ql-blank::before {
      font-style: normal;
    }
  }

</style>
