<template>
  <b-card
    style="border-radius: 16px; background-color: #ffffff;"
  >
      <div class="d-flex align-items-center">
        <b-img
          class="mr-5"
          style="border-radius: 16px;"
          width="78"
          height="78"
          :src="imagePath ? $store.getters.domainHost + imagePath : getDefaultImage()"
        >
        </b-img>
        <p class="mx-5" style="margin-top: 35px; font-size: 16px;">{{ name }}</p>
        <p class="mx-5" style="margin-top: 35px; font-size: 16px;">x{{ count }}</p>
        <b-badge variant="primary" class="ml-5" style="margin-top: 35px; height: 20px;">
            <p style="font-size: 14px; ">{{ price }} SYP</p>
        </b-badge>
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