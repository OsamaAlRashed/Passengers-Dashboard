<template>
<div>
    <b-row>
        <b-col>
            <p>Recived</p>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
        </b-col>
        <b-col>
           <p>Unassigned</p>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
        </b-col>
        <b-col>
           <p>Assigned</p>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
               <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
               <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
        </b-col>
        <b-col>
            <p>Collected</p>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
               <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
        </b-col>
        <b-col>
           <p>Completed</p>
            <order-card class="my-3" name="Osama AlRashed" phoneNumber="0956057886" serialNumber="A93243" time="20">
            </order-card>
        </b-col>
    </b-row>
</div>


</template>
<script>
import orderCard from "../../components/orderCard.vue"

export default {
    components:{
        orderCard
    },
    
}

</script>