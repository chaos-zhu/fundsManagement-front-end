<template>
  <div class="navmenu-container">
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/capital-flow">
        <i class="el-icon-document"></i>
        <span slot="title">资金流水</span>
      </el-menu-item>
      <el-menu-item index="/expenditure-trend">
        <i class="el-icon-setting"></i>
        <span slot="title">开销趋势</span>
      </el-menu-item>
      <el-menu-item index="/account-settings">
        <i class="el-icon-setting"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
	name: "Navmenu",
	data() {
		return {
			
		}
	},
	methods: {
		handleSelect (item) {
			this.$router.push(item)
		}
	},
}
</script>

<style lang="scss" scope>
.navmenu-container {
  width: 10%;
  height: 100%;
  background-color: #2d374f;
  opacity: 0.93;
}
</style>
