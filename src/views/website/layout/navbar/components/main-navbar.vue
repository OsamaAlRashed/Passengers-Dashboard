<template>
  <nav class="navbar">
    <b-container class="d-flex py-2">
      <logoPrimary/>
      <location class="d-none d-lg-block"/>
      <search class="d-none d-md-block mx-2"/>
      <user-profile class="ml-auto mr-2"/>
      <cart-dropdown :products="[1,2,3,4,5,6,7]"/>
    </b-container>
  </nav>
</template>
<script>
import logoPrimary from "@core/layout/logo-primary.vue";
import location from "@core/layout/components/location.vue";
import search from "@core/layout/components/search.vue";
import userProfile from "@core/layout/components/user-profile.vue";
import cartDropdown from "@core/layout/components/cart-dropdown.vue";

export default {
  components: {
    logoPrimary,
    location,
    search,
    userProfile,
    cartDropdown
  }
}
</script>