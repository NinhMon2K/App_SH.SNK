import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import assetAPI from "@/apis/api/assetAPI.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import axios from "axios";
import moment from "moment";
export const useBookingReponse = (basePopup) => {
  const { proxy } = getCurrentInstance();
  //Show toastMessage
  window.popup = proxy;

  const title = ref("");

  const assetDataAll = ref([]);

  onMounted(() => {
    proxy.assetDataAll = proxy.dataAll;
  });

  const valHtml = ref("");

  watch(
    () => proxy.modelValue,
    (newVal) => {
      proxy.dataForm = newVal;
    }
  );
  const dataBookingReponse = ref([]);
  const handleHtml = (val) => {
    let innerHtml = "";
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
  };

  const bindingPortDischarge = (portDischarge) => {
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
  };

 function formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  onMounted(() => {
    let a = {
      ResponseStatus: "success",
      ResponseData: [
        {
          Id: "2d27e35e-b43b-427f-a215-06497a24a682",
          BookingRequestId: "ed76eb53-ac28-4bcb-8d06-8e8e60be1467",
          FResNumber: "RES07",
          ShippingLine: "sadasd",
          ClosingTime: "/Date(1701450000000)/",
          ETD: "/Date(1701450000000)/",
          ETA: "/Date(1702227600000)/",
          strClosingTime: "2023-12-02",
          strETA: "2023-12-11",
          strETD: "2023-12-02",
          TransitDay: 1,
          TermOfDelivery: "dasd",
          AgentContact: null,
          Demurrage: 1,
          WonBid: false,
          Status: "Responseded",
          TotalAmount: 50,
          lstBookingResponseDetail: [],
          UserName: "nvc1",
          FullName: "nvc1",
          ResponseDate: "/Date(1701520091253)/",
          ConfirmDate: "/Date(-62135596800000)/",
          strResponseDate: "2023-12-02",
          strConfirmDate: "0001-01-01",
          ReasonConfirm: null,
        },
        {
          Id: "2d27e35e-b43b-427f-a215-06497a24a682",
          BookingRequestId: "ed76eb53-ac28-4bcb-8d06-8e8e60be1467",
          FResNumber: "RES07",
          ShippingLine: "sadasd",
          ClosingTime: "/Date(1701450000000)/",
          ETD: "/Date(1701450000000)/",
          ETA: "/Date(1702227600000)/",
          strClosingTime: "2023-12-02",
          strETA: "2023-12-11",
          strETD: "2023-12-02",
          TransitDay: 1,
          TermOfDelivery: "dasd",
          AgentContact: null,
          Demurrage: 1,
          WonBid: false,
          Status: "Responseded",
          TotalAmount: 50,
          lstBookingResponseDetail: [],
          UserName: "nvc1",
          FullName: "nvc1",
          ResponseDate: "/Date(1701520091253)/",
          ConfirmDate: "/Date(-62135596800000)/",
          strResponseDate: "2023-12-02",
          strConfirmDate: "0001-01-01",
          ReasonConfirm: null,
        },
      ],
      ResponseMessenger: "success",
    };
    a.ResponseData.forEach((x, i) => {
      x.STT = i + 1;
    });
    proxy.dataBookingReponse = a.ResponseData;
  });
  const columns = ref([
    {
      field: "STT",
      title: ResourceTable.lblTableAssets.STT,
      type: "Text",
      width: 40,
      align: "Center",
    },
    {
      field: "FResNumber",
      title: "Số phản hồi",
      type: "TextLink",
      width: 110,
      component: "BookingResponseDetail",
    },
    {
      field: "Status",
      title: "Trạng thái",
      type: "TextHtml",
      width: 120,
    },
    {
      field: "FullName",
      title: "Tên người giao nhận",
      type: "TextLink",
      width: 200,
      align: "Center",
      component: "BookingResponse",
    },
    {
      field: "ShippingLine",
      title: "Tên nhà vận chuyển",
      type: "Text",
      width: 200,
    },
    {
      field: "TotalAmount",
      title: "Total Amount (USD)",
      type: "Text",
      width: 200,
    },
    {
      field: "strClosingTime",
      title: "Closing Time",
      type: "Text",
      width: 160,
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
      field: "TransitDay",
      title: "Transit Day",
      type: "Date",
      align: "Center",
      width: 200,
    },
    {
      field: "Demurrage",
      title: "Demurrage",
      type: "Text",
      width: 200,
    },

    {
      field: "strResponseDate",
      title: "Ngày phản hồi",
      type: "Date",
      width: 200,
    },
    {
      field: "strConfirmDate",
      title: "Ngày xác nhận",
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
  ]);

  return {
    title,
    Resource, // Resource
    ResourceTable, // ResourceTable
    columns,
    dataBookingReponse,
    handleHtml,
    bindingPortDischarge,
    formatDate
  };
};
