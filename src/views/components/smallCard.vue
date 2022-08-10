<template>
  <b-card
  
    :class="myClass"
    style=" height: 158px"
  >
    <a @click="$emit('action', $event)" style="cursor: pointer;">
      <b-img
        v-if="topIcon"
        class="float-right"
        width="20"
        :src="require(`@/assets/icons/outline/Icon-Outline-${topIcon}.svg`)"
      ></b-img>
    </a>
    <div class="d-flex my-2">
      <b-img
        v-if="mainIcon"
        width="24"
        class="mr-3"
        :src="require(`@/assets/icons/outline/Icon-Outline-${mainIcon}.svg`)"
      ></b-img>
      <p style="margin: inherit">{{ mainText }}</p>
    </div>
    <p style="font-size: x-large; font-weight: bolder; margin: revert">
      {{ descreptionText }}
    </p>
  </b-card>
</template>

<script>
export default {
  props: {
    topIcon: String,
    mainIcon: String,
    mainText: String,
    descreptionText: String,
    myClass: String
  },
};
</script>
