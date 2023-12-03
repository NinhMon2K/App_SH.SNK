<template>
  <div class="account-forwarder-page page-view">
    <ms-asset> </ms-asset>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    MsAsset: defineAsyncComponent(() => import("./AccountForwarder.vue")),
  },
  setup() {},
};
</script>
