<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">
            {{ title }}
          </div>
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
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã tài sản
                @author NNNINH (22/11/2022) -->
                <v-input
                  label="Mã tài sản"
                  tabindex="101"
                  hasLabel
                  hasInput
                  :maxLength="50"
                  ref="inputAssetCode"
                  :radius="false"
                  placeholder="Mã tài sản"
                  :disabledMessage="errorMessage.AssetCode && isSubmited"
                  :message="Resource.ErrorInput.AssetCode.VI"
                  v-model="dataForm.fixed_asset_code"
                ></v-input>
              </div>
              <div class="form-group__right">
                <!-- Nhập dữ liệu tên tài sản
                @author NNNINH (22/11/2022) -->
                <v-input
                  label="Tên tài sản"
                  tabindex="102"
                  hasLabel
                  :maxLength="255"
                  hasInput
                  :radius="true"
                  placeholder="Nhập tên tài sản"
                  :message="Resource.ErrorInput.AssetName.VI"
                  :disabledMessage="errorMessage.AssetName && isSubmited"
                  :valueField="ResourceTable.FieldAsset.fixedAssetName"
                  v-model="dataForm.fixed_asset_name"
                  @blur="onBlurInput"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã bộ phận sử dụng
                @author NNNINH (22/11/2022) -->
                <v-drop-down
                  label="Mã bộ phận sử dụng"
                  tabindex="103"
                  ref="cb"
                  hasLabel
                  hasInput
                  :heightCb="-25"
                  :columns="columnsDepartment"
                  v-model="dataForm.department_id"
                  :valueField="ResourceTable.FieldDepartment.departmentId"
                  displayField="department_code"
                  rightIcon="ic-angle-downs"
                  @blur="onBlurDropdown"
                  :dataAll="DataDepartment.value"
                  :disabledMessage="errorMessage.DepartmentCode && isSubmited"
                  :message="Resource.ErrorInput.DepartmentCode.VI"
                  placeholder="Chọn mã bộ phận sử dụng"
                  @item-click="onClickDataDropDown"
                ></v-drop-down>
              </div>
              <div class="form-group__right">
                <!-- Nhập dữ liệu tên bộ phận sử dụng
                @author NNNINH (22/11/2022) -->
                <v-input
                  label="Tên bộ phận sử dụng"
                  hasLabel
                  v-model="dataForm.department_name"
                  :hasReadonly="true"
                  :disabled="true"
                  :radius="true"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu mã loại tài sản
                @author NNNINH (22/11/2022) -->
                <v-drop-down
                  label="Mã loại tài sản"
                  ref="hu"
                  tabindex="104"
                  hasLabel
                  hasInput
                  :heightCb="-25"
                  v-model="dataForm.fixed_asset_category_id"
                  :valueField="ResourceTable.FieldAssetCategory.fixedAssetCategoryId"
                  displayField="fixed_asset_category_code"
                  @blur="onBlurDropdown"
                  rightIcon="ic-angle-downs"
                  :columns="columnsAssetCategory"
                  placeholder="Chọn mã loại tài sản"
                  :dataAll="DataAssetCategory.value"
                  @item-click="onClickDataDropDown"
                  :disabledMessage="errorMessage.AssetCategoryCode && isSubmited"
                  :message="Resource.ErrorInput.AssetCategoryCode.VI"
                ></v-drop-down>
              </div>
              <div class="form-group__right">
                <!-- Nhập dữ liệu tên loại tài sản
                @author NNNINH (22/11/2022) -->
                <v-input
                  label="Tên loại tài sản"
                  :hasReadonly="true"
                  hasLabel
                  v-model="dataForm.fixed_asset_category_name"
                  :disabled="true"
                  :radius="true"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu số lượng
                @author NNNINH (22/11/2022) -->
                <v-number
                  label="Số lượng"
                  tabindex="105"
                  hasLabel
                  hasInput
                  leftIcon
                  :disabledRight="true"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :valueField="ResourceTable.FieldAsset.quantity"
                  v-model="dataForm.quantity"
                  :radius="true"
                  :disabledMessage="errorMessage.Quantity && isSubmited"
                  :message="Resource.ErrorInput.Quantity.VI"
                  @blur="onBlurInputNumber"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0, max: 999999999999999999 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                >
                </v-number>
              </div>
              <div class="form-group__right">
                <!-- Nhập dữ liệu nguyên giá
                @author NNNINH (22/11/2022) -->
                <v-number
                  label="Nguyên giá"
                  tabindex="106"
                  hasLabel
                  hasInput
                  leftIcon
                  :disabledRight="false"
                  :valueField="ResourceTable.FieldAsset.cost"
                  v-model="dataForm.cost"
                  :radius="true"
                  :disabledMessage="errorMessage.Cost && isSubmited"
                  :message="Resource.ErrorInput.Cost.VI"
                  @blur="onBlurInputNumber"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0, max: 999999999999999999 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                >
                </v-number>

                <!-- Nhập dữ liệu số năm sử dụng
                @author NNNINH (22/11/2022) -->
                <v-number
                  label="Số năm sử dụng"
                  tabindex="107"
                  hasLabel
                  hasInput
                  leftIcon
                  :disabledRight="false"
                  v-model="dataForm.life_time"
                  :valueField="ResourceTable.FieldAssetCategory.lifeTime"
                  :radius="true"
                  :disabledMessage="errorMessage.LifeTime && isSubmited"
                  :message="Resource.ErrorInput.LifeTime.VI"
                  @blur="onBlurInputNumber"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                >
                </v-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu tỉ lệ hao mòn
                @author NNNINH (22/11/2022) -->
                <v-input-number
                  label="Tỉ lệ hao mòn (%)"
                  tabindex="108"
                  hasLabel
                  hasInput
                  leftIcon
                  :disabledRight="true"
                  v-model="dataForm.depreciation_rate"
                  :valueField="ResourceTable.FieldAssetCategory.depreciationRate"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationRate && isSubmited"
                  :message="titleErrorMess.DepreciationRate"
                  @blur="onBlurInputNumber"
                >
                </v-input-number>
              </div>
              <div class="form-group__right">
                <!-- Nhập dữ liệu giá trị hao mòn năm
                @author NNNINH (22/11/2022) -->
                <v-number
                  label="Giá trị hao mòn năm"
                  :hasLabel="true"
                  :hasInput="true"
                  v-model="dataForm.depreciation_year"
                  :valueField="ResourceTable.FieldAsset.depreciationYear"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationYear && isSubmited"
                  :message="Resource.ErrorInput.DepreciationYear.VI"
                  :options="{
                    locale: 'vi-VN',
                    currency: 'EUR',
                    currencyDisplay: 'hidden',
                    valueRange: { min: 0 },
                    hideGroupingSeparatorOnFocus: false,
                  }"
                  @blur="onBlurInputNumber"
                ></v-number>

                <!-- Nhập dữ liệu năm theo dõi
                @author NNNINH (22/11/2022) -->
                <v-input-number
                  label="Năm theo dõi"
                  hasLabel
                  v-model="dataForm.tracked_year"
                  valueField="tracked_year"
                  :radius="true"
                  :disabled="true"
                ></v-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <!-- Nhập dữ liệu ngày mua
                @author NNNINH (22/11/2022) -->
                <v-input-date
                  label="Ngày mua"
                  hasLabel
                  hasInput
                  tabindex="109"
                  :id="ResourceTable.FieldAsset.purchaseDate"
                  v-model="dataForm.purchase_date"
                  :valueField="ResourceTable.FieldAsset.purchaseDate"
                  rightIcon="ic-date"
                  :radius="true"
                  :disabledMessage="errorMessage.purchase_date && isSubmited"
                  :message="titleErrorMess.purchaseDate"
                  @changeValue="handleChangeDate"
                ></v-input-date>
              </div>
              <div class="form-group__right">
                <div class="form-group__right__1">
                  <!-- Nhập dữ liệu ngày bắt đầu sử dụng
                @author NNNINH (22/11/2022) -->
                  <v-input-date
                    label="Ngày bắt đầu sử dụng"
                    hasLabel
                    hasInput
                    tabindex="110"
                    :valueField="ResourceTable.FieldAsset.productionDate"
                    :id="ResourceTable.FieldAsset.productionDate"
                    v-model="dataForm.production_date"
                    rightIcon="ic-date"
                    topIcon="ic-angle_up"
                    bottomIcon="ic-angle_down"
                    :radius="true"
                    :disabledMessage="errorMessage.ProductionDate && isSubmited"
                    :message="titleErrorMess.production_date"
                    @changeValue="handleChangeDate"
                  ></v-input-date>
                </div>
                <div class="right-center"></div>
                <div class="form-group__right__2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <!-- Buttom hủy
                @author NNNINH (22/11/2022) -->
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                ref="btnClosePopup"
                @keydown.shift="focusWithShift"
                @keydown.tab="focusBack"
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
                @click="saveData"
                tabindex="111"
                radius
                :disabled="disabledBtn"
              ></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- Dialog messagebox hủy bỏ khai báo
   @author NNNINH (22/11/2022) -->
  <teleport to="body">
    <v-message-box
      v-on:keydown="keyboardEvent"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.AddAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelAdd"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Cancel.VI"
        radius
        @click="handleClosePop"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessCancelAdd = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Hiển thị thông báo cập nhât
       @author NNNINH (22/11/2022) -->
  <teleport to="body">
    <v-message-box
      v-on:keydown="keyboardEvent"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessUpdate"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Save.VI"
        radius
        @click="saveData"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoSave.VI"
        type="abort"
        @click="handleClosePop"
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

  <!-- Hiển thị thông báo error multiple
       @author NNNINH (22/11/2022) -->
  <teleport to="body">
    <v-message-box
      v-on:keydown="keyboardEvent"
      leftIcon="ic-warning"
      :disabledTop="false"
      disabled
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
        @keydown.enter="handleCloseErrorMultiple"
        @click="handleCloseErrorMultiple"
      ></v-button>
    </v-message-box>
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
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import VInputDate from "@/components/date/VInputDate.vue";
import VInputNumber from "@/components/number/VInputNumber.vue";
import VDropDown from "@/components/dropdown/VDropDown.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import Resource from "@/assets/js/resource/resource.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import assetAPI from "@/apis/api/assetAPI.js";
import vNumber from "@/components/number/VInputMoney.vue";
import _ from "lodash";

