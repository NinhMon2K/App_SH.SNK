<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">Chi tiết yêu cầu đặt tàu</div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              ref="btnClose"
              class="form-asset__close app-icon ic-close"
              @click="handlePopupClose"
              @keydown.enter="handlePopupClose"
            ></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="container_content_pop">
              Thông tin chi tiết yêu cầu đặt tàu
            </div>
            <div class="form-group"></div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Số yêu cầu <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.RequestNumber }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Liên hệ người gửi hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.SupplierContact }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Trạng thái <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span v-html="handleHtml(formModel.Status)"></span>
                  </div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Thời gian hàng hóa sẵn sàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formatDate(formModel.ReadyTime) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Hợp đồng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.ContractNumber }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Cảng chất hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.PortLoading }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Hàng hóa <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.ItemName }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Cảng dỡ hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{
                      bindingPortDischarge(formModel.PortDischarge)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Người giao hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.SupplierName }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Yêu cầu khác <span class="red"> *</span> :
                  </div>
                  <div class="text-content">
                    <span>{{ formModel.Note }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="container_content_pop">Danh sách phản hồi</div>
            <div class="table_content_booking">
              <!-- Bảng dữ liệu tài sản -->
              <v-grid
                :columns="columns"
                :allData="dataBookingReponse"
                :selectedCol="false"
                :disableFooter="true"
                ref="table"
              >
              </v-grid>
            </div>
            <!-- --- -->
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Đóng"
                tabindex="112"
                ref="btnClosePopup"
                :width="100"
                @keydown.shift="focusWithShift"
                @keydown.tab="focusBack"
                @click="handlePopupClose"
                radius
              >
              </v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  onUnmounted,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
  onBeforeMount,
  onUpdated,
  nextTick,
  reactive,
} from "vue";
import { basePopup } from "@/assets/js/commons/baseDetailPopup.js";
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import { useBookingReponse } from "./bookingResponse";
import _ from "lodash";

export default {
  name: "MsPopupAsset",
  extends: basePopup,
  components: {},
  props: {
    // Xác định là form thêm, sửa, xóa
    formModel: {
      default: {},
    },
    // Đối tượng để lấy dữ liệu truyền từ table sang
    allData: {
      default: {},
    },
    // Đối tượng lấy dữ liệu và cập nhật lại dữ liệu
    modelValue: {
      default: {},
    },
    dataAll: {
      default: [],
    },
  },
  emits: ["handle-close", "show-message"],
  methods: {
    close() {
      this.$parent.close();
    },
  },
  setup(props, { emit }) {
    const bookingReponse = useBookingReponse(basePopup);
    return bookingReponse;
  },
};
</script>
<style lang="scss" scoped>
@import "./BookingResponse.scss";
.form-group_1 {
  width: 450px;
}
.form-group_2 {
  margin: 0 23px;
  width: 220px;
}
</style>
