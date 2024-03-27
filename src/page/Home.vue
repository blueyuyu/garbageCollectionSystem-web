<template>
  <div class="home">
    <div id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve" />
          <div>
            <section class="layout-index pc-model">
              <div class="outsection">
                <!-- 视频区 -->
                <div class="video_overlay"></div>
                <video
                  id="video"
                  poster="../static/images/background-img.jpg"
                  src="../static/video/sorting.mp4"
                  autoplay="autoplay"
                  loop
                  muted
                  style="width: 70%"
                ></video>
              </div>
              <div class="sectionText">
                <div class="vedio_header">
                  垃圾分类<span class="strong">刻不容缓</span>
                </div>
                <div class="vedio_text">
                  在这里，我们将分享给你详细的垃圾分类教程，与最新咨询。每一个垃圾都有它自己的归宿，让我们为环保做一份贡献
                </div>
                <el-button
                  ref="playVideo"
                  type="primary"
                  style="margin-top: 40px"
                  @click="watchVideo"
                  >观看学习视频</el-button
                >
              </div>
              <!-- class="container"  垃圾四大类型 -->
              <div class="container">
                <div data-v-0a1f67c4="" class="index-special row mb-6">
                  <div data-v-0a1f67c4="" class="col-3">
                    <router-link
                      :to="{ path: '/content', query: { id: 're-garbage' } }"
                      data-v-0a1f67c4=""
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="macwk-card bg-gradient-green hover-shadow-6 py-3 text-center"
                        style="
                          will-change: transform;
                          transform: perspective(1000px) rotateX(0deg)
                            rotateY(0deg) scale3d(1, 1, 1);
                        "
                      >
                        <div
                          class="macwk-card__collapsible-content vs-con-loading__container"
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-office fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">可回收垃圾</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <router-link
                      :to="{ path: '/content', query: { id: 'harm-garbage' } }"
                      data-v-0a1f67c4=""
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="macwk-card bg-gradient-danger hover-shadow-6 py-3 text-center"
                      >
                        <div
                          class="macwk-card__collapsible-content vs-con-loading__container"
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-cp fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">有害垃圾</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <router-link
                      :to="{ path: '/content', query: { id: 'wet-garbage' } }"
                      data-v-0a1f67c4=""
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="macwk-card bg-gradient-warning hover-shadow-6 py-3 text-center"
                      >
                        <div
                          class="macwk-card__collapsible-content vs-con-loading__container"
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-cp fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">湿垃圾</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                  <div data-v-0a1f67c4="" class="col-3">
                    <router-link
                      :to="{ path: '/content', query: { id: 'dry-garbage' } }"
                      data-v-0a1f67c4=""
                      class=""
                    >
                      <div
                        data-v-0a1f67c4=""
                        class="macwk-card bg-gradient-info hover-shadow-6 py-3 text-center"
                      >
                        <div
                          class="macwk-card__collapsible-content vs-con-loading__container"
                        >
                          <div class="macwk-card__body">
                            <h6 data-v-0a1f67c4="" class="mb-0 text-white">
                              <i
                                data-v-0a1f67c4=""
                                class="icon-code fs-22 mr-3 v-m-3"
                              ></i>
                              <span data-v-0a1f67c4="">干垃圾</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 介绍信息区 -->
              <div class="container mb-5">
                <div class="d-flex app-content-header mb-6">
                  <div class="main-title">
                    <h4 class="i-con-h-a mb-0">
                      <i class="mr-1 text-muted i-con i-con-calendar v-m-4"
                        ><i></i
                      ></i>
                      <a id="garbageClassify"><span>垃圾分类：1-2-3</span></a>
                    </h4>
                  </div>
                  <div></div>
                </div>
                <div>
                  <el-row class="garbage-tips" :gutter="20">
                    <el-col :span="8">
                      <div
                        class="tips"
                        :class="{ tips_active: tips.isTipsOne }"
                        @click="changeTips(1)"
                      >
                        <div class="tips_num">1</div>
                        <div class="tips_dis">
                          <h3 class="tips_title">知道什么是可以回收的</h3>
                          <div
                            class="tips_content"
                            :class="{ title_active: tips.isTipsOne }"
                          >
                            纸板、纸张、金属罐、塑料瓶、罐子
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div
                        class="tips"
                        :class="{ tips_active: tips.isTipsTwo }"
                        @click="changeTips(2)"
                      >
                        <div class="tips_num">2</div>
                        <div class="tips_dis">
                          <h3 class="tips_title">保持回收物品的干净与干燥</h3>
                          <div
                            class="tips_content"
                            :class="{ title_active: tips.isTipsTwo }"
                          >
                            确保所有回收物品中不含食物和液体
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div
                        class="tips"
                        :class="{ tips_active: tips.isTipsThree }"
                        @click="changeTips(3)"
                      >
                        <div class="tips_num">3</div>
                        <div class="tips_dis">
                          <h3 class="tips_title">请勿装袋处理</h3>
                          <div
                            class="tips_content"
                            :class="{ title_active: tips.isTipsThree }"
                          >
                            请勿将回收物品放入容器或袋子中
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="garbage-tips-dis" v-show="tips.isTipsOne">
                    <div class="dis_img img_margin">
                      <img
                        src="../static/image/home/rules-loose-recyclables.webp"
                        alt="纸板回收的图片"
                        srcset=""
                      />
                    </div>
                    <div class="dis_content">
                      <div class="content_header tips_title">纸和纸板子</div>
                      <p>压平的纸板、报纸、杂志、办公用纸和普通邮件</p>
                      <div class="content_header tips_title">金属罐</div>
                      <p>饮料和食品罐头</p>
                      <div class="content_header tips_title">塑料瓶和水壶</div>
                      <p>盖上盖子的食品和液体容器</p>
                    </div>
                  </div>
                  <div class="garbage-tips-dis" v-show="tips.isTipsTwo">
                    <div class="dis_img">
                      <img
                        src="../static/image/home/rules-clean-items.webp"
                        alt="东西清理干净的图片"
                        srcset=""
                      />
                    </div>
                    <div class="dis_content">
                      <div class="content_header tips_title">
                        没有弄脏或潮湿的材料
                      </div>
                      <p>
                        仅仅一个脏瓶子或脏东西就可能污染整个回收容器内的回收物品。因为纸板或者纸张接触到污染物，将会无法再回收利用。
                      </p>
                    </div>
                  </div>
                  <div class="garbage-tips-dis" v-show="tips.isTipsThree">
                    <div class="dis_img">
                      <img
                        src="../static/image/home/rules-bagged-recyclables.webp"
                        alt="物品装袋处理的图片"
                        srcset=""
                      />
                    </div>
                    <div class="dis_content">
                      <div class="content_header tips_title">不要装袋处理</div>
                      <p>
                        请勿将一整袋物品放入回收容器中，也请不要将回收物品放入袋中或者用容器包裹。所有回收物单个放入
                      </p>
                      <div class="content_header tips_title">
                        不存在混合材料
                      </div>
                      <p>
                        请注意，当需要回收物品中存在多种混合材料。回收者们应该把这些材料拆开，分别回收处理
                      </p>
                    </div>
                  </div>
                </div>
                <!-- TODO 位置布局有一些问题 -->
              </div>
              <div class="white dk py-7">
                <div class="container">
                  <div class="d-flex app-content-header mb-6">
                    <div class="main-title">
                      <h4 class="i-con-h-a mb-0">
                        <i class="mr-1 text-muted i-con i-con-layer v-m-4"
                          ><i></i
                        ></i>
                        <a id="regulations"><span>条例处罚问题</span></a>
                      </h4>
                    </div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          如生活垃圾分类投放管理责任人违反本条例第十九条第一款第六项规定，将已分类的生活垃圾交由不符合要求的单位收集、运输的，应当如何处罚?
                        </div>
                        <div class="problem_content">
                          环境卫生主管部门处以二千元以上二万元以下罚款。
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          如违反本条例第二十一条第一款规定，未按照规定分类投放生活垃圾的，由环境卫生主管部门批评教育、责令改正;拒不改正的，应当如何处罚?
                        </div>
                        <div class="problem_content">
                          对单位处以五千元以上五万元以下罚款、对个人处以五十元以上二百元以下罚款。
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          如违反本条例第二十一条第五款规定，将建筑装修垃圾、绿化
                          作业垃圾投放至生活垃圾收集容器内的，应当如何处罚?
                        </div>
                        <div class="problem_content">
                          由环境卫生主管部门对单位处以五百元以上五千元以下罚款、对个人处以二百元以上一千元以下罚款。
                        </div>
                      </div>
                    </el-col>
                    <!-- 第三个元素的过度有一些问题 -->
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          如生活垃圾分类投放管理责任人违反本条例第十八条第一款规定，未按照生活垃圾分类收集容器的类别、标识、规格要求合理配置生活垃圾分类收集容器的，应当如何处罚?
                        </div>
                        <div class="problem_content">
                          由环境卫生主管部
                          门责令改正;拒不改正的，处以一千元以上一万元以下罚款。
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          有害垃圾应按照规定如何分类处置?
                        </div>
                        <div class="problem_content">
                          有害垃圾应当由具有相应处置资质的单位按照规定进行处置。
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                      <div class="garbage-problem">
                        <div class="problem_header tips_title">
                          生活垃圾收集、运输单位违反本条例第二十四条规定，有下列情形之一的，(一)未保持运输工具功能完好、标识明显、外观整洁的;(二)未及时将生活垃圾运送至集中收集设施或者符合规定
                          的中转、处置场所的;(三)未建立台账，记录生活垃圾来源、种类、数量、去向的,应当如何处罚?
                        </div>
                        <div class="problem_content">
                          由环境卫生主管部门处以五千元以上三万元以下罚款。
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <!-- 处罚通讯录 -->
              <div class="white dk py-7">
                <div class="container">
                  <div class="d-flex app-content-header mb-6">
                    <div class="main-title">
                      <h4 class="i-con-h-a mb-0">
                        <i class="mr-1 text-muted i-con i-con-layer v-m-4"
                          ><i></i
                        ></i>
                        <a id="units"><span>垃圾分类示范单位</span></a>
                      </h4>
                    </div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <h5 class="tips_title">生活垃圾分类示范社区</h5>
                      <p>石鼓区青山街道西湖一村社区、蒸湘区红湘街道冶金社区</p>
                    </el-col>
                    <el-col :span="12">
                      <h5 class="tips_title">生活垃圾分类示范机关单位</h5>
                      <p>
                        衡阳市机关事务管理局、衡阳市城市管理和综合执法局、衡阳市司法局、衡阳市商务局
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </section>
            <div class="mobile-model">
              <div
                class="d-flex layout-min-full-height justify-content-center align-items-center"
              >
                <div class="text-center" style="width: 80%; margin: 0px auto">
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
    <el-dialog :visible.sync="dialogPlay" width="40%" @close="closeDialog">
      <video
        :src="videoUrl"
        controls
        autoplay
        class="video"
        ref="dialogVideo"
        width="100%"
      ></video>
    </el-dialog>
  </div>
