<template>
  <div :class="{'collapsed': collapsed}">
    <div class="d-flex">
      <a-drawer :items="items"></a-drawer>
      <main class="content border-left rounded-0">
        <a-navbar @toggleCollapse="collapsed = !collapsed" :collapsed="collapsed"></a-navbar>
        <a-bradcrumb :items="$route.meta($route).breadcrumb">
          <router-view name="router-action"/>
        </a-bradcrumb>
        <div
          class="content-container py-3 position-relative"
          :class="{ 'overflow-hidden': isMainLoading }"
        >
          <transition name="scale-transition">
            <loading v-if="isMainLoading" />
          </transition>
          <transition name="scale-transition">
            <div v-show="!isMainLoading">
              <b-container fluid>
                <slot></slot>
              </b-container>
            </div>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { $_themeConfig } from "@themeConfig";
import navigationDrawer from "@/navigation/drawer/index.js";
import loading from "@/core/components/loading";
import aNavbar from "./components/a-navbar/index.vue";
import aDrawer from "./components/a-drawer/drawer-list";
import aBradcrumb from "./components/a-bradcrumb";
import { mapState } from "vuex";
import { onMobileMode, onDesktopMode } from "@/libs/listeners.js";
import { checkSize } from "@/libs/global-event.js";

export default {
  components: {
    loading,
    aNavbar,
    aDrawer,
    aBradcrumb
  },
  data: () => ({
    navigationDrawer,
    collapsed: false
  }),
  computed: {
    ...mapState({
      isMainLoading: (state) => state.app.isMainLoading,
    }),
    appName() {
      return $_themeConfig.app.appName;
    },
    appSubtitle() {
      return $_themeConfig.app.appSubtitle;
    },
    isRTL() {
      return $_themeConfig.app.isRTL;
    },
    items() {
      return navigationDrawer;
    },
  },
  mounted() {
      onMobileMode(() => {
        this.collapsed = true
      })
      onDesktopMode(() => {
        this.collapsed = false
      })
      checkSize()
  }
}
</script>
<style scoped>
.content{
  background-color: #F5f5f5;
}
</style>