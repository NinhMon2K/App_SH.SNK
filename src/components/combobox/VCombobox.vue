<template>
  <div class="filter-combobox" ref="container">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>

    <button class="combobox-menu-toggle" ref="input">
      <div
        :class="['app-icon icon--left', leftIcon, disabled ? 'disabled-icon' : '']"
        v-if="leftIcon"
      ></div>
      <div
        :style="styleSelectedData"
        class="container-list_combo"
        v-if="selected.length == 0 ? false : true"
      >
        <div
          class="item-checked__combobox"
          v-for="item in selected"
          :key="item[valueField]"
        >
          <v-tooltip :content="item[displayField]" placement="bottom" right="bottom">
            <div class="text-cbo">{{ item[displayField] }}</div>
          </v-tooltip>
          <div
            class="app-icon ic-remove__cbo"
            @click="handleRemoveItem(item[valueField])"
          ></div>
        </div>
      </div>

      <input
        type="text"
        :id="'input' + tabindex"
        :placeholder="displayPlaceholder"
        v-on="eventListsioner"
        @keydown.down="open()"
        :tabindex="tabindex"
        @click="isShowMenu = true"
        ref="inputCbo"
        @keyup="search"
      />
      <div
        :class="['app-icon icon--right', rightIcon, disabled ? 'disabled-icon' : '']"
        v-if="rightIcon"
        @click="isShowMenu = !isShowMenu"
      ></div>
    </button>

    <teleport to="body">
      <div
        class="combobox-menu"
        ref="cbo"
        :style="style"
        :class="autoHeight ? 'height_auto--cbo' : ''"
        v-if="isShowMenu"
      >
        <div class="combobox-content">
          <ul class="list-item--combobox">
            <v-combobox-detail
              ref="item"
              :id="tabindex + index"
              :tabindex="tabindex"
              v-for="(item, index) in data"
              :key="item"
              :dataItem="item"
              :displayField="displayField"
              :valueField="valueField"
              @keydown.up="prevItem"
              @keydown.down="nextItem"
              @focus="
                open();
                isFocus = index;
              "
              @blur="isFocus = -1"
              :class="[
                selected?.find((x) => x[valueField] == item[valueField])
                  ? 'selected'
                  : '',
                active == index ? 'active-row' : '',
              ]"
              :selected="selected?.some((x) => x[valueField] == item[valueField])"
              @change-value="changeValue"
            >
            </v-combobox-detail>
          </ul>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  nextTick,
  ref,
  toRef,
  watch,
} from "@vue/runtime-core";
import VComboboxDetail from "./VComboboxDetail.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import Enums from "@/assets/js/enums/enum.js";
export default {
  name: "VCombobox",
  components: {
    VComboboxDetail,
    VTooltip,
  },
  props: {
    modelValue: {
      default: [],
    },
    // Icon bên trái combobox
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
      default: [],
    },
    id: {
      default: null,
      type: String,
    },
    // Icon bên phải combobox
    rightIcon: {
      default: null,
      type: String,
    },
    // trạng thái icon
    disabled: {
      default: false,
      type: Boolean,
    },
    // chú giải
    placeholder: {
      default: null,
      type: [Number, String],
    },
    // trường dữ liệu
    valueField: {
      default: null,
      type: String,
    },
    // hiển thị dữ liệu nào
    displayField: {
      default: null,
      type: String,
    },
    //lable combobox
    label: {
      default: null,
      type: String,
    },
    // có bắt buộc nhập hay không
    hasInput: {
      default: false,
      type: Boolean,
    },
    // trạng thái lable mặc định false
    hasLabel: {
      default: false,
      type: Boolean,
    },
    // Giảm đi height list-item
    heightCb: {
      default: 0,
    },
    tabindex: {
      default: null,
      type: [String, Number],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const displayPlaceholder = ref(props.placeholder);
    const isFocus = ref(false);
    const selected = ref([]);
    const data = ref(props.dataAll);
    const autoHeight = ref(false);
    const active = ref(-1);
    window.cb = proxy;
    const display = computed(() =>
      proxy.selected.map((x) => x[props.displayField]).join("; ")
    );

    /**
     * Lấy những item selected
     * NNNINH (25/11/2022)
     */
    const objSelected = computed(() =>
      proxy.dataAll.reduce(
        (o, x) => ({
          ...o,
          [x[proxy.valueField]]: proxy.selected.includes(x),
        }),
        {}
      )
    );

    /**
     * Xóa 1 item trong selected
     * NNNINH (25/11/2022)
     */
    const handleRemoveItem = (item) => {
      proxy.isShowMenu = true;
      let i = proxy.selected.findIndex((x) => x[proxy.valueField] == item);
      proxy.selected.splice(i, 1);
    };

    /**
     * Focus vào item đầu tiên
     * NNNINH (25/11/2022)
     */
    const focusFirstItem = () => {
      document.getElementById(`${proxy.tabindex}0`).focus();
    };

    /**
     * Xet positon cho combobox
     * @param {top,left} type top: vị trí top,left: vị trí left
     * Author: NNNinh (16/10/2022)
     */
    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });

    /**
     * Xet positon cho combobox
     * @param {width,height} type width: chiều dài list-item, height: chiều cao list-item
     * Author: NNNinh (18/10/2022)
     */
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    /**
     * Xet positon cho combobox Selected
     * @param {top,left} type top: vị trí top,left: vị trí left
     * Author: NNNinh (16/10/2022)
     */
    const offsetPosiSelectedData = reactive({
      bottom: 0,
      left: 0,
    });

    /**
     * Xet positon cho combobox Selected
     * @param {width,height} type width: chiều dài list-item, height: chiều cao list-item
     * Author: NNNinh (18/10/2022)
     */
    const offsetDropdownSelectedData = reactive({
      width: 0,
      height: 0,
    });

    //Biến show list item
    const isShowMenu = ref(false);

    //Xét style cho list
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });
    //Xét style cho list
    const styleSelectedData = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosiSelectedData.bottom}px`);
      arr.push(`left: ${offsetPosiSelectedData.left}px`);
      arr.push(`width: ${offsetDropdownSelectedData.width}px`);
      arr.push(`max-width: ${offsetDropdownSelectedData.width}px`);
      return arr.join("; ");
    });

    // Sự kiện chỉ hiện menu cho 1 combobox
    onMounted(() => {
      document.addEventListener("click", (e) => {
        let target = e.target;

        let cont = target.closest(".filter-combobox");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          let cont = target.closest(".combobox-menu");
          if (!cont || !cont.isEqualNode(proxy.$refs.cbo)) {
            isShowMenu.value = false;
          }
        }
      });
    });

    const onFocus = (e) => {
      document.addEventListener("focus", (e) => {
        let target = e.target;
        let cont = target.closest(".filter-combobox");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          isShowMenu.value = false;
        }
      });
    };

    const eventListsioner = computed(() => {
      const me = this;
      return {
        click: (e) => {
          // proxy.cancelEvent(e);
          proxy.isShowMenu = !proxy.isShowMenu;
        },
        blur: (e) => {
          // proxy.cancelEvent(e);
        },
        focus: (e) => {
          // proxy.cancelEvent(e);
          // proxy.onFocus(e);
        },
        change: (e) => {
          // proxy.cancelEvent(e);
          // proxy.changeValue(e);
        },
        keydown: (e) => {
          switch (e.which) {
            case Enums.KeyCode.Up:
              proxy.active > 0 && proxy.active--;
              nextTick(() => {
                proxy.$refs.item[proxy.active]?.$el.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              });
              break;

            case Enums.KeyCode.Down:
              proxy.active < proxy.data.length - 1 && proxy.active++;

              break;

            case Enums.KeyCode.ENTER:
              emit("update:modelValue", proxy.data[proxy.active][proxy.valueField]);
              nextTick(() => {
                let item = proxy.data[proxy.active];
                changeValue(
                  item,
                  !proxy.selected.some(
                    (x) => x[proxy.valueField] == item[proxy.valueField]
                  )
                );
              });
              break;
          }

          emit("keydown", e);
        },
        keyup: (e) => {
          emit("keyup", e);
        },
      };
    });

    //Theo dõi show list
    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    /**
     * Tìm kiếm dữ liệu khi nhập input
     * NNNinh (01/11/2022)
     */
    const search = function (e) {
      setTimeout(() => {
        let val = proxy.$refs.inputCbo.value;
        proxy.data = proxy.dataAll.filter((x) =>
          x[props.displayField].toLowerCase()?.includes(val.toLowerCase())
        );
      }, 100);
    };

    // Sự kiện click item
    const itemClick = (item) => {
      selected.value = item;
      emit("item-click", item);
    };

    /**
     * Focus vào item trước đó
     * NNNINH (24/11/2022)
     */
    const prevItem = (e) => {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      }
    };

    /**
     * Focus vào item tiếp theo
     * NNNINH (24/11/2022)
     */
    const nextItem = (e) => {
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    };

    // Hiện list combobox
    const open = () => {
      proxy.isShowMenu = true;
    };

    // Đóng combobox
    const close = () => {
      proxy.isShowMenu = false;
    };

    onMounted(() => {
      proxy.data = proxy.dataAll;
      watch(
        () => proxy.dataAll,
        () => {
          search();
        }
      );
    });

    onUpdated(() => {
      if (proxy.selected.length != 0) {
        proxy.displayPlaceholder = "";
      } else proxy.displayPlaceholder = props.placeholder;
    });

    onMounted(() => {
      proxy.setPosition();
      proxy.setPositionSelectedData();
      proxy.setDropdown();
      proxy.initEvent();
    });

    // Xét giá trị positon cho menu
    function setPosition() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

    function setPositionSelectedData() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetPosiSelectedData.bottom = offset.top - offset.height - 4;
      offsetPosiSelectedData.left = offset.left;
      offsetDropdownSelectedData.width = offset.width;
    }

    /**
     *Xet width, height cho combobox
     * Author: NNNinh (15/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    const changeValue = function (item, select) {
      if (
        select &&
        proxy.selected?.some((x) => x[proxy.valueField] == item[proxy.valueField])
      ) {
        return false;
      }
      // Kiểm tra select là true ỏ false
      // Nếu true push vào mảng , false xóa khỏi mảng
      if (select) {
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        );
        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected, proxy.dataItem);
      proxy.$emit("update:modelValue", proxy.selected);
    };

    /**
     *Sự kiện event click windown ẩn list combobox
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".combobox-menu") || target.closest(".combobox-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }

    return {
      initEvent, //Sự kiện event click windown ẩn list combobox
      itemClick, //Sự kiện event click item
      setPosition, // Xét giá trị vị trí cho list cbo
      setDropdown, // Xét giá trị width,height
      style, //Xét style cho list
      isShowMenu, // Show list item
      display,
      data,
      search, // Tìm kiếm dữ liệu
      selected,
      changeValue,
      handleRemoveItem,
      objSelected,
      autoHeight, // Xét style height auto khi tìm kiếm cho list
      offsetPosiSelectedData,
      offsetDropdownSelectedData,
      setPositionSelectedData,
      styleSelectedData,
      displayPlaceholder,
      prevItem,
      nextItem,
      isFocus,
      close,
      open,
      active,
      focusFirstItem,
      eventListsioner,
      onFocus,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_combobox.scss";
</style>
