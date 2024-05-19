<template>
  <div id="app">
    <!-- <router-view :key="$route.fullPath" /> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "./static/mycss/top.css";
  @import "./static/mycss/body.css";
</style>