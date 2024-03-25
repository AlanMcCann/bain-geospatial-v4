<template>
  <div id="ComparisonChartId">
    <div class="containing">
      <h5 id="compChartTitle" class="chartTitle">{{ computedTitle }}</h5>
      <img
        id="compChartLogo"
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
        @click="downloadImageComp"
      >
        <b-tooltip :target="`downloadimg-button-${this.slug}-chart`"
          >Download chart image</b-tooltip
        >
      </div>
      <div
        :id="`downloaddoc-button-${this.slug}-chart`"
        class="icon icon-downloaddoc icon-sm icon-downloaddoc-abs"
        :class="{ active: false }"
        @click="showTosModalCsvComp"
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
      id="modal-tos-comp"
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
        <b-button variant="danger" @click="acceptTermsComp">
          I Accept
        </b-button>
        <b-button variant="danger" @click="rejectTermsComp">
          I Do Not Accept
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script >
function extractData(chartData, year, geo) {
  // console.log("extractData");
  // console.log(chartData);
  // console.log(year);
  // console.log(geo);
  let keys = Object.keys(chartData);
  let data = [];
  for (let i = 0; i < keys.length; i++) {
    data.push(chartData[keys[i]][year.toString()][geo]);
  }
  return data;
}
function marketNameWithCaveat(market, dataOptions) {
  let region = dataOptions.regionOptions.find(
    (region) => region.region === market
  );
  let displayRegion = region.displayRegion;
  if (region.needsCaveat == 1) {
    displayRegion = region.displayRegion + "*";
  }
  return displayRegion;
}
import html2canvas from "html2canvas";
// import { defineComponent } from 'vue';
import { defineComponent } from "@vue/composition-api";
// import { getCurrentInstance } from "vue"; // 2.7  getCurrentInstance().proxy.$refs;

import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";
// import { FullChart } from "./FullChart";

Chart.register(...registerables);

