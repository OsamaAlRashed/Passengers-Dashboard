<template>
  <b-row>
    <b-col>
      <b-card class="mb-3">
        <strong>Products details</strong>
        <div style="height: 300px; overflow: auto;">
          <product-card
            v-for="(product, index) in orderDetailsDto.details.products"
            :key="index"
            :count="product.count"
            :imagePath="product.imagePath"
            :name="product.name"
            :price="product.price"
          >
          </product-card>
        </div>
      </b-card>
      <b-card style="pb-0" v-if="orderDetailsDto.status == 1">
        <strong>Time & delivery cost</strong>
        <validation-observer ref="observer">
          <b-row class="my-4">
            <b-col cols="6">
              <a-input-text
                name="cost"
                v-model="orderDetailsDto.expectedCost.cost"
                placeholder="delivery cost"
                type="number"
                prepend
                prependIcon="Bag money"
                :rules="[
                  { type: 'required', message: 'cost is required' },
                  {
                    type: 'min_value:1',
                    message: 'cost must be bigger than 0.',
                  },
                ]"
              >
              </a-input-text>
            </b-col>
            <b-col cols="6">
              <a-input-text
                name="time"
                v-model="orderDetailsDto.expectedCost.time"
                placeholder="Expected time"
                type="number"
                prepend
                prependIcon="Time circle"
                :rules="[
                  { type: 'required', message: 'time is required' },
                  {
                    type: 'min_value:1',
                    message: 'time must be bigger than 0.',
                  },
                ]"
              >
              </a-input-text>
            </b-col>
            <div class="d-flex" style="width: 100%; justify-content: right">
              <button class="btn btn-danger" @click="openRefuse">Refuse</button>
              <button class="btn btn-primary mx-3" @click="submitAccept">
                Accept
              </button>
            </div>
          </b-row>
        </validation-observer>
      </b-card>
    </b-col>
    <b-col>
      <user-info-card
        class="mb-2"
        :id="orderDetailsDto.customer.id"
        :imagePath="orderDetailsDto.customer.imagePath"
        :phoneNumber="orderDetailsDto.customer.phoneNumber"
        :name="orderDetailsDto.customer.name"
      >
      </user-info-card>
      <user-info-card
        class="mb-2"
        :id="orderDetailsDto.shop.id"
        :imagePath="orderDetailsDto.shop.imagePath"
        :phoneNumber="orderDetailsDto.shop.phoneNumber"
        :name="orderDetailsDto.shop.name"
      >
      </user-info-card>
      <user-info-card
        class="mb-2"
        v-if="orderDetailsDto.driver != null"
        :id="orderDetailsDto.driver.id"
        :imagePath="orderDetailsDto.driver.imagePath"
        :phoneNumber="orderDetailsDto.driver.phoneNumber"
        :name="orderDetailsDto.driver.name"
      >
      </user-info-card>
      <b-card style="height: 430px">
        <div class="d-flex my-2">
          <b-img
            class="mr-3"
            src="~@/assets/icons/outline/Icon-Outline-Street number.svg"
          ></b-img>
          <p>{{ orderDetailsDto.customer.address }}</p>
        </div>
        <div class="d-flex mb-4">
          <b-img
            class="mr-3"
            src="~@/assets/icons/outline/Icon-Outline-File.svg"
          ></b-img>
          <p>{{ orderDetailsDto.customer.note }}</p>
        </div>
        <map-viewer v-if="orderDetailsDto.id != nullGuid" :start="{ lat: +orderDetailsDto.shop.lat, lng: +orderDetailsDto.shop.lng }"
            :end="{ lat: +orderDetailsDto.customer.lat, lng: +orderDetailsDto.customer.lng }">
          </map-viewer>
      </b-card>
    </b-col>
    <validation-observer ref="observer">
          <b-modal
      title="Refuse Order"
      v-model="isRefuseOpen"
      content-class="rounded-xl"
      shadow
      bg-variant="white"
      @ok="submitRefuse($event)"
    >
      <a-input-text
        name="reasonRefuse"
        v-model="reasonRefuse"
        placeholder="Reason Refuse"
        prepend
        prependIcon="File"
        :rules="[
          { type: 'required', message: 'reason is required' },
        ]"
      >
      </a-input-text>
    </b-modal>
    </validation-observer>

  </b-row>
</template>
<style scoped>
.card-body {
  padding: 0.25;
}
</style>
<script>
import { mapActions, mapMutations } from "vuex";
import productCard from "../../../components/productCard.vue";
import userInfoCard from "../../../components/userInfoCard.vue";
import mapViewer from "./map.vue";
import { nullGuid } from "@core/util/global";

export default {
  components: {
    productCard,
    userInfoCard,
    'map-viewer': mapViewer,
  },
  created() {
    this.getOrderDetails({
      id: this.orderId,
      cb: ({ data }) => {
        Object.assign(this.orderDetailsDto, data);
        this.Set_Main_Loading(false)
      },
    });
  },
  data: () => ({
    nullGuid,
    orderDetailsDto: {
      id: nullGuid,
      serialNumber: "",
      dateCreated: null,
      completedOn: null,
      details: {},
      expectedCost: {},
      shop: {},
      customer: {},
      driver: {},
    },
    reasonRefuse: "",
    isRefuseOpen: false
  }),
  props: {
    orderId: {
      type: String,
      default: () => null,
    },
  },
  methods: {
    ...mapActions(["getOrderDetails", "accept", "refuse"]),
    submitAccept() {
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.accept({
            orderId: this.orderId,
            cost: this.orderDetailsDto.expectedCost.cost,
            time: this.orderDetailsDto.expectedCost.time,
            cb: () => {
              this.getOrderDetails({
                id: this.orderId,
                cb: ({ data }) => {
                  Object.assign(this.orderDetailsDto, data);
                },
              })
            },
          })
        }
      })
    },
    openRefuse(){
      this.isRefuseOpen = true;
    },
    submitRefuse(BvModalEvent) {
      BvModalEvent.preventDefault();
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.refuse({
            orderId: this.orderId,
            reasonRefuse: this.reasonRefuse,
            cb: () => {
              this.$router.push("/orders");
            },
          })
        }
      })
      
    },
    ...mapMutations(["Set_Main_Loading"])
  },
};
</script>