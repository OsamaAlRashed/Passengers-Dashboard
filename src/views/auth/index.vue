<template>
  <div class="auth" ref="auth-container">
    <div class="auth-content w-100">
      <!-- <nav class="navbar">
        <div>
           <b-button
            class="mr-1 title"
            to="/login"
            v-if="$route.name != 'login'"
            variant="flat-secondary"
            >{{$t('auth.login.title')}}</b-button
          >
          <b-button
            class="title"
            to="/signup"
            v-if="$route.name != 'signup'"
            variant="flat-secondary"
            >{{$t('auth.signup.title')}}</b-button
          >
        </div> 
        <router-link to="/" custom>
          <a-logo-white class="d-lg-none"/>
          <a-logo-primary class="d-none d-lg-block"/>
        </router-link>
      </nav> -->
      <div class="auth-content-container">
        <transition
          :enter-active-class="'animate__animated animate__fadeInUp'"
          :leave-active-class="'animate__animated animate__fadeInUp'"
        >
          <div class="form">
            <router-view :appName="appName" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
.auth-content{
  background-image: url('~@/assets/images/Delivery company.svg');
  background-repeat: no-repeat;
  background-size: 96% 120%;
}
</style>

<script>
import { checkSize } from "@/libs/global-event.js";
import { onMobileMode, onDesktopMode } from "@/libs/listeners.js";
import { $_themeConfig } from "@themeConfig";
export default {
  setup() {
    const appName = $_themeConfig.app.appName
    return {
      appName
    }
  },
  mounted() {
    onMobileMode(() => {
      this.$refs["auth-container"]?.classList.add("mobile-screen");
    });
    onDesktopMode(() => {
      this.$refs["auth-container"]?.classList.remove("mobile-screen");
    });
    checkSize();
  },
  
};
</script>