export default defineComponent({
  name: "ComparisonChart",
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
    "dataOptions",
    "xAxisLabels",
    "chartData",
    "markets",
    "chartTitle",
    "chartSlug",
    "ageSegment",
    "incomeSegment",
    "startYear",
    "endYear",
    "marketSettingsData",
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
      title: this.computedTitle,
      slug: this.chartSlug,
      showMarket: false,
      showLogo: false,
    };
  },
  created() {},
  computed: {
    computedTitle() {
      if (this.showMarket) {
        return "Multi-Market Comparison";
      } else {
        return "";
      }
    },
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
      return (
        this.computedTitle.replaceAll(" ", "_").replaceAll("+", "and") +
        "ComparisonChartId"
      );
    },
    xLabels() {
      return this.xAxisLabels;
    },
    options() {
      return {
        layout: {
          padding: 10,
        },
        aspectRatio: 2.5,
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
            labels: this.xAxisLabels,
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
                size: 14,
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
      // console.log(this.startYear);
      // console.log(this.endYear);
      let urban1 = extractData(this.chartData, this.startYear, "urban");
      let urban2 = extractData(this.chartData, this.endYear, "urban");
      let suburban1 = extractData(this.chartData, this.startYear, "suburban");
      let suburban2 = extractData(this.chartData, this.endYear, "suburban");
      let exurban1 = extractData(this.chartData, this.startYear, "exurban");
      let exurban2 = extractData(this.chartData, this.endYear, "exurban");

      // let urban1 = Object.values(this.chartData.data[years[0]]["Urban"]);
      // urban1.unshift(urban1.pop());
      // let suburban1 = Object.values(this.chartData.data[years[0]]["SubUrban"]);
      // suburban1.unshift(suburban1.pop());
      // let exurban1 = Object.values(this.chartData.data[years[0]]["ExUrban"]);
      // exurban1.unshift(exurban1.pop());
      // let urban2 = Object.values(this.chartData.data[years[1]]["Urban"]);
      // urban2.unshift(urban2.pop());
      // let suburban2 = Object.values(this.chartData.data[years[1]]["SubUrban"]);
      // suburban2.unshift(suburban2.pop());
      // let exurban2 = Object.values(this.chartData.data[years[1]]["ExUrban"]);
      // exurban2.unshift(exurban2.pop());
      // console.log(exurban2);
      let marketKeys = Object.keys(this.chartData);
      let numMarkets = marketKeys.length;
      const zeros = new Array(numMarkets).fill(0);
      // console.log(this.ageSegment);
      // console.log(this.incomeSegment);
      marketKeys.length;
      let labels = [];
      for (let i = 0; i < numMarkets; i++) {
        // console.log("i", i);
        let marketKey = marketKeys[i];
        // let marketData = this.chartData[marketKey];
        // let marketDataKeys = Object.keys(marketData);
        let years = `${this.startYear}, ${this.endYear}`;
        // let age = "All";
        // let income = "All";
        let age = this.ageSegment.split(":")[1];
        if (age == "All") {
          age = "All Ages";
        }
        let income = this.incomeSegment.split(":")[1];
        if (income == "All") {
          income = "All Incomes";
        }
        let market = marketNameWithCaveat(marketKey, this.dataOptions);
        let row = [market, years, age, income];
        // console.log("row");
        // console.log(row);
        labels.push(row);
        // let urban = this.chartData[marketKey]["Urban"];

        // let suburban = this.chartData[marketKey]["SubUrban"];
        // let exurban = this.chartData[marketKey]["ExUrban"];
        // this.chartData[marketKey]["Urban"] = urban;
        // this.chartData[marketKey]["SubUrban"] = suburban;
        // this.chartData[marketKey]["ExUrban"] = exurban;
      }
      // console.log("labels");
      // console.log(labels);
      let returnData = {
        labels: labels,
        // labels: [
        //   ["Total", "Population"],
        //   ["Income: $0-50K", "Age: 18-44"],
        //   ["Income: $0-50K", "Age: 45-64"],
        //   ["Income: $0-50K", "Age: 65+"],
        //   ["Income: $50-100K", "Age: 18-44"],
        //   ["Income: $50-100K", "Age: 45-64"],
        //   ["Income: $50-100K", "Age: 65+"],
        //   ["Income: $100K+", "Age: 18-44"],
        //   ["Income: $100K+", "Age: 45-64"],
        //   ["Income: $100K+", "Age: 65+"],
        // ],
        // labels: ["all"] ["All Segments", "Income: $0-50K Age: 18-44", "Income: $0-50K Age: 45-64", "Income: $0-50K Age: 65+",
        // "Income: $50-100K Age: 18-44", "Income: $50-100K Age: 45-64", "Income: $50-100K Age: 65+",
        // "Income: $100K+ Age: 18-44", "Income: $100K+ Age: 45-64", "Income: $100K+ Age: 65+",
        // ],
        datasets: [
          {
            label: "2018 - Urban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 0",
            data: zeros,
          },

          {
            label: "2018 - Urban - All Segments",
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
            label: "2018 - Suburban - All Segments",
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
            label: "2018 - Exurban - All Segments",
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
            label: "2020 - Urban - All Segments",
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
            label: "2020 - Suburban - All Segments",
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
            label: "2020 - Exurban - All Segments",
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
            label: "2018 - Urban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 3",
            data: zeros,
          },
        ],
      };
      // console.log("returnData");
      // console.log(returnData);
      return returnData;
    },
    // computedTitle() {
    //   // if (this.showMarket) {
    //   //   return `${this.market} - ${this.title}`;
    //   // } else {
    //   //   return this.title;
    //   // }
    //   return this.title;
    // },
    csvRows() {
      // console.log(this.computedChartData);
      let header_row = [];
      let marketKeys = Object.keys(this.chartData);
      for (let i = 0; i < marketKeys.length; i++) {
        header_row.push(
          `"${marketNameWithCaveat(marketKeys[i], this.dataOptions)}"`
        );
      }
      header_row.unshift("Geography");
      header_row.unshift("Year");
      let rows = [];
      rows.push(header_row);
      let years = [this.startYear, this.endYear];
      let geos = ["Urban", "Suburban", "Exurban"];
      years.forEach((year) => {
        geos.forEach((geo) => {
          let row = [];
          row.push(year);
          row.push(geo);
          let marketKeys = Object.keys(this.chartData);
          for (let i = 0; i < marketKeys.length; i++) {
            row.push(
              this.chartData[marketKeys[i]][year.toString()][geo.toLowerCase()]
            );
          }
          rows.push(row);
        });
      });
      return rows;
    },
    csvString() {
      let csvString = this.csvRows.map((row) => row.join(",")).join("\n");
      return csvString;
    },
    filenamePartial() {
      return `Age-${this.ageSegment.split(":")[1]}-Income-${
        this.incomeSegment.split(":")[1]
      }-${this.startYear}-${
        this.endYear
      }-${this.slug.toLowerCase()}_chart_data`;
    },
  },
  methods: {
    showTosModalCsvComp() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadDataCsvComp";
      this.$bvModal.show("modal-tos-comp");
    },
    showTosModalImageComp() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadImageComp";
      this.$bvModal.show("modal-tos-comp");
    },
    acceptTermsComp() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos-comp");
      // console.log('accept')
      this.tosAccepted = true;
      // console.log(this.downloadRequestFunction);
      if (this.downloadRequestFunction == "downloadDataCsvComp") {
        this.downloadDataCsvComp();
      } else if (this.downloadRequestFunction == "downloadImageComp") {
        this.downloadImageComp();
      }
      this.trackTOSAcceptanceInGoogleAnalytics();
    },
    rejectTermsComp() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos-comp");
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
    downloadDataCsvComp() {
      // console.log("slug");
      let csvString = this.csvString;
      let blob = new Blob([csvString], { type: "text/csv" });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Bain-${this.filenamePartial}.csv`);
      // console.log(this.filenamePartial);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async downloadImageComp() {
      this.showMarket = true;
      this.showLogo = true;
      // await sleep(100);
      // const logo = document.createElement("img");  ,{useCORS: true,allowTaint: true}
      // logo.id = "fullChartLogo";
      // logo.src = this.pngLogo;
      // logo.height = 40;
      // logo.width = 40;
      html2canvas(document.querySelector("#ComparisonChartId canvas"), {
        useCORS: true,
        allowTaint: true,
      }).then(
        (chartCanvas) => {
          html2canvas(document.querySelector("#compChartTitle"), {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
          }).then((mapTitle) => {
            html2canvas(document.querySelector("#compChartLogo"), {
              useCORS: true,
              allowTaint: true,
              backgroundColor: null,
            }).then((logo) => {
              html2canvas(document.querySelector("#chartLegend2"), {
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
              }).then((legend) => {
                const mergeCanvas = document.createElement("canvas");
                const mergeCtx = mergeCanvas.getContext("2d");
                mergeCanvas.height =
                  chartCanvas.height + 200 * this.devicePixelRatio;
                mergeCanvas.width = chartCanvas.width;
                mergeCtx.fillStyle = "white";
                mergeCtx.fillRect(0, 0, mergeCanvas.width, mergeCanvas.height);
                mergeCtx.drawImage(chartCanvas, 0, 85 * this.devicePixelRatio);
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
                let legendHeight =
                  document.querySelector("#chartLegend2").offsetHeight *
                  this.devicePixelRatio;
                let legendWidth =
                  document.querySelector("#chartLegend2").offsetWidth *
                  this.devicePixelRatio;
                // let mergedLegendWidth =
                //   mergeCanvas.width * 0.28 * (2 / this.devicePixelRatio);
                let mergedLegendWidth = legendWidth;
                let mergedLegendHeight =
                  mergedLegendWidth * (legendHeight / legendWidth);
                // let legendBottom = 80 * (1.5 / this.devicePixelRatio);
                let legendBottom = 100 * this.devicePixelRatio;
                mergeCtx.drawImage(
                  legend,
                  (mergeCanvas.width - mergedLegendWidth) / 2 +
                    22 * this.devicePixelRatio,
                  mergeCanvas.height - legendBottom,
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