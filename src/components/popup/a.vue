<template>
  <vue-final-model
    v-slot="{ close }"
    :classes="'modal-container' + (dockposition ? 'docked' : '') + classDetail"
    content-class="modal-content "
    v-bind="$attrs"
    :drag="isDrag"
    :resize="resize"
    :content-style="styles"
    drag-selector=".modal_title"
    class="ms-dynamic-popup"
    :transition="{
      'enter-active-class': '.3s cubic-bezier( .25, .8, .25,1) ',
      'enter-class': 'translate-y-full',
      'enter-to-class': 'translate-y-0',
      'leave-active-class': 'transition duration-200 ease-in-out transform',
      'leave-to-class': 'translate-y-full',
      'leave-class': 'translate-y-0',
    }"
    :name="name"
    :hide-overlay="hideoverlay"
    :min-width="200"
    :min-height="200"
    @resize:move="onResizemove"
  >
    <div class="fake-click-popup"></div>
    <div
      v-if="showTitle"
      class="modal__title"
      :class="[{ modal__drag: isDrag }, classTitle]"
    >
      <div class="title-left">
        <span class="title" @click="redirectClick">{{ title }}</span>
        <slot name="content-title"></slot>
      </div>
      <div class="title-right">
        <slot name="icon" :close="close"></slot>
        <div
          v-if="maximumable"
          class="button icon24"
          :class="['button', maximum ? 'restore' : 'maximum']"
          @click="maximumClick"
        ></div>
        <div
          v-if="isShowClose"
          class="button icon24 close"
          shortkey-target="close"
          @click="close"
        ></div>
      </div>
    </div>
    <div class="modal__content flex-column flex1">
      <span v-shortkey="defaultShortKey" class="popup-shortkey"> </span>
      <div>
        <div v-if="resizeIcon" class="toggle-above-resize"></div>
      </div>
      <slot name="content" :close="close"></slot>
    </div>
    <div v-if="$slots['footer']" class="modal__footer">
      <slot name="footer"></slot>
    </div>
  </vue-final-model>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
export default {
  name: "VDynamicPopup",
  props: {
    dragable: {
      type: Boolean,
      default: true,
    },
    resize: {
      type: Boolean,
      default: false,
    },
    // icon resize mép
    resizeIcon: {
      type: Boolean,
      default: false,
    },
    // hién title
    showTitle: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
  },
};
</script>
