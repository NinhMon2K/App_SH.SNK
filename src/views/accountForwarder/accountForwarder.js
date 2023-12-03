import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";

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
import axios from "axios";
export const useAccountForwarder = () => {
  const { proxy } = getCurrentInstance();
  window.asset = proxy;
  const isLoading = ref(false);
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
  const fromDate = ref(new Date().toDate());
  const toDate = ref("2023-12-21");
  const disabledButton = reactive({
    disabledExport: true,
    disabledDelete: true,
  });

  const selectedAssetCategory = ref([]);
  const selectedAssetDepartment = ref([]);

  let pram = ref({});

  const dataTotal = ref({});

  onMounted(() => {
    // Tạo một đối tượng Date cho ngày hiện tại
    let today = new Date();
    // Đặt ngày của đối tượng Date thành 1 để lấy ngày đầu tiên của tháng
    proxy.fromDate = today.setDate(1);
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
   * Xử lý sự kiện dblclick table,F2,Ctrl+Insert
   * @Author: NNNinh (19/11/2022)
   */
  const handleEventTable = (mode, data) => {
    proxy.pram.mode = mode;
    proxy.dataAssetID = data;
    proxy.isShowPopup = true;
  };

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
      let data = res?.data;
      let o = (proxy.currentPage - 1) * proxy.tableView;

      let a = {
        ResponseStatus: "success",
        ResponseData: [
          {
            Id: "42f89b82-9445-40a1-80a1-1d48644c3c4b",
            UserName: "ds",
            FullName: "ád",
            Email: "nguyennghianinh98@gmail.com",
            Password: null,
            ConfirmPassword: null,
            LstEmail: ["nguyennghianinh98@gmail.com"],
            PasswordHash: "6mtHm3l2x9y8FwO8FW2y5Q==",
            PhoneNumber: null,
            adres1: null,
            Active: true,
            CreateBy: "nnnam",
            CreateDate: "/Date(1644173319197)/",
            ModifyBy: null,
            ModifyDate: null,
            LoginType: null,
          },
          {
            Id: "BDC8904C-642C-4B1E-8D18-4E47F6AF8956",
            UserName: "nvc1",
            FullName: "nvc1",
            Email: "nguyennghianinh98@gmail.com",
            Password: null,
            ConfirmPassword: null,
            LstEmail: ["nguyennghianinh98@gmail.com"],
            PasswordHash: "6mtHm3l2x9y8FwO8FW2y5Q==",
            PhoneNumber: "022626565",
            adres1: "asd",
            Active: true,
            CreateBy: "abc",
            CreateDate: "/Date(1642926633587)/",
            ModifyBy: null,
            ModifyDate: null,
            LoginType: null,
          },
          {
            Id: "D70E4713-95C2-4599-85CD-9139E867E033",
            UserName: "nvc2",
            FullName: "nvc2",
            Email: "nguyennghianinh98@gmail.com",
            Password: null,
            ConfirmPassword: null,
            LstEmail: ["nguyennghianinh98@gmail.com"],
            PasswordHash: "6mtHm3l2x9y8FwO8FW2y5Q==",
            PhoneNumber: "03565466",
            adres1: "asd",
            Active: true,
            CreateBy: "abc",
            CreateDate: "/Date(1642926651753)/",
            ModifyBy: null,
            ModifyDate: null,
            LoginType: null,
          },
        ],
        ResponseMessenger: "success",
      };
      a.ResponseData.forEach((x, i) => {
        x.STT = i + 1 + o;
      });
      proxy.allData = a.ResponseData;
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

  //Sự kiện đóng popup
  const handlClosePopup = (value) => {
    proxy.isShowPopup = value;
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

  const handleCl = (val) => {
    debugger;
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
      type: "Text",
      width: 40,
      align: "Center",
    },
    {
      field: "UserName",
      title: "Tài khoản",
      type: "Text",
      width: 150,
      link: handleCl,
      component: "BookingRequestDetail",
    },
    {
      field: "FullName",
      title: "Họ và tên",
      type: "TextHtml",
      width: 160,
    },
    {
      field: "Email",
      title: "Email",
      type: "TextLink",
      width: 250,
      align: "Center",
      component: "BookingResponse",
    },
    {
      field: "PhoneNumber",
      title: "Số điện thoại",
      type: "Text",
      align: "Center",
      width: 120,
    },
    {
      field: "adres1",
      title: "Địa chỉ",
      type: "Text",
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
          component: "BookingRequestDetail",
        },
        {
          command: 1,
          icon: "ic-delete",
          component: "BookingRequestDetail",
          field: "fixed_asset_code",
        },
      ],
    },
  ]);

  return {
    isLoading, // loading trang
    isShowPopup, // Có hiện show popup hay không
    disabledButton, // disabled buttom hay không
    txtSearch, // Từ khóa để tìm kiếm (theo mã và tên tài sản )
    tableView, // Số bản ghi muốn hiện lên trong 1 trang
    currentPage, // Trang đang chọn, đang đứng hiện tại
    columns, // Mảng xác định các cột, trường dữ liệu của table
    allData, // Mảng lưu toàn bộ dữ liệu tài sản
    pram, // Đối tượng xác định là thêm mới, nhân bản, sử tài sản
    dataAssetID, // Biến lấy dữ liệu mã tài sản
    dataTotal, // Đối tượng lấy tổng số bản ghi, số lượng, nguyên giá, hao mòn lũy kế,tổng số còn lại
    DataAssetCategory, // dữ liệu data mã loại tài sản
    DataDepartment, // dữ liệu data bộ phận
    ResourceTable, // Resource table
    Resource, // Resource
    valueMessageBox, // title của messagebox
    clickMenu, // Xử lý sự kiện click menu
    loadDataAsset, // Lấy dữ liệu toàn bộ tài sản
    loadDataCombotCategory, // Lấy dữ liệu toàn bộ loại tài sản
    loadDataComboDepartment, // Lấy dữ liệu toàn bộ phận xử dụng
    handleClickAdd, // Xử lý sự kiện click buttom thêm mới tài sản
    handleTotalPage, // Sự kiện change trang trong pageding
    handlClosePopup, // Sự kiện close popup
    handleChangeTab, // Xử lý sự kiện change dữ liệu tabview
    selectedAssetCategory,
    selectedAssetDepartment,
    active,
    loadDataAllAsset,
    dataAllAsset,
    handleEventTable,
    handleCl,
    fromDate,
    toDate,
  };
};
