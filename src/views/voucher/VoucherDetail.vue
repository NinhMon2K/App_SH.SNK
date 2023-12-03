<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent" v-show="isShowPopupDetail">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">{{ title }} chứng từ ghi tăng</div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              ref="btnClose"
              @click="handlePopupClose"
              class="form-asset__close app-icon ic-close"
            ></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="voucher-detaill">
              <div class="voucher-detaill__title"><p>Thông tin chứng từ</p></div>
              <div class="voucher-detaill__content">
                <div class="detaill__content-top">
                  <div class="form-group">
                    <v-input
                      label="Mã chứng từ"
                      tabindex="101"
                      hasLabel
                      hasInput
                      placeholder="Nhập mã chứng từ"
                      ref="voucher_code"
                      :maxLength="50"
                      :radius="false"
                      v-model="dataForm.voucher_code"
                      :valueField="ResourceTable.FieldVoucher.voucherCode"
                      :disabledMessage="errorMessage.voucher_code && isSubmited"
                      :message="Resource.ErrorInput.VoucherCode.VI"
                      @blur="onBlurInput"
                    ></v-input>
                  </div>
                  <div class="form-group">
                    <v-input-date
                      label="Ngày chứng từ"
                      hasLabel
                      hasInput
                      tabindex="102"
                      rightIcon="ic-date"
                      :radius="true"
                      v-model="dataForm.voucher_date"
                      :valueField="ResourceTable.FieldVoucher.voucherDate"
                      :disabledMessage="errorMessage.voucher_date && isSubmited"
                      :message="Resource.ErrorInput.VoucherDate.VI"
                      @changeValue="handleChangeDate"
                    ></v-input-date>
                  </div>
                  <div class="form-group">
                    <v-input-date
                      label="Ngày ghi tăng"
                      hasLabel
                      hasInput
                      tabindex="103"
                      rightIcon="ic-date"
                      :radius="true"
                      v-model="dataForm.increment_date"
                      :valueField="ResourceTable.FieldVoucher.incrementDate"
                      :disabledMessage="errorMessage.increment_date && isSubmited"
                      :message="Resource.ErrorInput.IncrementDate.VI"
                      @changeValue="handleChangeDate"
                    ></v-input-date>
                  </div>
                </div>
                <div class="detaill__content-bottom">
                  <v-input
                    label="Ghi chú"
                    tabindex="104"
                    hasLabel
                    :maxLength="50"
                    :radius="false"
                    v-model="dataForm.description"
                  ></v-input>
                </div>
              </div>
            </div>
            <div class="voucher__assets-details--title">
              <p>Thông tin chi tiết</p>
            </div>
            <div class="voucher__assets-details">
              <div class="details__toolbars">
                <div class="details__toolbars--left">
                  <v-input
                    id="txt-search"
                    :hasLabel="false"
                    :radius="true"
                    leftIcon="ic-search"
                    v-model="txtSearch"
                    placeholder="Tìm kiếm theo mã, tên tài sản"
                    @keyup="handleChangeSearch"
                    :disabledMessage="false"
                    tabindex="105"
                  ></v-input>
                </div>
                <div class="details__toolbars--right">
                  <v-button
                    tabindex="106"
                    text="Chọn tài sản"
                    @click="handleShowPopupSelect"
                    type="secodary"
                    radius
                  ></v-button>
                </div>
              </div>
              <div class="details__tables">
                <div class="form_container--table">
                  <v-grid
                    :columns="columns"
                    :allData="selectedData"
                    :selectedCol="false"
                    :dataTotal="dataTotal"
                    v-model:active="active"
                    :disableFooter="true"
                    :selectedRow="true"
                    :search="filterSelected"
                    ref="table"
                    @handleEventTable="handleEventTable"
                    v-model:selectedData="dataSelected"
                    @currentPage="handleTotalPage"
                    @changeTabView="handleChangeTab"
                  >
                  </v-grid>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                      @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy bỏ" placement="top" right="top">
              <v-button
                text="Hủy bỏ"
                tabindex="112"
                type="secodary"
                ref="btnClosePopup"
                @click="handlePopupClose"
                radius
              >
              </v-button>
            </v-tooltip>
            <!-- Buttom lưu dữ liệu
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Lưu và cất" placement="top" right="top">
              <v-button
                text="Lưu"
                tabindex="111"
                @click="saveData"
                radius
                :disabled="false"
              ></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>
  <voucher-select-assets
    @closePopupSelect="handleClosePopupSelect"
    @SelectedData="handleSelectedData"
    :dataAssetDetaill="selectedData"
    v-if="isShowPopupSelect"
  ></voucher-select-assets>

  <!-- Cập nhật ngân sách -->
  <voucher-update-asset
    :formModel="pram"
    v-model="selectedData[detailIndex]"
    @hideDialog="handleClosePopupUpdate"
    v-if="isShowPopupUpdate"
  ></voucher-update-asset>

  <!-- Hiển thị thông báo error multiple
         @author NNNINH (04/01/2023) -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :disabledTop="false"
      :disabled="false"
      disabledLeftMultiple
      :valueMultiple="titleErrValidate"
      :disabledMultiple="true"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isShowDialogDetail"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="handleCloseErrorMultiple"
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Hiển thị thông báo cập nhât
         @author NNNINH (22/11/2022) -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessUpdate"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Save.VI"
        @click="saveData"
        radius
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoSave.VI"
        type="abort"
        @click="handleClosePopup"
        radius
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Cancel.VI"
        type="secodary"
        @click="closeProValidate"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog messagebox hủy bỏ khai báo
     @author NNNINH (05/01/2023) -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.AddVoucher.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelAdd"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Cancel.VI"
        radius
        @click="handleClosePopup"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="
          isDialogMessCancelAdd = false;
          focusFirst();
        "
        radius
      ></v-button>
    </v-message-box>
  </teleport>
