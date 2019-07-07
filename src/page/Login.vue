<template>
  <div class="login">
      <h2 class="logo">
         <img src='@/assets/logo.png' />
      </h2>
    <el-card shadow="hover">
      <el-form
        :model="loginFormData"
        label-width="60px"
        :rules='rules'
        ref="loginForm">
        <el-row type="flex">
            <el-col :span="23">
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="loginFormData.email"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="23">
                <el-form-item prop="password" label='密码'>
                    <el-input type='password' v-model="loginFormData.password"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="20" :push="7">
                <el-form-item>
                    <el-button type="primary" size='small' @click="submitForm">登录</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="20" :push="18" style="font-size: 12px;">
                还没账号？ <router-link to="/register" tag="a" style="font-size: 14px;color: #11155d;">去注册</router-link>
            </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      return {
          loginFormData: {
              email: '',
              password: ''
          },
          rules: {
            email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
            password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 12, message: '密码长度在6~12位之间'}]
        }
      }
  },
  methods: {
      submitForm() {
          this.$refs.loginForm.validate((isOk) => {
              console.log(isOk)
          })
      }
  },
};
</script>

<style lang='scss' scoped>
.login {
  width:25%;
  margin: 30vh auto;
  position: relative;
  padding-right: 20px;
  .logo{
      height: 100px;
      width: 1000px;
      position: absolute;
      top:-150px;
      left: -300px;
      text-align: center;
    //   background-color: #dddddd;
  }
}
</style>
