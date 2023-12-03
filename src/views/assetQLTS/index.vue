<template>
  <div class="asset-page page-view">
    <ms-asset> </ms-asset>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    MsAsset: defineAsyncComponent(() => import("./MsAsset.vue")),
  },
  setup() {},
};
</script>
