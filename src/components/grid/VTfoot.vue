<template>
  <th
    :style="styles"
    :class="styleAlign"
    v-if="config.type != ColumnType.Action || config.position == 'relative'"
  >
    <div class="th-inner">
      <template v-if="config.type == ColumnType.Checkbox">
        <div></div>
      </template>
      <!--  -->
      <template v-if="config.type == ColumnType.Action && config.position == 'relative'">
        <div></div>
      </template>
      <template v-else>
        <div class="th-text">
          {{ text }}
        </div>
      </template>
    </div>
  </th>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
  onBeforeMount,
  toRefs,
} from "vue";
import ColumnType from "@/assets/js/constant/ColumnType.js";
import Resource from "@/assets/js/resource/resource.js";
import ResourceTable from "@/assets/js/resource/resourceTable.js";
import commonFunction from "@/assets/js/commons/commonFunction.js";
import { columns } from "element-plus/es/components/table-v2/src/common";
export default {
  components: {},
  props: {
    columns: {
      default: [],
    },
    spanCol: {
      default: 0,
    },
    dataTotal: {
      default: {},
    },
    config: {
      default: {},
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.tfoot = proxy;
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

    // Giá trị hiện lên Dom
    const text = computed(() => {
      let rs = props.value;
      switch (props.config.summary) {
        case "sum":
          rs = commonFunction.formatNumber(proxy.dataTotal[props.config.field] || 0);

          break;
        case "number":
          // rs = proxy.dataTotal[field] || 0;
          break;
        default:
          rs = "";
      }
      return rs;
    });

    return {
      commonFunction,

      styleAlign,
      styles,
      ColumnType,
      text,
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
td {
  padding: 8px;
}
th {
  padding: 8px;
}
</style>
