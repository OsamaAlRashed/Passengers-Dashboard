<template>
    <b-row>
        <b-col cols="8">
            <a-table :items="shops" :columns="columns" @details="openDetails" no_select>
            </a-table>
        </b-col>
    </b-row>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { nullGuid } from '@core/util/global'

export default{

    computed:{
        ...mapState({shops: (state) => state.shops.shops })
    },

    data:() => ({
        columns:[
            {
                label: "Shop name",
                field: "name",
            },
            {
                label: "Phone Number",
                field: "phoneNumber",
            },
            {
                label: "Business Type",
                field: "category",
            },
            {
                label: "Delivery",
                field: "deliveryShopStatus",
            },
            {
                label: "Status",
                field: "online",
            },
            {
                label: "details",
                field: "details",
                sortable: false
            },
        ],
        shopDto:{
            id: nullGuid,
            name: "",
            phoneNumber: "",
            imagePath: "",
            category: "",
            online: false,
            fromDay: null,
            toDay: null,
            fromTime: null,
            toTime: null,
            contacts: [],
            address: null,
            deliveryShopStatus: 0
        }
    }),

    created(){
        this.getShops();
    },

    methods:{
        ...mapActions(['getShops']),

        openDetails(props){
            // this.getCountry({ id: props.row.id, cb: ({data}) => {
            //     Object.assign(this.countryDto, data)
            // }})
            this.$refs.shopModal.open();
        },
        
    },
    
}
</script>
