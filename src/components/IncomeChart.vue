<template>
  <div :id="`${this.idTitle}Chart`">
    <div class="containing">
      <div id="incomeChartTitle">
        <h5 class="mb-0 chartTitle">{{ computedTitle }}</h5>
        <h5 v-show="showMarket" class="mb-0 chartTitle">
          Urban/Suburban/Exurban Household %
        </h5>
        <h5 v-show="showMarket" class="mb-0 chartTitle">
          Split On Income Group
        </h5>
      </div>
      <img
        id="incomeChartLogo"
        height="20"
        width="20"
        class="chartLogo"
        v-show="showLogo"
        src="../assets/bainsymbol_dig_red_1280x1278px.png"
      />
      <div
        :id="`downloadimg-button-${this.slug}-chart`"
        class="icon icon-downloadimg icon-sm icon-downloadimg-abs"
        :class="{ active: false }"
        @click="downloadImageIncome"
      >
        <b-tooltip :target="`downloadimg-button-${this.slug}-chart`"
          >Download chart image</b-tooltip
        >
      </div>
      <div
        :id="`downloaddoc-button-${this.slug}-chart`"
        class="icon icon-downloaddoc icon-sm icon-downloaddoc-abs"
        :class="{ active: false }"
        @click="showTosModalCsvIncome"
      >
        <b-tooltip :target="`downloaddoc-button-${this.slug}-chart`"
          >Download CSV</b-tooltip
        >
      </div>
    </div>
    <div class="mt-2">
      <Bar
        :chartData="computedChartData"
        :chartOptions="options"
        class="chart"
      />
    </div>
    <b-modal
      id="modal-tos-income"
      size="xl"
      centered
      scrollable
      title="Terms of Service"
    >
      <p>
        IMPORTANT: THIS IS A LEGAL AGREEMENT BETWEEN YOU, YOUR COMPANY AND BAIN
        & COMPANY, INC. (“BAIN”).
      </p>

      <p>
        BY CLICKING THE “I ACCEPT” BUTTON BELOW YOU CONFIRM AND AGREE FOR THE
        BENEFIT OF BAIN, THAT (1) YOU ARE AUTHORIZED TO ENTER INTO, AND ARE
        ENTERING INTO, THIS LICENSE AGREEMENT FOR AND ON BEHALF OF YOUR COMPANY;
        AND (2) YOU HAVE READ, UNDERSTAND AND AGREE THAT YOU AND YOUR COMPANY
        SHALL BE BOUND BY THE TERMS AND CONDITIONS BELOW. IF YOU DO NOT AGREE
        WITH THESE TERMS AND CONDITIONS, CLICK ON THE “I DO NOT ACCEPT” BUTTON
        BELOW.
      </p>

      <p>
        License Restrictions: The Bain Macro Trends geospatial population data
        (the “Data”) is licensed to Bain and subject to certain usage
        restrictions. By clicking below and accessing the data, you agree to the
        following terms. You will not, and will prevent any activity that would:
        A) duplicate, disseminate, translate or reproduce the Data or any
        portion thereof; B) resell, lease, assign, transfer, or sublicense the
        Data or any portion thereof; or C) translate, modify, decode,
        disassemble or reverse engineer the Data or any portion thereof. You
        shall only use the data for your internal purposes. You hereby release
        and hold harmless Bain from any claims and liabilities related to your
        use of the data.
      </p>

      <template #modal-footer>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="danger" @click="acceptTermsIncome">
          I Accept
        </b-button>
        <b-button variant="danger" @click="rejectTermsIncome">
          I Do Not Accept
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script >
import html2canvas from "html2canvas";
// import { defineComponent } from 'vue';
import { defineComponent } from "@vue/composition-api";
// import { getCurrentInstance } from "vue"; // 2.7  getCurrentInstance().proxy.$refs;

import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";
// import { FullChart } from "./FullChart";

Chart.register(...registerables);

