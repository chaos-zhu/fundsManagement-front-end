<template>
  <el-card>
    <div class="home">
      <!-- <h2 class="title" @click="handleTest">{{getUserInfo.name}} 欢迎使用XXXX系统</h2> -->
      <h2 class="title" @click="toQiniu">感谢七牛云提供存储服务</h2>
      <swiper :options="swiperOption" class="swiper-container">
        <swiper-slide class="swiper-item"><img src="http://qiniu.zhulijun.club/qiniu/01-min.jpg" alt="七牛云外链错误"></swiper-slide>
        <swiper-slide class="swiper-item"><img src="http://qiniu.zhulijun.club/qiniu/02-min.jpg" alt="七牛云外链错误"></swiper-slide>
        <swiper-slide class="swiper-item"><img src="http://qiniu.zhulijun.club/qiniu/03-min.jpg" alt="七牛云外链错误"></swiper-slide>
        <swiper-slide class="swiper-item"><img src="http://qiniu.zhulijun.club/qiniu/04-min.jpg" alt="七牛云外链错误"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="hr"></div>
      <div class="introduce">
        <el-scrollbar style="height: 100%">
          <div class="part" style="margin-bottom: -30px;">
            <h2>系统简介</h2>
            <p>
              为了熟练掌握学习的知识点而开发的demo.<br><br>
              功能：可以记录个人资金消费的记录以及图文展示资金的消费趋势.
            </p>
          </div>
          <div class="part">
            <h2>技术介绍</h2>
            <p>
              <span>后端: </span><br><br>
              ①使用Express框架搭建基础服务<br><br>
              ②数据采用MongoDb数据库进行存储<br><br>
              ③使用第三方模块mongoose与MongoDb数据库进行交互<br><br>
              ④使用body-parser模块处理post请求数据<br><br>
              ⑤使用multer模块处理附件的上传<br><br>
              ⑥使用jwt(jsonwebtoken)模块作为用户登录态验证<br><br>
              ⑦使用bcrypt模块加密用户密码<br><br>
              ⑧使用Nginx反向代理解决前端跨域问题<br><br>
              ⑨使用Gzip压缩js\css\jpge\png等本地文件<br><br>
              <span>前端: </span><br><br>
              ①使用Vue-cli2搭建项目基础结构<br><br>
              ②开发过程采用正向代理解决开发跨域<br><br>
              ③封装axios响应拦截,判断用户登陆态<br><br>
              ④使用element-ui作为项目系统基础UI框架<br><br>
              ⑤使用swiper组件达到首页公告轮播展示效果<br><br>
              ⑥使用路由懒加载提高首屏打开速度<br><br>
              ⑦使用Echarts动态展示图表<br><br>
              ⑧使用history路由模式并支持线上刷新<br><br>
              ⑨使用使用moment.js处理Date类型的转换<br><br>
              <!-- ⑩<br><br> -->
              
              </p>
          </div>
          <!-- <div class="part">
            <h2>我的收获</h2>
            <p>.....</p> 
          </div> -->
          </el-scrollbar>
      </div>
    </div>
  </el-card>
</template>


<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
require("swiper/dist/css/swiper.css");
export default {
  name: "Home",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        mousewheel: true,
				loop: true,
				autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    }
  },
  computed: {
    // ...mapState({userInfo: state => state.userInfo}),  // mapState 写法更麻烦，推荐使用mapGetters
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    ...mapActions(['changeUserName']), // 使用辅助函数直接将actions和mutations里的方法映射过来，直接调用和传递参数(尝试后只能传递一个)
    ...mapMutations(['handleUserName']),
    handleTest () {
      this.$store.dispatch('changeUserName', 123)
      // this.$store.commit('handleUserName', 123)
      // this.changeUserName(123, 456) // 第二个传值为undefined
      // this.handleUserName(123, 456)
    },
    toQiniu () {
      window.open('https://portal.qiniu.com/signup?code=1hcfln0f8z0ia')
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  position: relative;
  .title{
    position: absolute;
    top: 30px;
    margin-left: 30px;
    font-size: 35px;
    cursor: pointer;
    // font-style: oblique; // 下划线
    letter-spacing: 3px;
    text-shadow: 3px 3px 6px gray;
    background: linear-gradient(to right, red, blue); // 简写，其实是给background-image 设置为渐变色，不是 background-color
    -webkit-background-clip: text; // 只留下文本的背景区域(存在严重的兼容问题)
    color: transparent;  // 让文字为透明色，就是让后面背景色显示出来。
  }
  .swiper-container {
    margin-top: 120px;
    margin-right: 15px;
    width: 60%;
    height: 50vh;
    float: left;
    .swiper-item{
        img{
            width: 100%;
            height: 100%;
        }
    }
    .swiper-pagination{
        position: absolute;
        top: 50px;
    }
  }
	.hr{
		height: 85vh;
		border: 1px solid gray;
		margin-right: 30px;
		box-shadow: 1px 2px 2px rgb(230, 255, 8);
	}
  .introduce{
    width: 35%;
    height: 85vh;
    box-shadow: 1px 1px 1px gray;
		margin-right: 30px;
    .part{
      margin-bottom: 15px; 
      padding-top: 15px;
      min-height: 100px;
      h2{
        font-size: 18px;
        color: #6FBDFB;
        text-shadow: 1px 1px 1px gray;
        font-weight: 500;
      }
      p{
        margin: 15px 15px;
        font-size: 17px;
        color: gray;
        span{
          font-size: 17px;
          text-shadow: 1px 1px 1px gray;
        }
      }
    }
  }
}
</style>
