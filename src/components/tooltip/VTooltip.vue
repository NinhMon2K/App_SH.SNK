<template>
  <div :class="[isHidden && 'hidden']">
    <div
      ref="referenceRef"
      class="inline-block"
      @blur="hide"
      @focus="show"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <slot></slot>
      <div
        :class="['tooltip', top, left, right, bottom]"
        ref="floatingRef"
        :style="style"
        v-show="isHidden"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>
<script>
import { computePositon } from "@floating-ui/dom";
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { arrow, flip, offset, shift } from "@floating-ui/core";
export default {
  name: "VTooltip",
  props: {
    content: String,
    placement: {
      default: "bottom",
      type: String,
    },
    leftT: {
      default: 0,
      type: [Number, String],
    },
    top: {
      default: null,
      type: String,
    },
    left: {
      default: null,
      type: String,
    },
    right: {
      default: null,
      type: String,
    },
    bottom: {
      default: null,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isHidden = ref(false);
    const offsetPosi = reactive({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });
    onMounted(() => {
      proxy.setPosition();
    });
    const style = computed(() => {
      let arr = [];

      if (props.placement == "bottom") {
        arr.push(`top: ${offsetPosi.top}px`);
        arr.push(`left: ${offsetPosi.left}px`);
      }
      if (props.placement == "top") {
        arr.push(`top: ${offsetPosi.top}px`);
        arr.push(`left: ${offsetPosi.left}px`);
      }
      if (props.placement == "left") {
        arr.push(`left: ${offsetPosi.left}px`);
        arr.push(`top: ${offsetPosi.top}px`);
      }
      if (props.placement == "right") {
        arr.push(`left: ${offsetPosi.right}px`);
        arr.push(`top: ${offsetPosi.top}px`);
      }
      return arr.join("; ");
    });
    watch(
      () => isHidden.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );
    function hide() {
      proxy.isHidden = false;
    }
    function show() {
      if (props.content.length == 0) {
        proxy.isHidden = false;
      } else {
        proxy.isHidden = true;
      }
    }

    function setPosition() {
      let offset = proxy.$refs.referenceRef.getBoundingClientRect();
      let lengthContent = props.content || "";
      let valueOffset = 0;
      if (lengthContent.length < 5) {
        valueOffset = offset.width / 3.5;
      } else {
        valueOffset = offset.width / 5.5;
      }
      if (this.placement == "bottom") {
        offsetPosi.top = offset.bottom;
        offsetPosi.left = offset.left + valueOffset - 5;
      }
      if (this.placement == "top") {
        offsetPosi.top = offset.top - offset.height - 6;
        offsetPosi.left = offset.left + valueOffset;
      }
      if (this.placement == "left") {
        offsetPosi.top = offset.top;
        offsetPosi.left = offset.left - offset.width + 5;
      }
      if (this.placement == "right") {
        offsetPosi.top = offset.top;
        offsetPosi.right = offset.left + offset.width + 15;
      }
    }
    return {
      isHidden,
      setPosition,
      offsetPosi,
      show,
      hide,
      style,
    };
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  margin-top: 8px;
  border: none;
  position: fixed !important;
  background-color: #fff;
  color: #fff;
  position: absolute;
  padding: 5px 10px;
  color: #000;
  border-radius: 2px;
  /*text-transform: uppercase;*/
  box-shadow: 0 0 7px #ccc;
  font-size: 11px;
  z-index: 109;
}
</style>
