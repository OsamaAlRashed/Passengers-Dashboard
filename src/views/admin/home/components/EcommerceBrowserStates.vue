<template>
    <b-card no-body class="card-browser-states">
        <b-card-header>
            <b-card-title>Title</b-card-title>
        </b-card-header>
        <!-- body -->
        <b-card-body>
            <div
                v-for="(browser, index) in homeObjDto.bestEmployees"
                :key="browser.name"
                class="browser-states"
            >
                <b-media no-body>
                    <!-- <b-media-aside class="mr-1">
                        <b-img :src="browser.browserImg" alt="browser img" />
                    </b-media-aside> -->
                    <b-media-body>
                        <h6 class="align-self-center my-auto">
                            {{ browser.name }}
                        </h6>
                    </b-media-body>
                </b-media>
                <div class="d-flex align-items-center">
                    <span class="font-weight-bold text-body-heading mr-1">{{
                        browser.todoCount
                    }}</span>
                    <vue-apex-charts
                        type="radialBar"
                        height="30"
                        width="30"
                        :options="chartData[index].options"
                        :series="chartData[index].series"
                    />
                </div>
            </div>
        </b-card-body>
    </b-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";
/* eslint-disable global-require */
const $trackBgColor = "#e9ecef";
import { mapState } from "vuex";
import { useUtils as useI18nUtils } from "@core/libs/i18n";


export default {
    components: {
        VueApexCharts
    },
    computed: {
        ...mapState({
            homeObjDto: state => state.Home.homeObjDto
        })
    },
    data() {
        return {
            chartData: [],
            chartClone: {},
            chartColor: [
                $themeColors.primary,
                $themeColors.warning,
                $themeColors.secondary,
                $themeColors.info,
                $themeColors.danger
            ],
            chartSeries: [54.4, 6.1, 14.6, 4.2, 8],
            chart: {
                series: [65],
                options: {
                    grid: {
                        show: false,
                        padding: {
                            left: -15,
                            right: -15,
                            top: -12,
                            bottom: -15
                        }
                    },
                    colors: [$themeColors.primary],
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: "22%"
                            },
                            track: {
                                background: $trackBgColor
                            },
                            dataLabels: {
                                showOn: "always",
                                name: {
                                    show: false
                                },
                                value: {
                                    show: false
                                }
                            }
                        }
                    },
                    stroke: {
                        lineCap: "round"
                    }
                }
            }
        };
    },
    created() {
        for (let i = 0; i < this.homeObjDto.bestEmployees.length; i += 1) {
            const chartClone = JSON.parse(JSON.stringify(this.chart));
            chartClone.options.colors[0] = this.chartColor[i];
            chartClone.series[0] = this.chartSeries[i];
            this.chartData.push(chartClone);
        }
    },
};
</script>
