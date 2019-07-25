<template>
  <el-card>
    <div class="account-setting">
      <h2 class="title">个人中心&账户设置</h2>
      <p class="subtitle">更多功能陆续上线中...</p>
      <div class="option">
        <button @click="dialogName = true">修改用户名称</button>
        <button @click="dialogPassword = true">修改用户密码</button>
      </div>
      <!-- 修改用户名称 -->
      <el-dialog
        title="修改用户名称"
        :visible.sync="dialogName"
        :close-on-click-modal="false"
        width="30%"
      >
        <el-form size="small" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="新的名称">
                <el-input style="width: 100%;" v-model="name" placeholder="请键入新的用户名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button size="small" @click="dialogName = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleChangeName">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 -->
      <el-dialog
        title="修改用户密码"
        :visible.sync="dialogPassword"
        :close-on-click-modal="false"
        width="30%"
      >
        <el-form size="small" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="新的密码">
                <el-input type='password' style="width: 100%;" v-model="password" placeholder="请键入新的用户密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button size="small" @click="dialogPassword = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleChangePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  name: "AccountSetting",
  data() {
    return {
			dialogName: false,
      dialogPassword: false,
      name: "",
      password: ""
    };
	},
	computed: {
		...mapGetters(['getUserInfo'])
	},
  watch: {
		// 这个方法也可以（这两种方法注意handler单词不要拼错了）
    // getUserInfo: {
		// 	immediate: true,
		// 	deep: true,
		// 	handler: function(newVal) {
		// 		this.name = newVal.name
		// 	},
		// },
		// watch 直接监听store仓库数据（注意加上state）
		'$store.state.userInfo': {
			handler: function (newVal) {
				this.name = newVal.name
			},
			immediate: true
		}
  },
  methods: {
    handleChangeName() {
			if(this.name.length < 1 || this.name.length > 5) return this.$message.info({center: true, message: "用户名称需在2至5位"})
			let url = '/api/users/updateName'
			this.$axios.post(url, {newName: this.name})
				.then(({data}) => {
					console.log(data)
					if(data.code === -1) return this.$message.info({center: true, message: data.msg}) // 修改失败
					this.$message.success({center: true, message: data.msg})
					this.dialogName = false
					this.$store.dispatch('changeUserName', this.name)
					let userInfo = JSON.parse(localStorage.getItem('userInfo'))
					userInfo.name = this.name
					localStorage.setItem('userInfo', JSON.stringify(userInfo))
				})
				.catch((err) => {
					this.$message.error({center: true, message: err})
				})
		},
		handleChangePassword () {
			if(this.password.length < 6 || this.password.length > 12) return this.$message.info({center: true, message: "密码需在6至12位"})
			let url = '/api/users/updatePassword'
			this.$axios.post(url, {newPassword: this.password})
				.then(({data}) => {
					if(data.code === -1) return this.$message.info({center: true, message: data.msg}) // 修改失败
					this.$message.success({center: true, message: data.msg})
					this.dialogPassword = false
				})
				.catch((err) => {
					this.$message.error({center: true, message: err})
				})
		}
  }
};
</script>

<style lang="scss" scoped>
.account-setting {
  min-height: 80vh;
  background-color: rgba(247, 244, 244, 0.5);
  text-align: center;
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    letter-spacing: 8px;
    color: #856559;
  }
  .subtitle {
    margin-bottom: 100px;
    &::before {
      content: "";
      display: inline-block;
      width: 200px;
      height: 3px;
      vertical-align: middle;
      background-image: linear-gradient(
        90deg,
        rgba(161, 136, 127, 0),
        rgb(161, 136, 127)
      );
      margin-right: 20px;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 200px;
      height: 3px;
      vertical-align: middle;
      background-image: linear-gradient(
        -90deg,
        rgba(161, 136, 127, 0),
        rgb(161, 136, 127)
      );
      margin-left: 20px;
    }
  }
  .option {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 30vh;
    width: 30%;
    margin: 0 auto;
    button {
      width: 60%;
      cursor: pointer;
      position: relative;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-left: 14px;
      padding-right: 14px;
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      color: #ffffff;
      line-height: 2.33333333;
      border-radius: 5px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      overflow: hidden;
      color: #ce3c39;
      border: 1px solid #ce3c39;
      background: transparent;
      border-width: 1px;
      background-color: transparent;
    }
  }
}
</style>
