export default {
  // Text cho left menu
  LeftMenu: {
    TitleLogo: "MISA QLTS",
    Control: "Control",
    Dashboard: "Tổng quan",
    FA: "Tài sản",
    SU: "Công cụ dụng cụ",
    Report: "Báo cáo",
    Search: "Tra cứu",
    Dictionary: "Danh mục",
    HTDBAsset: "Tài sản HT-ĐB",
    HTDBAssetTT: "Tài sản hạ tầng đường bộ",
  },

  // title error cho validate
  ErrorValidate: {
    AssetName: {
      VI: "Cần phải nhập tên tài sản",
      EN: "Asset name is not empty",
    },
    AssetCode: {
      VI: "Cần phải nhập mã tài sản",
      EN: "Asset code is not empty",
    },
    DepartmentCode: {
      VI: "Cần phải nhập mã bộ phận sử dụng",
      EN: "Department code is not empty",
    },
    AssetCategoryCode: {
      VI: "Cần phải nhập mã loại tài sản",
      EN: "Asset category code number is not empty",
    },
    Quantity: {
      VI: "Cần phải nhập số lượng",
    },
    Cost: {
      VI: "Cần phải nhập nguyên giá",
    },
    DepreciationRate: {
      VI: "Cần phải nhập tỷ lệ hao mòn",
    },
    PurchaseDate: {
      VI: "Cần phải nhập ngày mua",
    },
    ProductionDate: {
      VI: "Cần phải nhập ngày bắt đầu sử dụng",
    },
    LifeTime: {
      VI: "Cần phải nhập số năm sử dụng",
    },
    DepreciationYear: {
      VI: "Cần phải nhập giá trị hao mòn năm",
    },
   
  },

  // error input khi validate
  ErrorInput: {
    AssetName: {
      VI: "Tên tài sản không được để trống!",
      EN: "Asset name is not empty",
    },
    AssetCode: {
      VI: "Mã tài sản không được để trống!",
      EN: "Asset code is not empty",
    },
    DepartmentCode: {
      VI: "Mã bộ phận sử dụng không được để trống!",
      EN: "Department code is not empty",
    },
    AssetCategoryCode: {
      VI: "Mã loại tài sản không được để trống!",
      EN: "Asset category code number is not empty",
    },
    Quantity: {
      VI: "Số lượng không được để trống!",
    },
    Cost: {
      VI: "Nguyên giá không được để trống!",
    },
    DepreciationRate: {
      VI: "Tỷ lệ hao mòn không được để trống!",
    },
    PurchaseDate: {
      VI: "Ngày mua không được để trống!",
    },
    ProductionDate: {
      VI: "Ngày bắt đầu sử dụng không được để trống!",
    },
    ProductionGreaterDate: {
      VI: "Ngày sử dụng lớn hơn hoặc bằng ngày mua!",
    },
    LifeTime: {
      VI: "Số năm sử dụng không được để trống!",
    },
    DepreciationYear: {
      VI: "Giá trị hao mòn năm không được để trống!",
    },
    DepreciationRateVali: {
      VI: "Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng!",
    },
    // Thiếu Username
    ValidateUsername: "Yêu cầu nhập Username",
    // Thiếu Password
    ValidatePassword: "Yêu cầu nhập Password",
    VoucherCode:{
      VI: "Mã chứng từ không được để trống!",
    },
    VoucherDate:{
      VI: "Ngày chứng từ không được để trống!",
    },
    IncrementDate:{
      VI: "Ngày ghi tăng không được để trống!",
    }
  },
  TitleBtnDialog: {
    Cancel: {
      VI: "Hủy bỏ",
    },
    NoCancel: {
      VI: "Không",
    },
    NoSave: {
      VI: "Không lưu",
    },
    Save: {
      VI: "Lưu",
    },
    Close: {
      VI: "Đóng",
    },
    Delete: {
      VI: "Xóa",
    },
    Agree: {
      VI: "Đồng ý",
    },
  },
  TitleFormPopup: {
    FormAddAsset: {
      VI: "Thêm mới tài sản",
      EN: "Add new asset",
    },
    FormUpdateAsset: {
      VI: "Sửa tài sản",
      EN: "Edit assets",
    },
    FormInfoAsset: {
      VI: "Thông tin tài sản",
      EN: "Asset information",
    },
    FormDuplicateAsset: {
      VI: "Nhân bản tài sản",
      EN: "Duplicate asset",
    },
  },
  // Tiêu đề
  Title: {
    // Thêm
    Add: "Thêm",
    // Sửa
    Edit: "Sửa",
    // Nhân bản
    Duplicate: "Nhân bản",
  },
  TitleDialogMessage: {
    DeleteNoData: {
      VI: "Bạn chưa chọn tài sản để xóa",
      EN: "You have not selected an asset to delete",
    },
    DeleteOneAsset: {
      VI: "Bạn có muốn xóa tài sản",
      EN: "Do you want to delete assets?",
    },
    DeleteOneVoucher: {
      VI: "Bạn có muốn xóa chứng từ có mã",
      EN: "Do you want to delete assets?",
    },
    DeleteMultiple: {
      VI: "tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
      EN: "asset has been selected. Do you want to remove these assets from the list?",
    },
    DeleteMultipleVoucher: {
      VI: "chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?",
      EN: "asset has been selected. Do you want to remove these assets from the list?",
    },
    AddAsset: {
      VI: "Bạn có muốn hủy bỏ khai báo tài sản này?",
    },
    AddVoucher: {
      VI: "Bạn có muốn hủy bỏ khai báo chứng từ này?",
    },
    AddAssetDelect: {
      VI: "Bạn có muốn hủy chọn những tài sản này?",
    },
    SaveUpdate: {
      VI: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
    },
    CancelDelete: {
      VI: "Không thể xóa tài sản này vì đã có chứng từ phát sinh.",
    },
    CancelDeleteMultiple: {
      VI: "tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.",
    },
  },
  LanguageCode: {
    // Việt Nam
    VN: "vi-VN",
    // Hoa kỳ
    US: "en-US",
  },
  Version: {
    Major: "v1",
  },
  Method: {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
  },
  // Định dạng ngày tháng
  DateFormat: {
    // Việt Nam
    VN: "DD/MM/YYYY",
    // Hoa kỳ
    US: "MM/DD/YYYY",
  },
  // Text của Toast
  Toast: {
    // Thành công
    success: "Lưu dữ liệu thành công.",
    // Xóa thành công
    successDelete: "Xóa dữ liệu thành công.",
    // Thất bại
    failed: "Có lỗi xảy ra.",
    // lưu thất bại
    errorSuccess : "Lưu dữ liệu không thành công",
    //Xóa thất bại
    errorDelete : "Xóa liệu không thành công",
    //Xóa thất bại
    updateSuccess : "Cập nhật dữ liệu thành công",

    errorUpdate: "Cập nhật dữ liệu không thành công",

    loginFailed: "Tài khoản hoặc mật khẩu không chính xác",


},


  // Mã lỗi
  ErrorCode: {
    // Error 400
    400: "Dữ liệu đầu vào ko hợp lệ",
    // Error 405
    405: "Phương thức yêu cầu của bạn không hợp lệ hoặc không được cho phép tại server",
    // Error 500
    500: "Lỗi phía Server",
    // Error 404
    404: "error lỗi kết nối",
  },
};
