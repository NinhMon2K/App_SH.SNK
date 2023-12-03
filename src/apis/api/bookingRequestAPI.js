import BasBaseBookingAPIAPI from "../base/apiSh.js";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class bookingRequestAPI extends BasBaseBookingAPIAPI {
  controllerName = "BookingRequest";
}

export default new bookingRequestAPI();
