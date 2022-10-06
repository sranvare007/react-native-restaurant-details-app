import { AxiosInstance } from "./axiosInstance";

export const RestApiHelper = {
  async makeGetRequest(endpoint, requestParams, headers = {}) {
    try {
      const response = await AxiosInstance.get(endpoint, requestParams);
      if ((response != null) & (response.data != null)) {
        console.log(`request to ${endpoint} success`);
        return response.data;
      }
    } catch (error) {
      console.log(`Axios get error: ${error}`);
      return error;
    }
  },
  async makePostRequest(endpoint, requestParams, headers = {}) {
    try {
      const response = await AxiosInstance.post(endpoint, requestParams);
      if ((response != null) & (response.data != null)) {
        return response.data;
      }
    } catch (error) {
      console.log(`Axios get error: ${error}`);
      return error;
    }
  },
};
