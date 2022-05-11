import Vue from "vue";
import { $_themeConfig } from "@themeConfig";
// axios
import axios from "axios";
const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: $_themeConfig.app.domainPath + "api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
Vue.prototype.$http = axiosIns;
export default axiosIns;
