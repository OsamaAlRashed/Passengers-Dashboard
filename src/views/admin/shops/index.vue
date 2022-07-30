<template>
  <b-row>
    <b-col cols="8">
      <a-table
        :items="shops"
        :columns="columns"
        @row-click="openDetails"
        no_select
      >
        <template slot="items.imagePath" slot-scope="{ value }">
          <b-img
            style="border-radius: 16px"
            width="48"
            height="48"
            :src="value ? $store.getters.domainHost + value : getDefaultImage()"
          >
          </b-img>
        </template>
        <template slot="items.orderStatus" slot-scope="{ value }">
          <b-badge :variant="value == 0 ? 'danger' : 'success'">{{
            value == 0 ? "No" : "Yes"
          }}</b-badge>
        </template>
        <template slot="items.online" slot-scope="{ value }">
          <b-badge :variant="value == 0 ? 'danger' : 'success'">{{
            value == 0 ? "offline" : "online"
          }}</b-badge>
        </template>
        <template slot="items.details" slot-scope="{ props }">
          <a
            @click="map($event, props)"
            >
              <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Pin location.svg"
            ></b-img>
          </a>
        </template>
      </a-table>
    </b-col>
    <b-col cols="4">
      <b-card>
        <map-viewor :myLatlng="{
          lat: +dto.lat,
          lng: +dto.lng
        }"></map-viewor>
      </b-card>
    </b-col>
    <b-modal
      v-model="isShopDetails"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      :hide-footer="true"
      :hide-header="true"
    >
      <div
        class="mb-5"
        style="border-radius: 16px; background-color: #f5f5f5; height: 110px"
      >
        <div style="min-height: 98px"></div>
        <div>
          <b-img
            style="border-radius: 16px; margin-left: 20px; margin-top: -12px"
            width="64"
            height="64"
            :src="$store.getters.domainHost + shopDto.imagePath"
          >
          </b-img>
          <strong class="ml-3">{{ shopDto.name }}</strong>
          <b-badge v-if="shopDto.online" style="margin-left: 5px; border-radius: 50%;" variant="primary">online</b-badge>
        </div>
      </div>
      <b-row>
        <b-col cols="6">
          <strong>Main Information</strong>
          <div class="d-flex my-2" v-if="shopDto.category">
            <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Categories.svg"
            ></b-img>
            <p style="margin: inherit">{{ shopDto.category }}</p>
          </div>
          <div class="d-flex my-2" v-if="shopDto.days">
            <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Calendar.svg"
            ></b-img>
            <p style="margin: inherit">{{ shopDto.days }}</p>
          </div>
          <div class="d-flex my-2" v-if="shopDto.time">
            <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Time circle.svg"
            ></b-img>
            <p style="margin: inherit">{{ shopDto.time }}</p>
          </div>
          <div class="d-flex my-2">
            <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Motorcycle.svg"
            ></b-img>
            <p style="margin: inherit">{{ shopDto.deliveryStatus }}</p>
          </div>
          <div class="d-flex my-2" v-if="shopDto.address">
            <b-img
              class="mr-3"
              src="~@/assets/icons/outline/Icon-Outline-Pin location.svg"
            ></b-img>
            <p style="margin: inherit">{{ shopDto.address }}</p>
          </div>
        </b-col>
        <b-col cols="6">
            <strong>Contact Information</strong>
            <div v-for="(contact, index) in shopDto.contacts" :key="index" class="d-flex my-2">
                <b-img
                    class="mr-3"
                    :src="require(`@/assets/icons/outline/Icon-Outline-${contactShopList[contactShopList.findIndex(x => x.id == contact.type)].name}.svg`)"
                ></b-img>
                <p style="margin: inherit">{{ contact.text }}</p>
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </b-row>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { nullGuid } from "@core/util/global";
import mapViewor from "./components/map.vue";

export default {
  components: {
    mapViewor,
  },
  computed: {
    ...mapState({ shops: (state) => state.shops.shops }),
    ...mapState({ dayList: (state) => state.global.dayList }),
    ...mapState({ contactShopList: (state) => state.global.contactShopList }),

  },

  data: () => ({
    dto: {
      lat: 0,
      lng: 0
    },
    columns: [
      {
        label: "",
        field: "imagePath",
        sortable: false
      },
      {
        label: "Shop name",
        field: "name",
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
      },
      {
        label: "Business Type",
        field: "category",
      },
      {
        label: "Delivery",
        field: "orderStatus",
      },
      {
        label: "Status",
        field: "online",
      },
      {
        label: "map",
        field: "details",
        sortable: false,
      },
    ],
    shopDto: {
      id: nullGuid,
      name: "",
      phoneNumber: "",
      imagePath: "",
      category: "",
      online: false,
      days: "",
      time: "",
      contacts: [],
      orderStatus: false,
    },
    isShopDetails: false,
  }),

  created() {
    this.getShops();
    this.getDays();
    this.getContactShopTypes();
  },

  methods: {
    ...mapActions(["getShops", "getDays","getContactShopTypes"]),

    openDetails(props) {
      var currentShop =
        this.shops[this.shops.findIndex((x) => x.id == props.row.id)];

      this.shopDto.name = currentShop.name;
      this.shopDto.imagePath = currentShop.imagePath;
      this.shopDto.online = currentShop.online;
      this.shopDto.category = currentShop.category;

      this.shopDto.days =
        currentShop.fromDay == null || currentShop.toDay == null
          ? ""
          : this.dayList[
              this.dayList.findIndex((x) => x.id == currentShop.fromDay)
            ].name +
            " to " +
            this.dayList[
              this.dayList.findIndex((x) => x.id == currentShop.toDay)
            ].name;
      this.shopDto.time =
        currentShop.fromTime == null || currentShop.toTime == null
          ? ""
          : currentShop.fromTime + " - " + currentShop.toTime;
      this.shopDto.deliveryStatus =
        currentShop.orderStatus == 0
          ? "Delivery Unavilable"
          : "Delivery avilable";
      this.shopDto.address = currentShop.address?.text ?? "";
      this.shopDto.contacts = currentShop.contacts;

      this.isShopDetails = !this.isShopDetails;
    },
    map(e, props){
      e.stopPropagation();
      this.dto.lat = props.row.address.lat;
      this.dto.lng = props.row.address.long;

    },
    getDefaultImage(){
      return require(`@/assets/images/default image/Shop.svg`);
    }
  },
};
</script>
