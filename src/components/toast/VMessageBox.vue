<template>
  <div class="message-toast">
    <div class="toast-container">
      <div class="toast-top" v-if="disabledTop">
        <div class="toast-title">{{ title }}</div>
        <div class="toast-close">
          <div tabindex="201" class="app-icon" :class="icClose"></div>
        </div>
      </div>
      <div class="toast-content">
        <div class="toast-content__left">
          <div
            ref="first"
            :class="['app-icon icon--left', leftIcon, disabled ? 'disabled-icon' : '']"
            v-if="leftIcon"
          ></div>
        </div>

        <div class="toast-content__right" v-if="!disabledMultiple && !disabledNoDelete">
          <div class="text-message">
            <span v-if="disabledValueLeft">{{ valueMessageBox }}</span>
            {{ textMessageBox }}
            <span v-if="disabledValueRight">{{ valueMessageBox }}</span>
            <span v-if="disabledValueRight" class="span__right">?</span>
          </div>
        </div>

        <div class="toast-content__right" v-if="disabledMultiple">
          <div class="text-message" v-for="text in valueMultiple" :key="text">
            <span v-if="disabledLeftMultiple" class="span__left">- </span>
            <span v-if="disabledValueLeft">{{ valueMessageBox }}</span>
            {{ text }}
            <span v-if="disabledValueRight">{{ valueMessageBox }}</span>
          </div>
        </div>

        <div class="toast-content__right" v-if="disabledNoDelete">
          <div class="text-message">
            <p v-html="valueMessageBox"></p>
          </div>
        </div>
      </div>
      <div class="toast-bottom" ref="buttons">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
// import MsButton from "@/components/tooltip/MsTooltip.vue";
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  onUnmounted,
  onBeforeMount,
  onUpdated,
  nextTick,
  reactive,
} from "vue";
export default {
  name: "VMessageBox",
  components: {
    // MsTooltip,
  },
  props: {
    valueMessageBox: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    textMessageBox: {
      default: null,
      type: String,
    },
    disabledValueLeft: {
      default: false,
      type: Boolean,
    },
    disabledValueRight: {
      default: false,
      type: Boolean,
    },
    disabledMultiple: {
      default: false,
      type: Boolean,
    },
    valueMultiple: {
      default: [],
    },
    title: {
      default: null,
      type: String,
    },
    icClose: {
      default: null,
      type: String,
    },
    disabledLeftMultiple: {
      default: false,
      type: Boolean,
    },
    disabledTop: {
      default: false,
      type: Boolean,
    },
    disabledNoDelete: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    onMounted(() => {
      proxy.focusFirst();
    });
    /**
     * Focus vào phần tử đầu tiên
     * NNNINH (24/11/2022)
     */
    const focusFirst = () => {
      proxy.$refs.buttons.querySelector("button").focus();
    };

    return { focusFirst };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/v_message_box.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
