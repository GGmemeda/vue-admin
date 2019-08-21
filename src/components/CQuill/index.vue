<template>
  <quill-editor
    ref="selfEditor"
    v-model="currentValue"
    class="quill-editor-out"
    :options="editorOption"
    @change="onEditorChange($event)"
  />
</template>

<script>
  import {quillEditor, Quill} from 'vue-quill-editor';
  import 'quill/dist/quill.snow.css';

  const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'sans-serif'];
  const Font = Quill.import('formats/font');
  Font.whitelist = fonts;
  Quill.register(Font, true);
  export default {
    name: 'CQuill',
    components: {
      quillEditor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      change: {
        type: Function,
        default: () => null
      }
    },
    data() {
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
              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'font': fonts}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
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
    computed: {
      editor() {
        return this.$refs.selfEditor.quill;
      }
    },
    watch: {
      value() {
        this.currentValue = this.value;
      }
    },
    mounted() {
    },
    methods: {
      onEditorChange(value) {
        this.$emit('change', value);
        this.$emit('input', value.html);
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .quill-editor-out {
    line-height: normal;

    .ql-container {
      min-height: 100px;
      background: #fff;
    }

    .ql-blank::before {
      font-style: normal;
    }
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
    content: "宋体";
    font-family: "SimSun";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
    content: "黑体";
    font-family: "SimHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
    content: "微软雅黑";
    font-family: "Microsoft YaHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
    content: "楷体";
    font-family: "KaiTi";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
    content: "仿宋";
    font-family: "FangSong";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
    content: "Arial";
    font-family: "Arial";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
    content: "Times New Roman";
    font-family: "Times New Roman";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
    content: "sans-serif";
    font-family: "sans-serif";
  }

  .ql-font-SimSun {
    font-family: "SimSun";
  }

  .ql-font-SimHei {
    font-family: "SimHei";
  }

  .ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
  }

  .ql-font-KaiTi {
    font-family: "KaiTi";
  }

  .ql-font-FangSong {
    font-family: "FangSong";
  }

  .ql-font-Arial {
    font-family: "Arial";
  }

  .ql-font-Times-New-Roman {
    font-family: "Times New Roman";
  }

  .ql-font-sans-serif {
    font-family: "sans-serif";
  }

</style>
