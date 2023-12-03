<template>
  <td
    :style="styles"
    :class="[cls, styleAlign]"
    v-if="config.type != ColumnType.Action || config.position == 'relative'"
  >
    <div class="td-inner check-box_input" ref="td">
      <template v-if="config.type == ColumnType.Checkbox">
        <v-checkbox
          v-model="data"
          @click="handleClickCheckbox(data)"
        ></v-checkbox>
      </template>

      <template
        v-else-if="
          config.type == ColumnType.Action && config.position == 'relative'
        "
      >
        <div class="action-group">
          <div v-for="btn in config.action" :key="btn">
            <v-tooltip
              :content="btn.command == 0 ? 'Sửa' : 'Xóa'"
              placement="top"
              right="top"
            >
              <div
                class="app-icon icon"
                :class="btn.icon"
                @click="handleCommandClick(btn.component, objData, data, btn)"
              ></div>
            </v-tooltip>
          </div>
        </div>
      </template>

      <template v-else-if="config.align == ColumnType.AlignCenter && config.type != ColumnType.TextLink">
        <v-tooltip
          :content="text.length > 32 ? text : ''"
          placement="bottom"
          right="bottom"
        >
          {{ text }}
        </v-tooltip>
      </template>
      <template v-else-if="config.type == ColumnType.Date">
        {{ text }}
      </template>

      <template v-else-if="config.type == ColumnType.TextLink">
        <div
          class="text_link"
          @click="handleClickLink(config.component, objData)"
        >
          {{ text }}
        </div>
      </template>
      <template v-else-if="config.type == ColumnType.TextHtml">
        <div v-html="text"></div>
      </template>

      <template v-else>
        <v-tooltip
          :content="text.length > 32 ? text : ''"
          placement="bottom"
          right="bottom"
        >
          {{ text }}
        </v-tooltip></template
      >
    </div>
  </td>
  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      disabledNoDelete
      :valueMessageBox="isShowPopupMess.valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="true"
      v-if="isShowPopupMess.show"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Delete.VI"
        @click="handleDelete"
        radius
        class="btn_delete"
        tabindex="201"
        :width="86"
      ></v-button>

      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isShowPopupMess.show = false"
        :width="86"
        radius
      >
      </v-button>
    </v-message-box>
  </teleport>

  <booking-request-detail
    v-if="isShowPopupDetail.BookingRequestDetail"
    :formModel="isShowPopupDetail.data"
  ></booking-request-detail>
   <booking-response
    v-if="isShowPopupDetail.BookingResponse"
    :formModel="isShowPopupDetail.data"
  ></booking-response>
  <booking-response-detail
    v-if="isShowPopupDetail.BookingResponseDetail"
    :formModel="isShowPopupDetail.data"
  ></booking-response-detail>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  methods,
  nextTick,
  ref,
  watch,
} from "@vue/runtime-core";
import ColumnType from "@/assets/js/constant/ColumnType.js";
import commonFunction from "@/assets/js/commons/commonFunction.js";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
import moment from "moment";
export default {
  name: "MsTd",
  components: {
    VTooltip,
    VCheckbox,
  },
  props: {
    config: {
      default: {},
    },
    value: {
      default: null,
    },
    objData: {
      default: {},
    },
  },
  emits: ["checkBoxAll", "update:value"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = ref(props.value);

    onMounted(() => {
      watch(
        () => data.value,
        (newVal) => {
          proxy.$emit("update:value", newVal);
        }
      );

      watch(
        () => proxy.value,
        (newVal) => {
          proxy.data = newVal;
        }
      );
    });

    const isShowPopupDetail = reactive({});
    const isShowPopupMess = reactive({});

    /**
     * Định dạng ngày tháng
     * NNNINH (29/12/2022)
     * @param {string} date số tiền
     */

    function formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    }

    const setTooltipDisplay = () => {
      let offset = proxy.$refs.td.getBoundingClientRect();
      if (proxy.text.length > offset.width) {
        return proxy.text;
      } else return "";
    };
    // Xét style cho td
    const styles = computed(() => {
      let arr = [];
      if (props.config.width) {
        arr.push("width: " + props.config.width + "px;");
        arr.push("min-width: " + props.config.width + "px;");
        arr.push("max-width: " + props.config.width + "px;");
      }
      if (props.config.minWidth) {
        arr.push("min-width: " + props.config.minWidth + "px;");
      }
      if (props.config.color) {
        arr.push("color: " + props.config.color);
      }

      return arr.join("; ");
    });

    // Show giá trị value td
    const showValue = () => {
      let rs = "";
      switch (props.config.type) {
        case ColumnType.Text:
          rs = props.value || "";
          break;
        case ColumnType.Number:
          if (props.value == 0) {
            rs = 0;
          } else {
            rs = commonFunction.formatNumber(props.value);
          }
          break;
        case ColumnType.TextLink:
          rs = props.value || "";
          break;
        case ColumnType.TextHtml:
          rs = proxy.handleHtml((rs = props.value || ""));
          break;
        case ColumnType.Date:
          rs = proxy.formatDate(props.value);
          break;
        case ColumnType.Status:
          rs = proxy.formatStatus(props.value);
          break;
      }
      return rs;
    };

    const formatStatus = (status) => {
      let rs = "";
      if (status == true) {
        rs = "Đã ghi tăng";
      } else {
        rs = "Chưa ghi tăng";
      }
      return rs;
    };

    // Giá trị hiện lên Dom
    const text = computed(() => showValue());

    const cls = computed(() => {
      let rs = [];

      switch (props.config.type) {
        case ColumnType.Checkbox:
          rs.push("text-center");
          break;
        case ColumnType.Number:
          rs.push("text-right");
          break;
        case ColumnType.Date:
          rs.push("text-center");
          break;
      }

      return rs.join(" ");
    });

    const handleClickLink = (component, val) => {
      proxy.isShowPopupDetail[component] = component;
      proxy.isShowPopupDetail.data = val;
    };
    const handleCommandClick = (component, objData, val, cmd) => {
      if (cmd.command == 0) {
        proxy.isShowPopupDetail[component] = component;
        proxy.isShowPopupDetail.data = val;
      }
      if (cmd.command == 1) {
        proxy.isShowPopupMess.show = true;
        proxy.isShowPopupMess.valueMessageBox = `Bạn có muốn xóa <b>${
          objData[cmd.field]
        } </b> không?`;
      }
    };
    const handleClickCheckbox = (data) => {
      emit("checkBoxAll", data);
    };

    const handleHtml = (val) => {
      let innerHtml = "";
      switch (val) {
        case "New":
          innerHtml = `<span class='badge bg-secondary'>Mới</span>`;
          break;
        case "Sent":
          innerHtml = `<span class='badge bg-warning text-dark'>Gửi yêu cầu</span>`;
          break;
        case "Responseded":
          innerHtml = `<span class='badge bg-primary'>Đã phản hồi</span>`;
          break;
        case "Confirm":
          innerHtml = `<span class='badge bg-info text-dark'>Xác nhận</span>`;
          break;
        case "Attached":
          innerHtml = `<span class='badge bg-attached text-attached'>Đính kèm</span>`;
          break;
        case "Cancel":
          innerHtml = `<span class='badge bg-danger'>Hủy bỏ</span>`;
          break;
        case "Finish":
          innerHtml = `<span class='badge bg-success'>Hoàn thành</span>`;
          break;
        default:
          break;
      }
      return innerHtml;
    };

    //Căn chỉnh nội dung bên trái,phải hay center
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
      cls,
      Resource,
      data,
      setTooltipDisplay,
      styleAlign,
      formatDate,
      formatStatus,
      handleClickCheckbox,
      handleHtml,
      handleClickLink,
      isShowPopupDetail,
      handleCommandClick,
      isShowPopupMess,
    };
  },
};
</script>