export default {
  name: "MsPopupAsset",
  components: {
    VButton,
    VInput,
    VDropDown,
    VInputNumber,
    VInputDate,
    VTooltip,
    VMessageBox,
    vNumber,
  },
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
    const { proxy } = getCurrentInstance();
    //Show toastMessage
    window.popup = proxy;
    // colums bộ phận sử dụng
    const columnsDepartment = ref([
      {
        field: ResourceTable.FieldDepartment.departmentCode,
        titleField: "Mã",
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        titleField: "Tên bộ phận sử dụng",
      },
    ]);
    // colums loại tài sản
    const columnsAssetCategory = ref([
      {
        field: ResourceTable.FieldAssetCategory.fixedAssetCategoryCode,
        titleField: "Mã",
      },
      {
        field: ResourceTable.FieldAssetCategory.fixedAssetCategoryName,
        titleField: "Tên loại tài sản",
      },
    ]);
    // biến show popup
    const isDialogMessCancelAdd = ref(false);
    const titleErrorMess = reactive({
      DepreciationRate: "",
    });
    const isShowPopup = ref(false);
    const isShowDialogDetail = ref(false);
    const isDialogMessUpdate = ref(false);
    const isSubmited = ref(false);
    const isEdited = ref(false);
    const ctrlPressed = ref(false);
    const shiftPressed = ref(false);
    const disabledBtn = ref(false);
    const title = ref("");
    const oldDataForm = ref({});
    const errorMessage = ref({});
    const titleErrValidate = ref([]);
    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);

    // Lưu dữ liệu 1 tài sản
    const dataForm = ref({});
    // Kiểm tra dữ liệu 1 tài sản đã chỉnh sữa hay không
    const EqualData = computed(() => {
      return _.isEqual(proxy.dataForm, proxy.oldDataForm);
    });

    // Validate form
    const dataFormValidate = computed(() => {
      return {
        fixed_asset_code: { required },
        fixed_asset_name: { required },
        department_code: { required },
        fixed_asset_category_code: { required },
        quantity: { required },
        cost: { required },
        depreciation_rate: { required },
        purchase_date: { required },
        production_date: { required },
        life_time: { required },
        depreciation_year: { required },
      };
    });
    const v$ = useValidate(dataFormValidate, dataForm);

    //Gọi sự kiện load bộ phận và loại tài sản
    onMounted(() => {
      proxy.loadDataCategory();
      proxy.loadDataDepartment();
    });

    onMounted(() => {
      watch(
        () => dataForm.value,
        (newVal, old) => {
          // proxy.dataForm = newVal;
        },
        () => proxy.dataForm.depreciation_rate,
        (newVal, old) => {
          proxy.updateValDepYear();
        },
        () => proxy.dataForm.cost,
        (newVal, old) => {
          proxy.updateValDepYear();
        }
      );
    });
    const assetDataAll = ref([]);

    onMounted(() => {
      proxy.assetDataAll = proxy.dataAll;
    });
    /**
     * Tự động cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    onUpdated(() => {
      proxy.updateValDepYear();
    });

    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.dataForm = newVal;
      }
    );
    onMounted(() => {
      proxy.focusFirst();
    });
    v$;
    onMounted(() => {
      try {
        /**
         * Kiểm tra giá trị mode là add hay cập nhật,nhân bản
         *  @author NNNinh(17/10/2021)
         */
        switch (proxy.formModel.mode) {
          //Kiểm tra giá trị mode là cập nhật
          case Enum.Mode.Update:
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;
            // Lấy dữ liệu tài sản theo id tài sản
            proxy.dataForm = _.cloneDeep(proxy.allData);
            proxy.setValueDateYear();
            proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
            break;
          //Kiểm tra giá trị mode là thêm
          case Enum.Mode.Add:
            proxy.title = Resource.TitleFormPopup.FormAddAsset.VI;

            proxy.defaultValueDate();
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;

          //Kiểm tra giá trị mode là nhân bản
          case Enum.Mode.Duplicate:
            proxy.title = Resource.TitleFormPopup.FormDuplicateAsset.VI;
            proxy.dataForm = _.cloneDeep(proxy.allData);
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    });

    /**
     * Lấy dữ liệu toàn bộ loại tài sản
     *  @author NNNinh(20/10/2021)
     */
    async function loadDataCategory() {
      try {
        let res = await assetAPI.get("Categories/GetAll", {});
        proxy.DataAssetCategory.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Lấy dữ liệu toàn bộ loại bộ phận
     *  @author NNNinh(18/10/2021)
     */
    async function loadDataDepartment() {
      try {
        let res = await assetAPI.get("Departments/GetAll", {});
        proxy.DataDepartment.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Sự kiện close error message Multiple
     *  @author NNNinh(18/10/2021)
     */
    const handleCloseErrorMultiple = () => {
      if (proxy.formModel.mode == Enum.Mode.Update) {
        proxy.isShowDialogDetail = false;
        proxy.isSubmited = true;
        proxy.isDialogMessUpdate = false;
        proxy.focusFirst();
      }
      proxy.isShowDialogDetail = false;
      proxy.isSubmited = true;
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
     * Cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    function updateValDepYear() {
      proxy.dataForm.depreciation_year =
        (proxy.dataForm.depreciation_rate * proxy.dataForm.cost) / 100;
      if (proxy.dataForm.depreciation_rate > 100) proxy.dataForm.depreciation_rate = 100;
    }

    /**
     * focus vào input dầu tiên
     *  @author NNNinh(21/10/2021)
     */
    const focusFirst = () => {
      proxy.$refs.inputAssetCode.$el.getElementsByTagName("input")[0].focus();
    };

    /**
     * Xét giá trị ban đầu cho ngày mua và ngày sử dụng
     *  @author NNNinh(21/10/2021)
     */
    const defaultValueDate = () => {
      nextTick(() => {
        // xét giá trị ban đầu cho ngày mua
        if (proxy.dataForm.purchase_date == "") {
          proxy.dataForm.purchase_date = new Date().toDate();
        }
        // xét giá trị ban đầu cho ngày sử dụng
        if (proxy.dataForm.production_date == "") {
          proxy.dataForm.production_date = new Date().toDate();
        }
        // xét giá trị ban đầu cho nguyên giá
        if (proxy.dataForm.cost == null) {
          proxy.dataForm.cost = 0;
        }
        if (proxy.dataForm.quantity == null) {
          proxy.dataForm.quantity = 0;
        }
        // xét giá trị ban đầu cho giá trị hao mòn năm
        if (proxy.dataForm.depreciation_year == null) {
          proxy.dataForm.depreciation_year = 0;
        }
        // xét giá trị ban đầu cho tỉ lệ hao mòn năm
        if (proxy.dataForm.depreciation_rate == null) {
          proxy.dataForm.depreciation_rate = 0;
        }
        if (proxy.dataForm.life_time == null) {
          proxy.dataForm.life_time = 0;
        }
      });
    };

    /**
     * Xét giá trị năm theo dõi mặc định là năm hiện tại
     *  @author NNNinh(21/10/2021)
     */
    function setValueDateYear() {
      proxy.dataForm.tracked_year = new Date().getFullYear();
    }

    /**
     * Lấy mã tài sản tự động tăng
     *  @author NNNinh(21/10/2021)
     */
    async function getAssetNextCode() {
      try {
        let result = await assetAPI.get("Assets/nextCode", {});
        proxy.dataForm.fixed_asset_code = result?.code;
        proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (14/11/2022)
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
      } else if (e.which == Enum.KeyCode.F9 && proxy.ctrlPressed == true) {
        proxy.handlePopupClose();
        proxy.ctrlPressed = false;
      }
    };

    /**
     * Chuyển focus lên đầu sau khi đến cuối dialog tài sản
     * @author NNNINH (25/11/2022)
     */
    const focusBack = () => {
      if (!proxy.shiftPressed) {
        proxy.$refs.btnClose.focus();
      }
      proxy.shiftPressed = false;
    };

    /**
     * Focus ngược khi dùng Shift+Tab
     * @author NNNINH (25/11/2022)
     */
    const focusWithShift = (e) => {
      if (e.tab) {
        proxy.$refs.btnClosePopup.focus();
      } else {
        proxy.shiftPressed = true;
      }
    };

    /**
     * Xử lý sự kiện click item dropdown
     * @author NNNINH (25/11/2022)
     */
    const onClickDataDropDown = (item, valueField) => {
      try {
        switch (valueField) {
          case ResourceTable.FieldAsset.fixedAssetCategoryId: // Kiểm tra có phải mã loại tài sản hay không
            if (item.length != 0) {
              proxy.dataForm.fixed_asset_category_name = item.fixed_asset_category_name;
              proxy.dataForm.life_time = item.life_time;
              proxy.dataForm.depreciation_rate = item.depreciation_rate
                ? item.depreciation_rate * 100
                : null;
              proxy.dataForm.fixed_asset_category_code = item.fixed_asset_category_code;
              proxy.errorMessage.AssetCategoryCode = false;
            } else {
              proxy.errorMessage.AssetCategoryCode = true;
            }
            break;
          case ResourceTable.FieldAsset.departmentId: // Kiểm tra có phải mã bộ phận sử dụng hay không
            if (item.length != 0) {
              proxy.dataForm.department_name = item.department_name;
              proxy.dataForm.department_code = item.department_code;
              proxy.errorMessage.DepartmentCode = false;
            } else {
              proxy.errorMessage.DepartmentCode = true;
            }
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     *  Xử lý xự kiện blur input số, tiền
     * @author NNNINH (25/11/2022)
     */
    const onBlurInputNumber = (isValue, valueField) => {
      try {
        switch (valueField) {
          case ResourceTable.FieldAsset.quantity: // Kiểm tra có phải là số lượng hay không
            if (isValue != "") {
              proxy.errorMessage.Quantity = false;
              proxy.dataForm.quantity = isValue;
            } else {
              proxy.errorMessage.Quantity = true;
            }
            break;

          case ResourceTable.FieldAsset.lifeTime: // Kiểm tra có phải là số năm sử dụng hay không
            if (isValue != "") {
              proxy.errorMessage.LifeTime = false;
              proxy.dataForm.life_time = isValue;
            } else {
              proxy.errorMessage.LifeTime = true;
            }

            break;
          case ResourceTable.FieldAsset.depreciationRate: // Kiểm tra có phải là tỉ lệ hao mòn hay không
            if (isValue != "") {
              proxy.errorMessage.DepreciationRate = false;
              proxy.dataForm.depreciation_rate = isValue;
            } else {
              proxy.errorMessage.DepreciationRate = true;
            }

            break;
          case ResourceTable.FieldAsset.cost: // Kiểm tra có phải là nguyên giá hay không
            if (isValue != "") {
              proxy.errorMessage.Cost = false;
              proxy.dataForm.cost = isValue;
            } else {
              proxy.errorMessage.Cost = true;
            }
            break;
          default: {
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     *  Sự kiện blur của input
     * @author NNNINH (25/11/2022)
     */
    const onBlurInput = (isValue, valueField, e) => {
      switch (valueField) {
        case ResourceTable.FieldAsset.fixedAssetName: {
          // Kiểm tra có phải là tên tài sản hay không
          if (isValue != "") {
            proxy.errorMessage.AssetName = false;
            proxy.dataForm.fixed_asset_name = isValue;
          } else {
            proxy.errorMessage.AssetName = true;
          }
          break;
        }
        case ResourceTable.FieldAsset.fixedAssetCode: {
          // Kiểm tra có phải là mã tài sản hay không
          if (isValue != "") {
            proxy.errorMessage.AssetCode = false;
            proxy.dataForm.fixed_asset_code = isValue;
          } else {
            proxy.errorMessage.AssetCode = true;
          }
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     *  Xử lý sự kiện blur dropdown
     * @author NNNINH (25/11/2022)
     */
    const onBlurDropdown = (val, valueField) => {
      switch (valueField) {
        case ResourceTable.FieldAsset.fixedAssetCategoryId:
          if (val != null) {
            proxy.errorMessage.AssetCategoryCode = false;
          } else {
            proxy.errorMessage.AssetCategoryCode = true;
          }
          break;
        case ResourceTable.FieldAsset.departmentId:
          if (val != null) {
            proxy.errorMessage.DepartmentCode = false;
          } else {
            proxy.errorMessage.DepartmentCode = true;
          }
          break;
      }
    };

    /**
     *  Validate dữ liệu
     * @author NNNINH (25/11/2022)
     */
    const validateData = () => {
      proxy.v$.$validate();
      if (proxy.v$.$error) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        if (proxy.v$.fixed_asset_code.$error) {
          // Kiểm tra giá trị mã tài sản null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetCode.VI);
          proxy.errorMessage.AssetCode = true;
        }
        if (proxy.v$.fixed_asset_name.$error) {
          // Kiểm tra giá trị tên tài sản null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetName.VI);
          proxy.errorMessage.AssetName = true;
        }
        if (proxy.v$.department_code.$error) {
          // Kiểm tra giá trị mã bộ phận null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.DepartmentCode.VI);
          proxy.errorMessage.DepartmentCode = true;
        }
        if (proxy.v$.fixed_asset_category_code.$error) {
          // Kiểm tra giá trị mã loại tài sản null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetCategoryCode.VI);
          proxy.errorMessage.AssetCategoryCode = true;
        }
        if (proxy.v$.quantity.$error) {
          // Kiểm tra giá trị số lượng null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.Quantity.VI);
          proxy.errorMessage.Quantity = true;
        }

        if (proxy.dataForm.cost == 0) {
          // Kiểm tra giá trị nguyên giá null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.Cost.VI);
          proxy.errorMessage.Cost = true;
        }

        if (proxy.v$.life_time.$error) {
          // Kiểm tra giá trị số năm sử dụng null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.LifeTime.VI);
          proxy.errorMessage.LifeTime = true;
          proxy.titleErrorMess.DepreciationRate = Resource.ErrorInput.DepreciationRate.VI;
        }

        if (proxy.dataForm.depreciation_year == 0) {
          // Kiểm tra giá trị hao mòn năm null hay không
          proxy.titleErrValidate.push(Resource.ErrorInput.DepreciationYear.VI);
          proxy.errorMessage.DepreciationYear = true;
          proxy.titleErrorMess.DepreciationYear = Resource.ErrorInput.DepreciationYear.VI;
        }
        if (proxy.dataForm.depreciation_rate == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.DepreciationRate.VI);
          proxy.errorMessage.DepreciationRate = true;
        }
        if (proxy.v$.purchase_date.$error) {
          // Kiểm tra giá trị ngày mua null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.PurchaseDate.VI);
          proxy.titleErrorMess.purchaseDate = Resource.ErrorInput.PurchaseDate.VI;
          proxy.errorMessage.purchase_date = true;
        }
        if (proxy.v$.production_date.$error) {
          // Kiểm tra giá trị ngày bắt đầu sử dụng null hay không
          proxy.titleErrValidate.push(Resource.ErrorValidate.ProductionDate.VI);
          proxy.titleErrorMess.production_date = Resource.ErrorInput.ProductionDate.VI;
          proxy.errorMessage.ProductionDate = true;
        }

        return false;
      } else if (proxy.dataForm.depreciation_year > proxy.dataForm.cost) {
        // kiểm tra giá trị hao mòn lớn hơn nguyên giá
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push(Resource.ErrorValidate.CompareDepreciationYear.VI);

        return false;
      } else if (
        proxy.dataForm.depreciation_rate >
        parseFloat(100 / proxy.dataForm.life_time).toFixed(2) // Kiểm tra tỉ lệ hao mòn phải bằng 1/Số năm sử dụng
      ) {
        console.log(parseFloat(100 / proxy.dataForm.life_time).toFixed(2));
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng");
        proxy.titleErrorMess.DepreciationRate =
          Resource.ErrorInput.DepreciationRateVali.VI;
        return false;
      } else if (
        proxy.dataForm.purchase_date > proxy.dataForm.production_date // kiểm tra ngày mua nhỏ hơn ngày mua
      ) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push(Resource.ErrorInput.ProductionGreaterDate.VI);
        proxy.titleErrorMess.production_date =
          Resource.ErrorInput.ProductionGreaterDate.VI;
        proxy.errorMessage.ProductionDate = true;

        return false;
      } else {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        return true;
      }
    };

    /**
     *  Xử lý sự kiện change value của ngày mua và ngày sử dụng
     * @author NNNINH (25/11/2022)
     */
    const handleChangeDate = (val, field) => {
      switch (field) {
        case ResourceTable.FieldAsset.purchaseDate:
          if (val != null || val != "") {
            proxy.errorMessage.purchase_date = false;
          } else proxy.errorMessage.purchase_date = true;
          break;
        case ResourceTable.FieldAsset.productionDate:
          if (val != null || val != "") {
            proxy.errorMessage.ProductionDate = false;
          } else {
            proxy.errorMessage.ProductionDate = true;
          }
          break;
      }
    };

    /**
     * Hiện thị cảnh báo lỗi truyền từ BackEnd
     * @author NNNinh(21/10/2021)
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
     * Gọi API thêm mới tài sản
     *  @author NNNinh(21/10/2021)
     */
    function handleInsertAsset(val) {
      try {
        let result = assetAPI.post("Assets", val);
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
     * API Sửa dữ liệu tài sản
     *  @author NNNinh(21/10/2021)
     */
    function handleUpdateAsset(recordId, val) {
      try {
        let result = assetAPI.put("Assets", recordId, val);
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
    const CheckAssetCode = (val) => {
      let asset = proxy.assetDataAll.filter((x) => x["fixed_asset_code"]?.includes(val));
      if (asset.length > 0) {
        return true;
      } else return false;
    };

    // Xử lý sự kiện chỉnh sử dữ liệu
    const handleUpdate = () => {
      let res = proxy.handleUpdateAsset(proxy.dataForm.fixed_asset_id, proxy.dataForm);
      if (res && proxy.titleErrValidate.length == 0) {
        emit("handle-close", false);
        emit("show-message", proxy.formModel.mode, res, true);
      } else {
        proxy.isShowDialogDetail = true;
      }
    };

    //Sự kiện lưu dữ liệu data
    const saveData = () => {
      try {
        if (proxy.validateData() == false) {
          proxy.isShowDialogDetail = true;
        } else {
          if (proxy.formModel.mode == Enum.Mode.Update) {
            if (proxy.EqualData == false) {
              if (
                proxy.CheckAssetCode(proxy.dataForm.fixed_asset_code) &&
                proxy.dataForm.fixed_asset_code != proxy.oldDataForm.fixed_asset_code
              ) {
                proxy.titleErrValidate = [];
                proxy.errorMessage = {};
                proxy.titleErrValidate.push("Mã tài sản đã bị trùng");
                Resource.ErrorInput.AssetCode.VI = "Mã tài sản đã bị trùng";
                proxy.errorMessage.AssetCode = true;
                proxy.isShowDialogDetail = true;
              } else {
                proxy.handleUpdate();
              }
            } else {
              proxy.titleErrValidate = [];
              proxy.titleErrValidate.push("Dữ liệu chưa được chỉnh sửa");
              proxy.isShowDialogDetail = true;
            }
          } else {
            if (proxy.CheckAssetCode(proxy.dataForm.fixed_asset_code)) {
              proxy.titleErrValidate = [];
              proxy.errorMessage = {};
              proxy.titleErrValidate.push("Mã tài sản đã bị trùng");
              Resource.ErrorInput.AssetCode.VI = "Mã tài sản đã bị trùng";
              proxy.errorMessage.AssetCode = true;
              proxy.isShowDialogDetail = true;
            } else {
              let res = proxy.handleInsertAsset(proxy.dataForm);
              if (res && proxy.titleErrValidate.length == 0) {
                emit("handle-close", false);
                emit("show-message", proxy.formModel.mode, res);
              } else {
                proxy.isShowDialogDetail = true;
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Sự kiện đóng close popup
    const handleClosePop = () => {
      emit("handle-close", false);
    };

    // Sự kiện đóng close popup kiểm tra có sửa dữ liệu hay không
    const handlePopupClose = () => {
      if (proxy.formModel.mode == Enum.Mode.Update) {
        if (proxy.EqualData) {
          emit("handle-close", false);
        } else {
          proxy.isDialogMessUpdate = true;
        }
      } else {
        if (proxy.EqualData) {
          emit("handle-close", false);
        } else {
          proxy.isDialogMessCancelAdd = true;
        }
      }
    };

    return {
      title,
      isShowPopup, // biến show popup
      titleErrValidate, // Mảng dữ liệu titile error validate
      isDialogMessCancelAdd,
      isDialogMessUpdate, //Show dialog cập nhật
      isSubmited, // Kiểm tra xem có submid hay không
      Resource, // Resource
      ResourceTable, // ResourceTable
      dataForm, // Lưu dữ liệu 1 tài sản
      DataAssetCategory, // Biến lấy dữ liệu loại tài sản
      DataDepartment, // Biến lấy dữ liệu bộ phạn sử dụng
      isShowDialogDetail, // show dialog validate popup
      loadDataCategory, // Lấy toàn bộ dữ liệu loại tài sản
      loadDataDepartment, // Lấy toàn bộ dữ liệu bộ phận sử dụng
      focusFirst, // Xử lý sự kiện focus của input
      focusBack,
      focusWithShift,
      setValueDateYear, // Xét giá trị năm theo dõi mặc định là năm hiện tại
      defaultValueDate, // Xét giá trị ban đầu cho ngày mua và ngày sử dụng
      updateValDepYear, // Cập nhật giá trị hao mòn năm
      getAssetNextCode, // Gọi API lấy mã tài sản tiếp theo
      saveData, // Xử lý xự kiện lưu dữ liệu
      handlePopupClose, // sự kiện đóng popup có kiểm tra chỉnh sửa dữ liệu hay không
      handleClosePop, // sự kiện đóng popup không kiểm tra chỉnh sửa dữ liệu hay không
      errorMessage, // Đối tượng có error dữ liệu hay không
      validateData, // Validate dữ liệu
      onBlurInput, //Sự kiện blur của input
      dataFormValidate, // Validate form
      handleCloseErrorMultiple, // Sự kiện đóng dialog error
      columnsAssetCategory, // colums loại tài sản
      columnsDepartment, // colums bộ phận sử dụng
      isEdited,
      oldDataForm, // Đối tượng để kiểm tra xem có sửa dữ liệu hay không
      EqualData, // Kiểm tra dữ liệu 1 tài sản đã chỉnh sữa hay không
      titleErrorMess,
      handleInsertAsset,
      handleUpdateAsset,
      handleUpdate, // Xử lý sự kiện update dữ liệu
      onBlurDropdown, // sự kiện blur ra ngoài của dropdown
      backEndErrorNotify, //  Hiện thị cảnh báo lỗi truyền từ BackEnd
      keyboardEvent,
      ctrlPressed, // Nút Ctrl có đang được bấm hay không
      shiftPressed,
      v$,
      onClickDataDropDown,
      onBlurInputNumber,
      handleChangeDate,
      disabledBtn, // Disable button
      closeProValidate,
      assetDataAll,
      CheckAssetCode,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/v_popup_asset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
