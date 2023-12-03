<template>
  <div class="loading">
    <div class="half-circle-spinner">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
export default {
  name: "VLoading",
  props: {
    isLoading: {
      default: false,
    },
  },
  setup() {
    //const { proxy } = getCurrentInstance();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_loading.scss";
</style>
