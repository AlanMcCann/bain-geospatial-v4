<template>
  <div
    class="container-fluid bain-geospatial"
    :class="{ isFullScreen: fullscreen }"
    style="background: white"
  >
    <div id="main" class="main_padd">
      <h1
        class="bain_headline"
        style="
          border-left: 4px solid #c00;
          height: auto;
          padding-left: 25px;
          margin-top: 37px;
          margin-bottom: 30px;
          font-family: 'graphik-semibold';
          font-size: 32px;
          font-weight: 600;
          line-height: 1.38;
          text-align: left;
          color: #000;
        "
      >
        US Geospatial Toolkit (Beta)
      </h1>
      <b-tabs content-class="mt-3" fill @input="onTabChange">
        <b-tab title="Market Summary" active>
          <b-row class="mb-4" style="margin-bottom: 1.5rem !important">
            <b-col cols="6">
              <b-form-group
                id="fieldset_horizontal_market"
                label-cols-sm="2"
                label-cols-lg="2"
                content-cols-sm
                content-cols-lg="6"
                label="Market"
                label-for="input_horizontal_market"
              >
                <b-form-select
                  v-model="selectedMarket"
                  :options="computedMarketOptionsWithoutStates"
                  id="input_horizontal_market"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-row class="mb-5 mt-2">
                <!-- <b-col cols=""></b-col> -->
                <b-col cols>
                  <b-button
                    variant="danger"
                    size="sm"
                    style="
                      margin-left: 25%;
                      margin-right: 25%;
                      min-width: 120px;
                      font-size: 10px;
                      background-color: #660000;
                      border-color: #660000;
                    "
                  >
                    Urban (0 to 10mi)</b-button
                  >
                </b-col>
                <b-col cols>
                  <b-button
                    variant="danger center"
                    size="sm"
                    style="
                      margin-left: 25%;
                      margin-right: 25%;
                      min-width: 120px;
                      font-size: 10px;
                      background-color: #9a0102;
                      border-color: #9a0102;
                    "
                  >
                    Suburban (10 to 25mi)</b-button
                  >
                </b-col>
                <b-col cols>
                  <b-button
                    variant="danger"
                    size="sm"
                    style="
                      margin-left: 25%;
                      margin-right: 25%;
                      min-width: 120px;
                      font-size: 10px;
                      background-color: #cc0102;
                      border-color: #cc0102;
                    "
                  >
                    ExUrban (25 to 40mi)</b-button
                  >
                </b-col>
                <b-col> </b-col>
                <!-- <b-col cols="2"></b-col> -->
              </b-row>
              <!-- <b-button-toolbar class="mb-2 float-right"> -->
              <!-- <b-button-group class="mr-1"> -->
              <!-- downloaDataCsv   downloadImage-->

              <!-- <b-button title="Download Image" variant="outline-danger" v-on:click="downloadImage"> -->
              <!-- <b-icon icon="cloud-download" aria-hidden="true"></b-icon> <i class="fas fa-image"></i> Image -->
              <!-- </b-button> -->

              <!-- </b-button-group> -->
              <!-- </b-button-toolbar> -->
              <!-- </b-col> -->
            </b-col>
          </b-row>
          <Chart
            :x-axis-labels="marketSummaryChartsDataYearLabels"
            :chart-data="currentMarketChartData"
          />

          <!-- <Chart /> -->
        </b-tab>
        <b-tab title="Multi-Market Comparison"> </b-tab>
        <b-tab title="Inter-Market Movement"> </b-tab>
        <b-tab title="Intra-Market Mapping">
          <button type="button" @click="toggleFullScreen">Fullscreen</button>

          <fullscreen v-model="fullscreen" teleport>
            <!-- {{currentMarketChartData}} -->
            <!-- {{computedMarketOptions.length}} -->
            <!-- {{[computedMarketOptionsWithoutStates[0]]}} -->
            <!-- {{ process.env.VUE_APP_ASSET_URL}}
          {{ process.env.ASSET_URL}}
          {{ process.env.NODE_ENV}} -->
            <b-modal
              id="modal-settings"
              size="xl"
              centered
              scrollable
              title="Settings"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-group
                    id="fieldset_horizontal_geounits"
                    label-cols-sm="4"
                    label-cols-lg="4"
                    content-cols-sm
                    content-cols-lg="8"
                    label-for="input_horizontal_geounits"
                  >
                    <template slot="label">
                      Geo Units
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-geography-units"
                      ></i>
                      <b-tooltip target="help-geography-units"
                        >Select geo units for map segmentation.</b-tooltip
                      >
                    </template>
                    <b-form-radio-group
                      v-model="selectedGeoUnits"
                      :options="geoUnitOptions"
                      name="radios-stacked"
                      stacked
                    >
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group
                    id="fieldset_horizontal_opacity"
                    label-cols-sm="4"
                    label-cols-lg="4"
                    content-cols-sm
                    content-cols-lg="8"
                    label-for="input_horizontal_opacity"
                  >
                    <template slot="label">
                      Opacity
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-opacity"
                      ></i>
                      <b-tooltip target="help-opacity"
                        >Select opacity for geographic units.
                      </b-tooltip>
                    </template>
                    <b-form-input
                      id="range-1"
                      v-model="opacity"
                      :state="false"
                      size="sm"
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group
                    id="fieldset_horizontal_geolabels"
                    label-cols-sm="6"
                    label-cols-lg="6"
                    content-cols-sm
                    content-cols-lg="6"
                    label-for="input_horizontal_geolabels"
                  >
                    <template slot="label">
                      Geo Labels
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-geolabel"
                      ></i>
                      <b-tooltip target="help-geolabel"
                        >Turn geo unit labels on or off.
                      </b-tooltip>
                    </template>
                    <b-form-checkbox
                      id="geolabels-checkbox-1"
                      v-model="geoLabelVisibility"
                      name="checkbox-1"
                      value="On"
                      unchecked-value="Off"
                      size="md"
                      switch
                      :state="false"
                      class="mt-2"
                    >
                      {{ geoLabelVisibility }}
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group
                    id="fieldset_horizontal_countselector"
                    label-cols-sm="6"
                    label-cols-lg="6"
                    content-cols-sm
                    content-cols-lg="6"
                    label="Multiple Geo Unit Selector Mode"
                    label-for="input_horizontal_countselector"
                  >
                    <template slot="label">
                      Multiple Geo Unit Selector Mode
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-count-selector"
                      ></i>
                      <b-tooltip target="help-count-selector"
                        >Turn Multiple Geo Unit Selector Mode on to select and
                        display segment data for one or more geographic units.
                        Hold the Shift key and then click and drag your cursor
                        to select and display data for multiple units, or simply
                        click a single unit to display data for that
                        unit.</b-tooltip
                      >
                    </template>
                    <b-form-checkbox
                      id="countselector-checkbox-1"
                      v-model="countselector"
                      name="checkbox-1"
                      value="On"
                      unchecked-value="Off"
                      size="md"
                      switch
                      :state="false"
                      class="mt-2"
                    >
                      {{ countselector }}
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>
              </b-row>
              <template #modal-footer>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button variant="danger" @click="hideSettingsModal">
                  OK
                </b-button>
              </template>
            </b-modal>
            <b-modal
              id="modal-tos"
              size="xl"
              centered
              scrollable
              title="Terms of Service"
            >
              <p>
                IMPORTANT: THIS IS A LEGAL AGREEMENT BETWEEN YOU, YOUR COMPANY
                AND BAIN & COMPANY, INC. (“BAIN”).
              </p>

              <p>
                BY CLICKING THE “I ACCEPT” BUTTON BELOW YOU CONFIRM AND AGREE
                FOR THE BENEFIT OF BAIN, THAT (1) YOU ARE AUTHORIZED TO ENTER
                INTO, AND ARE ENTERING INTO, THIS LICENSE AGREEMENT FOR AND ON
                BEHALF OF YOUR COMPANY; AND (2) YOU HAVE READ, UNDERSTAND AND
                AGREE THAT YOU AND YOUR COMPANY SHALL BE BOUND BY THE TERMS AND
                CONDITIONS BELOW. IF YOU DO NOT AGREE WITH THESE TERMS AND
                CONDITIONS, CLICK ON THE “I DO NOT ACCEPT” BUTTON BELOW.
              </p>

              <p>
                License Restrictions: The Bain Macro Trends geospatial
                population data (the “Data”) is licensed to Bain and subject to
                certain usage restrictions. By clicking below and accessing the
                data, you agree to the following terms. You will not, and will
                prevent any activity that would: A) duplicate, disseminate,
                translate or reproduce the Data or any portion thereof; B)
                resell, lease, assign, transfer, or sublicense the Data or any
                portion thereof; or C) translate, modify, decode, disassemble or
                reverse engineer the Data or any portion thereof. You shall only
                use the data for your internal purposes. You hereby release and
                hold harmless Bain from any claims and liabilities related to
                your use of the data.
              </p>

              <template #modal-footer>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button variant="danger" @click="acceptTerms">
                  I Accept
                </b-button>
                <b-button variant="danger" @click="rejectTerms">
                  I Do Not Accept
                </b-button>
              </template>
            </b-modal>
            <b-modal
              id="modal-drop-location"
              size="xl"
              centered
              scrollable
              title="Add custom location points to map"
            >
              <div class="table-container" style="width: 100%">
                <b-row class="m-2 d-flex justify-content-end">
                  <p
                    class="help-link text-right"
                    style="font-size: 15px; font-family: graphik-medium"
                  >
                    First time using this tool? Watch
                    <a
                      href="#"
                      @click="showVideoTutorialModal"
                      class="text-danger"
                      >this</a
                    >
                    first.
                  </p>
                </b-row>
                <b-row class="mb-2 mx-2 d-flex justify-content-between">
                  {{ this.filename }}
                  <input
                    label="Choose file to upload"
                    type="file"
                    accept=".csv"
                    class="text-justify"
                    @change="handleFileUpload($event)"
                  />

                  <b-button variant="success" @click="downloadTemplateCSV()"
                    >Download file template</b-button
                  >
                  <b-button variant="success" @click="handleAdd()"
                    >Add row</b-button
                  >
                </b-row>
                <b-editable-table
                  bordered
                  class="datapoints-table editable-table table table-striped table-hover"
                  v-model="pointData"
                  :fields="fields"
                >
                  <template #cell(delete)="data">
                    <BIconX
                      class="remove-icon"
                      @click="handleDelete(data)"
                    ></BIconX>
                  </template>
                </b-editable-table>
              </div>
              <template #modal-footer="{ ok }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button variant="danger" @click="ok()"> OK </b-button>
              </template>
            </b-modal>
            <b-modal
              id="modal-video-tutorial"
              size="xl"
              centered
              title="Video Tutoral"
              hide-header
              hide-footer
            >
              <b-embed
                type="iframe"
                aspect="16by9"
                src="https://www.youtube.com/embed/Iufbrwwh6Hk"
                allowfullscreen
              >
              </b-embed>
            </b-modal>
            <div class="map-menu" :class="{ isFullScreen: fullscreen }">
              <b-row class="mb-4" style="margin-bottom: 1.5rem !important">
                <b-col cols="6">
                  <b-form-group
                    label="Market type"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-radio-group
                      id="marketTypeRadio"
                      v-model="selectedMarketType"
                      :options="selectedMarketOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radio-options"
                    >
                    </b-form-radio-group>
                    {{ selectedMarketType }}
                  </b-form-group>
                  <b-form-group
                    label="Head of household age"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-radio-group
                      id="btn-radios-age-segment"
                      v-model="selectedAgeSegment"
                      :options="selectedAgeSegmentOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons
                      button-variant="outline-danger"
                      size="sm"
                    >
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group
                    label="Head of household income"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-radio-group
                      id="btn-radios-income-segment"
                      v-model="selectedIncomeSegment"
                      :options="selectedIncomeSegmentOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons
                      button-variant="outline-danger"
                      size="sm"
                    ></b-form-radio-group>
                  </b-form-group>
                  <b-form-group label="Data type" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      id="btn-radios-data-type"
                      v-model="selectedDataType"
                      :options="selectedDataTypeOptions"
                      :aria-describedby="ariaDescribedby"
                      name="radios-btn-default"
                      buttons
                      button-variant="outline-danger"
                      size="sm"
                    >
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group
                    id="fieldset_horizontal_market"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="12"
                    label="Market"
                    label-for="input_horizontal_market"
                  >
                    <b-form-select
                      v-model="selectedMarket"
                      :options="computedMarketOptions"
                      size="sm"
                      id="input_horizontal_market"
                    >
                    </b-form-select>
                  </b-form-group>
                  <b-form-group
                    id="fieldset_horizontal_data_series"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="12"
                    label="Data series"
                    label-for="input_horizontal_data_series"
                  >
                    <b-form-select
                      v-model="selectedDataSeries"
                      :options="selectedDataSeriesOptions"
                      size="sm"
                      id="input_horizontal_data_series"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols=" 6">
                  <b-form-group
                    id="fieldset_horizontal_chart"
                    label-cols-sm="2"
                    label-cols-lg="1"
                    content-cols-sm="12"
                    content-cols-lg="12"
                    label="Segment"
                    label-for="input_horizontal_segment"
                  >
                    <div>
                      <!-- <label class="typo__label">Groups</label> -->
                      <multiselect
                        v-model="selectedSegmentOptions"
                        :allow-empty="false"
                        :options="computedSegmentOptions"
                        group-values="options"
                        group-label="label"
                        :group-select="false"
                        placeholder="Type to search"
                        track-by="value"
                        label="text"
                        ><span slot="noResult"
                          >Oops! No elements found. Consider changing the search
                          query.</span
                        ></multiselect
                      >
                      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
                    </div>
                    <!-- <b-form-select v-model="selectedSegment" :options="computedSegmentOptions" id='input_horizontal_segment'></b-form-select> -->
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-button-toolbar class="mb-2">
                    <b-button-group class="mr-1">
                      <!-- downloaDataCsv   downloadImage-->
                      <b-button
                        title="Settings"
                        variant="outline-danger"
                        v-on:click="showTosModalSettings"
                      >
                        <b-icon icon="gear" aria-hidden="true"> </b-icon>
                        Settings
                      </b-button>
                      <b-button
                        title="Download data"
                        variant="outline-danger"
                        v-on:click="showTosModalCsv"
                      >
                        <b-icon icon="cloud-download" aria-hidden="true">
                        </b-icon>
                        Data
                      </b-button>
                      <b-button
                        title="Download Image"
                        variant="outline-danger"
                        v-on:click="downloadImage"
                      >
                        <b-icon
                          icon="cloud-download"
                          aria-hidden="true"
                        ></b-icon>
                        <i class="fas fa-image"></i> Image
                      </b-button>
                      <b-button
                        v-b-modal.modal-drop-location
                        variant="outline-danger"
                      >
                        <i class="fas fa-map-marker-alt"></i>
                        Add custom location points to map
                      </b-button>
                    </b-button-group>
                  </b-button-toolbar>
                </b-col>
                <b-col cols="6">
                  <p
                    class="help-link text-right"
                    style="font-size: 15px; font-family: graphik-medium"
                  >
                    First time using this tool? Watch
                    <a
                      href="#"
                      @click="showVideoTutorialModal"
                      class="text-danger"
                      >this</a
                    >
                    first.
                  </p>
                </b-col>
              </b-row>
            </div>
            <div class="map">
              <b-row>
                <b-col cols="12">
                  <section
                    class="map_box_container"
                    :class="{ isFullScreen: fullscreen }"
                  >
                    <div id="overlay" v-show="loading">
                      <div
                        class="w-100 d-flex justify-content-center align-items-center"
                      >
                        <div class="spinner"></div>
                        <div class="spinner-text">Loading Market Data</div>
                      </div>
                    </div>

                    <div id="mapContainer" :class="fullscreen"></div>

                    <div id="legend" class="legend legend-bottom">
                      <!-- <div class="legend-header">
                    <h5>Legend</h5>
  
                  </div> -->
                      <div class="legend-body">
                        <div
                          class="aside aside-1"
                          :style="{ backgroundImage: createBackgroundString }"
                        ></div>
                        <div class="main">
                          <div>{{ this.currentSegmentMaxValue }}</div>
                          <!-- <div>100</div> -->
                          <div>{{ this.currentSegmentMinValue }}</div>
                        </div>
                      </div>
                    </div>

                    <div id="mapTitle" v-if="showMapTitle" class="mapTitle">
                      <h5>{{ this.selectedSegment.UniqueSeriesString }}</h5>
                    </div>
                  </section>
                </b-col>
              </b-row>
            </div>

            <b-row style="min-height: 60px"> </b-row>
          </fullscreen>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import VueFullscreen from "vue-fullscreen";
