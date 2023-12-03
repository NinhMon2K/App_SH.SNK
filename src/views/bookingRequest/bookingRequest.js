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
export const useBookingRequest = () => {
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
            Id: "d4b52d45-46a1-41e7-a98a-089cb2fd3a89",
            ItemName: "2",
            ContractNumber: "1",
            RequestNumber: "RQ020",
            SupplierName: "3",
            SupplierContact: "4",
            ReadyTime: "/Date(1701596071173)/",
            PortLoading: "5",
            PortDischarge: "HP",
            Note: "6",
            Active: true,
            Status: "Sent",
            CreateBy: "nnninh",
            FullName: null,
            CreateDate: "/Date(1701596084630)/",
            ModifyBy: null,
            ModifyDate: "/Date(-62135596800000)/",
            ForwarderResponse: "(0/3)",
            strReadyTime: "2023-12-03",
            lstBookingRequestDetail: [],
            strCreateDate: "2023-12-03",
            ETD: null,
            ETA: null,
            TotalAmount: 0,
            strETD: "",
            strETA: "",
            Reason: null,
            FWDName: null,
          },
          {
            Id: "ed76eb53-ac28-4bcb-8d06-8e8e60be1467",
            ItemName: "dasd",
            ContractNumber: "dsa",
            RequestNumber: "RQ019",
            SupplierName: "das",
            SupplierContact: "dasd",
            ReadyTime: "/Date(1701519538443)/",
            PortLoading: "dsad",
            PortDischarge: "HP",
            Note: "dasd",
            Active: true,
            Status: "Responseded",
            CreateBy: "nnninh",
            FullName: null,
            CreateDate: "/Date(1701519549940)/",
            ModifyBy: null,
            ModifyDate: "/Date(-62135596800000)/",
            ForwarderResponse: "(1/3)",
            strReadyTime: "2023-12-02",
            lstBookingRequestDetail: [],
            strCreateDate: "2023-12-02",
            ETD: null,
            ETA: null,
            TotalAmount: 0,
            strETD: "",
            strETA: "",
            Reason: null,
            FWDName: null,
          },
          {
            Id: "855fa373-1a29-4bd6-8f5b-313276db11d3",
            ItemName: "dasd",
            ContractNumber: "dsa",
            RequestNumber: "RQ019",
            SupplierName: "das",
            SupplierContact: "dasd",
            ReadyTime: "/Date(1701519538443)/",
            PortLoading: "dsad",
            PortDischarge: "HP",
            Note: "dasd",
            Active: true,
            Status: "Sent",
            CreateBy: "nnninh",
            FullName: null,
            CreateDate: "/Date(1701519549937)/",
            ModifyBy: null,
            ModifyDate: "/Date(-62135596800000)/",
            ForwarderResponse: "(0/3)",
            strReadyTime: "2023-12-02",
            lstBookingRequestDetail: [],
            strCreateDate: "2023-12-02",
            ETD: null,
            ETA: null,
            TotalAmount: 0,
            strETD: "",
            strETA: "",
            Reason: null,
            FWDName: null,
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
      field: "RequestNumber",
      title: "Số yêu cầu",
      type: "TextLink",
      width: 110,
      link: handleCl,
      component: "BookingRequestDetail",
    },
    {
      field: "Status",
      title: "Trạng thái",
      type: "TextHtml",
      width: 120,
    },
    {
      field: "ForwarderResponse",
      title: "Phản hồi",
      type: "TextLink",
      width: 80,
      align: "Center",
      component: "BookingResponse",
    },
    {
      field: "ContractNumber",
      title: "Hợp đồng",
      type: "Text",
      width: 200,
    },
    {
      field: "ItemName",
      title: "Hàng hóa",
      type: "Text",
      width: 200,
    },
    {
      field: "SupplierName",
      title: "Người giao hàng",
      type: "Text",
      width: 160,
    },
    {
      field: "SupplierContact",
      title: "Liên hệ người gửi hàng",
      type: "Text",
      width: 200,
    },
    {
      field: "strReadyTime",
      title: "Thời gian hàng hóa sẵn sàng",
      type: "Date",
      align: "Center",
      width: 200,
    },
    {
      field: "PortLoading",
      title: "Cảng chất hàng",
      type: "Text",
      width: 200,
    },
    {
      field: "CreateBy",
      title: "Người tạo",
      type: "Text",
      width: 180,
    },
    {
      field: "strCreateDate",
      title: "Ngày tạo",
      type: "Date",
      width: 200,
    },
    {
      field: "strETD",
      title: "ETD",
      type: "Text",
      width: 200,
    },
    {
      field: "strETA",
      title: "ETA",
      type: "Text",
      width: 200,
    },
    {
      field: "TotalAmount",
      title: "Total Amount (USD)",
      type: "Text",
      width: 200,
    },
    // {
    //   field: ResourceTable.FieldAsset.depreciationYear,
    //   title: ResourceTable.lblTableAssets.lblAccumulated,
    //   type: "Number",
    //   align: "Right",
    //   summary: "sum",
    //   width: 110,
    // },
    // {
    //   field: ResourceTable.FieldAsset.depreciationResidual,
    //   title: ResourceTable.lblTableAssets.lblAsset,
    //   type: "Number",
    //   align: "Right",
    //   summary: "sum",
    //   width: 110,
    // },
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
