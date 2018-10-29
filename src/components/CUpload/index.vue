<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="limit"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :before-upload="beforeAvatarUpload"
    :accept="accept"
    v-bind="bindAttrs"
  >
    <slot>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </slot>
  </el-upload>
</template>

<script>
  export default {
    name: 'CUpload',
    props: {
      limit: {
        type: Number,
        default: 3
      },
      limitSize: {
        type: Number,
        default: 1
      },
      accept: {
        type: String,
        default: 'image/jpg,image/png'
      },
      tips: {
        type: String,
        default: '只能上传jpg/png文件，且不超过500kb'
      },
      bindAttrs: {
        type: Object,
        default: {}
      }

    },
    data () {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const fileSizeLimit = file.size <= this.limitSize;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!fileSizeLimit) {
          this.$message.error(`上传头像图片太大了!`);
        }
        return isJPG && fileSizeLimit;
      }
    }
  };
</script>
