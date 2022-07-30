<template>
  <b-card
    style="height: 75px;"
  >
      <div class="d-flex pt-2">
        <b-img
          style="border-radius: 16px;"     
          width="48"
          height="48"
          :src="imagePath ? $store.getters.domainHost + imagePath : getDefaultImage()"
        >
        </b-img>
        <div class="pl-2">
          <p style="font-size: 16px;">{{ name }}</p>
          <p style="font-size: 14px;">{{ phoneNumber }}</p>
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
    name: String,
    phoneNumber: String,
    imagePath: String,
    type: String
  },
  methods:{
    getDefaultImage(){
        return require(`@/assets/images/default image/Male.svg`);
    }
  }
};
</script>