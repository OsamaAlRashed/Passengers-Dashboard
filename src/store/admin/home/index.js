import api from '@api'

export default {

    state:{
        homeDto: {}
    },
    actions:{
        getHome({ commit }){
            commit("Set_Main_Loading", true);
            api.get('Home' , ({data}) => {
                commit('Get_Home', data);
                commit("Set_Main_Loading", false); }
                , { success: "Ok", error: "Error"})
        },
        
    },

    mutations:{
        Get_Home(state, payload){
            console.log(payload)
            state.homeDto = payload;
        },
    }

}