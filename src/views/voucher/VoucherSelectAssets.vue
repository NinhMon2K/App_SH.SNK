<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">Chọn tài sản ghi tăng</div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              ref="btnClose"
              @click="handleClosePopupSelect"
              class="form-asset__close app-icon ic-close"
            ></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form_group-search">
              <div class="box_search">
                <v-input
                  id="txt-search"
                  v-model="txtSearch"
                  :hasLabel="false"
                  ref="input"
                  :radius="true"
                  leftIcon="ic-search"
                  @keyup.enter="handleChangeSeach"
                  placeholder="Tìm kiếm theo Mã, tên tài sản"
                  :disabledMessage="false"
                ></v-input>
              </div>
            </div>
            <div class="form_container--table">
              <v-grid
                :columns="columns"
                :allData="allData"
                :selectedCol="true"
                :dataTotal="dataTotal"
                v-model:active="active"
                :disableFooter="true"
                ref="table"
                v-model:selectedData="dataSelected"
                @currentPage="handleTotalPage"
                @changeTabView="handleChangeTab"
              >
              </v-grid>
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
            <v-tooltip
              content="Đông ý"
              @click="handleSelectOnCkick"
              placement="top"
              right="top"
            >
              <v-button text="Đồng ý" tabindex="111" radius :disabled="false"></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>

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

  <!-- Dialog messagebox hủy bỏ khai báo
   @author NNNINH (05/01/2023) -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.AddAssetDelect.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelAdd"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Cancel.VI"
        radius
        @click="handleClosePopupSelect"
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

  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
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
  watch,
} from "vue";
import VButton from "@/components/button/VButton.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VInput from "@/components/input/VInput.vue";
import VGrid from "@/components/grid/VGrid.vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import VLoading from "@/components/loading/VLoading.vue";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
import VMessageBox from "@/components/toast/VMessageBox.vue";
export default {
  components: {
    VButton,
    VTooltip,
    VInput,
    VGrid,
    VLoading,
    VMessageBox,
  },
  props: {
    dataAssetDetaill: {
      default: [],
    },
  },
  emits: ["closePopupSelect", "SelectedData"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.popupSelect = proxy;
    const isLoading = ref(false);
    const allData = ref([]);
    const txtSearch = ref(" ");
    const currentPage = ref(0);
    const tableView = ref(0);
    const isShowPopup = ref(false);
    const dataAssetID = ref({});
    const active = ref(-1);
    const dataSelected = ref([]);
    const ctrlPressed = ref(false);
    let pram = ref({});
    const dataTotal = ref({});
    const titleErrValidate = ref([]);
    const isShowDialogDetail = ref(false);
    const isDialogMessCancelAdd = ref(false);

    onMounted(() => {
      proxy.focusFirst();
    });
    // Sự kiện change giới hạn bản ghi
    const handleChangeTab = (val) => {
      proxy.tableView = val;
      proxy.loadDataAsset();
    };
    // Sự kiện change page number
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
      proxy.loadDataAsset();
    };

    /**
     * Xử lý sự kiện đóng popup chọn tài sản
     * @author NNNinh (13/01/2023)
     */
    const handleClosePopupSelect = () => {
      emit("closePopupSelect");
    };

    /**
     * Lấy dữ liệu tài sản chưa được chứng từ
     * @author NNNinh (13/01/2023)
     */
    async function loadDataAsset() {
      try {
        proxy.isLoading = true;
        // Mảng lưu dữ liệu mã loại tài sản
        let arrCategory = [];
        // Mảng lưu dữ liệu mã bộ phận sử dụng
        let arrDepartment = [];

        let listIdAsset = proxy.dataAssetDetaill.map((x) => x.fixed_asset_id);
        // Đối tượng paging tài sản
        let pagingAsset = {
          keyword: proxy.txtSearch, // Giá trị tìm kiếm tài sản
          listDepartment: [], // Mảng dữ liệu mã bộ phận sử dụng
          listCategory: [], // Mảng dữ liệu mã loại tài sản
          limit: proxy.tableView, // Số bản ghi hiện lên một trang
          page: proxy.currentPage, // Trang hiện tại
          listIdAsset: listIdAsset,
          mode: 2,
        };

        // Gọi API lấy dữ liệu tài sản
        let res = await assetAPI.filters("Assets/Filters", pagingAsset);
        proxy.isLoading = false;
        proxy.dataTotal.totalCount = res.totalCount; // Lấy giá trị tổng số bản ghi

        let data = res?.data;
        let o = (proxy.currentPage - 1) * proxy.tableView;
        data.forEach((x, i) => {
          x.STT = i + 1 + o;
          x.depreciation_residual = x.cost - x.depreciation_year;
        });
        proxy.allData = data;
      } catch (error) {
        proxy.isLoading = false;
        console.log(error);
      }
    }

    /**
     * Sự kiện đóng close popup kiểm tra có sửa dữ liệu hay không
     * @author NNNinh (13/01/2023)
     */
    const handlePopupClose = () => {
      if (proxy.dataSelected.length > 0) {
        proxy.isDialogMessCancelAdd = true;
      } else {
        proxy.handleClosePopupSelect();
      }
    };

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (14/11/2022)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.ESC) {
        proxy.handlePopupClose();
      } else if (e.which == Enum.KeyCode.Ctrl) {
        proxy.ctrlPressed = true;
      } else if (e.which == Enum.KeyCode.Q && proxy.ctrlPressed == true) {
        proxy.handleSelectOnCkick();
        proxy.ctrlPressed = false;
      }
    };

    /**
     * Sự kiện close error message Multiple
     *  @author NNNinh(18/10/2021)
     */
    const handleCloseErrorMultiple = () => {
      proxy.isShowDialogDetail = false;
      proxy.focusFirst();
    };

    /**
     * focus vào input dầu tiên
     *  @author NNNinh(21/10/2021)
     */
    const focusFirst = () => {
      proxy.$refs.input.$el.getElementsByTagName("input")[0].focus();
    };
    const handleSelectOnCkick = () => {
      if (proxy.dataSelected.length == 0) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Chọn ít nhất 1 tài sản.");
        proxy.isShowDialogDetail = true;
      } else {
        proxy.dataSelected.forEach((x) => {
          x.flag = 1;
        }); // Xác định khi chọn tài sản là thêm mới với cờ là 1
        emit("SelectedData", proxy.dataSelected);
        proxy.handleClosePopupSelect();
      }
    };

    // Xử lý sự kiện change input tìm kiếm
    const handleChangeSeach = (e) => {
      if (e.which == Enum.KeyCode.ENTER) {
        proxy.loadDataAsset();
      }
    };

    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * @Author: NNNinh (16/10/2022)
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
        width: 80,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 140,
      },

      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 200,
      },

      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationYear,
        title: "Hao mòn năm",
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        align: "Right",
        type: "Number",
        summary: "sum",
        width: 110,
      },
    ]);
    return {
      columns,
      loadDataAsset,
      isLoading,
      allData,
      txtSearch,
      currentPage,
      tableView,
      isShowPopup,
      dataAssetID,
      active,
      dataSelected,
      pram,
      dataTotal,
      handleTotalPage,
      handleChangeTab,
      handleClosePopupSelect,
      handleSelectOnCkick,
      focusFirst,
      isShowDialogDetail,
      titleErrValidate,
      Resource,
      handleCloseErrorMultiple,
      isDialogMessCancelAdd,
      handlePopupClose,
      handleChangeSeach,
      keyboardEvent,
      ctrlPressed,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/VoucherSelectAssets.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
