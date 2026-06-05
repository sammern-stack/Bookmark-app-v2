import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "http://localhost:3001/api/bookmarks",
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export default api;
