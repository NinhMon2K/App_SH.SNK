<template>
  <div
    class="grid-container"
    ref="tabless"
    v-on:keydown="keyboardEvent"
    v-on:keyup="keyUpboardEvent"
  >
    <div class="grid-view">
      <div
        class="grid-header"
        :class="allData.length < 20 ? 'mg' : ''"
        :style="{
          'padding-right': left + 'px',
          left: leftWidth + 'px',
        }"
      >
        <table>
          <thead>
            <tr>
              <th v-if="selectedCol" style="width: 54px">
                <div class="th-inner">
                  <v-checkbox v-model="allSelected"></v-checkbox>
                </div>
              </th>

              <v-th
                ref="th"
                v-for="col in columns"
                :key="col"
                :config="col"
                :allData="allData"
              >
                {{ col.title }}
              </v-th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="grid-body">
        <table id="tbl_tbody" v-if="allData.length > 0">
          <tbody>
            <v-tr
              tabindex="7"
              v-for="(item, i) in data"
              :class="[
                selectedIndex[i] ? 'active-tr' : '',
                active == i ? 'active-row' : '',
              ]"
              :key="item"
              :data="item"
              :columns="columns"
              :selectedCol="selectedCol"
              :selectedRow="selectedIndex[i]"
              v-model:selected="selectedIndex[i]"
              @click="(e) => handleClick(i, e)"
              @dblclick="handleEdit(item, i)"
              @keydown.ctrl.e="handleEdit(item, i)"
              @keydown.ctrl.insert="handleDuplicate(item, i)"
              @keydown.ctrl.delete="handleDelete(item, i)"
              @keydown.up="prevItem"
              @keydown.down="nextItem"
              @keyup.enter="(e) => handleClick(i, e)"
              @checkBoxAll="handleCheckBoxAll"
            >
            </v-tr>
          </tbody>
        </table>
        <div class="container_no--data" v-else>
          <div class="no-data app-icon ic-no__data"></div>
        </div>
      </div>

      <div
        class="grid-footer"
        :class="positionPaging == 'Bottom' ? 'position_paging-bottom' : ''"
        :style="{
          'padding-right': left - 2 + 'px',
        }"
        v-if="disableFooter"
      >
        <table
          class="gr-footer"
          :style="{
            left: leftWidth + 'px',
            width: tableWidth + 'px',
          }"
        >
          <tfoot>
            <tr>
              <th v-if="selectedCol" style="width: 50px">
                <div class="th-inner">
                  <div></div>
                </div>
              </th>
              <v-tfoot
                ref="th"
                v-for="col in columns"
                :dataTotal="dataTotal"
                :key="col"
                :config="col"
              >
              </v-tfoot>
            </tr>
          </tfoot>
        </table>

        <!-- Paging table -->
        <div class="paging_table">
          <div class="container-tfooter-left">
            <div class="tfooter--left" style="font-size: 11px">
              <span>Tổng số:</span>
              <span style="font-size: 11px; font-weight: 700; margin: 0 4px">{{
                dataTotal.totalCount
              }}</span>
              <span>bản ghi</span>
            </div>
            <div class="total-page">
              <select id="total-page_size" v-model="tableView" @change="handleChangeTab">
                <option
                  v-show="true"
                  id="item-total"
                  v-for="item in dataTotalPage"
                  :key="item"
                  :value="item"
                  selected
                  @click="handleTotalPage"
                  @change="handleTotalPage"
                >
                  {{ item }}
                </option>
              </select>
              <label class="icon-total_page" for="total-page_size">
                <div class="icon-bottom app-icon ic-angle_down"></div>
              </label>
            </div>

            <div class="tfooter--right">
              <v-pageding
                v-model="tableView"
                :dataTotal="dataTotal"
                @currentPage="handleTotalPage"
              ></v-pageding>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  defineComponent,
} from "vue";
import VTh from "./VTh.vue";
import VTr from "./VTr.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
import VTfoot from "@/components/grid/VTfoot.vue";
import Resource from "@/assets/js/resource/resource.js";
import VPageding from "@/components/grid/VPageding.vue";
import Enum from "@/assets/js/enums/enum.js";

