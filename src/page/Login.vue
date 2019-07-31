<template>
  <div class="login-container">
    <h2 class="logo">
      <img src="@/assets/loginLogo.png" />
    </h2>
    <div class="login">
      <el-card shadow="hover">
        <el-form :model="loginFormData" label-width="60px" :rules="rules" ref="loginForm">
          <el-row type="flex">
            <el-col :span="23">
              <el-form-item prop="email" label="邮箱">
                <el-input v-model="loginFormData.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="23">
              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginFormData.password"></el-input>
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
            <el-col :span="18" style="font-size: 12px;margin-bottom: 15px">
							<p style="position: absolute;right: 0">
								还没账号？
              	<router-link to="/register" tag="a" style="font-size: 14px;color: #11155d">去注册</router-link>
							</p>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <!-- <el-dialog
      title="提示"
      :visible.sync="tipsShow"
      width="30%">
      <span>目前开发完成的功能有：注册、登录、资金记录的增加(支持附件上传与下载)、删除、条件查找、修改；其他功能陆续开发中。。。</span>
    </el-dialog> -->
  </div>
</template>

<script>
// import { $loading } from '@/utils/tool.js'
export default {
  name: "Login",
  data() {
    return {
      tipsShow: true,
      loginFormData: {
        email: "",
        password: ""
      },
      rules: {
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
  mounted() {
    // console.log(this.$route.params.needLogin)
    if (this.$route.params.needLogin) {
      this.$message({ type: 'info', message: `请先登录`, center: true })
    }
    if (this.$route.params.email) {
      this.loginFormData.email = this.$route.params.email
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(isOk => {
				if(!isOk) return this.$message({type: 'error', message: '表单校验失败!', center: true})
				let loading = this.$loading({fullscreen: true, text: '疯狂加载中...', background: 'rgba(0, 0, 0, 0.5)'})
				let url = '/api/users/login'
				let { email, password } = this.loginFormData
				this.$axios.post(url, {email, password})
						.then(({ data }) => {
              loading.close()
							if(data.code === -1) return this.$message({type: 'error', message: data.msg, center: true})
							this.$message({type: 'success', message: '登录成功😊', center: true})
              // console.log(data)
              // this.$store.commit('setLoginStatus', true)
              let {userInfo, token } = data.data
							// localStorage.setItem('userInfo', JSON.stringify(userInfo))
              // localStorage.setItem('token', JSON.stringify(token))
							sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
              sessionStorage.setItem('token', JSON.stringify(token))
              this.$store.commit('setUserInfo', userInfo)
							this.$router.push('/')
						})
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.login-container{
  // border-top: 1px;
  // padding-top: 1px;
  overflow: hidden;
	.logo {
		height: 100px;
		text-align: center;
		margin-top: 3%;
	}
	.login {
		width: 28%;
		margin: 10vh auto;
		position: relative;
		padding-right: 20px;
	}
}
</style>
