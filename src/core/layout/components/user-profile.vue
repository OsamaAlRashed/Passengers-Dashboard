<template>
<div class="user-profile">
  <b-avatar class="border" variant="flat">
    <i class="mdi mdi-account-outline"></i>
  </b-avatar>
</div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/helpers/variables';
.user-profile {
  ::v-deep {
    .b-avatar {
      box-shadow: $shadow;
      font-size: 24px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>