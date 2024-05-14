<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message3="acticve" />
          <div class="app-main">
            <div class="w-full bg grid-list layout-min-full-height d-flex">
              <div class="w-full pc-model">
                <div>
                  <!-- /** */ -->

                  <!-- /** 上方标题 */ -->
                  <div class="d-flex">
                    <div class="flex">
                      <div class="app-content-header mb-5">
                        <div class="main-title">
                          <h5 class="fs-24 fw-600 i-con-h-a">
                            全部文章
                            <span class="text-muted fs-13 v-1 ml-1">
                              {{ this.articleNum }}
                            </span>
                          </h5>
                        </div>
                        <nav class="menu menu--macwk——list article-menu flex">
                          <ul class="menu__list">
                            <li class="menu__item menu__item--current">
                              <a class="menu__link"> 全部文章 </a>
                            </li>
                            <!-- <li class="menu__item">
                              <a class="menu__link"> 新手入门 </a>
                            </li>
                            <li class="menu__item">
                              <a class="menu__link"> 软件教程 </a>
                            </li>
                            <li class="menu__item">
                              <a class="menu__link"> 新闻资讯 </a>
                            </li> -->
                            <li class="menu__line"></li>
                          </ul>
                        </nav>
                        <div>
                          <div
                            role="switch"
                            class="el-switch"
                            style="margin-top: -3px"
                          >
                            <input
                              type="checkbox"
                              name=""
                              true-value="true"
                              class="el-switch__input"
                            />
                            <!---->
                            <div>
                              <el-switch
                                v-model="istargetjudje"
                                @change="istargetJudje()"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                              >
                              </el-switch>
                            </div>
                            <span
                              class="el-switch__label el-switch__label--right"
                            >
                              <!----><span aria-hidden="true">新窗口打开</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="pb-5">
                        共为您找到
                        <span class="text-danger mx-1">
                          {{ this.articleCount }}</span>条和
                        <span
                          class="mx-2 el-tag el-tag--danger el-tag--small el-tag--light"
                          ><span class="text-danger fw-500 fs-18">
                            {{ this.$route.params.content }}</span
                          ><i class="el-tag__close el-icon-close"></i
                        ></span>
                        相关的文章
                      </div>
                      <!-- 搜索全部文章的条目 -->
                      <div v-for="(item, id) in list" :key="id">
                        <div v-if="true">
                          <router-link
                            :target="istarget"
                            :to="'/post/' + item.id"
                          >
                            <!---->
                            <a
                              target="_self"
                              class="post-item white delay-0 list-animation-leftIn"
                            >
                              <img
                                v-if="item.cover != null"
                                class="post-item__preview delay-0"
                                lazy="loading"
                                :src="item.cover"
                              />
                              <div
                                v-else
                                class="post-item__preview align-items-center d-flex delay-5"
                                :style="getStyles()"
                              >
                                <h3
                                  class="flex text-center text-white opacity-50"
                                >
                                  {{ item.id }}
                                </h3>
                              </div>
                              <div class="post-item__content">
                                <h3>{{ item.title }}</h3>
                                <div class="post-meta">
                                  <div class="category category--learn">
                                    {{item.type == 1 ? "知识": "政策" }}
                                  </div>
                                  <!-- <div class="post-meta__avatars">
                                    <img :src="item.profile" class="avatar" />
                                  </div> -->
                                  <div class="post-meta__info fw-600">
                                    <span> 作者：{{ item.author }} </span>
                                    <span>•</span>

                                    <span
                                      v-if="item.createTime != null"
                                      v-text="formatDate(item.created)"
                                    >
                                    </span>
                                    <span
                                      v-else
                                      v-text="formatDate(item.updated)"
                                    >
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <!-- 每一列的右边 -->
                                <!-- <div class="CS CS--lg">
                                  <button class="comment">
                                    <i class="icon-bubble"></i>
                                  </button>
                                  <p class="CS-count">233</p>
                                  <button class="share">
                                    <i class="icon-share"></i>
                                  </button>
                                </div> -->
                              </div>
                            </a>
                          </router-link>
                        </div>
                      </div>
                      <!-- 这是一个自定义的分页组件  -->
                      <pagination
                        class="app-content-bottom"
                        v-show="total > 0"
                        :background="false"
                        :total="total"
                        :page.sync="listQuery.page"
                        :limit.sync="listQuery.limit"
                        @pagination="getList"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="app-content mobile-model">
                <div
                  class="d-flex layout-min-full-height justify-content-center align-items-center"
                >
                  <div class="text-center" style="width: 80%; margin: 0 auto">
                    <h1 class="mb-4">哇，窗口太小啦</h1>
                    <p class="mb-6">请调整浏览器窗口大小或者请使用手机查看！</p>
                  </div>
                </div>
              </div>
              <!-- 侧边导航栏（包括QQ, 微信，与回到最上方） -->
              <!-- <div
                id="sidetools"
                class="macwk-animation tinUpIn"
                
              >
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="cursor"
                      ><span class="sidetools-icon kfwx"></span
                    ></a>
                  </div>
                </div>
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="cursor"
                      ><span class="sidetools-icon kfqq"></span
                    ></a>
                  </div>
                </div>
                <div class="sidetools-item">
                  <div class="sidetools-wrapper">
                    <a class="el-tooltip cursor"
                      ><span class="sidetools-icon back-top"></span
                    ></a>
                  </div>
                </div>
                <span>
                  <div
                    role="tooltip"
                    id="el-popover-3962"
                    aria-hidden="true"
                    class="el-popover el-popper"
                    style="width: 200px; display: none"
                  >
                   
                    <div class="text-center">
                      <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                    </div>
                  </div>
                  <span class="el-popover__reference-wrapper"></span>
                </span>
                <span>
                  <div
                    role="tooltip"
                    id="el-popover-1793"
                    aria-hidden="true"
                    class="el-popover el-popper"
                    style="width: 200px; display: none"
                  >
                    
                    <div class="text-center">
                      <a href="feedback.html" class="mt-15 mb-0">在线留言</a>
                    </div>
                  </div>
                  <span class="el-popover__reference-wrapper"></span>
                </span>
              </div> -->
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
import Pagination from "@/components/Pagination"; 
import { formatDate } from "@/utils/date.js";

