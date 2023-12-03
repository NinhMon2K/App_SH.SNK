import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
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
export const useDashbord = () => {
  const { proxy } = getCurrentInstance();
  const arrDashbord = ref([
    {
      title: "Tổng số yêu cầu",
      number: 0,
      precent: "100%",
      class: "total-request",
    },
    { title: "Mới", number: 0, precent: "100%", class: "new-request" },
    { title: "Gửi yêu cầu", number: 0, precent: "100%", class: "sent-request" },
    {
      title: "Đã phản hồi",
      number: 0,
      precent: "100%",
      class: "responseded-request",
    },
    { title: "Xác nhận", number: 0, precent: "100%", class: "confirm-request" },
    {
      title: "Đính kèm",
      number: 0,
      precent: "100%",
      class: "attached-request",
    },
    { title: "Huỷ bỏ", number: 0, precent: "100%", class: "cancel-request" },
    {
      title: "Hoàn thành",
      number: 0,
      precent: "100%",
      class: "finish-request",
    },
  ]);
  return { arrDashbord };
};