<style lang="scss" scope="">
.action-group {
  display: flex;
  justify-content: center;

  .icon {
    cursor: pointer;
    margin: 0 4px;
  }
}

.th-inner {
  font-size: 13px;
}

.td-inner {
  font-size: 13px;
  max-width: 248px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
}
.ms-tr {
  .text-center {
    height: 100%;
    &:first-child {
      margin-left: -3px;
    }
  }
}
.text-align__center {
  text-align: center;
}
.inline-block {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
td {
  padding: 8px;
  height: 39px;
  border-right: 1px solid #ccc;
}
th {
  padding: 8px;
}
.text_link {
  text-decoration: underline;
  padding: 4px;
  color: black;
  transition: box-shadow 0.4s, color 0.3s;
  color: rgb(0, 140, 255);
}

.text_link:hover {
  color: rgb(50, 154, 240);
  text-decoration: none;
}
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  &.bg-primary {
    background-color: #0d6efd !important;
  }

  &.bg-secondary {
    background-color: #6c757d !important;
  }

  &.bg-success {
    background-color: #198754 !important;
  }

  &.bg-info {
    background-color: #0dcaf0 !important;
  }

  &.bg-warning {
    background-color: #ffc107 !important;
  }

  &.bg-danger {
    background-color: #dc3545 !important;
  }

  &.bg-light {
    background-color: #f8f9fa !important;
  }

  &.bg-dark {
    background-color: #212529 !important;
  }

  &.bg-body {
    background-color: #fff !important;
  }

  &.bg-white {
    background-color: #fff !important;
  }

  &.bg-transparent {
    background-color: transparent !important;
  }

  &.bg-gradient {
    background-image: var(--bs-gradient) !important;
  }
}
.btn_delete {
  margin-left: 10px;
}
</style>