export default defineComponent({
  name: "VGrid",
  components: { VTh, VTr, VCheckbox, VTfoot, VPageding },
  props: {
    selectedCol: {
      default: false,
      type: Boolean,
    },
    positionPaging: {
      default: "Top",
      type: String,
    },
    disableFooter: {
      default: false,
      type: Boolean,
    },
    // Xác định cột cho table
    columns: {
      default: [],
    },
    // Mảng dữ liệu table
    allData: {
      default: [],
    },
    idField: {
      default: "",
    },
    modelValue: {
      default: [],
    },
    selectedField: {
      default: "",
    },
    selectedData: {
      default: [],
    },
    dataTotal: {
      default: {},
    },
    search: {
      default: [],
    },
    page: {
      default: {},
    },
    active: {
      default: 0,
    },
    selectedRow: {
      default: false,
      type: Boolean,
    },
    // filters: {
    //   default: [],
    //   type: Array,
    // },
    // active: {
    //   default: null,
    //   type: Object,
    // }
  },
  emits: [
    "currentPage",
    "selected",
    "selectedData",
    "changeTabView",
    "update:selected",
    "update:selectedData",
    "update:active",
  ],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.tables = proxy;
    const selected = ref([]);
    const allSelectedsIndex = ref([]);
    const isShowPopup = ref(false);
    const dataTotalPage = ref([20, 50, 100, 200]);
    let pram = reactive({
      mode: 0,
    });

    const data = ref(proxy.allData || []);

    const rowAllSelected = ref(true);
    const scrollWidth = ref(0);
    const leftWidth = ref(0);
    const tableWidth = ref(0);

    const shiftPressed = ref(false);
    const left = ref(0);
    const allSelected = ref(false);
    // Lấy ra những vị trí checked
    const selectedIndex = ref([]);
    const dataPageging = ref([1, 2, 4, 3]);
    const dataSelected = computed(() =>
      selectedIndex.value.map((x, i) => x && proxy.allData[i]).filter((x) => x)
    );
    watch(
      () => props.allData,
      (newVal) => {
        proxy.data = proxy.allData;
      }
    );
    watch(
      () => props.search,
      (newval) => {
        if (newval?.length) {
          proxy.data = proxy.allData.filter((row) =>
            newval.some((x) =>
              row[x?.field].toLowerCase().includes(x?.value.toLowerCase())
            )
          );
        } else {
          proxy.data = proxy.allData;
        }
      }
    );

    // Reset lại giá trị show toast message
    onUpdated(() => {
      // window.addEventListener("resize", resize);

      proxy.$el.querySelector(".grid-body").addEventListener("scroll", scroll);

      let body = proxy.$el.querySelector(".grid-body");

      proxy.left = computed(() => {
        return body.scrollHeight > body.clientHeight ? 8 : 0;
      });

      proxy.tableWidth = computed(() => body.scrollWidth);

      left.value = body.scrollHeight > body.clientHeight ? 8 : 0;
      tableWidth.value = body.scrollWidth;
    });

    function resize() {
      let body = proxy.$el.querySelector(".grid-body");
      scrollWidth.value = body.scrollHeight > body.clientHeight ? 8 : 0;
    }

    function scroll() {
      let body = proxy.$el.querySelector(".grid-body");
      let header = proxy.$el.querySelector(".grid-header");
      leftWidth.value = -body.scrollLeft;
    }

    // Cập nhật dataSelected vào selectedData
    onMounted(() => {
      watch(
        () => proxy.dataSelected,
        (newVal) => {
          emit("update:selected", newVal);
          nextTick(() => {
            emit("update:selectedData", proxy.dataSelected);
          });
        }
      );
    });

    //Theo dõi biến allSelected kiểm tra là true thì lấy tất cả dữ liệu
    watch(
      () => allSelected.value,
      (newVal) => {
        if (newVal) {
          proxy.selectedIndex = proxy.allData.map((x) => true);
        } else {
          proxy.selectedIndex = [];
        }
      }
    );

    /**
     * Xử lý sự kiện double click tr
     *  @author NNNinh(01/11/2022)
     * @pram {object} item dữ liệu asset khi click tr
     */
    const handleEdit = (item, i) => {
      emit("handleEventTable", Enum.Mode.Update, item);
      emit("update:active", i);
    };

    /**
     * Xử lý sự kiện double click tr
     *  @author NNNinh(01/11/2022)
     * @pram {object} item dữ liệu asset khi click tr
     */
    const handleDuplicate = (item, i) => {
      emit("handleEventTable", Enum.Mode.Duplicate, item);
      emit("update:active", i);
    };

    const handleDelete = (item, i) => {
      emit("deleteOnKey", item, i);
    };
    const pageIndex = ref(0);

    /**
     * Xử lý sự kiện bỏ checked 1 dòng
     *  @author NNNinh(01/11/2022)
     */
    const handleClick = (index, e) => {
      let isCheckbox = !!e.target.closest(".checkbox-control");

      if (!isCheckbox && proxy.selectedRow && proxy.shiftPressed == false) {
        if (proxy.selectedIndex[index]) {
          proxy.selectedIndex[index] = false;
        } else {
          proxy.selectedIndex = [];
          proxy.selectedIndex[index] = true;
        }
      } else {
        if (proxy.selectedIndex[index]) {
          proxy.selectedIndex[index] = false;
        } else {
          proxy.allSelectedsIndex[proxy.allData[index]["STT"]] = true;
          proxy.selectedIndex[index] = true;
          // proxy.allSelectedsIndex = proxy.selectedIndex[index] = true;
        }
      }
      emit("update:active", index);
    };

    /**
     * Focus vào item trước đó
     * NNNINH (28/11/2022)
     */
    const prevItem = (e) => {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    };

    const handleCheckBoxAll = (data) => {
      proxy.rowAllSelected = false;
    };

    /**
     * Focus vào item trước đó
     * NNNINH (28/11/2022)
     */
    const nextItem = (e) => {
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    };

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (14/11/2022)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.Ctrl) {
        proxy.shiftPressed = true;
      }
    };
    /**
     * Xử lí sự kiện keyupboard shortcut
     * @author NNNINH (14/11/2022)
     */
    const keyUpboardEvent = (e) => {
      if (e.which == Enum.KeyCode.Ctrl) {
        if (proxy.shiftPressed == true) {
          proxy.shiftPressed = false;
        }
      }
    };

    function resetData() {
      proxy.selectedIndex = [];
    }

    // Số trang hiển thị
    const tableView = ref(20);
    const handleTotalPage = (val) => {
      proxy.pageIndex = val;
      //  proxy.allSelectedsIndex = proxy.selectedIndex.map((x) => x == true);
      emit("currentPage", proxy.tableView, val);
    };

    const handleChangeTab = () => {
      emit("changeTabView", proxy.tableView);
    };

    return {
      prevItem,
      nextItem,
      handleTotalPage,
      selected,
      handleChangeTab,
      dataSelected,
      handleEdit,
      handleDuplicate,
      handleDelete,
      dataPageging,
      pram,
      isShowPopup,
      allSelected,
      selectedIndex,
      handleClick,
      resetData,
      scrollWidth,
      leftWidth,
      left,
      tableWidth,
      dataTotalPage,
      tableView,
      resize,
      allSelectedsIndex,
      pageIndex,
      keyboardEvent,
      keyUpboardEvent,
      shiftPressed,
      rowAllSelected,
      handleCheckBoxAll,
      data,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/scss/components/v_gid.scss";
.grid-footer {
  position: relative;
}
.paging_table {
  position: absolute;
  bottom: -1px;
}
.position_paging-bottom {
  .gr-footer {
    tfoot {
      tr {
        background-color: #f5f5f5;
      }
    }
  }
  .paging_table {
    position: relative;
    border-top: 1px solid #ccc;
  }
}
</style>
