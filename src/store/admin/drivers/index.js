import api from '@api'

export default {

    state:{
        drivers: []
    },

    actions:{
        getDrivers({commit}){
            api.get('Driver/Get', ({data}) => {
                commit('Get_Drivers', data);
            }, { success: "Ok", error: "Error"})
        },

        addDriver({ commit }, payload){
            api.post('Driver/Add', payload.dto, ({data}) => {
                commit('Add_Driver', data)
                payload.cb();
            });
        },

        getDriver(ctx, payload){
            api.get('Driver/GetById?id=' + payload.id, payload.cb, { success: "Ok", error: "Error"})
        },

        updateDriver({ commit }, payload){
            api.put('Driver/Update', payload.dto, ({data}) => {
                commit('Update_Driver', data)
                payload.cb();
            });
        },

        deleteDriver({ commit }, id){
            api.delete('Driver/Delete?id=' + id, () => {
                commit('Delete_Driver', id)
            });
        },
        blockDriver({ commit }, id){
            api.put('Driver/Block?id=' + id, () => {
            });
        },
        //get Driver details
        getDriverDetails(ctx, payload){
            api.get('Driver/Details?id=' + payload.id, payload.cb, { success: "Ok", error: "Error"})
        },
    },

    mutations:{
        Get_Drivers(state, payload){
            state.drivers = payload;
        },

        Add_Driver(state, payload){
            state.drivers.push(payload);
        },

        Update_Driver(state, payload){
            Object.assign(state.drivers[state.drivers.findIndex(c => c.id == payload.id)], payload)
        },

        Delete_Driver(state, id){
            state.drivers.splice(state.drivers.findIndex(c => c.id == id) , 1);
        },
        Update_FixedAmount(state, payload){
            state.drivers[state.drivers.findIndex(x => x.id == payload.userId)].fixedAmount += payload.fixedAmount;
        }
    }


}