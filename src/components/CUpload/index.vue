<template>
  <el-upload
    class="upload-demo avatar-uploader"
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
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
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
      imageUrl: {
        type: String,
        default: ''
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
        default: () => {
        }
      }

    },
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeAvatarUpload(file) {
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
<style scoped rel="stylesheet/scss" lang="scss">
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }

  /deep/ .avatar {
    display: block;
    width: 100%;
  }
</style>
