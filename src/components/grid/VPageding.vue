<template>
  <el-pagination
    :page-size="tableView"
    @current-change="handleCurrentChange"
    current-page.sync="currentPage"
    :default-current-page="currentPage"
    layout=" prev, pager, next"
    :total="dataTotal.totalCount"
  >
  </el-pagination>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  reactive,
  nextTick,
  computed,
  onUpdated,
  toRefs,
  defineComponent,
} from "vue";

export default {
  props: {
    modelValue: {
      default: null,
    },
    dataTotal: {
      default: {},
    },
  },
  emits: [
    "size-change",
    "current-change",
    "prev-click",
    "next-click",
    "update:currentPage",
    "update:pageSize",
    "currentPage",
    "update:modelValue",
    "changeValue",
  ],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.page = proxy;
    /**
     * Trang hiện tại đứng
     * @author NNNinh(03/11/2022)
     */
    const currentPage = ref(1);
    const tableView = ref(proxy.modelValue);
    const handleCurrentChange = (val) => {
      nextTick(() => {
        proxy.currentPage = val;
        emit("currentPage", proxy.currentPage);
      });
    };
    onMounted(() => {
      emit("currentPage", proxy.currentPage);
    });
    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.tableView = newVal;
      }
    );
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.tableView);
      nextTick(() => {
        emit("changeValue", proxy.tableView);
      });
    };

    return {
      currentPage,
      handleCurrentChange,
      tableView,
      changeValue,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep() {
  .el-pager {
    .more {
      width: 20px !important;
      min-width: 20px !important;
      height: 20px;
      margin: 0 2px 0 -2px;
    }
    .number {
      width: 20px !important;
      min-width: 20px !important;
      height: 20px;
      font-size: 11px !important;
      margin-right: 7px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      &.is-active {
        font-weight: 700;
        color: #000;
        background-color: #f5f5f5;
        border-radius: 3px;
        overflow: hidden;
      }
      &:last-child {
        margin-left: 3px;
      }
      &:first-child {
        margin-right: 9px;
      }
    }
  }
  .btn-prev {
    width: 20px !important;
    min-width: 20px !important;
    height: 20px;
    margin-top: -2px;
    margin-right: 10px;
  }
  .btn-next {
    width: 20px !important;
    min-width: 20px !important;
    height: 20px;
    margin-top: -2px;
    margin-left: 3px;
  }
}
</style>
