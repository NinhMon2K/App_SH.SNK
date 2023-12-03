<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">Thông tin</div>
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
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Liên hệ người gửi hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
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
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Thời gian hàng hóa sẵn sàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
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
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Cảng chất hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
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
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Cảng dỡ hàng <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
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
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Yêu cầu khác <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
            </div>
            <div class="container_content_pop">
              Thông tin chi tiết yêu cầu đặt tàu
            </div>
            <div class="form-group_2"></div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Trạng thái <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right"></div>
            </div>

            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Tên nhà vận chuyển <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    ETA <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Closing Time <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Transit Day <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    ETD <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">
                    Demurrage <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <div class="item_pop">
                  <div class="control-label">
                    Term Of Delivery <span class="red"> *</span> :
                  </div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
              <div class="form-group__right">
                <div class="item_pop">
                  <div class="control-label">Agent Contact :</div>
                  <div class="text-content"><span>dsad</span></div>
                </div>
              </div>
            </div>
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
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import _ from "lodash";
import { useBookingReponseDetail } from "./bookingResponseDetail";
export default {
  name: "MsPopupAsset",
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
    const bookingReponseDetail = useBookingReponseDetail();
    return bookingReponseDetail;
  },
};
</script>
<style lang="scss" scoped>
@import "./BookingResponseDetail.scss";
.form-group_1 {
  width: 450px;
}
.form-group_2 {
  margin: 0 23px;
  width: 220px;
}
</style>
