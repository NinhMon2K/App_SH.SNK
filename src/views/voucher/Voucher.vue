<template>
  <div class="container__voucher" @keydown.ctrl.prevent="keyboardEvent">
    <div class="voucher__header">
      <div class="voucher__header--left"><h2>GHI TĂNG TÀI SẢN</h2></div>
      <div class="voucher__header--right">
        <div class="box_buttom--left">
          <v-tooltip content="Thêm mới" placement="bottom" right="bottom">
            <!-- buttom thêm mới -->
            <v-button
              text="Thêm"
              id="btn-add"
              :radius="true"
              :tabindex="'2'"
              @click="handleClickAdd"
            >
            </v-button>
          </v-tooltip>
        </div>
        <div class="box_buttom--right">
          <div class="box_enlarge">
            <v-button
              leftIcon="ic-enlarge"
              type="basic"
              :tabindex="'3'"
              :radius="true"
              :class="isShowVertical == false ? 'btn_icon' : ''"
            ></v-button>
          </div>
          <div class="container_content-display">
            <div class="display-button">
              <v-tooltip content="Tùy chỉnh" placement="top">
                <v-button
                  leftIcon="ic-angle-down__black"
                  id="btn-export"
                  :tabindex="'4'"
                  type="basic"
                  ref="icon"
                  :radius="true"
                  @click="menuSelect = !menuSelect"
                ></v-button>
              </v-tooltip>
            </div>
            <div ref="options" class="menuWarp" v-if="menuSelect">
              <div class="menu-warp_top">
                <v-button
                  text="Giao diện dọc"
                  leftIcon="ic-menuExpand"
                  type="secodary"
                  :tabindex="'5'"
                  @click="handleOnToolVertical"
                >
                </v-button>
              </div>
              <div class="menu--warp_bottom">
                <v-button
                  text="Giao diện ngang"
                  leftIcon="ic-menu"
                  type="secodary"
                  @click="handleOnToolNoVertical"
                  :tabindex="'6'"
                >
                </v-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="voucher_body">
      <div class="voucher__content" v-show="isShowEnlarge">
        <div class="voucher__toolbar">
          <div class="voucher__toolbar--left">
            <v-input
              id="txt-search"
              :hasLabel="false"
              :radius="true"
              leftIcon="ic-search"
              ref="input"
              placeholder="Tìm kiếm theo chứng từ, nội dung"
              v-model="txtSearchVoucher"
              @change="handleChangeSearch"
              :disabledMessage="false"
              :tabindex="'1'"
            ></v-input>
          </div>
          <div class="voucher__toolbar--right">
            <div class="btn-printer" v-if="isShowButtonDelete">
              <v-tooltip content="Xóa" placement="bottom">
                <v-button
                  leftIcon="ic-delete__toolbar"
                  id="btn-delete"
                  :tabindex="'10'"
                  type="basic"
                  :radius="true"
                  @click="handleShowMessBox"
                ></v-button>
              </v-tooltip>
            </div>
            <div class="btn-printer">
              <v-tooltip content="In" placement="bottom">
                <v-button
                  leftIcon="ic-printer"
                  id="btn-export"
                  :tabindex="'11'"
                  type="basic"
                  :radius="true"
                  @click="exportToExcel"
                ></v-button>
              </v-tooltip>
            </div>
            <div class="btn-more">
              <v-tooltip content="Tùy chọn" placement="bottom">
                <v-button
                  leftIcon="ic-more"
                  id="btn-export"
                  :tabindex="'12'"
                  type="basic"
                  :radius="true"
                ></v-button>
              </v-tooltip>
            </div>
          </div>
        </div>
        <div
          class="table-container"
          :class="isShowVertical == false ? 'tbl-vertica' : ''"
        >
          <v-grid
            :columns="columnVouchers"
            :allData="allDataVoucher"
            :selectedCol="true"
            :dataTotal="dataTotal"
            :disableFooter="true"
            :selectedRow="true"
            v-model:selectedData="dataSelected"
            @deleteOnKey="handleShowMessBox"
            @handleEventTable="handleEventTable"
            @currentPage="handleTotalPage"
            @changeTabView="handleChangeTab"
            v-model:active="active"
            positionPaging="Bottom"
            ref="table"
          >
          </v-grid>
        </div>
      </div>
      <div class="voucher__footer" v-show="isShowVertical">
        <div class="content-menu content-menu-2--white">
          <h3 style="margin: 10px 0">Thông tin chi tiết</h3>
          <div class="content-btns">
            <div class="position-relative" v-if="isShowEnlarge">
              <v-tooltip content="Mở rộng" placement="bottom" right="bottom">
                <div
                  class="button-no-border app-icon ic-expand"
                  @click="handleOnToolEnlarge"
                  tabindex="14"
                ></div>
              </v-tooltip>
            </div>
            <div class="position-relative" v-if="isShowNormale">
              <v-tooltip content="Thu nhỏ" placement="bottom" right="bottom">
                <div
                  class="button-no-border app-icon ic-shrink"
                  @click="handleOnToolNormal"
                  tabindex="15"
                ></div>
              </v-tooltip>
            </div>
          </div>
        </div>

        <div class="table-container" :class="isShowNormale ? 'tbl-asset_detail' : ''">
          <v-grid
            :columns="columnsAssetDetaill"
            :allData="allDataAssetDetaill"
            :selectedCol="false"
            :dataTotal="dataTotalAsset"
            :disableFooter="true"
            :selectedRow="true"
            @currentPage="handleTotalPageAsset"
            @changeTabView="handleChangeTabAsset"
            v-model:active="activeAsset"
            positionPaging="Top"
            ref="tables"
          >
          </v-grid>
        </div>
      </div>
    </div>
  </div>

  <!-- Khi không chọn dữ để xóa cảnh báo  -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.DeleteNoData.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessDeleNoData"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="isDialogMessDeleNoData = false"
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneVoucher.VI"
      :disabledValueLeft="false"
      :disabledValueRight="true"
      v-if="isDialogMessDelete"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Delete.VI"
        @click="handleDelete"
        radius
        tabindex="201"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDelete = false"
        radius
      >
      </v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultipleVoucher.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessDeleMultiple"
    >
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.Delete.VI"
        radius
        @click="handleMultiDelete"
      ></v-button>
      <v-button
        tabindex="201"
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDeleMultiple = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <voucher-detail
    :formModel="pram"
    :allData="dataVoucherID"
    :dataAssetDetaill="allDataAssetDetaill"
    @handle-close="handleClosePopupDetaill"
    @show-message="handleShowMess"
    v-if="isShowPopup"
  ></voucher-detail>

  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>

  <!-- Có hiện thông báo message hay không -->
  <teleport to="body">
    <v-message :type="typeMessage" v-show="isShowMessage"></v-message>
  </teleport>
