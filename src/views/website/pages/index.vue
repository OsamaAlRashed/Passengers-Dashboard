<template>
<div class="website">
  <a-navbar/>
  <main class="main">
    <b-container>
      <router-view/>
    </b-container>
  </main>
  <a-footer/>
</div>
</template>

<script>
import aNavbar from "../layout/navbar";
import aFooter from "../layout/footer";
export default {
  components: {
    aNavbar,
    aFooter
  }
}
</script>

<style scoped lang="scss">
.website {
  height: 100vh;
  overflow: auto;
}
</style>
