<template>
  <div :id="`${this.idTitle}Chart`">
    <div class="containing">
      <div
        :id="`downloadimg-button-${this.slug}-chart`"
        class="icon icon-downloadimg icon-sm icon-downloadimg-abs"
        :class="{ active: false }"
        @click="downloadImage"
      >
        <b-tooltip :target="`downloadimg-button-${this.slug}-chart`"
          >Download chart image</b-tooltip
        >
      </div>
      <div
        :id="`downloaddoc-button-${this.slug}-chart`"
        class="icon icon-downloaddoc icon-sm icon-downloaddoc-abs"
        :class="{ active: false }"
        @click="downloadCsv"
      >
        <b-tooltip :target="`downloaddoc-button-${this.slug}-chart`"
          >Download CSV</b-tooltip
        >
      </div>
      <div class="containing_inner">
        <Bar :chartData="computedChartData" :options="options" class="chart" />
      </div>
    </div>
  </div>
</template>

<script >
import html2canvas from "html2canvas";
// import { defineComponent } from 'vue';
import { defineComponent } from "@vue/composition-api";
// import { getCurrentInstance } from "vue"; // 2.7  getCurrentInstance().proxy.$refs;

import { Bar } from "vue-chartjs/legacy";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "BaseChart",
  components: {
    Bar,
  },
  setup() {
    // const chartRef = ref();
    // onMounted(() => {
    //   console.log(chartRef);
    //   // chartRef.value.chartInstance.toBase64Image();
    // });
  },

  props: ["xAxisLabels", "chartData", "market", "chartTitle", "chartSlug"],
  //   data() {
  //     return() {
  //         labels: this.xAxisLabels
  //     };
  //   },
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      title: this.chartTitle,
      slug: this.chartSlug,
      xLabels: this.xAxisLabels,
      currentChartData: this.chartData,
      showMarket: false,
    };
  },
  created() {},
  computed: {
    idTitle() {
      return this.title.replaceAll(" ", "_").replaceAll("+", "and");
    },
    options() {
      return {
        layout: {
          padding: 10,
        },
        animation: true,
        plugins: {
          legend: {
            display: false,
            // html legend https://www.chartjs.org/docs/3.6.0/samples/legend/html.html
          },
          title: {
            display: true,
            align: "start",
            text: this.computedTitle,
            fullsize: true,
            font: {
              size: 18,
              fontFamily: "Graphik",
              color: "#000",
              weight: "normal",
            },
          },
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
      let years = Object.keys(this.chartData.data);

      let urban1 = Object.values(this.chartData.data[years[0]]["Urban"]);
      urban1.unshift(urban1.pop());
      let suburban1 = Object.values(this.chartData.data[years[0]]["SubUrban"]);
      suburban1.unshift(suburban1.pop());
      let exurban1 = Object.values(this.chartData.data[years[0]]["ExUrban"]);
      exurban1.unshift(exurban1.pop());
      let urban2 = Object.values(this.chartData.data[years[1]]["Urban"]);
      urban2.unshift(urban2.pop());
      let suburban2 = Object.values(this.chartData.data[years[1]]["SubUrban"]);
      suburban2.unshift(suburban2.pop());
      let exurban2 = Object.values(this.chartData.data[years[1]]["ExUrban"]);
      exurban2.unshift(exurban2.pop());
      // console.log(exurban2);
      let returnData = {
        labels: [["Income: $0-50K"], ["Income: $50-100K"], ["Income: $100K+"]],

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
            data: [0, 0, 0],
          },

          {
            label: "2018 - Urban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.10, 0.20, 0.30, 0.10, 0.20, 0.30, 0.10, 0.20, 0.30, 0.10],
            // NOTE: unshift and pop deals is the fastest way to deal with wanting all, 1,2,3 ... segment order
            data: [urban1[2], urban1[4], urban1[8]],
          },
          {
            label: "2018 - Suburban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#990001",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
            data: [suburban1[2], suburban1[4], suburban1[8]],
          },
          {
            label: "2018 - Exurban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#CC0000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 1",
            // data: [0.80, 0.70, 0.60, 0.80, 0.70, 0.60, 0.80, 0.70, 0.60, 0.80],
            data: [exurban1[2], exurban1[4], exurban1[8]],
          },

          {
            label: "2020 - Urban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#660000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.20, 0.30, 0.40, 0.20, 0.30, 0.40, 0.20, 0.30, 0.40, 0.20],
            data: [urban2[2], urban2[4], urban2[8]],
          },
          {
            label: "2020 - Suburban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#990001",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10],
            data: [suburban2[2], suburban2[4], suburban2[8]],
          },
          {
            label: "2020 - Exurban - All Segments",
            xAxisID: "xAxis1",
            backgroundColor: "#CC0000",
            borderColor: "#000000",
            borderWidth: "1",
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            stack: "Stack 2",
            // data: [0.70, 0.60, 0.50, 0.70, 0.60, 0.50, 0.70, 0.60, 0.50, 0.70],
            data: [exurban2[2], exurban2[4], exurban2[8]],
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
        return `${this.market} - ${this.title}`;
      } else {
        return this.title;
      }
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
    downloadCsv() {
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
    downloadImage() {
      // html2canvas();
      html2canvas(document.querySelector(`#${this.idTitle}Chart canvas`)).then(
        (chartCanvas) => {
          var img = chartCanvas.toDataURL("image/png");
          // event.target.href = img
          var link = document.createElement("a");
          // var url = URL.createObjectURL(blob);
          var url = img;
          link.setAttribute("href", url);
          link.setAttribute("download", `Bain-${this.filenamePartial}.png`);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      );
    },
  },
});
</script>