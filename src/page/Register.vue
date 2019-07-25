<template>
  <div class="register-container">
    <div class="login">
      <el-card shadow="hover">
        <el-form :model="registerFormData" :rules="rules" label-width="70px" ref="loginForm">
          <el-row type="flex">
            <el-col :span="23">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="registerFormData.name"></el-input>
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
                <el-input type='password' v-model="registerFormData.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row type="flex">
            <el-col :span="23">
              <el-form-item label="头像">
                <upload :picOk.sync='picOk' @getUploadRef="getUploadRef" @getFileData="getFileData" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row type="flex">
            <el-col :span="20" :push="7">
              <el-form-item>
                <el-button type="primary" size="mini" @click="submitForm">立即注册</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="18" style="font-size: 12px;margin-bottom: 15px;">
                <p style="position: absolute;right: 0;">
                  已有账号？
                  <router-link to="/login" tag="a" style="font-size: 14px;color: #11155d;">去登录</router-link>
                </p>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// import Upload from "@/components/Upload.vue"
export default {
  name: "Register",
  components: {
    // Upload
  },
  data() {
    return {
      // formData: null,
      // uploadRef: null,
      // picOk: false,
      registerFormData: {
        name: "",
        email: "",
        password: "",
        // avatar: null
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }, {min: 2, max: 5, message: '用户名长度在2到5位之间'}],
        email: [ { required: true, message: "请输入邮箱地址", trigger: "blur" }, { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        password: [ { required: true, message: "密码不能为空", trigger: "blur" }, { min: 6, max: 12, message: "密码长度在6~12位之间" } ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(isOk => {
        // this.uploadRef.submit()
        if(!isOk) return this.$message({ type: 'error', message: '缺少必填项', center: true })
        // if(!this.picOk) return this.$message({type: 'error', message: '头像图片错误', center: true})
        let loading = this.$loading({fullscreen: true, text: '账户注册中...', background: 'rgba(0, 0, 0, 0.5)'})
        let { name, email, password } = this.registerFormData
        let url = '/api/users/register'
        // let formData = new FormData()
        // formData.append('name', name)
        // formData.append('email', email)
        // formData.append('password', password)
        this.$axios.post(url, this.registerFormData)
              .then(({data}) => {
                loading.close()
                if(data.code === -1) return this.$message({ type: 'error', message: data.msg, center: true })
                this.$message({
                  type: 'success',
                  message: '注册成功(●"◡"●)',
                  center: true
                })
                this.$router.push({
                  name: 'login',
                  params: email
                })
              })
      })
    },
    // getUploadRef(ref) {
    //   this.uploadRef = ref
    // },
    // getFileData(formData) {
    //   this.formData = formData
    // }
  }
}
</script>

<style lang='scss' scoped>
.register-container{
    // border-top: 1px;
    padding-top: 1px;
    // overflow: hidden;
  .login {
    width: 25%;
    margin: 25vh auto;
    position: relative;
    padding-right: 20px;
  }
}
</style>
