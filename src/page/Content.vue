<template>
  <div class="home">
    <div data-server-rendered="true" id="__nuxt">
      <!---->
      <div id="__layout">
        <div data-fetch-key="0" class="app light macwk-animation">
          <top :message1="acticve"></top>
          <div class="macwk-privacy soft-layout white bg my-6 py-5">
            <div style="height: 800px;">这个可作为内容展示页面</div>
          </div>
          <foot />
          <div infos="0">
            <div
              class="
                adBanner
                pub_300x250 pub_300x250m pub_728x90
                text-ad
                textAd
                text_ad text_ads text-ads text-ad-links
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from './components/Top.vue'
import foot from './components/Foots.vue'

export default ({
  name: 'List',
  components: { top, foot },
  data() {
    return {
      acticve: 'nav-link active',
    }
  },

})
</script>
