import api from '@api'

export default {

    state:{
        settingDto: {}
    },

    actions:{
        getSettings({commit}){
            commit("Set_Main_Loading", true);
            var url = 'Setting/GetSettings';
            api.get(url, ({data}) => {
                commit('Get_Settings', data);
                commit("Set_Main_Loading", false);
            }, { success: "Ok", error: "Error"})
        },
        setSettings(ctx, payload){
            api.put(`Setting/SetSettings?price=${payload.kmPrice}`
            , null, payload.cb, { success: "Ok", error: "Error"})
        },
    },

    mutations:{
        Get_Settings(state, payload){
           Object.assign(state.settingDto, payload)
        },
    }


}