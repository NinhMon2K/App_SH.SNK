<template>
  <div class="main-app">
    <div class="main-left">
      <the-side-bar></the-side-bar>
    </div>
    <div class="main-right">
      <div class="wrap-right">
        <the-header></the-header>
        <div class="main-view">
          <Suspense>
            <router-view> </router-view>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheSideBar from "./TheSideBar.vue";
import TheHeader from "./TheHeader.vue";

export default {
  components: {
    TheSideBar,
    TheHeader,
  },
  setup() {
    const clickbtn = () => {
      console.log("b");
    };

    return {
      clickbtn,
    };
  },
};
</script>
<style lang="scss" scoped></style>
