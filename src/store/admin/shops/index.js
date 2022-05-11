import api from '@api'

export default {

    state:{
        shops: []
    },

    actions:{
        getShops({commit}){
            api.get('Admin/GetShops', ({data}) => {
                commit('Get_Shops', data);
            }, { success: "Ok", error: "Error"})
        },
    },

    mutations:{
        Get_Shops(state, payload){
            state.shops = payload;
        },
    }


}