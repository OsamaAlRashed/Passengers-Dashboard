<template>
  <div class="navbar-container border-bottom">
    <mini-navbar/>
    <!-- <mainNavbar/> -->
    <navMenu/>
  </div>
</template>

<script>
import miniNavbar from "./components/mini-navbar.vue";
// import mainNavbar from "./components/main-navbar.vue";
import navMenu from "./components/nav-menu.vue";
export default {
  components: {
    miniNavbar,
    // mainNavbar,
    navMenu
  }
}
</script>