<template>
  <div :class="['navmenu-container', {'hide-nav-menu': !navSwitch}]">
    <div class="navmenu-switch" @click="handleNavSwitch">
      <i :class="{'el-icon-d-arrow-left': navSwitch}"></i>
      <i :class="{'el-icon-d-arrow-right': !navSwitch}"></i>
    </div>
    <el-menu
      :default-active="curMenu"
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
  props: {
    navStatus: {
      required: true,
      type: Boolean
    }
  },
	data() {
		return {
      curMenu: '/',
      navSwitch: true
		}
  },
  watch: {
    '$route': function (newValue) { 
      console.log(newValue) 
       this.curMenu = newValue.path
    }
    
  },
  beforeCreate() {
    // console.log(this.curMenu) // undefined 在这个生命周期中初始化data、watch、computer、methods等，但是还拿不到
  },
  mounted() {
    // 还是拿不到路由$route
    // this.$nextTick(() => {
    //   console.log(this.$route)
    //   this.curMenu = this.$route.path
    // })
  },
	methods: {
		handleSelect (item) {
      this.curMenu = item
			this.$router.push(item)
    },
    handleNavSwitch () {
      this.navSwitch = !this.navSwitch
      this.$emit('update:navStatus', this.navSwitch)
    }
	}
}
</script>

<style lang="scss" scope>
.navmenu-container {
  width: 10%;
  height: calc(100vh - 72px);
  background-color: #2d374f;
  opacity: 0.93;
  float: left;
  transition: 0.5s;
  position: relative;
  .navmenu-switch{
    position: absolute;
    right: -30px;
    top: 45vh;
    z-index: 9;
    height: 30px;
    line-height: 30px;
    width: 35px;
    font-size: 25px;
    text-align: center;
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    i{
      color: white;
    }
  }
}
.hide-nav-menu{
  margin-left: -10%;
}
</style>