</template>

<style lang="scss" scoped></style>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  nextTick,
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VInput from "@/components/input/VInput.vue";
import VGrid from "@/components/grid/VGrid.vue";
import voucherAPI from "@/apis/api/voucherAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import VLoading from "@/components/loading/VLoading.vue";
import VInputDate from "@/components/date/VInputDate.vue";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
import VoucherSelectAssets from "./VoucherSelectAssets.vue";
import VoucherUpdateAsset from "./VoucherUpdateAsset.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import _ from "lodash";
export default {
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
    dataAssetDetaill: {
      default: [],
    },
  },
  components: {
    VButton,
    VTooltip,
    VInput,
    VGrid,
    VLoading,
    VInputDate,
    VoucherSelectAssets,
    VoucherUpdateAsset,
    VMessageBox,
  },
  emits: ["handle-close", "show-message"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.popupVoucherDetail = proxy;
    const isLoading = ref(false);
    const txtSearch = ref("");
    const currentPage = ref(0);
    const tableView = ref(0);
    const active = ref(-1);
    const dataSelected = ref([]);
    const isShowPopupDetail = ref(true);
    const isShowPopupSelect = ref(false);
    const isShowPopupUpdate = ref(false);
    const detailIndex = ref(0);
    const oldDataForm = ref({});
    const title = ref("");
    let pram = ref({});
    const dataTotal = ref({});
    const dataVoucherDetail = ref([]);
    const selectedData = ref([]);
    const titleErrValidate = ref([]);
    const errorMessage = ref([]);
    const isShowDialogDetail = ref(false);
    const oldDataAssetSelect = ref([]);
    const isSubmited = ref(false);
    const isDialogMessUpdate = ref(false);
    const isDialogMessCancelAdd = ref(false);
    const dataDeleteSelected = ref([]);
    // Lưu dữ liệu 1 tài sản
    const dataForm = ref({});
    const EqualDataSelect = computed(() => {
      return _.isEqual(proxy.selectedData, proxy.oldDataAssetSelect);
    });

    /**
     * Xử lý sự kiện required dữ liệu data chứng từ
     *  @author NNNinh(12/01/2023)
     */
    const dataFormValidate = computed(() => {
      return {
        voucher_code: { required },
        voucher_date: { required },
        increment_date: { required },
      };
    });

    const v$ = useValidate(dataFormValidate, dataForm);

    /**
     * Xử lý sự kiện click button chọn tài sản
     *  @author NNNinh(12/01/2023)
     */
    const handleShowPopupSelect = () => {
      proxy.isShowPopupDetail = false;
      proxy.isShowPopupSelect = true;
    };

    /**
     * Xử lý sự kiện change số bản ghi hiện lên
     *  @author NNNinh(12/01/2023)
     */
    const handleChangeTab = (val) => {
      proxy.tableView = val;
    };

    // Sự kiện change page number
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
    };

    onMounted(() => {
      proxy.focusFirst();
    });

    onMounted(() => {
      if (proxy.selectedData.length > 0) {
        proxy.dataTotal.totalCount = proxy.selectedData.length;
      } else {
        proxy.dataTotal.totalCount = 0;
      }
    });

    onMounted(() => {
      try {
        /**
         * Kiểm tra giá trị mode là add hay cập nhật,nhân bản
         *  @author NNNinh(17/10/2021)
         */
        switch (proxy.formModel.mode) {
          //Kiểm tra giá trị mode là cập nhật
          case Enum.Mode.Update:
            proxy.title = Resource.Title.Edit;
            // Lấy dữ liệu chứng từ theo id chứng từ
            proxy.dataAssetDetaill.forEach((x) => (x.flag = 0));
            proxy.selectedData = proxy.dataAssetDetaill;
            proxy.dataForm = _.cloneDeep(proxy.allData);
            proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
            proxy.oldDataAssetSelect = _.cloneDeep(proxy.selectedData);
            break;
          //Kiểm tra giá trị mode là thêm
          case Enum.Mode.Add:
            proxy.title = Resource.Title.Add;
            proxy.defaultValue();
            proxy.getVoucherNextCode();
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    });

    watch(
      () => selectedData.value,
      (newVal) => {
        proxy.focusFirst();
      }
    );

    watch(
      () => selectedData.value,
      (newVal) => {
        let SumDepreciationYear = 0;
        let SumDepreciationResidual = 0;
        let Sumcost = 0;
        proxy.selectedData.forEach((x, i) => {
          SumDepreciationYear += x.depreciation_year;
          SumDepreciationResidual += x.depreciation_residual;
          Sumcost += x.cost;
        });
        proxy.dataTotal.totalCount = proxy.selectedData.length; // Lấy giá trị tổng số bản ghi
        proxy.dataTotal.cost = Sumcost; // Lấy giá trị tổng số nguyên giá
        proxy.dataTotal.depreciation_year = SumDepreciationYear; // Lấy tổng số khấu hao hao mòn lũy kế
        proxy.dataTotal.depreciation_residual = SumDepreciationResidual; // Lấy tổng số giá trị còn lại
      },
      { deep: true }
    );

    /**
     * Lấy mã tài sản tự động tăng
     *  @author NNNinh(21/10/2021)
     */
    async function getVoucherNextCode() {
      try {
        let result = await voucherAPI.get("Vouchers/NextCode", {});
        proxy.dataForm.voucher_code = result?.code;
        proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Xét giá trị mặc định cho ngày chứng từ và ngày ghi tăng
     * @author NNNINH (01/01/2023)
     */
    const defaultValue = () => {
      nextTick(() => {
        // xét giá trị ban đầu cho ngày chứng từ
        if (proxy.dataForm.voucher_date == "") {
          proxy.dataForm.voucher_date = new Date().toDate();
        }
        // xét giá trị ban đầu cho ngày ghi tăng
        if (proxy.dataForm.increment_date == "") {
          proxy.dataForm.increment_date = new Date().toDate();
        }
      });
    };

    /**
     * Xử lý sự kiện đóng popup sửa nguồn ngân sách
     * @author NNNINH (01/01/2023)
     */
    const handleClosePopupUpdate = () => {
      proxy.isShowPopupUpdate = false;
    };

    /**
     * Xử lý sự kiện đóng popup chọn tài sản
     * @author NNNINH (01/01/2023)
     */
    const handleClosePopupSelect = () => {
      proxy.isShowPopupSelect = false;
      proxy.isShowPopupDetail = true;
      setTimeout(() => {
        proxy.$refs.voucher_code.focusInput();
      }, 10);
    };

    // Sự kiện đóng close popup kiểm tra có sửa dữ liệu hay không
    const handlePopupClose = () => {
      if (proxy.formModel.mode == Enum.Mode.Update) {
        if (proxy.EqualData && proxy.EqualDataSelect) {
          emit("handle-close");
        } else {
          proxy.isDialogMessUpdate = true;
        }
      } else {
        if (proxy.EqualData && proxy.EqualDataSelect) {
          emit("handle-close");
        } else {
          proxy.isDialogMessCancelAdd = true;
        }
      }
    };

    /**
     * Sự kiện click chức năng xóa tài sản khỏi table nhưng k gọi api
     * @param {object} item Đối tượng cần xóa trong mảng
     * @author NNNinh (01/01/2023)
     */
    const handleRemoveData = (item) => {
      let i = proxy.selectedData.findIndex(
        (x) => x["fixed_asset_id"] == item["fixed_asset_id"]
      );
      proxy.selectedData.splice(i, 1);
      var indexOldDataSelect = proxy.oldDataAssetSelect.findIndex(
        (x) => x["fixed_asset_id"] == item["fixed_asset_id"]
      );
      if (indexOldDataSelect != -1) {
        item.flag = 3;
        proxy.dataDeleteSelected.push(item);
      }
      proxy.selectedData.forEach((x, index) => (x.STT = index + 1));
    };

    /**
     * Sự kiện click chức năng sửa hay nhân bảnS
     * @param {string} action xác định cho form là sửa hay nhân bản
     * @param {string} val giá trị mã tài sản
     * @author NNNinh (01/01/2023)
     */
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: // kiểm tra action = 0 là sửa
          proxy.pram.mode = proxy.formModel.mode;
          var index = proxy.selectedData.findIndex(
            (x) => x["fixed_asset_id"] == val["fixed_asset_id"]
          );
          proxy.detailIndex = index;
          proxy.isShowPopupUpdate = true;
          break;
        case 2: // kiểm tra action = 2 là xóa
          proxy.handleRemoveData(val);
          break;
      }
    };

    async function getVoucherDetail(assetId) {
      try {
        let result = await voucherAPI.getVoucherDetail(
          "Vouchers",
          proxy.dataForm.voucher_id,
          assetId.fixed_asset_id
        );
        if (result != null || result != "") {
          return result;
        } else return false;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
            break;
          case 404:
            proxy.backEndErrorNotify(Resource.ErrorCode[404]);
            break;
          case 405:
            proxy.backEndErrorNotify(Resource.ErrorCode[405]);
            break;
          case 500:
            proxy.backEndErrorNotify(Resource.ErrorCode[500]);
            break;
          default:
        }
      }
    }

    /**
     * Gọi API thêm mới chứng từ
     *  @author NNNinh(11/01/2023)
     */
    async function handleInsertVoucher() {
      try {
        let obj = {
          voucher: proxy.dataForm,
          listAssetDetail: proxy.selectedData,
        };
        let result = await voucherAPI.post("Vouchers/addVouchers", obj);
        if (result != null || result != "") {
          proxy.titleErrValidate = []; // reset lại title error validate
          return result;
        } else return false;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
            break;
          case 404:
            proxy.backEndErrorNotify(Resource.ErrorCode[404]);
            break;
          case 405:
            proxy.backEndErrorNotify(Resource.ErrorCode[405]);
            break;
          case 500:
            proxy.backEndErrorNotify(Resource.ErrorCode[500]);
            break;
          default:
        }
      }
    }

    /**
     * API Sửa dữ liệu chứng từ detail
     *  @author NNNinh(12/01/2023)
     */
    async function handleUpdateVoucherDetail() {
      try {
        let obj = {
          voucher: proxy.dataForm,
          listAssetDetail: proxy.dataVoucherDetail,
        };
        let result = await voucherAPI.backUpdateVoucherDetail(
          "Vouchers/detail/batch-update",
          proxy.dataForm["voucher_id"],
          obj
        );
        if (result != null || result != "") {
          proxy.titleErrValidate = [];
          return result;
        } else return false;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
            break;
          case 404:
            proxy.backEndErrorNotify(Resource.ErrorCode[404]);
            break;
          case 405:
            proxy.backEndErrorNotify(Resource.ErrorCode[405]);
            break;
          case 500:
            proxy.backEndErrorNotify(Resource.ErrorCode[500]);
            break;
          default:
        }
      }
    }

    /**
     * Hiện thị cảnh báo lỗi truyền từ BackEnd
     * @author NNNinh(13/01/2023)
     */
    const backEndErrorNotify = (moreInfo) => {
      proxy.titleErrValidate = [];
      if (moreInfo != null) {
        moreInfo.forEach((data) => {
          proxy.titleErrValidate.push(data);
        });
      } else {
        proxy.titleErrValidate = [];
      }
    };

    /**
     * Xử lý sự kiện dblclick table,F2,Ctrl+Insert
     * @author NNNinh (19/11/2022)
     */
    const handleEventTable = (mode, data) => {
      proxy.pram.mode = mode;
      var index = proxy.selectedData.findIndex(
        (x) => x["fixed_asset_id"] == data["fixed_asset_id"]
      );

      if (index < 0) {
        proxy.selectedData.push(data);
        index = proxy.selectedData.length - 1;
      }
      proxy.detailIndex = index;
      proxy.isShowPopupUpdate = true;
    };

    /**
     *  Validate dữ liệu
     * @author NNNINH (12/01/2023)
     */
    const validateData = () => {
      proxy.v$.$validate();
      if (proxy.v$.$error) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        if (proxy.v$.voucher_code.$error) {
          proxy.titleErrValidate.push("Mã chứng từ không được để trống");
          proxy.errorMessage.voucher_code = true;
        }
        if (proxy.v$.voucher_date.$error) {
          proxy.titleErrValidate.push("Ngày chứng từ không được bỏ trống");
          proxy.errorMessage.voucher_date = true;
        }
        if (proxy.v$.increment_date.$error) {
          proxy.titleErrValidate.push("Ngày ghi tăng không được bỏ trống");
          proxy.errorMessage.increment_date = true;
        }

        return false;
      } else if (proxy.selectedData.length == 0) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Chọn ít nhất 1 tài sản.");
        return false;
      } else {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        return true;
      }
    };
    const filterSelected = ref([]);

    const handleChangeSearch = (e) => {
      if (e.which == Enum.KeyCode.ENTER) {
        if (proxy.txtSearch != "") {
          proxy.filterSelected = [
            {
              field: "fixed_asset_code",
              value: proxy.txtSearch,
            },
            {
              field: "fixed_asset_name",
              value: proxy.txtSearch,
            },
          ];
        } else {
          proxy.filterSelected = [];
        }
      }
    };

    /**
     * Sự kiện close error message Multiple
     *  @author NNNinh(18/10/2021)
     */
    const handleCloseErrorMultiple = () => {
      if (proxy.formModel.mode == Enum.Mode.Update) {
        proxy.isShowDialogDetail = false;
        proxy.isSubmited = true;
        proxy.focusFirst();
      }
      proxy.isSubmited = true;
      proxy.isShowDialogDetail = false;
      proxy.focusFirst();
    };

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (13/01/2023)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.ESC) {
        if (proxy.isShowDialogDetail == true) {
          proxy.handleCloseErrorMultiple();
        } else if (proxy.isDialogMessUpdate == true) {
          proxy.closeProValidate();
        } else {
          proxy.handlePopupClose();
        }
      } else if (e.which == Enum.KeyCode.Ctrl) {
        proxy.ctrlPressed = true;
      } else if (e.which == Enum.KeyCode.F8 && proxy.ctrlPressed == true) {
        proxy.saveData();
        proxy.ctrlPressed = false;
      } else if (e.which == Enum.KeyCode.Q && proxy.ctrlPressed == true) {
        proxy.saveData();
        proxy.ctrlPressed = false;
      } else if (e.which == Enum.KeyCode.Insert && proxy.ctrlPressed == true) {
        proxy.isShowPopupSelect = true;
      } else if (e.which == Enum.KeyCode.F9 && proxy.ctrlPressed == true) {
        proxy.handlePopupClose();
        proxy.ctrlPressed = false;
      }
    };

    /**
     * Xử lý sự kiện click lưu chứng từ
     *  @author NNNinh(12/01/2023)
     */
    const saveData = async () => {
      try {
        if (proxy.validateData() == false) {
          proxy.isShowDialogDetail = true;
        } else {
          let sumOldCost = 0;
          proxy.selectedData.forEach((x) => {
            sumOldCost += x.oldCost ? x.oldCost : x.cost;
          });
          proxy.dataForm.cost = sumOldCost;
          if (proxy.formModel.mode == Enum.Mode.Update) {
            if (proxy.EqualData == false || proxy.EqualDataSelect == false) {
              proxy.dataVoucherDetail = [
                ...proxy.selectedData,
                ...proxy.dataDeleteSelected,
              ];

              let res = await proxy.handleUpdateVoucherDetail();
              if (res && proxy.titleErrValidate.length == 0) {
                emit("handle-close");
                emit("show-message", proxy.formModel.mode, res);
              } else {
                proxy.isShowDialogDetail = true;
              }
            } else {
              proxy.titleErrValidate = [];

              proxy.titleErrValidate.push("Dữ liệu chưa được chỉnh sửa");
              proxy.isShowDialogDetail = true;
            }
          } else {
            let res = await proxy.handleInsertVoucher();
            if (res && proxy.titleErrValidate.length == 0) {
              emit("handle-close");
              emit("show-message", proxy.formModel.mode, res);
            } else {
              proxy.isShowDialogDetail = true;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     *  Sự kiện blur của input
     * @author NNNINH (04/01/2023)
     */
    const onBlurInput = (isValue, valueField, e) => {
      switch (valueField) {
        case ResourceTable.FieldVoucher.voucherCode:
          // Kiểm tra có phải là tên tài sản hay không
          if (isValue != "") {
            proxy.errorMessage.voucher_code = false;
            proxy.dataForm.voucher_code = isValue;
          } else {
            proxy.errorMessage.voucher_code = true;
          }
          break;
        default:
          break;
      }
    };

    /**
     *  Xử lý sự kiện change value của ngày mua và ngày sử dụng
     * @author NNNINH (04/01/2023)
     */
    const handleChangeDate = (val, field) => {
      switch (field) {
        case ResourceTable.FieldVoucher.voucherDate:
          if (val == null) {
            proxy.errorMessage.voucher_date = true;
          } else {
            proxy.errorMessage.voucher_date = false;
          }

          break;
        case ResourceTable.FieldVoucher.incrementDate:
          if (val == null) {
            proxy.errorMessage.increment_date = true;
          } else {
            proxy.errorMessage.increment_date = false;
          }
          break;
      }
    };

    /**
     * focus vào input dầu tiên
     *  @author NNNinh(01/01/2023)
     */
    const focusFirst = () => {
      proxy.$refs.voucher_code.$el.getElementsByTagName("input")[0].focus();
      // proxy.$refs.voucher_code.focusInput();
    };

    /**
     * Hàm so sánh dữ liệu chứng từ trước và sau khi sửa có thay đổi hay không
     *  @author NNNinh(01/01/2023)
     */
    const EqualData = computed(() => {
      return _.isEqual(proxy.dataForm, proxy.oldDataForm);
    });

    /**
     * Xử lý sự kiện emit dữ liệu ra ngoài khi chọn tài sản
     *  @author NNNinh(12/01/2023)
     */
    const handleSelectedData = (dataSelecteds) => {
      if (proxy.selectedData.length > 0) {
        dataSelecteds.forEach((x, i) => {
          x.STT = proxy.selectedData.length + 1;
          proxy.selectedData.push(x);
        });
      } else {
        dataSelecteds.forEach((x, i) => {
          x.STT = i + 1;
          proxy.selectedData.push(x);
        });
      }
      proxy.focusFirst();
    };

    /**
     * Xác nhận đóng cảnh báo validate nghiệp vụ
     * @author NNNINH (25/11/2022)
     */
    const closeProValidate = () => {
      proxy.isDialogMessUpdate = false;
      proxy.focusFirst();
    };

    /**
     *  Xử lý sự kiện đóng popup k kiểm tra điều kiện
     * @author NNNINH (25/11/2022)
     */
    const handleClosePopup = () => {
      emit("handle-close");
    };
    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * @author NNNinh(01/01/2023)
     */
    const columns = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 40,
        align: "Center",
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCode,
        title: ResourceTable.lblTableAssets.lblAssetCode,
        type: "Text",
        align: "Left",
        width: 90,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 130,
      },

      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 180,
      },

      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        summary: "sum",
        align: "Right",
        width: 140,
      },
      {
        field: ResourceTable.FieldAsset.depreciationYear,
        title: "Hao mòn năm",
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 140,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 140,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetId,
        type: "Action",
        position: "absolute",
        action: [
          {
            command: 0,
            icon: "ic-edit",
            click: clickMenu,
          },
          {
            command: 2,
            icon: "ic-delete__toolbar",
            click: clickMenu,
          },
        ],
      },
    ]);
    return {
      title, // Tiêu đề popup là thêm hay sửa
      columns, // Mảng xác định các cột, trường dữ liệu của table
      isLoading, // loading trang
      txtSearch, // Biến dữ liệu tìm kiếm tài sản
      currentPage, // Trang đang chọn, đang đứng hiện tại
      tableView, // Số bản ghi muốn hiện lên trong 1 trang
      active, // active vào dòng được thêm hoặc sửa trong table
      dataSelected, // Mảng lấy dữ liệu những dòng checked
      clickMenu, // Xử lý sự kiện click chức năng thêm hay xóa
      pram, // Đối tượng xác định là thêm mới, nhân bản, sử tài sản
      dataTotal, // Đối tượng lấy tổng số bản ghi, số lượng, nguyên giá, hao mòn lũy kế,tổng số còn lại
      handleTotalPage, // Sự kiện change trang trong pageding
      handleChangeTab, // Xử lý sự kiện change dữ liệu tabview
      isShowPopupDetail, // Biến xác định có hiện popup sửa ngân sách hay không
      handleShowPopupSelect, // Xử lý sự kiện click button chọn tài sản
      isShowPopupSelect, // Biến xác định có hiện popup chọn tài sản để chứng từ hay không
      isShowPopupUpdate, // Biến xác định có hiện popup sửa nguồn hình thành ngân sách hay không
      dataForm, //  Đối tượng lưu trữ 1 chứng từ
      defaultValue, // Xét giá trị mặc định cho ngày chứng từ và ngày ghi tăng
      getVoucherNextCode, // Lấy mã tài sản tự động tăng
      handleClosePopupSelect, // Xử lý sự kiện đóng popup chọn tài sản
      handleClosePopupUpdate, // Xử lý sự kiện đóng popup sửa nguồn ngân sách
      handleSelectedData, // Xử lý sự kiện emit dữ liệu ra ngoài khi chọn tài sản
      selectedData, // Mảng lưu trữ dữ liệu các tài sản cần chứng từ
      oldDataForm, // Đối tượng lưu trữ 1 chứng từ trước khi sửa
      EqualData, // Hàm so sánh dữ liệu chứng từ trước và sau khi sửa có thay đổi hay không
      handleEventTable, // Xử lý sự kiện thò event của table
      titleErrValidate, // Mảng dữ liệu titile error validate
      errorMessage, // Đối tượng lưu trữ error dữ liệu có lỗi hay không
      v$,
      validateData, // // Hàm xử lý Validate dữ liệu
      saveData, // Xử lý xự kiện lưu dữ liệu chứng từ
      isShowDialogDetail, // Biến đóng popup
      Resource,
      ResourceTable,
      handleCloseErrorMultiple, // Sự kiện close error message Multiple
      isSubmited, // Kiểm tra xem có submid hay không
      onBlurInput, // Hàm xử lý sự kiện blue của input
      handleChangeDate, // Hàm xử lý sự kiện change value của ngày
      handlePopupClose, // Sự kiện đóng close popup kiểm tra có sửa dữ liệu hay không
      oldDataAssetSelect, // Mảng lưu trữ tài sản đã chứng từ trước khi sửa
      EqualDataSelect, // Hàm so sáng dữ liệu tài sản đã chứng từ và chưa chứng từ
      isDialogMessUpdate, // Biến có hiện thị popup sửa nguồn ngân sách hay không
      closeProValidate, // Xác nhận đóng cảnh báo validate nghiệp vụ
      handleClosePopup, // Xử lý sự kiện đóng popup k kiểm tra điều kiện
      handleRemoveData, // Hàm xử lý sự kiện xóa 1 tài sản khỏi table nhưng không gọi api
      dataDeleteSelected, // Mảng đối tượng lấy những tài sản đã được chứng từ khỏi table
      focusFirst, // Focus vào input đầu tiên của popup
      isDialogMessCancelAdd, // Biến có hiển thị cảnh báo hủy hay không
      handleInsertVoucher, // Gọi API thêm mới chứng từ
      detailIndex, // Vị trí tài sản trong bảng table
      handleUpdateVoucherDetail, // API Sửa dữ liệu chứng từ detail
      dataVoucherDetail, // Mảng đối tượng sau cùng để sửa 1 tài sản
      keyboardEvent, // Xử lý sự kiến bắt key bàn phím
      backEndErrorNotify, //  Hiện thị cảnh báo lỗi truyền từ BackEnd
      getVoucherDetail,
      handleChangeSearch,
      filterSelected,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/VoucherDetail.scss";
</style>