import top from "./components/Top.vue";
import foot from "./components/Foots.vue";
import { mocklist } from "./mockList";
import { getArticleList } from '@/apis/article'

export default {
  name: "ArticleList",
  components: { Pagination, top, foot },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      articleNum: 0,
      acticve: "nav-link active",
      articleCount: "",
      istarget: "_self",
      istargetjudje: !true,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        content: "",
        page: 1,
        limit: 5,
      },
    };
  },
  watch: {
    // $route(to, from) {
    //   //监听路由是否变化
    //   if (this.$route.params.content) {
    //     this.getList(this.$route.params.content);
    //     // 判断条件1  判断传递值的变化
    //     //获取文章数据
    //   }
    // },
  },
  created() {
    this.getList(this.$route.params.content);
    // console.log('con',this.$route.params);
  },

  methods: {
    istargetJudje() {
      if (!this.istargetjudje) {
        this.istarget = "_self";
      } else {
        this.istarget = "_blank";
      }
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
      return formatDate(time);
    },
    async getList(content) {
      this.listLoading = true;
      const { records , total, pages, publishedArticle } = await getArticleList(this.listQuery.page,this.listQuery.limit,content,1);
      this.list = records;
      this.total = pages;
      this.articleCount = total;
      this.listLoading = false;
      this.articleNum = publishedArticle; // 全部文章个数
    },
  },
};
</script>
<style scoped>
/* 去掉中间数据的分割线 */
.el-table__row > td {
  border: none;
}
/* 去掉上面的线 */
.el-table th.is-leaf {
  border: none;
}
/* 去掉最下面的那一条线 */
.el-table::before {
  height: 0px;
}
/* 去掉页数选择 */
.el-select el-select--mini {
  visibility: hidden;
}
.el-pagination__total {
  visibility: hidden;
}
/* 圆角 */
.pagination-container {
  border-radius: 20px;
}
</style>
