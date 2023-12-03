<template>
  <div class="booking_request-page page-view">
    <ms-asset> </ms-asset>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    MsAsset: defineAsyncComponent(() => import("./BookingRequest.vue")),
  },
  setup() {},
};
</script>
