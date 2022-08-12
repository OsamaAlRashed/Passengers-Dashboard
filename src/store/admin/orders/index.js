import api from '@api'

export default {

    state:{
        orders: []
    },

    actions:{
        getOrders({commit}){
            commit("Set_Main_Loading", true);
            var url = 'Order/GetOrdersBoard';
            api.get(url, ({data}) => {
                commit('Get_Orders', data);
                commit("Set_Main_Loading", false);
            }, { success: "Ok", error: "Error"})
        },
        getOrderDetails(ctx, payload){
            api.get('Order/GetOrderDashboardDetails?id=' + payload.id, payload.cb , { success: "Ok", error: "Error"})
        },
        accept(ctx, payload){
            api.put('Order/Accept?orderId=' + payload.orderId + "&deliveryCost=" + payload.cost 
            + "&expectedTime=" + payload.time
            , null, payload.cb, { success: "Ok", error: "Error"})
        },
        refuse(ctx, payload){
            api.put('Order/Refuse?orderId=' + payload.orderId + "&reasonRefuse=" + payload.reasonRefuse
            , null, payload.cb, { success: "Ok", error: "Error"})
        }
    },

    mutations:{
        Get_Orders(state, payload){
            state.orders = payload;
        },
    }


}