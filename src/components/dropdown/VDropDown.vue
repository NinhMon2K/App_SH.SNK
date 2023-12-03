<template>
  <div class="filter-dropdown" ref="container" :class="[disabledMessage ? 'mg-9' : false,rowDisplay ? 'row_display' : '']">
    <label class="text-label" v-if="hasLabel" :style="{'min-width':minWidth + 'px' }">
      {{ label ? label : "" }}
      <span v-if="hasInput">&#8727;</span>
    </label>
    <button
      class="dropdown-menu-toggle"
      ref="dropdown"
      :class="disabledMessage ? 'error__message' : ''"
    >
      <div
        :class="['app-icon icon--left', leftIcon, disabled ? 'disabled-icon' : '']"
        v-if="leftIcon"
      ></div>
      <input
        type="text"
        v-model="disp"
        :tabindex="tabindex"
        ref="input"
        :placeholder="placeholder"
        :readonly="readonly"
        v-on="eventListsioner"
        @keyup="search"
        @keydown.down="open()"
        @keydown.esc="close()"
        @click="isShowMenu = true"
      />
      <div
        :class="['app-icon icon--right', rightIcon, disabled ? 'disabled-icon' : '']"
        v-if="rightIcon"
        @click="isShowMenu = !isShowMenu"
      ></div>
    </button>

    <teleport to="body">
      <div
        class="dropdown-menu"
        ref="drop"
        :style="style"
        :class="autoHeight ? 'height_auto--cbo' : ''"
        v-if="isShowMenu"
      >
        <div class="dropdown-content">
          <ul class="list-item--dropdown">
            <li>
              <div class="container-title">
                <div class="title-list">
                  <div class="text__title" v-for="col in columns" :key="col">
                    {{ col.titleField }}
                  </div>
                </div>
              </div>
            </li>

            <dropdown-item
              v-for="(item, i) in data"
              ref="item"
              :key="item"
              :dataItem="item"
              :columns="columns"
              :displayField="displayField"
              @keydown.enter="handleKeyUp"
              @keydown.up="prevItem"
              @keydown.down="nextItem"
              @keydown.esc="focusInput"
              :class="[
                modelValue && modelValue == item[valueField] ? 'selected' : '',
                active == i ? 'active-row' : '',
              ]"
              @menu-item-click="itemClick"
            >
            </dropdown-item>
          </ul>
        </div>
      </div>
    </teleport>
    <span v-if="disabledMessage"   :style="{ 'margin-left': handleMaginError() + 'px' }" class="error-message">{{ message ? message : "" }} </span>
  </div>
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
import DropdownItem from "./VDropDownDetail.vue";
import Enums from "@/assets/js/enums/enum.js";
export default {
  name: "VDropDown",
  components: {
    DropdownItem,
  },
  props: {
    modelValue: {
      default: null,
    },
    texts: {
      default: null,
      type: String,
    },
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
      default: [],
    },
    rightIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    valueField: {
      default: null,
      type: String,
    },
    displayField: {
      default: null,
      type: String,
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
    heightCb: {
      default: 0,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    tabindex: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
    columns: {
      default: [],
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
    window.dr = proxy;

    const data = ref(props.dataAll);
    const disp = ref("");
    const autoHeight = ref(false);
    const itemData = ref({});
    const active = ref(-1);
    const handleKeyUp = () => {
      console.log("sdasd");
    };

    // Lấy dữ liệu những item selected
    const selected = computed(() => {
      if (proxy.modelValue) {
        return proxy.dataAll.find((x) => x[proxy.valueField] == proxy.modelValue);
      } else {
        return null;
      }
    });
    onMounted(() => {
      proxy.data = proxy.dataAll;

      watch(
        () => proxy.dataAll,
        () => {
          search();
          proxy.disp = display.value;
        }
      );
    });

    //Tìm kiếm dữ liệu trong dropdown
    const search = function (e) {
      setTimeout(() => {
        let val = proxy.$refs.input.value;
        proxy.data = proxy.dataAll.filter((x) =>
          x[props.displayField].toLowerCase()?.includes(val.toLowerCase())
        );
        // Kiểm tra giá trị input khác "" hay k
        if (val != "") {
          proxy.autoHeight = true;
        }
        //disp.value = display.value;
      }, 100);
    };

    const display = computed(() => proxy.selected && proxy.selected[proxy.displayField]);

    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    // Biến show menu list item dropdown
    const isShowMenu = ref(false);

    /**
     * Xet style cho dropdown
     * Author: NNNinh (14/10/2022)
     */
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      return arr.join("; ");
    });

    /**
     * Theo dõi biến isShowMenu là true hay false
     * Author: NNNinh (14/10/2022)
     */
    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    /**
     * Xự kiện click itemdropdown
     * Author: NNNinh (16/10/2022)
     */
    const itemClick = (item) => {
      emit("update:modelValue", item[proxy.valueField]);
      nextTick(() => {
        emit("item-click", item, proxy.valueField);
      });
    };

    watch(
      () => proxy.modelValue,
      (newVal) => {
        disp.value = display.value;
      }
    );
    onMounted(() => {
      proxy.setPosition();
      proxy.setDropdown();
      proxy.initEvent();
    });

    /**
     * Set vị trí cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setPosition() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

    //Xử lý sự kiện
    const cancelEvent = (e) => {
      if (e) {
        //phương thức hủy sự kiện nếu nó có thể hủy được, nghĩa là hành động mặc định của sự kiện sẽ không xảy ra.
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        //phương thức ngăn không cho sự lan truyền của cùng một sự kiện được gọi.
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        //Sự kiện ngăn không cho người nghe khác của cùng một sự kiện được gọi.
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    onMounted(() => {
      document.addEventListener("click", (e) => {
        let target = e.target;
        let cont = target.closest(".filter-dropdown");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          isShowMenu.value = false;
        }
      });
    });
    const onFocus = (e) => {
      document.addEventListener("focus", (e) => {
        let target = e.target;
        let cont = target.closest(".filter-dropdown");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          isShowMenu.value = false;
        }
      });
    };

    const focusInput = () => {
      proxy.$refs.input.focus();
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

    /**
     * Focus vào item trước đó
     * NNNINH (28/11/2022)
     */
    const nextItem = (e) => {
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    };
    const CheckAssetCode = () => {};

    const onBlur = (e) => {
      nextTick(() => {
        setTimeout(() => {
          emit("blur", proxy.disp, proxy.valueField);
        }, 100);
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
          proxy.onBlur(e);
        },
        focus: (e) => {
          // proxy.cancelEvent(e);
          proxy.onFocus(e);
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
                proxy.$refs?.item[proxy?.active]?.$el.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              });
              break;

            case Enums.KeyCode.Down:
              proxy.active < proxy.data.length - 1 && proxy.active++;

              nextTick(() => {
                proxy.$refs?.item[proxy?.active]?.$el.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              });
              break;

            case Enums.KeyCode.ENTER:
              emit("update:modelValue", proxy.data[proxy.active][proxy.valueField]);

              proxy.itemData = proxy.dataAll.find((x) =>
                x[props.valueField]
                  .toLowerCase()
                  ?.includes(proxy.data[proxy.active][proxy.valueField].toLowerCase())
              );
              nextTick(() => {
                emit("item-click", proxy.itemData, proxy.valueField);
              });
              close();
              break;
          }

          emit("keydown", e);
        },
        keyup: (e) => {
          emit("keyup", e);
        },
      };
    });

    // Hiện list combobox
    const open = () => {
      proxy.isShowMenu = true;

      if (!proxy.active) {
        proxy.active = 0;
      }
    };

    // Đóng combobox
    const close = () => {
      proxy.isShowMenu = false;
    };

    /**
     * Set width,height cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      // offsetDropdown.height = 200.5 - this.heightCb;
    }

    /**
     *Đóng menu dropdown khi windown click
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".dropdown-menu") || target.closest(".dropdown-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }
    const handleMaginError = () => {
      let nb = 0;
      if (proxy.rowDisplay) {
        nb = proxy.minWidth + 16;
      }
      return nb;
    };

    return {
      itemClick,
      handleMaginError,
      cancelEvent,
      eventListsioner,
      setPosition,
      setDropdown,
      style,
      isShowMenu, //Show menu dropdown
      display,
      selected,
      initEvent, //Đóng menu dropdown khi windown click,
      search,
      data,
      disp, // Gán giá trị
      autoHeight,
      onBlur,
      onFocus,
      active,
      open,
      close,
      handleKeyUp,
      prevItem,
      nextItem,
      focusInput,
      itemData,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_dropdown.scss";
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
