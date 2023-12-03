<template>
  <div class="login-page page-view">
    <login-partial></login-partial>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    LoginPartial: defineAsyncComponent(() => import("./LoginPartial.vue")),
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.login-page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>