import moment from "moment";
export default {
  name: "basePopup",
  methods: {
    handleHtml(val) {
      let innerHtml = "";
      debugger;
      switch (val) {
        case "New":
          innerHtml = `<span class='badge bg-secondary'>Mới</span>`;
          break;
        case "Sent":
          innerHtml = `<span class='badge bg-warning text-dark'>Gửi yêu cầu</span>`;
          break;
        case "Responseded":
          innerHtml = `<span class='badge bg-primary'>Đã phản hồi</span>`;
          break;
        case "Confirm":
          innerHtml = `<span class='badge bg-info text-dark'>Xác nhận</span>`;
          break;
        case "Attached":
          innerHtml = `<span class='badge bg-attached text-attached'>Đính kèm</span>`;
          break;
        case "Cancel":
          innerHtml = `<span class='badge bg-danger'>Hủy bỏ</span>`;
          break;
        case "Finish":
          innerHtml = `<span class='badge bg-success'>Hoàn thành</span>`;
          break;
        default:
          break;
      }
      return innerHtml;
    },
    bindingPortDischarge(portDischarge) {
      var port = "";
      switch (portDischarge) {
        case "HP":
          port = "Cảng Hải Phòng";
          break;
        case "DN":
          port = "Cảng Đà Nẵng";
          break;
        case "HCM":
          port = "Cảng Hồ Chí Minh";
          break;
        default:
      }
      return port;
    },
    /**
     * Định dạng ngày tháng
     * NNNINH (29/12/2022)
     * @param {string} date số tiền
     */

    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
};
