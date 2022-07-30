<template>
  <div id="map"></div>
</template>
<style lang="scss">
#map {
  height: calc(100vh - 162px);
  width: 100%;
}
</style>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { $_themeConfig } from "@themeConfig";
export default {
  props: {
    myLatlng: Object
  },
  data: () => ({
    zoom: 13,
    map: null,
    marker: null
  }),
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
    setMarker(latLog) {
      var center = new google.maps.LatLng(latLog.lat, latLog.lng);
          // move info window to center
      this.map.panTo(center);
      if(!this.marker) {
        this.marker = new google.maps.Marker({
          position: {
            lat: latLog.lat,
            lng: latLog.lng
          },
          map: this.map
        })
      } else {
        const latLag = new google.maps.LatLng(latLog.lat, latLog.lng)
        this.marker.setPosition(latLag)
      }
    }
  },
  watch: {
    myLatlng: {
      deep: true,
      handler(v) {
        this.setMarker(v)
      }
    }
  }
};
</script>
