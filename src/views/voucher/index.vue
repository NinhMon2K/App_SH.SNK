<template>
  <div class="asset-page page-view">
    <voucher></voucher>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Voucher from "./Voucher.vue";

export default {
  components: {
    Voucher: defineAsyncComponent(() => import("./Voucher.vue")),
  },
  setup() {},
};
</script>