import mapboxgl from "mapbox-gl";
import marketSettingsData from "../public/geospatial_settings.json";
import marketSummaryChartsData from "../public/market_summary_charts.json";
import Papa from "papaparse";
import Multiselect from "vue-multiselect";
import BEditableTable from "bootstrap-vue-editable-table";
import { BIconX } from "bootstrap-vue";
import html2canvas from "html2canvas";
import { validLatitude, validLongitude } from "./helpers/geo_calculations";
import Chart from "./components/Chart";
import Vue from "vue";
Vue.use(VueFullscreen);
export default {
  name: "BaseMap",
  components: { BIconX, BEditableTable, Multiselect, Chart }, //VSwatches
  data() {
    return {
      selectedAgeSegment: "All",
      selectedAgeSegmentOptions: [
        { text: "All", value: "All" },
        { text: "18-44", value: "18-44" },
        { text: "45-64", value: "45-64" },
        { text: "65+", value: "65+" },
      ],
      selectedIncomeSegment: "All",
      selectedIncomeSegmentOptions: [
        { text: "All", value: "All" },
        { text: "$0-50K", value: "Lower" },
        { text: "$50-99K", value: "Middle" },
        { text: "$100K+", value: "Upper" },
      ],
      selectedDataType: "HH_Count",
      selectedDataTypeOptions: [
        { text: "Count", value: "HH_Count" },
        { text: "Percent", value: "Percent" },
        { text: "Count Change", value: "Count Change" },
        { text: "Percent Change", value: "Percent Change" },
      ],
      selectedDataSeries: "2021",
      selectedDataSeriesOptions: [{ text: "2021", value: "2021" }],
      selectedMarketType: "dma",
      selectedMarketOptions: [
        { text: "Metro Area", value: "dma" },
        { text: "State", value: "state" },
      ],
      fullscreen: false,
      marketSummaryChartsData: marketSummaryChartsData,
      // base_asset_url: "/globalassets/mtg/geospatialtool/v1",
      base_asset_url: "",
      f: "downloaDataCsv",
      selectvalue: null,
      popup: null,
      disablePopups: false,
      // color: '#A463BF', for color picker
      selectedSegmentOptions: {},
      tosAccepted: false,
      loading: false,
      // fields: [
      //   { key: "Number", label: "Number", type: "number", editable: true, placeholder: "Enter Number.", class: "number-col"},
      //   { key: "Title", label: "Title", type: "text", editable: true, class: "title-col"},
      //   { key: "Longitude", label: "Longitude", type: "number", editable: true, placeholder: "Enter Longitude", class: "long-col"},
      //   { key: "Latitude", label: "Latitude", type: "number", editable: true, placeholder: "Enter Latitude", class: "long-col"},
      //   { key: "isActive", label: "Is Active", type: "checkbox", editable: true, class: "is-active-col" },
      //   { key: "delete", label: "" }
      // ],
      bainRedColor: "#cc0000",
      baindLighterRedColor: "#e58080",
      fields: [
        // { key: "name", label: "Name", type: "text", editable: true, placeholder: "Enter Name...", class: "name-col"},
        // { key: "department", label: "Department", type: "select", editable: true, class: "department-col" , options: [
        //   { value: 1, text: 'HR' },
        //   { value: 2, text: 'Engineer' },
        //   { value: 3, text: 'VP' },
        //   { value: 4, text: 'CEO'}
        // ]},
        // { key: "age", label: "Age", type:"range", min:"0", max:"100", editable: true, placeholder: "Enter Age...", class: "age-col" },
        // { key: "dateOfBirth", label: "Date Of Birth", type: "date", editable: true, class: "date-col", locale: "en",
        //   "date-format-options": {
        //     year: "numeric",
        //     month: "numeric",
        //     day: "numeric",
        //   }, },
        // { key: "isActive", label: "Is Active", type: "checkbox", editable: true, class: "is-active-col" },
        {
          key: "Number",
          label: "Number",
          type: "number",
          editable: true,
          placeholder: "Enter number...",
          class: "number-col",
        },
        {
          key: "Title",
          label: "Title",
          type: "text",
          editable: true,
          placeholder: "Enter Title...",
          class: "title-col",
        },
        {
          key: "Longitude",
          label: "Longitude",
          type: "number",
          editable: true,
          placeholder: "Enter Longitude...",
          class: "longitude-col",
        },
        {
          key: "Latitude",
          label: "Latitude",
          type: "number",
          editable: true,
          placeholder: "Enter Latitude...",
          class: "longitude-col",
        },
        { key: "delete", label: "Delete", class: "delete-col" },
      ],
      value: null,
      options: ["list", "of", "options"],

      file: "",
      filename: "",
      content: [],
      parsed: false,
      accessToken:
        "pk.eyJ1Ijoic3RvYmllYiIsImEiOiJja3c1dXlsaGk1bWlhMzJtb3hocjRocmJlIn0.Mlt1qagPsq8sTZowESi47A",
      selectedMarket: "DallasFortWorth", //Object.keys(marketSettingsData)[0],
      marketSettingsData: marketSettingsData,
      // selectedMarket: marketSettingsData[this.initialSelectedMarketKey],
      geoLabelVisibility: "Off",
      countselector: "Off",
      // pointData: [],
      pointData: [
        {
          Latitude: 32.796974,
          Longitude: -96.971751,
          Title: "New Data Point",
          Number: 1,
        },
        { Latitude: 32.81157, Longitude: -96.77091, Title: "CVS 1", Number: 2 },
        { Latitude: 32.99704, Longitude: -96.82788, Title: "CVS 2", Number: 3 },
        {
          Latitude: 32.64959,
          Longitude: -96.862679,
          Title: "CVS 3",
          Number: 4,
        },
        { Latitude: 32.67157, Longitude: -97.37605, Title: "CVS 4", Number: 5 },
        { Latitude: 32.81283, Longitude: -97.43261, Title: "CVS 5", Number: 6 },
      ],
      allPointData: {},
      markers: [],
      csv: [],
      selectedGeoUnits: "bg",
      geoUnitOptions: [
        { text: "Census Block Groups", value: "bg" },
        { text: "Zip Codes", value: "zip" },
      ],
      mapSettingsData: {},
      segmentSettings: {}, //Object.values(settingsData)[0],
      previousSegmentSettings: {}, //Object.values(settingsData)[0],
      selectedSegment: {}, //Object.keys(settingsData)[0],
      previousSelectedSegment: {}, //Object.keys(settingsData)[0],
      importedSettingsData: {}, //settingsData,
      // mapFips: mapSettingsData["StateFips"],
      mapSourceData: {},
      mapLabelSourceData: {},
      map: null,
      showMapTitle: false,
      navigationControl: null,
      fullScreenControl: null,
      scaleControl: null,
      opacity: 60,
      loadedJson: {},
      sourcesLoaded: false,
      svgLogo: require("./assets/bain-attribution-small.svg"),
      markerGeoJSON: {
        type: "FeatureCollection",
        features: [],
      },
      testGeoJSON: {
        type: "FeatureCollection",
        features: [],
      },
      pointGeoJSON: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-96.975, 32.75],
            },
            properties: {
              number: 5,
              title: "Alan",
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-96.9, 32.4],
            },
            properties: {
              number: 8,
              title: "Dallas-Fort Worth",
            },
          },

          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-77.03238901390978, 38.913188059745586],
            },
            properties: {
              title: "Mapbox DC",
              number: 42,
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.414, 37.776],
            },
            properties: {
              title: "Mapbox SF",
              number: 99,
            },
          },
        ],
      },
      // {
      //   'type': 'geojson',
      //   'data':{
      //       'type': 'FeatureCollection',
      //       'features': [
      //         {
      //           'type': 'Feature',
      //           'geometry': {
      //             'type': 'Point',
      //             'coordinates': [-96.971751, 32.796974]
      //           },
      //           'properties': {
      //             'title': 'Mapbox Dallas'
      //           }
      //         }
      //     ]}
      // }
    };
  },
  computed: {
    marketSummaryChartsDataYearLabels: function () {
      let years = Object.keys(
        this.marketSummaryChartsData[this.selectedMarket].data
      );
      let count = Object.keys(
        this.marketSummaryChartsData[this.selectedMarket].data[years[0]][
          "ExUrban"
        ]
      ).length;
      let labels = [];
      for (let i = 0; i < count; i++) {
        labels = labels.concat(["", years[0], years[1], ""]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    currentMarketChartData: function () {
      return this.marketSummaryChartsData[this.selectedMarket];
    },
    currentSegmentMaxValue: function () {
      let value = this.segmentSettings.MaxValue;
      let label = this.segmentSettings.DataType;
      var valueString;
      // console.log('label');
      // console.log(label);
      // console.log(label == "Count")
      if (label == "Percent") {
        valueString =
          (value * 100).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          }) + "%";
      } else if (label == "Count") {
        valueString = (value | 0).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        });
      } else {
        valueString = (value | 0).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        });
      }
      return valueString;
    },
    currentSegmentMinValue: function () {
      let value = this.segmentSettings.MinValue;
      let label = this.segmentSettings.DataType;
      var valueString;
      //       console.log('label');
      // console.log(label);
      if (label == "Percent") {
        valueString =
          (value * 100).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          }) + "%";
      } else if (label == "Count") {
        valueString = (value | 0).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        });
      } else {
        valueString = (value | 0).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        });
      }
      return valueString;
    },

    legendStyles: function () {
      // return {
      //   "background": this.legendGradientString,
      //   opacity: this.opacity
      // }
      return this.legendGradientString;
    },
    legendGradientString: function () {
      return `linear-gradient(${this.segmentSettings["HeatMapStartColor"]}, ${this.segmentSettings["HeatMapEndColor"]});opacity: ${this.opacity}`;
    },
    createBackgroundString: function () {
      let startColor = this.segmentSettings["HeatMapStartColor"];
      let endColor = this.segmentSettings["HeatMapEndColor"];
      let temp = document.createElement("i");
      temp.style.cssText = `color: ${startColor}`;
      let rgbStr = temp.style.color;
      let startRgbArray = Array.from(
        rgbStr.matchAll(/\d+\.?\d*/g),
        (c) => +c[0]
      );
      temp.style.cssText = `color: ${endColor}`;
      rgbStr = temp.style.color;
      let endRgbArray = Array.from(rgbStr.matchAll(/\d+\.?\d*/g), (c) => +c[0]);
      return `linear-gradient(rgba(${endRgbArray.join(",")},${
        this.opacity / 100
      }),rgba(${startRgbArray.join(",")},${this.opacity / 100}))`;
    },
    computedSegmentOptions: function () {
      // let settingValues = Array.from( Object.values(this.mapSettingsData) );
      // return settingValues.map(setting => ({ value: setting.UniqueSeriesString, text: setting.UniqueSeriesString }));
      let keys = Object.keys(this.mapSettingsData);
      if (keys.length > 0) {
        let displayCategorySet = new Set();
        keys.forEach((key) => {
          let displayCategory = this.mapSettingsData[key]["DisplayCategory"];
          displayCategorySet.add(displayCategory);
        });
        let displayCategoryArray = Array.from(displayCategorySet);
        let sortedList = displayCategoryArray.sort();
        let options = [];
        sortedList.forEach((category) => {
          let categoryOptions = [];
          keys.forEach((key) => {
            let segment = this.mapSettingsData[key];
            if (segment["DisplayCategory"] == category) {
              categoryOptions.push({
                value: key,
                text: this.mapSettingsData[key].UniqueSeriesString,
              });
            }
          });
          options.push({ label: category, options: categoryOptions });
        });
        return options;
      } else {
        return [];
      }
    },
    // selectedMarket: function() {
    //   return marketSettingsData[this.initialSelectedMarketKey] //.find(element => element.MarketName ==   )
    // } ,
    computedMarketOptions: function () {
      if (this.marketSettingsData) {
        // console.log('market options')
        // console.log(this.marketSettingsData)
        // let settingValues = Array.from( Object.values(this.marketSettingsData) );
        // return settingValues.map(setting => ({ value: setting.UniqueSeriesString, text: setting.UniqueSeriesString }));
        let keys = Object.keys(this.marketSettingsData);
        if (keys.length > 0) {
          let displayCategorySet = new Set();
          keys.forEach((key) => {
            let displayCategory = this.marketSettingsData[key]["GeoTypeGroup"];
            displayCategorySet.add(displayCategory);
          });
          let displayCategoryArray = Array.from(displayCategorySet);
          let sortedList = displayCategoryArray.sort();
          let options = [];
          sortedList.forEach((category) => {
            let categoryOptions = [];
            keys.forEach((key) => {
              let market = this.marketSettingsData[key];
              if (market["GeoTypeGroup"] == category) {
                categoryOptions.push({
                  value: key,
                  text: this.marketSettingsData[key].Market_Display_Name,
                });
              }
            });
            options.push({ label: category, options: categoryOptions });
          });
          // console.log(options);
          return options;
        } else {
          return {};
        }
      } else {
        return {};
      }
    },
    computedMarketOptionsWithoutStates: function () {
      if (this.computedMarketOptions) {
        return [this.computedMarketOptions[0]];
      } else {
        return {};
      }
      // return this.computedMarketOptions
    },
    marketOptions: function () {
      let keys = Object.keys(marketSettingsData);
      let optionsArray = [];
      keys.forEach((key) => {
        optionsArray.push({
          value: key,
          text: marketSettingsData[key]["Market_Display_Name"],
        });
      });
      return optionsArray;
    },
    initialPointList: function () {
      let keys = Object.keys(marketSettingsData);
      let points = {};
      keys.forEach((key) => {
        points[key] = [];
      });
      return points;
    },
    mapCenter: function () {
      return {
        lat: this.marketSettingsData[this.selectedMarket]["CenterLat"],
        lon: this.marketSettingsData[this.selectedMarket]["CenterLong"],
      };
    },
    zoom: function () {
      return parseInt(
        this.marketSettingsData[this.selectedMarket]["DefaultZoomLevel"]
      );
    },
    geoJsonGeoProperty: function () {
      let value;
      if (this.selectedGeoUnits == "zip") {
        value = "ZCTA5CE10";
      }
      if (this.selectedGeoUnits == "bg") {
        value = "GEOID10";
      }
      return value;
    },
    currentMarketMarkerGeoJSON: function () {
      let points = this.allPointData[this.selectedMarket];
      return this.convertPointsToGeoJSON(points);
    },
    currentPoints: function () {
      if (this.allDataPoints && this.allDataPoints.length > 1) {
        return this.allDataPoints[this.selectedMarket];
      } else {
        return [];
      }
    },
  },
  methods: {
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.map.resize();
    },
    toggleFullScreenApi() {
      this.$fullscreen.toggle();
    },
    // required because of mapbox sizing issue when hidden
    onTabChange(tab) {
      if (tab == 1) {
        setTimeout(() => {
          this.map.resize();
        }, 100);
      }
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
    showVideoTutorialModal() {
      // this.$refs[].show()
      this.$bvModal.show("modal-video-tutorial");
    },
    showTosModalSettings() {
      // this.$refs[].show()
      this.$bvModal.show("modal-settings");
    },
    hideSettingsModal() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-settings");
    },
    showTosModalCsv() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloaDataCsv";
      this.$bvModal.show("modal-tos");
    },
    showTosModalImage() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadImage";
      this.$bvModal.show("modal-tos");
    },
    acceptTerms() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos");
      // console.log('accept')
      this.tosAccepted = true;
      if (this.downloadRequestFunction == "downloaDataCsv") {
        this.downloaDataCsv();
      } else if (this.downloadRequestFunction == "downloadImage") {
        this.downloadImage();
      }
      this.trackTOSAcceptanceInGoogleAnalytics();
    },
    rejectTerms() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-tos");
      // console.log('reject')
      this.tosAccepted = false;
      this.downloadRequestFunction = null;
    },
    handleAdd() {
      // this.pointData.unshift({});
      let newNumber = 1;
      if (this.pointData.length > 0) {
        newNumber =
          Math.max(...this.pointData.map((x) => parseInt(x.Number))) + 1;
      }
      this.mapCenter.lon, this.mapCenter.lat;
      let newPoint = {
        Number: newNumber,
        Title: "New Data Point",
        Longitude: this.mapCenter.lon,
        Latitude: this.mapCenter.lat,
        id: newNumber,
      };
      this.pointData.push(newPoint);
      this.allPointData[this.selectedMarket] = this.pointData;
      this.markerGeoJSON = this.convertPointsToGeoJSON(this.pointData);
    },
    handleDelete(data) {
      this.pointData.splice(data.index, 1);
      this.allPointData[this.selectedMarket] = this.pointData;
      this.markerGeoJSON = this.convertPointsToGeoJSON(this.pointData);
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.filename = this.file.name;

      event.target.value = null;
      this.parseFile();
    },
    parseFile() {
      this.pointData = [];
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.content = results;
          if (this.content.data.length > 0) {
            this.handleCSVData(this.content.data);
          }
          this.parsed = true;
        }.bind(this),
      });
    },
    handleCSVData(data) {
      // console.log(data)
      this.allPointData[this.selectedMarket] = [];
      this.pointData = [];
      let newPoints = [];
      data.forEach((point) => {
        // console.log("this.pointData");
        // console.log(this.pointData);
        // console.log(point);
        let latitude = parseFloat(point.Latitude);
        let longitude = parseFloat(point.Longitude);
        if (validLatitude(latitude) && validLongitude(longitude)) {
          let newPoint = {
            Latitude: parseFloat(point.Latitude),
            Longitude: parseFloat(point.Longitude),
            Title: point.Title,
            Number: parseInt(point.Number),
            id: parseInt(point.Number),
          };
          // console.log(newPoint)
          newPoints.push(newPoint);
          // console.log(newPoints)
        } else {
          // console.log("data error");
        }
      });
      // if (this.newPoints && this.newPoints.isArray) {
      //   // this.pointData = newPoints
      //   this.allPointData[this.selectedMarket] = newPoints
      // } else {
      //   // this.pointData = newPoints = []
      //   this.allPointData[this.selectedMarket] = []
      // }
      // console.log('updating data')
      // console.log(this.allPointData)
      // console.log(this.selectedMarket)
      // console.log(newPoints)
      let marketData = this.allPointData;
      marketData[this.selectedMarket] = newPoints;
      // console.log("newPoints");
      // console.log(newPoints);
      this.pointData = newPoints;
      this.allPointData[this.selectedMarket] = marketData;
      // this.selectedMarket
      // console.log(newPoints)
      // console.log(this.allPointData[this.selectedMarket])
      //
      // this.allPointData[this.selectedMarket] = []
      this.markerGeoJSON = this.convertPointsToGeoJSON(newPoints);
      // this.allPointData[this.selectedMarket] = newPoints
      // geojson = this.convertPointsToGeoJSON(newPoints)
    },
    convertDataPoint(dataPoint) {
      return {
        Latitude: parseFloat(dataPoint.Latitude),
        Longitude: parseFloat(dataPoint.Longitude),
        Title: dataPoint.Title,
        Number: parseInt(dataPoint.Number),
      };
    },
    showStatus() {
      // console.log('*** Status ***')
      // console.log(`selected market: ${this.selectedMarket}`)
      // console.log(`settings data:` ,this.marketSettingsData)
      // console.log(`selected segment: ${this.selectedSegment.value}`)
      // console.log(`previous selected segment: ${this.previousSelectedSegment.value}`)
      // console.log(`segmentSettings:`,this.segmentSettings)
      // console.log(`previous segmentSettings:`,this.previousSegmentSettings)
    },
    async getMapData() {
      // let suffix = "_data"
      // if (dataType == "labels") {
      //   suffix = "_labels"
      // }
      // const mapDataResponse = await fetch(`/${this.selectedMarket}${suffix}.json`)
      // const mapData = await mapDataResponse.json()
      // if (dataType == "map") {
      //   this.mapSourceData = mapData;
      // }
      // if (dataType == "labels") {
      //   this.mapLabelSourceData = mapData;
      // }
      this.allPointData = this.initialPointList;
      const mapDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
      );
      const mapData = await mapDataResponse.json();
      this.mapSourceData = mapData;
      const mapLabelsDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_labels.json`
      );
      const mapLabelsData = await mapLabelsDataResponse.json();
      this.mapLabelSourceData = mapLabelsData;
      const settingsDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_settings_data.json`
      );
      const mapSettingsData = await settingsDataResponse.json();
      this.mapSettingsData = mapSettingsData;
      this.importedSettingsData = mapSettingsData;
      this.segmentSettings = Object.values(this.mapSettingsData)[0];
      this.previousSegmentSettings = Object.values(this.mapSettingsData)[0];
      // console.log('initialization')
      // console.log(this.mapSettingsData)
      this.selectedSegment = Object.values(this.mapSettingsData)[0];
      this.previousSelectedSegment = Object.values(this.mapSettingsData)[0];

      this.selectedSegmentOptions = {
        value: this.selectedSegment.UniqueSeriesString,
        text: this.selectedSegment.UniqueSeriesString,
      };
      this.pointData = this.allPointData[this.selectedMarket];
    },
    getMapSourceData: function (dataType = "map") {
      let suffix = "_data";
      if (dataType == "labels") {
        suffix = "_labels";
      }
      fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_${suffix}.json`
      )
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (dataType == "map") {
            this.mapSourceData = data;
            this.getMappSettingsData();
          }
          if (dataType == "labels") {
            this.mapLabelSourceData = data;
          }
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
    getMapSettingsData: function () {
      fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_xsettings_data.json`
      )
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          this.mapSettingsData = data;
          this.importedSettingsData = data;
          this.segmentSettings = Object.values(this.mapSettingsData)[0];
          this.previousSegmentSettings = Object.values(this.mapSettingsData)[0];
          this.selectedSegment = Object.values(this.mapSettingsData)[0];
          this.previousSelectedSegment = Object.values(this.mapSettingsData)[0];
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    downloaDataCsv() {
      let array;

      if (this.selectedGeoUnits == "zip") {
        array = [
          ["Zip Code", this.segmentSettings.DataType],
          ...this.mapSourceData.features.map((f) => [
            f.properties[this.geoJsonGeoProperty],
            f.properties[this.selectedSegment.UniqueSeriesString],
          ]),
        ];
      }
      if (this.selectedGeoUnits == "bg") {
        array = [
          ["Block Group", this.segmentSettings.DataType],
          ...this.mapSourceData.features.map((f) => [
            f.properties[this.geoJsonGeoProperty],
            f.properties[this.selectedSegment.UniqueSeriesString],
          ]),
        ];
      }

      var str = "";
      for (var i = 0; i < array.length; i++) {
        let line = "";
        line = array[i].join(",");
        str += line + "\r\n";
      }
      var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Bain - ${this.segmentSettings.UniqueSeriesString}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadImage() {
      // TODO - figure out canvas handling
      // https://stackoverflow.com/questions/49807311/how-to-get-usable-canvas-from-mapbox-gl-js
      // https://stackoverflow.com/questions/19021237/how-to-use-html-content-inside-a-canvas-element

      // const mapCanvas = this.map.getCanvas();

      this.showMapTitle = true;

      this.map.removeControl(this.navigationControl);
      this.map.removeControl(this.fullScreenControl);

      // this.map.removeControl(this.scaleControl)
      // https://html2canvas.hertzen.com/
      html2canvas(document.querySelector("#mapContainer")).then((mapCanvas) => {
        html2canvas(document.querySelector("#legend")).then((legend) => {
          html2canvas(document.querySelector("#mapTitle"), {
            backgroundColor: null,
          }).then((mapTitle) => {
            this.showMapTitle = false;
            // this.navigationControl = new mapboxgl.NavigationControl();
            this.map.addControl(this.navigationControl);
            // this.fullScreenControl = new mapboxgl.FullscreenControl();
            this.map.addControl(this.fullScreenControl);
            // this.scaleControl = new mapboxgl.ScaleControl({
            //   maxWidth: 400,
            //   unit: 'metric'
            // });
            // this.map.addControl(this.scaleControl);
            // this.map.addControl(new mapboxgl.AttributionControl({
            //   customAttribution: 'Bain & Company'
            // }));
            const mergeCanvas = document.createElement("canvas");
            const mergeCtx = mergeCanvas.getContext("2d");
            // const logoImage = document.createElement("img");
            const logo = document.createElement("img");
            logo.id = "logo";
            logo.src = this.svgLogo;
            mergeCanvas.height = mapCanvas.height;
            mergeCanvas.width = mapCanvas.width;
            mergeCtx.drawImage(mapCanvas, 0, 0);

            // logoDiv.innerHTML = this.svgLogo
            // let {width, height} = logoDiv.getBBox();
            // var blob = new Blob([logoDiv.outerHTML],{type:'image/svg+xml;charset=utf-8'});
            // let URL = window.URL || window.webkitURL || window;
            // let blobURL = URL.createObjectURL(blob);
            // let image = new Image();
            // image.onload = () => {

            //   //  let canvas = document.createElement('canvas');

            //   //  canvas.width = width;

            //   //  canvas.height = height;
            //   //  let context = canvas.getContext('2d');
            //   //  // draw image in canvas starting left-0 , top - 0
            //   //  context.drawImage(image, 0, 0, width, height );
            //    mergeCtx.drawImage(image, 0, 0);

            //   //  downloadImage(canvas); need to implement
            // };
            // image.src = blobURL;

            let svgText =
              '<svg xmlns="http://www.w3.org/200,0/svg" height="30" width="200,"><text x="0" y="15" fill="red">I love SVG!</text></svg>';
            // logo.src = svgText
            const svgElement = document.createElement("img");
            svgElement.src = svgText;
            // get svg data
            var xml = new XMLSerializer().serializeToString(svgElement);

            // make it base64
            var svg64 = btoa(xml);
            var b64Start = "data:image/svg+xml;base64,";

            // prepend a "header"
            var image64 = b64Start + svg64;

            // set it as the source of the img element
            const textImage = document.createElement("img");
            textImage.src = image64;
            // logoImg

            // var logoImg = document.getElementById("logo");
            var logoImg = logo;
            // mergeCtx.drawImage(textImage, 100, 100);
            mergeCtx.drawImage(
              logoImg,
              mergeCanvas.width - 410,
              mergeCanvas.height - 8200,
              0
            );
            // console.log("logo");
            mergeCtx.drawImage(
              legend,
              mergeCanvas.width - legend.width - 25,
              20
            );
            mergeCtx.drawImage(mapTitle, 20, 20);

            // var img1 = new Image();
            // img1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/200,0/svg" width="110" height="60"><rect width="100" height="50" style="fill:green;" /><text x="20" y="20" style="font-size:14px;fill:white;">Hello</text></svg>');
            // img1.onload = function() {
            //   mergeCtx.drawImage(img1, 100, mergeCanvas.height - 100);
            // }
            // // img1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.logoImg);
            // mergeCtx.drawImage(img1, 300, 100);

            // let png = canvas.toDataURL();
            // const node = document.createTextNode("This is a test");
            // para.appendChild(node);
            // para.style.background = "transparent";
            // var img = this.map.getCanvas().toDataURL('image/png')
            var img = mergeCanvas.toDataURL("image/png");
            // event.target.href = img
            var link = document.createElement("a");
            // var url = URL.createObjectURL(blob);
            var url = img;
            link.setAttribute("href", url);
            link.setAttribute(
              "download",
              `Bain - ${this.segmentSettings.UniqueSeriesString}.png`
            );
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        });
      });
    },
    downloadMarketCsv() {
      let array;
      if (this.selectedGeoUnits == "zip") {
        array = [
          ["Zip Code", this.segmentSettings.DataType],
          ...this.mapSourceData.features.map((f) => [
            f.properties[this.geoJsonGeoProperty],
            f.properties[this.selectedSegment.value],
          ]),
        ];
      }
      if (this.selectedGeoUnits == "bg") {
        array = [
          ["Block Group", this.segmentSettings.DataType],
          ...this.mapSourceData.features.map((f) => [
            f.properties[this.geoJsonGeoProperty],
            f.properties[this.selectedSegment.value],
          ]),
        ];
      }

      var str = "";
      for (var i = 0; i < array.length; i++) {
        let line = "";
        line = array[i].join(",");
        str += line + "\r\n";
      }
      var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Bain - ${this.segmentSettings.UniqueSeriesString}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadTemplateCSV() {
      let headerLine = "Number,Title,Longitude,Latitude";
      let csvString = headerLine + "\r\n";

      for (var i = 0; i < this.pointData.length; i++) {
        let row = this.pointData[i];
        let line = `${row.Number},${row.Title},${row.Longitude},${row.Latitude}`;
        csvString += line + "\r\n";
      }

      var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Bain - Sample Upload Data.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    convertPointToFeature(point) {
      // console.log(point);
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.Longitude, point.Latitude],
        },
        properties: {
          id: point.id,
          number: point.Number,
          title: point.Title,
        },
      };
    },
    convertPointsToGeoJSON(points) {
      let features;
      if (points) {
        features = points.map((point) => this.convertPointToFeature(point));
      } else {
        features = [];
      }
      // console.log("features");
      // console.log(features);
      return {
        type: "FeatureCollection",
        features: features,
      };
    },
  },
  async mounted() {
    this.loading = true;

    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      // console.log('Modal is about to be shown', bvEvent, modalId)
      if (modalId == "modal-drop-location") {
        if (this.pointData.length < 1) {
          this.handleAdd();
        }
      }
    });

    await this.getMapData();

    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    let mapContainer = document.getElementById("mapContainer");
    mapContainer.addEventListener("mouseleave", function () {
      vue.popup.remove();
      vue.disablePopups = false;
    });
    function identifyFeatures(vue, segmentSettings, location, layer, fields) {
      // var identifiedFeatures = map.queryRenderedFeatures(location.point, {layers: [layer]});
      // console.log(fields)
      var identifiedFeatures = map.queryRenderedFeatures(location.point, {
        layers: [vue.segmentSettings.UniqueSeriesString],
      });
      // console.log(identifiedFeatures.length)
      // console.log(identifiedFeatures)
      // console.log(vue.segmentSettings.UniqueSeriesString)
      vue.popup.remove();

      if (
        identifiedFeatures != "" &&
        vue.countselector == "Off" &&
        !vue.disablePopups
      ) {
        var geoType;
        // console.log(vue.segmentSettings.GeographiesShapes.toLowerCase());
        if (
          vue.segmentSettings.GeographiesShapes.toLowerCase().includes("zip")
        ) {
          geoType = "Zip Code";
        } else {
          geoType = "Census Block";
        }
        // var popupText = `<strong>${vue.segmentSettings.UniqueSeriesString}</strong><br>`;
        var popupText = ``;
        var i = 0;
        for (i = 0; i < fields.length; i++) {
          var label;
          let index = fields.length - 1 - i;
          if (index == 0) {
            label = geoType;
            valueString = identifiedFeatures[0].properties[fields[index]];
          } else if (index == 1) {
            label = vue.segmentSettings.DataType;
            // console.log(fields[index])
            // console.log(identifiedFeatures[0].properties)
            let value = identifiedFeatures[0].properties[fields[index]];
            var valueString;
            if (label == "Percent") {
              valueString = value.toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
              });
            } else if (label == "Count") {
              valueString = value.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              });
            } else {
              // Index
              valueString = value.toLocaleString(undefined, {
                maximumSignificantDigits: 5,
              });
            }
          }
          popupText +=
            "<strong>" + label + ":</strong> " + valueString + "<" + "br" + ">";
          // popupText += "<strong>" + "a" + ":</strong> " + "b" + "<" + "br" + ">"
        }
        vue.popup.setLngLat(location.lngLat).setHTML(popupText).addTo(map);
      }
    }
    mapboxgl.accessToken = this.accessToken;
    //
    var map = new mapboxgl.Map({
      container: "mapContainer",
      // style: "mapbox://styles/mapbox/streets-v11",
      // style: "mapbox://styles/stobieb/ckxs6yvs53cv414m551rov84k",
      // style: "mapbox://styles/stobieb/cl03cgll7000114p6t44bqa0d",
      style: "mapbox://styles/stobieb/cl03cgll7000114p6t44bqa0d",
      // style: "mapbox://styles/stobieb/cl03bybjk000n14qttz2mv9tg",
      center: [this.mapCenter.lon, this.mapCenter.lat],
      attributionControl: false,
      zoom: this.zoom,
      preserveDrawingBuffer: true,
      // maxBounds: [
      //   [103.6, 1.1704753],
      //   [104.1, 1.4754753],
      // ],
    });

    this.map = map;
    var canvas = map.getCanvasContainer();
    var start;
    var current;
    var box;
    function mousePos(e) {
      var rect = canvas.getBoundingClientRect();
      return new mapboxgl.Point(
        e.clientX - rect.left - canvas.clientLeft,
        e.clientY - rect.top - canvas.clientTop
      );
    }
    function mouseDown(e) {
      // Continue the rest of the function if the shiftkey is pressed.
      if (!(e.shiftKey && e.button === 0)) {
        // console.log('clicked')
        finish([mousePos(e), mousePos(e)]);
        return;
      }

      // Disable default drag zooming when the shift key is held down.
      map.dragPan.disable();

      // Call functions for the following events
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("keydown", onKeyDown);

      // Capture the first xy coordinates
      start = mousePos(e);
    }

    function onMouseMove(e) {
      if (vue.countselector == "On") {
        // Capture the ongoing xy coordinates
        current = mousePos(e);

        // Append the box element if it doesnt exist
        if (!box) {
          box = document.createElement("div");
          box.classList.add("boxdraw");
          canvas.appendChild(box);
        }

        var minX = Math.min(start.x, current.x),
          maxX = Math.max(start.x, current.x),
          minY = Math.min(start.y, current.y),
          maxY = Math.max(start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        var pos = "translate(" + minX + "px," + minY + "px)";
        box.style.transform = pos;
        box.style.WebkitTransform = pos;
        box.style.width = maxX - minX + "px";
        box.style.height = maxY - minY + "px";
        box.style.background = "background: rgba(56, 135, 190, 0.1)";
        box.style.border = "2px solid #3887be";
      }
    }

    function onMouseUp(e) {
      // Capture xy coordinates
      finish([start, mousePos(e)]);
    }

    function onKeyDown(e) {
      // If the ESC key is pressed
      if (e.keyCode === 27) finish();
    }

    function finish(bbox) {
      document.querySelectorAll(".annotation").forEach((elem) => elem.remove());
      // Remove these events now that finish has been called.
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mouseup", onMouseUp);

      if (box) {
        box.parentNode.removeChild(box);
        box = null;
      }

      // If bbox exists. use this value as the argument for `queryRenderedFeatures`
      if (bbox && vue.countselector == "On") {
        var features = map.queryRenderedFeatures(bbox, {
          layers: [vue.segmentSettings.UniqueSeriesString],
        });

        if (features.length >= 1000) {
          return window.alert("Select a smaller number of features");
        }

        // Run through the selected features and set a filter
        // to match features with unique FIPS codes to activate
        // the `counties-highlighted` layer.
        // var total = features.reduce(
        //   function(sum, feature.properties[vue.segmentSettings.UniqueSeriesString]) {
        //     sum += parseFloat(feature.properties[vue.segmentSettings.UniqueSeriesString]);
        //     return sum;
        //   }
        // );

        // var total = features.forEach(feature => parseFloat(feature.properties[vue.segmentSettings.UniqueSeriesString])).reduce(add, 0);

        // var arr = [1, 2, 3, 4];
        var total = features
          .map(
            (feature) =>
              feature.properties[vue.segmentSettings.UniqueSeriesString]
          )
          .reduce(function (pv, cv) {
            return pv + cv;
          }, 0);
        let annotationString = "";

        let dataType = vue.segmentSettings.DataType;
        let average;
        if (dataType == "Count") {
          annotationString = `Total Count: ${total.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`;
        } else if (dataType == "Percent") {
          average = parseFloat(total) / parseFloat(features.length);
          annotationString = `Average Percent: ${average.toLocaleString(
            undefined,
            { style: "percent", minimumFractionDigits: 2 }
          )}`;
        } else {
          // dataType = "Index"

          average = parseFloat(total) / parseFloat(features.length);
          annotationString = `Average Index: ${average.toLocaleString(
            undefined,
            { maximumFractionDigits: 5 }
          )}`;
        }

        let annotation = document.createElement("h3");
        annotation.classList.add("annotation");
        annotation.style =
          "position: absolute; top: 10px; left: 10px; color: black; height: auto; width:auto; padding: 10px; border-radius: 5px;background-color: rgba(255,255,255,0.8);";
        annotation.innerHTML = annotationString;
        canvas.appendChild(annotation);
        let geoJsonGeoProperty = vue.geoJsonGeoProperty;
        var filter = features.reduce(
          function (memo, feature) {
            memo.push(feature.properties[geoJsonGeoProperty]);
            return memo;
          },
          ["in", geoJsonGeoProperty]
        );
        map.setFilter(
          `${vue.segmentSettings.UniqueSeriesString}-filtered`,
          filter
        );
      }

      map.dragPan.enable();
    }
    this.navigationControl = new mapboxgl.NavigationControl();
    map.addControl(this.navigationControl);
    this.fullScreenControl = new mapboxgl.FullscreenControl();
    map.addControl(this.fullScreenControl);
    this.scaleControl = new mapboxgl.ScaleControl({
      maxWidth: 400,
      unit: "metric",
    });
    map.addControl(this.scaleControl);
    map.addControl(new mapboxgl.AttributionControl({}));
    var checking_style_status = false;
    let segmentSettings = this.segmentSettings;
    let vue = this;
    this.selectedSegmentOptions = {
      value: Object.keys(this.mapSettingsData)[0],
      text: Object.values(this.mapSettingsData)[0].UniqueSeriesString,
    };
    map.on("styledata", function () {
      // console.log(map.getStyle().layers)
      if (checking_style_status) {
        // If already checking style status, bail out
        // (important because styledata event may fire multiple times)
        return;
      } else {
        checking_style_status = true;
        setMapLayer(vue, segmentSettings);
      }
      // var mapdiv = document.getElementById('mapContainer');
      // var button = document.createElement("div");
      // button.setAttribute("id", "extrude");
      // button.setAttribute("class", "mapboxgl-ctrl-group");
      // button.innerHTML = "3D";
      // mapdiv.appendChild(button);
      // if (!map.hasImage('custom-marker')) {
      //   map.loadImage(
      //       '/bain-marker.png',
      //       (error, image) => {
      //       if (error) throw error;
      //       map.addImage('custom-marker', image);
      //     })
      // }
      // // Add a GeoJSON source with 2 points
      // map.addSource('points', {
      // 'type': 'geojson',
      // 'data': {
      // 'type': 'FeatureCollection',
      // 'features': [
      // {
      // // feature for Mapbox DC
      // 'type': 'Feature',
      // 'geometry': {
      // 'type': 'Point',
      // 'coordinates': [
      // -77.03238901390978, 38.913188059745586
      // ]
      // },
      // 'properties': {
      // 'title': 'Mapbox DC'
      // }
      // },
      // {
      // // feature for Mapbox SF
      // 'type': 'Feature',
      // 'geometry': {
      // 'type': 'Point',
      // 'coordinates': [-96.971751, 32.796974]
      // },
      // 'properties': {
      // 'title': 'Mapbox SF'
      // }
      // }
      // ]
      // }
      // });

      //  console.log('add layer')
      // Add a symbol layer
      // map.addLayer({
      //   'id': 'points',
      //   'type': 'symbol',
      //   'source': 'points',
      //   'layout': {
      //     'icon-image': 'custom-marker',
      //     // get the title name from the source's "title" property
      //     'text-field': ['get', 'title'],
      //     'text-font': [
      //         'Open Sans Semibold',
      //     'Arial Unicode MS Bold'
      //     ],
      //     'text-offset': [0, 1.25],
      //     'text-anchor': 'top'
      //   }
      // });
      // }
      // );
    });

    // map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-left");
    function setMapLayer(vue, segmentSettings) {
      if (map.isStyleLoaded() && vue.marketSettingsData) {
        checking_style_status = false;
        // map._container.trigger('map_style_finally_loaded');
        if (!map.getSource("dataSource")) {
          if (!vue.sourcesLoaded) {
            map.addSource("dataSource", {
              type: "geojson",
              // Use a URL for the value for the `data` property.
              data: vue.mapSourceData,
            });
            map.addSource("dataLabelSource", {
              type: "geojson",
              // Use a URL for the value for the `data` property.
              data: vue.mapLabelSourceData,
            });
            map.addSource("markers", {
              type: "geojson",
              data: vue.markerGeoJSON,
            });
            if (!vue.sourcesLoaded) {
              vue.sourcesLoaded = true;
            }
          }

          // let max = Math.max(...mapSourceData.features.map(values => ( parseFloat(values.properties[this.selectedSegment.value]) )) )
          let min = vue.segmentSettings["MinValue"];
          let max = vue.segmentSettings["MaxValue"];
          if (
            vue.segmentSettings["DataType"] == "Percent" ||
            vue.segmentSettings["DataType"] == "Index"
          ) {
            min = parseFloat(min);
            max = parseFloat(max);
          } else {
            min = parseInt(min);
            max = parseInt(max);
          }
          let startColor = vue.segmentSettings["HeatMapStartColor"];
          let endColor = vue.segmentSettings["HeatMapEndColor"];
          // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
          let firstSymbolId;
          const layers = map.getStyle().layers;
          for (const layer of layers) {
            if (layer.id === "road-primary") {
              firstSymbolId = layer.id;
              break;
            }
          }
          // console.log('symbol layer')
          // console.log(firstSymbolId)
          map.addSource("zip_data", {
            type: "vector",
            url: "mapbox://stobieb.dallasfortworth_zip_data",
          });
          map.addLayer(
            {
              id: vue.segmentSettings.UniqueSeriesString,
              type: "fill",
              source: "zip_data",
              "source-layer": "dallasfortworth_zip_data",
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  // ['number', ['get', vue.segmentSettings.UniqueSeriesString]],
                  // ['number', ['get', 'DallasFortWorth_BS1_Count_2021']],
                  200,

                  min,
                  startColor,
                  max,
                  endColor,
                ],
                "fill-opacity": 0.8,
                "fill-outline-color": "#000000",
              },
            },
            firstSymbolId
          );

          map.addLayer(
            {
              id: `${vue.segmentSettings.UniqueSeriesString}-filtered`,
              type: "fill",
              source: "dataSource",
              layout: {
                visibility: "visible",
              },
              paint: {
                //#EC0303 #0305EC
                "fill-outline-color": "#000000",
                "fill-color": "rgba(255,255,255,0.5)",
                "fill-opacity": 0.8,
              },
              filter: ["in", vue.geoJsonGeoProperty, ""],
            },
            firstSymbolId
          );
          let geoLayerVisibility =
            vue.geoLabelVisibility == "On" ? "visible" : "none";
          map.addLayer({
            id: "geoLabels",
            type: "symbol",
            source: "dataLabelSource",
            layout: {
              visibility: geoLayerVisibility,
              // get the title name from the source's "title" property
              "text-field": ["get", "id"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [-1, -1.25],
              "text-anchor": "top",
            },
          });

          // Add a symbol layer
          // map.addLayer({
          //   'id': 'points',
          //   'type': 'symbol',
          //   'source': 'markers',
          //   'layout': {
          //     'icon-image': 'custom-marker',
          //     'icon-size': 0.1,
          //     // 'icon-text-fit': 'both',
          //     // 'icon-text-fit-padding': [5,5,5,5],
          //     // 'text-anchor': 'bottom',
          //     // 'text-justify': 'center',
          //     // 'text-padding': 10,
          //     // get the title name from the source's "title" property
          //     'text-field': ['get', 'number'],
          //     'text-font': [
          //         'Open Sans Semibold',
          //     'Arial Unicode MS Bold'
          //     ],
          //     // 'text-offset': [0, 10],
          //   },
          //   paint: {
          //     "text-color": "#ffffff"
          //   }
          // });

          /*Query with Popup and tooltip example*/

          // var mapdiv = document.getElementById('mapContainer');
          // var button = document.createElement("div");
          // button.setAttribute("id", "extrude");
          // button.setAttribute("class", "mapboxgl-ctrl-group");
          // button.innerHTML = "3D";
          // mapdiv.appendChild(button);

          canvas.addEventListener("mousedown", mouseDown, true);
          // Return the xy coordinates of the mouse position

          document.addEventListener(
            "click",
            function (event) {
              // If the clicked element doesn't have the right selector, bail
              if (!event.target.matches("#downloadLink")) return;

              // Don't follow the link
              event.preventDefault();
              var img = map.getCanvas().toDataURL("image/png");
              event.target.href = img;

              // Log the clicked element in the console
            },
            false
          );

          map.on("click", function (e) {
            // console.log('mouseclick')
            // let currentLayer = map.getStyle().layers.at(-2).id
            let currentLayer = vue.segmentSettings.UniqueSeriesString;
            // identifyFeatures(map, popup, e,  segmentSettings.UniqueSeriesString, ["ZCTA5CE10",  segmentSettings.UniqueSeriesString])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              currentLayer,
            ]);
          });

          map.on("mouseleave", vue.segmentSettings.UniqueSeriesString, (e) => {
            // console.log('A mouseleave event occurred.');
            let currentLayer = vue.segmentSettings.UniqueSeriesString;
            // identifyFeatures(map, popup, e,  segmentSettings.UniqueSeriesString, ["ZCTA5CE10",  segmentSettings.UniqueSeriesString])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              currentLayer,
            ]);
          });

          map.on("mousemove", function (e) {
            // console.log('mousemove')
            // let currentLayer = map.getStyle().layers.at(-2).id
            let currentLayer = vue.segmentSettings.UniqueSeriesString;
            // identifyFeatures(map, popup, e,  segmentSettings.UniqueSeriesString, ["ZCTA5CE10",  segmentSettings.UniqueSeriesString])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              currentLayer,
            ]);
          });
          map.on("mouseleave", function () {
            // console.log('mouseout')
            // let currentLayer = map.getStyle().layers.at(-2).id
          });

          /*End popup and tooltip example*/
        }
      } else {
        // If not yet loaded, repeat check after delay:
        setTimeout(function () {
          setMapLayer(vue, segmentSettings);
        }, 200);
        return;
      }
      // console.log("are we getting here");
    }
    this.loading = false;
  },
  watch: {
    selectedSegmentOptions: function () {
      // console.log(`updating segment: ${this.selectedSegmentOptions.text}`)
      let key = this.selectedSegmentOptions.value;
      this.selectedSegment = this.mapSettingsData[key];
    },
    markerGeoJSON: function () {
      if (this.map) {
        const markerSource = this.map.getSource("markers");
        if (markerSource) {
          markerSource.setData(this.markerGeoJSON);
        }
      }
      // this.map.removeLayer('points');
      // this.map.addLayer({
      //       'id': 'points',
      //       'type': 'symbol',
      //       'source': 'markers',
      //       'layout': {
      //         'icon-image': 'custom-marker',
      //         // get the title name from the source's "title" property
      //         'text-field': ['get', 'title'],
      //         'text-font': [
      //             'Open Sans Semibold',
      //         'Arial Unicode MS Bold'
      //         ],
      //         'text-offset': [0, 1.25],
      //         'text-anchor': 'top'
      //       }
      //     });
      // console.log('markerGeoJSON')
      // console.log(this.markerGeoJSON)
      // console.log('pointGeoJSON')
      // console.log(this.pointGeoJSON)
      // console.log(this.markerGeoJSON == this.pointGeoJSON)
      // console.log('changed')
      let map = this.map;
      let markers = this.markers;
      // console.log('add marker')
      // console.log(markers)
      if (markers.length > 0) {
        for (var i = markers.length - 1; i >= 0; i--) {
          markers[i].remove();
        }
      }
      markers = [];
      let vue = this;
      if (map && this.markerGeoJSON.features.length > 0) {
        let index = 0;
        // console.log(index)
        this.markerGeoJSON.features.forEach(function (marker) {
          index += 1;
          // create a HTML element for each feature
          var el = document.createElement("div");
          el.className = "marker";
          el.innerHTML = `<span data-index=${index}><b>${marker.properties.number}</b></span>`;
          // console.log(this.map)

          // make a marker for each feature and add it to the map

          let newMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
            .setPopup(
              new mapboxgl.Popup({
                offset: 25,
                className: "popUpMarker",
                closeButton: false,
              }) // add popups
                .setHTML(
                  '<h6><span class="badge badge-success">' +
                    marker.properties.number +
                    "</span></h6><h6>" +
                    marker.properties.title +
                    "</h6>"
                )
            );
          vue.markers.push(newMarker);

          const markerDiv = newMarker.getElement();

          markerDiv.addEventListener("mouseenter", () => {
            // console.log(e.target.children[0].dataset.index)
            newMarker.togglePopup();
            vue.disablePopups = true;
          });
          markerDiv.addEventListener("mouseleave", () => {
            // newMarker.togglePopup();
            // console.log('not here');
            newMarker.togglePopup();
            vue.disablePopups = false;
          });
        });
        // console.log('markers2')
        // console.log(vue.markers)
      }
    },
    csv: function () {
      // console.log('csv.loaded')
    },
    opacity: function () {
      this.map.setPaintProperty(
        this.segmentSettings.UniqueSeriesString,
        "fill-opacity",
        parseFloat(this.opacity) / 100
      );
    },
    geoLabelVisibility: function () {
      let visibility = this.geoLabelVisibility == "On" ? "visible" : "none";
      this.map.setLayoutProperty("geoLabels", "visibility", visibility);
    },
    countselector: function () {
      if (this.countselector == "On") {
        this.map.getCanvas().style.cursor = "crosshair";
        // this.map.scrollZoom.disable();
        this.map.boxZoom.disable();
        // this.map.dragRotate.disable();

        this.map.dragPan.disable();
        document
          .querySelectorAll(".annotation")
          .forEach((elem) => elem.remove());
      } else {
        document
          .querySelectorAll(".annotation")
          .forEach((elem) => elem.remove());
        this.map.getCanvas().style.cursor = "";
        this.map.scrollZoom.enable();
        this.map.boxZoom.enable();
        this.map.dragRotate.enable();
        this.map.dragPan.enable();
        this.segmentSettings.UniqueSeriesString;
        this.map.setFilter(
          `${this.segmentSettings.UniqueSeriesString}-filtered`,
          ["in", this.geoJsonGeoProperty, ""]
        );
      }
    },
    selectedSegment: function () {
      if (this.map && this.selectedSegment && this.previousSegmentSettings) {
        let newSegment = this.selectedSegment;
        this.previousSegmentSettings = this.segmentSettings;
        this.segmentSettings =
          this.mapSettingsData[this.selectedSegment.UniqueSeriesString];
        let mapLayer = this.map.getLayer(
          this.previousSegmentSettings.UniqueSeriesString
        );
        if (typeof mapLayer !== "undefined") {
          document
            .querySelectorAll(".annotation")
            .forEach((elem) => elem.remove());
          this.segmentSettings =
            this.mapSettingsData[newSegment.UniqueSeriesString];
          this.map.removeLayer(this.previousSegmentSettings.UniqueSeriesString);
          this.map.removeLayer(
            `${this.previousSegmentSettings.UniqueSeriesString}-filtered`
          );
          this.map.removeLayer("geoLabels");
          if (this.map.getLayer("markers")) {
            this.map.removeLayer("markers");
          }
          let startColor = this.segmentSettings["HeatMapStartColor"];
          let endColor = this.segmentSettings["HeatMapEndColor"];
          let min = this.segmentSettings["MinValue"];
          let max = this.segmentSettings["MaxValue"];
          if (
            this.segmentSettings["DataType"] == "Percent" ||
            this.segmentSettings["DataType"] == "Index"
          ) {
            min = parseFloat(min);
            max = parseFloat(max);
          } else {
            min = parseInt(min);
            max = parseInt(max);
          }
          // console.log('here')
          // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
          let firstSymbolId;
          const layers = this.map.getStyle().layers;
          for (const layer of layers) {
            if (layer.id === "road-primary") {
              firstSymbolId = layer.id;
              break;
            }
          }
          // console.log('symbol layer')
          // console.log(firstSymbolId)
          this.map.addSource("zip_data", {
            type: "vector",
            url: "mapbox://stobieb.dallasfortworth_zip_data",
          });
          this.map.addLayer(
            {
              id: this.segmentSettings.UniqueSeriesString,
              type: "fill",
              source: "zip_data",
              "source-layer": "dallasfortworth_zip_data",
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  // ['number', ['get', this.segmentSettings.UniqueSeriesString]],
                  // ['number', ['get', 'DallasFortWorth_BS1_Count_2021']],
                  200,
                  min,
                  startColor,
                  max,
                  endColor,
                ],
                // 'fill-outline-color': '#000000',
                "fill-outline-color": "#000000",
                "fill-opacity": this.opacity / 100,
              },
            },
            firstSymbolId
          );
          this.map.addLayer(
            {
              id: `${this.segmentSettings.UniqueSeriesString}-filtered`,
              type: "fill",
              source: "dataSource",
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-outline-color": "#000000",
                "fill-color": "rgba(255,255,255,0.5)",
                "fill-opacity": 0.8,
              },
              filter: ["in", this.geoJsonGeoProperty, ""],
            },
            firstSymbolId
          );
          let geoLayerVisibility =
            this.geoLabelVisibility == "On" ? "visible" : "none";
          this.map.addLayer({
            id: "geoLabels",
            type: "symbol",
            source: "dataLabelSource",
            layout: {
              visibility: geoLayerVisibility,
              // get the title name from the source's "title" property
              "text-field": ["get", "id"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [-1, -1.25],
              "text-anchor": "top",
            },
          });
          // this.map.addLayer({
          //   'id': 'points',
          //   'type': 'symbol',
          //   'source': 'markers',
          //   'layout': {
          //     'icon-image': 'custom-marker',
          //     // get the title name from the source's "title" property
          //     'text-field': ['get', 'title'],
          //     'text-font': [
          //         'Open Sans Semibold',
          //     'Arial Unicode MS Bold'
          //     ],
          //     'text-offset': [0, 1.25],
          //     'text-anchor': 'top'
          //   }
          // });
          this.previousSegmentSettings = this.segmentSettings;
          this.showStatus();
          // this.previousSegmentSettings = this.segmentSettings
          // this.previousSelectedSegment = this.selectedSegment
        }
      }
    },
    async selectedGeoUnits(newGeoUnits) {
      this.loading = true;
      // this.showStatus();
      this.map.removeLayer(this.previousSegmentSettings.UniqueSeriesString);
      this.map.removeLayer(
        `${this.previousSegmentSettings.UniqueSeriesString}-filtered`
      );
      this.map.removeLayer("geoLabels");
      // await this.getMapData()

      const mapDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${newGeoUnits}_data.json`
      );
      const mapData = await mapDataResponse.json();
      this.mapSourceData = await mapData;
      const mapLabelsDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${newGeoUnits}_labels.json`
      );
      const mapLabelsData = await mapLabelsDataResponse.json();
      this.mapLabelSourceData = await mapLabelsData;
      const settingsDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket}_${newGeoUnits}_settings_data.json`
      );
      const mapSettingsData = await settingsDataResponse.json();
      this.mapSettingsData = await mapSettingsData;
      this.importedSettingsData = await mapSettingsData;

      this.segmentSettings = await Object.values(this.mapSettingsData)[0];
      this.previousSegmentSettings = await Object.values(
        this.mapSettingsData
      )[0];
      this.selectedSegment = await Object.values(this.mapSettingsData)[0];
      this.previousSelectedSegment = Object.values(this.mapSettingsData)[0];
      // document.getElementById("input_horizontal_segment").value =this.selectedSegment
      // this.getMapSettingsData();
      // var newView = {
      //   center: [this.mapCenter.lon,this.mapCenter.lat],
      //   zoom: this.zoom,
      //   bearing: 0,
      //   pitch: 0,
      //   speed: 1.0,
      //   curve: 1.0
      // };
      this.map.once("moveend", () => {
        this.loading = false;
      });
      // this.map.flyTo(newView);
      // this.getMapData()

      const geojsonSource = this.map.getSource("dataSource");
      const geojsonLabelSource = this.map.getSource("dataLabelSource");

      if (this.map.getSource("dataSource")) {
        geojsonSource.setData(this.mapSourceData);
        geojsonLabelSource.setData(this.mapLabelSourceData);
        // console.log('new segment settings')
        // console.log(this.segmentSettings)
        // let max = Math.max(...mapSourceData.features.map(values => ( parseFloat(values.properties[this.selectedSegment]) )) )
        let min = this.segmentSettings["MinValue"];
        let max = this.segmentSettings["MaxValue"];
        if (
          this.segmentSettings["DataType"] == "Percent" ||
          this.segmentSettings["DataType"] == "Index"
        ) {
          min = parseFloat(min);
          max = parseFloat(max);
        } else {
          min = parseInt(min);
          max = parseInt(max);
        }
        let startColor = this.segmentSettings["HeatMapStartColor"];
        let endColor = this.segmentSettings["HeatMapEndColor"];
        // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
        let firstSymbolId;
        const layers = this.map.getStyle().layers;
        for (const layer of layers) {
          if (layer.id === "road-primary") {
            firstSymbolId = layer.id;
            break;
          }
        }
        // console.log('symbol layer')
        // console.log(firstSymbolId)
        this.map.addSource("zip_data", {
          type: "vector",
          url: "mapbox://stobieb.dallasfortworth_zip_data",
        });
        this.map.addLayer(
          {
            id: this.segmentSettings.UniqueSeriesString,
            type: "fill",
            source: "zip_data",
            "source-layer": "dallasfortworth_zip_data",
            layout: {
              visibility: "visible",
            },
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                // ['number', ['get', this.segmentSettings.UniqueSeriesString]],
                // ['number', ['get', 'DallasFortWorth_BS1_Count_2021']],
                200,
                min,
                startColor,
                max,
                endColor,
              ],
              "fill-opacity": 0.8,
              "fill-outline-color": "#000000",
            },
          },
          firstSymbolId
        );
        this.map.addLayer(
          {
            id: `${this.segmentSettings.UniqueSeriesString}-filtered`,
            type: "fill",
            source: "dataSource",
            layout: {
              visibility: "visible",
            },
            paint: {
              //#EC0303 #0305EC
              "fill-outline-color": "#000000",
              "fill-color": "rgba(255,255,255,0.5)",
              "fill-opacity": 0.8,
            },
            filter: ["in", this.geoJsonGeoProperty, ""],
          },
          firstSymbolId
        );
        let geoLayerVisibility =
          this.geoLabelVisibility == "On" ? "visible" : "none";
        this.map.addLayer({
          id: "geoLabels",
          type: "symbol",
          source: "dataLabelSource",
          layout: {
            visibility: geoLayerVisibility,
            // get the title name from the source's "title" property
            "text-field": ["get", "id"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [-1, -1.25],
            "text-anchor": "top",
          },
        });
        // this.map.addLayer({
        //     'id': 'points',
        //     'type': 'symbol',
        //     'source': 'markers',
        //     'layout': {
        //       'icon-image': 'custom-marker',
        //       // get the title name from the source's "title" property
        //       'text-field': ['get', 'title'],
        //       'text-font': [
        //           'Open Sans Semibold',
        //       'Arial Unicode MS Bold'
        //       ],
        //       'text-offset': [0, 1.25],
        //       'text-anchor': 'top'
        //     }
        //   });
        /*Query with Popup and tooltip example*/

        // var mapdiv = document.getElementById('mapContainer');
        // var button = document.createElement("div");
        // button.setAttribute("id", "extrude");
        // button.setAttribute("class", "mapboxgl-ctrl-group");
        // button.innerHTML = "3D";
        // mapdiv.appendChild(button);

        document.addEventListener(
          "click",
          function (event) {
            // If the clicked element doesn't have the right selector, bail
            if (!event.target.matches("#downloadLink")) return;

            // Don't follow the link
            event.preventDefault();
            var img = this.map.getCanvas().toDataURL("image/png");
            event.target.href = img;

            // Log the clicked element in the console
          },
          false
        );

        /*End popup and tooltip example*/
        // this.showStatus();
        this.selectedSegment = Object.values(this.mapSettingsData)[0];
      }
      this.loading = false;
    },
    async selectedMarket(newMarket) {
      // this.showStatus();
      this.loading = true;
      this.map.removeLayer(this.previousSegmentSettings.UniqueSeriesString);
      this.map.removeLayer(
        `${this.previousSegmentSettings.UniqueSeriesString}-filtered`
      );
      this.map.removeLayer("geoLabels");
      // await this.getMapData()

      const mapDataResponse = await fetch(
        `${this.base_asset_url}/${newMarket}_${this.selectedGeoUnits}_data.json`
      );
      const mapData = await mapDataResponse.json();
      this.mapSourceData = await mapData;
      const mapLabelsDataResponse = await fetch(
        `${this.base_asset_url}/${newMarket}_${this.selectedGeoUnits}_labels.json`
      );
      const mapLabelsData = await mapLabelsDataResponse.json();
      this.mapLabelSourceData = await mapLabelsData;
      const settingsDataResponse = await fetch(
        `${this.base_asset_url}/${newMarket}_${this.selectedGeoUnits}_settings_data.json`
      );
      const mapSettingsData = await settingsDataResponse.json();
      this.mapSettingsData = await mapSettingsData;
      this.importedSettingsData = await mapSettingsData;

      this.segmentSettings = await Object.values(this.mapSettingsData)[0];
      this.previousSegmentSettings = await Object.values(
        this.mapSettingsData
      )[0];
      this.selectedSegment = await Object.values(this.mapSettingsData)[0];
      this.previousSelectedSegment = await Object.values(
        this.mapSettingsData
      )[0];

      // document.getElementById("input_horizontal_segment").value =this.selectedSegment
      // this.getMapSettingsData();
      var newView = {
        center: [this.mapCenter.lon, this.mapCenter.lat],
        zoom: this.zoom,
        bearing: 0,
        pitch: 0,
        speed: 1.0,
        curve: 1.0,
      };

      this.map.flyTo(newView);
      this.map.once("moveend", () => {
        this.loading = false;
      });
      // this.getMapData()

      const geojsonSource = this.map.getSource("dataSource");
      const geojsonLabelSource = this.map.getSource("dataLabelSource");

      if (this.map.getSource("dataSource")) {
        geojsonSource.setData(this.mapSourceData);
        geojsonLabelSource.setData(this.mapLabelSourceData);

        // let max = Math.max(...mapSourceData.features.map(values => ( parseFloat(values.properties[this.selectedSegment]) )) )
        let min = this.segmentSettings["MinValue"];
        let max = this.segmentSettings["MaxValue"];
        if (
          this.segmentSettings["DataType"] == "Percent" ||
          this.segmentSettings["DataType"] == "Index"
        ) {
          min = parseFloat(min);
          max = parseFloat(max);
        } else {
          min = parseInt(min);
          max = parseInt(max);
        }
        let startColor = this.segmentSettings["HeatMapStartColor"];
        let endColor = this.segmentSettings["HeatMapEndColor"];
        // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
        let firstSymbolId;
        const layers = this.map.getStyle().layers;
        for (const layer of layers) {
          if (layer.id === "road-primary") {
            firstSymbolId = layer.id;
            break;
          }
        }
        // console.log('symbol layer')
        // console.log(firstSymbolId)
        this.map.addSource("zip_data", {
          type: "vector",
          url: "mapbox://stobieb.dallasfortworth_zip_data",
        });
        this.map.addLayer(
          {
            id: this.segmentSettings.UniqueSeriesString,
            type: "fill",
            source: "zip_data",
            "source-layer": "dallasfortworth_zip_data",
            layout: {
              visibility: "visible",
            },
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                // ['number', ['get', this.segmentSettings.UniqueSeriesString]],
                // ['number', ['get', 'DallasFortWorth_BS1_Count_2021']],
                200,
                min,
                startColor,
                max,
                endColor,
              ],
              "fill-opacity": 0.8,
              "fill-outline-color": "#000000",
            },
          },
          firstSymbolId
        );
        this.map.addLayer(
          {
            id: `${this.segmentSettings.UniqueSeriesString}-filtered`,
            type: "fill",
            source: "dataSource",
            layout: {
              visibility: "visible",
            },
            paint: {
              //#EC0303 #0305EC
              "fill-outline-color": "#000000",
              "fill-color": "rgba(255,255,255,0.5)",
              "fill-opacity": 0.8,
            },
            filter: ["in", this.geoJsonGeoProperty, ""],
          },
          firstSymbolId
        );
        let geoLayerVisibility =
          this.geoLabelVisibility == "On" ? "visible" : "none";
        this.map.addLayer({
          id: "geoLabels",
          type: "symbol",
          source: "dataLabelSource",
          layout: {
            visibility: geoLayerVisibility,
            // get the title name from the source's "title" property
            "text-field": ["get", "id"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [-1, -1.25],
            "text-anchor": "top",
          },
        });
        // this.map.addLayer({
        //     'id': 'points',
        //     'type': 'symbol',
        //     'source': 'markers',
        //     'layout': {
        //       'icon-image': 'custom-marker',
        //       // get the title name from the source's "title" property
        //       'text-field': ['get', 'title'],
        //       'text-font': [
        //           'Open Sans Semibold',
        //       'Arial Unicode MS Bold'
        //       ],
        //       'text-offset': [0, 1.25],
        //       'text-anchor': 'top'
        //     }
        //   });

        /*Query with Popup and tooltip example*/

        // var mapdiv = document.getElementById('mapContainer');
        // var button = document.createElement("div");
        // button.setAttribute("id", "extrude");
        // button.setAttribute("class", "mapboxgl-ctrl-group");
        // button.innerHTML = "3D";
        // mapdiv.appendChild(button);

        document.addEventListener(
          "click",
          function (event) {
            // If the clicked element doesn't have the right selector, bail
            if (!event.target.matches("#downloadLink")) return;

            // Don't follow the link
            event.preventDefault();
            var img = this.map.getCanvas().toDataURL("image/png");
            event.target.href = img;

            // Log the clicked element in the console
          },
          false
        );

        /*End popup and tooltip example*/
        // this.showStatus();
        this.selectedSegment = Object.values(this.mapSettingsData)[0];
        // console.log(`updating segment with new market: ${this.selectedSegment}`)
        this.selectedSegmentOptions = {
          value: this.selectedSegment.UniqueSeriesString,
          text: this.selectedSegment.UniqueSeriesString,
        };
      }
    },
    allPointData: {
      deep: true,
      handler: function () {
        // console.log("updating markers");
        // console.log(this.markers);
        this.markerGeoJSON = this.currentMarketMarkerGeoJSON;
        if (this.selectedMarket) {
          this.pointData = this.allPointData[this.selectedMarket];
        } else {
          this.pointData = [];
        }

        if (this.map && this.markerGeoJSON.features.length > 0) {
          let map = this.map;
          // make a marker for each feature and add it to the map
          if (this.markers.length > 0) {
            for (var i = this.markers.length - 1; i >= 0; i--) {
              this.markers[i].remove();
            }
          }
          // console.log("updating markers");
          this.markers = [];
          let markers = this.markers;
          // console.log('adding points')
          this.markerGeoJSON.features.forEach(function (marker) {
            // create a HTML element for each feature
            var el = document.createElement("div");
            el.className = "marker";
            el.innerHTML =
              "<span><b>" + marker.properties.number + "</b></span>";

            let newMarker = new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
            // .setPopup(new mapboxgl.Popup({
            //     offset: 25
            //   }) // add popups
            //   .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            // map.markers.push(newMarker)
            markers.push(newMarker);
          });
        }
      },
    },
    pointData: function () {
      // console.log("pointdata changed");
      // console.log(this.pointData);
      this.allPointData[this.selectedMarket] = this.pointData;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style >
.bain-geospatial {
  font-family: "graphik", sans-serif;
  max-width: 1284px;
  margin-left: 5%;
  margin-right: 5%;
}

.bain-geospatial.isFullScreen {
  margin-left: 5%;
  margin-right: 5%;
}

#main {
  position: relative;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  height: 415px;
}

.isFullScreen #main {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  width: 100vw;
}

.fullscreen {
  background-color: white;
}

#son {
  z-index: -1;
  position: absolute;
  top: 100%;

  background: white;
  /* height: 100px; */
}

/* .custom-control-input:checked~.custom-control-label.red::before {
  background-color: red;
} */
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: red !important;
  background-color: red !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: red !important;
  background-color: red !important;
}

btn.mapboxgl-ctrl-group button.mapboxgl-ctrl-download-data {
  width: 100px;
  font-size: 18px;
}

.btn.btn-primary {
  width: 100px;
  font-size: 18px;
}

#parent {
  position: relative;
  height: 400px;
}

#mapContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border: solid 1px gray;
  bottom: 0;
}

.mapboxgl-ctrl-pitchtoggle-3d {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+ICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHN0eWxlPSJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbmNob3I6IG1pZGRsZTsiPjNEPC90ZXh0Pjwvc3ZnPg==);
}

.mapboxgl-ctrl-pitchtoggle-2d {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+ICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHN0eWxlPSJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbmNob3I6IG1pZGRsZTsiPjJEPC90ZXh0Pjwvc3ZnPg==);
}

/* 
 // the images for mapbox-gl-draw_* are from 
https://github.com/mapbox/mapbox-gl-draw/blob/master/dist/mapbox-gl-draw.css
*/
.mapbox-gl-draw_point {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJtYXJrZXIuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTYiICAgICBpbmtzY2FwZTpjeD0iMTQuMTY0MjUzIiAgICAgaW5rc2NhcGU6Y3k9IjguODg1NzIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0iZmFsc2UiICAgICB1bml0cz0icHgiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI3NTEiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMjA4IiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjE5MCIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkMTk3MTUiIC8+ICA8L3NvZGlwb2RpOm5hbWVkdmlldz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhMTkxNzIiPiAgICA8cmRmOlJERj4gICAgICA8Y2M6V29yayAgICAgICAgIHJkZjphYm91dD0iIj4gICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PiAgICAgICAgPGRjOnR5cGUgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+ICAgICAgICA8ZGM6dGl0bGUgLz4gICAgICA8L2NjOldvcms+ICAgIDwvcmRmOlJERj4gIDwvbWV0YWRhdGE+ICA8ZyAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwMzIuMzYyMikiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgZD0ibSAzNiwxMDQwLjM2MjIgYyA2ZS02LDMuMzA5MyAtNS45ODg2MTIsMTAgLTUuOTg4NjEyLDEwIDAsMCAtNS45OTg3NzYsLTYuNjY4IC02LjAxMTM0NSwtOS45NzcyIC0wLjAxMjU3LC0zLjMwOTIgMi42NTY1NzYsLTYuMDAzOSA1Ljk2NTc5MiwtNi4wMjI3IDMuMzA5MTg5LC0wLjAxOSA2LjAwODg0LDIuNjQ1MiA2LjAzMzk5Miw1Ljk1NDMiICAgICAgIGlkPSJwYXRoMTI1NjEiICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2Nzc2MiIC8+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDM0LjAwMDExNSwxMDQwLjM2MjIgYyAtNWUtNiwyLjIwNjIgLTMuOTkyNTIzLDcuMDAwMSAtMy45OTI1MjMsNy4wMDAxIDAsMCAtMy45OTkyOTEsLTQuNzc4NyAtNC4wMDc2NzksLTYuOTg0OSAtMC4wMDg0LC0yLjIwNjIgMS43NzEwODIsLTQuMDAyNyAzLjk3NzMxLC00LjAxNTMgMi4yMDYyMSwtMC4wMTMgNC4wMDYwMzcsMS43NjM1IDQuMDIyNzc3LDMuOTY5NyIgICAgICAgaWQ9InBhdGgxMjU2MyIgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Ik0gOS45NjY3OTY5LDEwMTQuMzYyMiBDIDYuNjU3NTgwOSwxMDE0LjM4MSAzLjk4NzQzLDEwMTcuMDc2NCA0LDEwMjAuMzg1NiBjIDAuMDEyNTY5LDMuMzA5MiA2LjAxMTcxOSw4Ljk3NjYgNi4wMTE3MTksOC45NzY2IDAsMCA1Ljk4ODI4NywtNS42OTA3IDUuOTg4MjgxLC05IGwgMCwtMC4wNDUgYyAtMC4wMjUxNSwtMy4zMDkxIC0yLjcyNDAxNCwtNS45NzQxIC02LjAzMzIwMzEsLTUuOTU1MSB6IG0gMC4wMDk3NywyIGMgMi4yMDYyMDYxLC0wLjAxMyA0LjAwNjY5MzEsMS43NjI2IDQuMDIzNDMzMSwzLjk2ODggbCAwLDAuMDMxIGMgLTVlLTYsMi4yMDYyIC0zLjk5MjE4OCw2IC0zLjk5MjE4OCw2IDAsMCAtMy45OTk0MjQsLTMuNzc4MiAtNC4wMDc4MTIsLTUuOTg0NCAtMC4wMDg0LC0yLjIwNjIgMS43NzAzMzQ1LC00LjAwMyAzLjk3NjU2MjUsLTQuMDE1NiB6IiAgICAgICBpZD0icGF0aDEyNTY4IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzY3NjY2Njc2NzYyIgLz4gICAgPHBhdGggICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO21hcmtlcjpub25lIiAgICAgICBkPSJNIDEwIDIgQyA2LjY4NjI5MiAyIDQgNC42ODYzIDQgOCBDIDQgMTEuMzEzNyAxMCAxNyAxMCAxNyBDIDEwIDE3IDE2IDExLjMxMzcgMTYgOCBDIDE2IDQuNjg2MyAxMy4zMTM3MDggMiAxMCAyIHogTSAxMCA0IEMgMTIuMDcxMDY4IDQgMTMuNzUgNS42Nzg5IDEzLjc1IDcuNzUgQyAxMy43NSA5LjIwNTMyNzggMTEuOTMxMTEgMTEuNjQ0MzkzIDEwLjgzMDA3OCAxMyBMIDkuMTY5OTIxOSAxMyBDIDguMDY4ODkwMyAxMS42NDQzOTMgNi4yNSA5LjIwNTMyNzggNi4yNSA3Ljc1IEMgNi4yNSA1LjY3ODkgNy45Mjg5MzIgNCAxMCA0IHogIiAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDEwMzIuMzYyMikiICAgICAgIGlkPSJwYXRoMTczMDUiIC8+ICA8L2c+PC9zdmc+);
}

.mapbox-gl-draw_line {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJsaW5lLnN2ZyI+ICA8ZGVmcyAgICAgaWQ9ImRlZnMxOTE2OSIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIGlkPSJiYXNlIiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiICAgICBib3JkZXJvcGFjaXR5PSIxLjAiICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOnpvb209IjE2IiAgICAgaW5rc2NhcGU6Y3g9IjEyLjg5ODc3NSIgICAgIGlua3NjYXBlOmN5PSI5LjU4OTAxNTIiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBkPSJtIDEzLjUsMTAzNS44NjIyIGMgLTEuMzgwNzEyLDAgLTIuNSwxLjExOTMgLTIuNSwyLjUgMCwwLjMyMDggMC4wNDYxNCwwLjYyNDQgMC4xNTYyNSwwLjkwNjMgbCAtMy43NSwzLjc1IGMgLTAuMjgxODM2LC0wLjExMDIgLTAuNTg1NDIxLC0wLjE1NjMgLTAuOTA2MjUsLTAuMTU2MyAtMS4zODA3MTIsMCAtMi41LDEuMTE5MyAtMi41LDIuNSAwLDEuMzgwNyAxLjExOTI4OCwyLjUgMi41LDIuNSAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTAuMzIwOCAtMC4wNDYxNCwtMC42MjQ0IC0wLjE1NjI1LC0wLjkwNjIgbCAzLjc1LC0zLjc1IGMgMC4yODE4MzYsMC4xMTAxIDAuNTg1NDIxLDAuMTU2MiAwLjkwNjI1LDAuMTU2MiAxLjM4MDcxMiwwIDIuNSwtMS4xMTkzIDIuNSwtMi41IDAsLTEuMzgwNyAtMS4xMTkyODgsLTIuNSAtMi41LC0yLjUgeiIgICAgICAgaWQ9InJlY3Q2NDY3IiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPiAgPC9nPjwvc3ZnPg==);
}

.mapbox-gl-draw_polygon {
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: auto;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJzcXVhcmUuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IiAgICAgaW5rc2NhcGU6Y3g9IjExLjY4MTYzNCIgICAgIGlua3NjYXBlOmN5PSI5LjI4NTcxNDMiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC41O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Im0gNSwxMDM5LjM2MjIgMCw2IDIsMiA2LDAgMiwtMiAwLC02IC0yLC0yIC02LDAgeiBtIDMsMCA0LDAgMSwxIDAsNCAtMSwxIC00LDAgLTEsLTEgMCwtNCB6IiAgICAgICBpZD0icmVjdDc3OTciICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjIiAvPiAgICA8Y2lyY2xlICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBpZD0icGF0aDQzNjQiICAgICAgIGN4PSI2IiAgICAgICBjeT0iMTA0Ni4zNjIyIiAgICAgICByPSIyIiAvPiAgICA8Y2lyY2xlICAgICAgIGlkPSJwYXRoNDM2OCIgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjYwMDAwMDAyO21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGN4PSIxNCIgICAgICAgY3k9IjEwNDYuMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBpZD0icGF0aDQzNzAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBjeD0iNiIgICAgICAgY3k9IjEwMzguMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNjAwMDAwMDI7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgaWQ9InBhdGg0MzcyIiAgICAgICBjeD0iMTQiICAgICAgIGN5PSIxMDM4LjM2MjIiICAgICAgIHI9IjIiIC8+ICA8L2c+PC9zdmc+);
}

.boxdraw {
  background: rgba(56, 135, 190, 0.1);
  border: 2px solid #3887be;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.hidden {
  display: none;
}

.annotation {
  position: absolute;
  top: 100;
  left: 100;
  color: black;
  height: 20px;
  width: 100%;
}

#extrude {
  position: absolute;
  top: 150px;
  right: 10px;
  background: white;
  width: 30px;
  height: 30px;
  padding: 7px 0;
  text-align: center;
  font-size: larger;
  cursor: pointer;
  font-weight: bold;
  line-height: 15px;
}

.vue-csv-uploader-part-two {
  display: none;
}

.marker {
  width: 0;
  height: 0;
}

.marker span {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  color: #fff;
  background: #693;
  border: solid 2px;
  border-radius: 0 70% 70%;
  box-shadow: 0 0 2px #000;
  cursor: pointer;
  transform-origin: 0 0;
  transform: rotateZ(-135deg);
  z-index: 100;
}

.marker b {
  transform: rotateZ(135deg);
}

.mapboxgl-popup {
  max-width: 200, px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: "graphik", "Open Sans", sans-serif;
}

table.editable-table {
  margin: auto;
  margin-top: 30px;
}

table.editable-table td {
  vertical-align: middle;
}

.editable-table .data-cell {
  padding: 8px;
  vertical-align: middle;
}

.editable-table .custom-checkbox {
  width: 50px;
}

.name-col {
  width: 120px;
}

.department-col {
  width: 150px;
}

.age-col {
  width: 100px;
}

.date-col {
  width: 200, px;
}

.is-active-col {
  width: 100px;
}

#main .form-row.form-group {
  margin-bottom: 0px;
}

#mapTitle {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  top: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 16px "graphik", sans-serif;
  padding: 5px 5px 0px 5px;
  position: absolute;
  left: 20px;
  z-index: 1;
}

.legend {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "graphik", sans-serif;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: 1;
}

.legend-bottom {
  bottom: 31px;
}

.legend-top {
  top: 10px;
}

.legend h4 {
  margin: 0 0 10px;
}

.legend div span {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}

.legend-header {
  text-align: center;
  margin-bottom: 10px;
}

.legend-body {
  display: flex;
  flex-flow: row;
  font-weight: bold;
  text-align: center;
}

.header {
  background: white;
  text-align: center;
  margin-bottom: 10px;
}

.main {
  display: flex;
  flex-flow: column;
  font-weight: bold;
  text-align: left;
  background: white;
  justify-content: space-between;
  height: 100px;
  margin-left: 10px;
}

.aside-1 {
  width: 40px;
}

.spinner {
  height: 60px;
  width: 60px;
  margin: auto;
  display: flex;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-animation: rotation 0.6s infinite linear;
  -moz-animation: rotation 0.6s infinite linear;
  -o-animation: rotation 0.6s infinite linear;
  animation: rotation 0.6s infinite linear;
  border-left: 6px solid rgba(204, 2, 0, 0.15);
  border-right: 6px solid rgba(204, 2, 0, 0.15);
  border-bottom: 6px solid rgba(204, 2, 0, 0.15);
  border-top: 6px solid rgba(204, 2, 0, 1);
  border-radius: 100%;
}

.spinner-text {
  margin: auto;
  display: flex;
  position: relative;
  top: 450px;
  padding: 5px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(359deg);
  }
}

@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(359deg);
  }
}

@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }

  to {
    -o-transform: rotate(359deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  cursor: pointer;
}

.help-link {
  font-size: 15px;
  margin-bottom: 0p;
  margin-top: 20px;
  font-family: "graphik-regular", sans-serif;
}

.number-col {
  width: 10%;
}

.title-col {
  width: 40%;
}

.latitude-col {
  width: 20%;
}

.longitude-col {
  width: 20%;
}

.delete-col {
  width: 10%;
}

.datapoints-table {
  width: 100% !important;
}

.tooltip-inner {
  font-size: 12px;
  line-height: 1em;
}

a.mapboxgl-ctrl-logo {
  display: none;
}

.mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {
  margin-bottom: 6px;
}

.popUpMarker {
  z-index: 200;
}

.bain_headline {
  border-left: 4px solid #c00;
  height: auto;
  padding-left: 25px;
  margin-top: 37px;
  margin-bottom: 30px;
  font-family: "graphik-semibold";
  font-size: 32px;
  font-weight: 600;
  line-height: 1.38;
  text-align: left;
  color: #000;
}

.nav-link,
.nav-link:hover {
  color: #cc0000;
}

.map_box_container {
  height: 60vh;
  position: relative;
}

.map_box_container.isFullScreen {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -10;
}

.map-menu.isFullScreen {
  position: absolute;
  y: 0;
  x: 0;
  width: 100vw;
  background: rgba(255, 255, 255, 0.8);
}
</style>


