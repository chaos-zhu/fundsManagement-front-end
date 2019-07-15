<template>
  <el-card>
    <div class="home">
      <swiper :options="swiperOption" class="swiper-container">
        <swiper-slide class="swiper-item"><img src="@/assets/img/1.jpeg" alt="图片不见了"></swiper-slide>
        <swiper-slide class="swiper-item"><img src="@/assets/img/2.jpeg" alt="图片不见了"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="hr"></div>
      <div class="introduce">
        <el-scrollbar style="height: 100%">
          <div class="part" style="margin-bottom: -30px;">
            <h2>系统简介</h2>
            <p>
              为了熟练掌握学习的知识点而开发的demo.<br><br>
              可以记录个人资金消费的记录以及图文展示资金的消费趋势.
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
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .swiper-container {
    margin: 150px 15px 0 0;;
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
        text-shadow: 1px 1px 1px gray;
      }
      p{
        margin: 15px 15px;
        font-size: 17px;
        color: gray;
      }
    }
  }
}
</style>
