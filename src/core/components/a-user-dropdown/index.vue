<template>
  <b-avatar :variant="variant" :src="src"></b-avatar>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: () => 'primary'
    },
    src: {
      type: String,
      default: () => '/media/placeHolders/profile.png'
    }
  }
}
</script>