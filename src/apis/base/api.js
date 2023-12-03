import httpclient from "@/apis/base/httpclient";

export default class BaseAPI {
  controllerName = "v1";

  getBaseURL() {
    return "https://localhost:44375/api" + "/" + this.controllerName;
  }

  async get(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      data: payload,
    };
    return httpclient.getAsync(request);
  }
  async put(action, recordId, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "/" + recordId,
      data: payload,
    };
    return httpclient.pushAsync(request);
  }
  async post(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      data: payload,
    Headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    };
    return httpclient.postAsync(request);
  }
  async delete(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      data: payload,
    };
    return httpclient.deleteAsync(request);
  }
}
