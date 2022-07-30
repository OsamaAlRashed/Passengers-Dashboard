<template>
  <b-card
    style="cursor: pointer;"
    @click="getDetails(id)"
  >
    <p style="font-size: 12px;" class="py-2">Time spent in this status {{ time }} min</p>
    <div
        style="
          border-radius: 16px;
          background-color: #f5f5f5;
          height: 64px;
        "
        class="text-center"
      >
        <p style="font-size: 24px; padding-top: 13px;">{{ serialNumber }}</p>
      </div>
      <div class="d-flex pt-2">
        <b-img
          style="border-radius: 16px;"
          width="40"
          height="40"
          :src="imagePath ? $store.getters.domainHost + imagePath : getDefaultImage()"
        >
        </b-img>
        <div class="pl-2">
          <p style="font-size: 14px;">{{ name }}</p>
          <p style="font-size: 12px;">{{ phoneNumber }}</p>
        </div>
      </div>
      
  </b-card>
</template>
<style>
p {
  margin-bottom: 0;
}
.card-body{
  padding-left: 0.50rem;
  padding-right: 0.50rem;
  padding-top: 0.25rem;

}
</style>


<script>
export default {
  props: {
    id: null,
    serialNumber: String,
    time: Number,
    name: String,
    phoneNumber: String,
    imagePath: String,
  },
  methods:{
    getDetails(id){
      this.$router.push("/orders/" + id);
    },
    getDefaultImage(){
        return require(`@/assets/images/default image/Male.svg`);
    }
  }
};
</script>