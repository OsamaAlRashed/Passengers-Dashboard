<template>
<a-modal
      placeholder="search"
      @search="search"
    >
</a-modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
    methods:{
        ...mapActions(["getOrders"]),
        search(text){
            this.getOrders(text);
        }
    }
}

</script>