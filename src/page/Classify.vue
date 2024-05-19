<template>
  <div class="Resource">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message4="acticve" />
          <div class="overflow-hidden pt-5">
            <div class="layout-header pt-5 pb-5 position-relative pc-model">
              <!-- ../static/image/loding.gif -->
              <div>
                <img
                  src="../static/image/shape-1.svg"
                  class="shape-three"
                /><img
                  src="../static/image/shape-55.svg"
                  class="shape-four"
                /><img
                  src="../static/image/shape-56.svg"
                  class="shape-five"
                /><img
                  src="../static/image/shape-57.svg"
                  class="shape-six"
                /><img
                  src="../static/image/shape-58.svg"
                  class="shape-seven"
                /><img
                  src="../static/image/shape-59.svg"
                  class="shape-eight"
                /><img
                  src="../static/image/shape-60.svg"
                  class="shape-nine"
                /><img
                  src="../static/image/shape-61.svg"
                  class="shape-ten"
                /><img
                  src="../static/image/shape-62.svg"
                  class="shape-eleven"
                /><img
                  src="../static/image/shape-10.svg"
                  class="shape-10"
                /><img src="../static/image/shape-11.svg" class="shape-11" />
              </div>
              <div class="container">
                <div
                  class="macwk-privacy soft-layout white bg my-6 py-5"
                  style="padding: 40px"
                >
                  <div class="garbage-padding">
                    <div class="garbage-banner" style="display: flex">
                      <img
                        src="../static/images/recycleMaterial.webp"
                        alt=""
                        style="width: 10vw; height: 100%"
                      />
                      <div class="banner-right" style="padding-left: 30px">
                        <h3 class="banner-title">可回收垃圾</h3>
                        <div>
                          可回收垃圾是指那些能够通过再加工和处理，转化为新产品或原材料的废弃物。这类垃圾通常包括可以重新利用的材料，有助于减少资源浪费。
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 30px">
                      <pre>
      处理方法：进行分类收集后送往回收站或回收中心进行再利用。
      分类收集：
      社区通常设置可回收垃圾收集点，居民需要将废纸、废塑料等可回收物品投放到指定的回收容器中。
      再加工：
      可回收垃圾被送往回收中心进行再加工和处理。例如，废纸可能被制成新的纸张，废塑料可以再次加工成塑料制品。
      资源回收：
      可回收垃圾的处理过程中，可以将其中的有价值材料进行提取和回收，以减少对原始资源的需求。
                  </pre
                      >
                    </div>
                  </div>
                  <div class="garbage-padding">
                    <div class="garbage-banner" style="display: flex">
                      <img
                        src="../static/images/hazardousWaste.webp"
                        alt=""
                        style="width: 10vw; height: 100%"
                      />
                      <div class="banner-right" style="padding-left: 30px">
                        <h3 class="banner-title">有害垃圾</h3>
                        <div>
                          有害垃圾是指含有对人类健康和环境有害的物质的废弃物。这些物质可能对生态系统造成危害，也可能对人体健康产生负面影响。
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 30px">
                      <pre>
      处理方法：专门收集并交由有资质的处理中心进行安全处理，以防止对环境人体造成伤害。
      专门收集： 有害垃圾需要专门的收集和处理，通常在社区设有有害垃圾收集点，人们可以将有害垃圾投放到这些专门的容器中。
      专业处理： 有害垃圾被送往专业的处理中心，进行安全的处理，防止有害物质对环境和人体造成伤害。这可能包括化学处理、物理处理或高温处理等方法。
      资源回收： 在有害垃圾中的一些成分，如废弃电池中的金属，可以进行资源回收，减少资源浪费。
                  </pre
                      >
                    </div>
                  </div>
                  <div class="garbage-padding">
                    <div class="garbage-banner" style="display: flex">
                      <img
                        src="../static/images/dryRefuse.webp"
                        alt=""
                        style="width: 10vw; height: 100%"
                      />
                      <div class="banner-right" style="padding-left: 30px">
                        <h3 class="banner-title">干垃圾</h3>
                        <div>
                          干垃圾是指生活中产生的普通垃圾，主要是一些无法再次回收或进行有机处理的废弃物。这类垃圾通常不包含有害物质，是一般日常生活中产生的非可回收物品。
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 30px">
                      <pre>
      处理方法：进行焚烧、填埋或机械处理，具体方式取决于当地的垃圾处理设施。
      焚烧： 有些地区选择采用焚烧技术处理干垃圾，通过高温将垃圾燃烧，减少体积，同时产生能量用于发电或供热。
      填埋： 干垃圾也可以通过填埋方式处理，将垃圾掩埋于垃圾填埋场。然而，填埋可能会导致环境问题，如土壤和水源的污染。
      机械处理： 一些现代化的垃圾处理设施采用机械分拣技术，将干垃圾与其他垃圾分开，以提高资源回收率。
                  </pre
                      >
                    </div>
                  </div>
                  <div class="garbage-padding">
                    <div class="garbage-banner" style="display: flex">
                      <img
                        src="../static/images/wetGarbage.webp"
                        alt=""
                        style="width: 10vw; height: 100%"
                      />
                      <div class="banner-right" style="padding-left: 30px">
                        <h3 class="banner-title">湿垃圾</h3>
                        <div>
                          湿垃圾是指富含水分、易腐烂的生活垃圾，主要包括厨余垃圾、食物残渣等，是生活中产生的有机废弃物。
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 30px">
                      <pre>
        处理方法：进行生物处理，如堆肥或生物气化，将其转化为有机肥料或沼气。
        堆肥： 湿垃圾常常被用于堆肥，通过自然分解的过程，将其转化为有机肥料。堆肥可以应用于农业，促进土壤肥力的提高。
        生物气化： 湿垃圾也可以通过生物气化技术转化为沼气或生物天然气，作为可再生能源使用。
        生物处理： 有些地区采用生物处理设备，通过微生物的作用将湿垃圾降解成有机肥料。
                  </pre
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="soft-layouts bg mb-8 pc-model">
            </div>
            <div class="mobile-model">
              <div
                class="d-flex layout-min-full-height justify-content-center align-items-center"
              >
                <div class="text-center" style="width: 80%; margin: 0 auto">
                  <h1 class="mb-4">哇，窗口太小啦</h1>
                  <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                </div>
              </div>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div
              class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "./components/Top.vue";
import foot from "./components/Foots.vue";

import { formatDate } from "@/utils/date.js";
import router from "@/router";
export default {
  name: "Classify",
  components: {
    top,
    foot,
    router,
  },
  methods: {
    //判空
    judgeNull(str) {
      if (str == "") return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd ");
    },
  },
  data() {
    return {
      acticve: 'nav-link active',
    };
  },
};
</script>

<style scoped src="../static/mycss/blog.css">
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.garbage-padding {
  padding-bottom: 60px;
}

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
  background-image: linear-gradient(to left, #6345ed 58.12%, #dc39fc 81.74%);
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
  background-color: #6345ed;
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
  color: #50a0ff;
}

@media screen and (max-width: 991px) {
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
  color: #50a0ff;
}
</style>

