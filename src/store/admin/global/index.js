// import { getSearchResultOnRow } from "@core/util/global";
import api from '@api'
export default {
  state: {
    filterDto: {},
    searchDto: {
      keys: [],
      query: "",
    },
    genders: [],
    userList: [],
    shopList: [],
    adminList: [],
    driverList: [],
    customerList: [],
    dayList: [],
    contactShopList: [],
    importTypeList: [],
    exportTypeList: [],
    bloodTypeList: []
  },
  getters: {
    
  },
  actions: {
    genderTypes({commit}){
      api.get('/General/GenderTypes', ({data}) => {
          commit('Get_Genders', data);
      }, { success: "Ok", error: "Error"})
    },
    getUserList({commit}){
      api.get('/General/Users', ({data}) => {
        commit('Get_UserList', data);
      }, { success: "Ok", error: "Error"})
    },
    getAdminList({commit}){
      api.get('/General/Users?type=0', ({data}) => {
        commit('Get_AdminList', data);
      }, { success: "Ok", error: "Error"})
    },
    shopList({commit}){
      api.get('/General/Users?type=1', ({data}) => {
          commit('Get_ShopList', data);
      }, { success: "Ok", error: "Error"})
    },
    customerList({commit}){
      api.get('/General/Users?type=2', ({data}) => {
          commit('Get_CustomerList', data);
      }, { success: "Ok", error: "Error"})
    },
    getDriverList({commit}){
      api.get('/General/Users?type=3', ({data}) => {
          commit('Get_DriverList', data);
      }, { success: "Ok", error: "Error"})
    },

    getDays({commit}){
      api.get('/General/DayOfWeek', ({data}) => {
          commit('Get_Days', data);
      }, { success: "Ok", error: "Error"})
    },
    getContactShopTypes({commit}){
      api.get('General/ContactShopTypes', ({data}) => {
          commit('Get_ContactShopTypes', data);
      }, { success: "Ok", error: "Error"})
    },
    getImportTypes({commit}){
      api.get('General/ImportTypes', ({data}) => {
          commit('Get_ImportTypes', data);
      }, { success: "Ok", error: "Error"})
    },
    getExportTypes({commit}){
      api.get('General/ExportTypes', ({data}) => {
          commit('Get_ExportTypes', data);
      }, { success: "Ok", error: "Error"})
    },
    getBloodTypes({commit}){
      api.get('General/BloodTypes', ({data}) => {
          commit('Get_BloodTypes', data);
      }, { success: "Ok", error: "Error"})
    },
  },

  
  mutations: {
    Set_filter_Dto(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.filterDto[key] = payload[key];
      });
    },
    Set_Search_Dto(state, payload) {
      Object.assign(state.searchDto, payload);
    },
    Reset_Search_Dto(state) {
      Object.assign(state.searchDto, {
        keys: [],
        query: "",
      });
    },
    Reset_filter_Dto(state) {
      Object.assign(state.filterDto, {});
    },
    Get_Genders(state, payload){
      state.genders = payload;
    },
    Get_UserList(state, payload){
      state.userList = payload;
    },
    Get_AdminList(state, payload){
      state.adminList = payload;
    },
    Get_ShopList(state, payload){
      state.shopList = payload;
    },
    Get_CustomerList(state, payload){
      state.customerList = payload;
    },
    Get_DriverList(state, payload){
      state.driverList = payload;
    },
    Get_Days(state, payload){
      state.dayList = payload;
    },
    Get_ContactShopTypes(state, payload){
      state.contactShopList = payload;
    },
    Get_ImportTypes(state, payload){
      state.importTypeList = payload;
    },
    Get_ExportTypes(state, payload){
      state.exportTypeList = payload;
    },
    Get_BloodTypes(state, payload){
      state.bloodTypeList = payload;
    },
  },
};
