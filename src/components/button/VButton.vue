<template>
  <button
    class="btn"
    :id="id ? id : ''"
    :tabindex="tabindex"
    :class="[
      type,
      text ? '' : '',
      radius ? 'btn-radius' : '',
      btn_boder ? '' : 'btn-boder-none',
      disabled ? 'disabled-icon' : '',
      leftIcon ? '' : 'style-button',
    ]"
    :disabled="disabled || false"
    :style="{ 'width': width + 'px' ,'min-width': width + 'px' }"
  >
    <div
      :class="['app-icon icon--left', leftIcon, disabled ? 'disabled-icon' : '']"
      v-if="leftIcon"
    ></div>
    <div class="btn-text" :class="buttonText" v-if="text">
      {{ text }}
    </div>
    <div
      :class="['app-icon icon--right', rightIcon, disabled ? 'disabled-icon' : '']"
      v-if="rightIcon"
    ></div>
  </button>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
} from "vue";

export default defineComponent({
  name: "VButton",
  props: {
    //Text hiển thị button
    title: {
      default: null,
      type: String,
    },
    //Text hiển thị button
    text: {
      default: null,
      type: String,
    },
    // Icon bên trái button
    leftIcon: {
      default: null,
      type: String,
    },
    // Icon bên phải button
    rightIcon: {
      default: null,
      type: String,
    },
    // Mặc định button
    type: {
      default: "primary",
      type: String,
    },
    // Boder button
    btn_boder: {
      default: false,
      type: Boolean,
    },
    // boder radius button
    radius: {
      default: false,
      type: Boolean,
    },
    // trạng thái button
    disabled: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    //key tab cho buttom
    tabindex: {
      default: null,
      type: [Number, String],
    },
    buttonText: {
      default: null,
      type: String,
    },
    width: {
      default: 124,
      type: [String, Number],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/v_button.scss";
</style>
