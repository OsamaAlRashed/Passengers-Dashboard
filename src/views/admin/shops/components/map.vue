<template>
  <div id="map"></div>
</template>
<style lang="scss">
#map {
  height: calc(100vh - 122px);
  width: calc(100% + 16px);
  margin: -16px;
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
export default {
  data: () => ({
    myLatlng: {
      lat: 36.204,
      lng: 37.135,
    },
    zoom: 13,
    map: null,
  }),
  props:{
    lat: {
        type: String,
        default: () => "36.204"
    },
    lng: {
        type: String,
        default: () => "37.135"
    },
  },
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      const loader = new Loader({
        apiKey: $_themeConfig.apiKey,
        version: "weekly",
        libraries: ["places"],
      });
      loader.load().then(() => {
        // eslint-disable-next-line no-undef
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: this.myLatlng,
          zoom: this.zoom,
          mapTypeId: "roadmap",
        });
      });
    },
  },
};
</script>
