import api from '@api'

export default {

    state:{
        salaries: [],
        payments: []
    },

    actions:{
        getPayments({commit}){
            api.get('Payment/Get', ({data}) => {
                commit('Get_Payments', data);
            }, { success: "Ok", error: "Error"})
        },

        addPayment({ commit }, payload){
            api.post('Payment/Add', payload.dto, ({data}) => {
                commit('Add_Payment', data)
                payload.cb();
            });
        },

        getPayment( ctx, payload){
            api.get('Payment/GetById?id=' + payload.id, payload.cb, { success: "Ok", error: "Error"})
        },

        updatePayment({ commit }, payload){
            api.post('Payment/Update', payload.dto, ({data}) => {
                commit('Update_Payment', data)
                payload.cb();
            });
        },

        deletePayment({ commit }, id){
            api.delete('Payment/Delete?id=' + id, () => {
                commit('Delete_Payment', [id])
            });
        }
    },

    mutations:{
        Get_Payments(state, payload){
            state.payments = payload;
        },

        Add_Payment(state, payload){
            state.payments.push(payload);
        },

        Update_Payment(state, payload){
            Object.assign(state.payments[state.payments.findIndex(c => c.id == payload.id)], payload)
        },

        Delete_Payment(state, payload){
            payload.forEach(id => {
                state.payments.splice(state.payments.findIndex(c => c.id == id) , 1);
            });
        }
    }


}