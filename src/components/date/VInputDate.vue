<template>
  <div class="input-date__field" :class="[rowDisplay ? 'row_display' : '']">
    <label class="text-label" v-if="hasLabel" :for="id" :style="{'min-width':minWidth + 'px' }">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>
    <div
      class="flex-row"
      :class="[
        leftIcon ? 'has-icon' : '',
        disabledMessage ? 'input__error' : '',
        rowDisplay ? 'row_display_input' : '',
      ]"
    >
      <el-date-picker
        :id="id ? id : ''"
        class="input-text"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        type="date"
        ref="inputdate"
        :tabindex="tabindex"
        v-model="isValue"
        @change="changeValue"
        @blur="changeValue"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
      />
      <label :for="id">
        <div
          :class="[
            'app-icon icon--right',
            rightIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          @click="handleClick"
          v-if="rightIcon"
        ></div>
      </label>
    </div>
    <span v-if="disabledMessage" class="error-message" :style="{ 'margin-left': handleMaginError() + 'px' }">{{
      message ? message : ""
    }}</span>
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";

export default defineComponent({
  name: "VInputDate",
  props: {
    modelValue: {
      default: null,
    },
    configStyle: {
      default: {},
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    rightIcon: {
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
    valueField: {
      default: null,
      type: String,
    },
    tabindex: {
      default: null,
      type: [Number, String],
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
  emits: ["changeValue", "update:modelValue"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.ipdate = proxy;
    const isValue = ref("");

    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.isValue = newVal;
      }
    );
    onMounted(() => {
      proxy.changeValue();
    });
     const handleMaginError = () => {
      let nb = 0;
      if (proxy.rowDisplay) {
        nb = proxy.minWidth + 16;
      }
      return nb;
    };
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };
    return { isValue, changeValue,handleMaginError };
  },
});
</script>
<style lang="scss" scope>
@import "./../../assets/scss/components/v_input_date.scss";
.input-date__field {
  .flex-row {
    .el-input {
      .el-input__wrapper {
        .el-input__suffix {
          .el-input__suffix-inner {
            display: none;
          }
        }
      }
    }
  }
}
.el-input__suffix-inner {
  //@debug display: none;
}
:deep() {
  .el-input__wrapper {
    &:focus,
    &:active {
      border: none !important;
    }
  }
  .is-focus {
    border: none !important;
    box-shadow: none !important;
  }
}
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
