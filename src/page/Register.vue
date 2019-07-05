<template>
  <div class="login">
    <el-card shadow="hover">
      <el-form :model="registerFormData" :rules="rules" label-width="70px" ref="loginForm">
        <el-row type="flex">
          <el-col :span="23">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="registerFormData.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="23">
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="registerFormData.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="23">
            <el-form-item prop="password" label="密码">
              <el-input v-model="registerFormData.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="23">
            <el-form-item label="头像" :rules="rules.passwordRule">
              <upload @getUploadRef="getUploadRef" @getFileData="getFileData" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="20" :push="7">
            <el-form-item>
              <el-button type="primary" size="small" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="20" :push="18" style="font-size: 12px">
            已有账号？
            <router-link to="/login" tag="a" style="font-size: 14pxcolor: #11155d">去登录</router-link>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue"
export default {
  name: "Login",
  components: {
    Upload
  },
  data() {
    return {
      formData: null,
      uploadRef: null,
      registerFormData: {
        userName: "",
        email: "",
        password: "",
        avatar: null
      },
      rules: {
        userName: { required: true, message: "请输入用户名", trigger: "blur" },
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度在6~12位之间" }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.uploadRef.submit()
          let { userName, email, password } = this.registerFormData
          let url = '/api/users/register'
          this.formData.append('name', userName)
          this.formData.append('email', email)
          this.formData.append('password', password)
          this.axios.post(url, this.formData)
                .then(({data}) => {
                  console.log(data)
                })
        } else {
          this.$message({
            type: 'error',
            message: '缺少必填项',
            center: true
          })
        }
      })
    },
    getUploadRef(ref) {
      this.uploadRef = ref
    },
    getFileData(formData) {
      this.formData = formData
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  width: 25%;
  margin: 25vh auto;
  position: relative;
  padding-right: 20px;
}
</style>
