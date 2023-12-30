import axios from "axios";
import api from "./config.json";

const myApi = axios.create({
  baseURL: api.api,
  withCredentials: false,
});
export default myApi;
