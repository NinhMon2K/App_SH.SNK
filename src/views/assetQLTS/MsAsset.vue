<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <!-- Nhập dữ liệu tìm kiếm theo mã tài sản hoặc bộ phận sử dụng
             @author NNNINH (22/11/2022) -->
        <v-input
          id="txt-search"
          :hasLabel="false"
          :radius="true"
          leftIcon="ic-search"
          placeholder="Tìm kiếm tài sản"
          :disabledMessage="false"
          v-model="txtSearch"
          :tabindex="'1'"
          @blur="handleChangeSeach"
          @change="handleChangeSeach"
          @keypress.enter="handleChangeSeach"
        ></v-input>
      </div>

      <!-- combobox dữ liệu loại tài sản
            @author NNNINH (22/11/2022) -->
      <v-combobox
        leftIcon="ic-fillter"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        :heightCb="13"
        :tabindex="'2'"
        v-model="selectedAssetCategory"
        :valueField="ResourceTable.FieldAssetCategory.fixedAssetCategoryId"
        :displayField="ResourceTable.FieldAssetCategory.fixedAssetCategoryName"
        :dataAll="DataAssetCategory.value"
      ></v-combobox>
      <!-- combobox dữ liệu bộ phận sử dụng
            @author NNNINH (22/11/2022) -->
      <v-combobox
        leftIcon="ic-fillter"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :heightCb="13"
        :tabindex="'3'"
        v-model="selectedAssetDepartment"
        :valueField="ResourceTable.FieldDepartment.departmentId"
        :displayField="ResourceTable.FieldDepartment.departmentName"
        :dataAll="DataDepartment.value"
      ></v-combobox>
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <!-- buttom thêm mới -->
        <v-button
          text="Thêm tài sản"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          @click="handleClickAdd"
          :tabindex="'4'"
        >
        </v-button>
      </v-tooltip>

      <!-- buttom xuất excel -->
      <v-tooltip content="Xuất Excel" placement="bottom">
        <v-button
          leftIcon="ic-export"
          id="btn-export"
          :tabindex="'5'"
          :radius="true"
          @click="handleExportExcel"
        ></v-button>
      </v-tooltip>

      <!-- buttom xóa -->
      <v-tooltip content="Xóa" placement="bottom">
        <v-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :radius="true"
          :tabindex="'6'"
          @click="handleShowMessBox"
        >
        </v-button>
      </v-tooltip>

      <!-- popup asset -->
      <v-popup-asset
        v-if="isShowPopup"
        :formModel="pram"
        :allData="dataAssetID[0] || dataAssetID"
        @handle-close="handlClosePopup"
        @show-message="handleShowMess"
        :dataAll="dataAllAsset.value"
      ></v-popup-asset>
    </div>
  </div>

  <!-- Dialog xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultiple.VI"
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

  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneAsset.VI"
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

  <!-- Dialog cancel xóa -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      :disabledNoDelete="true"
      v-if="isDialogMessCancelDelete"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Close.VI"
        @click="isDialogMessCancelDelete = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog cancel xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDeleMultiple"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Agree.VI"
        @click="isDialogMessCancelDeleMultiple = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

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
  <!-- Loading form -->
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>

  <!-- Bảng dữ liệu tài sản -->
  <v-grid
    :columns="columns"
    :allData="allData"
    :selectedCol="true"
    :dataTotal="dataTotal"
    v-model:active="active"
    :disableFooter="true"
    ref="table"
    @deleteOnKey="handleShowMessBox"
    v-model:selectedData="dataSelected"
    @handleEventTable="handleEventTable"
    @handle-close="handlClosePopup"
    @show-message="handleShowMess"
    @currentPage="handleTotalPage"
    @changeTabView="handleChangeTab"
  >
  </v-grid>

  <!-- Có hiện thông báo message hay không -->
  <teleport to="body">
    <v-message :type="typeMessage" v-show="isShowMessage"></v-message>
  </teleport>
