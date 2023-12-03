<template>
  <label for="" class="input-checkbox">
    <input
      type="checkbox"
      class="checkbox-control"
      v-model="isValue"
      @change="changeValue"
      :readonly="readonly"
      :disabled="disabled"
      :id="id == null ? '' : id"
    />
  </label>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
} from "vue";
export default {
  name: "VCheckbox",
  props: {
    modelValue: {
      default: false,
      type: [Boolean, Number],
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    checked: {
      type: [Boolean, Number],
      default: false,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const isValue = ref(false);
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
    };

    watch(
      () => proxy.modelValue,
      (val) => {
        proxy.isValue = val;
      }
    );

    return {
      isValue,
      changeValue,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_checkbox.scss";
</style>
