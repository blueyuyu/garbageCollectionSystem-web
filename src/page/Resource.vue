<template>
  <div class="Resource">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message2="acticve" />
          <div class="overflow-hidden pt-5">
            <div class="layout-header pt-5 pb-5 position-relative pc-model">
              <!-- ../static/image/loding.gif -->
              <div>
                <img src="../static/image/shape-1.svg" class="shape-three" /><img src="../static/image/shape-55.svg"
                  class="shape-four" /><img src="../static/image/shape-56.svg" class="shape-five" /><img
                  src="../static/image/shape-57.svg" class="shape-six" /><img src="../static/image/shape-58.svg"
                  class="shape-seven" /><img src="../static/image/shape-59.svg" class="shape-eight" /><img
                  src="../static/image/shape-60.svg" class="shape-nine" /><img src="../static/image/shape-61.svg"
                  class="shape-ten" /><img src="../static/image/shape-62.svg" class="shape-eleven" /><img
                  src="../static/image/shape-10.svg" class="shape-10" /><img src="../static/image/shape-11.svg"
                  class="shape-11" />
              </div>
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-xs-12 col-lg-6 col-xl-6 text-center">
                              内容填充区域

                  </div>
                </div>
              </div>
            </div>
            <div class="soft-layouts bg mb-8 pc-model">
             
              <div class="row gy-5">
                <div class="col-lg-9">
                  <div class="left-content">
                    <!-- Post card -->
                    <div class="post-card">

                      <div class="card-content">

                        <div class="post-content">
                          <div>
                            <h3 class="heading-secondary mar-left">简介</h3>
                            <div class="post-txt mar-left" id="sidelist" v-html="this.content"></div>
                          </div>
                        </div>
                      </div>
                    </div><!-- Tags -->
                    <div class="tags">
                      <h3 class="heading-secondary mar-left">标签</h3>

                      <div class="categories-tags mar-left"><a v-for="item in Mytag" :key="item.id"
                          :href="'/post/' + item + '/all'">{{ item }} </a>
                      </div>
                    </div>
                    <div class="post-navigation">
                      <router-link :to="'/list/' + preResource.id">
                        <div class="nav-prev">
                          <div class="nav-button-left">
                            <span><img src="../static/img/long-arrow-2.png" alt="arrow"></span>
                            <span>上一篇 </span>
                          </div>
                          <div class="nav-post">
                            <h3 class="heading-tertiary">{{ preResource.title }}</h3>
                            <span class="date body-text">{{ formatDate(preResource.addTime) }}</span>
                          </div>
                        </div>
                      </router-link>
                      <router-link :to="'/list/' + nextResource.id">
                        <div class="nav-next">
                          <div class="nav-button-right">下一篇 <span><img src="../static/img/long-arrow.png"
                                alt="arrow"></span></div>
                          <div class="nav-post">
                            <h3 class="heading-tertiary">{{ nextResource.title }}</h3>
                            <span class="date body-text">{{ formatDate(nextResource.addTime) }}</span>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="right-content">
                    <!-- Widget search box -->
                    <div class="widget-search-box"><input type="text" v-model="seachcontent" placeholder="输入内容"><button
                        @click="queryssubmit()" class="search-btn"><i class="fas el-icon-search"></i></button></div>
                    <h3 class="heading-tertiary">最新文章</h3>
                    <div>2222</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mobile-model">
              <div class="
                  d-flex
                  layout-min-full-height
                  justify-content-center
                  align-items-center
                ">
                <div class="text-center" style="width: 80%; margin: 0 auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker} from "v-emoji-picker";

import top from './components/Top.vue'
import foot from './components/Foots.vue'
import comment from './components/ResComment.vue'

