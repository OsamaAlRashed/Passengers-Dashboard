import api from '@api'

export default {

    state:{
        admins: []
    },

    actions:{
        getAdmins({commit}){
            api.get('Admin/Get', ({data}) => {
                commit('Get_Admins', data);
            }, { success: "Ok", error: "Error"})
        },

        addAdmin({ commit }, payload){
            api.post('Admin/Add', payload.dto, ({data}) => {
                commit('Add_Admin', data)
                payload.cb();
            });
        },

        getAdmin( ctx, payload){
            api.get('Admin/GetById?id=' + payload.id, payload.cb, { success: "Ok", error: "Error"})
        },

        updateAdmin({ commit }, payload){
            api.put('Admin/Update', payload.dto, ({data}) => {
                commit('Update_Admin', data)
                payload.cb();
            });
        },

        deleteAdmin({ commit }, id){
            api.delete('Admin/Delete?id=' + id, () => {
                commit('Delete_Admin', [id])
            });
        },
        blockAdmin({ commit }, id){
            api.put('Admin/Block?id=' + id, () => {
            });
        }
    },

    mutations:{
        Get_Admins(state, payload){
            state.admins = payload;
        },

        Add_Admin(state, payload){
            state.admins.push(payload);
        },

        Update_Admin(state, payload){
            Object.assign(state.admins[state.admins.findIndex(c => c.id == payload.id)], payload)
        },

        Delete_Admin(state, payload){
            payload.forEach(id => {
                state.admins.splice(state.admins.findIndex(c => c.id == id) , 1);
            });
        }
    }


}