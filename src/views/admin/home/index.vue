<template>
  <div>
    <b-row>
      <b-col cols="3">
        <small-card
          mainText="Admins Count"
          mainIcon="Admin"
          :descreptionText="homeDto.adminCount + ' Admins'"
        ></small-card>
      </b-col>
      <b-col cols="3">
        <small-card
          mainText="Drivers Count"
          mainIcon="Motorcycle"
          :descreptionText="homeDto.driverCount + ' Drivers'"
          :class="'mb-2'"
        ></small-card>
      </b-col>
      <b-col cols="3">
        <small-card
          mainText="Shops Count"
          mainIcon="Shop"
          :descreptionText="homeDto.shopCount + ' Shops'"
          :class="'mb-2'"
        ></small-card>
      </b-col>
      <b-col cols="3">
        <small-card
          mainText="Customers Count"
          mainIcon="Profile"
          :descreptionText="homeDto.customerCount + ' Customers'"
          :class="'mb-2'"
        ></small-card>
      </b-col>
      <b-col cols="4" class="mb-2">
        <b-card v-if="homeDto.orderStatisticDto" body-class="pb-50" class="p-1">
          <h6>Orders</h6>
          <h2 class="font-weight-bolder mb-1">
            {{ homeDto.orderStatisticDto.orderCount }}
          </h2>
          <!-- chart -->

          <vue-apex-charts
            height="70"
            :options="statisticsOrder.chartOptions"
            :series="[
              {
                name: 'Orders',
                data: homeDto.orderStatisticDto.orderMonthly,
              },
            ]"
          />
        </b-card>
      </b-col>
      <b-col cols="4" class="mb-2">
        <b-card
          v-if="homeDto.exportStatisticDto"
          body-class="pb-50"
          class="p-1"
        >
          <h6>Total Exports</h6>
          <h2 class="font-weight-bolder mb-1">
            {{ homeDto.exportStatisticDto.totalExport }}
          </h2>
          <!-- chart -->

          <vue-apex-charts
            height="70"
            :options="statisticsExport.chartOptions"
            :series="[
              {
                name: 'Exports',
                data: homeDto.exportStatisticDto.exportMonthly,
              },
            ]"
          />
        </b-card>
      </b-col>
      <b-col cols="4" class="mb-2">
        <b-card
          v-if="homeDto.importStatisticDto"
          body-class="pb-50"
          class="p-1"
        >
          <h6>Total Imports</h6>
          <h2 class="font-weight-bolder mb-1">
            {{ homeDto.importStatisticDto.totalImport }}
          </h2>
          <!-- chart -->

          <vue-apex-charts
            height="70"
            :options="statisticsImport.chartOptions"
            :series="[
              {
                name: 'Imports',
                data: homeDto.importStatisticDto.importMonthly,
              },
            ]"
          />
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card>
          <h6>Best Shops</h6>
          <div>
            <best-user-card
              v-for="(product, index) in homeDto.bestShops"
              :key="index"
              :count="product.count"
              :imagePath="product.imagePath"
              :name="product.name"
            >
            </best-user-card>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card>
          <h6>Best Customers</h6>
          <div>
            <best-user-card
              v-for="(product, index) in homeDto.bestCustomers"
              :key="index"
              :count="product.count"
              :imagePath="product.imagePath"
              :name="product.name"
            >
            </best-user-card>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card>
          <h6>Best Drivers</h6>
          <div>
            <best-user-card
              v-for="(product, index) in homeDto.bestDrivers"
              :key="index"
              :count="product.count"
              :imagePath="product.imagePath"
              :name="product.name"
            >
            </best-user-card>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import VueApexCharts from "vue-apexcharts";
import smallCard from "../../components/smallCard.vue";
const $barColor = "#f3f3f3";
import bestUserCard from "../../components/bestUserCard.vue";

export default {
  components: {
    VueApexCharts,
    smallCard,
    bestUserCard,
  },
  created() {
    this.getHome();
  },

  computed: {
    ...mapState({
      homeDto: (state) => state.home.homeDto,
    }),
  },
  methods: {
    ...mapActions(["getHome"]),
    // kFormatter
  },
  data() {
    return {
      statisticsImport: {
        chartOptions: {
          chart: {
            type: "line",
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              startingShape: "rounded",
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 11,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#4bc953"],
          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
          },
        },
      },
      statisticsExport: {
        chartOptions: {
          chart: {
            type: "line",
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              startingShape: "rounded",
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 11,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#e81721"],
          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
          stroke: {
            curve: "smooth",
          },
        },
      },
      statisticsOrder: {
        chartOptions: {
          chart: {
            type: "bar",
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              top: -15,
              bottom: -15,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%",
              startingShape: "rounded",
              colors: {
                backgroundBarColors: [
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                  $barColor,
                ],
                backgroundBarRadius: 11,
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#3343af"],

          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
    };
  },
};
</script>
