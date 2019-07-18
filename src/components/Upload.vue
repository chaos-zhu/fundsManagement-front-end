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
        :on-change="addFile"
        :action="uploadUrl"
        :auto-upload="false"
        :http-request="request"
        :show-file-list="true">
        <el-button
            slot="trigger"
            size="mini"
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
  props: ['picOk'],
  data() {
    return {
        uploadLoading: false,
        uploadUrl: 'http://必传递的props,任意字符串即可'
    };
  },
  mounted() {
      this.$emit('getUploadRef', this.$refs.upload)
  },
  methods: {
    request(option) {
        console.log('submit')
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
    addFile(file, fileList) {
        console.log('changeFile')
        const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
            this.$emit('update: picOk', false)
            this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
            return false
        }
        if (!isLt2M) {
            this.$emit('update: picOk', false)
            this.$message.error('上传头像图片大小不能超过 2MB!')
            return false
        }
        this.$emit('update:picOk', true)
        return true
    }
  }
};
</script>

<style lang="scss" scope>
</style>
