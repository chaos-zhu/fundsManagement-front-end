<template>
  <div class="index-container">
    <Header :user='user' />
    <NavMenu />
    <div class="main-box">
      <el-card style="height: 89%;">
        <router-view />
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from '@/page/Header.vue'
import NavMenu from '@/page/NavMenu.vue'
export default {
  name: 'Index',
  components: {
    Header,
    NavMenu
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.userInfo) : null
  },
  mounted() {
    this.$axios.get('/api/funds/record')
      .then(({data}) => {
        console.log(data)
      })
  }
}
</script>

<style lang='scss' scoped>
.index-container{
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .main-box{
    margin: 10px;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
  }
}
</style>
