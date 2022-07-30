import api from '@api'

export default {

    state:{
        shops: []
    },

    actions:{
        getShops({commit}){
            commit("Set_Main_Loading", true);
            api.get('Admin/GetShops', ({data}) => {
                commit('Get_Shops', data);
                commit("Set_Main_Loading", false);
            }, { success: "Ok", error: "Error"})
        },
    },

    mutations:{
        Get_Shops(state, payload){
            state.shops = payload;
        },
    }


}