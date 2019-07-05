<template>
<!-- 
    multiple: 多选；on-exceed: 超过限制的回调
 -->
   <el-upload
        class="publish-plan-upload"
        ref="upload"
        :multiple="false"
        :limit='1'
        :on-exceed='onExceed'
        :action="uploadUrl"
        :auto-upload="false"
        :http-request="request"
        :show-file-list="true">
        <el-button
            slot="trigger"
            size="small"
            type="primary"
            :loading="uploadLoading"
        >
            选取文件
        </el-button><br/>
    <!-- <span slot="tip" class="el-upload_tip">支持上传多个文件*</span> -->
    </el-upload>
</template>

<script>
export default {
  name: "Uplaod",
  data() {
    return {
        uploadLoading: false,
        uploadUrl: 'http://fsdafds'
    };
  },
  mounted() {
      this.$emit('getUploadRef', this.$refs.upload)
  },
  methods: {
        // this.$refs.upload.submit()
    async request(option) {
        console.log(option.file)
        const formData = new FormData()
        formData.append('file',option.file)
        this.$emit('getFileData', formData)
    },
    handleError() {
        this.$message.error('添加失败')
    },
    onExceed() {
        this.$message({
            type: 'error',
            message: '失败：最多只能添加一张图片',
            center: true
        })
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scope>
</style>
