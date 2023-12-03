
import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class VoucherApi extends BaseAPI {
  
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

  async filters(action, keyword,limit,page) {
    let request = {
      url: this.getBaseURL() + "/" + action +"?keyword="+keyword+"&limit="+limit+"&page="+page,
    };
    return await httpclient.getAsync(request);
  }
 
  async filterVoucherDetaill(action, keyword,limit,page,voucherId) {
    let request = {
      url: this.getBaseURL() + "/" + action+"/"+voucherId +"?keyword="+keyword+"&limit="+limit+"&page="+page,
    };
    return await httpclient.getAsync(request);
  }

  async getVoucherDetail(action, voucherId,assetId) {
    let request = {
      url: this.getBaseURL() + "/" + action+ "/"+voucherId + "/" + assetId ,
 
    };
    return await httpclient.getAsync(request);
  }

  async backAddVoucherDetail(action,payload) {
    let request = {
      url: this.getBaseURL() + "/" + action ,
      data: payload,
    };
    return await httpclient.postAsync(request);
  }
  async backUpdateVoucherDetail(action, recordId, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "?voucherId=" + recordId,
      data: payload,
    };
    return httpclient.postAsync(request);
  }
  
}

export default new VoucherApi();
