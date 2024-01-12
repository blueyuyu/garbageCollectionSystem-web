<template>
  <div class="macwk-footer pc-model" data-v-ea53b530="">
    <footer class="footer-wrapper">
      <div class="footer-top">
        <div class="container">
          <div class="row gy-4">
            <div class="col-lg-1">
              <div class="widget-about">
                <h3 class="footer-heading">关于</h3>
                <p class="body-text">
                 资讯、资源、社交、商城、圈子、导航等多功能CMS我们只认真做好一个网站。致力建设社交、资讯、资源类站点！
                </p>
              </div>
            </div>
            <div class="col-lg-2">
              <h3 class="footer-heading">关于我们</h3>
              <ul >
                <li><a href="#">关于我们</a></li>
                <li><a href="#">联系方式</a></li>
                <li><a href="#">用户协议</a></li>
                <li><a href="#">隐私政策</a></li>
                <li><a href="#">免责声明</a></li>
              </ul>
            </div>
            <div class="col-lg-4">
              <div class="widget-categories">
                <h3 class="footer-heading">特色功能</h3>
                <div class="categories-tags">
                  <a href="single-post.html" class="active">圈子 </a
                  ><a href="single-post.html">资讯快讯 </a
                  ><a href="single-post.html">帮助中心 </a
                  ><a href="single-post.html">积分兑换 </a
                  ><a href="single-post.html">会员购买 </a
                  ><a href="single-post.html">购物商城 </a
                  ><a href="single-post.html">软件下载 </a
                  ><a href="single-post.html">推广中心 </a
                  ><a href="single-post.html">财富管理 </a
                  ><a href="single-post.html">任务中心 </a
                  ><a href="single-post.html">私信列表 </a
                  ><a href="single-post.html">友链申请 </a
                  ><a href="single-post.html">认证服务 </a
                  ><a href="single-post.html">推广中心 </a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 ">
              <div class="widget-search">
                <h3 class="footer-heading">搜索</h3>
                <p class="body-text">您想要的这里都有</p>
                <div class="widget-search-box">
                  <input type="text" v-model="seachcontent" placeholder="输入内容" />
                  <button
                  @click="queryssubmit()" class="search-btn"
                  >
                    <i  class="fas el-icon-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <!-- <div class="bottom-content">
            <div class="bottom-left">
              <p>©Newlog 2022. All rights By <a href="/">bootstrapmb</a>.</p>
            </div>
            <div class="bottom-right">
              <div class="footer-bottom-links">
                <a href="#">Privacy Policy</a><span>|</span
                ><a href="#">Terms and conditions</a>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Foots",
  setup() {},
  computed: {
    ...mapState(["playlist", "glabledata", "count"]),
  },
  data () {
    return {
      seachcontent: "",
    };
  },
  methods: {
    //判空
    judgeNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    queryssubmit() {
      //提交
      if (this.judgeNull(this.seachcontent)) {
        this.$notify({
          title: '提示',
          message: '输入的数据不能为空',
          type: 'warning'
        });
      } else {
        console.log(this.fundByresource)
        //   直接调用$router.push 实现携带参数的跳转

          this.$router.push({
          path: `/list/${this.seachcontent}/all`,
        })
       
      }
    },
  },
};
</script>

<style scoped>
.body-text {
  font-size: 16px;
  line-height: 170%;
  color: #3d5b7d;
  font-weight: 400;
  font-family: "Titillium Web", sans-serif;
}
.categories-tags {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.categories-tags a {
  padding: 0 15px;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  color: #3d5b7d;
  border: 1px solid #dae6f9;
  margin-bottom: 10px;
}
.categories-tags a:hover {
  background: linear-gradient(91.85deg, #007aea 0, #00c2ff 100%);
  -webkit-box-shadow: 0 10px 15px rgba(23, 126, 247, 0.25);
  box-shadow: 0 10px 15px rgba(23, 126, 247, 0.25);
  color: white;
}
.categories-tags a:not(:last-child) {
  margin-right: 10px;
}
.widget-search-box {
  max-width: 300px;
  position: relative;
  margin-top: 20px;
}
.widget-search-box input {
  border-color: rgb(6, 6, 6);
  outline: 0!important;
  width: 100%;
  padding: 15px 20px;
  border-radius: 10px;
}
.widget-search-box::-webkit-input-placeholder {
  font-size: 14px;
  color: #3d5b7d;
}
.widget-search-box:-ms-input-placeholder {
  font-size: 14px;
  color: #3d5b7d;
}
.widget-search-box::-ms-input-placeholder {
  font-size: 14px;
  color: #3d5b7d;
}
.widget-search-box .search-btn {
  width: 50px;
  height: 50px;
  background: linear-gradient(91.85deg, #007aea 0, #00c2ff 100%);
  border-radius: 10px;
  -webkit-box-shadow: 0 10px 15px rgba(23, 126, 247, 0.25);
  box-shadow: 0 10px 15px rgba(23, 126, 247, 0.25);
  color: white;
  text-align: center;
  line-height: 50px;
  position: absolute;
  right: 5px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.footer-wrapper {
  margin-top: 10px;
}
.footer-wrapper .footer-top {
  background-color: #eef5fe;
  padding: 60px 0;
  margin: 0 130px;
  border-radius: 15px;
}
@media (max-width: 1450px) {
  .footer-wrapper .footer-top {
    margin: 0 10px;
  }
}
@media (max-width: 991px) {
  .footer-wrapper .footer-top {
    padding: 60px 0;
  }
}
.footer-wrapper .footer-top .footer-heading {
  font-size: 24px;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
}
.footer-wrapper .footer-top .widget-about {
  padding-right: 50px;
}
.footer-wrapper .footer-bottom {
  padding: 40px 0;
}
.footer-wrapper .footer-bottom p {
  color: #7a90aa;
  font-size: 14px;
  text-transform: capitalize;
}
.footer-wrapper .footer-bottom .bottom-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
@media (max-width: 575px) {
  .footer-wrapper .footer-bottom .bottom-content {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }
}
.footer-wrapper .footer-bottom .footer-bottom-links {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.footer-wrapper .footer-bottom .footer-bottom-links a,
.footer-wrapper .footer-bottom .footer-bottom-links span {
  color: #7a90aa;
  font-size: 14px;
  text-transform: capitalize;
}
.footer-wrapper .footer-bottom .footer-bottom-links span {
  margin: 0 10px;
}
.col-lg-1{
  width: 28.33333333%;
  max-width: 48.33333%;
  flex: none;
}
.col-lg-2{
  width: 13.33333333%;
  max-width: 48.33333%;
  flex: none;
}
.fas {
font-weight: 900;
}
.col-lg-2 li{
  margin: 0;
    padding: 0;
    list-style: none;
}
.col-lg-2 ul {
    padding: 0;
}
@media screen and (max-width:991px){
  .col-lg-1{display:none; }
  .col-lg-2{display:none; }

}

</style>