import { formatDate } from '@/utils/date.js'
import router from "@/router";
export default {

  name: 'Resource',
  components: {
    top,
    foot,
    comment,
    VEmojiPicker,
    router
  },
  methods: {
    //判空
    judgeNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    onSelectEmoji(emoji) {
      this.MyEmoge = emoji.data;
    },
    showemoge() {
      // console.log("show")
      this.showDialog = !this.showDialog;
    },
    // sendMsg() {
    //   this.$refs.child.getMsg('true');
    //   this.mycomment = false;
    // },
    updateDate() {
      //关闭表情
      this.showDialog = false
      // console.log(data.show)
      this.mycomment = true;
      // console.log("调用了父组件的方法")
      // this.show1 = data.show;
      //改变了父组件的值
      // console.log('toCity:'+this.show1)
    },
    formatDate(time) {
      let data = new Date(time)
      return formatDate(data, 'yyyy-MM-dd ')
    },
  },
  data() {
    return {
      preResource: {
        title: "",
        addTime: "",
        id: ""
      },
      nextResource: {
        title: "",
        addTime: "",
        id: "",
      },
      resAddress: '',
      Mytag: [],
      taglist: [],
      seachcontent: '',
      newArticle: [],
      createTime: '',
      addTime: '',
      lovecheck: false,
      firstLoveFlag: true,
      loveNum: "",
      hits: "",
      carouselNum: "",
      commentnum: "",
      MyEmoge: "",
      showDialog: false,
      mycomment: true,
      carousel: [],
      className: "",
      sortClasss: "",
      sortClass: "",
      Theweeks: "",
      weeks: {
        "0": '星期日',
        "1": '星期一',
        "2": '星期二',
        "3": '星期三',
        "4": '星期四',
        "5": '星期五',
        "6": '星期六',
      },

      // payJudej: true,
      // payBtnDisabled: false,
      // orderNo: "",
      // codeUrl: "url",
      // payOrder: { //订单信息
      //   productId: '', //商品id
      //   payType: 'wxpay' //支付方式
      // },
      // PaymentDialogVisibleLogin: false, //支付方式弹窗
      // PaymentDialogVisibleTemp: false, //支付方式弹窗
      // wxDialogVisible: false, //微信支付二维码弹窗
      // aliDialogVisible: false, //支付宝支付二维码弹窗
      // intro: "",
      // content: "",
      // price: "",
      // title: "",
      // acticve: 'nav-link active',
    }
  },
}
</script>

<style scoped src="../static/mycss/blog.css">

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mar-left {
  margin-left: 15px;
}

.post-txt {
  font-size: 15px;
  font-weight: 440;
  color: #27222b;
  margin-top: 0;
  margin-bottom: 1rem;
}

.chat-container {
  z-index: 20 !important;
  border-radius: 10px !important;
  -webkit-box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  box-shadow: 0 5px 25px 0 rgb(0 0 0 / 13%) !important;
  background-color: #fff !important;
  width: 360px !important;
  height: 80% !important;
  left: auto !important;
  right: 20px !important;
  bottom: 20px !important;
}
</style>
  
<style scoped>
.myVEmojiPicker ::v-deep.category {
  background: none;
}

.myVEmojiPicker ::v-deep .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker ::v-deep .myVEmojiPicker[data-v-3bfe90b7] .border {
  border: 0px solid hsla(210, 8%, 51%, 0.09) !important;
}

.myVEmojiPicker ::v-deep .category.active[data-v-6d975e7c] {
  border-bottom: 3px solid #50a1ff;
}

.myVEmojiPicker ::v-deep .grid-emojis[data-v-5c988bee] {
  background: #ffffff;
}

.myVEmojiPicker ::v-deep .emoji-picker[data-v-f1d527bc] {
  --ep-color-bg: #ffffff;
  --ep-color-sbg: none;
}

.myVEmojiPicker {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 390px;
  bottom: 20px;
  z-index: 10;
}

.alipaybig_icon {
  display: inline-block;
  width: 120px;
  margin: 0;
  padding: 0;
  text-align: center;
}

.outh5 {
  padding: 0px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
}

.outh6 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #01a7ef;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}

.outh7 {
  height: 66px;
  text-align: center;
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 320px;
  background-color: #09bb21;
  padding: 7px;
  display: flex;
  align-content: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 0 0 10px 10px;
}
</style>
<style scoped>
.el-dialog--center {
  border-radius: 10px;
}

.el-dialog--center .el-dialog__body {
  border-radius: 10px;
  text-align: initial;
  background-color: #fff;
}

.el-dialog__header {
  display: none;
  background-color: #e0e0e0;
}
</style>
<style scoped>
.pay-button-box {
  padding: 12px 30px;
  z-index: 1;
  text-align: center;
}

