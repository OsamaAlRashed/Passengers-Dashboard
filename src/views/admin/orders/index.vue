<template>
<div>
    <b-row>
        <b-col>
            <p>Recived</p>
            <order-card v-for="(order, index) in orders.filter(x => x.status == 1)" :key="index" class="my-3" 
                :name="order.fullName" :phoneNumber="order.phoneNumber" 
                :serialNumber="order.serialNumber" :time="order.time" :id="order.id"
                :imagePath="order.imagePath">
            </order-card>
        </b-col>
        <b-col>
           <p>Unassigned</p>
           <order-card v-for="(order, index) in orders.filter(x => x.status == 2)" :key="index" class="my-3" 
                name="Unassigned" phoneNumber="*********" 
                :serialNumber="order.serialNumber" :time="order.time" :id="order.id"
                :imagePath="order.imagePath">
            </order-card>
        </b-col>
        <b-col>
           <p>Assigned</p>
           <order-card v-for="(order, index) in orders.filter(x => x.status == 3)" :key="index" class="my-3" 
                :name="order.fullName" :phoneNumber="order.phoneNumber" 
                :serialNumber="order.serialNumber" :time="order.time" :id="order.id"
                :imagePath="order.imagePath">
            </order-card>
        </b-col>
        <b-col>
            <p>Collected</p>
            <order-card v-for="(order, index) in orders.filter(x => x.status == 4)" :key="index" class="my-3" 
                :name="order.fullName" :phoneNumber="order.phoneNumber" 
                :serialNumber="order.serialNumber" :time="order.time" :id="order.id"
                :imagePath="order.imagePath">
            </order-card>
        </b-col>
        <b-col>
           <p>Completed</p>
           <order-card v-for="(order, index) in orders.filter(x => x.status == 5)" :key="index" class="my-3" 
                :name="order.fullName" :phoneNumber="order.phoneNumber" 
                :serialNumber="order.serialNumber" :time="order.time" :id="order.id"
                :imagePath="order.imagePath">
            </order-card>
        </b-col>
    </b-row>
</div>
</template>
<script>
import { OrderHub } from "@/libs/order-hub";
import orderCard from "../../components/orderCard.vue"
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState({ orders: (state) => state.orders.orders }),
    },
    data: () => ({
        connection: null
    }),
    created() {
        this.orderHub = new OrderHub();
        this.connection = this.orderHub.startSignalR();
        this.getOrders();
    },
    methods: {
    ...mapActions(["getOrders"])
    },
    components:{
        orderCard
    },
}
</script>