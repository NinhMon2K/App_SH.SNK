<template>
  <v-tooltip
    :content="dataItem[displayField].length > 25 ? dataItem[displayField] : ''"
    placement="right"
  >
    <li
      :tabindex="tabindex"
      class="item-combobox"
      :class="select ? 'active' : ''"
      @click="emitClick"
      @keyup.enter="emitClick"
      @keyup.space="emitClick"
    >
      <div class="app-icon">
        <v-checkbox
          class="ic-checked"
          :id="dataItem[valueField]"
          v-model="select"
        ></v-checkbox>
      </div>

      <label :for="dataItem[valueField]" class="text-item">{{
        dataItem[displayField]
      }}</label>
    </li>
  </v-tooltip>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
export default {
  components: { VTooltip, VCheckbox },
  props: {
    icon: {
      type: [Array, String],
      default: null,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    dataItem: {
      default: {},
    },
    valueField: {
      default: null,
      type: String,
    },
    displayField: {
      default: null,
      type: String,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      default: null,
      type: [String, Number],
    },
  },
  methods: {
    emitClick(e) {
      this.$emit("menu-item-click", this.dataItem, this.select);
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const select = ref(false);

    !window.ac && (window.ac = proxy);

    onMounted(() => {
      proxy.select = proxy.selected;
    });

    watch(
      () => props.selected,
      (newVal) => {
        proxy.select = proxy.selected;
      }
    );

    watch(
      () => select.value,
      () => {
        nextTick(() => {
          proxy.$emit("change-value", proxy.dataItem, proxy.select);
        });
      }
    );

    return { select };
  },
};
</script>
<style lang="scss" scoped>
.item-combobox {
  width: 100%;
  overflow: hidden;
  padding: 4px 0;
  outline: none;
  display: flex;
  align-items: center;
  height: 36px;
  .app-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  }
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;
    /* background-color: #c7e0f5; */
    cursor: pointer;
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
    cursor: pointer;
  }
  .icon_left-combobox {
    margin: 0 18px 0 10px;
  }
  .text-item {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 18px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.active {
  background-color: #c7e0f5;
}
.selected {
  background-color: #c7e0f5;
}
</style>
