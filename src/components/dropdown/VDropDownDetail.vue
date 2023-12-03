<template>
  <v-tooltip
    :content="dataItem[columns[1].field].length > 20 ? dataItem[columns[1].field] : ''"
    placement="right"
  >
    <li
      class="item-dropdown"
      @click="emitClick"
      @keyup.enter="emitClick"
      @keyup.space="emitClick"
    >
      <!-- <div class="app-icon icon_left-dropdown"></div> -->
      <label class="text-item" v-for="col in columns" :key="col">{{
        dataItem[col.field]
      }}</label>
    </li>
  </v-tooltip>
</template>
<script>
import {
  getCurrentInstance,
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import VTooltip from "@/components/tooltip/VTooltip.vue";
export default {
  name: "vDropdownDetail",
  components: {
    VTooltip,
  },
  props: {
    icon: {
      type: [Array, String],
      default: null,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    displayField: {
      default: null,
      type: String,
    },
    //
    columns: {
      default: [],
    },

    dataItem: {
      default: {},
    },
  },
  methods: {
    // emitClick(e) {
    //   this.$emit("menu-item-click", this.dataItem);
    // },
  },
  emit: ["menu-item-click"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const emitClick = (e) => {
      emit("menu-item-click", proxy.dataItem);
    };
    window.drpdetail = proxy;
    return { emitClick };
  },
};
</script>
<style lang="scss" scoped>
.item-dropdown {
  width: 100%;
  height: 36px !important;
  min-height: 36px;
  overflow: hidden;
  padding: 4px 0;
  outline: none;
  display: flex;
  align-items: center;
  &:active,
  &:focus,
  &:focus-within {
    transition: 0.5s;

    cursor: pointer;
    .icon_left-dropdown {
      background-color: #c7e0f5;

      width: 36px;
      height: 36px;
      min-width: 36px;
      background-image: url("./../../assets/images/icons/icons8-v-24.png");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: #c7e0f5;
    cursor: pointer;
    border-radius: 4px;
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png") !important;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .selected {
    .icon_left-dropdown {
      background-image: url("./../../assets/images/icons/icons8-v-24.png") !important;
    }
  }
  .icon_left-dropdown {
    width: 36px;
    height: 36px;
    min-width: 36px;
    background-image: none;
  }
  .text-item {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:first-child {
      width: 86px;
      text-align: center;
      min-width: 86px;
    }
  }
}
.selected {
  transition: 0.2s;

  .inline-block {
    .item-dropdown {
      .icon_left-dropdown {
        background-color: #c7e0f5;
        width: 36px;
        height: 36px;
        min-width: 36px;
        background-image: url("@/assets/images/icons/icons8-v-24.png") !important;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 4px;
      }
    }
  }
}
</style>
