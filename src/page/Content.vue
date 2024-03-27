<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve"></top>
          <div class="macwk-privacy soft-layout white bg my-6 py-5">
            <div style="padding: 40px" v-show="type === 're-garbage'">
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
            <div style="padding: 40px" v-show="type === 'harm-garbage'">
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
            <div style="padding: 40px" v-show="type === 'dry-garbage'">
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
            <div style="padding: 40px" v-show="type === 'wet-garbage'">
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

export default {
  name: "List",
  components: { top, foot },
  data() {
    return {
      acticve: "nav-link active",
      type: "re-garbage",
    };
  },
  mounted() {
    this.type = this.$route.query.id;
  },
};
</script>

<style scoped>
.banner-title {
  color: #00497e;
  font-size: 20px;
}

.pre-wrap {
  white-space: pre;
}
</style>