</template>

<script>
import { getNewResource } from "@/api/webresource";
import { getNewArticle } from "@/api/webarticle";
import { formatDate } from "@/utils/date.js";
import { getCarousel } from "@/api/websetting";

import top from "./components/Top.vue";
import foot from "./components/Foots.vue";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: { top, foot },
  computed: {
    ...mapState(["playlist", "glabledata", "count"]),
  },
  data() {
    return {
      dialogPlay: false,
      videoUrl: "",
      playVideo: "", // 点击按钮实例
      isAcitive: false,
      tips: {
        isTipsOne: true,
        isTipsTwo: false,
        isTipsThree: false,
      },
      r_sortOrder: "new",
      r_news: "new",
      r_download: "download",
      r_discuss: "discuss",
      r_recommend: "recommend",
      a_sortOrder: "new",
      a_news: "new",
      a_download: "download",
      a_discuss: "discuss",
      a_recommend: "recommend",
      rlist: "",
      acticve: "nav-link active",
      Carousel: {},
      list: null,
      leftArr: null,
      rightArr: null,
    };
  },
  created() {
    this.getList();
    this.getSetting();
  },
  mounted() {},
  updated() {},
  props: {
    dataHeight: {
      type: String,
      default: "450px",
    },
  },
  methods: {
    //TODO video 这里的链接地址，选择挂载吧
    watchVideo() {
      this.$nextTick(() => {
        // 给视频的src赋值操作
        this.videoUrl =
          "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm";
        // 如何获取b站这个url地址，或者换一种，把静态资源挂载在服务器上
      });
      this.dialogPlay = true;
    },
    closeDialog() {
      this.videoUrl = "";
    },
    //  传入一个data,checked为需要置换为false的属性的键名
    singleChoose(data, checked) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (key == checked) {
            data[key] = true;
          } else {
            data[key] = false;
          }
        }
      }
      return data;
    },
    changeTips(num) {
      if (num == 1) {
        this.tips = this.singleChoose(this.tips, "isTipsOne");
      } else if (num == 2) {
        this.tips = this.singleChoose(this.tips, "isTipsTwo");
      } else if (num == 3) {
        this.tips = this.singleChoose(this.tips, "isTipsThree");
      }
    },
    a_changeDiscuss() {
      this.a_sortOrder = "discuss";
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
      });
      this.listLoading = false;
    },
    a_changeRecommend() {
      this.a_sortOrder = "recommend";
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
      });
      this.listLoading = false;
    },
    a_changeNews() {
      this.a_sortOrder = "new";
      this.listLoading = true;
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
      });
      this.listLoading = false;
    },
    // 鼠标移入赋值index
    dowmloadover(index) {
      this.isAcitive = index;
    },
    // 鼠标移出
    downloadleave(index) {
      this.isAcitive = false;
    },
    r_changeRecommend() {
      this.r_sortOrder = "recommend";
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeNews() {
      this.r_sortOrder = "new";
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeDiscuss() {
      this.r_sortOrder = "discuss";
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    r_changeDownload() {
      this.r_sortOrder = "download";
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      this.listLoading = false;
    },
    getStyles() {
      //生成随机颜色
      let max = 8;
      let min = 1;

      let x = Math.floor(Math.random() * (max - min + 1)) + min;

      const backcolor = "randomColor" + x;

      if (backcolor == "randomColor1") {
        return "background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);";
      }
      if (backcolor == "randomColor2") {
        return "background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);";
      }
      if (backcolor == "randomColor3") {
        return "background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);";
      }
      if (backcolor == "randomColor4") {
        return "background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);";
      }
      if (backcolor == "randomColor5") {
        return "background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);";
      }
      if (backcolor == "randomColor6") {
        return "background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);";
      }
      if (backcolor == "randomColor7") {
        return "background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);";
      }
      if (backcolor == "randomColor8") {
        return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);";
      }
      return "background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);";
    },
    formatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm ");
    },
    rformatDate(time) {
      let data = new Date(time);
      return formatDate(data, "yyyy-MM-dd ");
    },
    getSetting() {
      getCarousel().then((resp) => {
        this.Carousel = resp.data;
      });
    },
    getList() {
      this.listLoading = true;
      getNewResource(10, this.r_sortOrder).then((resp) => {
        this.rlist = resp.data;
      });
      getNewArticle(6, this.a_sortOrder).then((resp) => {
        this.list = resp.data;
        this.total = resp.data.total;
        this.listLoading = false;
        //将array进行处理,他的index索引余2===0的就放到一个新数组中leftArr
        this.leftArr = this.list.filter((_item, index) => index % 2 === 0);
        //将array进行处理,他的index索引余2 ！===0的就放到一个新数组中rightArr
        this.rightArr = this.list.filter((_item, index) => index % 2 !== 0);
      });
    },
  },
};
</script>