export default defineComponent({
  name: "IncomeChart",
  components: {
    Bar,
    // FullChart,
  },
  setup() {
    // const chartRef = ref();
    // onMounted(() => {
    //   console.log(chartRef);
    //   // chartRef.value.chartInstance.toBase64Image();
    // });
  },

  props: [
    "xAxisLabels",
    "chartData",
    "market",
    "chartTitle",
    "chartSlug",
    "startYear",
    "endYear",
    "highlightChartUrban",
    "highlightChartSubUrban",
    "highlightChartExUrban",
  ],
  //   data() {
  //     return() {
  //         labels: this.xAxisLabels
  //     };
  //   },
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      data: this.chartData,
      title: this.chartTitle,
      slug: this.chartSlug,
      showMarket: false,
      showLogo: false,
    };
  },
  created() {},
  computed: {
    devicePixelRatio() {
      return window.devicePixelRatio;
    },
    urbanBackgroundColor() {
      return this.highlightChartUrban ? "#33ffff" : "#595959";
    },
    subUrbanBackgroundColor() {
      return this.highlightChartSubUrban ? "#33ffff" : "#898989";
    },
    exUrbanBackgroundColor() {
      return this.highlightChartExUrban ? "#33ffff" : "#b9b9b9";
    },
    urbanTextColor() {
      return this.highlightChartUrban ? "#000000" : "#ffffff";
    },
    subUrbanTextColor() {
      return this.highlightChartSubUrban ? "#000000" : "#ffffff";
    },
    exUrbanTextColor() {
      return this.highlightChartExUrban ? "#000000" : "#ffffff";
    },
    idTitle() {
      return this.title.replaceAll(" ", "_").replaceAll("+", "and");
    },
    xLabels() {
      return this.xAxisLabels;
      // .slice(4, 8)
      // .concat(this.xAxisLabels.slice(16, 20), this.xAxisLabels.slice(28, 32));
    },
    options() {
      return {
        layout: {
          padding: 10,
        },
        animation: false,
        plugins: {
          legend: {
            display: false,
            // html legend https://www.chartjs.org/docs/3.6.0/samples/legend/html.html
          },
          // title: {
          //   display: true,
          //   align: "start",
          //   text: this.computedTitle,
          //   fullsize: true,
          //   font: {
          //     size: 18,
          //     fontFamily: "Graphik",
          //     color: "#000",
          //     weight: "normal",
          //   },
          // },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            color: "#ffffff",
            font: {
              size: "11",
            },
            formatter: function (value) {
              return Math.round(value * 100) + "%";
            },
          },
        },
        scales: {
          yAxis: {
            max: 1.0,
            min: 0.0,
            ticks: {
              callback: function (value) {
                return value.toLocaleString("en-US", {
                  style: "percent",
                });
              },
            },
            grid: {
              display: false,
            },
          },
          xAxis: {
            grid: {
              display: false,
              // borderColor: "#ffffff",
              // drawBorder: false
            },

            //   labels: ['','2018', '2020','','', '2018', '2020','','', '2018', '2020','','','2018', '2020','','', '2018', '2020','','', '2018', '2020','','','2018', '2020','','', '2018', '2020','','', '2018', '2020','','', '2018', '2020','']
            labels: this.xLabels,
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          xAxis1: {
            grid: {
              display: false,
              borderColor: "#ffffff",
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 11,
              },
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        // tooltips: {
        //     callbacks: {
        //         label: function (tooltipItem, data) {
        //             var index = tooltipItem.index;
        //             var currentValue = data.datasets[tooltipItem.datasetIndex].data[index];
        //             var total = 0;
        //             data.datasets.forEach(function (el) {
        //                 total = total + el.data[index];
        //             });
        //             //   var percentage = parseFloat((currentValue/total*100).toFixed(1));
        //             return currentValue.toLocaleString('en-US', {
        //                 style: 'percent'
        //             });
        //         },
        //         title: function (tooltipItem, data) {
        //             return data.datasets[tooltipItem[0].datasetIndex].label;
        //         }
        //     }
        // },
        responsive: true,
        legend: false,
        hover: false,
      };
    },
    computedChartData() {
      let market = Object.keys(this.chartData)[0];
      // let defaults = [0.33333, 0.33333, 0.33333];
      let urban1 = [0.333333333, 0.33333333, 0.3333333];
      let urban2 = [0.333333333, 0.33333333, 0.3333333];
      let suburban1 = [0.333333333, 0.33333333, 0.3333333];
      let suburban2 = [0.333333333, 0.33333333, 0.3333333];
      let exurban1 = [0.333333333, 0.33333333, 0.3333333];
      let exurban2 = [0.333333333, 0.33333333, 0.3333333];
      // console.log(Object.keys(this.chartData).length);
      if (Object.keys(this.chartData[market]).length > 0) {
        // let years = Object.keys(this.chartData[market]);
        // console.log(this.chartData);
        // console.log(years);
        // console.log(this.chartData[market][years[0]]);
        // console.log(this.chartData[market][years[1]]);
        urban1 = Object.values(this.chartData[market][this.startYear]).map(
          (x) => x.urban
        );
        urban2 = Object.values(this.chartData[market][this.endYear]).map(
          (x) => x.urban
        );
        suburban1 = Object.values(this.chartData[market][this.startYear]).map(
          (x) => x.suburban
        );
        suburban2 = Object.values(this.chartData[market][this.endYear]).map(
          (x) => x.suburban
        );
        exurban1 = Object.values(this.chartData[market][this.startYear]).map(
          (x) => x.exurban
        );
        exurban2 = Object.values(this.chartData[market][this.endYear]).map(
          (x) => x.exurban
        );
      }
      let returnData = {
        labels: [["Income: $0-50K"], ["Income: $50-100K"], ["Income: $100K+"]],

        // labels: ["all"] ["All Segments", "Income: $0-50K Age: 18-44", "Income: $0-50K Age: 45-64", "Income: $0-50K Age: 65+",
        // "Income: $50-100K Age: 18-44", "Income: $50-100K Age: 45-64", "Income: $50-100K Age: 65+",
        // "Income: $100K+ Age: 18-44", "Income: $100K+ Age: 45-64", "Income: $100K+ Age: 65+",
        // ],
        datasets: [
          {
            label: "Blank",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 0",
            data: [0, 0, 0],
          },

          {
            label: `${this.startYear} - Urban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.urbanBackgroundColor,
            datalabels: {
              color: this.urbanTextColor,
              display: urban1.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.10, 0.20, 0.30, 0.10, 0.20, 0.30, 0.10, 0.20, 0.30, 0.10],
            // NOTE: unshift and pop deals is the fastest way to deal with wanting all, 1,2,3 ... segment order
            data: urban1,
          },
          {
            label: `${this.startYear} - Suburban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.subUrbanBackgroundColor,
            datalabels: {
              color: this.subUrbanTextColor,
              display: suburban1.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
            data: suburban1,
          },
          {
            label: `${this.startYear} - ExUrban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.exUrbanBackgroundColor,
            datalabels: {
              color: this.exUrbanTextColor,
              display: exurban1.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.80, 0.70, 0.60, 0.80, 0.70, 0.60, 0.80, 0.70, 0.60, 0.80],
            data: exurban1,
          },

          {
            label: `${this.endYear} - Urban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.urbanBackgroundColor,
            datalabels: {
              color: this.urbanTextColor,
              display: urban2.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.20, 0.30, 0.40, 0.20, 0.30, 0.40, 0.20, 0.30, 0.40, 0.20],
            data: urban2,
          },
          {
            label: `${this.endYear} - Suburban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.subUrbanBackgroundColor,
            datalabels: {
              color: this.subUrbanTextColor,
              display: suburban2.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
            data: suburban2,
          },
          {
            label: `${this.endYear} - ExUrban - All Segments`,
            xAxisID: "xAxis1",
            backgroundColor: this.exUrbanBackgroundColor,
            datalabels: {
              color: this.exUrbanTextColor,
              display: exurban2.map((x) => x != 0.0),
            },
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.70, 0.60, 0.50, 0.70, 0.60, 0.50, 0.70, 0.60, 0.50, 0.70],
            data: exurban2,
          },
          {
            label: "Blank",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 3",
            data: [0, 0, 0],
          },
        ],
      };
      // console.log("returnData");
      // console.log(returnData);
      return returnData;
    },
    computedTitle() {
      if (this.showMarket) {
        return `Metro: ${this.market}`;
      } else {
        // return this.title;
        return "Income";
      }
      // if (this.showMarket) {
      //   return `${this.market} - ${this.title}`;
      // } else {
      //   return this.title;
      // }
    },
    csvRows() {
      // console.log(this.computedChartData);
      let header = this.computedChartData["labels"].map((x) => x[0]);
      header.unshift("");
      let data = this.computedChartData["datasets"]
        .slice(1, 7)
        .map((x) => [x.label.replace(" - All Segments", "")].concat(x.data));
      let rows = [header].concat(data);
      return rows;
    },
    csvString() {
      let csvString = this.csvRows.map((row) => row.join(",")).join("\n");
      return csvString;
    },
    filenamePartial() {
      return `${this.market}_${this.slug.toLowerCase()}_chart_data`;
    },
  },
  methods: {
    showTosModalCsvIncome() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadDataCsvIncome";
      // console.log(this.downloadRequestFunction);
      this.$bvModal.show("modal-tos-income");
    },
    showTosModalImageIncome() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadImageIncome";
      this.$bvModal.show("modal-tos-income");
    },
    acceptTermsIncome() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos-income");
      // console.log('accept')
      this.tosAccepted = true;
      if (this.downloadRequestFunction == "downloadDataCsvIncome") {
        this.downloadDataCsvIncome();
      } else if (this.downloadRequestFunction == "downloadImageIncome") {
        this.downloadImageIncome();
      }
      this.trackTOSAcceptanceInGoogleAnalytics();
    },
    rejectTermsIncome() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos-income");
      // console.log('reject')
      this.tosAccepted = false;
      this.downloadRequestFunction = null;
    },
    trackTOSAcceptanceInGoogleAnalytics() {
      let userId = null;
      if (window.dataLayer) {
        userId = window.dataLayer.find(
          (element) => Object.keys(element)[0] == "userId"
        ).userId;
        let value = `${userId}`;
        window.dataLayer.push({ geoSpatialTOSAcceptance: value });
        // if (typeof(ga) != "undefined") {
        //   ga('send', {
        //     hitType: 'event',
        //     eventCategory: 'GeoSpatial',
        //     eventAction: 'acceptTOS',
        //     eventLabel: `user:${userId}`
        //   });
        //   console.log('ga found')
        // }
      }
      // console.log(`tracked user ${userId}`)
    },
    downloadDataCsvIncome() {
      let csvString = this.csvString;
      let blob = new Blob([csvString], { type: "text/csv" });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Bain-${this.filenamePartial}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async downloadImageIncome() {
      this.showMarket = true;
      this.showLogo = true;
      // await sleep(100);
      // const logo = document.createElement("img");
      // logo.id = "fullChartLogo";
      // logo.src = this.pngLogo;
      // logo.height = 40;
      // logo.width = 40;
      html2canvas(document.querySelector(`#${this.idTitle}Chart canvas`), {
        useCORS: true,
        allowTaint: true,
      }).then(
        (chartCanvas) => {
          html2canvas(document.querySelector("#incomeChartTitle"), {
            backgroundColor: null,
            useCORS: true,
            allowTaint: true,
          }).then((mapTitle) => {
            html2canvas(document.querySelector("#incomeChartLogo"), {
              backgroundColor: null,
              useCORS: true,
              allowTaint: true,
            }).then((logo) => {
              html2canvas(document.querySelector("#chartLegend"), {
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
              }).then((legend) => {
                const mergeCanvas = document.createElement("canvas");
                const mergeCtx = mergeCanvas.getContext("2d");
                let legendHeight =
                  document.querySelector("#chartLegend").offsetHeight *
                  this.devicePixelRatio;
                let legendWidth =
                  document.querySelector("#chartLegend").offsetWidth *
                  this.devicePixelRatio;
                let mergedLegendWidth = legendWidth;
                let mergedLegendHeight =
                  mergedLegendWidth * (legendHeight / legendWidth);
                mergeCanvas.height =
                  chartCanvas.height + 150 * this.devicePixelRatio;
                mergeCanvas.width =
                  legendWidth + 2 * 22 * this.devicePixelRatio;
                mergeCtx.fillStyle = "white";
                mergeCtx.fillRect(0, 0, mergeCanvas.width, mergeCanvas.height);
                mergeCtx.drawImage(
                  chartCanvas,
                  (mergeCanvas.width - chartCanvas.width) / 2 +
                    1 * this.devicePixelRatio,
                  85 * this.devicePixelRatio
                );
                mergeCtx.drawImage(
                  mapTitle,
                  20 * this.devicePixelRatio,
                  10 * this.devicePixelRatio
                );

                mergeCtx.drawImage(
                  logo,
                  mergeCanvas.width - 30 * this.devicePixelRatio,
                  10 * this.devicePixelRatio
                );
                mergeCtx.drawImage(
                  legend,
                  (mergeCanvas.width - mergedLegendWidth) / 2 +
                    1 * this.devicePixelRatio,
                  mergeCanvas.height - 50 * this.devicePixelRatio,
                  mergedLegendWidth,
                  mergedLegendHeight
                );
                var img = mergeCanvas.toDataURL("image/png");
                // event.target.href = img
                this.showLogo = false;
                this.showMarket = false;
                var link = document.createElement("a");
                // var url = URL.createObjectURL(blob);
                var url = img;
                link.setAttribute("href", url);
                link.setAttribute(
                  "download",
                  `Bain-${this.filenamePartial}.png`
                );
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              });
            }); //this is it
          }); // this is it
        } //
      );
    },
  },
});
</script>
<style lang="scss">
.containing h5 {
  font-size: 16px;
}
</style>
