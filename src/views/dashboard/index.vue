<template>
  <div class="dashboard-page page-view">
    <ms-asset> </ms-asset>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    MsAsset: defineAsyncComponent(() => import("./Dashboard.vue")),
  },
  setup() {},
};
</script>
