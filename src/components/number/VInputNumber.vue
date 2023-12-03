<template>
  <div class="ms-number" :class="[disabledMessage ? 'mg-9' : false,rowDisplay ? 'row_display' : '']">
    <label class="text-label" v-if="hasLabel" :for="id" :style="{'min-width':minWidth + 'px' }">
      {{ label ? label : "" }}
      <span v-if="hasInput">&#8727;</span>
    </label>
    <div
      class="flex-row"
      :class="[leftIcon ? 'has-icon' : '', disabledMessage ? 'input__error' : '',  rowDisplay ? 'row_display_input' : '',]"
    >
      <div class="icon-filter">
        <span
          :class="['app-icon icon--left', leftIcon, disabled ? 'disabled-icon' : '']"
          v-if="leftIcon"
        ></span>
      </div>

      <input
        :id="id ? id : ''"
        class="input-text"
        type="number"
        v-model.trim="isValue"
        :tabindex="tabindex"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
        v-bind:maxlength="max"
        :min="min"
        v-on="eventListsioner"
      />
      <div :class="['icon--right']" v-if="disabledRight">
        <v-tooltip content="Lên" placement="bottom">
          <div
            :class="[
              'app-icon icon--top',
              topIcon,
              disabledIconTop ? 'disabled-icon' : '',
            ]"
            v-if="topIcon"
            @click="plus"
          ></div>
        </v-tooltip>

        <v-tooltip content="Xuống" placement="bottom">
          <div
            :class="[
              'app-icon icon--bottom',
              bottomIcon,
              disabledIconBottom ? 'disabled-icon' : '',
            ]"
            v-if="bottomIcon"
            @click="less"
          ></div>
        </v-tooltip>
      </div>
    </div>
    <span v-if="disabledMessage" class="error-message">{{ message ? message : "" }}</span>
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
  getCurrentInstance,
  nextTick,
  reactive,
  onMounted,
  onUpdated,
} from "vue";
import Resource from "@/assets/js/resource/resource.js";
import CommonFunction from "@/assets/js/commons/commonFunction.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
export default defineComponent({
  name: "VInputNumber",
  components: {
    VTooltip,
  },
  props: {
    modelValue: {
      default: 0,
    },
    configStyle: {
      default: {},
    },
    typeValue: {
      default: "number",
      type: String,
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    topIcon: {
      default: null,
      type: String,
    },
    bottomIcon: {
      default: null,
      type: String,
    },
    inputBoder: {
      default: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    disabledRight: {
      default: false,
      type: Boolean,
    },
    disabledIconTop: {
      default: false,
      type: Boolean,
    },
    disabledIconBottom: {
      default: false,
      type: Boolean,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
    customWarring: {
      default: null,
      type: Object,
    },
    label: {
      default: null,
      type: String,
    },
    hasInput: {
      default: false,
      type: Boolean,
    },
    hasLabel: {
      default: false,
      type: Boolean,
    },
    hasReadonly: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },

    min: {
      default: -99999999999999,
      type: [Number, String],
    },
    max: {
      default: 99999999999999,
      type: Number,
    },
    step: {
      default: 1,
      type: [Number, String],
    },
    valueField: {
      default: null,
      type: String,
    },
    tabindex: {
      default: null,
      type: String,
    },
     rowDisplay: {
      default: false,
      type: Boolean,
    },
     minWidth: {
      default: 70,
      type: [Number, String],
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.iNumber = proxy;
    const isValue = ref(0);
    onMounted(() => {
      proxy.isValue = proxy.modelValue;
      watch(
        () => proxy.modelValue,
        (newVal, old) => {
          proxy.isValue = newVal;
          proxy.less;
          proxy.plus;
          emit("changeValue", proxy.isValue, proxy.valueField);
        }
      );
    });
    onMounted(() => {
      () => proxy.isValue,
        (newVal, old) => {
          proxy.isValue = newVal;
          proxy.less;
          proxy.plus;

          emit("changeValue", proxy.isValue, proxy.valueField);
        };
    });

    function formatMoney(money) {
      money = new Intl.NumberFormat(Resource.LanguageCode.VN, {}).format(money);
      return money;
    }
    const display = computed(() => {
      if (proxy.typeValue == "money") {
        return CommonFunction.formatNumber(proxy.isValue);
      } else {
        if (proxy.isValue < 10 && proxy.isValue > 0) {
          return `0${proxy.isValue}`;
        } else {
          return proxy.isValue;
        }
      }
    });

    /**
     * Xử lý sự kiện click xuống
     *  @author NNNinh(16/10/2021)
     */
    const less = () => {
      if (proxy.isValue <= 0) {
        proxy.isValue = 1;
        emit("plus", proxy.isValue, proxy.valueField);
      } else {
        proxy.isValue = proxy.isValue - proxy.step;
        emit("changeValue", proxy.isValue, proxy.valueField);
      }
    };

    /**
     * Xử lý sự kiện click lên
     *  @author NNNinh(16/10/2021)
     */
    const plus = () => {
      if (proxy.isValue > proxy.max) {
        emit("plus", proxy.isValue, proxy.valueField);
      } else {
        proxy.isValue = proxy.isValue + proxy.step;
        emit("changeValue", proxy.isValue, proxy.valueField);
      }
    };

    const onBlur = (e) => {
      emit("blur", proxy.isValue, proxy.valueField);
    };
    const onFocus = (e) => {
      emit("blur", proxy.isValue, proxy.valueField);
    };

    onUpdated(() => {
      if (proxy.isValue < 0) {
        proxy.isValue = 0;
      }
    });
    const eventListsioner = computed(() => {
      const me = this;
      return {
        blur: (e) => {
          cancelEvent(e);
          proxy.onBlur(e);
        },
        focus: (e) => {
          cancelEvent(e);
          proxy.onFocus(e);
        },
        change: (e) => {
          cancelEvent(e);
          proxy.changeValue(e);
        },
      };
    });
    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    /**
     * Xử lý cập nhật modelValue cho isValue
     *  @author NNNinh(18/10/2021)
     */
    const changeValue = function (val) {
      proxy.$emit("update:modelValue", proxy.isValue);

      // Chờ thay đổi trạng thái thì cập lại giá trị
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };
    return {
      isValue,
      changeValue,
      formatMoney,
      display,
      plus,
      less,
      onBlur,
      onFocus,
      eventListsioner,
      cancelEvent,
    };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/v_input_number.scss";
.row_display{
  display: flex;
  flex-direction: row;
  align-items: center;
  .text-label{
    margin-right: 16px;
    margin-bottom: 0;
  } 
}
.row_display_input{
  width: 100%;
}
</style>
