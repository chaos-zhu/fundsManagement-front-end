<template>
  <div class="header-container">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo不见了..." title="欢迎您~~~" />
      <h2>个人资金管理系统</h2>
    </div>
    <div class="info">
      <img :src="getUserInfo.avatar" class="avatar" alt="请登录~" />
      <div class="user">
        <span>欢迎使用😊</span>
        <h2 @click="$router.push('/account-setting')">{{ getUserInfo.name }}</h2>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">个人中心</el-dropdown-item>
          <el-dropdown-item command="1">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Header",
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  mounted() {
  },
  methods: {
    handleCommand(item) {
      switch (Number(item)) {
        case 0:
          this.$router.push('/account-setting')
          break;
        case 1:
          // localStorage.removeItem("userInfo")
          // localStorage.removeItem("token")
          localStorage.clear() // 一步到位，清楚所有localStorage数据
          sessionStorage.clear() // 一步到位，清楚所有sessionStorage数据
          this.$message({
            type: "success",
            message: "已安全退出",
            center: true
          });
          this.$router.push("/login");
          break;
      }
    }
  }
};
</script>

<style lang="scss" scope>
.header-container {
  width: 100%;
  height: 70px;
  background-color: #2d374f;
  margin-bottom: 2px;
  box-shadow: 0px 2px 2px rgb(96, 109, 138);
  display: flex;
  justify-content: space-between;
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      margin: 0 20px;
      height: 80%;
    }
    h2 {
      color: white;
      font-size: 21px;
      font-weight: bolder;
      letter-spacing: 5px;
    }
  }
  .info {
    margin-right: 50px;
    height: 100%;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .avatar {
      width: 25%;
      border-radius: 50%;
      overflow: hidden;
    }
    .user {
      color: rgba(255, 255, 255, 0.9);
      margin: 0 10px;
      text-align: center;
      line-height: 25px;
      span {
        font-size: 14px;
      }
      h2 {
        font-size: 16px;
        color: rgb(0, 255, 255);
        cursor: pointer;
        &:hover{
          color: rgb(255, 208, 75);
        }
      }
    }
  }
}
</style>
