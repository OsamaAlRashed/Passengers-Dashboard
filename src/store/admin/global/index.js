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
    shopList: [],
    adminList: [],
    driverList: [],
    customerList: []
  },
  getters: {
    
  },
  actions: {
    genderTypes({commit}){
      api.get('/General/GenderTypes', ({data}) => {
          commit('Get_Genders', data);
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
    driverList({commit}){
      api.get('/General/Users?type=3', ({data}) => {
          commit('Get_DriverList', data);
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
    }
  },
};
