<template>
  <div class="sidebar-logo-container" style="text-align: center">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
        style="display: flex"
      >
        <div class="icon" v-if="logo">
          <svg-icon icon-class="garbageicon3" class-name="card-panel-icon" />
        </div>
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
        style="display: flex"
      >
        <div class="icon" v-if="logo">
          <svg-icon icon-class="garbageicon3" class-name="card-panel-icon" />
        </div>
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "垃圾回收后台",
      logo: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 20px;
  margin-left: 18px;
  margin-top: -4px;
  text-align: center;
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #292d32;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 19px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // &.collapse {
  //   .sidebar-logo {
  //     margin-right: 0px;
  //   }
  // }
}
</style>