</template>
<script>
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import VPopupAsset from "@/components/popup/VPopupAsset.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import VCombobox from "@/components/combobox/VCombobox.vue";
import VGrid from "@/components/grid/VGrid.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";
import axios from "axios";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
export default {
  name: "MsAsset",
  components: {
    VButton,
    VInput,
    VGrid,
    VPopupAsset,
    VLoading,
    VCombobox,
    VTooltip,
    VMessageBox,
    VMessage,
  },
  methods: {
    close() {
      this.isShowPopup = false;
    },
    hanhdleAccumulated() {},
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.asset = proxy;
    const isLoading = ref(false);
    const isDialogMessDeleMultiple = ref(false);
    const isDialogMessDelete = ref(false);
    const isDialogMessCancelDelete = ref(false);
    const isDialogMessCancelDeleMultiple = ref(false);
    const isDialogMessDeleNoData = ref(false);
    const valueMessageBox = ref("");
    const allData = ref([]);
    const txtSearch = ref(" ");
    const currentPage = ref(0);
    const tableView = ref(0);
    const isShowPopup = ref(false);
    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);
    const dataAssetID = ref({});
    const active = ref(-1);

    const isShowMessage = ref(false);
    const typeMessage = ref("");
    const dataSelected = ref([]);
    const disabledButton = reactive({
      disabledExport: true,
      disabledDelete: true,
    });

    const selectedAssetCategory = ref([]);
    const selectedAssetDepartment = ref([]);

    let pram = ref({});

    const dataTotal = ref({});

    /**
     * Hiện thi giá trị cảnh báo
     * @param {string} iconMessage icon cho cảnh báo
     * @param {string} textMessage title cho cảnh báo
     * @param {boolean} isShow Có hiển thị cảnh báo hay không
     * Author: NNNinh (16/10/2022)
     */
    const confirmMessage = reactive({
      iconMessage: "",
      textMessage: "",
      isShow: false,
    });

    /**
     * Thực hiện gọi dữ liệu api bộ phận sử dụng và loại tài sản
     * @Author: NNNinh (19/11/2022)
     */
    onMounted(() => {
      proxy.loadDataCombotCategory();
      proxy.loadDataComboDepartment();
    });

    /**
     * Reset lại giá trị show toast message
     * @Author: NNNinh (19/11/2022)
     */
    onUpdated(() => {
      if (proxy.isShowMessage == true) {
        setTimeout(() => {
          proxy.isShowMessage = false;
        }, 2000);
      }
    });

    /**
     * Xử lý sự kiện dblclick table,F2,Ctrl+Insert
     * @Author: NNNinh (19/11/2022)
     */
    const handleEventTable = (mode, data) => {
      proxy.pram.mode = mode;
      proxy.dataAssetID = data;
      proxy.isShowPopup = true;
    };
    /**
     * Theo dõi thay đổi mảng selected table thì disable button xóa và xuất excel hay không
     * @Author: NNNinh (19/11/2022)
     */
    watch(
      () => dataSelected.value,
      (newVal) => {
        if (proxy.dataSelected.length == 0) {
          proxy.disabledButton.disabledExport = true;
          proxy.disabledButton.disabledDelete = true;
        } else {
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          if (proxy.dataSelected.length == 1) {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          } else {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          }
        }
      }
    );

    /**
     * Theo dõi thay đổi mảng loại tài sản thì load lại dữ liệu
     * @Author: NNNinh (13/11/2022)
     */
    onMounted(() => {
      watch(
        () => proxy.selectedAssetCategory,
        (newVal) => {
          proxy.loadDataAsset();
        },
        { deep: true }
      );
    });

    /**
     * Theo dõi thay đổi mảng bộ phận sử dụng thì load lại dữ liệu
     * @Author: NNNinh (13/11/2022)
     */
    onMounted(() => {
      watch(
        () => proxy.selectedAssetDepartment,
        (newVal) => {
          proxy.loadDataAsset();
        },
        { deep: true }
      );
    });

    /**
     * Lấy dữ liệu tài sản
     * @Author: NNNinh (13/11/2022)
     */
    async function loadDataAsset() {
      try {
        proxy.isLoading = true;
        // Mảng lưu dữ liệu mã loại tài sản
        let arrCategory = [];
        // Mảng lưu dữ liệu mã bộ phận sử dụng
        let arrDepartment = [];
        proxy.selectedAssetCategory.forEach((item) => {
          arrCategory.push(item.fixed_asset_category_id);
        });
        proxy.selectedAssetDepartment.forEach((item) => {
          arrDepartment.push(item.department_id);
        });

        // Đối tượng paging tài sản
        let pagingAsset = {
          keyword: proxy.txtSearch, // Giá trị tìm kiếm tài sản
          listDepartment: arrDepartment, // Mảng dữ liệu mã bộ phận sử dụng
          listCategory: arrCategory, // Mảng dữ liệu mã loại tài sản
          limit: proxy.tableView, // Số bản ghi hiện lên một trang
          page: proxy.currentPage, // Trang hiện tại
        };

        // Gọi API lấy dữ liệu tài sản
        let res = await assetAPI.filters("Assets/Filters", pagingAsset);
        proxy.isLoading = false;
        proxy.dataTotal.totalCount = res.totalCount; // Lấy giá trị tổng số bản ghi
        proxy.dataTotal.quantity = res.totalQuantity; // Lấy giá trị tổng số lượng
        proxy.dataTotal.cost = res.totalCost; // Lấy giá trị tổng số nguyên giá
        proxy.dataTotal.depreciation_year = res.totalDepreciation; // Lấy tổng số khấu hao hao mòn lũy kế
        proxy.dataTotal.depreciation_residual = res.totalRemain; // Lấy tổng số giá trị còn lại
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
     * Lấy dữ liệu data combobox loại tài sản
     * @Author: NNNinh (13/11/2022)
     */
    async function loadDataCombotCategory() {
      try {
        let res = await assetAPI.get("Categories/GetAll", {});
        proxy.DataAssetCategory.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      proxy.loadDataAllAsset();
    });
    const dataAllAsset = ref([]);
    async function loadDataAllAsset() {
      try {
        let res = await assetAPI.get("Assets/GetAll", {});
        proxy.dataAllAsset.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * API xuất dữ liệu excel
     * @Author: NNNinh (13/11/2022)
     */
    async function exportToExcel() {
      try {
        proxy.isLoading = true;
        axios({
          url: "https://localhost:44375/api/v1/Assets/export",
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
          docUrl.setAttribute("download", "Danh_sach_tai_san.xlsx");
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
     *  Load dữ liệu data combobox tên bộ phận
     * @Author: NNNinh (13/11/2022)
     */
    async function loadDataComboDepartment() {
      try {
        let res = await assetAPI.get("Departments/GetAll", {});
        proxy.DataDepartment.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     *  API Xóa 1 dòng dữ liệu
     * @Author: NNNinh (13/11/2022)
     */
    async function deleteAsset() {
      try {
        let fixed_asset_id = proxy.dataSelected[0].fixed_asset_id;
        let res = await assetAPI.delete("Assets", fixed_asset_id);
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
     * @Author: NNNinh (13/11/2022)
     */
    async function deleteMultiAsset() {
      try {
        let arr = [];
        proxy.dataSelected.forEach((data) => {
          arr.push(data.fixed_asset_id);
        });
        let res = await assetAPI.post("Assets/batch-delete", arr);
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
     * Check tài sản này đã có chứng từ hay không
     * @author NNNinh (13/01/2023)
     */
    async function checkIncrement() {
      try {
        let res = await assetAPI.checkIncrement(
          "Assets/checkIncrement",
          proxy.dataSelected[0].fixed_asset_id
        );
        if (res != null || res != "") {
          return res?.code;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    watch(
      () => isShowMessage.value,
      (newVal) => {
        if (proxy.isShowMessage == true) {
          setTimeout(() => {
            proxy.isShowMessage == false;
          }, 2000);
        }
      }
    );
    onUpdated(() => {});

    /**
     * Xuất dữ liệu excel
     * @Author: NNNinh (13/11/2022)
     */
    const handleExportExcel = () => {
      proxy.exportToExcel();
    };

    /**
     * Hiện thị toast mesage
     * @param {string} mode xác định form thêm mới ,nhân bản hay sử dữ liệu
     * @param {string} isShowMessage xác định xóa thành công hay thất bại
     * Author: NNNinh (13/11/2022)
     */
    const handleShowMess = (mode, res, isShowMessage) => {
      try {
        if (mode == Enum.Mode.Add || mode == Enum.Mode.Duplicate) {
          setTimeout(() => {
            proxy.loadDataAsset();
            proxy.$refs.table.resetData();
          }, 10);
          proxy.typeMessage = "success";
          proxy.isShowMessage = true;
          proxy.active = proxy.allData.findIndex((x) => x.fixed_asset_id == res);
        } else {
          setTimeout(() => {
            proxy.loadDataAsset();
            proxy.$refs.table.resetdata();
          }, 10);
          proxy.typeMessage = "updateSuccess";
          proxy.isShowMessage = true;
          proxy.active = proxy.allData.findIndex((x) => x.fixed_asset_id == res);
        }
      } catch (error) {
        console.log(error);
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
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
    };

    // Sự kiện change page number
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
      proxy.loadDataAsset();
    };

    // Sự kiện change giới hạn bản ghi
    const handleChangeTab = (val) => {
      proxy.tableView = val;
      proxy.loadDataAsset();
    };

    //Custom giá trị truyền vào messbox
    function customValueMessBox(val) {
      if (val == 1) {
        return `<<${proxy.dataSelected[0].fixed_asset_code} - ${proxy.dataSelected[0].fixed_asset_name}>>`;
      } else if (val < 10) {
        return `0${val}`;
      } else return val;
    }

    //Custom number
    function customValueNumber(val) {
      if (val < 10) {
        return `0${val}`;
      } else return val;
    }

    //Sự kiện đóng popup
    const handlClosePopup = (value) => {
      proxy.isShowPopup = value;
    };

    /**
     * Sự kiện show mesagebox
     *  @author NNNinh(20/10/2021)
     */
    const handleShowMessBox = async () => {
      try {
        //kiểm tra dataSelected bằng 0 => Hiển thị message : Bạn chưa chọn dữ liệu để xóa
        if (proxy.dataSelected.length == 0) {
          proxy.isDialogMessDeleNoData = true;
        } else {
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          if (proxy.dataSelected.length == 1) {
            proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
            if (proxy.dataSelected[0].increment_status) {
              let res = await proxy.checkIncrement();
              let text = `Tài sản có mã <b>${proxy.dataSelected[0].fixed_asset_code}</b> đã phát sinh chứng từ ghi tăng có mã <b>${res}</b>`;
              proxy.valueMessageBox = text;
              proxy.isDialogMessCancelDelete = true;
            } else {
              proxy.isDialogMessDelete = true;
            }
          } else {
            //kiểm tra dataSelected lớn hơn 1 => Hiển thị message : Số bản ghi đc chọn...
            proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
            let indexCheck = 0;
            proxy.dataSelected.forEach((x) => {
              if (x.increment_status) {
                indexCheck++;
              }
            });
            if (indexCheck > 0) {
              proxy.valueMessageBox = proxy.customValueNumber(indexCheck);
              proxy.isDialogMessCancelDeleMultiple = true;
            } else {
              proxy.isDialogMessDeleMultiple = true;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Sự kiện xóa dữ liệu 1 dòng
    const handleDelete = async () => {
      try {
        let result = await proxy.deleteAsset();
        if (result) {
          proxy.isDialogMessDelete = false;
          proxy.typeMessage = "successDelete";
          proxy.isShowMessage = true;
          proxy.loadDataAsset();
          proxy.$refs.table.resetdata();
        } else {
          proxy.isDialogMessDelete = false;
          proxy.typeMessage = "errorDelete";
          proxy.isShowMessage = true;
          proxy.loadDataAsset();
          proxy.$refs.table.resetdata();
        }
      } catch (error) {
        console.log(error);
      }
    };
    // Xử lý sự kiện change input tìm kiếm
    const handleChangeSeach = () => {
      proxy.loadDataAsset();
    };

    // Sự kiện xóa dữ liệu 1 dòng
    const handleMultiDelete = async () => {
      try {
        let result = await proxy.deleteMultiAsset();
        if (result) {
          proxy.isDialogMessDeleMultiple = false;
          proxy.typeMessage = "successDelete";
          proxy.isShowMessage = true;
          proxy.loadDataAsset();
          proxy.$refs.table.resetdata();
        } else {
          proxy.isDialogMessDeleMultiple = false;
          proxy.typeMessage = "errorDelete";
          proxy.isShowMessage = true;
          proxy.loadDataAsset();
          proxy.$refs.table.resetdata();
        }
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Xử lý sự kiện click thêm mới
     *  @author NNNinh(20/10/2021)
     */
    const handleClickAdd = () => {
      proxy.pram.mode = Enum.Mode.Add;
      proxy.isShowPopup = true;
    };

    /**
     * Sự kiện click chức năng sửa hay nhân bản
     * @param {string} action xác định cho form là sửa hay nhân bản
     * @param {string} val giá trị mã tài sản
     * Author: NNNinh (16/10/2022)
     */
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: // kiểm tra action = 0 là sửa
          proxy.pram.mode = Enum.Mode.Update;
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
          proxy.isShowPopup = true;
          break;
        case 1: // kiểm tra action = 1 là nhân bản
          proxy.pram.mode = Enum.Mode.Duplicate;
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
          proxy.isShowPopup = true;
          break;
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
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        width: 150,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCategoryName,
        title: ResourceTable.lblTableAssets.lblAssetCategoryName,
        type: "Text",
        width: 200,
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 200,
      },
      {
        field: ResourceTable.FieldAsset.quantity,
        title: ResourceTable.lblTableAssets.lblQuantity,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 60,
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
        title: ResourceTable.lblTableAssets.lblAccumulated,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        align: "Right",
        summary: "sum",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetId,
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 100,
        align: "Center",
        position: "relative",
        action: [
          {
            command: 0,
            icon: "ic-edit",
            click: clickMenu,
          },
          {
            command: 1,
            icon: "ic-replication",
            click: clickMenu,
          },
        ],
      },
    ]);

    return {
      isLoading, // loading trang
      isDialogMessDeleMultiple, // show message xóa nhiều dữ liệu
      isDialogMessDelete, // Hiển thị dialog xóa hay không
      isDialogMessCancelDelete, // Hiển thị thông báo không thể xóa
      isDialogMessCancelDeleMultiple, // Hiển thị thông báo không thể xóa nhiều khi có chứng từ phát sinh
      isShowPopup, // Có hiện show popup hay không
      isDialogMessDeleNoData, // show message chưa chọn dữ liệu để xóa
      disabledButton, // disabled buttom hay không
      txtSearch, // Từ khóa để tìm kiếm (theo mã và tên tài sản )
      tableView, // Số bản ghi muốn hiện lên trong 1 trang
      currentPage, // Trang đang chọn, đang đứng hiện tại
      columns, // Mảng xác định các cột, trường dữ liệu của table
      allData, // Mảng lưu toàn bộ dữ liệu tài sản
      pram, // Đối tượng xác định là thêm mới, nhân bản, sử tài sản
      dataAssetID, // Biến lấy dữ liệu mã tài sản
      dataSelected, // Mảng lấy dữ liệu những dòng checked
      dataTotal, // Đối tượng lấy tổng số bản ghi, số lượng, nguyên giá, hao mòn lũy kế,tổng số còn lại
      customValueMessBox, // custom lại giá trị khi cho vào message
      DataAssetCategory, // dữ liệu data mã loại tài sản
      DataDepartment, // dữ liệu data bộ phận
      ResourceTable, // Resource table
      Resource, // Resource
      confirmMessage, // Hiển thị cảnh báo
      valueMessageBox, // title của messagebox
      clickMenu, // Xử lý sự kiện click menu
      loadDataAsset, // Lấy dữ liệu toàn bộ tài sản
      loadDataCombotCategory, // Lấy dữ liệu toàn bộ loại tài sản
      loadDataComboDepartment, // Lấy dữ liệu toàn bộ phận xử dụng
      handleClickAdd, // Xử lý sự kiện click buttom thêm mới tài sản
      handleDelete, // Sự kiện xóa dữ liệu 1 dòng
      handleTotalPage, // Sự kiện change trang trong pageding
      handleShowMessBox, // Sự kiện show mesagebox
      handlClosePopup, // Sự kiện close popup
      handleShowMess, // Hiện thị toast mesage
      deleteAsset, // Xử lý sự kiện xóa dữ liệu tài sản
      handleMultiDelete, // Xử lý sự kiện xóa nhiều dữ liệu dữ liệu tài sản
      deleteMultiAsset, // API xóa nhiều tài sản
      handleChangeSeach, // Xử lý sự kiện change tìm kiếm
      handleChangeTab, // Xử lý sự kiện change dữ liệu tabview
      selectedAssetCategory,
      selectedAssetDepartment,
      active,
      exportToExcel,
      handleExportExcel,
      loadDataAllAsset,
      dataAllAsset,
      handleEventTable,
      typeMessage,
      isShowMessage,
      customValueNumber,
      checkIncrement,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/assetsQLTS/MsAsset.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
