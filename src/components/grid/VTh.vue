<template>
  <th
    :style="styles"
    :class="styleAlign"
    v-if="config.type != ColumnType.Action || config.position == 'relative'"
  >
    <div class="th-inner">
      <template v-if="config.type == ColumnType.Checkbox">
        <v-checkbox v-model="allSelected"></v-checkbox>
      </template>
      <!--  -->

      <template
        v-else-if="config.type == ColumnType.Action && config.position == 'relative'"
      >
        <v-tooltip
          :content="displayTootip(config.title)"
          placement="bottom"
          right="bottom"
        >
          <div class="th-text">
            {{ config.title }}
          </div>
        </v-tooltip>
      </template>

      <template v-else>
        <v-tooltip
          :content="displayTootip(config.title)"
          placement="bottom"
          right="bottom"
        >
          <div class="th-text">
            {{ config.title }} 
          </div>
        </v-tooltip>
      </template>
    </div>
  </th>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  reactive,
  defineComponent,
} from "vue";
import ColumnType from "@/assets/js/constant/ColumnType.js";
import { computed } from "@vue/runtime-core";
import VCheckbox from "@/components/input/VCheckbox.vue";
import ResourceTable from "@/assets/js/resource/resourceTable.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";

export default {
  name: "VTh",
  components: {
    VCheckbox,
    VTooltip,
  },
  props: {
    config: {
      default: {},
    },
    selected: {
      default: false,
      type: Boolean,
    },
    allData: {
      default: [],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const text = "";

    window.th = proxy;

    const allSelected = ref(false);
    const selectedData = ref([]);
    onMounted(() => {
      proxy.allSelected = proxy.selected;
    });
    function displayTootip(val) {
      let tilteTooltip = "";
      switch (val) {
        case "STT":
          tilteTooltip = "Số thứ tự";
          break;
        case "HM/KH lũy kế":
          tilteTooltip = "Hao mòn khấu hao lũy kế";
          break;
        default:
          tilteTooltip = "";
      }
      return tilteTooltip;
    }
    watch(
      () => allSelected.value,
      () => {
        if (proxy.allSelected) {
          proxy.allData.forEach((data, index) => {
            proxy.selectedData.push(data);
          });
        } else {
          proxy.selectedData = [];
        }

        console.log(proxy.selectedData);
        proxy.$emit("change-value", proxy.allSelected);
      }
    );

    // Xét style cho th
    const styles = computed(() => {
      let arr = [];
      if (props.config.width) {
        arr.push("width: " + props.config.width + "px;");
        arr.push("min-width: " + props.config.width + "px;");
      }
      if (props.config.minWidth) {
        arr.push("min-width: " + props.config.minWidth + "px;");
      }

      return arr.join("; ");
    });
    const styleAlign = computed(() => {
      let rs = [];

      switch (props.config.align) {
        case ColumnType.AlignCenter:
          rs.push("text-align__center");
          break;
        case ColumnType.AlignLeft:
          rs.push("text-align__left");
          break;
        case ColumnType.AlignRight:
          rs.push("text-align__right");
          break;
      }

      return rs.join(" ");
    });

    return {
      text,
      ColumnType,
      styles,
      allSelected,
      selectedData,
      ResourceTable,
      styleAlign,
      displayTootip,
    };
  },
};
</script>
<style lang="scss" scoped>
.text-align__center {
  text-align: center;
}
.text-align__right {
  text-align: right;
}
.text-align__left {
  text-align: left;
}
</style>
