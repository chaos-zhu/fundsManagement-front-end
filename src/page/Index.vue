<template>
  <div id="index">
    <Header :user='getUserInfo'/>
    <NavMenu :navStatus.sync='navStatus'/>
      <div :class="['right-box', {'cancel-margin-left': !navStatus}]">
        <transition
          appear
          mode="out-in"
          name="el-fade-in" >
            <router-view />
        </transition>
      </div>
  </div>
</template>

<script>
import Header from '@/page/Header.vue'
import NavMenu from '@/page/NavMenu.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    Header,
    NavMenu
  },
  data() {
    return {
      navStatus: true
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  created() {
  }
}
</script>

<style lang='scss'>
#index {
  height: 100%;
  width: 100%;
  .right-box{
    margin:10px 10px 10px 10.5%;
    height: calc(100vh - 90px);
    transition: 0.5s;
    z-index: 1;
    overflow-y: scroll;
  }
  // 加上overflow-y: scroll;自定义滚动条(高版本浏览器支持)
  .right-box::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }
  .right-box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px white;
    border-radius: 4px;
  }
  .right-box::-webkit-scrollbar-thumb {
    // border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px white;
    // background-color: #fff;
  }
  .cancel-margin-left{
    margin-left: 10px;
  }
}
</style>
