import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class userApi extends BaseAPI {
    async checksUser(action, username,password) {
        let request = {
          url: this.getBaseURL() + "/" +action+ "/" + username + "/" + password,
        };
        return await httpclient.getAsync(request);
      }

}

export default new userApi();
