import { RestApiHelper } from "./restapiHelper";

export const NetworkManager = {
  SEARCH_RESTAURANTS: "businesses/search",
  GET_RESTAURANT_DETAILS: "businesses",

  async getRestaurantsList(params) {
    const finalUrl = await this.buildUrl(`${this.SEARCH_RESTAURANTS}?`, params);
    const response = await RestApiHelper.makeGetRequest(finalUrl);
    return response;
  },

  async getRestaurantById(params) {
    const finalUrl = `${this.GET_RESTAURANT_DETAILS}/${params.id}`;
    const response = await RestApiHelper.makeGetRequest(finalUrl);
    return response;
  },

  async buildUrl(url, params) {
    if (params) {
      let finalUrl = url;
      Object.keys(params).forEach((key) => {
        finalUrl += `${key}=${params[key]}&`;
      });
      return finalUrl;
    }
    return url;
  },
};