.swal2-content {
  z-index: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #545454;
  font-size: 1.125em;
  font-weight: 300;
  line-height: normal;
  text-align: center;
  word-wrap: break-word;
}

.pay-item {
  width: 100%;
  height: 60px;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  display: inline-block;
  line-height: 60px;
  text-align: center;
}

.device-macbook-pro .device-frame:before {
  bottom: 10px;
  color: #c8cacb;
  content: "IceCMS.com";
  font-size: 12px;
  height: 16px;
  left: 50%;
  line-height: 16px;
  margin-left: -100px;
  position: absolute;
  text-align: center;
  width: 200px;
  z-index: 1;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.dianzan {
  min-height: 25px;
  height: 25px;
}

.btn-outline-theme:hover .dianzan {
  min-height: 25px;
  height: 25px;
  position: relative;
  left: -80px;
  filter: drop-shadow(#fff 80px 0);
}

.soft-layouts {
  margin: 0 auto;
  overflow: hidden;
  width: 1170px;
}

.el-carousel__item[data-v-3aa17da5]:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 17px;
  -webkit-animation: move 4s linear infinite both;
  -webkit-border-radius: 17px;
}

.el-carousel__item[data-v-3aa17da5]:nth-child(2n) {
  background-color: #d3dce6;
  border-radius: 17px;
  -webkit-animation: move 4s linear infinite both;
  -webkit-border-radius: 17px;
}

.is-animating {
  border-radius: 17px;
  -webkit-animation: move 4s linear infinite both;
  -webkit-border-radius: 17px;
}

.sc-button.style-item-details {
  width: 240px;
  height: 55px;
  line-height: 55px;
  padding: unset;
  text-align: center;
}

.sc-button.style-2:hover {
  background-position: right center;
}

.sc-button.style-2 {
  background-image: linear-gradient(to left, #6345ED 58.12%, #DC39FC 81.74%);
  border: unset;
  background-size: 200% auto;
}

a:hover,
a:focus {
  color: var(--primary-color3);
  text-decoration: none;
  outline: 0;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.sc-button {
  display: inline-block;
  position: relative;
  padding: 9px 22px;
  border-radius: 100px !important;
  border: 0 none;
  outline: 0 none;
  cursor: pointer;
  z-index: 1;
}

.menu-tab {
  display: flex;
  margin-bottom: 29px;
}

.titleactive {
  background-color: #6345ED;
  color: #fff;
  box-shadow: unset;
}

.menu-tab li {
  border-radius: 104px;
  padding: 8px 21px;
  font-size: 14px;
  font-weight: 700;
  margin-right: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 60px rgba(99, 69, 237, 0.3);
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.author-item {
  display: flex;
  align-items: center;
}

.bid-history-list li {
  margin-bottom: 17px;
}

.infor {
  margin-top: -2px;
  display: flex;
}

.infor p {
  margin: 0 auto;
  width: 300px;

}

.btn-outline-theme {
  margin-left: 17px;
}

.btn-outline-theme {
  margin-left: 17px;
}

.btn-outline-theme:hover {
  color: #fff;
}

.dianzan:hover {
  color: #fff;
}

.fas {
  font-weight: 900;
}

.infor-bid {
  background: var(--color-4);
  box-shadow: 4px 4px 60px rgba(99, 69, 237, 0.15);
  border-radius: 8px;
  padding: 17px 31px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 13px;
  margin-right: 17px;
  margin-bottom: 31px;
}

.value {
  font-size: 15px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0.0015em;
  color: #50A0FF;
}

@media screen and (max-width:991px) {
  .col-lg-3 {
    display: none;
  }

  .post-content {
    width: 617px;
    /* overflow: auto; */
    /* padding: 20px; */
    line-height: 1.5;
    margin-right: 50px;
  }
}

.post-content {
  width: 817px;
  /* overflow: auto; */
  /* padding: 20px; */
  line-height: 1.5;
  margin-right: 50px;
}

.free-value {
  font-size: 20px;
  font-weight: 800;
  /* line-height: 10px; */
  letter-spacing: 0.0015em;
  color: #50A0FF;
}
</style>

