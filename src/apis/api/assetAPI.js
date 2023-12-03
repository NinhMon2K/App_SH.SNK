import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class AssetApi extends BaseAPI {
  
  async delete(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "/" + payload,
    };
    return httpclient.deleteAsync(request);
  }
  async put(action, recordId, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "/" + recordId,
      data: payload,
    };
    return httpclient.pushAsync(request);
  }

  async filters(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      data: payload,
    };
    return await httpclient.postAsync(request);
  }

  async checkIncrement(action, assetId) {
    let request = {
      url: this.getBaseURL() + "/" + action + '/'+assetId,
    };
    return await httpclient.getAsync(request);
  }
}

export default new AssetApi();
