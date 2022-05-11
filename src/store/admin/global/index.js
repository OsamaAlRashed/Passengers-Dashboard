// import { getSearchResultOnRow } from "@core/util/global";
export default {
  state: {
    filterDto: {},
    searchDto: {
      keys: [],
      query: "",
    },
  },
  getters: {
    // countries(state, getter, glState) {
    //   return glState.setting.countries.filter((country) => {
    //     return getSearchResultOnRow(state, country);
    //   });
    // },
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
  },
};
