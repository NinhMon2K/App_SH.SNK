<template>
  <tr
    @mouseleave="handleMouseleave"
    @mouseover="isShowAction = true"
    :tabindex="7"
    class="ms-tr"
    ref="tr"
    @click="handleActionClick"
  >
    <ms-td
      v-if="selectedCol"
      @checkBoxAll="handleCheckBoxAll"
      :config="configSelect"
      v-model:value="select"
    >
    </ms-td>
    <ms-td v-for="col in columns" :key="col" :config="col" :value="data[col.field]" :objData="data">
    </ms-td>
    <div
      v-if="
        configAction.length > 0 && configAction[0].position == 'absolute' && isShowAction
      "
      class="container_action"
    >
      <div
        class="group_action"
        v-for="btn in configAction[0].action"
        :key="btn"
        @click="handleActionClick"
      >
        <v-tooltip
          :content="handleShowTextTooltip(btn.command)"
          placement="top"
          right="top"
        >
          <div
            class="app-icon icon"
            :class="btn.icon"
            @click="btn.click && btn.click(btn.command, data)"
          ></div>
        </v-tooltip>
      </div>
    </div>
  </tr>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  watch,
  computed,
  defineComponent,
} from "vue";
import MsTd from "@/components/grid/VTd.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
export default {
  name: "MsTr",
  components: {
    MsTd,
    VTooltip,
  },
  props: {
    selected: {
      default: false,
      type: Boolean,
    },
    selectedCol: {
      default: false,
      type: Boolean,
    },

    columns: {
      default: [],
    },
    selectedRow: {
      default: false,
      type: Boolean,
    },
    data: {
      default: {},
    },
  },
  emits: ["checkBoxAll", "update:selected"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    !window.mk && (window.mk = proxy);

    window.tr = proxy;
    const select = ref(props.selected);
    const isShowAction = ref(false);
    const configSelect = reactive({
      field: "selected",
      title: "checkbox",
      type: "Checkbox",
      width: 50,
    });
    watch(
      () => props.selectedRow,
      (newVal) => {
        proxy.isShowAction = newVal;
      }
    );
    const configAction = ref([]);
    const offsetPosi = reactive({
      top: 0,
      right: 0,
    });
    const offset = reactive({
      width: 0,
      height: 0,
    });
    /**
     * Set vị trí cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setPosition() {
      let offsets = proxy.$refs.tr.getBoundingClientRect();
      proxy.offsetPosi.top = offsets.top + 8;
      proxy.offsetPosi.right = offsets.right - 70;
    }
    const handleShowTextTooltip = (val) => {
      let text = "";
      switch (val) {
        case 0:
          text = "Sửa";
          break;
        case 1:
          text = "Nhân bản";
          break;
        case 2:
          text = "Xóa";
          break;
        default:
          text = "";
      }
      return text;
    };

    const handleMouseleave = () => {
      if (proxy.selectedRow) {
        proxy.isShowAction = true;
      } else {
        proxy.isShowAction = false;
      }
    };
    const handleActionClick = () => {
      if (proxy.selectedRow) {
        proxy.isShowAction = false;
      } else {
        proxy.isShowAction = true;
      }
    };
    const handleCheckBoxAll = (data) => {
      emit("checkBoxAll", data);
    };

    /**
     * Xet style cho dropdown
     * Author: NNNinh (14/10/2022)
     */
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.right}px`);
      return arr.join("; ");
    });
    onMounted(() => {
      const action = proxy.columns.filter((x) => x["type"].includes("Action"));
      if (action.length > 0) {
        proxy.configAction = action;
      }
    });
    onMounted(() => {
      watch(
        () => proxy.select,
        (newVal) => {
          emit("update:selected", newVal);
        }
      );

      watch(
        () => proxy.selected,
        (val) => {
          proxy.select = val;
        }
      );
    });

    return {
      configSelect,
      configAction,
      select,
      isShowAction,
      offsetPosi,
      offset,
      setPosition,
      style,
      handleShowTextTooltip,
      handleMouseleave,
      handleActionClick,
      handleCheckBoxAll,
    };
  },
};
</script>
<style lang="scss" scoped>
.container_action {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  margin-top: 7px;
  z-index: 1;

  .group_action {
    cursor: pointer;
    border-radius: 50%;
    margin: 0 4px;
    background-color: #fff;
    &:hover {
      box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
