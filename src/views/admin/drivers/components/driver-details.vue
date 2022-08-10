<template>
  <div>
    <b-row>
      <b-col cols="3">
        <div content-class="rounded-xl" bg-variant="white">
          <b-card style="border-radius: 16px; background-color: #ffffff">
            <div
              class="mb-5"
              style="
                border-radius: 16px;
                background-color: #f5f5f5;
                height: 110px;
              "
            >
              <div style="min-height: 98px"></div>
              <div>
                <b-img
                  style="
                    border-radius: 16px;
                    margin-left: 20px;
                    margin-top: -12px;
                  "
                  width="64"
                  height="64"
                  :src="driverDetailsDto.identifierImagePath ? $store.getters.domainHost + driverDetailsDto.identifierImagePath : getDefaultImage(driverDetailsDto.genderType)"
                >
                </b-img>
                <strong class="ml-3">{{ driverDetailsDto.fullName }}</strong>
              </div>
            </div>
            <div class="d-flex my-2 mt-3" v-if="driverDetailsDto.phoneNumber">
              <b-img
                class="mr-3"
                src="~@/assets/icons/outline/Icon-Outline-Phone.svg"
              ></b-img>
              <p style="margin: inherit">{{ driverDetailsDto.phoneNumber }}</p>
            </div>
            <div class="d-flex my-2" v-if="driverDetailsDto.address">
              <b-img
                class="mr-3"
                src="~@/assets/icons/outline/Icon-Outline-Pin location.svg"
              ></b-img>
              <p style="margin: inherit">{{ driverDetailsDto.address }}</p>
            </div>
            <div class="d-flex my-2" v-if="driverDetailsDto.genderType">
              <b-img
                class="mr-3"
                src="~@/assets/icons/outline/Icon-Outline-Gender.svg"
              ></b-img>
              <p style="margin: inherit">{{ getGender(driverDetailsDto.genderType) }}</p>
            </div>
            <div class="d-flex my-2" v-if="driverDetailsDto.dob">
              <b-img
                class="mr-3"
                src="~@/assets/icons/outline/Icon-Outline-Cake.svg"
              ></b-img>
              <p style="margin: inherit">{{ getDate(driverDetailsDto.dob) }}</p>
            </div>
            <div class="d-flex my-2" v-if="driverDetailsDto.bloodType">
              <b-img
                class="mr-3"
                src="~@/assets/icons/outline/Icon-Outline-Blood.svg"
              ></b-img>
              <p style="margin: inherit">{{ getBlood(driverDetailsDto.bloodType) }}</p>
            </div>
          </b-card>
        </div>
      </b-col>
      <b-col cols="9">
        <b-row>
          <b-col cols="4">
            <small-card
              mainText="Fixed Amount"
              topIcon="Kabab"
              mainIcon="Coin"
              :descreptionText="driverDetailsDto.fixedAmount + ' SYP'"
              @action="test"
              :class="'mb-4'"
            ></small-card>
          </b-col>
          <b-col cols="4">
            <small-card
              mainText="Delivery Amount"
              topIcon="Import"
              mainIcon="Motorcycle"
              :descreptionText="driverDetailsDto.deliveryAmount + ' SYP'"
              @action="test"
              :class="'mb-4'"
            ></small-card>
          </b-col>
          <b-col cols="4"> 
            <small-card
              mainText="Total Amount"
              topIcon="Import"
              mainIcon="Bag money"
              :descreptionText="driverDetailsDto.totalAmount + ' SYP'"
              @action="test"
              :class="'mb-4'"
            ></small-card>
          </b-col>
          <b-col cols="4">
            <small-card
              mainText="Order Count"
              mainIcon="Bag money"
              :descreptionText="driverDetailsDto.orderCount + ' Orders'"
              @action="test"
              :class="'mb-4'"
            ></small-card>
          </b-col>
          <b-col cols="4">
            <small-card
              mainText="Online time"
              mainIcon="Time circle"
              :descreptionText="getTime(driverDetailsDto.onlineTime)"
              @action="test"
              :class="'mb-4'"
            ></small-card>  
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<style >
.card-body {
  padding: 1rem;
}
</style>
<script>
import { mapActions, mapState} from "vuex";
import { nullGuid } from "../../../../core/util/global";
import smallCard from "../../../components/smallCard.vue";
export default {
  computed: {
    ...mapState({ genders: (state) => state.global.genders }),
    ...mapState({ bloodTypeList: (state) => state.global.bloodTypeList }),
  },

  created() {
    this.getDriverDetails({
      id: this.driverId,
      cb: ({ data }) => {
        Object.assign(this.driverDetailsDto, data);
      },
    });
    this.genderTypes();
    this.getBloodTypes();
  },

  components: {
    smallCard,
  },

  props: {
    driverId: {
      type: String,
      default: () => null,
    },
  },
  data: () => ({
    driverDetailsDto: {
      id: nullGuid,
      fullName: "",
      phoneNumber: "",
      addressText: "",
      userName: "",
      genderType: 0,
      bloodType: 0,
      age: 0,
      identifierImagePath: "",
      isBlocked: false,
      online: false,
      fixedAmount: 0,
      dob: new Date(),
      deliveryAmount: 0,
      totalAmount: 0,
      orderCount: 0,
      onlineTime: 0,
    },
  }),
  methods: {
    ...mapActions(["getDriverDetails","genderTypes", "getBloodTypes"]),
    getDefaultImage(gender){
      return require(`@/assets/images/default image/${gender == 1 ? 'Male' : 'Female'}.svg`);
    },
     getDate(data) {
      if (data) {
        return new Date(data).toLocaleDateString("en-GB", { timeZone: "UTC" });
      }
      return "";
    },
    getGender(index){
      var ob = this.genders[this.genders.findIndex((x) => x.id == index)]
      if(ob){
        return ob.name
      }
      return "";
    },

    getBlood(index){
      var ob = this.bloodTypeList[this.bloodTypeList.findIndex((x) => x.id == index)]
      if(ob){
        return ob.name
      }
      return "";
    },
    test(){
      console.log("Sad")
    },
    getTime(time){
      var hours = Math.floor(time / 60);
      return (hours > 0 ? hours + "h " : "") + (time % 60) + "min" 
    }

  },
};
</script>