<style scoped>
.delayImg {
  height: 100px;
  width: 145px;
  border-radius: 8px;
}

.delayImgss {
  height: 128px;
  width: 100%;
  border-radius: 8px;
}
</style>

<style scoped>
/* title的样式 */
.tips_title {
  color: #00497e;
  font-weight: 300;
  font-size: 20px;
}

.outsection {
  position: relative;
}

.video_overlay::before {
  content: "";
  display: block;
  background: hsla(0, 2%, 8%, 0.4);
}

.video_overlay,
.video_overlay::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.sectionText {
  position: absolute;
  top: 40%;
  left: 20%;
  width: 30%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.sectionText .vedio_header {
  font-size: 40px;
  letter-spacing: 6px;
}

.strong {
  margin: 0 10px;
  font-size: 50px;
  color: #2f86e3;
}

/* TODO css 垃圾样式区域 */
.tips {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px 10px;
  position: relative;
  border-radius: 10px;
}

.tips_active {
  background-color: #c8e0f3;
}

.title_active::after {
  content: "";
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #c8e0f3;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-20px);
}

.garbage-tips .tips_num {
  color: #2f86e3;
  font-size: 34px;
  padding: 0 25px 25px 25px;
  text-align: left;
}

.garbage-tips .tips_dis {
  margin-left: 30px;
}

.garbage-tips-dis {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.garbage-tips-dis .dis_img {
  margin: 20px;
}

.garbage-tips-dis .img_margin {
  margin: 0 60px;
}

.content_header {
  font-size: 18px;
}

.dis_content {
  padding: 0 15px;
}
/* 垃圾问题 */
.garbage-problem {
  padding: 20px;
  border-radius: 8px;
  background-color: #f8fafc;
}

.problem_header {
  font-size: 16px;
  margin-bottom: 10px;
}
/* 电脑屏幕与显示大屏条例布局 */
@media only screen and (min-width: 992px) {
  .garbage-problem {
    height: 36vh !important;
  }
}

@media only screen and (min-width: 1200px) {
  .el-col-lg-8 {
    width: 33%;
  }
  .garbage-problem {
    height: 24vh;
  }
}

.el-col {
  margin-bottom: 20px;
}

.white1 {
  background-color: rgb(255, 255, 255);
  z-index: -1;
}

.index1 {
  z-index: 555;
}

.index {
  z-index: -1;
}

.outsection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Thecarousel {
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  width: 1435px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="scss" scoped>
.delayImg {
  ::v-deep {
    .el-image__inner {
      border-radius: 8px;
    }
  }
}

.delayImgss {
  ::v-deep {
    .el-image__inner {
      border-radius: 8px;
    }
  }
}

.delay-3 {
  ::v-deep {
    .el-image__inner {
      width: 224px;
      height: 128px;
      border-radius: 8px 8px 0px 0px;
    }
  }
}

.delayImgs {
  width: 224px;
  height: 128px;
  border-radius: 8px 8px 0px 0px;
}

.h-150 {
  margin-top: -20px;
  margin-bottom: -55px;
  height: 150px !important;
}

.backimg {
  background-image: url("../static/image/home/homeimg.png");
}

.search-header {
  position: relative;
  z-index: 1;
  padding: 100px 0;
}

.search-header::after {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  height: 100%;
  background: rgba(0, 0, 0, 0)
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%)
    repeat scroll 0 0;
  width: 100%;
  z-index: -1;
}

.containers {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
}

.containers {
  width: 1170px;
  padding: 0;
  // width: 100%;
  //     padding-right: 15px;
  //     padding-left: 15px;
  //     margin-right: auto;
  //     margin-left: auto;
}

.bg-fixed {
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
}

.text-center {
  text-align: center;
}

.index-special {
  margin-top: 35px;
}

.search-header .hero-box h2 {
  font-size: 44px;
  font-weight: 600;
  line-height: 1.3;
  margin-top: -8px;
  margin-bottom: 25px;
  letter-spacing: 0.6px;
}

.text-light h2 {
  color: #ffffff;
}

.col-md-offset-2 {
  margin-left: 16.66666667%;
}

.col-md-8 {
  width: 66.66666667%;
}

.col-md-8 {
  float: left;
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.hero-box ul {
  margin-bottom: -5px;
}

.hero-box ul li {
  color: #ffffff;
  display: inline-block;
  text-transform: capitalize;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.6px;
  margin: 0 7px;
  padding: 0 7px;
  position: relative;
  z-index: 1;
}

// .hero-box ul li::before {
// position: absolute;
// right: -12px;
// top: 12px;
// content: "";
// height: 7px;
// width: 7px;
// background: #ffffff;
// -webkit-border-radius: 50%;
// -moz-border-radius: 50%;
// border-radius: 50%;
// }
.search-box {
  position: relative;
  z-index: 1;
  padding-top: 25px;
  margin-top: 20px;
}

.search-box::after {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  z-index: -1;
}

.search-box form {
  position: relative;
  z-index: 1;
  max-width: 70%;
  margin: auto;
}

.search-box form input {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 60px;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.search-box form button {
  position: absolute;
  right: 5px;
  top: 5px;
  min-height: 50px;
  min-width: 50px;
  background: #0078ff;
  border: none;
  color: #ffffff;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.fas {
  font-weight: 900;
}

.heading-tertiary-list {
  font-size: 15px;
  line-height: 23px;
  font-weight: 670;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-meta {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 1px;
  margin-bottom: 3px;
}

.post-author {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.meta-item {
  margin-right: 18px;
  position: relative;
  font-size: 14px;
}

.author-name {
  font-size: 12px;
  font-weight: 600;
  font-family: "Advent Pro", sans-serif;
  color: #222;
}

.value {
  font-size: 15px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0.0015em;
  color: #50a0ff;
}

.button {
  display: flex;
  font-size: 16px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}

.meta-item:not(:last-child)::after {
  content: "";
  width: 5px;
  height: 5px;
  background-color: #177ef7;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.delay-3 {
  ::v-deep {
    .el-image__inner {
      border-radius: 8px 8px 0px 0px;
    }
  }
}

.app-content-main .app-content-bottom {
  border-radius: 15px;
}

.macwk-app__body {
  padding: 13px 9px 5px;
}
</style>
<style  scoped>
.gaosiImg {
  filter: blur(20px) opacity(70%) brightness(110%);
  transition: 0.3s;
  z-index: 8;
}

.dingweiImg,
.recommendDingweiImg {
  position: absolute;
  top: 15px !important;
  left: 20px !important;
}

.img72,
.imgQueXing3 {
  width: 72px;
  height: 72px;
}

.margin-top-90 {
  margin-top: 90px;
}

.text-block {
  color: #3c4248;
}

.text-bold {
  font-weight: 700;
}

.size-18 {
  font-size: 18px;
}

.margin-top {
  margin-top: 10px;
}

.cursor {
  cursor: pointer;
}

.padding-xl {
  padding: 20px;
}

.text-B6BABF {
  color: #b6babf;
}

.size-14 {
  font-size: 14px;
}

.margin-top {
  margin-top: 10px;
}

.limitText {
  max-width: 180px;
  height: 20px;
  overflow: hidden;
}

.flex-row {
  display: flex;
  flex-direction: row !important;
}

.size-12 {
  font-size: 12px;
}

.margin-top2 {
  margin-top: 20px;
}
</style>