</template>

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
import ResourceTable from "@/assets/js/resource/resourceTable";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import Enum from "@/assets/js/enums/enum.js";
import VoucherDetail from "./VoucherDetail.vue";
import voucherAPI from "@/apis/api/voucherAPI.js";
import Resource from "@/assets/js/resource/resource.js";
import assetAPI from "@/apis/api/assetAPI.js";
import axios from "axios";
export default {
  components: {
    VButton,
    VTooltip,
    VInput,
    VGrid,
    VoucherDetail,
    VLoading,
    VMessage,
    VMessageBox,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.voucher = proxy;
    const isLoading = ref(false);
    const allDataVoucher = ref([]);
    const active = ref(0);
    const currentPage = ref(0);
    const txtSearchVoucher = ref("");
    const tableView = ref(0);
    const menuSelect = ref(false); // Có mở rộng menu chọn cách hiển thị bảng hay không
    const isShowPopup = ref(false);
    const dataSelected = ref([]);
    const dataTotal = ref({});
    const isShowEnlarge = ref(true);
    const isShowNormale = ref(false);
    const isShowVertical = ref(true);
    const allDataAssetDetaill = ref([]);
    const txtSearchAsset = ref("");
    const currentPageAsset = ref(0);
    const tableViewAsset = ref(0);
    const dataTotalAsset = ref({});
    const isShowButtonDelete = ref(false);
    const activeAsset = ref(-1);
    const voucherId = ref({});
    const idVoucher = ref("");
    const dataVoucherID = ref({});
    const valueMessageBox = ref("");
    let pram = ref({});
    const isDialogMessDelete = ref(false);
    const isDialogMessDeleMultiple = ref(false);
    const typeMessage = ref("");
    const isShowMessage = ref(false);
    const ctrlPressed = ref(false);

    /**
     * Xử lý sự kiện click thêm mới
     *   @author NNNinh(05/01/2023)
     */
    const handleClickAdd = () => {
      proxy.pram.mode = Enum.Mode.Add;
      proxy.isShowPopup = true;
    };

    /**
     * Sự kiện click pageing
     *  @author NNNinh(05/01/2023)
     */
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
      proxy.loadDataVouder();
    };

    /**
     * Sự kiện change số bản ghi cần hiện thị lên
     *  @author NNNinh(05/01/2023)
     */
    const handleChangeTab = (val) => {
      proxy.tableView = val;
      proxy.loadDataVouder();
    };

    watch(
      () => active.value,
      (newVal) => {
        proxy.voucherId = proxy.allDataVoucher[newVal];
      }
    );

    onMounted(() => {
      proxy.focusFirst();
    });

    /**
     * Sự kiện click pageing tài sản
     *  @author NNNinh(05/01/2023)
     */
    const handleTotalPageAsset = (tableView, val) => {
      proxy.tableViewAsset = tableView;
      proxy.currentPageAsset = val;
      proxy.loadDataVoucherDetaill();
    };

    /**
     * Sự kiện change số bản ghi cần hiện thị lên
     *  @author NNNinh(05/01/2023)
     */
    const handleChangeTabAsset = (val) => {
      proxy.tableViewAsset = val;
      proxy.loadDataVoucherDetaill();
      proxy.$refs.table.reset();
    };

    /**
     * Xử lý sự kiện click mở rộng của button
     * @author NNNINH (01/01/2023)
     */
    const handleOnToolEnlarge = () => {
      proxy.isShowEnlarge = false;
      proxy.isShowNormale = true;
      proxy.isShowVertical = true;
    };

    /**
     * Xử lý sự kiện click thu nhỏ của button
     * @author NNNINH (01/01/2023)
     */
    const handleOnToolNormal = () => {
      proxy.isShowEnlarge = true;
      proxy.isShowNormale = false;
      proxy.isShowVertical = true;
    };

    /**
     * Xử lý sự kiện click giao diện dọc
     * @author NNNINH (01/01/2023)
     */
    const handleOnToolVertical = () => {
      proxy.isShowVertical = false;
      proxy.menuSelect = false;
      proxy.isShowEnlarge = true;
      proxy.isShowNormale = false;
    };

    /**
     * Xử lý sự kiện click giao diện ngang
     * @author NNNINH (01/01/2023)
     */
    const handleOnToolNoVertical = () => {
      proxy.isShowVertical = true;
      proxy.menuSelect = false;
    };

    /**
     * Xử lý sự kiện dblclick table,F2,Ctrl+Insert
     * @author NNNinh (19/11/2022)
     */
    const handleEventTable = (mode, data) => {
      proxy.pram.mode = mode;
      proxy.dataVoucherID = data;
      proxy.isShowPopup = true;
    };

    watch(
      () => dataSelected.value,
      (newVal) => {
        proxy.loadDataVoucherDetaill();
        if (proxy.dataSelected?.length > 1) {
          proxy.isShowButtonDelete = true;
        } else {
          proxy.isShowButtonDelete = false;
        }
      }
    );

    watch(
      () => txtSearchVoucher.value,
      (newVal) => {
        proxy.loadDataVouder();
      }
    );

    const handleChangeSearch = () => {
      proxy.loadDataVouder();
    };

    /**
     * Reset lại giá trị show toast message
     * @author NNNinh (04/01/2023)
     */
    onUpdated(() => {
      if (proxy.isShowMessage == true) {
        setTimeout(() => {
          proxy.isShowMessage = false;
        }, 2000);
      }
    });

    /**
     * Gọi API lấy toàn bộ dữ liệu chứng từ
     * @author NNNINH (02/01/2023)
     */
    async function loadDataVouder() {
      try {
        proxy.allDataVoucher = [];
        proxy.isLoading = true;

        // Gọi API lấy dữ liệu tài sản
        let res = await voucherAPI.filters(
          "Vouchers/filters",
          proxy.txtSearchVoucher,
          proxy.tableView,
          proxy.currentPage
        );
        proxy.isLoading = false;
        proxy.dataTotal.totalCount = res.totalCount; // Lấy giá trị tổng số bản ghi
        proxy.dataTotal.cost = res.totalCost; // Lấy giá trị tổng số nguyên giá
        let data = res?.data;
        let o = (proxy.currentPage - 1) * proxy.tableView;
        data.forEach((x, i) => {
          x.STT = i + 1 + o;
        });
        proxy.allDataVoucher = data;
        proxy.rowVoucher();
      } catch (error) {
        proxy.isLoading = false;
        console.log(error);
      }
    }

    /**
     * focus vào input dầu tiên
     *  @author NNNinh(01/01/2023)
     */
    const focusFirst = () => {
      proxy.$refs.input.focusInput();
    };

    /**
     * Hàm lấy giá trị mã chứng từ đầu tiên của table chứng từ
     *  @author NNNINH (01/01/2023)
     */
    const rowVoucher = () => {
      proxy.dataSelected = proxy.allDataVoucher[0];
      proxy.voucherId = proxy.dataSelected ? proxy.dataSelected : [];
    };

    /**
     * Lấy dữ liệu tài sản
     * @author NNNinh (13/11/2022)
     */
    async function loadDataVoucherDetaill() {
      try {
        // Gọi API lấy dữ liệu tài sản

        let res = await voucherAPI.filterVoucherDetaill(
          "Vouchers/detail",
          "",
          proxy.tableViewAsset,
          proxy.currentPageAsset,
          proxy.voucherId["voucher_id"]
        );

        proxy.dataTotalAsset.totalCount = res.totalCount; // Lấy giá trị tổng số bản ghi
        let data = res?.data;
        let dateNow = new Date(); // Lấy ngày hiện tại
        let o = (proxy.currentPageAsset - 1) * proxy.tableViewAsset; // Tính số thứ tự
        data.forEach((x, i) => {
          x.STT = i + 1 + o;
          let hm =
            ((dateNow.getFullYear() - new Date(x.production_date).getFullYear()) *
              (x.depreciation_rate * x.cost)) /
            100; // Tính giá trị hao mòn năm
          x.depreciation_year = hm > x.cost ? x.cost : hm;
          x.depreciation_residual = x.cost - x.depreciation_year; // Tính giá trị còn lại
        });

        proxy.allDataAssetDetaill = data;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Sự kiện show mesagebox
     *  @author NNNinh(20/10/2021)
     */
    const handleShowMessBox = () => {
      try {
        //kiểm tra dataSelected bằng 0 => Hiển thị message : Bạn chưa chọn dữ liệu để xóa
        if (proxy.dataSelected.length == 0) {
          proxy.isDialogMessDeleNoData = true;
        } else {
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          if (proxy.dataSelected.length == 1) {
            proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
            proxy.isDialogMessDelete = true;
          } else {
            //kiểm tra dataSelected lớn hơn 1 => Hiển thị message : Số bản ghi đc chọn...
            proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
            proxy.isDialogMessDeleMultiple = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * API xuất dữ liệu excel
     *  @author NNNinh(10/01/2023)
     */
    async function exportToExcel() {
      try {
        proxy.isLoading = true;
        axios({
          url: "https://localhost:44375/api/v1/Vouchers/export",
          data: proxy.dataSelected,
          method: "POST",
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("_token")}`,
          },
        }).then((res) => {
          var FILE = window.URL.createObjectURL(new Blob([res.data]));
          var docUrl = document.createElement("a");
          docUrl.href = FILE;
          docUrl.setAttribute("download", "Danh_sach_chứng_từ.xlsx");
          document.body.appendChild(docUrl);
          docUrl.click();
          proxy.isLoading = false;
        });
      } catch (error) {
        proxy.isLoading = false;
        console.log(error);
      }
    }

    /**
     * Sự kiện click action sửa và xóa của table chứng từ
     * @author NNNINH (01/01/2023)
     */
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: // kiểm tra action = 0 là sửa
          proxy.pram.mode = Enum.Mode.Update;
          proxy.dataVoucherID = val;
          setTimeout(() => {
            proxy.isShowPopup = true;
          }, 100);
          break;
        case 2: // kiểm tra action = 1 là xóa
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          proxy.valueMessageBox = val.voucher_code;
          proxy.idVoucher = val.voucher_id;
          proxy.isDialogMessDelete = true;
          break;
      }
    };

    /**
     * Hiện thị toast mesage
     * @param {string} mode xác định form thêm mới ,nhân bản hay sử dữ liệu
     * @param {string} isShowMessage xác định xóa thành công hay thất bại
     * Author: NNNinh (13/11/2022)
     */
    const handleShowMess = (mode, res) => {
      try {
        if (mode == Enum.Mode.Add || mode == Enum.Mode.Duplicate) {
          setTimeout(() => {
            proxy.loadDataVouder();
            proxy.$refs.tables.resetData();
          }, 10);
          proxy.typeMessage = "success";
          proxy.isShowMessage = true;
          setTimeout(() => {
            proxy.active = proxy.allDataVoucher.findIndex((x) =>
              x.voucher_id?.toLowerCase().includes(res.toLowerCase())
            );
          }, 20);
          proxy.focusFirst();
        } else {
          setTimeout(() => {
            proxy.loadDataVouder();
            proxy.$refs.tables.resetData();
          }, 10);
          proxy.typeMessage = "updateSuccess";
          proxy.isShowMessage = true;
          setTimeout(() => {
            proxy.active = proxy.allDataVoucher.findIndex((x) =>
              x.voucher_id?.toLowerCase().includes(res.toLowerCase())
            );
          }, 20);
          proxy.focusFirst();
        }
      } catch (error) {
        console.log(error);
      }
    };

    //Custom giá trị truyền vào messbox
    function customValueMessBox(val) {
      if (val == 1) {
        return `${proxy.dataSelected[0].voucher_code}`;
      } else if (val < 10) {
        return `0${val}`;
      } else return val;
    }

    /**
     *  API Xóa 1 dòng dữ liệu
     * @author NNNinh (05/01/2023)
     */
    async function deleteVoucherAPI() {
      try {
        let res = await voucherAPI.delete("Vouchers", proxy.idVoucher);
        if (res != null || res != "") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    /**
     * API Xóa nhiều dữ liệu
     * @Author: NNNinh (11/01/2023)
     */
    async function deleteMultiVoucher() {
      try {
        let arr = [];
        proxy.dataSelected.forEach((data) => {
          arr.push(data.voucher_id);
        });
        let res = await assetAPI.post("Vouchers/batch-delete", arr);

        if (res != null || res != "") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Sự kiện xóa dữ liệu 1 dòng
    const handleMultiDelete = async () => {
      try {
        let result = await proxy.deleteMultiVoucher();
        if (result) {
          proxy.isDialogMessDeleMultiple = false;
          proxy.typeMessage = "successDelete";
          proxy.isShowMessage = true;
          proxy.loadDataVouder();
          proxy.$refs.tables.resetData();
          proxy.focusFirst();
        } else {
          proxy.isDialogMessDeleMultiple = false;
          proxy.typeMessage = "errorDelete";
          proxy.isShowMessage = true;
          proxy.loadDataVouder();
          proxy.$refs.tables.resetData();
          proxy.focusFirst();
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Xử lý sự kiện sau cùng  khi xóa
     *  @author NNNinh(13/01/2023)
     */
    const handleDelete = async () => {
      try {
        let result = await proxy.deleteVoucherAPI();
        if (result) {
          proxy.isDialogMessDelete = false;
          proxy.typeMessage = "successDelete";
          proxy.isShowMessage = true;
          proxy.loadDataVouder();
          proxy.$refs.tables.resetData();
          proxy.focusFirst();
        } else {
          proxy.isDialogMessDelete = false;
          proxy.typeMessage = "errorDelete";
          proxy.isShowMessage = true;
          proxy.loadDataVouder();
          proxy.$refs.tables.resetData();
          proxy.focusFirst();
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (13/01/2023)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.Ctrl) {
        proxy.ctrlPressed = true;
      } else if (e.which == 49 && proxy.ctrlPressed == true) {
        proxy.handleClickAdd();
        proxy.ctrlPressed = false;
      }
    };

    /**
     * Xử lý sự kiện đóng popup detail
     *  @author NNNinh(13/01/2023)
     */
    const handleClosePopupDetaill = () => {
      proxy.isShowPopup = false;
    };

    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * @author NNNinh (01/01/2023)
     */
    const columnVouchers = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: "STT",
        type: "Number",
        width: 40,
        align: "Center",
      },
      {
        field: ResourceTable.FieldVoucher.voucherCode,
        title: "Số chứng từ",
        type: "Text",
        align: "Left",
        width: 150,
        color: "#0993EA",
      },
      {
        field: ResourceTable.FieldVoucher.voucherDate,
        title: "Ngày chứng từ",
        type: "Date",
        minWidth: 140,
        align: "Center",
        width: 150,
      },

      {
        field: ResourceTable.FieldVoucher.incrementDate,
        title: "Ngày ghi tăng",
        type: "Date",
        align: "Center",
        width: 150,
      },

      {
        field: ResourceTable.FieldVoucher.cost,
        title: "Tổng nguyên giá",
        type: "Number",
        summary: "sum",
        width: 200,
        align: "Right",
      },
      {
        field: ResourceTable.FieldVoucher.description,
        title: "Nội dung",
        type: "Text",
        minWidth: 140,
      },

      {
        field: ResourceTable.FieldVoucher.voucherId,
        type: "Action",
        position: "absolute",
        align: "Center",
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

    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * @Author: NNNinh (16/10/2022)
     */
    const columnsAssetDetaill = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 60,
        minWidth: 60,
        maxWidth: 60,
        align: "Center",
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCode,
        title: ResourceTable.lblTableAssets.lblAssetCode,
        type: "Text",
        align: "Left",
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 270,
      },

      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 270,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 190,
      },
      {
        field: ResourceTable.FieldAsset.depreciationYear,
        title: "Hao mòn năm",
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 190,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        summary: "sum",
        align: "Right",
        width: 190,
      },
    ]);

    return {
      active,
      menuSelect,
      isShowPopup,
      isLoading,
      currentPage,
      loadDataVouder,
      tableView,
      dataSelected,
      dataTotal,
      handleTotalPage,
      handleChangeTab,
      columnVouchers,
      columnsAssetDetaill,
      allDataVoucher,
      allDataAssetDetaill,
      txtSearchVoucher,
      handleChangeSearch,
      voucherAPI,
      handleClickAdd,
      pram,
      isShowEnlarge,
      isShowNormale,
      handleOnToolEnlarge,
      handleOnToolNormal,
      handleOnToolVertical,
      handleOnToolNoVertical,
      isShowVertical,
      txtSearchAsset,
      currentPageAsset,
      tableViewAsset,
      dataTotalAsset,
      loadDataVoucherDetaill,
      handleTotalPageAsset,
      handleChangeTabAsset,
      activeAsset,
      clickMenu,
      rowVoucher,
      dataVoucherID,
      handleEventTable,
      voucherId,
      handleClosePopupDetaill,
      typeMessage,
      isShowMessage,
      handleShowMess,
      valueMessageBox,
      handleShowMessBox,
      isDialogMessDelete,
      Resource,
      isDialogMessDeleMultiple,
      deleteVoucherAPI,
      handleDelete,
      customValueMessBox,
      isShowButtonDelete,
      deleteMultiVoucher,
      handleMultiDelete,
      exportToExcel,
      idVoucher,
      keyboardEvent,
      ctrlPressed,
      focusFirst,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/voucher/MsVoucher.scss";
@import "@/assets/scss/components/v_message_box.scss";
.tbl-asset_detail {
  height: 81vh !important;
}
.tbl-vertica {
  height: 77.5vh !important;
}
</style>
