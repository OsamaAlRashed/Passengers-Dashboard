import { $_themeConfig } from "@themeConfig";
export default {
  state: {
    isMainLoading: false,
    domainHost: $_themeConfig.app.domainPath,
    progressEvent: null,
  },
  getters: {
    domainHost({ domainHost }) {
      return domainHost;
    },
  },
  mutations: {
    Set_Main_Loading(state, is) {
      setTimeout(
        () => {
          state.isMainLoading = is;
        },
        !is ? 1200 : 0
      );
    },
    set_Progress(state, payload) {
      state.progressEvent = payload;
    },
  },
  actions: {},
};
