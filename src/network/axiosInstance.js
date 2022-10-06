import { REACT_APP_YELP_API_KEY } from "@env";
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  timeout: 60000,
  responseType: "json",
  headers: {
    Authorization: `Bearer ${REACT_APP_YELP_API_KEY}`,
  },
});
