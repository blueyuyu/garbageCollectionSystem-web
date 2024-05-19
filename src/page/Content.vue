<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve"></top>
          <div class="macwk-privacy soft-layout white bg my-6 py-5" style="padding: 40px;">
            <h3 class="search-title banner-title" v-show="isShow">{{ garbarge }}</h3>
            <div v-show="type == 1">
              <div class="garbage-banner" style="display: flex">
                <img src="../static/images/recycleMaterial.webp" alt="" style="width: 10vw; height: 100%" />
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
                  </pre>
              </div>
            </div>
            <div v-show="type == 2">
              <div class="garbage-banner" style="display: flex">
                <img src="../static/images/hazardousWaste.webp" alt="" style="width: 10vw; height: 100%" />
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
                  </pre>
              </div>
            </div>
            <div v-show="type == 8">
              <div class="garbage-banner" style="display: flex">
                <img src="../static/images/dryRefuse.webp" alt="" style="width: 10vw; height: 100%" />
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
                  </pre>
              </div>
            </div>
            <div v-show="type == 4">
              <div class="garbage-banner" style="display: flex">
                <img src="../static/images/wetGarbage.webp" alt="" style="width: 10vw; height: 100%" />
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
                  </pre>
              </div>
            </div>
            <div v-show="type == 16">
              <div class="garbage-banner" style="display: flex">
                <img src="../static/images/wetGarbage.webp" alt="" style="width: 10vw; height: 100%" />
                <div class="banner-right" style="padding-left: 30px">
                  <h3 class="banner-title">大件垃圾</h3>
                  <div>
                    体积较大、重量较重的废弃物品，包括但不限于家具、电器、大型电子设备、废旧家居用品等。这些物品由于尺寸大、重量重，无法被普通的生活垃圾桶容纳，因此需要特殊的处理方式。
                  </div>
                </div>
              </div>
              <div style="margin-top: 30px">
                <pre>
      处理方法：由相关部门组织定期进行收运，送往指定的处理场所进行拆解、回收或安全处理。
      收运服务：大部分地区都提供大件垃圾的定期或预约收运服务。相关部门会安排专门的车辆负责搬运和收集大件垃圾，通常需要提前预约或按照指定时间将大件垃圾放置在指定地点等待收运。
      处理场所： 大件垃圾被收运到指定的处理场所进行分类处理。在处理场所，工作人员可能会对大件垃圾进行拆解、分解，以便更好地进行资源回收。
      资源回收： 部分大件垃圾中包含有可回收的材料，如金属、塑料等。在处理过程中，这些可回收材料可能会被分离出来进行再利用，有助于减少资源浪费。                
                  </pre>
              </div>
            </div>
          </div>
          <foot />
          <div infos="0">
            <div
              class="adBanner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "./components/Top.vue";
import foot from "./components/Foots.vue";

export default {
  name: "List",
  components: { top, foot },
  data() {
    return {
      acticve: "nav-link active",
      type: 1,
      isShow: false,
      garbarge: ''
    };
  },
  mounted() {
    this.setData();
  },
  watch:{
    '$route': function(to, from){
      this.setData();
    }
  },
  methods: {
    setData() {
      this.type = this.$route.query.id;
      if(this.$route.query.garbarge){
        this.isShow = true
        this.garbarge = this.$route.query.garbarge
      }
    }
  }
};
</script>

<style scoped>
.banner-title {
  color: #00497e;
  font-size: 20px;
}

.search-title {
  font-size: 22px;
  font-weight: 800;
  text-align: center;
}

.pre-wrap {
  white-space: pre;
}
</style>