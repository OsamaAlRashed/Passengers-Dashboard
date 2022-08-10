<template>
  <b-card
    style="border-radius: 16px; background-color: #ffffff;"
  >
      <div class="d-flex">
        <b-img
          class="mr-1"
          style="border-radius: 16px;"
          width="32"
          height="32"
          :src="imagePath ? $store.getters.domainHost + imagePath : getDefaultImage()"
        >
        </b-img>
        <p class="mx-1">{{ name }}</p>
        <p class="mx-5">x{{ count }}</p>
      </div>
  </b-card>
</template>
<style>

</style>


<script>
export default {
  props: {
    name: String,
    count: Number,
    price: Number,
    imagePath: String,
  },
  methods:{
    getDefaultImage(){
        return require(`@/assets/images/default image/Male.svg`);
    }
  }
};
</script>