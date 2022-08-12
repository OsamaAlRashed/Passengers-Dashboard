import api from '@api'

export default {

    state:{
    },

    actions:{
        getSettings({commit}, payload){
            commit("Set_Main_Loading", true);
            var url = 'Setting/GetSettings';
            api.get(url, payload.cb, { success: "Ok", error: "Error"})
        },
        setSettings(ctx, payload){
            api.put(`Setting/SetSettings?price=${payload.price}`
            , null, payload.cb, { success: "Ok", error: "Error"})
        },
    },

    // mutations:{
    //     Get_Settings(state, payload){
    //        Object.assign(state.settingDto, payload)
    //     },
    // }


}