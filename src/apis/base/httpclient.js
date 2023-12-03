import commonFunction from "@/assets/js/commons/commonFunction.js";
import axios from "axios";
import Qs from "qs";

let cancelRequests = [];
class AxiosHttpClient {
   postAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contenType = ApplicationJson
  ) {
    return this.requestAsync(
      config,
      POST,
      isShowLoading,
      isCancelRequest,
      contenType
    );
  }
  async pushAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contenType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      PUT,
      isShowLoading,
      isCancelRequest,
      contenType
    );
  }
  async deleteAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contenType = ApplicationJson
  ) {
    return await this.requestAsync(
      config,
      DELETE,
      isShowLoading,
      isCancelRequest,
      contenType
    );
  }
  async   getAsync(
    config,
    isShowLoading = false,
    isCancelRequest = true,
    contenType = ApplicationJson
  ) {
    return  await this.requestAsync(
      config,
      GET,
      isShowLoading,
      isCancelRequest,
      contenType
    );
  }
  async requestAsync(
    config,
    method,
    isShowLoading = false,
    isCancelRequest = true,
    contenType = ApplicationJson
  ) {
    try {
      //   commonFn.infoLogging(`requestAsync::url::${config.url}`);
      this._processHeaders(config);
      this._processDataOrParams(config, method, contenType);
      this._setLoading(isShowLoading, true);
      let result = await axios(config);
      this._setLoading(isShowLoading, false);
      if (result) {
        // commonFn.processServerResponseData(result.data);
        return result.data;
      }
      return {
        Success: false,
        Data: null,
        Code: 0,
        MessageDev: "",
      };
    } catch (ex) {
      let error = ex;
      //   commonFn.errorLogging("requestAsync::error::", error.response);
      if (error.response && error.response.status === 401) {
        // showError.logoff();
      }
      this._setLoading(isShowLoading, false);
      throw ex;
    }
  }

  _processDataOrParams(config, method, contenType = ApplicationJson) {
    if (!config) return;
    config.method = method;
    switch (method) {
      case GET:
        if (config.data) {
          let queryString = Qs.stringify(config.data || {});
          if (queryString) {
            config.url = [config.url, queryString].join(
              config.url.indexOf("?") === -1 ? "?" : "&"
            );
          }
        }
        break;
      case POST:
      case PUT:
      case DELETE:
        if (contenType == FormUrlEncoded) {
          config.data = Qs.stringify(config.data || {});
        }
        if (config.data) {
          this.processSubmitData(config.data);
        }
        break;
    }
  }
  processSubmitData(data, count = 0) {
    if (count > 20) {
      return;
    }

    // const me = this;
    // for(let i in data){

    //     let value = data[i];
    //     if(value){

    //         if(typeof value.get){

    //         }
    //     }
    // }
  }
  _processHeaders(config, contenType = ApplicationJson) {
    if (!config) return;
    let headers = config.headers || {};
    headers["Content-Type"] = contenType;
    headers["Authorization"] = 'Bearer ' + localStorage.getItem('_token');
    config.headers = headers;
  }
  _getKey(config) {
    if (!config) return "";
    return `${config.url}_${config.method}`;
  }
  _removeRequest(cancelRequest, from) {
    try {
      if (!cancelRequest) return;
      //Huyr request
      if (cancelRequest.Value) {
        cancelRequest.Value.cancel();
      }

      cancelRequests = cancelRequest.filter((n) => {
        n.Key != cancelRequest.Key ||
          (n.Key == cancelRequest.Key && n.Time != cancelRequest.Time);
      });
    } catch (ex) {
      //   commonFn.errorLogging("cancelRequest::error::", ex);
    }
  }
  _addCancelRequest(config, key, isCancelRequest) {
    const me = this;
    try {
      let requests = cancelRequest.filter(
        requests.forEach((request) => this._removeRequest(request, "add"))
      );
      let cancelTokenSource = axios.CancelToKen.source();
      config.cancelRequest = cancelTokenSource.token;

      let cancelRequest = {
        Key: key,
        Value: cancelTokenSource,
        Time: new Date().getTime(),
        IsCancelRequest: isCancelRequest,
      };
      cancelRequests.push(cancelRequest);
      return cancelRequest;
    } catch (ex) {
      //   commonFn.errorLogging("_addCancelRequest::error::", ex);
    }
    return null;
  }

  _setLoading(isShowLoading, isLoading) {
    return;
    // if (isShowLoading) {
    //   if (isLoading) {
    //     commonFn.mask();
    //   } else {
    //     commonFn.unmask();
    //   }
    // }
  }
}
export default new AxiosHttpClient();
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";
export const GET = "GET";
//Content-type
export const ApplicationJson = "application/json";
export const FormUrlEncoded = "application/x-www-form-urlencoded";
export const FormMultiPart = "multipart/form-data";
