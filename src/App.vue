<template>
  <div
    class="container-fluid bain-geospatial"
    :class="{ isFullScreen: fullscreen }"
    style="background: white"
  >
    <!-- <p>selectedDataType {{ selectedDataType }}</p>
    <p>dataTypeNameMappingV4 {{ dataTypeNameMappingV4 }}</p>s
    <p>selectedDataTypeOptions {{ selectedDataTypeOptions }}</p>
    <p>dataTypeSlugMappingV4 {{ dataTypeSlugMappingV4 }}</p>
    <p>selectedDataTypeOptions {{ selectedDataTypeOptions }}</p>
    <p>selectedMarket {{ selectedMarket }}</p>
    <p>selectedDataSeries {{ selectedDataSeries }}</p>
    <p>selectedDataSeriesOptions {{ selectedDataSeriesOptions }}</p>
    <p>intramarketMarketSettingsData {{ intramarketMarketSettingsData }}</p>

    -->

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
      <!-- <img src="@/assets/svgLogo.svg" /> -->
      <b-tabs content-class="mt-3" fill @input="onTabChange">
        <b-tab title="Intra-Market Mapping" active>
          <fullscreen v-model="fullscreen" teleport>
            <!-- {{currentMarketChartData}} -->
            <!-- {{computedMarketOptions.length}} -->
            <!-- {{[computedMarketOptionsWithoutStates[0]]}} -->
            <!-- {{ process.env.VUE_APP_ASSET_URL}}
          {{ process.env.ASSET_URL}}
          {{ process.env.NODE_ENV}} -->
            <b-modal
              id="modal-data-in-range"
              size="xl"
              centered
              scrollable
              title="Build summary reports for custom location points"
            >
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    id="fieldset_horizontal_opacity"
                    label-cols-sm="4"
                    label-cols-lg="4"
                    content-cols-sm
                    content-cols-lg="8"
                    label-for="input_horizontal_opacity"
                  >
                    <template slot="label">
                      {{ range }} mile radius
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-range"
                      ></i>
                      <b-tooltip placement="bottom" target="help-range"
                        >Select range in miles for selecting geo units units.
                      </b-tooltip>
                    </template>
                    <b-form-input
                      id="range-1"
                      v-model="range"
                      :state="false"
                      size="sm"
                      type="range"
                      min="1"
                      max="75"
                      step="1"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div>
                    Selected number of geo units in range:
                    <b>{{ this.selectedFeaturesLength }}</b>
                  </div>
                  <div>
                    Selected market:
                    <b
                      >{{
                        this.intramarketMarketSettingsDataV4[selectedMarket]
                          .Market_Display_Name
                      }}
                    </b>
                  </div>
                  <div>
                    Selected age:
                    <b>{{ selectedAgeSegmentDisplay }}</b>
                  </div>
                  <div>
                    Selected income:
                    <b>{{ selectedIncomeSegmentDisplay }}</b>
                  </div>
                  <div>
                    Selected data type:
                    <b>{{
                      this.dataTypeNameMappingV4[this.selectedDataType]
                    }}</b>
                  </div>
                  <div>
                    Selected data series:<b> {{ selectedDataSeriesDisplay }}</b>
                  </div>
                  <p
                    class="help-link text-left"
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
              <template #modal-footer>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button
                  :disabled="disableSummaryCSVDownload"
                  variant="success"
                  @click="showTosModalCsv('summary')"
                  >Download summary data
                </b-button>
                <b-button variant="success" @click="showTosModalCsv('points')"
                  >Download data for selected geo units
                </b-button>
                <b-button variant="danger" @click="hideDataInRangeModal">
                  OK
                </b-button>
              </template>
            </b-modal>
            <b-modal
              id="modal-opacity"
              size="l"
              centered
              scrollable
              title="Map Opacity"
            >
              <b-row>
                <b-col cols="12">
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
                      <b-tooltip placement="bottom" target="help-opacity"
                        >Select opacity for geographic units.</b-tooltip
                      >
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
              </b-row>
              <template #modal-footer>
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button variant="danger" @click="hideOpacityModal">
                  OK
                </b-button>
              </template>
            </b-modal>
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
                      <b-tooltip
                        placement="top"
                        target="help-geography-units"
                        >{{ selectGeoUnitsToolTipText }}</b-tooltip
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
                      <b-tooltip placement="bottom" target="help-opacity"
                        >Select opacity for geographic units.</b-tooltip
                      >
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
                      <b-tooltip placement="bottom" target="help-geolabel"
                        >Turn geo unit labels on or off.</b-tooltip
                      >
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
                    id="fieldset_horizontal_countSelector"
                    label-cols-sm="6"
                    label-cols-lg="6"
                    content-cols-sm
                    content-cols-lg="6"
                    label="Multiple Geo Unit Selector Mode"
                    label-for="input_horizontal_countSelector"
                  >
                    <template slot="label">
                      Multiple Geo Unit Selector Mode
                      <i
                        class="far fa-question-circle text-danger"
                        id="help-count-selector"
                      ></i>
                      <b-tooltip placement="bottom" target="help-count-selector"
                        >Turn Multiple Geo Unit Selector Mode on to select and
                        display segment data for one or more geographic units.
                        Hold the Shift key and then click and drag your cursor
                        to select and display data for multiple units, or simply
                        click a single unit to display data for that
                        unit.</b-tooltip
                      >
                    </template>
                    <b-form-checkbox
                      id="countSelector-checkbox-1"
                      v-model="countSelector"
                      name="checkbox-1"
                      value="On"
                      unchecked-value="Off"
                      size="md"
                      switch
                      :state="false"
                      class="mt-2"
                    >
                      {{ countSelector }}
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
                  <template #cell(Color)="data">
                    <b-badge
                      :style="{
                        font_size: '16px',
                        'background-color': dropPinColors.filter(
                          (color) => color.id == data.value
                        )[0].color,
                        color: '#fff',
                      }"
                    >
                      {{ data.value }}</b-badge
                    >
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
              title="US Intra-market Mapping Tutorial Library"
              hide-footer
            >
              <template #modal-title>
                US Intra-market Mapping Tutorial Library
              </template>
              <b-row>
                <b-col cols="12">
                  <b-list-group class="overflow-auto" style="height: 550px">
                    <b-list-group-item
                      v-for="(video, index) in videos"
                      :key="index"
                      @click="selectVideo(index)"
                      :active="
                        selectedVideo && selectedVideo.video.id == index + 1
                      "
                    >
                      <a :key="index" @click="selectVideo(index)">
                        <b-row
                          @click="selectVideo(index)"
                          class="video_option_row"
                        >
                          <b-col cols="9">
                            <h3 class="playlist-video-title">
                              {{ video.video.title }}
                            </h3>
                            <p class="playlist-video-description">
                              {{ video.video.description }}
                            </p>
                          </b-col>
                          <b-col cols="3">
                            <b-img
                              :src="video.video.pic"
                              :alt="video.video.title"
                              fluid
                            ></b-img>
                          </b-col>
                        </b-row>
                      </a>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </b-modal>
            <b-modal
              id="modal-video-tutorial-video"
              size="xl"
              centered
              :title="selectedVideoTitle"
              hide-footer
            >
              <template #modal-title> {{ selectedVideoTitle }}</template>
              <b-row>
                <b-col cols="12">
                  <b-aspect :aspect="aspect">
                    <d-player
                      :options="selectedVideo"
                      @play="play"
                      ref="dplayer"
                      style="min-height: 400px; height: 550px"
                    >
                    </d-player>
                  </b-aspect>
                </b-col>
              </b-row>
            </b-modal>

            <b-modal
              id="modal-loading"
              size="s"
              centered
              scrollable
              title="Loading data"
              v-model="initialLoading"
              hide-header
              hide-footer
            >
              <b-row>
                <b-col cols="12" class="pt-6">
                  <div
                    class="d-flex justify-content-center align-items-center mt-2"
                  >
                    <div>
                      <b-spinner
                        label="Loading Toolkit..."
                        variant="danger"
                        style="width: 3rem; height: 3rem"
                      ></b-spinner>
                    </div>
                    <div class="ml-3">
                      <h3 class="mt-2">Loading Data</h3>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-modal>
            <div id="settings" class="mt-2">
              <div class="map-menu" :class="{ isFullScreen: fullscreen }">
                <!--<b-row v-if="showSettings">
                  <b-col cols="12">
                    <b-form-group
                      id="countrySelector"
                      label-cols="auto"
                      label="Country"
                      v-slot="{ ariaDescribedby }"
                      style="margin-right: 32px"
                    >
                      <b-form-radio-group
                        id="countryRadio"
                        v-model="country"
                        :options="countryOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radio-options2"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>-->
                <b-row v-if="showSettings">
                  <b-col cols="3">
                    <b-form-group
                      id="marketTypeSelectorIntra"
                      label-cols="auto"
                      label="Market type"
                      v-slot="{ ariaDescribedby3 }"
                      class="mb-0 mt-2"
                    >
                      <b-form-radio-group
                        id="marketTypeRadioIntra"
                        v-model="selectedMarketType"
                        :options="selectedMarketTypeOptions"
                        :aria-describedby="ariaDescribedby3"
                        :disabled="false"
                        name="radio-options-2"
                      >
                      </b-form-radio-group>
                    </b-form-group>

                    <v-select
                      v-model="selectedMarket"
                      :options="selectedComputedMarketOptions"
                      :reduce="(market) => market.code"
                      :clearable="false"
                      :disabled="disableInputs"
                      class="col-9 pl-0"
                    ></v-select>
                    <!-- </b-form-group> -->
                  </b-col>
                  <b-col cols="3" class="pt-2">
                    <b-form-group
                      label="Head of household age"
                      v-slot="{ ariaDescribedby }"
                      class="py-2"
                      label-class="py-0"
                    >
                      <b-form-radio-group
                        id="btn-radios-age-segment"
                        v-model="selectedAgeSegment"
                        :options="computedSelectedAgeSegmentOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="mt-2 px-0">
                    <b-form-group
                      label="Head of household income"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="selectedIncomeSegment"
                        :options="computedSelectedIncomeSegmentOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="mt-2 px-0">
                    <b-form-group
                      label="Ethnicity"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-radio-group
                        id="btn-radios-ethnicity-segment"
                        v-model="selectedEthnicity"
                        :options="computedSelectedEthnicityOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="5">
                    <b-form-group v-if="showSettings" label="Data type">
                      <v-select
                        v-model="selectedDataType"
                        :options="selectedDataTypeOptions"
                        :reduce="(dataType) => dataType.code"
                        :clearable="false"
                        :selectable="(option) => !option.disabled"
                        :disabled="disableInputs"
                        class="col-9 pl-0"
                      ></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group
                      v-if="showSettings"
                      id="fieldset_horizontal_data_series"
                      label="Data series"
                      label-for="input_horizontal_data_series"
                      class="col-8 pl-0"
                    >
                      <v-select
                        v-model="selectedDataSeries"
                        :options="selectedDataSeriesOptions"
                        :clearable="false"
                        :disabled="disableInputs"
                      ></v-select>
                    </b-form-group>
                  </b-col>

                  <!-- <b-col cols="12" class="float-right"> -->
                  <b-col class="mt-4 pt-1 pr-0">
                    <div v-if="showSettings">
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
                    </div>
                    <div :class="showSettings ? 'float-right' : 'float-right'">
                      <div
                        id="geolabels-button"
                        class="icon icon-geolabels"
                        v-if="showSettings"
                        :class="{ active: geoLabelVisibility === 'On' }"
                        @click="toggleGeoLabels"
                      >
                        <b-tooltip
                          placement="bottom"
                          target="geolabels-button"
                          >{{ selectGeoLabelsToolTipText }}</b-tooltip
                        >
                      </div>
                      <div
                        id="opacity-button"
                        class="icon icon-opacity"
                        :class="{ active: false }"
                        v-if="showSettings"
                        @click="showOpacityModal"
                      >
                        <b-tooltip placement="bottom" target="opacity-button"
                          >Opacity</b-tooltip
                        >
                      </div>
                      <div
                        id="select-button"
                        class="icon icon-select"
                        :class="{
                          active: contiguousCountSelector === 'On',
                        }"
                        @click="toggleCountSelector('contiguous')"
                        v-if="showSettings"
                      >
                        <b-tooltip placement="bottom" target="select-button">{{
                          toggleContiguousCountSelectorToolTipText
                        }}</b-tooltip>
                      </div>
                      <div
                        id="check-button"
                        class="icon icon-check"
                        :class="{
                          active: distinctCountSelector === 'On',
                        }"
                        @click="toggleCountSelector('distinct')"
                        v-if="showSettings"
                      >
                        <b-tooltip placement="bottom" target="check-button">{{
                          toggleDistinctCountSelectorToolTipText
                        }}</b-tooltip>
                      </div>
                      <div
                        id="downloaddoc-button"
                        class="icon icon-downloaddoc"
                        :class="{ active: false }"
                        @click="showTosModalCsv('csv')"
                        v-if="showSettings"
                      >
                        <b-tooltip
                          placement="bottom"
                          target="downloaddoc-button"
                          >Download CSV</b-tooltip
                        >
                      </div>
                      <div
                        id="downloadimg-button"
                        class="icon icon-downloadimg"
                        :class="{ active: false }"
                        @click="downloadImage"
                      >
                        <b-tooltip
                          placement="bottom"
                          target="downloadimg-button"
                          >Download map image</b-tooltip
                        >
                      </div>
                      <div
                        id="pin-button"
                        class="icon icon-pin v-b-modal modal-drop-location"
                        :class="{ active: pointDataLength > 0 }"
                        @click="showDropLocationModal"
                        v-if="showSettings"
                      >
                        <b-tooltip placement="bottom" target="pin-button"
                          >Add custom location points to map</b-tooltip
                        >
                      </div>
                      <div
                        id="mathpin-button"
                        class="icon icon-mathpin"
                        :class="{ active: pointDataLength > 0 }"
                        @click="showDataInRangeModal"
                        v-show="pointDataLength > 0"
                        v-if="showSettings"
                      >
                        <b-tooltip placement="bottom" target="mathpin-button"
                          >Build summary reports for custom location
                          points</b-tooltip
                        >
                      </div>

                      <div
                        v-if="!fullscreen"
                        id="maximize-button"
                        class="icon icon-maximize icon-fa"
                        :class="{ active: false }"
                        @click="toggleFullScreen"
                      >
                        <b-tooltip placement="bottom" target="maximize-button"
                          >Turn full screen mode on</b-tooltip
                        >
                      </div>
                      <div
                        v-if="fullscreen"
                        id="minimize-button"
                        class="icon icon-minimize icon-fa"
                        :class="{ active: false }"
                        @click="toggleFullScreen"
                      >
                        <b-tooltip placement="bottom" target="minimize-button"
                          >Turn full screen mode off</b-tooltip
                        >
                      </div>
                      <div
                        v-b-toggle.settings-collapse
                        id="point-button"
                        class="icon icon-point"
                        :class="{
                          active: false,
                          'icon-point-active': !showSettings,
                        }"
                        v-if="fullscreen"
                        @click="toggleShowSettings"
                      >
                        <b-tooltip placement="bottom" target="point-button"
                          >Show or hide settings pane.</b-tooltip
                        >
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- </b-collapse> -->

            <div class="map">
              <b-row>
                <b-col cols="12" class="px-0">
                  <section
                    class="map_box_container"
                    :class="{ isFullScreen: fullscreen }"
                  >
                    <div id="overlay" v-show="loading && !initialLoading">
                      <div
                        class="w-100 d-flex justify-content-center align-items-center"
                      >
                        <div class="spinner"></div>
                        <div class="spinner-text">Loading Market Data</div>
                      </div>
                    </div>
                    <img
                      v-show="showMapTitle"
                      id="attributionLogo"
                      class="attribution-logo"
                      src="./assets/bain-attribution-small.svg"
                    />

                    <div id="mapContainer" :class="fullscreen"></div>

                    <div
                      id="legend"
                      class="legend legend-bottom"
                      :class="fullscreen ? 'legend-fullscreen' : ''"
                    >
                      <div class="legend-body">
                        <div
                          class="aside aside-1"
                          :style="{ background: createBackgroundString }"
                        ></div>
                        <div class="main">
                          <div class="legend-top">
                            {{ this.currentSegmentMaxValue }}
                          </div>
                          <div
                            class="legend-zero"
                            v-if="parseFloat(this.currentSegmentMinValue) < 0.0"
                          >
                            {{ this.currentSegmentZeroValue }}
                          </div>
                          <!-- <div>100</div> -->
                          <div class="legend-min">
                            {{ this.currentSegmentMinValue }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="mapTitle" v-if="showMapTitle" class="mapTitle">
                      <h5>{{ this.mapTitleForSelectedOptions }}</h5>
                    </div>

                    <div
                      id="geoCounter"
                      :class="[
                        showMapTitle ? 'geocounter-download' : '',
                        showGeoCounter ? 'geocounter' : '',
                      ]"
                    >
                      <h5>{{ this.geoCounterString }}</h5>
                    </div>
                  </section>
                </b-col>
              </b-row>
            </div>

            <b-row style="min-height: 60px"> </b-row>
          </fullscreen>
        </b-tab>
        <b-tab title="Inter-Market Flows">
          <fullscreen
            v-model="flowFullScreen"
            v-on:change="toggleFlowFullScreen"
            teleport
          >
            <div id="settingsFlow" class="">
              <div
                class="map-menu"
                :class="{ isFlowFullScreen: flowFullScreen }"
              >
                <b-row v-if="flowShowSettings">
                  <b-col cols="5">
                    <b-form-group
                      id="flowMarketTypeSelectorRadio"
                      label-cols="auto"
                      label="Market type"
                      v-slot="{ ariaDescribedby2 }"
                      class="mb-0"
                    >
                      <b-form-radio-group
                        id="marketTypeRadioFlow"
                        v-model="flowSelectedMarketType"
                        :options="flowMarketTypeOptions"
                        :aria-describedby="ariaDescribedby2"
                        :disabled="flowDisableInputs"
                        name="radio-options"
                        style="padding-top: 7px"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                    <v-select
                      v-model="flowSelectedMarket"
                      :options="flowComputedMarketOptions"
                      :reduce="(market) => market.code"
                      :clearable="false"
                      class="col-9 pl-0"
                      ref="flowSelectedMarket"
                    ></v-select>

                    <!-- </b-form-group> -->
                  </b-col>
                  <b-col cols="3" class="pt-2">
                    <b-form-group
                      label="Head of household age"
                      v-slot="{ ariaDescribedby }"
                      class="py-2"
                      label-class="py-0"
                    >
                      <b-form-radio-group
                        id="btn-radios-age-segment"
                        v-model="flowSelectedAgeSegment"
                        :options="flowAgeSegmentOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="flowDisableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col cols="4" class="mt-2">
                    <b-form-group
                      label="Head of household income"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="flowSelectedIncomeSegment"
                        :options="flowIncomeSegmentOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="flowDisableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="10">
                    <b-form-group
                      label="Movement direction"
                      v-slot="{ ariaDescribedby }"
                      class=""
                      style="display: inline-block"
                      v-if="flowShowSettings"
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="flowSelectedMovementDirection"
                        :options="flowMovementDirectionOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                        ref="flowMovementDirection"
                      >
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group
                      label="Exclude same state movement?"
                      v-slot="{ ariaDescribedby }"
                      class="ml-3"
                      style="display: inline-block"
                      v-if="flowSelectedMarketType == 'metro_areas'"
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="flowExcludeWithinState"
                        :options="flowExcludeWithinStateOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="flowSelectedMarketType == 'states'"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>

                    <b-form-group
                      label="# of top movement markets to display"
                      v-slot="{ ariaDescribedby }"
                      class="ml-3"
                      style="display: inline-block"
                      v-if="
                        flowSelectedMarketType == 'states' && flowShowSettings
                      "
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="flowSelectedStatesOption"
                        :options="flowStatesListOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                    <b-form-group
                      label="# of top movement markets to display"
                      v-slot="{ ariaDescribedby }"
                      v-if="
                        flowSelectedMarketType == 'metro_areas' &&
                        flowShowSettings
                      "
                      class="pr-4 ml-3"
                      style="display: inline-block"
                    >
                      <b-form-radio-group
                        id="btn-radios-income-segment"
                        v-model="flowSelectedMetroAreaOption"
                        :options="flowMetroAreaListOptions"
                        :aria-describedby="ariaDescribedby"
                        :disabled="disableInputs"
                        name="radios-btn-default"
                        buttons
                        button-variant="outline-danger"
                        size="sm"
                      >
                      </b-form-radio-group>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <!-- <b-col cols="12" class="float-right"> -->
                    <div
                      :class="[
                        flowFullScreen && !flowShowSettings ? 'mt-0' : 'mt-4',
                        flowShowSettings ? 'float-right' : 'float-right',
                      ]"
                    >
                      <div
                        id="flow-downloaddoc-button"
                        class="icon icon-downloaddoc"
                        :class="{ active: false }"
                        @click="showTosModalCsv('flow')"
                        v-if="flowShowSettings"
                      >
                        <b-tooltip
                          placement="top"
                          target="flow-downloaddoc-button"
                          >Download CSV</b-tooltip
                        >
                      </div>
                      <div
                        id="flow-downloadimg-map-button"
                        class="icon icon-downloadimg"
                        :class="{ active: false }"
                        @click="downloadFlowMapImage"
                      >
                        <b-tooltip
                          placement="top"
                          target="flow-downloadimg-map-button"
                          >Download image</b-tooltip
                        >
                      </div>

                      <div
                        v-if="!flowFullScreen"
                        id="flow-maximize-button"
                        class="icon icon-maximize icon-fa"
                        :class="{ active: false }"
                        @click="toggleFlowFullScreen"
                      >
                        <b-tooltip
                          placement="bottom"
                          target="flow-maximize-button"
                          >Turn full screen mode on</b-tooltip
                        >
                      </div>
                      <div
                        v-if="flowFullScreen"
                        id="flow-minimize-button"
                        class="icon icon-minimize icon-fa"
                        :class="{ active: false }"
                        @click="toggleFlowFullScreen"
                      >
                        <b-tooltip
                          placement="bottom"
                          target="flow-minimize-button"
                          >Turn full screen mode off</b-tooltip
                        >
                      </div>
                      <div
                        v-b-toggle.settings-collapse
                        id="point-button"
                        class="icon icon-point"
                        :class="{
                          active: false,
                          'icon-point-active': !showSettings,
                        }"
                        v-if="fullscreen"
                        @click="toggleShowSettings"
                      >
                        <b-tooltip placement="bottom" target="point-button"
                          >Show or hide settings pane.</b-tooltip
                        >
                      </div>
                      <div
                        id="flow-point-button"
                        class="icon icon-point"
                        :class="{
                          active: false,
                          'icon-point-active': !flowShowSettings,
                        }"
                        v-if="flowFullScreen"
                        @click="toggleflowShowSettings"
                      >
                        <b-tooltip placement="bottom" target="flow-point-button"
                          >Show or hide settings pane.</b-tooltip
                        >
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div class="map">
              <b-row
                id="flow_image_container"
                :class="{ isFullScreen: flowFullScreen }"
              >
                <b-col class="px-0">
                  <section
                    class="flow_map_box_container"
                    :class="{ isFullScreen: flowFullScreen }"
                  >
                    <div
                      id="dataTableToggleButton"
                      @click="dataTableToggleVisibility"
                    >
                      <i class="icon icon-table-list"></i>
                    </div>
                    <div
                      id="flowMapTitleSection"
                      :class="{ flowShowSettings: flowShowSettings }"
                    >
                      <div
                        id="flowMapTitle"
                        v-if="showFlowMapTitle"
                        class="mapTitle"
                      >
                        <h5>{{ this.flowMapTitleForSelectedOptions }}</h5>
                      </div>
                      <div
                        id="flowRange"
                        class="flowrange"
                        :class="[showFlowMapTitle ? 'flowrange-download' : '']"
                      >
                        <h5>{{ this.flowSelectedEstimatedRangeText }}</h5>
                      </div>
                    </div>

                    <img
                      v-show="showFlowMapTitle"
                      id="flowAttributionLogo"
                      class="attribution-logo"
                      src="./assets/bain-attribution-small.svg"
                    />
                    <div
                      id="flowmap"
                      :class="{ isFullScreen: flowFullScreen }"
                    ></div>
                    <div id="deckglmap"></div>
                  </section>
                </b-col>
                <b-col
                  id="dataTableContainer"
                  :cols="flowFullScreen ? 3 : 4"
                  :class="this.dataTableVisibility ? '' : 'd-none'"
                  style="
                    padding: 10px;
                    background: #fff;
                    overflow-y: scroll;
                    height: 60vh;
                    z-index: 10;
                  "
                >
                  <div class="datatable">
                    <h4>{{ dataTableTitle }}</h4>
                    <p
                      style="
                        font-size: 12px;
                        font-family: graphik-regular, sans-serif;
                      "
                    >
                      <b
                        ><span
                          v-html="flowSelectedEstimatedRangeTextSplit"
                        ></span
                      ></b>
                    </p>
                    <div class="mt-3">
                      <b-table
                        sticky-header="400px"
                        bordered
                        outlined
                        small
                        hover
                        style="font-size: 12px"
                        :items="flowDataTableData"
                        :fields="dataTableFields"
                        primary-key="rank"
                      >
                        <template #cell(formattedPercent)="data">
                          {{ data.item.percent }}
                        </template>
                        <template #cell(selected)="data">
                          <b-form-checkbox
                            v-model="data.item.selected"
                            @change="onSelectedClick($event)"
                          ></b-form-checkbox>
                        </template>
                      </b-table>
                    </div>
                  </div>
                  <p
                    style="
                      font-size: 12px;
                      font-family: graphik-regular, sans-serif;
                    "
                  >
                    <b>Methodology</b>
                  </p>
                  <p
                    style="
                      font-size: 12px;
                      font-family: graphik-regular, sans-serif;
                    "
                  >
                    To generate these views, we compared data from public
                    records across states and metro areas for the date ranges
                    provided. By tracking individuals who started in one
                    location at the beginning of the time period and ended up in
                    another in the final year of the period, we are able to
                    determine aggregate flows between markets.
                  </p>
                  <p
                    style="
                      font-size: 12px;
                      font-family: graphik-regular, sans-serif;
                    "
                  >
                    Because some states and metros have different record-keeping
                    procedures than others and different demographics are
                    officially recorded in new metros at different speeds, there
                    can be some lags in a given year's data. To account for
                    these lags, we have created estimated ranges of population
                    flows to avoid false precision. The views generated by this
                    tool are intended to be used for understanding relative
                    flows (and the magnitudes of these flows) between metros and
                    states, not for understanding exact counts of population
                    changes.
                  </p>
                  <p
                    style="
                      font-size: 12px;
                      font-family: graphik-regular, sans-serif;
                    "
                  >
                    Users may notice that the estimated mover ranges provided by
                    this tool can be lower than the counts in many publicly
                    available migration data sources. This is because our data
                    source only includes individuals aged 18 and above who were
                    associated with different locations in the starting and
                    ending years of a date range.
                  </p>
                </b-col>
              </b-row>
            </div>
            <b-modal
              id="flow-modal-loading"
              size="s"
              centered
              scrollable
              title="Loading data"
              v-model="flowLoading"
              hide-header
              hide-footer
            >
              <b-row>
                <b-col cols="12" class="pt-6">
                  <div
                    class="d-flex justify-content-center align-items-center mt-2"
                  >
                    <div>
                      <b-spinner
                        label="Loading Toolkit..."
                        variant="danger"
                        style="width: 3rem; height: 3rem"
                      ></b-spinner>
                    </div>
                    <div class="ml-3">
                      <h3 class="mt-2">Loading Data</h3>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-modal>
            <b-row style="min-height: 160px"> </b-row>
          </fullscreen>
        </b-tab>
        <!-- 
        <b-tab title="Market Summary">
          <b-row class="mb-3">
            <b-col cols="3">
              <b-form-group
                id="fieldset_horizontal_market"
                label="Market"
                label-for="input_horizontal_market"
                class="pr-2"
              >
                <v-select
                  v-model="selectedSummaryMarket"
                  style="font-size: 14px"
                  :options="selectedComputedSummaryMarketOptions"
                  :clearable="false"
                  :reduce="(market) => market.code"
                ></v-select>
              </b-form-group>
            </b-col>

            <b-col cols="2">
              <b-form-group
                id="fieldset_horizontal_data_series_summary"
                label="Start year"
                label-for="input_horizontal_data_series"
              >
                <v-select
                  v-model="selectedStartYearSummary"
                  :options="selectedStartYearOptionsSummary"
                  :clearable="false"
                ></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="2">
              <b-form-group
                id="fieldset_horizontal_data_series_summary"
                label="End year"
                label-for="input_horizontal_data_series"
                class="ml-2"
              >
                <v-select
                  v-model="selectedEndYearSummary"
                  :options="selectedEndYearOptionsSummary"
                  :clearable="false"
                ></v-select>
              </b-form-group>
            </b-col>

            <b-col cols="5">
              <b-row class="mb-5 mt-2 float-right" style="float: right">
                <b-button-group
                  id="chartLegend"
                  style="padding-top: 18px; float: right"
                >
                  <b-button
                    :variant="highlightChartUrbanVariant"
                    size="sm"
                    :style="`
                      margin-left: 10px;
                      
                      margin-right: 10px;
                      min-width: 120px; 
                      font-size: 10px;
                      color: ${urbanTextColor};
                      background-color: ${urbanBackgroundColor};
                      border-color: ${urbanBackgroundColor}`"
                    :pressed.sync="highlightChartUrban"
                  >
                    Urban <br />(0 to 7.5mi)</b-button
                  >

                  <b-button
                    :variant="highlightChartSubUrbanVariant"
                    size="sm"
                    :style="`
                      margin-left: 10px;
                      margin-right: 10px;
                      min-width: 120px;
                      font-size: 10px;
                      background-color: #9a0102;
                      border-color: #9a0102;
                      color: ${subUrbanTextColor};
                      background-color: ${subUrbanBackgroundColor};
                      border-color: ${subUrbanBackgroundColor}`"
                    :pressed.sync="highlightChartSubUrban"
                  >
                    Suburban <br />
                    (7.5 to 20mi)</b-button
                  >

                  <b-button
                    :variant="highlightChartExUrbanVariant"
                    size="sm"
                    :style="`
                      margin-left: 10px;
                      margin-right: 10px;
                      min-width: 120px;
                      font-size: 10px;
                      color: ${exUrbanTextColor};
                      background-color: ${exUrbanBackgroundColor};
                      border-color: ${exUrbanBackgroundColor}`"
                    :pressed.sync="highlightChartExUrban"
                  >
                    Exurban <br />
                    (> 20mi)</b-button
                  >
                </b-button-group>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4">
              <AllChart
                :market="marketNameWithCaveat"
                :x-axis-labels="marketAllChartsDataYearLabels"
                :chart-data="selectedMarketSummaryTotalChartsData"
                :start-year="selectedStartYearSummary"
                :end-year="selectedEndYearSummary"
                :highlight-chart-urban="highlightChartUrban"
                :highlight-chart-sub-urban="highlightChartSubUrban"
                :highlight-chart-ex-urban="highlightChartExUrban"
                chart-title="Total Population"
                chart-slug="total_population"
              /> 
            </b-col>
            <b-col cols="4">
              <AgeChart
                :market="marketNameWithCaveat"
                :x-axis-labels="marketAgeChartsDataYearLabels"
                :chart-data="selectedMarketSummaryAgeChartsData"
                :start-year="selectedStartYearSummary"
                :end-year="selectedEndYearSummary"
                :highlight-chart-urban="highlightChartUrban"
                :highlight-chart-sub-urban="highlightChartSubUrban"
                :highlight-chart-ex-urban="highlightChartExUrban"
                chart-title="Age"
                chart-slug="age"
              />
            </b-col>
            <b-col cols="4">
              <IncomeChart
                :market="marketNameWithCaveat"
                :x-axis-labels="marketIncomeChartsDataYearLabels"
                :chart-data="selectedMarketSummaryIncomeChartsData"
                :start-year="selectedStartYearSummary"
                :end-year="selectedEndYearSummary"
                :highlight-chart-urban="highlightChartUrban"
                :highlight-chart-sub-urban="highlightChartSubUrban"
                :highlight-chart-ex-urban="highlightChartExUrban"
                chart-title="Income"
                chart-slug="income"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <FullChart
                :market="marketNameWithCaveat"
                :x-axis-labels="marketFullChartsDataYearLabels"
                :chart-data="selectedMarketSummaryAgeAndIncomeChartsData"
                :start-year="selectedStartYearSummary"
                :end-year="selectedEndYearSummary"
                :highlight-chart-urban="highlightChartUrban"
                :highlight-chart-sub-urban="highlightChartSubUrban"
                :highlight-chart-ex-urban="highlightChartExUrban"
                chart-title="Age + Income"
                chart-slug="age_plus_income"
              />
            </b-col>
          </b-row>

          <b-row> </b-row>
        </b-tab>
        -->
        <b-tab title="Multi-Market Comparison">
          <b-row>
            <b-col cols="3">
              <b-button
                variant="danger"
                @click="selectComparisonMarkets"
                style="margin-top: 23px"
              >
                Select markets
              </b-button>
            </b-col>
            <b-col cols="4">
              <b-form-group
                label="Head of household age"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-radio-group
                  id="btn-radios-age-segment"
                  v-model="selectedAgeSegmentComp"
                  :options="selectedAgeSegmentCompOptions"
                  :aria-describedby="ariaDescribedby"
                  name="radios-btn-default"
                  buttons
                  button-variant="outline-danger"
                  size="sm"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="5">
              <b-form-group
                label="Head of household income"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-radio-group
                  id="btn-radios-income-segment"
                  v-model="selectedIncomeSegmentComp"
                  :options="selectedIncomeSegmentCompOptions"
                  :aria-describedby="ariaDescribedby"
                  name="radios-btn-default"
                  buttons
                  button-variant="outline-danger"
                  size="sm"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-4">
            <b-col cols="12">
              <b-row class="mb-5 mt-2">
                <b-col cols="2">
                  <b-form-group
                    id="fieldset_horizontal_data_series"
                    label="Start year"
                    label-for="input_horizontal_data_series"
                  >
                    <v-select
                      v-model="selectedStartYearComp"
                      :options="selectedStartYearOptionsComp"
                      :clearable="false"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="2">
                  <b-form-group
                    id="fieldset_horizontal_data_series"
                    label="End year"
                    label-for="input_horizontal_data_series"
                  >
                    <v-select
                      v-model="selectedEndYearComp"
                      :options="selectedEndYearOptionsComp"
                      :clearable="false"
                    ></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="8">
                  <b-button-group
                    id="chartLegend2"
                    style="padding-top: 26px; float: right"
                  >
                    <b-button
                      variant="highlightChartUrbanVariant"
                      size="sm"
                      :style="`
                        margin-right: 10px;
                        margin-left: 10px;
                        min-width: 120px;
                        font-size: 10px;
                        color: ${urbanTextColor};
                        background-color: ${urbanBackgroundColor};
                        border-color: ${urbanBackgroundColor}`"
                      :pressed.sync="highlightChartUrban"
                    >
                      Urban <br />
                      (0 to 7.5mi)</b-button
                    >

                    <b-button
                      variant="highlightChartSubUrbanVariant"
                      size="sm"
                      :style="`
                        margin-right: 10px;
                        margin-left: 10px;
                        min-width: 120px;
                        font-size: 10px;
                        color: ${subUrbanTextColor};
                        background-color: ${subUrbanBackgroundColor};
                        border-color: ${subUrbanBackgroundColor}`"
                      :pressed.sync="highlightChartSubUrban"
                    >
                      Suburban<br />
                      (7.5 to 20mi)</b-button
                    >

                    <b-button
                      variant="highlightChartExUrbanVariant"
                      size="sm"
                      :style="`
                        margin-right: 10px;
                        margin-left: 10px;
                        min-width: 120px;
                        font-size: 10px;
                        color: ${exUrbanTextColor};
                        background-color: ${exUrbanBackgroundColor};
                        border-color: ${exUrbanBackgroundColor}`"
                      :pressed.sync="highlightChartExUrban"
                    >
                      Exurban <br />
                      (> 20mi)
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="pt-4">
              Comparison chart
              <ComparisonChart
                :dataOptions="dataOptions"
                :market="
                  marketSettingsData[selectedSummaryMarket].Market_Display_Name
                "
                :age-segment="selectedAgeSegmentComp"
                :income-segment="selectedIncomeSegmentComp"
                :x-axis-labels="marketComparisonChartsDataYearLabels"
                :chart-data="selectedMarketComparisonChartsData"
                :market-settings-data="marketSettingsData"
                :start-year="selectedStartYearComp"
                :end-year="selectedEndYearComp"
                :highlight-chart-urban="highlightChartUrban"
                :highlight-chart-sub-urban="highlightChartSubUrban"
                :highlight-chart-ex-urban="highlightChartExUrban"
                chart-title=" "
                chart-slug="multi_market_comparison"
              />
            </b-col>
          </b-row>
          <b-modal
            id="modal-markets-comparison"
            size="xl"
            centered
            scrollable
            title="Multi-Market Comparison"
            style="min-height: 50vh"
          >
            <b-row>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 1"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp1"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                    :clearable="false"
                  ></v-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 2"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp2"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                    :clearable="false"
                  ></v-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 3"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp3"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                  ></v-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 4"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp4"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                  ></v-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 5"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp5"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                  ></v-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  id="fieldset_horizontal_data_series"
                  label="Metro area 6"
                  label-for="input_horizontal_data_series"
                >
                  <v-select
                    v-model="selectedMarketsComp6"
                    :options="selectedComputedSummaryMarketOptions"
                    :reduce="(market) => market.code"
                  ></v-select>
                </b-form-group>
              </b-col>
            </b-row>
            <template #modal-footer>
              <b-button variant="danger" @click="hideMarketComparisonModal">
                OK
              </b-button>
            </template>
          </b-modal>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>



<script>
import VueFullscreen from "vue-fullscreen";
import mapboxgl from "mapbox-gl";
// TODO: Mexico testing
import videoPlaylistData from "../public/intramarkettool_video_library_us_v1.json";
// import videoPlaylistData from "../public/intramarkettool_video_library_mex_v1.json";
import marketSettingsData from "../public/geospatial_settings_v3.json";
// import intramarketMarketSettingsData from "../public/mexico_geospatial_settings_v3.json";
// import mexicoMarketSettingsData from "../public/mexico_geospatial_settings_v3.json";
import intramarketMarketSettingsData from "../public/geospatial_settings_v3.json";
import intramarketMarketSettingsDataV4 from "../public/geospatial_settings_v3.json";
import usMarketSettingsData from "../public/geospatial_settings_v3.json";
import usMarketSettingsDataV4 from "../public/geospatial_settings_v3.json";
import marketSummaryChartsData from "../public/market_summary_charts_v3.json";
import marketComparisonChartsData from "../public/market_comparison_charts_v3.json";
import dataOptions from "../public/data_options_v3.json";
// import intermarketLocationData from "../public/intramarketdata-20221026-locations.json";
// import intermarketFlowsData from "../public/intramarketdata-20221026-flows.json";
import Papa from "papaparse";
// import Multiselect from 'vue-multiselect'
import BEditableTable from "bootstrap-vue-editable-table";
import { BIconX } from "bootstrap-vue";
import html2canvas from "html2canvas";
import {
  flowIncomeSegmentOptions,
  flowAgeSegmentOptions,
  flowDirectionOptions,
  flowMarketTypeOptions,
  flowMetroAreaListOptions,
  flowStatesListOptions,
  flowMovementDirectionOptions,
  flowExcludeWithinStateOptions,
  getSegmentIndex,
  tooltipHtml,
  getIntermarketData,
  countToRange,
} from "./helpers/intermarket.js";
import {
  validLatitude,
  validLongitude,
  geoDistance,
  featuresInRangeOfPoints,
  featuresInRangeOfPointsCsv,
  featuresInRangeOfPointsCsvNew,
  featuresInRangeOfPointsNew,
  featuresInBoundingBox,
  featureRanges,
} from "./helpers/geo_calculations";
import { slugify } from "./helpers/slugify";
import {
  findMarketSegmentData,
  findMarketSegmentDataV4,
  optionsListToObjectArray,
  // optionsListToObjectArraySelect,
  optionsListToObjectArrayWithMapping,
  optionsListToObjectArrayWithMappingCodeLabel,
  optionsListToObjectArrayWithMappingCodeLabelForDataSeries,
  renameDataSeries,
} from "./helpers/market_segment";
// import FullChart from "./components/FullChart";
// import AllChart from "./components/AllChart";
// import AgeChart from "./components/AgeChart";
// import IncomeChart from "./components/IncomeChart";
import ComparisonChart from "./components/ComparisonChart";
// import DonutChart from "./components/DonutChart";
import vSelect from "vue-select";

import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import { GeoJsonLayer, ArcLayer } from "@deck.gl/layers";
import { FlowmapLayer } from "./flowmap/layers";
import { getViewStateForLocations } from "./flowmap/data";
import { fetchData, initLilGui, UI_INITIAL } from "./flowmap/common";
import debounce from "./helpers/debounce.js";
import { GUI } from "lil-gui";

import Vue from "vue";
Vue.use(VueFullscreen);

export default {
  name: "BaseMap",
  components: {
    BIconX,
    BEditableTable,
    // FullChart,
    // AllChart,
    // AgeChart,
    // IncomeChart,
    ComparisonChart,
    vSelect,
  }, //VSwatches,DonutChart
  data() {
    return {
      videoFileName: "intramarkettool_video_library_us_v1.json",
      pointDataRanges: {},
      player: null,
      play: true,
      aspect: "16:9",
      country: "us",
      countryOptions: [
        { text: "United States", value: "us" },
        { text: "Mexico", value: "mexico" },
      ],
      countryData: {
        us: {
          dma: "DallasFortWorthTX",
          state: "Texas",
          country: "US",
          geoUnits: "bg",
        },
        mexico: {
          dma: "MexicoCity",
          state: "Mexico",
          country: "MX",
          geoUnits: "geo",
        },
      },
      countryChange: false,

      mapVersion: 4,
      compMapVersion: 3,
      intramarketMapVersion: 3,

      // videoOptions: {
      //   video: {
      //     url: "/orientation-video-draft.mp4",
      //     pic: "/orientation-video-preview.png",
      //   },
      //   autoplay: false,
      // },

      // https://integration.mtg.bain.com/globalassets/mtg/media/videos/orientation-video-preview.png
      // https://integration.mtg.bain.com/globalassets/mtg/media/videos/geospatial-tool-training-videos/orientation-video-preview.png

      // videoOptions: {
      //   video: {
      //     url: "/globalassets/mtg/media/videos/geospatial-tool-training-videos/orientation-video-draft.mp4",
      //     pic: "/globalassets/mtg/media/videos/geospatial-tool-training-videos/orientation-video-preview.png",
      //   },
      videoOptions: videoPlaylistData,
      selectedVideoId: 1,
      myVideo: {
        video: {
          id: 1,
          title: "Sample Title Video 1",
          description: "Sample description for the video.",
          url: "/orientation-video-draft.mp4",
          pic: "/orientation-video-preview.png",
        },
        autoplay: false,
      },

      // videoOptions: {
      //   videos: [
      //     {
      //       video: {
      //         id: 1,
      //         title: "Sample Title Video 1",
      //         description: "Sample description for the video.",
      //         url: "/orientation-video-draft.mp4",
      //         pic: "/orientation-video-preview.png",
      //       },
      //       autoplay: false,
      //     },
      //     {
      //       video: {
      //         id: 2,
      //         title: "Sample Title Video 2",
      //         description: "Sample description for the video.",
      //         url: "/orientation-video-draft.mp4",
      //         pic: "/orientation-video-preview.png",
      //       },
      //       autoplay: false,
      //     },
      //     {
      //       video: {
      //         id: 3,
      //         title: "Sample Title Video 3",
      //         description: "Sample description for the video.",
      //         url: "/orientation-video-draft.mp4",
      //         pic: "/orientation-video-preview.png",
      //       },
      //       autoplay: false,
      //     },
      //     {
      //       video: {
      //         id: 4,
      //         title: "Sample Title Video 4",
      //         description: "Sample description for the video.",
      //         url: "/orientation-video-draft.mp4",
      //         pic: "/orientation-video-preview.png",
      //       },
      //       autoplay: false,
      //     },
      //   ],
      //   // mtg/media/videos/geospatialtool/orientation.mp4
      // },
      selectedVideoOptions: {
        id: 1,
        title: "Sample Title Video 1",
        description: "Sample description for the video.",
        url: "orientation-video-draft.mp4",
        pic: "orientation-video-preview.png",
      },
      initialViewState: null,
      flowFirstTime: true,
      flowLoading: false,
      initialFlowLoading: false,
      flowMapLayerVisible: true,
      showFlowMapTitle: false,
      dataTableVisibility: false,
      dataTableSelectedItems: [],
      flowDataTableData: [],
      flowmapHomeControl: null,
      legendZeroColor: "#000000",
      flowMapData: {},
      flowMapDataBase: {},
      flowIncomeSegmentOptions: flowIncomeSegmentOptions,
      flowAgeSegmentOptions: flowAgeSegmentOptions,
      flowDirectionOptions: flowDirectionOptions,
      flowMarketTypeOptions: flowMarketTypeOptions,
      flowExcludeWithinStateOptions: flowExcludeWithinStateOptions,
      flowMetroAreaListOptions: flowMetroAreaListOptions,
      flowStatesListOptions: flowStatesListOptions,
      flowMovementDirectionOptions: flowMovementDirectionOptions,
      flowMap: null,
      flowmapDeckOverlay: null,
      flowFullScreen: false,
      flowShowSettings: true,
      flowDisableInputs: false,
      flowExcludeWithinState: "yes",
      flowSelectedMarket: "DallasFortWorthTX",
      flowMarketListOptions: null,
      flowSelectedDirection: null,
      flowSelectedMarketType: null,
      flowSelectedGeoSegment: "all",
      flowSelectedMetroAreaOption: "metro_areas",
      flowSelectedStatesOption: null,
      flowSelectedMovementDirection: "in",
      flowSelectedAgeSegment: null,
      flowSelectedIncomeSegment: null,
      intermarketData: [],
      intermarketLocationData: [],
      intermarketFlowData: [],
      map_version: 3,
      disableInputs: false,
      // base_asset_url: "/globalassets/mtg/geospatialtool/v1",
      base_asset_url: "",
      geoCounterString: "",
      showGeoCounter: false,
      canvasAnnotation: null,
      initialLoading: true,
      highlightChartUrban: false,
      highlightChartSubUrban: false,
      highlightChartExUrban: true,
      siteLoadingData: true,
      dataOptions: dataOptions,
      selectedIncomeSegmentComp: "1:All",
      selectedIncomeSegmentCompOptions: [],
      selectedAgeSegmentComp: "1:All",
      selectedAgeSegmentCompOptions: [],
      selectedStartYearSummary: "2017",
      selectedEndYearSummary: "2022",
      selectedStartYearComp: "2017",
      selectedEndYearComp: "2022",
      selectedMarketsComp1: "NewYorkNY",
      selectedMarketsComp2: "LosAngelesCA",
      selectedMarketsComp3: "ChicagoIL",
      selectedMarketsComp4: "ClevelandOH",
      selectedMarketsComp5: "HoustonTX",
      selectedMarketsComp6: "WashingtonDC",
      selectedFeatures: [],
      selectedFeaturesCSV: [],
      selectedTotalFeatures: [],
      selectedTotalFeaturesCSV: [],
      showSettings: true,
      selectedTotalSegment: null,
      selectedTotalDataType: "1:Household Count",
      selectedAgeSegment: null,
      selectedAgeSegmentOptions: [],
      selectedIncomeSegment: null,
      selectedIncomeSegmentOptions: [],
      selectedEthnicity: null,
      selectedEthnicityOptions: [],
      ethnicityMappingOptions: [],
      selectedDataType: "1:Household Count",
      selectedDataTypeOptions: [],
      dataTypeMapping: {
        "1:Household Count": "Household count",
        "2:Percent": "Saturation",
        "3:Household Count Change": "Household count change",
        "4:Percent Change": "Saturation shift",
        "5:Growth": "Percent growth",
        "6:Percent Change Nat Adj": "Saturation shift (Nat Adj)",
        "7:Growth Nat Adj": "Percent growth (Nat Adj)",
      },
      // dataTypeNameMappingV4: {
      //   "HH Count": "Household count",
      //   Percent: "Saturation",
      //   "Household Count Change": "Household count change",
      //   "Percent Change": "Saturation shift",
      //   Growth: "Percent growth",
      //   "Percent Change Nat Adj": "Saturation shift (Nat Adj)",
      //   "Growth Nat Adj": "Percent growth (Nat Adj)",
      // },
      dataTypeNameMapping: {
        "1:HH Count": "count",
        "2:Percent": "percent",
        "3:Household Count Change": "nshft",
        "4:Percent Change": "pshft",
        "5:Growth": "growth",
        "6:Percent Change Nat Adj": "pshftna",
        "7:Growth Nat Adj": "growthna",
      },

      dataTypeNameMappingV4: {
        "1:Household Count": "Household Count",
        "2:Saturation (Demo HH/ HH Total)": "Saturation (Demo HH/ HH Total)",
        "3:HH Count Shift Over Time": "HH Count Shift Over Time",
        "4:Saturation Shift Over Time": "Saturation Shift Over Time",
        "4:Saturation Shift Over Time (Nat Adj)":
          "Saturation Shift Over Time (Nat Adj)",
        "4:Growth As A % Over Time": "Growth As A % Over Time",
        "4:Growth As A % Over Time (Nat Adj)":
          "Growth As A % Over Time (Nat Adj)",
      },

      dataTypeSlugMappingV4: {
        "1:Household Count": "cnt",
        "2:Saturation (Demo HH/ HH Total)": "pct",
        "3:HH Count Shift Over Time": "cch",
        "4:Saturation Shift Over Time": "sch",
        "4:Saturation Shift Over Time (Nat Adj)": "sna",
        "4:Growth As A % Over Time": "pch",
        "4:Growth As A % Over Time (Nat Adj)": "pna",
      },

      percentTypes: [
        "2:Percent",
        "Saturation",
        "4:Percent Change",
        "Percent Change",
        "Saturation Shift",
        "Saturation shift",
        "5:Growth",
        "Growth",
        "Percent Growth",
        "Percent growth",
        "6:Percent Change Nat Adj",
        "Saturation shift (Nat Adj)",
        "7:Growth Nat Adj",
        "Percent growth (Nat Adj)",
        "2:Saturation (Demo HH/ HH Total)",
        "Saturation (Demo HH/ HH Total)",
        "4:Growth As A % Over Time",
        "Growth As A % Over Time",
        "4:Growth As A % Over Time (Nat Adj)",
        "Growth As A % Over Time (Nat Adj)",
        "4:Saturation Shift Over Time",
        "Saturation Shift Over Time",
        "4:Saturation Shift Over Time (Nat Adj)",
        "Saturation Shift Over Time (Nat Adj)",
      ],
      tempPercentTypes: [
        "2:Percent",
        "Saturation",
        "2:Saturation (Demo HH/ HH Total)",
        "Saturation (Demo HH/ HH Total)",
        "4:Saturation Shift Over Time",
        "Saturation Shift Over Time",
        "4:Saturation Shift Over Time (Nat Adj)",
        "Saturation Shift Over Time (Nat Adj)",
      ],
      notAllAllTypes: [
        "4:Percent Change",
        "Saturation Shift",
        "2:Percent",
        "Saturation",
        "6:Percent Change Nat Adj",
        "Saturation shift (Nat Adj)",
        "2:Saturation (Demo HH/ HH Total)",
        "4:Growth As A % Over Time",
        "4:Growth As A % Over Time (Nat Adj)",
        "4:Saturation Shift Over Time",
        "4:Saturation Shift Over Time (Nat Adj)",
      ],
      noSummaryDownloadTypes: [
        "4:Growth As A % Over Time",
        "Growth As A % Over Time",
        "4:Growth As A % Over Time (Nat Adj)",
        "Growth As A % Over Time (Nat Adj)",
      ],

      ethnicityTypes: ["All", "Asian", "Black", "Hispanic", "Other", "White"],
      ethnicityMapping: {
        all: {
          full: "All",
          input_suffix: "All",
          output_suffix: "al",
        },
        asian: {
          full: "Asian",
          input_suffix: "Asi",
          output_suffix: "as",
        },
        black: {
          full: "black",
          input_suffix: "Bla",
          output_suffix: "bl",
        },
        hispanic: {
          full: "Hispanic",
          input_suffix: "His",
          output_suffix: "hi",
        },
        other: {
          full: "Other",
          input_suffix: "oth",
          output_suffix: "ot",
        },
        white: {
          full: "White",
          input_suffix: "Whi",
          output_suffix: "wh",
        },
      },
      selectedDataSeries: null,
      selectedDataSeriesOptions: [],
      selectedMarketType: "dma",
      selectedMarketTypeOptions: [
        { text: "Metro Area", value: "dma" },
        { text: "State", value: "state" },
      ],
      range: 0,
      fullscreen: false,
      marketSummaryChartsData: marketSummaryChartsData,
      marketComparisonChartsData: marketComparisonChartsData,
      f: "downloadDataCsv",
      selectvalue: null,
      popup: null,
      disablePopups: false,
      // color: '#A463BF', for color picker
      selectedSegmentOptions: {},
      selectedSegmentOptionsComp: {},
      tosAccepted: false,
      loading: false,
      bainRedColor: "#cc0000",
      baindLighterRedColor: "#e58080",
      fields: [
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
          label: "Name",
          type: "text",
          editable: true,
          placeholder: "Enter Title...",
          class: "title-col",
        },
        {
          key: "Color",
          label: "Color",
          type: "select",
          options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          editable: true,
          placeholder: "Enter color...",
          class: "color-col",
        },
        {
          key: "Latitude",
          label: "Latitude",
          type: "number",
          editable: true,
          placeholder: "Enter Latitude...",
          class: "longitude-col",
        },
        {
          key: "Longitude",
          label: "Longitude",
          type: "number",
          editable: true,
          placeholder: "Enter Longitude...",
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
      // TODO: Fix for Mexico
      // selectedMarket: "DallasFortWorthTX",
      selectedMarket: "Texas", //Object.keys(marketSettingsData)[0],
      // selectedMarket: "Mexico", //Object.keys(marketSettingsData)[0],
      selectedSummaryMarket: "DallasFortWorthTX",
      selectedComparisonMarkets: ["DallasFortWorthTX"],
      // intramarketMarketSettingsData: mexicoMarketSettingsData,
      intramarketMarketSettingsData: usMarketSettingsData,
      intramarketMarketSettingsDataV4: usMarketSettingsDataV4,

      marketSettingsData: marketSettingsData,
      // mexicoMarketSettingsData: mexicoMarketSettingsData,
      usMarketSettingsData: usMarketSettingsData,

      // selectedMarket: marketSettingsData[this.initialSelectedMarketKey],
      geoLabelVisibility: "Off",
      countSelector: "Off",
      distinctCountSelector: "Off",
      contiguousCountSelector: "Off",
      pointData: [],
      dropPinColors: [
        { id: 1, color: "#f6993f" },
        { id: 2, color: "#ffed4a" },
        { id: 3, color: "#38c172" },
        { id: 4, color: "#4dc0b5" },
        { id: 5, color: "#6574cd" },
        { id: 6, color: "#9561e2" },
        { id: 7, color: "#f66d9b" },
        { id: 8, color: "#e3342f" },
        { id: 9, color: "#3490dc" },
      ],
      allPointData: {},
      markers: [],
      csv: [],
      selectedGeoUnits: "bg",
      selectedGeoUnitsComp: "bg",
      geoUnitOptions: [
        { label: "Census Block Groups", code: "bg" },
        { label: "Zip Codes", code: "zip" },
      ],
      selectedComputedMarketOptions: [],
      flowComputedMarketOptions: [],
      // selectedComputedSummaryMarketOptions: [],
      mapSettingsData: {},
      totalMapSettingsData: {},
      mapSettingsCompData: {},
      segmentSettings: {}, //Object.values(settingsData)[0],
      previousSegmentSettings: {}, //Object.values(settingsData)[0],
      selectedSegment: {}, //Object.keys(settingsData)[0],
      selectedSegmentComp: {},
      previousSelectedSegment: {}, //Object.keys(settingsData)[0],
      previousSelectedSegmentComp: {},
      mapSourceData: {},
      mapSourceTotalData: {},
      mapLabelSourceData: {},
      map: null,
      showMapTitle: false,
      navigationControl: null,
      fullScreenControl: null,
      scaleControl: null,
      flowOpacity: 99,
      opacity: 60,
      loadedJson: {},
      sourcesLoaded: false,
      svgLogo: require("./assets/bain-attribution-small.svg"),
      pngLogo: require("./assets/logo.png"),
      markerGeoJSON: {
        type: "FeatureCollection",
        features: [],
      },
    };
  },
  computed: {
    videos() {
      return this.videoOptions.videos;
    },
    selectedFeaturesLength() {
      return this.selectedFeatures ? this.selectedFeatures.length : 0;
    },
    pointDataLength() {
      return this.pointData ? this.pointData.length : 0;
    },
    selectedVideo() {
      if (this.videos.length === 0) {
        return null;
      }
      let video = this.videos.find(
        (video) => video.video.id === this.selectedVideoId
      );
      console.log("video", video);
      return video;
    },
    disableSummaryCSVDownload() {
      return this.noSummaryDownloadTypes.includes(this.selectedDataType);
    },
    selectedVideoTitle() {
      if (this.eelectedVideo === null) {
        return "Video Tutorial";
      }
      return `${this.selectedVideo.video.title}`;
    },

    computedSelectedAgeSegmentOptions() {
      // return this.selectedAgeSegmentOptions;

      if (this.notAllAllTypes.includes(this.selectedDataType)) {
        let newOptions = [];
        this.selectedAgeSegmentOptions.forEach((option) => {
          if (option.value === "All") {
            if (this.selectedIncomeSegment === "All") {
              let newOption = {
                text: option.text,
                value: option.value,
                disabled: true,
              };
              newOptions.push(newOption);
            } else {
              newOptions.push(option);
            }
          } else {
            newOptions.push(option);
          }
        });
        return newOptions;
      } else {
        return this.selectedAgeSegmentOptions;
      }
    },
    computedSelectedAgeSegmentCompOptions() {
      // return this.selectedAgeSegmentOptions;

      if (this.notAllAllTypes.includes(this.selectedDataType)) {
        let newOptions = [];
        this.selectedAgeSegmentCompOptions.forEach((option) => {
          if (option.value === "1:All") {
            if (this.selectedIncomeSegmentComp === "1:All") {
              let newOption = {
                text: option.text,
                value: option.value,
                disabled: true,
              };
              newOptions.push(newOption);
            } else {
              newOptions.push(option);
            }
          } else {
            newOptions.push(option);
          }
        });
        return newOptions;
      } else {
        return this.selectedAgeSegmentCompOptions;
      }
    },
    computedSelectedIncomeSegmentOptions() {
      if (this.notAllAllTypes.includes(this.selectedDataType)) {
        let newOptions = [];
        this.selectedIncomeSegmentOptions.forEach((option) => {
          if (option.value === "All") {
            if (this.selectedAgeSegment === "All") {
              let newOption = {
                text: option.text,
                value: option.value,
                disabled: true,
              };
              newOptions.push(newOption);
            } else {
              newOptions.push(option);
            }
          } else {
            newOptions.push(option);
          }
        });
        return newOptions;
      } else {
        return this.selectedIncomeSegmentOptions;
      }
    },
    computedSelectedEthnicityOptions() {
      return ["Asian", "Black", "Hispanic", "Other", "White", "All"];
      if (this.notAllAllTypes.includes(this.selectedDataType)) {
        let newOptions = [];
        this.selectedEthnicityOptions.forEach((option) => {
          let newOption = {
            text: option,
            value: option.toLowerCase(),
            disabled: false,
          };
          newOptions.push(option);
        });
        return newOptions;
      } else {
        return this.selectedEthnicityOptions;
      }
    },
    computedSelectedIncomeSegmentCompOptions() {
      if (this.notAllAllTypes.includes(this.selectedDataType)) {
        let newOptions = [];
        this.selectedIncomeSegmentCompOptions.forEach((option) => {
          if (option.value === "1:All") {
            if (this.selectedAgeSegmentComp === "1:All") {
              let newOption = {
                text: option.text,
                value: option.value,
                disabled: true,
              };
              newOptions.push(newOption);
            } else {
              newOptions.push(option);
            }
          } else {
            newOptions.push(option);
          }
        });
        return newOptions;
      } else {
        return this.selectedIncomeSegmentCompOptions;
      }
    },
    // selectedGeographiesShapes() {
    //   // display data series and type

    //   if (this.selectedGeoUnits === "zip") {
    //     // let year = this.selectedDataSeries.includes("-")
    //     //   ? this.selectedDataSeries.split("-")[1]
    //     //   : this.selectedDataSeries;
    //     // return `${year}_Zips`;
    //     return "2020_Zips";
    //   } else {
    //     return "2010_BGs";
    //   }
    // },
    showOtherMarketsInfo() {
      return this.flowSelectedMarketType != "states";
    },
    flowSelectedSegmentIndex() {
      // console.log(
      //   "flowSelectedSegmentIndex",
      //   this.flowSelectedAgeSegment,
      //   this.flowSelectedIncomeSegment,
      //   this.flowSelectedMovementDirection,
      //   ""
      // );
      if (
        this.flowSelectedAgeSegment &&
        this.flowSelectedIncomeSegment &&
        this.flowSelectedMovementDirection
      ) {
        if (this.flowSelectedMovementDirection == "in") {
          return getSegmentIndex(
            "in",
            this.flowSelectedAgeSegment,
            this.flowSelectedIncomeSegment
          );
        } else {
          return getSegmentIndex(
            "out",
            this.flowSelectedAgeSegment,
            this.flowSelectedIncomeSegment
          );
        }
      } else {
        return 0;
      }
    },
    flowSelectedEstimatedRange() {
      if (
        this.flowMapData &&
        Object.keys(this.flowMapData).length > 0 &&
        this.flowSelectedMarketTypeDetails
      ) {
        console.log(this.flowMapData);
        console.log(this.flowSelectedMarketTypeDetails);
        console.log(this.flowSelectedMarket);
        console.log(this.flowMapData[this.flowSelectedMarketTypeDetails]);
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ]
        );
        let index =
          this.flowSelectedMovementDirection == "net"
            ? this.flowSelectedSegmentIndex - 16
            : this.flowSelectedSegmentIndex;
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ]["all_markets_movement_est_range"]
        );
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ]["all_markets_movement_est_range"][index]
        );
        console.log(this.flowSelectedSegmentIndex);
        if (index >= 0) {
          return this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ]["all_markets_movement_est_range"][index];
          // return "estimated range tbd";
        } else {
          return null;
        }
      } else {
        return "";
      }
    },

    flowSelectedEstimatedRangeText() {
      // Inbound mover range for selected age/income, 2016-2022:
      let titleDirection;
      if (this.flowSelectedMovementDirection === "in") {
        titleDirection = "Inbound";
      } else if (this.flowSelectedMovementDirection === "out") {
        titleDirection = "Outbound";
      } else {
        titleDirection = "Net";
      }
      return `${titleDirection} mover range for selected age/income | 2016-2022 | ${this.flowSelectedEstimatedRange}`;
    },

    flowSelectedEstimatedRangeTextSplit() {
      // Inbound mover range for selected age/income, 2016-2022:
      let titleDirection;
      if (this.flowSelectedMovementDirection === "in") {
        titleDirection = "Inbound";
      } else if (this.flowSelectedMovementDirection === "out") {
        titleDirection = "Outbound";
      } else {
        titleDirection = "Net";
      }
      return `${titleDirection} mover range for selected age/income, 2016-2022: <br/> ${this.flowSelectedEstimatedRange}`;
    },
    // flowOtherMarketsText() {
    //   let valueString =
    //     (this.flowSelectedAllOtherMarketsData * 100).toLocaleString(undefined, {
    //       maximumFractionDigits: 1,
    //     }) + "%";
    //   return `All Other Markets: ${valueString}`;
    // },
    flowSelectedAllOtherMarketsData() {
      if (
        this.flowMapData &&
        Object.keys(this.flowMapData).length > 0 &&
        this.flowSelectedMarketTypeDetails &&
        this.flowSelectedMarketType == "metro_areas"
      ) {
        // let additionalDataKey = "all_other_markets";
        // if (this.flowExcludeWithinState === "yes") {
        //   additionalDataKey = "all_other_markets_excl_same_state";
        // }
        let additionalDataKey =
          this.flowExcludeWithinState === "yes"
            ? "all_other_markets_excl_same_state"
            : "all_other_markets";
        console.log(this.flowMapData);
        console.log(this.flowSelectedMarketTypeDetails);
        console.log(this.flowSelectedMarket);
        console.log("this.flowMapData[this.flowSelectedMarketTypeDetails]");
        console.log(this.flowMapData[this.flowSelectedMarketTypeDetails]);
        console.log("1");
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ]
        );
        console.log("2");
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ][additionalDataKey]
        );
        console.log("3");
        console.log(
          this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ][additionalDataKey][this.flowSelectedSegmentIndex]
        );
        console.log("4");
        console.log(this.flowSelectedSegmentIndex);
        if (this.flowSelectedSegmentIndex >= 0) {
          return this.flowMapData[this.flowSelectedMarketTypeDetails][
            this.flowSelectedMarket
          ][additionalDataKey][this.flowSelectedSegmentIndex];
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    flowSelectedMarketTypeDetails() {
      if (
        this.flowSelectedMarketType == "metro_areas" &&
        this.flowExcludeWithinState !== "yes"
      ) {
        return "metro_areas_all";
      }
      if (
        this.flowSelectedMarketType == "metro_areas" &&
        this.flowExcludeWithinState === "yes"
      ) {
        return "metro_areas_excl_same_state";
      }
      if (this.flowSelectedMarketType == "states") {
        return "states";
      }
      return "states";
    },
    computedFlowMarketOptions: function () {
      if (this.marketSettingsData) {
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
              // console.log("market here");
              // console.table(market);
              if (market["GeoTypeGroup"] == category) {
                if (
                  market["GeoTypeGroup"] === "1 - Designated Metro Areas" &&
                  market["InterMarketMetro"] === "1"
                ) {
                  categoryOptions.push({
                    code: key,
                    label: this.marketSettingsData[key].Market_Display_Name,
                  });
                } else if (market["GeoTypeGroup"] === "2 - States") {
                  categoryOptions.push({
                    code: key,
                    label: this.marketSettingsData[key].Market_Display_Name,
                  });
                }
              }
            });
            options.push({ label: category, options: categoryOptions });
          });
          return options;
        } else {
          return {};
        }
      } else {
        return {};
      }
    },

    dataTableMarketColumnHeading() {
      console.log("updating market column headings");
      if (this.flowSelectedMarketType == "metro_areas") {
        return "Metro Area";
      } else if (this.flowSelectedMarketType == "states") {
        return "State";
      } else {
        return "Market";
      }
    },
    dataTablePercentColumnHeading() {
      if (this.flowSelectedMovementDirection == "in") {
        // return "% of total inflows";
        return "Total inflows";
      } else if (this.flowSelectedMovementDirection == "out") {
        // return "% of total outflows";
        return "Total outflows";
      } else {
        // return "% of net flows";
        return "Net flows";
      }
    },
    dataTableTitle() {
      let titleDirection;
      let titleGeo;
      if (this.flowSelectedMovementDirection === "in") {
        titleDirection = "Inbound";
      } else if (this.flowSelectedMovementDirection === "out") {
        titleDirection = "Outbound";
      } else {
        titleDirection = "Net";
      }
      if (this.flowSelectedMarketType == "metro_areas") {
        titleGeo = "metro area";
      } else if (this.flowSelectedMarketType == "states") {
        titleGeo = "state";
      } else {
        titleGeo = "market";
      }
      return `${titleDirection} migration by ${titleGeo}`;
    },

    dataTableFields() {
      // flowSelectedDirection: null,

      // flowSelectedMarketType: null,
      return [
        {
          key: "rank",
          label: "Rank",
          class: "text-center",
          tdClass: "text-center",
        },
        {
          key: "market",
          label: this.dataTableMarketColumnHeading,
          class: "text-center",
        },
        {
          key: "formattedPercent",
          label: this.dataTablePercentColumnHeading,
          class: "text-center",
          tdClass: "text-center",
        },
        {
          key: "selected",
          label: "Show/Hide",
          class: "text-center",
          tdClass: "text-center",
        },
      ];
    },
    dataTableItems() {
      // if (false) {
      console.log("this.marketSettingsData");
      console.log(this.marketSettingsData);
      if (this.intermarketData && this.intermarketData.marketList.length > 0) {
        let list = this.intermarketData.marketList.map((x) => {
          if (this.marketSettingsData[x.location]) {
            return {
              marketId: x.location,
              rank: x.rank,
              market: this.marketSettingsData[x.location].Market_Display_Name,
              percent: x.count,
              selected: x.selected,
            };
          } else {
            // console.log("bad item");
            // console.log(x);
            return null;
          }
        });
        if (this.flowSelectedMarketType == "metro_areas") {
          console.log("final row");
          console.log(this.flowSelectedAllOtherMarketsData);
          let valueString =
            (this.flowSelectedAllOtherMarketsData * 100).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 0,
              }
            ) + "%";
          if (this.flowSelectedMovementDirection == "net") {
            valueString = countToRange(this.flowSelectedAllOtherMarketsData);
          }
          let final_row = {
            marketId: "all_other_markets",
            rank: "-",
            market: "All other markets",
            percent: valueString,
            // selected: false,
          };
          list.push(final_row);
        }
        list = list.filter((obj) => obj);
        console.log("metro areas list ==");
        console.table(list);
        return list;
      }
      // console.log("returning nothing");
      return [];
      // Rank, Market, % of Total Inflows, Show/Hide

      // return [
      //   { rank: 1, market: "Texas", percent: 0.5 },
      //   { rank: 2, market: "New York", percent: 0.4 },
      // ];
    },

    selectedMarketDataTilesetLayer() {
      console.log("selectedMarketDataTilesetLayer");
      console.log(this.selectedMarket);
      console.log(this.intramarketMarketSettingsDataV4);
      let marketSettings =
        this.intramarketMarketSettingsDataV4[this.selectedMarket];
      console.log("marketSettings");
      console.log(marketSettings);
      console.log("2873");
      console.log("this.selectedDataType");
      console.log(this.selectedDataType);
      console.log("this.dataTypeSlugMappingV4");
      console.log(this.dataTypeSlugMappingV4);
      let dataTypeName =
        this.dataTypeSlugMappingV4[this.selectedDataType].toLowerCase();
      console.log("dataTypeName", dataTypeName);
      let ethnicityName =
        this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
          .output_suffix;
      console.log("ethnicityName", ethnicityName);
      return `${marketSettings[
        "MarketName"
      ].toLowerCase()}_${ethnicityName}_${dataTypeName}_v${this.mapVersion}`;
    },
    selectedMarketDataTilesetURL() {
      console.log(
        "selectedMarketDataTilesetURL",
        this.selectedMarketDataTilesetLayer
      );
      return `mapbox://stobieb.${this.selectedMarketDataTilesetLayer}`;
    },
    selectedMarketLabelTilesetLayer() {
      let marketSettings =
        this.intramarketMarketSettingsDataV4[this.selectedMarket];

      return `${marketSettings["MarketName"].toLowerCase()}_labels_v${
        this.mapVersion
      }`;
    },

    selectedMarketLabelTilesetURL() {
      console.log(
        "selectedMarketLabelTilesetLayer",
        this.selectedMarketLabelTilesetLayer
      );
      return `mapbox://stobieb.${this.selectedMarketLabelTilesetLayer}`;
    },

    devicePixelRatio() {
      return window.devicePixelRatio;
    },
    selectedStartYearOptionsSummary() {
      return this.dataOptions.yearOptions;
    },
    selectedEndYearOptionsSummary() {
      return this.dataOptions.yearOptions;
    },
    selectedStartYearOptionsComp() {
      return this.dataOptions.yearOptions;
    },
    selectedEndYearOptionsComp() {
      return this.dataOptions.yearOptions;
    },
    selectedAgeSegmentDisplay() {
      if (this.selectedAgeSegment) {
        if (this.selectedAgeSegment.includes(":")) {
          return this.selectedAgeSegment.split(":")[1];
        } else {
          return this.selectedAgeSegment;
        }
      } else {
        return null;
      }
    },
    selectedIncomeSegmentDisplay() {
      if (this.selectedIncomeSegment) {
        if (this.selectedIncomeSegment.includes(":")) {
          return this.selectedIncomeSegment.split(":")[1];
        } else {
          return this.selectedIncomeSegment;
        }
      } else {
        return null;
      }
    },
    selectedAgeSegmentCompDisplay() {
      return this.selectedAgeSegmentComp
        ? this.selectedAgeSegmentComp.split(":")[1]
        : null;
    },
    selectedIncomeSegmentCompDisplay() {
      return this.selectedIncomeSegmentComp
        ? this.selectedIncomeSegmentComp.split(":")[1]
        : null;
    },
    selectedDataTypeDisplay() {
      // return this.selectedDataType ? this.selectedDataType.split(":")[1] : null;
      return this.selectedDataType
        ? this.dataTypeNameMappingV4[this.selectedDataType]
        : null;
    },
    urbanBackgroundColor() {
      return this.highlightChartUrban ? "#CC0000" : "#333333";
    },
    subUrbanBackgroundColor() {
      return this.highlightChartSubUrban ? "#CC0000" : "#666666";
    },
    exUrbanBackgroundColor() {
      return this.highlightChartExUrban ? "#CC0000" : "#999999";
    },
    urbanTextColor() {
      return this.highlightChartUrban ? "#ffffff" : "#ffffff";
    },
    subUrbanTextColor() {
      return this.highlightChartSubUrban ? "#ffffff" : "#ffffff";
    },
    exUrbanTextColor() {
      return this.highlightChartExUrban ? "#ffffff" : "#ffffff";
    },
    highlightChartUrbanVariant() {
      return this.highlightChartUrban ? "danger" : "danger";
    },
    highlightChartSubUrbanVariant() {
      return this.highlightChartSubUrban ? "danger" : "danger";
    },
    highlightChartExUrbanVariant() {
      return this.highlightChartExUrban ? "danger" : "danger";
    },
    // { "displayRegion": "Albuquerque Santa Fe", "isMetro": "1", "needsCaveat": "1", "region": "Albany" }
    marketNameWithCaveat() {
      let market = this.selectedSummaryMarket;
      let region = this.dataOptions.regionOptions.find(
        (region) => region.region === market
      );
      let displayRegion = region.displayRegion;
      // if (region.needsCaveat == 1) {
      //   displayRegion = region.displayRegion + "*";
      // }
      return displayRegion;
    },
    // { "displayRegion": "Albuquerque Santa Fe", "isMetro": "1", "needsCaveat": "1", "region": "Albany" }
    selectedComputedSummaryMarketOptions() {
      let options = [];
      this.dataOptions.regionOptions.forEach((region) => {
        let displayRegion = region.displayRegion;
        if (region.isMetro == 1) {
          // if (region.needsCaveat == 1) {
          //   displayRegion = region.displayRegion + "*";
          // }
          let regionOption = {
            label: displayRegion,
            code: region.region,
          };
          options.push(regionOption);
        }
      });
      return options;
    },
    selectedCompMarkets() {
      let selections = [
        this.selectedMarketsComp1,
        this.selectedMarketsComp2,
        this.selectedMarketsComp3,
        this.selectedMarketsComp4,
        this.selectedMarketsComp5,
        this.selectedMarketsComp6,
      ];
      return selections;
    },
    selectedMarketSummaryChartsData() {
      let data = {};
      this.selectedCompMarkets.forEach((market) => {
        if (market) {
          // "Alabama-2016-1:All-3:$50-100k"
          let key1 = `${market}-${this.selectedStartYearSummary}-${this.selectedAgeSegmentComp}-${this.selectedIncomeSegmentComp}`;
          let key2 = `${market}-${this.selectedEndYearSummary}-${this.selectedAgeSegmentComp}-${this.selectedIncomeSegmentComp}`;
          data[market] = {};
          data[market][this.selectedStartYearComp] =
            this.marketSummaryChartsData[key1];
          data[market][this.selectedEndYearComp] =
            this.marketSummaryChartsData[key2];
        }
      });
      return data;
    },
    selectedMarketComparisonChartsData() {
      let data = {};
      this.selectedCompMarkets.forEach((market) => {
        if (market) {
          // "Alabama-2016-1:All-3:$50-100k"
          let key1 = `${market}-${this.selectedStartYearComp}-${this.selectedAgeSegmentComp}-${this.selectedIncomeSegmentComp}`;
          let key2 = `${market}-${this.selectedEndYearComp}-${this.selectedAgeSegmentComp}-${this.selectedIncomeSegmentComp}`;
          // console.log("key1", key1);
          // console.log("key2", key2);
          // console.log(
          //   "marketComparisonChartsData",
          //   this.marketComparisonChartsData
          // );
          data[market] = {};
          data[market][this.selectedStartYearComp] =
            this.marketComparisonChartsData[key1];
          data[market][this.selectedEndYearComp] =
            this.marketComparisonChartsData[key2];
        }
      });
      return data;
    },
    selectedMarketSummaryTotalChartsData() {
      let data = {};
      let market = this.selectedSummaryMarket;

      // "Alabama-2016-1:All-3:$50-100k"
      let key1 = `${market}-${this.selectedStartYearSummary}-1:All-1:All`;
      let key2 = `${market}-${this.selectedEndYearSummary}-1:All-1:All`;
      data[market] = {};
      data[market][this.selectedStartYearSummary] =
        this.marketComparisonChartsData[key1];
      data[market][this.selectedEndYearSummary] =
        this.marketComparisonChartsData[key2];
      console.log("selectedMarketSummaryTotalChartsData", data);
      return data;
    },
    selectedMarketSummaryAgeChartsData() {
      let data = {};
      // console.log("is this changing?");
      let market = this.selectedSummaryMarket;
      data[market] = {};
      this.selectedAgeSegmentCompOptions.forEach((ageSegmentObj) => {
        let ageSegment = ageSegmentObj["value"];
        if (ageSegment !== "1:All") {
          // "Alabama-2016-1:All-3:$50-100k"
          let key1 = `${market}-${this.selectedStartYearSummary}-${ageSegment}-1:All`;
          let key2 = `${market}-${this.selectedEndYearSummary}-${ageSegment}-1:All`;

          if (!data[market][this.selectedStartYearSummary]) {
            data[market][this.selectedStartYearSummary] = {};
          }
          data[market][this.selectedStartYearSummary][ageSegment] =
            this.marketComparisonChartsData[key1];
          if (!data[market][this.selectedEndYearSummary]) {
            data[market][this.selectedEndYearSummary] = {};
          }
          data[market][this.selectedEndYearSummary][ageSegment] =
            this.marketComparisonChartsData[key2];
        }
      });

      return data;
    },
    selectedMarketSummaryIncomeChartsData() {
      let data = {};

      let market = this.selectedSummaryMarket;
      data[market] = {};
      this.selectedIncomeSegmentCompOptions.forEach((incomeSegmentObj) => {
        let incomeSegment = incomeSegmentObj["value"];
        if (incomeSegment !== "1:All") {
          // "Alabama-2016-1:All-3:$50-100k"
          let key1 = `${market}-${this.selectedStartYearSummary}-1:All-${incomeSegment}`;
          let key2 = `${market}-${this.selectedEndYearSummary}-1:All-${incomeSegment}`;

          if (!data[market][this.selectedStartYearSummary]) {
            data[market][this.selectedStartYearSummary] = {};
          }
          data[market][this.selectedStartYearSummary][incomeSegment] =
            this.marketComparisonChartsData[key1];
          if (!data[market][this.selectedEndYearSummary]) {
            data[market][this.selectedEndYearSummary] = {};
          }
          data[market][this.selectedEndYearSummary][incomeSegment] =
            this.marketComparisonChartsData[key2];
        }
      });

      return data;
    },
    selectedMarketSummaryAgeAndIncomeChartsData() {
      let data = {};

      let market = this.selectedSummaryMarket;
      data[market] = {};
      // "Alabama-2016-1:All-3:$50-100k"
      this.selectedIncomeSegmentCompOptions.forEach((incomeSegmentObj) => {
        let incomeSegment = incomeSegmentObj["value"];
        if (!data[market][this.selectedStartYearSummary]) {
          data[market][this.selectedStartYearSummary] = {};
          data[market][this.selectedStartYearSummary][incomeSegment] = {};
        } else {
          if (!data[market][this.selectedStartYearSummary][incomeSegment]) {
            data[market][this.selectedStartYearSummary][incomeSegment] = {};
          }
        }
        if (!data[market][this.selectedEndYearSummary]) {
          data[market][this.selectedEndYearSummary] = {};
          data[market][this.selectedEndYearSummary][incomeSegment] = {};
        } else {
          if (!data[market][this.selectedEndYearSummary][incomeSegment]) {
            data[market][this.selectedEndYearSummary][incomeSegment] = {};
          }
        }
        // console.log("selectedAgeSegmentOptions");
        this.selectedAgeSegmentCompOptions.forEach((ageSegmentObj) => {
          let ageSegment = ageSegmentObj["value"];
          // console.log(ageSegment);
          let key1 = `${market}-${this.selectedStartYearSummary}-${ageSegment}-${incomeSegment}`;
          let key2 = `${market}-${this.selectedEndYearSummary}-${ageSegment}-${incomeSegment}`;
          // console.log(key1);
          // console.log(key2);
          data[market][this.selectedStartYearSummary][incomeSegment][
            ageSegment
          ] = this.marketComparisonChartsData[key1];
          data[market][this.selectedEndYearSummary][incomeSegment][ageSegment] =
            this.marketComparisonChartsData[key2];
          // console.log("data", data);
        });
      });
      // console.log("returned_data", data);
      return data;
    },
    selectedComputedSummaryMarketOptionsWithBlank() {
      return [{ label: "", code: "" }].concat(
        this.selectedComputedSummaryMarketOptions
      );
    },

    selectedMarketsComp() {
      return [
        this.selectedMarketsComp1,
        this.selectedMarketsComp2,
        this.selectedMarketsComp3,
        this.selectedMarketsComp4,
        this.selectedMarketsComp5,
        this.selectedMarketsComp6,
      ];
    },
    selectedAgeSegmentTitle() {
      if (this.selectedAgeSegment) {
        if (this.selectedAgeSegment.includes(":")) {
          return this.selectedAgeSegment.split(":")[1];
        } else {
          return this.selectedAgeSegment;
        }
      } else {
        return null;
      }
    },
    selectedIncomeSegmentTitle() {
      if (this.selectedIncomeSegment) {
        if (this.selectedIncomeSegment.includes(":")) {
          return this.selectedIncomeSegment.split(":")[1];
        } else {
          return this.selectedIncomeSegment;
        }
      } else {
        return null;
      }
    },
    selectedAgeSegmentCompTitle() {
      return this.selectedAgeSegmentComp
        ? this.selectedAgeSegmentComp.split(":")[1]
        : null;
    },
    selectedIncomeSegmentCompTitle() {
      return this.selectedIncomeSegmentComp
        ? this.selectedIncomeSegmentComp.split(":")[1]
        : null;
    },
    flowSelectedAgeSegmentTitle() {
      return this.flowAgeSegmentOptions[this.flowSelectedAgeSegment];
    },
    flowSelectedIncomeSegmentTitle() {
      return this.flowIncomeSegmentOptions[this.flowSelectedIncomeSegment];
    },
    // Toto: check if needs to be different for intramarket vs summary, etc
    mapTitleForSelectedOptions() {
      return `${
        this.intramarketMarketSettingsDataV4[this.selectedMarket]
          .Market_Display_Name
      }  | Ages: ${this.selectedAgeSegmentTitle} Incomes: ${
        this.selectedIncomeSegmentTitle
      } Ethnicity: ${this.selectedEthnicity}
       | Data: ${
         this.dataTypeMapping[this.selectedDataType]
       } | Series: ${renameDataSeries(this.selectedDataSeries.code)}`;
    },
    flowMapTitleForSelectedOptions() {
      let direction;
      if (this.flowSelectedMovementDirection == "in") {
        direction = "Inbound";
      } else if (this.flowSelectedMovementDirection == "out") {
        direction = "Outbound";
      } else if (this.flowSelectedMovementDirection == "net") {
        direction = "Net";
      }
      let includeText;
      if (this.flowSelectedMarketType === "states") {
        includeText = "";
      }

      if (
        this.flowExcludeWithinState === "yes" &&
        this.flowSelectedMarketType !== "states"
      ) {
        includeText = "| Excluding same state migration";
      }
      if (
        this.flowExcludeWithinState !== "yes" &&
        this.flowSelectedMarketType !== "states"
      ) {
        includeText = "| Including same state migration";
      }
      // "Dallas Forth Worth, TX | Ages: All | Incomes: All | Outbound Migration | 2016-2022 | Excluding same state migration"
      return `${
        this.marketSettingsData[this.flowSelectedMarket].Market_Display_Name
      } | Ages: ${this.flowSelectedAgeSegmentTitle} | Incomes: ${
        this.flowSelectedIncomeSegmentTitle
      }  ${includeText}`;
    },
    // TODO check this for intramarket vs other download filenames
    filenamePartialForSelectedOptions() {
      console.log("filenamePartialForSelectedOptions");
      console.log(this.selectedMarket);
      console.log(this.intramarketMarketSettingsDataV4);
      console.log(this.intramarketMarketSettingsDataV4[this.selectedMarket]);

      console.log(this.selectedAgeSegmentTitle);
      console.log(this.selectedIncomeSegmentTitle);
      console.log(this.selectedEthnicity);

      return `${slugify(
        this.intramarketMarketSettingsDataV4[this.selectedMarket]
          .Market_Display_Name
      )}-age-${slugify(this.selectedAgeSegmentTitle)}-income-${slugify(
        this.selectedIncomeSegmentTitle
      )}-ethnicity-${slugify(this.selectedEthnicity)}-${slugify(
        this.dataTypeNameMappingV4[this.selectedDataType]
      )}-${slugify(this.selectedEthnicity)}-${slugify(
        renameDataSeries(this.selectedDataSeries.code)
      )}`;
    },
    selectedDataSeriesDisplay() {
      return this.selectedDataSeries
        ? renameDataSeries(this.selectedDataSeries.code)
        : null;
    },
    filenamePartialForSelectedFlowOptions() {
      let direction;
      if (this.flowSelectedMovementDirection == "in") {
        direction = "inbound";
      } else if (this.flowSelectedMovementDirection == "out") {
        direction = "outbound";
      } else if (this.flowSelectedMovementDirection == "net") {
        direction = "net";
      }
      let includeSameStateSlug = "";
      if (this.flowSelectedMarketType == "metro_areas") {
        if (this.flowExcludeWithinState == "yes") {
          includeSameStateSlug = "-exclude-same-state";
        } else {
          includeSameStateSlug = "-include-same-state";
        }
      }
      return `${slugify(
        this.marketSettingsData[this.flowSelectedMarket].Market_Display_Name
      )}-age-${slugify(this.flowSelectedAgeSegment)}-income-${slugify(
        this.flowSelectedIncomeSegment
      )}-${slugify(direction)}-${includeSameStateSlug}`;
    },
    selectGeoUnitsToolTipText: function () {
      if (this.selectedGeoUnits === "bg") {
        return "Click to change geo units to zip codes";
      } else {
        return "Click to change geo units to census blocks";
      }
    },
    selectGeoLabelsToolTipText: function () {
      if (this.geoLabelVisibility === "On") {
        return "Turn geo labels off";
      } else {
        return "Turn geo labels on";
      }
    },
    toggleContiguousCountSelectorToolTipText: function () {
      if (this.contiguousCountSelector === "On") {
        return "Turn contiguous geo unit select mode off";
      } else {
        return "Turn contiguous geo unit select mode on. Use this mode to display data for one or more geo units by holding the shift key and dragging your cursor to select the geo units.";
      }
    },
    toggleDistinctCountSelectorToolTipText: function () {
      if (this.distinctCountSelector === "On") {
        return "Turn distinct geo unit select mode off";
      } else {
        return "Turn distinct geo unit select mode on. Use this mode to display data for one or more geo units by holding the shift key and clicking individual geo units to select them.";
      }
    },
    showSetting: function () {
      return !this.fullscreen || (this.fullscreen && !this.showSettings);
    },
    geoDistance: function (slat, slong, dlat, dlong, measure) {
      return geoDistance(slat, slong, dlat, dlong, measure);
    },
    marketSummaryChartsDataYearLabels: function (count) {
      // let years = [
      //   this.selectedStartYearOptionsSummary,
      //   this.selectedEndYearOptionsSummary,
      // ];
      let labels = [];
      for (let i = 0; i < count; i++) {
        labels = labels.concat([
          "",
          this.selectedStartYearSummary,
          this.selectedEndYearSummary,
          "",
        ]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    marketAllChartsDataYearLabels: function () {
      let labels = [];
      for (let i = 0; i < 1; i++) {
        labels = labels.concat([
          "",
          this.selectedStartYearSummary,
          this.selectedEndYearSummary,
          "",
        ]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    marketAgeChartsDataYearLabels: function () {
      let labels = [];
      for (let i = 0; i < 3; i++) {
        labels = labels.concat([
          "",
          this.selectedStartYearSummary,
          this.selectedEndYearSummary,
          "",
        ]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    marketIncomeChartsDataYearLabels: function () {
      let labels = [];
      for (let i = 0; i < 3; i++) {
        labels = labels.concat([
          "",
          this.selectedStartYearSummary,
          this.selectedEndYearSummary,
          "",
        ]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    marketFullChartsDataYearLabels: function () {
      let labels = [];
      for (let i = 0; i < 10; i++) {
        labels = labels.concat([
          "",
          this.selectedStartYearSummary,
          this.selectedEndYearSummary,
          "",
        ]);
      }
      // console.log("labels");
      // console.log(labels);
      return labels;
    },
    marketComparisonChartsDataYearLabels: function () {
      return [];
    },

    currentMarketChartData: function () {
      return this.marketSummaryChartsData[this.selectedSummaryMarket];
    },
    currentSegmentMaxValue: function () {
      let value = 255;
      let label = "1: HH Count";
      if (this.segmentSettings) {
        value = this.segmentSettings.MaxValue;
        label = this.segmentSettings.Display_Data_Type;
      }
      var valueString;
      // console.log("label");
      // console.log(label);
      // console.log(label == "Count");
      if (this.segmentSettings) {
        // if (label == "Percent" || label == "2:Percent") {
        if (this.percentTypes.includes(label)) {
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
      } else {
        return "";
      }
    },
    currentSegmentMinValue: function () {
      let value = 0;
      let label = "1: HH Count";
      if (this.segmentSettings) {
        value = this.segmentSettings.MinValue;
        label = this.segmentSettings.Display_Data_Type;
      }
      var valueString;
      if (this.segmentSettings) {
        // if (label == "Percent" || label == "2:Percent") {
        if (this.percentTypes.includes(label)) {
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
      } else {
        return "";
      }
    },
    currentSegmentZeroValue: function () {
      let value = 0;
      let label = "1: HH Count";
      if (this.segmentSettings) {
        value = this.segmentSettings.MinValue;
        label = this.segmentSettings.Display_Data_Type;
      }
      var valueString;
      if (this.segmentSettings) {
        // if (label == "Percent" || label == "2:Percent") {
        if (this.percentTypes.includes(label)) {
          valueString =
            (0 * 100).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            }) + "%";
        } else if (label == "Count") {
          valueString = (0).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          });
        } else {
          valueString = (0).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          });
        }
        return valueString;
      } else {
        return "";
      }
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
      console.log("createBackgroundString");
      let startColor = "rgba(255,255,255,1)";
      let endColor = "rgba(255,255,255,1";

      if (this.segmentSettings) {
        console.log("setting colors");
        startColor = this.segmentSettings["HeatMapStartColor"];
        endColor = this.segmentSettings["HeatMapEndColor"];
      }
      console.log("startColor", startColor);
      console.log("endColor", endColor);
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
      console.log("here");
      console.log(this.segmentSettings);
      console.log(this.segmentSettings ? "true" : "false");
      if (this.segmentSettings) {
        console.log("alan");
      }
      if (this.segmentSettings !== null) {
        console.log("line 3525");
        if (parseFloat(this.segmentSettings["MinValue"]) < 0.0) {
          let zeroColor = this.legendZeroColor;
          temp.style.cssText = `color: ${zeroColor}`;
          let rgbStr = temp.style.color;
          let midRgbArray = Array.from(
            rgbStr.matchAll(/\d+\.?\d*/g),
            (c) => +c[0]
          );
          // let fraction =
          //   parseFloat(this.segmentSettings["MaxValue"]) /
          //   (parseFloat(this.segmentSettings["MaxValue"]) -
          //     parseFloat(this.segmentSettings["MinValue"]));
          let fraction = 0.5;
          console.log("here 4");
          let fractionString = fraction.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 0,
          });
          let string = `linear-gradient(
            rgba(${endRgbArray.join(",")}, ${this.opacity / 100}) 0%, 
            rgba(${midRgbArray.join(",")}, 
            0.0
          ) ${fractionString}, 
            rgba(${startRgbArray.join(",")},${this.opacity / 100}) 100%)`;
          console.log("style string: ", string);
          return string;
        } else {
          return `linear-gradient(rgba(${endRgbArray.join(",")},${
            this.opacity / 100
          }),rgba(${startRgbArray.join(",")},${this.opacity / 100}))`;
        }
      } else {
        return `linear-gradient(rgba(${endRgbArray.join(",")},${
          this.opacity / 100
        }),rgba(${startRgbArray.join(",")},${this.opacity / 100}))`;
      }
    },
    computedSegmentOptions: function () {
      // let settingValues = Array.from( Object.values(this.mapSettingsData) );
      // return settingValues.map(setting => ({ value: setting.SeriesShortUnique, text: setting.SeriesShortUnique }));
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
                code: key,
                label: this.mapSettingsData[key].SeriesShortUnique,
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
    // TODO - check if this needs to be different for each tab
    computedMarketOptions: function () {
      if (this.intramarketMarketSettingsDataV4) {
        let keys = Object.keys(this.intramarketMarketSettingsDataV4);
        if (keys.length > 0) {
          let displayCategorySet = new Set();
          keys.forEach((key) => {
            let displayCategory =
              this.intramarketMarketSettingsDataV4[key]["GeoTypeGroup"];
            displayCategorySet.add(displayCategory);
          });
          let displayCategoryArray = Array.from(displayCategorySet);
          let sortedList = displayCategoryArray.sort();
          let options = [];
          sortedList.forEach((category) => {
            let categoryOptions = [];
            keys.forEach((key) => {
              let market = this.intramarketMarketSettingsDataV4[key];
              if (market["GeoTypeGroup"] == category) {
                categoryOptions.push({
                  code: key,
                  label:
                    this.intramarketMarketSettingsDataV4[key]
                      .Market_Display_Name,
                });
              }
            });
            options.push({ label: category, options: categoryOptions });
          });
          return options;
        } else {
          return {};
        }
      } else {
        return {};
      }
    },
    // computedMarketOptions: function () {
    //   if (this.marketSettingsData) {
    //     let keys = Object.keys(this.marketSettingsData);
    //     if (keys.length > 0) {
    //       let displayCategorySet = new Set();
    //       keys.forEach((key) => {
    //         let displayCategory = this.marketSettingsData[key]["GeoTypeGroup"];
    //         displayCategorySet.add(displayCategory);
    //       });
    //       let displayCategoryArray = Array.from(displayCategorySet);
    //       let sortedList = displayCategoryArray.sort();
    //       let options = [];
    //       sortedList.forEach((category) => {
    //         let categoryOptions = [];
    //         keys.forEach((key) => {
    //           let market = this.marketSettingsData[key];
    //           if (market["GeoTypeGroup"] == category) {
    //             categoryOptions.push({
    //               code: key,
    //               label: this.marketSettingsData[key].Market_Display_Name,
    //             });
    //           }
    //         });
    //         options.push({ label: category, options: categoryOptions });
    //       });
    //       return options;
    //     } else {
    //       return {};
    //     }
    //   } else {
    //     return {};
    //   }
    // },
    // TODO: check if this needs to be different for each tab
    marketOptions: function () {
      let keys = Object.keys(intramarketMarketSettingsDataV4);
      let optionsArray = [];
      keys.forEach((key) => {
        optionsArray.push({
          code: key,
          label: intramarketMarketSettingsDataV4[key]["Market_Display_Name"],
        });
      });
      return optionsArray;
    },
    initialPointList: function () {
      let keys = Object.keys(intramarketMarketSettingsDataV4);
      let points = {};
      keys.forEach((key) => {
        points[key] = [];
      });
      return points;
    },
    // TODO: check if this needs to be different for each tab
    mapCenter: function () {
      return {
        lat: this.intramarketMarketSettingsDataV4[this.selectedMarket][
          "CenterLat"
        ],
        lon: this.intramarketMarketSettingsDataV4[this.selectedMarket][
          "CenterLong"
        ],
      };
    },
    // TODO: check if this needs to be different for each tab
    zoom: function () {
      return parseInt(
        this.intramarketMarketSettingsDataV4[this.selectedMarket][
          "DefaultZoomLevel"
        ]
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
      if (this.country == "mexico") {
        value = "CVEGEO";
      }
      // if (this.selectedGeoUnits == "bg") {
      //   value = "GEOID10";
      // }
      console.log("geoJsonGeoProperty", value);
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
    selectVideo(index) {
      // this.$refs.dplayer.dp.pause();
      this.selectedVideoId = index + 1;
      // console.log("chainging video");
      // this.refs.dplayer.options.video = this.selectedVideo;
      // this.$refs.dplayer.dp.switchVideo(v);
      // this.$refs.dplayer.dp.play();
      // modal-video-tutorial-video
      this.$bvModal.show("modal-video-tutorial-video");
    },
    addFlowHomeButton(map, vue) {
      class HomeButton {
        onAdd(map) {
          let home = {
            center: [
              vue.initialViewState.longitude,
              vue.initialViewState.latitude,
            ],
            zoom: vue.initialViewState.zoom,
          };
          const div = document.createElement("div");
          div.className = "mapboxgl-ctrl mapboxgl-ctrl-group flowHome";
          div.innerHTML = `<button>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="font-size: 20px;"><title>Reset map</title><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
          </button>`;
          div.addEventListener("contextmenu", (e) => e.preventDefault());
          div.addEventListener("click", () => map.flyTo(home));

          return div;
        }
        onRemove(map) {
          console.log("firing onrmove");
          document.querySelector(".flowHome").remove();
        }
      }
      const homeButton = new HomeButton();
      console.log(homeButton);
      vue.flowmapHomeControl = homeButton;
      console.log("button added");
      map.addControl(homeButton, "bottom-left");
    },
    resetView() {
      this.flowMap.flyTo({
        center: [
          this.initialViewState.longitude,
          this.initialViewState.latitude,
        ],
        zoom: this.initialViewState.zoom,
      });
    },
    dataTableToggleVisibility() {
      this.dataTableVisibility = !this.dataTableVisibility;
      // setTimeout(() => {
      //   this.flowMap.resize();
      //   this.updateDeck();
      // }, 200);
      setTimeout(() => {
        this.flowMap.resize();
        console.log("resize map");
        // setTimeout(() => {
        //   this.updateDeck();
        //   console.log("update deck");
        // }, 200);
      }, 100);
    },
    onDataTableRowSelected(items) {
      this.dataTableSelectedItems = items;
      console.log("onDataTableRowSelected");
      console.log(items);
    },
    onSelectedClick(event) {
      // console.log("onSelectedClick");
      // console.log(event);
      // console.table(this.flowDataTableData);
      // console.log(row_index);
      // console.table(row_item);
      this.updateFlowData(true);
    },
    onDataTableRefreshed(table) {
      console.log("onDataTableRefreshed");
      console.log(table);
    },
    updateDeck(visible = true) {
      let visibility = true;
      if (!visible || this.flowLoading || this.initialFlowLoading) {
        visibility = false;
      }
      let data = this.intermarketData;

      // console.log("flows", flows);
      // console.log(JSON.stringify(flows));
      // data = { locations: locations, flows: flows };
      // data = this.intermarketData;
      // console.log("data", data);
      if (this.intermarketData && this.flowmapDeckOverlay) {
        console.log("updateDeck here");
        console.log("data");
        console.log(data);
        this.flowmapDeckOverlay.setProps({
          glOptions: {
            preserveDrawingBuffer: true,
          },
          layers: [
            new FlowmapLayer({
              id: "my-flowmap-layer",
              data,
              pickable: true,
              visible: visibility,
              opacity: this.flowMapConfig.opacity,
              darkMode: this.flowMapConfig.darkMode,
              colorScheme: this.flowMapConfig.colorScheme,
              fadeAmount: this.flowMapConfig.fadeAmount,
              fadeEnabled: this.flowMapConfig.fadeEnabled,
              fadeOpacityEnabled: this.flowMapConfig.fadeOpacityEnabled,
              locationTotalsEnabled: this.flowMapConfig.locationTotalsEnabled,
              animationEnabled: this.flowMapConfig.animationEnabled,
              clusteringEnabled: this.flowMapConfig.clusteringEnabled,
              showFlowLines: true,
              clusteringAuto: this.flowMapConfig.clusteringAuto,
              clusteringLevel: this.flowMapConfig.clusteringLevel,
              adaptiveScalesEnabled: this.flowMapConfig.adaptiveScalesEnabled,
              highlightColor: this.flowMapConfig.highlightColor,
              getLocationId: (loc) => loc.id,
              getLocationLat: (loc) => loc.lat,
              getLocationLon: (loc) => loc.lon,
              getFlowOriginId: (flow) => flow.origin,
              getFlowDestId: (flow) => flow.dest,
              getFlowMagnitude: (flow) => flow.count,
              getLocationName: (loc) => loc.name,

              // onHover: (info) => setTooltip(getTooltipState(info)),
              onHover: (info) => console.log(info),
              // onClick: (info) => console.log('clicked', info.type, info.object),
              // onClick: (info) =>
              //   alert(`clicked: ${info.type}  ${JSON.stringify(info.object)}`),
            }),
          ],
        });
        // let currentOpacity = this.flowMapConfig.opacity;
        // this.flowSelectedMovementDirection = "in";
        console.log("set opacity map");
        let currentOpacity = this.flowOpacity;
        setTimeout(() => {
          // this.opacity = currentOpacity - 0.1;
          // this.flowMapConfig.opacity = 0.99;
          // this.flowMapConfig.opacity = currenntOpacity;
          this.flowMapConfig.highlightColor = "#ffffff";
          // this.flowSelectedMovementDirection = "in";
          // this.flowSelectedMovementDirection = "out";
          // console.log("set opacity back");
          this.flowOpacity = 100;
        }, 500);
      }
    },
    async loadMapSourceData() {
      console.log("loadMapSourceData");
      console.log("3840");
      console.log("this.ethnicityMappingOptions");
      console.log(this.ethnicityMappingOptions);
      console.log("this.selectedEthnicity");
      console.log(this.selectedEthnicity);

      let ethnicityName =
        this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
          .output_suffix;
      console.log("ethnicityName", ethnicityName);
      console.log("line 3826");
      console.log(this.dataTypeSlugMappingV4);
      console.log(this.selectedDataType);
      console.log(this.dataTypeSlugMappingV4[this.selectedDataType]);
      console.log(
        `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${this.dataTypeSlugMappingV4[
          this.selectedDataType
        ].toLowerCase()}_data_v${this.mapVersion}.json`
      );
      const mapDataPromise = fetch(
        `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${this.dataTypeSlugMappingV4[
          this.selectedDataType
        ].toLowerCase()}_data_v${this.mapVersion}.json`
      );
      const sourceDataPromise = mapDataPromise.then((response) => {
        console.log(response);
        console.log("loaded map source data");
        // const mapData =  response.json();
        return response.json();
      });
      sourceDataPromise.then((mapSourceData) => {
        console.log("promised resolved");
        this.mapSourceData = mapSourceData;
        this.updateSelectedSegments();
      });
      const mapTotalDataPromise = fetch(
        `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${this.dataTypeSlugMappingV4[
          this.selectedTotalDataType
        ].toLowerCase()}_data_v${this.mapVersion}.json`
      );

      const sourceTotalDataPromise = mapTotalDataPromise.then((response) => {
        // console.log(response);
        // console.log("loaded map source data");
        // const mapData =  response.json();
        return response.json();
      });
      sourceTotalDataPromise.then((mapSourceTotalData) => {
        // console.log("promised resolved");
        this.mapSourceTotalData = mapSourceTotalData;
        console.log("loaded mapSourceSourceTotalData");
        console.log(this.mapSourceTotalData);
      });
    },

    async getMapFeatures() {
      if (this.map && this.selectedMarketDataTilesetLayer) {
        let features = await this.map.querySourceFeatures("dataSource", {
          sourceLayer: this.selectedMarketDataTilesetLayer,
        });
        return features;
      } else {
        return [];
      }
    },
    async reloadMap(resetView = true) {
      if (this.map) {
        mapboxgl.clearStorage();
        this.disableInputs = true;
        this.showGeoCounter = false;
        // this.showStatus();
        this.loading = true;
        this.map.removeLayer(this.previousSegmentSettings.SeriesShortUnique);
        this.map.removeLayer(
          `${this.previousSegmentSettings.SeriesShortUnique}-filtered`
        );
        this.map.removeLayer("geoLabels");
        this.map.removeSource("dataSource");
        this.map.removeSource("dataLabelSource");
        // this.map
        //   .getSource("dataSource")
        //   .setUrl(this.selectedMarketDataTilesetURL);
        // this.map
        //   .getSource("dataLabelSource")
        //   .setUrl(this.selectedMarketLabelTilesetURL);

        this.map.addSource("dataSource", {
          type: "vector",
          // Use a URL for the value for the `data` property.
          // url: vue.selectedMarketDataTilesetURL, mapbox://styles/stobieb/cl9hljo0n005114qskbrny795
          url: this.selectedMarketDataTilesetURL,
        });
        this.map.addSource("dataLabelSource", {
          type: "vector",
          // Use a URL for the value for the `data` property.
          // url: vue.selectedMarketLabelTilesetURL,
          url: this.selectedMarketLabelTilesetURL,
        });
        // await this.getMapData()
        console.log("seeing here");
        await this.loadMapSourceData();
        // const mapLabelsDataResponse = await fetch(
        //   `${this.base_asset_url}/${newMarket}_${this.selectedGeoUnits}_labels.json`
        // );
        // const mapLabelsData = await mapLabelsDataResponse.json();
        // this.mapLabelSourceData = await mapLabelsData;
        // const settingsDataResponse = await fetch(
        //   `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
        //     this.selectedGeoUnits
        //   }_settings_data_v${this.mapVersion}.json`
        // );
        console.log("line 3639");
        console.log("market", this.selectedMarket);
        let ethnicityName =
          this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
            .output_suffix;
        // Intermarket data
        console.log("ethnicityName", ethnicityName);
        console.log("this.dataTypeSlugMappingV4", this.dataTypeSlugMappingV4);
        console.log("selectedDataType", this.selectedDataType);
        console.log("dataTypeNameMapping", this.dataTypeNameMapping);
        console.log(
          "dataTypeNameMapping",
          this.dataTypeNameMapping[this.selectedDataType]
        );
        console.log("line 4025");
        let dataTypeName =
          this.dataTypeSlugMappingV4[this.selectedDataType].toLowerCase();
        let uri = `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${dataTypeName}_settings_data_v${
          this.mapVersion
        }.json`;
        console.log("uri", uri);
        const settingsDataResponse = await fetch(uri);
        const mapSettingsData = await settingsDataResponse.json();
        console.log("line 4094");
        console.log(uri);
        this.mapSettingsData = await mapSettingsData;

        console.log("line 4113");
        let totalDataTypeName =
          this.dataTypeSlugMappingV4[this.selectedTotalDataType].toLowerCase();
        let totalUri = `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${totalDataTypeName}_settings_data_v${
          this.mapVersion
        }.json`;
        console.log("totalUri", totalUri);
        const totalSettingsDataResponse = await fetch(totalUri);
        const totalMapSettingsData = await totalSettingsDataResponse.json();
        console.log("line 4094");
        console.log(uri);
        this.totalMapSettingsData = await totalMapSettingsData;

        const mapTotalDataPromise = fetch(
          `${
            this.base_asset_url
          }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${this.dataTypeSlugMappingV4[
            this.selectedTotalDataType
          ].toLowerCase()}_data_v${this.mapVersion}.json`
        );

        const sourceTotalDataPromise = mapTotalDataPromise.then((response) => {
          // console.log(response);
          // console.log("loaded map source data");
          // const mapData =  response.json();
          return response.json();
        });
        sourceTotalDataPromise.then((mapSourceTotalData) => {
          // console.log("promised resolved");
          this.mapSourceTotalData = mapSourceTotalData;
          console.log("loaded mapSourceSourceTotalData");
          console.log(this.mapSourceTotalData);
        });

        console.log("valuesForDataSeries");
        let values = Object.values(this.mapSettingsData);
        console.log("values");
        console.log(values);
        console.log("selectedDataType");
        console.log(this.selectedDataType);
        let selectedDataType = this.selectedDataType;
        let valuesForDataSeries = values.filter(function (e) {
          return e.Display_Data_Type === selectedDataType;
        });
        console.log(valuesForDataSeries);
        this.selectedDataSeriesOptions =
          optionsListToObjectArrayWithMappingCodeLabelForDataSeries(
            new Set(
              valuesForDataSeries.map((item) => item.Display_Data_Series)
            ),
            valuesForDataSeries
          );
        // this.selectedDataSeriesOptions = Array.from(
        //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
        // );
        this.selectedDataSeries =
          this.selectedDataSeriesOptions[
            this.selectedDataSeriesOptions.length - 1
          ];
        this.selectedSegment = findMarketSegmentDataV4(
          Object.values(this.mapSettingsData),
          this.selectedGeographiesShapes,
          this.selectedAgeSegment,
          this.selectedIncomeSegment,
          this.selectedDataType,
          this.selectedDataSeries
        );
        let newSegment = this.selectedSegment;
        console.log("line 4119");
        console.log("newSegment");
        console.log(newSegment);
        this.segmentSettings =
          this.mapSettingsData[newSegment.SeriesShortUnique];
        // Comp chart data

        // Comp data load
        const settingsCompDataResponse = await fetch(
          `${this.base_asset_url}/${this.selectedSummaryMarket.toLowerCase()}_${
            this.selectedGeoUnitsComp
          }_settings_data_v${this.compMapVersion}.json`
        );
        const mapSettingsCompData = await settingsCompDataResponse.json();
        this.mapSettingsCompData = await mapSettingsCompData;

        this.selectedSegmentComp = findMarketSegmentData(
          Object.values(this.mapSettingsCompData),
          this.selectedGeographiesShapes,
          this.selectedAgeSegment,
          this.selectedIncomeSegment,
          this.selectedDataType,
          this.selectedDataSeries
        );
        console.log("selectedSegmentComp");
        console.log(this.selectedSegmentComp);
        console.log(this.mapSettingsCompData);
        this.segmentSettingsComp = this.selectedSegmentComp;
        this.previousSegmentSettingsComp = this.segmentSettingsComp;
        // this.selectedSegment = await Object.values(this.mapSettingsData)[0];
        // this.previousSelectedSegment = await Object.values(
        //   this.mapSettingsData
        // )[0];
        this.previousSelectedSegmentComp = this.selectedSegmentComp;
        // End comp data load

        this.pointData = this.allPointData[this.selectedMarket]
          ? this.allPointData[this.selectedMarket]
          : [];
        this.selectedFeatures = [];

        // document.getElementById("input_horizontal_segment").value =this.selectedSegment
        // this.getMapSettingsData();
        let newZoom = this.map.getZoom();
        let { lng, lat } = this.map.getCenter();
        let newCenter = [lng, lat];
        if (resetView) {
          newZoom = this.zoom;
          newCenter = [this.mapCenter.lon, this.mapCenter.lat];
        }
        var newView = {
          center: newCenter,
          zoom: newZoom,
          bearing: 0,
          pitch: 0,
          speed: 3.0,
          curve: 1.0,
        };
        this.map.flyTo(newView);
        this.map.once("moveend", () => {
          this.loading = false;
        });

        // this.getMapData()

        // const geojsonSource = this.map.getSource("dataSource");
        // const geojsonLabelSource = this.map.getSource("dataLabelSource");

        if (this.map.getSource("dataSource")) {
          // geojsonSource.setData(this.mapSourceData);
          // geojsonLabelSource.setData(this.mapLabelSourceData);
          // console.log("this.segmentSettings***");
          // console.log(this.segmentSettings);
          // let max = Math.max(...mapSourceData.features.map(values => ( parseFloat(values.properties[this.selectedSegment]) )) )
          console.log("line 4102");
          console.log(this.segmetnSettings);
          console.log(this.selectedSegment);
          let min = this.segmentSettings["MinValue"];
          let max = this.segmentSettings["MaxValue"];
          // if (
          //   this.segmentSettings["Display_Data_Type"] == "Percent" ||
          //   this.segmentSettings["Display_Data_Type"] == "2:Percent" ||
          //   this.segmentSettings["Display_Data_Type"] == "Index" ||
          //   this.segmentSettings["Display_Data_Type"] == "4:Percent Change" ||
          //   this.segmentSettings["Display_Data_Type"] == "5:Growth"
          // ) {
          if (
            this.percentTypes.includes(
              this.segmentSettings["Display_Data_Type"]
            )
          ) {
            min = parseFloat(min);
            max = parseFloat(max);
          } else {
            min = parseInt(min);
            max = parseInt(max);
          }
          console.log("minmax");
          console.log(min);
          console.log(max);
          let startColor = this.segmentSettings["HeatMapStartColor"];
          let endColor = this.segmentSettings["HeatMapEndColor"];
          // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
          let firstSymbolId;
          const layers = this.map.getStyle().layers;
          for (const layer of layers) {
            if (layer.id === "road-motorway-trunk") {
              firstSymbolId = layer.id;
              break;
            }
          }
          // console.log('symbol layer')
          // console.log(firstSymbolId)
          console.log("addLayer");
          console.log(min, startColor, max, endColor);
          if (min > max) {
            let temp = min;
            min = max;
            max = temp;
          }
          let colorRange = [min, startColor, max, endColor];
          if (min < 0 && max > 0) {
            colorRange = [
              min,
              startColor,
              0,
              // this.legendZeroColor,
              ["rgba", 255, 255, 255, 0],
              max,
              endColor,
            ];
          }
          console.log("colorRange", colorRange);
          console.log("selectedMarketDataTilesetLayer");
          console.log(this.selectedMarketDataTilesetLayer);
          console.log("selectedMarketLabelTilesetLayer");
          console.log(this.selectedMarketLabelTilesetLayer);
          console.log("this.segmentSettings");
          console.log(this.segmentSettings);
          console.log("this.segmentSettings.SeriesShortUnique");
          console.log(this.segmentSettings.SeriesShortUnique);
          this.map.addLayer(
            {
              id: this.segmentSettings.SeriesShortUnique,
              type: "fill",
              source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              "source-layer": this.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              background: "#0000ff",
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["number", ["get", this.segmentSettings.mapbox_segment]],
                  ...colorRange,
                ],
                "fill-opacity": this.opacity / 100,
                "fill-outline-color": "#000000",
              },
            },
            firstSymbolId
          );
          // console.log("this.geoJsonGeoProperty");
          // console.log(this.geoJsonGeoProperty);
          this.map.addLayer(
            {
              id: `${this.segmentSettings.SeriesShortUnique}-filtered`,
              type: "fill",
              source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              "source-layer": this.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              paint: {
                //#EC0303 #0305EC
                "fill-outline-color": "#000000",
                "fill-color": "rgba(0,0,0,1)",
                "fill-opacity": 0.3,
              },
              filter: ["in", this.geoJsonGeoProperty, ""],
            },
            firstSymbolId
          );
          let geoLayerVisibility =
            this.geoLabelVisibility == "On" ? "visible" : "none";
          // console.log(geoLayerVisibility);
          this.map.addLayer({
            id: "geoLabels",
            type: "symbol",
            source: "dataLabelSource",
            "source-layer": this.selectedMarketLabelTilesetLayer,
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
          // this.selectedSegment = Object.values(this.mapSettingsData)[0];
          console.log("this.selectedSegment");
          console.log(this.mapSettingsData);
          console.log(this.selectedGeographiesShapes);
          console.log(this.selectedAgeSegment);
          console.log(this.selectedIncomeSegment);
          console.log(this.selectedDataType);
          console.log(this.selectedDataSeries.code);
          this.selectedSegment = findMarketSegmentDataV4(
            Object.values(this.mapSettingsData),
            this.selectedGeographiesShapes,
            this.selectedAgeSegment,
            this.selectedIncomeSegment,
            this.selectedDataType,
            this.selectedDataSeries
          );
          // console.log(`updating segment with new market: ${this.selectedSegment}`)
          this.selectedSegmentOptions = {
            code: this.selectedSegment.SeriesShortUnique,
            label: this.selectedSegment.SeriesShortUnique,
          };
          this.updateSelectedSegments();
        }
        this.disableInputs = false;
      }
    },
    updateSelectedSegments() {
      console.log("updateSelectedSegments");
      console.log(this.mapSourceData);
      if (this.range > 0) {
        let units = "M";

        this.selectedFeatures = featuresInRangeOfPointsNew(
          this.mapSourceData,
          this.pointData,
          this.pointDataRanges[this.selectedMarket],
          this.range,
          this.geoJsonGeoProperty,
          units
        );
        this.selectedTotalFeatures = featuresInRangeOfPointsNew(
          this.mapSourceTotalData,
          this.pointData,
          this.pointDataRanges[this.selectedMarket],
          this.range,
          this.geoJsonGeoProperty,
          units
        );
        this.selectedTotalFeaturesCSV = featuresInRangeOfPointsCsvNew(
          this.mapSourceTotalData,
          this.pointData,
          this.pointDataRanges[this.selectedMarket],
          this.range,
          this.geoJsonGeoProperty,
          units
        );
        this.selectedFeaturesCSV = featuresInRangeOfPointsCsvNew(
          this.mapSourceData,
          this.pointData,
          this.pointDataRanges[this.selectedMarket],
          this.range,
          this.geoJsonGeoProperty,
          units
        );

        let geoJsonGeoProperty = this.geoJsonGeoProperty;
        var filter = this.selectedFeatures.reduce(
          function (memo, feature) {
            memo.push(feature[geoJsonGeoProperty]);
            return memo;
          },
          ["in", geoJsonGeoProperty]
        );
        // console.log(filter);
        this.map.setFilter(
          `${this.segmentSettings.SeriesShortUnique}-filtered`,
          filter
        );
      }
    },

    selectComparisonMarkets() {
      this.$bvModal.show("modal-markets-comparison");
    },
    toggleShowSettings: function () {
      this.showSettings = this.showSettings ? false : true;
    },
    toggleflowShowSettings: function () {
      this.flowShowSettings = this.flowShowSettings ? false : true;
    },
    toggleCountSelector: function (method) {
      this.selectedFeatures = [];
      if (method === "contiguous") {
        this.contiguousCountSelector =
          this.contiguousCountSelector === "On" ? "Off" : "On";
        this.countSelector = "Off";
        this.showGeoCounter = false;
        this.countSelector = this.contiguousCountSelector;
        if (this.contiguousCountSelector === "On") {
          this.distinctCountSelector = "Off";
        }
      } else if (method === "distinct") {
        this.distinctCountSelector =
          this.distinctCountSelector === "On" ? "Off" : "On";
        this.countSelector = "Off";
        this.showGeoCounter = false;
        this.countSelector = this.distinctCountSelector;
        if (this.countSelector === "On") {
          this.contiguousCountSelector = "Off";
        }
      }

      this.selectedFeatures = [];
    },
    toggleGeoUnits() {
      this.selectedGeoUnits = this.selectedGeoUnits == "zip" ? "bg" : "zip";
      this.selectedGeoUnitsComp =
        this.selectedGeoUnitsComp == "zip" ? "bg" : "zip";
    },
    toggleGeoLabels() {
      this.geoLabelVisibility = this.geoLabelVisibility == "On" ? "Off" : "On";
    },
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.showSettings = true;
      if (this.fullscreen) {
        this.map.removeControl(this.navigationControl);
        let navigationPosition = this.fullscreen ? "bottom-right" : "top-right";

        this.map.addControl(this.navigationControl, navigationPosition);
        // console.log("add control 1");
        // console.log(navigationPosition);
        // console.log(this.fullscreen);
      } else {
        this.map.removeControl(this.navigationControl);
        let navigationPosition = this.fullscreen ? "bottom-right" : "top-right";
        // console.log("add control 2");
        // console.log(navigationPosition);
        this.map.addControl(this.navigationControl, navigationPosition);
      }
      let map = this.map;

      this.map.setCenter(this.mapCenter);
      setTimeout(function () {
        map.resize();
      }, 100);
    },
    toggleFullScreenApi() {
      this.$fullscreen.toggle();
      toggleFlowFullScreen;
    },
    toggleFlowFullScreen() {
      this.flowFullScreen = !this.flowFullScreen;
      this.flowShowSettings = true;
      if (this.flowFullScreen) {
        console.log("remove control");
        this.flowMap.removeControl(this.flowmapNavigationControl);
        this.flowMap.removeControl(this.flowmapHomeControl);
        let navigationPosition = this.flowFullScreen
          ? "top-right"
          : "bottom-left";

        this.flowMap.addControl(this.flowmapHomeControl, "bottom-left");
        this.flowMap.addControl(this.flowmapNavigationControl, "bottom-left");
        // console.log("add control 1");
        // console.log(navigationPosition);
        // console.log(this.fullscreen);
      } else {
        console.log("remove control 2");
        this.flowMap.removeControl(this.flowmapNavigationControl);
        this.flowMap.removeControl(this.flowmapHomeControl);
        let navigationPosition = this.flowFullScreen
          ? "bottom-right"
          : "top-right";
        // console.log("add control 2");
        // console.log(navigationPosition);
        this.flowMap.addControl(this.flowmapNavigationControl, "bottom-left");
        this.flowMap.addControl(this.flowmapHomeControl, "bottom-left");
      }
      let flowMap = this.flowMap;

      this.flowMap.setCenter(this.flowMapCenter);
      console.log("****** RESIZE TRIGGERED ******");
      setTimeout(function () {
        flowMap.resize();
        console.log("****** RESIZE TRIGGERED AGAIN ******");
      }, 500);
    },
    // required because of mapbox sizing issue when hidden
    onTabChange(tab) {
      if (tab == 0) {
        setTimeout(() => {
          this.map.resize();
        }, 100);
      }
      if (tab == 1) {
        console.log("resize flow map");
        this.flowFirstTime = true;
        setTimeout(() => {
          console.log("resize flow map now");
          this.flowSelectedMovementDirection = "in";
          this.flowMap.resize();
          this.resetView();
          // console.log("resize map");
          // setTimeout(() => {
          //   this.updateDeck();
          //   console.log("update deck");
          // }, 200);
        }, 200);
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
      }
    },
    showDropLocationModal() {
      // this.$refs[].show()
      this.$bvModal.show("modal-drop-location");

      this.range = this.selectedMarketType == "dma" ? 10 : 25;
    },
    showVideoTutorialModal() {
      // this.$refs[].show()
      this.$bvModal.show("modal-video-tutorial");
    },
    showTosModalSettings() {
      // this.$refs[].show()
      this.$bvModal.show("modal-settings");
    },
    showOpacityModal() {
      // this.$refs[].show()
      this.$bvModal.show("modal-opacity");
    },
    hideOpacityModal() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-opacity");
    },
    showDataInRangeModal() {
      // this.$refs[].show()

      this.selectedFeatures = featuresInRangeOfPoints(
        this.mapSourceData,
        this.pointData,
        this.range,
        "M"
      );
      let geoJsonGeoProperty = this.geoJsonGeoProperty;
      var filter = this.selectedFeatures.reduce(
        function (memo, feature) {
          memo.push(feature[geoJsonGeoProperty]);
          return memo;
        },
        ["in", geoJsonGeoProperty]
      );
      this.map.setFilter(
        `${this.segmentSettings.SeriesShortUnique}-filtered`,
        filter
      );

      this.$bvModal.show("modal-data-in-range");
    },
    hideDataInRangeModal() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-data-in-range");
    },
    hideSettingsModal() {
      // this.$refs[].show()
      this.$bvModal.hide("modal-settings");
    },
    hideMarketComparisonModal() {
      this.$bvModal.hide("modal-markets-comparison");
    },

    showTosModalCsv(type) {
      // this.$refs[].show()
      if (type === "csv") {
        this.downloadRequestFunction = "downloadDataCsv";
      } else if (type === "points") {
        this.hideDataInRangeModal();
        this.downloadRequestFunction = "downloadSelectedDataCsv";
      } else if (type === "summary") {
        this.hideDataInRangeModal();
        this.downloadRequestFunction = "downloadSelectedSummaryDataCsv";
      } else if (type === "flow") {
        this.hideDataInRangeModal();
        this.downloadRequestFunction = "downloadFlowDataCsv";
      }
      this.$bvModal.show("modal-tos");
    },
    showTosModalImage() {
      // this.$refs[].show()
      this.downloadRequestFunction = "downloadImage";
      this.$bvModal.show("modal-tos");
    },
    acceptTerms() {
      this.$bvModal.hide("modal-tos");
      this.tosAccepted = true;
      if (this.downloadRequestFunction === "downloadDataCsv") {
        this.downloadDataCsv();
      } else if (this.downloadRequestFunction === "downloadImage") {
        this.downloadImage();
      } else if (this.downloadRequestFunction === "downloadSelectedDataCsv") {
        this.downloadSelectedDataCsv();
      } else if (
        this.downloadRequestFunction === "downloadSelectedSummaryDataCsv"
      ) {
        this.downloadSelectedSummaryDataCsv();
      } else if (this.downloadRequestFunction === "downloadFlowDataCsv") {
        this.downloadFlowDataCsv();
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
      if (this.pointDataLength > 0) {
        newNumber =
          Math.max(...this.pointData.map((x) => parseInt(x.Number))) + 1;
      }
      this.mapCenter.lon, this.mapCenter.lat;
      let newPoint = {
        Number: newNumber,
        Title: "New Data Point",
        Latitude: this.mapCenter.lat,
        Longitude: this.mapCenter.lon,
        Color: 1,
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
      console.log("handleCSVData");
      console.log(data);
      // this.allPointData[this.selectedMarket] = [];
      // this.pointData = [];
      let newPoints = [];
      data.forEach((point) => {
        console.log("this.pointData");
        console.log(this.pointData);
        console.log(point);
        let latitude = parseFloat(point.Latitude);
        let longitude = parseFloat(point.Longitude);
        if (validLatitude(latitude) && validLongitude(longitude)) {
          let newPoint = {
            Latitude: parseFloat(point.Latitude),
            Longitude: parseFloat(point.Longitude),
            Title: point.Title,
            Number: parseInt(point.Number),
            Color: parseInt(point.Color),
            id: parseInt(point.Number),
          };
          // console.log(newPoint)
          newPoints.push(newPoint);
          // console.log(newPoints)
        } else {
          //
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
      // let marketData = this.allPointData;
      // marketData[this.selectedMarket] = newPoints;
      // console.log("newPoints");
      // console.log(newPoints);
      this.pointData = newPoints;
      this.allPointData[this.selectedMarket] = newPoints;
      console.log("updating data");
      // console.log(this.allPointData);
      // console.log(this.selectedMarket);
      console.log(newPoints);
      console.log(this.pointData);
      // let marketData = this.allPointData;
      // marketData[this.selectedMarket] = newPoints;

      // this.allPointData = marketData;
      // this.selectedMarket;
      // console.log(newPoints);
      // console.log(this.allPointData[this.selectedMarket]);
      //
      // this.allPointData[this.selectedMarket] = []
      // this.markerGeoJSON = this.convertPointsToGeoJSON(newPoints);
      this.markerGeoJSON = this.convertPointsToGeoJSON(this.pointData);
      // this.allPointData[this.selectedMarket] = newPoints
      // geojson = this.convertPointsToGeoJSON(newPoints)
    },
    convertDataPoint(dataPoint) {
      return {
        Latitude: parseFloat(dataPoint.Latitude),
        Longitude: parseFloat(dataPoint.Longitude),
        Title: dataPoint.Title,
        Color: dataPoint.Color,
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
    updateFlowData(selectOnly = false) {
      console.log("updateFlowData");
      console.log(this.flowMapData);
      // if (this.flowSelectedMovementDirection == "net") {
      //   this.flowMapData = this.flowMapData["net"];
      // } else {
      //   this.flowMapData = this.flowMapData["percent"];
      // }
      console.log(
        this.flowMapData,
        this.marketSettingsData,
        this.flowSelectedMarketTypeDetails,
        this.flowSelectedMarket,
        this.flowSelectedGeoSegment,
        this.flowSelectedMovementDirection,
        this.flowSelectedGeoSegment,
        this.flowExcludeWithinState,
        this.flowSelectedAgeSegment,
        this.flowSelectedIncomeSegment
      );
      let data = getIntermarketData(
        this.flowMapData,
        this.marketSettingsData,
        this.flowSelectedMarketTypeDetails,
        this.flowSelectedMarket,
        this.flowSelectedGeoSegment,
        this.flowSelectedMovementDirection,
        this.flowSelectedGeoSegment,
        this.flowExcludeWithinState,
        this.flowSelectedAgeSegment,
        this.flowSelectedIncomeSegment,
        this.flowDataTableData,
        selectOnly
      );

      this.intermarketData = data;
      this.flowDataTableData = this.dataTableItems;
      // console.log("updated here");
      // this.intermarketLocationData = this.intermarketData.locations;
      // this.intermarketFlowData = this.intermarketData.flows;
      if (data.locations.length > 0) {
        // this.intermarketLocationData = data.locations;
        console.log("updating Deck");
        this.updateDeck();
      }
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
      // import marketSettingsData from "../public/geospatial_settings.json"
      // import marketSummaryChartsData from "../public/market_summary_charts.json"
      // TODO figure out how to load these files from the server at launch
      // console.log('LOADING MAP')
      // const marketSettingsData = await fetch(`${this.base_asset_url}/geospatial_settings.json`)
      // this.marketSettingsData = marketSettingsData
      // const marketSummaryChartsData = await fetch(`${this.base_asset_url}/market_summary_charts.json`)
      // this.marketSummaryChartsData = marketSummaryChartsData
      this.allPointData = this.initialPointList;

      // const mapLabelsDataResponse = await fetch(
      //   `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
      //     this.selectedGeoUnits
      //   }_labels.json`
      // );
      // const mapLabelsData = await mapLabelsDataResponse.json();
      // this.mapLabelSourceData = mapLabelsData;

      const videoDataResponse = await fetch(
        `${this.base_asset_url}/${this.videoFileName}`
      );
      const videoData = await videoDataResponse.json();
      this.videoOptions = videoData;
      const flowDataResponse = await fetch(
        `${this.base_asset_url}/intermarketdata-20240115.json`
      );
      console.log(flowDataResponse);
      const flowMapDataBase = await flowDataResponse.json();
      console.log(flowMapDataBase);
      this.flowMapDataBase = flowMapDataBase;
      if (this.flowSelectedMovementDirection == "net") {
        this.flowMapData = this.flowMapDataBase["net"];
      } else {
        this.flowMapData = this.flowMapDataBase["percent"];
      }

      console.log("flowMapDataBase");
      console.log(flowMapDataBase);
      let flowMapData = this.flowMapData;
      // this.flowMapData = flowMapData;
      console.log("flowMapDataBase");
      console.log(flowMapDataBase);
      console.log(flowMapData);
      if (this.flowMarketType == "metro_areas") {
        this.mapFlowSourceData = flowMapData.metro_areas;
        this.flowMarketListOptions = this.flowMetroAreaListOptions;
      } else {
        this.mapFlowSourceData = flowMapData.states;
        this.flowMarketListOptions = this.flowStatesListOptions;
      }
      // console.log("loaded flow data");
      // console.log(flowMapData);
      if (this.flowSelectedMarketType == "metro_areas") {
        this.flowSelectedGeoSegment = this.flowSelectedMetroAreaOption;
      } else {
        this.flowSelectedGeoSegment = this.flowSelectedStatesOption;
      }

      let data = getIntermarketData(
        flowMapData,
        this.marketSettingsData,
        this.flowSelectedMarketType,
        this.flowSelectedMarket,
        this.flowSelectedGeoSegment,
        this.flowSelectedMovementDirection,
        this.flowSelectedGeoSegment,
        this.flowExcludeWithinState,
        this.flowSelectedAgeSegment,
        this.flowSelectedIncomeSegment
      );
      console.log("loaded flow data");
      console.log(data);

      this.intermarketData = data;
      this.intermarketLocationData = this.intermarketData.locations;
      this.intermarketFlowData = this.intermarketData.flows;

      // intermarketdata-20221115
      // const settingsDataResponse = await fetch(
      //   `${this.base_asset_url}/${this.flowSelectedMarket.toLowerCase()}_${
      //     this.selectedGeoUnits
      //   }_settings_data_v${this.mapVersion}.json`
      // );
      let geo = this.country == "mexico" ? "geo" : this.selectedGeoUnits;
      console.log("line 4413");
      console.log("market", this.selectedMarket);
      // let settingsDataFilename = `${
      //   this.base_asset_url
      // }/${this.selectedMarket.toLowerCase()}_${geo}_settings_data_v${
      //   this.compMapVersion
      // }.json`;
      console.log("4842");
      console.log(this.selectedEthnicity);
      let ethnicityName =
        this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
          .output_suffix;
      console.log("this.dataTypeSlugMappingV4");
      console.log(this.dataTypeSlugMappingV4);
      console.log("this.selectedDataType");
      console.log(this.selectedDataType);
      let dataTypeName =
        this.dataTypeSlugMappingV4[this.selectedDataType].toLowerCase();
      let settingsDataFilename = `${
        this.base_asset_url
      }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${dataTypeName}_settings_data_v${
        this.mapVersion
      }.json`;
      console.log(settingsDataFilename);
      const settingsDataResponse = await fetch(settingsDataFilename);
      const mapSettingsData = await settingsDataResponse.json();
      this.mapSettingsData = mapSettingsData;

      // Comp data load
      const settingsCompDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedSummaryMarket.toLowerCase()}_${
          this.selectedGeoUnitsComp
        }_settings_data_v${this.compMapVersion}.json`
      );
      const mapSettingsCompData = await settingsCompDataResponse.json();
      this.mapSettingsCompData = await mapSettingsCompData;

      this.selectedSegmentComp = findMarketSegmentData(
        Object.values(this.mapSettingsCompData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      console.log("selectedSegmentComp");
      console.log(this.selectedSegmentComp);
      console.log(this.mapSettingsCompData);
      this.segmentSettingsComp = this.selectedSegmentComp;
      this.previousSegmentSettingsComp = this.segmentSettingsComp;
      // this.selectedSegment = await Object.values(this.mapSettingsData)[0];
      // this.previousSelectedSegment = await Object.values(
      //   this.mapSettingsData
      // )[0];
      this.previousSelectedSegmentComp = this.selectedSegmentComp;
      // End comp data load

      this.segmentSettings = Object.values(this.mapSettingsData)[0];
      this.previousSegmentSettings = Object.values(this.mapSettingsData)[0];
      let values = Object.values(this.mapSettingsData);
      this.GeographiesShapesOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.GeographiesShapes)),
      ]);
      // console.log('options')
      // console.log(this.GeographiesShapesOptions);
      this.selectedGeographiesShapes = this.GeographiesShapesOptions[0].value;
      // console.log(this.selectedGeographiesShapes);
      this.selectedAgeSegmentOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.Display_Age_Segment)),
      ]);
      // console.log("selectedAgeSegmentOptions");
      // console.log(this.selectedAgeSegmentOptions);
      this.selectedAgeSegment =
        this.selectedAgeSegment || this.selectedAgeSegmentOptions[0].value;
      // console.log(this.selectedAgeSegment);
      this.selectedIncomeSegmentOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.Display_Income_Segment)),
      ]);
      this.selectedIncomeSegment =
        this.selectedIncomeSegment ||
        this.selectedIncomeSegmentOptions[1].value;
      // console.log(this.selectedIncomeSegment);
      this.selectedDataTypeOptions =
        optionsListToObjectArrayWithMappingCodeLabel(
          [...new Set(Object.keys(this.dataTypeNameMappingV4))],
          this.dataTypeNameMappingV4
        );
      console.log("selectedDataTypeOptions");
      console.log("4924");
      console.log(this.selectedDataTypeOptions);
      // *** HERE
      this.segmentCompSettings = Object.values(this.mapSettingsData)[0];
      this.previousSegmentCompSettings = Object.values(
        this.mapSettingsCompData
      )[0];
      let compValues = Object.values(this.mapSettingsCompData);
      // this.GeographiesShapesOptions = optionsListToObjectArray([
      //   ...new Set(values.map((item) => item.GeographiesShapes)),
      // ]);
      // console.log('options')
      // console.log(this.GeographiesShapesOptions);
      // this.selectedGeographiesShapes = this.GeographiesShapesOptions[0].value;
      // console.log(this.selectedGeographiesShapes);
      this.selectedAgeSegmentCompOptions = optionsListToObjectArray([
        ...new Set(compValues.map((item) => item.Display_Age_Segment)),
      ]);
      // console.log("selectedAgeSegmentOptions");
      // console.log(this.selectedAgeSegmentOptions);
      this.selectedAgeSegmentComp =
        this.selectedAgeSegmentComp ||
        this.selectedAgeSegmentCompOptions[0].value;
      // console.log(this.selectedAgeSegment);
      this.selectedIncomeSegmentCompOptions = optionsListToObjectArray([
        ...new Set(compValues.map((item) => item.Display_Income_Segment)),
      ]);
      this.selectedIncomeSegmentComp =
        this.selectedIncomeSegmentComp ||
        this.selectedIncomeSegmentCompOptions[1].value;
      // console.log(this.selectedIncomeSegment);

      let selectedDataType =
        this.selectedDataType || this.selectedDataTypeOptions[0].code;
      this.selectedDataType = selectedDataType;
      // console.log(this.selectedDataType);
      console.log("***selectedDataType");
      console.log(selectedDataType);
      console.log(values);

      let valuesForDataSeries = values.filter(function (e) {
        return e.Display_Data_Type === selectedDataType;
      });
      console.log("valuesForDataSeries");
      console.log(valuesForDataSeries);
      // this.selectedDataSeriesOptions = optionsListToObjectArraySelect([
      //   ...new Set(values.map((item) => item.Display_Data_Series)),
      // ]);
      this.selectedDataSeriesOptions =
        optionsListToObjectArrayWithMappingCodeLabelForDataSeries(
          new Set(valuesForDataSeries.map((item) => item.Display_Data_Series)),
          valuesForDataSeries
        );

      // this.selectedDataSeriesOptions = Array.from(
      //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      // );
      console.log("selectedDataSeriesOptions");
      console.log(this.selectedDataSeriesOptions);
      this.selectedDataSeries =
        this.selectedDataSeries ||
        this.selectedDataSeriesOptions[
          this.selectedDataSeriesOptions.length - 1
        ];
      // console.log("series value");
      // console.log(this.selectedDataSeriesOptions);
      // console.log(this.selectedDataSeriesOptions[0].value);
      // console.log(this.selectedDataSeries);
      // this.selectedSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   this.selectedDataType,
      //   this.selectedDataSeries
      // );
      // console.log("seeing here");
      // const mapDataResponse = await fetch(
      //   `${
      //     this.base_asset_url
      //   }/${this.selectedMarket.toLowerCase()}_${this.dataTypeNameMapping[
      //     this.selectedDataType
      //   ].toLowerCase()}_data.json`
      // );
      // const mapData = await mapDataResponse.json();
      // this.mapSourceData = mapData;
      await this.loadMapSourceData();

      // this.selectedSegment = Object.values(this.mapSettingsData)[0]
      // this.previousSelectedSegment = Object.values(this.mapSettingsData)[0]

      // this.selectedSegment = {
      //   code: this.selectedSegment.SeriesShortUnique,
      //   label: this.selectedSegment.SeriesShortUnique,
      // };
      console.log("***this.computedMarketOptions");
      console.log(this.computedMarketOptions);
      this.selectedComputedMarketOptions =
        this.computedMarketOptions[0]["options"];
      this.flowComputedMarketOptions = this.computedMarketOptions[1]["options"];
      // TODO fix after mexico
      // this.flowComputedMarketOptions = this.computedMarketOptions[0]["options"];
      this.pointData = this.allPointData[this.selectedMarket]
        ? this.allPointData[this.selectedMarket]
        : [];
    },
    async updateIntramarketData() {
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
      // import marketSettingsData from "../public/geospatial_settings.json"
      // import marketSummaryChartsData from "../public/market_summary_charts.json"
      // TODO figure out how to load these files from the server at launch
      // console.log('LOADING MAP')
      // const marketSettingsData = await fetch(`${this.base_asset_url}/geospatial_settings.json`)
      // this.marketSettingsData = marketSettingsData
      // const marketSummaryChartsData = await fetch(`${this.base_asset_url}/market_summary_charts.json`)
      // this.marketSummaryChartsData = marketSummaryChartsData
      this.allPointData = [];

      // const mapLabelsDataResponse = await fetch(
      //   `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
      //     this.selectedGeoUnits
      //   }_labels.json`
      // );
      // const mapLabelsData = await mapLabelsDataResponse.json();
      // this.mapLabelSourceData = mapLabelsData;

      // HERENOW

      let geo = this.country == "mexico" ? "geo" : this.selectedGeoUnits;
      console.log("line 4613");
      console.log("market", this.selectedMarket);
      console.log("geo", this.selectedGeoUnits);
      // FIX NOW TODO
      let ethnicityName =
        this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
          .output_suffix;
      let dataTypeName =
        this.dataTypeSlugMappingV4[this.selectedDataType].toLowerCase();
      let settingsDataFilename = `${
        this.base_asset_url
      }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${dataTypeName}_settings_data_v${
        this.mapVersion
      }.json`;
      console.log(settingsDataFilename);
      const settingsDataResponse = await fetch(settingsDataFilename);
      const mapSettingsData = await settingsDataResponse.json();
      this.mapSettingsData = mapSettingsData;

      // TODO
      // TODO
      // TODO - set up comp settings  data and selectedAgeSegmentCompOptions,selectedIncomeSegmentCompOptions
      this.segmentSettings = Object.values(this.mapSettingsData)[0];
      // this.previousSegmentSettings = Object.values(this.mapSettingsData)[0];
      let values = Object.values(this.mapSettingsData);
      this.GeographiesShapesOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.GeographiesShapes)),
      ]);
      // console.log('options')
      // console.log(this.GeographiesShapesOptions);
      this.selectedGeographiesShapes = this.GeographiesShapesOptions[0].value;
      // console.log(this.selectedGeographiesShapes);
      this.selectedAgeSegmentOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.Display_Age_Segment)),
      ]);
      // console.log("selectedAgeSegmentOptions");
      // console.log(this.selectedAgeSegmentOptions);
      this.selectedAgeSegment = this.selectedAgeSegmentOptions[0].value;
      // console.log(this.selectedAgeSegment);
      this.selectedIncomeSegmentOptions = optionsListToObjectArray([
        ...new Set(values.map((item) => item.Display_Income_Segment)),
      ]);
      this.selectedIncomeSegment = this.selectedIncomeSegmentOptions[1].value;
      // console.log(this.selectedIncomeSegment);
      this.selectedDataTypeOptions =
        optionsListToObjectArrayWithMappingCodeLabel(
          [...new Set(Object.keys(this.dataTypeNameMappingV4))],
          this.dataTypeNameMappingV4
        );
      console.log("selectedDataTypeOptions");
      console.log("5101");
      console.log(this.selectedDataTypeOptions);
      // *** HERE

      let selectedDataType = this.selectedDataTypeOptions[0].code;
      this.selectedDataType = selectedDataType;
      // console.log(this.selectedDataType);
      console.log("***selectedDataType");
      console.log(selectedDataType);
      console.log(values);
      let valuesForDataSeries = values.filter(function (e) {
        return e.Display_Data_Type === selectedDataType;
      });
      console.log("valuesForDataSeries");
      console.log(valuesForDataSeries);
      // this.selectedDataSeriesOptions = optionsListToObjectArraySelect([
      //   ...new Set(values.map((item) => item.Display_Data_Series)),
      // ]);
      this.selectedDataSeriesOptions = Array.from(
        new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      );
      console.log("selectedDataSeriesOptions");
      console.log(this.selectedDataSeriesOptions);
      this.selectedDataSeries =
        this.selectedDataSeriesOptions[
          this.selectedDataSeriesOptions.length - 1
        ];
      // console.log("series value");
      // console.log(this.selectedDataSeriesOptions);
      // console.log(this.selectedDataSeriesOptions[0].value);
      // console.log(this.selectedDataSeries);
      // this.selectedSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   this.selectedDataType,
      //   this.selectedDataSeries
      // );
      // console.log("seeing here");
      // const mapDataResponse = await fetch(
      //   `${
      //     this.base_asset_url
      //   }/${this.selectedMarket.toLowerCase()}_${this.dataTypeNameMapping[
      //     this.selectedDataType
      //   ].toLowerCase()}_data.json`
      // );
      // const mapData = await mapDataResponse.json();
      // this.mapSourceData = mapData;

      // this.selectedSegment = Object.values(this.mapSettingsData)[0]
      // this.previousSelectedSegment = Object.values(this.mapSettingsData)[0]

      // this.selectedSegment = {
      //   code: this.selectedSegment.SeriesShortUnique,
      //   label: this.selectedSegment.SeriesShortUnique,
      // };
      this.selectedComputedMarketOptions =
        this.computedMarketOptions[0]["options"];
      // this.flowComputedMarketOptions = this.computedMarketOptions[1]["options"];
      // TODO fix after mexico
      this.pointData = this.allPointData[this.selectedMarket]
        ? this.allPointData[this.selectedMarket]
        : [];
      await this.loadMapSourceData();
      let resetView = false;
      await this.reloadMap(resetView);
      var newView = {
        center: [this.mapCenter.lon, this.mapCenter.lat],
        zoom: this.zoom,
        bearing: 0,
        pitch: 0,
        speed: 3.0,
        curve: 1.0,
      };
      this.map.flyTo(newView);
      this.map.once("moveend", () => {
        this.loading = false;
      });
      this.countryChange = false;
      console.log("*** end country change ***");
    },
    getMapSourceData: function (dataType = "map") {
      let suffix = "_data";
      if (dataType == "labels") {
        suffix = "_labels";
      }
      console.log("line 4400");
      console.log("market", this.selectedMarket);
      //   fetch(
      //   `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
      //     this.selectedGeoUnits
      //   }_${suffix}_v${this.mapVersion}.json`
      // )
      // FIX NOW TODO
      fetch(
        `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
          this.selectedGeoUnits
        }_${suffix}_v${this.mapVersion}.json`
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
      console.log("line 4760");
      console.log("market", this.selectedMarket);
      // FIX NOW TODO
      fetch(
        `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
          this.selectedGeoUnits
        }_settings_data_v${this.mapVersion}.json`
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
          this.segmentSettings = Object.values(this.mapSettingsData)[0];
          this.previousSegmentSettings = Object.values(this.mapSettingsData)[0];
          this.selectedSegment = findMarketSegmentDataV4(
            Object.values(this.mapSettingsData),
            this.selectedGeographiesShapes,
            this.selectedAgeSegment,
            this.selectedIncomeSegment,
            this.selectedDataType,
            this.selectedDataSeries
          );
          // this.selectedSegment = Object.values(this.mapSettingsData)[0];
          // this.previousSelectedSegment = Object.values(this.mapSettingsData)[0];
          this.previousSelectedSegment = this.selectedSegment;
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
    async downloadFlowDataCsv() {
      // console.log("downloaddatacsv");

      let selectedSegment = findMarketSegmentData(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      // console.log("selectedSegment");
      // console.log(selectedSegment);
      // console.log(selectedSegment.mapbox_segment);
      // console.log(
      //   this.mapSourceData.features[0].properties[
      //     selectedSegment.SeriesShortUnique
      //   ]
      // );
      // console.log(selectedSegment);
      var str = "";
      let direction;
      if (this.flowSelectedMovementDirection == "in") {
        direction = "Inbound";
      } else if (this.flowSelectedMovementDirection == "out") {
        direction = "Outbound";
      } else if (this.flowSelectedMovementDirection == "net") {
        direction = "Net";
      }
      if (this.flowSelectedMarketType == "metro_areas") {
        let titleRow = [
          "Market",
          "State",
          "Age",
          "Income",
          "Direction",
          "Exclude Same State",
        ];
        str += titleRow.join(",");
        let reportRow = [
          this.marketSettingsData[this.flowSelectedMarket].Market_Display_Name,
          this.flowAgeSegmentOptions[this.flowSelectedAgeSegment],
          this.flowIncomeSegmentOptions[this.flowSelectedIncomeSegment],
          direction,
          this.flowExcludeWithinStateOptions[this.flowExcludeWithinState],
        ];
        str += "\r\n";
        str += reportRow.join(",");
        str += "\r\n";
      } else {
        let titleRow = ["Market", "Age", "Income", "Direction"];
        str += titleRow.join(",");
        str += "\r\n";
        let reportRow = [
          this.marketSettingsData[this.flowSelectedMarket].Market_Display_Name,
          this.flowAgeSegmentOptions[this.flowSelectedAgeSegment],
          this.flowIncomeSegmentOptions[this.flowSelectedIncomeSegment],
          direction,
        ];
        str += reportRow.join(",");
        str += "\r\n";
      }
      str += "\r\n";

      // console.log('datatype')
      // console.log(this.segmentSettings)
      let headers;
      if (this.flowSelectedMarketType == "metro_areas") {
        headers = ["Rank", "Metro Area"];
      }

      if (this.flowSelectedMarketType == "states") {
        headers = ["Rank", "State"];
      }
      if (this.flowSelectedMovementDirection == "net") {
        headers.push("Range");
      } else {
        headers.push("Percent (%)");
      }
      // console.log("headers");
      // console.log(headers);
      str += headers.join(",");
      str += "\r\n";
      for (var i = 0; i < this.flowDataTableData.length; i++) {
        let line = "";
        let rank = this.flowDataTableData[i].rank;
        let marketName = `"${this.flowDataTableData[i].market.replace(
          ", ",
          ","
        )}"`;
        let percent = `"${this.flowDataTableData[i].percent}"`;
        // let selected = this.flowDataTableData[i].selected ? "Y" : "N";
        line = [rank, marketName, percent].join(",");
        str += line + "\r\n";
      }
      var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Bain-${this.filenamePartialForSelectedFlowOptions}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async downloadDataCsv() {
      // console.log("downloaddatacsv");

      let selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      // console.log("selectedSegment");
      // console.log(selectedSegment);
      // console.log(selectedSegment.mapbox_segment);
      // console.log(
      //   this.mapSourceData.features[0].properties[
      //     selectedSegment.SeriesShortUnique
      //   ]
      // );
      // console.log(selectedSegment);
      let array;
      // console.log('datatype')
      // console.log(this.segmentSettings)
      if (this.selectedGeoUnits == "zip") {
        array = [
          ["Zip Code", this.dataTypeMapping[this.selectedDataType]],
          ...this.mapSourceData.map((f) => [
            f[this.geoJsonGeoProperty],
            f[selectedSegment.mapbox_segment],
          ]),
        ];
      }
      if (this.selectedGeoUnits == "bg") {
        // console.log(this.selectedSegment);
        // let features = await this.getMapFeatures();
        console.log(selectedSegment.mapbox_segment);
        array = [
          ["Block Group", this.dataTypeNameMappingV4[this.selectedDataType]],
          ...this.mapSourceData.map((f) => [
            f[this.geoJsonGeoProperty],
            f[selectedSegment.mapbox_segment],
          ]),
        ];
        // console.log(this.mapSourceData.features[0].properties);
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
        `Bain-${this.filenamePartialForSelectedOptions}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadSelectedDataCsv() {
      this.updateSelectedSegments();
      console.log("downloadSelectedDataCsv");
      let selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      console.log("selectedSegment");
      console.table(selectedSegment);
      let array;

      if (this.selectedGeoUnits == "zip") {
        array = [
          [
            "Zip Code",
            "Dropped Point",
            "Dropped Point Title",
            "Dropped Point Color",
            "Distance from shape centroid to point (mi)",
            `Selected Series ${
              this.dataTypeNameMappingV4[this.selectedDataType]
            } in Shape`,
          ],
        ];
        this.selectedFeaturesCSV.forEach((f) => {
          console.log("selected feature");
          console.table(f);
          array.push([
            f[4][this.geoJsonGeoProperty],
            f[0],
            f[1],
            f[2],
            f[3],
            f[4][selectedSegment.mapbox_segment],
          ]);
        });
      }

      if (this.selectedGeoUnits == "bg") {
        array = [
          [
            "Block Group",
            "Dropped Point",
            "Dropped Point Title",
            "Dropped Point Color",
            "Distance from shape centroid to point (mi)",
            `Selected Series ${
              this.dataTypeNameMappingV4[this.selectedDataType]
            } in Shape`,
          ],
        ];
        // console.log("selectedSegment", selectedSegment);
        this.selectedFeaturesCSV.forEach((f) => {
          // console.log(f);
          console.log("selected feature");
          console.table(f);
          array.push([
            f[4][this.geoJsonGeoProperty],
            f[0],
            f[1],
            f[2],
            f[3],
            f[4][selectedSegment.mapbox_segment],
          ]);
        });
      }
      console.log("array");
      console.table(array);
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
        `Bain-Selected Data-${this.filenamePartialForSelectedOptions}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // force deploy
    downloadSelectedSummaryDataCsv() {
      console.log("downloadSelectedSummaryDataCsv");

      let selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      console.log("this.totalMapSettingsData 1");
      console.log(this.totalMapSettingsData);
      // let totalDataSeries = this.selectedDataSeries.code.includes("to")
      //   ? `Y${this.selectedDataSeries.code.split("to")[1].trim()}`
      //   : this.selectedDataSeries.code;
      let totalDataSeries = "Y2023";
      console.log("total data series", totalDataSeries);
      console.log(
        Object.values(this.totalMapSettingsData),
        this.selectedTotalDataType,
        this.totalDataSeries
      );
      // let selectedTotalSegment = findMarketSegmentDataV4(
      //   Object.values(this.totalMapSettingsData),
      //   this.selectedGeographiesShapes,
      //   // this.selectedAgeSegment,
      //   "1:All",
      //   // this.selectedIncomeSegment,
      //   "1:All",
      //   this.selectedTotalDataType,
      //   { code: totalDataSeries, value: this.selectedDataSeries.value }
      // );
      let selectedTotalSegment = findMarketSegmentDataV4(
        Object.values(this.totalMapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        // "1:All",
        this.selectedIncomeSegment,
        // "1:All",
        this.selectedTotalDataType,
        { code: totalDataSeries, value: this.selectedDataSeries.value }
      );
      console.log("selectedSegment");
      console.log(selectedSegment);
      console.log("selectedTotalSegment");
      console.log(selectedTotalSegment);
      let allHouseholdTotalData = 0;
      let allHouseholdTotalCountData = 0;

      let accumulatedPointData = this.pointData.reduce((acc, p) => {
        acc[p.Number] = {
          id: p.id,
          number: p.Number,
          title: p.Title,
          color: p.Color,
          uniqueShapes: [],
          closestShapes: [],
          inRadiusShapes: [],
        };
        return acc;
      }, {});
      // console.log(accumulatedPointData);
      let array = [];

      let selectedSegmentTotal = 0;
      if (this.selectedGeoUnits == "bg" || this.selectedGeoUnits == "geo") {
        // array = [
        //   [
        //     "Block Group",
        //     "Closest Dropped Point",
        //     "Closest Dropped Point Title",
        //     "Distance from shape centroid to point (mi)",
        //     `Selected Series ${
        //       this.dataTypeMapping[this.selectedDataType]
        //     } in Shape`,
        //   ],
        // ];
        // Block Group
        // Point
        // Point Title
        // Point Color
        // Distance from shape centroid to point (mi)
        // Selected Series Household Count in Shape
        // Total Household Count in Shape from base data
        // Total Household Count in Shape from base data * Selected Series Household Percent in Shape - for percent averages

        this.selectedFeaturesCSV.forEach((f, index) => {
          let totalfeature = this.selectedTotalFeaturesCSV[index];
          let totalValue =
            totalfeature && selectedTotalSegment
              ? totalfeature[4][selectedTotalSegment.mapbox_segment]
              : 0;
          selectedSegmentTotal += totalValue;
          let value = f[4][selectedSegment.mapbox_segment]
            ? f[4][selectedSegment.mapbox_segment]
            : 0;
          array.push([
            f[4][this.geoJsonGeoProperty],
            f[0],
            f[1],
            f[2],
            f[3],
            value,
            totalValue,
            value * totalValue,
          ]);
          allHouseholdTotalCountData += totalValue;
        });
      }

      console.log("array", array);
      //  Sort by geo item and then range
      // array.sort((a, b) => a[0] - b[0] || b[4] - a[4]);
      array = array.sort((a, b) => b[0] - a[0] || b[4] - a[4]);

      // Go throught the sorted list to accumlate the results appropriately

      let currentRow = array[0];
      let currentGeoItem = currentRow[0];
      let previousGeoItem = null;
      let nextGeoItem = array[1][0];
      let currentClosestPin = currentRow[1];
      for (var j = 0; j < array.length; j++) {
        currentRow = array[j];
        // console.log(j);
        let geoItem = currentRow[0];
        if (j < array.length - 2) {
          nextGeoItem = array[j + 1][0];
        } else {
          nextGeoItem = null;
        }
        // Check if the geoItem has changed and update it
        let pin = currentRow[1];
        if (geoItem !== currentGeoItem) {
          currentGeoItem = geoItem;
          currentClosestPin = pin;
        }
        // Put the row in the inRadius Shapes
        accumulatedPointData[pin].inRadiusShapes.push(currentRow);
        // If this is the current closest, put the row in the closestShapes
        if (pin === currentClosestPin) {
          accumulatedPointData[pin].closestShapes.push(currentRow);
        }
        // Put the row in the uniqueShapes if the previous and next rows don't have the same geoItem
        // console.log("previousGeoItem", previousGeoItem);
        // console.log("geoItem", geoItem);
        // console.log("nextGeoItem", nextGeoItem);
        if (previousGeoItem == geoItem || nextGeoItem == geoItem) {
          // Do nothing
        } else {
          accumulatedPointData[pin].uniqueShapes.push(currentRow);
        }
        previousGeoItem = geoItem;
      }

      // Now we have accumulated the data
      console.log("accumulated data");
      console.log(accumulatedPointData);
      let csv_rows = [];

      let title_row = [
        "Bain Macro Trends Group | Geospatial Toolkit - Intra-market Mapping | Custom location summary report ",
      ];

      // let title_row = [
      //   `Bain Macro Trends Dropped Point Counts: ${
      //     this.marketSettingsData[this.selectedMarket].Market_Display_Name
      //   } :  Ages - ${this.selectedAgeSegmentDisplay} : Income - ${
      //     this.selectedIncomeSegmentDisplay
      //   } : ${this.selectedDataTypeDisplay} : ${this.selectedDataSeries} ${
      //     this.range
      //   } miles`,
      // ];
      csv_rows.push(title_row);
      csv_rows.push([]);
      csv_rows.push([
        "Market",
        ,
        this.intramarketMarketSettingsDataV4[this.selectedMarket]
          .Market_Display_Name,
      ]);
      csv_rows.push(["Ages", , this.selectedAgeSegmentDisplay]);
      csv_rows.push(["Income", , this.selectedIncomeSegmentDisplay]);
      csv_rows.push(["Ethnicity", , this.selectedEthnicity]);
      csv_rows.push([
        "Data type",
        ,
        this.dataTypeNameMappingV4[this.selectedDataType],
      ]);
      csv_rows.push([
        "Data series",
        ,
        renameDataSeries(this.selectedDataSeries.code),
      ]);
      csv_rows.push(["Radius", , `${this.range} miles`]);
      csv_rows.push([]);
      // TODO
      // Average for the entire market
      // Average for each of the 3 segments
      console.log("selected segment", selectedSegment);
      let allHouseholdData = this.mapSourceData.map(
        (f) => f[selectedSegment.mapbox_segment]
      );
      allHouseholdTotalData = this.mapSourceTotalData.map((f) =>
        selectedTotalSegment ? f[selectedTotalSegment.mapbox_segment] : 0
      );
      let allHouseholdTotalDataTotal = allHouseholdTotalData.reduce(
        (a, b) => a + b,
        0
      );
      console.log("allHouseholdTotalDataTotal", allHouseholdTotalDataTotal);
      let allHouseholdDataTotal = 0;
      // console.log("allHouseholdData");
      // console.log(allHouseholdData);
      console.log("allHouseholdData 0");
      let mapSourceData = this.mapSourceData;
      let mapSourceTotalData = this.mapSourceTotalData;
      console.log(allHouseholdData);
      console.log("allHouseholdTotalData 0");
      console.log(allHouseholdTotalData);
      if (this.tempPercentTypes.includes(this.selectedDataType)) {
        console.log("dot product");
        allHouseholdDataTotal = allHouseholdData.reduce(function (r, a, i) {
          let allHouseholdDataTotalItem = 0;
          console.log("allHouseholdTotalData[i]", allHouseholdTotalData[i]);
          if (
            !isNaN(allHouseholdTotalData[i]) &&
            allHouseholdTotalData[i] !== null
          ) {
            allHouseholdDataTotalItem = allHouseholdTotalData[i];
          }
          let factor = 0;
          if (!isNaN(a) && a !== null && a) {
            factor = a;
          }
          console.log("mapSourceData[i]", mapSourceData[i]);
          console.log("mapSourceTotalData[i]", mapSourceTotalData[i]);
          console.log("allHouseholdDataTotalItem", allHouseholdDataTotalItem);
          console.log("a", a);
          console.log("factor", factor);
          console.log("r", r);
          return r + factor * allHouseholdDataTotalItem;
        }, 0);

        console.log("allHouseholdDataTotal 1", allHouseholdDataTotal);
      } else {
        allHouseholdData.forEach((value) => {
          if (!isNaN(value) && value !== null) {
            allHouseholdDataTotal += value;
          }
        });
        console.log("allHouseholdDataTotal 1", allHouseholdDataTotal);
      }

      // console.log("segmentTotal");
      // console.log(segmentTotal);
      console.log("selectedSegmentTotal");
      console.log(selectedSegmentTotal);
      console.log("allHouseholdDataTotal");
      console.log(allHouseholdDataTotal);
      console.log("this.selectedDataTypeDisplay");
      console.log(this.selectedDataTypeDisplay);
      console.log("this.tempPercentTypes");
      console.log(this.tempPercentTypes);
      console.log(this.tempPercentTypes.includes(this.selectedDataType));
      let summaryTitle;
      let summaryTotal;
      let summarySpaceCount;
      let headerRow;
      let percentAppend = "";
      if (this.selectedDataType == "1:Household Count") {
        summaryTitle =
          "Total households in this series for the selected demographic:";
        summarySpaceCount = 6;
        summaryTotal = allHouseholdDataTotal;
        headerRow = ["HouseholdCount1", "HouseholdCount2", "HouseholdCount3"];
      }
      console.log();
      if (this.selectedDataType == "2:Saturation (Demo HH/ HH Total)") {
        summaryTitle =
          "Average saturation of the selected demographic across entire market:";
        summarySpaceCount = 6;
        summaryTotal = (
          (allHouseholdDataTotal / allHouseholdTotalDataTotal) *
          100
        ).toFixed(1);
        headerRow = ["Saturation1 (%)", "Saturation2 (%)", "Saturation3 (%)"];
      }
      if (this.selectedDataType == "3:HH Count Shift Over Time") {
        summaryTitle =
          "Total household count change in this series for the selected demographic:";
        summarySpaceCount = 4;
        summaryTotal = allHouseholdDataTotal;
        headerRow = [
          "HouseholdCountChange1",
          "HouseholdCountChange2",
          "HouseholdCountChange3",
        ];
      }
      if (this.selectedDataType == "4:Saturation Shift Over Time") {
        console.log("allHouseholdDataTotal last");
        console.log(allHouseholdDataTotal);
        console.log("allHouseholdTotalDataTotal last");
        console.log(allHouseholdTotalDataTotal);
        console.log(allHouseholdDataTotal / allHouseholdTotalDataTotal);
        summaryTitle =
          "Average saturation shift for selected demographic across entire market for selected series:";
        summarySpaceCount = 8;
        summaryTotal = (
          (allHouseholdDataTotal / allHouseholdTotalDataTotal) *
          100
        ).toFixed(1);
        headerRow = [
          "SaturationShift1 (%)",
          "SaturationShift2 (%)",
          "SaturationShift3 (%)",
        ];
      }
      if (this.selectedDataType == "4:Saturation Shift Over Time (Nat Adj)") {
        console.log("allHouseholdDataTotal last");
        console.log(allHouseholdDataTotal);
        console.log("allHouseholdTotalDataTotal last");
        console.log(allHouseholdTotalDataTotal);
        console.log(allHouseholdDataTotal / allHouseholdTotalDataTotal);

        summaryTitle =
          "Average nationally adjusted saturation shift for selected demographic across entire market for selected series:";
        summarySpaceCount = 8;
        summaryTotal = (
          (allHouseholdDataTotal / allHouseholdTotalDataTotal) *
          100
        ).toFixed(1);
        headerRow = [
          "SaturationShift1 (%)",
          "SaturationShift2 (%)",
          "SaturationShift3 (%)",
        ];
      }
      if (this.selectedDataType == "4:Growth As A % Over Time") {
        summaryTitle =
          "Average percent change for the selected demographic across all geographic shapes in the selected market:";
        summarySpaceCount = 9;
        summaryTotal = (
          (allHouseholdDataTotal / allHouseholdData.length) *
          100
        ).toFixed(1);
        headerRow = [
          "PercentGrowth1 (%)",
          "PercentGrowth2 (%)",
          "PercentGrowth3 (%)",
        ];
      }
      if (this.selectedDataType == "4:Growth As A % Over Time (Nat Adj)") {
        summaryTitle =
          "Average nationally adjusted percent change for the selected demographic across all geographic shapes in the selected market:";
        summarySpaceCount = 9;
        summaryTotal = (
          (allHouseholdDataTotal / selectedSegmentTotal) *
          100
        ).toFixed(1);
        headerRow = [
          "PercentGrowth1 (%)",
          "PercentGrowth2 (%)",
          "PercentGrowth3 (%)",
        ];
      }
      let summaryStatRow = [summaryTitle]
        .concat(Array(summarySpaceCount).fill(""))
        .concat([summaryTotal]);
      csv_rows.push(summaryStatRow);

      // if (this.percentTypes.includes(this.selectedDataTypeDisplay)) {
      //   // console.log("allHouseholdDataTotal");
      //   // console.log(allHouseholdDataTotal);
      //   // console.log(allHouseholdData.length);
      //   allHouseholdDataTotal = allHouseholdDataTotal / allHouseholdData.length;
      //   csv_rows.push([
      //     "Average geo region (shape) saturation of the selected demographic as a % of the total household population across the entire metro/state area:",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     `${(allHouseholdDataTotal * 100).toFixed(1)}`,
      //     "%",
      //   ]);
      //   1;
      // } else {
      //   csv_rows.push([
      //     "Total households in this series for selected age and income:",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     allHouseholdDataTotal,
      //   ]);
      // }
      let header_row = [
        `Number`,
        `Name`,
        `Color`,
        `ShapeCount1`,
        `ShapeCount2`,
        `ShapeCount3`,
      ].concat(headerRow);

      csv_rows.push([]);
      csv_rows.push(header_row);

      let totalUniqueCount = 0;
      let totalClosestCount = 0;
      let totalRadiusCount = 0;
      let uniqueAcc = 0;
      let closestAcc = 0;
      let radiusAcc = 0;
      let totalUniqueAcc = 0;
      let totalClosestAcc = 0;
      let totalRadiusAcc = 0;
      let keys = Object.keys(accumulatedPointData);
      let zeroValuePoints = [];
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        let uniqueSegmentTotal = 0;
        let closestSegmentTotal = 0;
        let radiusSegmentTotal = 0;
        let pointData = accumulatedPointData[key];
        console.log("*** POINT");
        console.log(pointData);
        let uniqueCount = pointData.uniqueShapes.length;
        let closestCount = pointData.closestShapes.length;
        let radiusCount = pointData.inRadiusShapes.length;
        // if (uniqueCount > 0 && closestCount > 0 && radiusCount > 0) {
        let dataIndex = this.tempPercentTypes.includes(this.selectedDataType)
          ? 7
          : 5;

        if (true) {
          totalUniqueCount += uniqueCount;
          totalClosestCount += closestCount;
          totalRadiusCount += radiusCount;
          uniqueAcc = pointData.uniqueShapes.reduce(
            (previousValue, pointData) => {
              // if (pointData[5] != null && !isNaN(pointData[5])) {
              if (pointData[dataIndex]) {
                return previousValue + pointData[dataIndex];
              } else {
                return previousValue;
              }
            },
            0
          );
          uniqueSegmentTotal = pointData.uniqueShapes.reduce(
            (previousValue, pointData) => {
              // if (pointData[5] != null && !isNaN(pointData[5])) {
              if (pointData[6]) {
                return previousValue + pointData[6];
              } else {
                return previousValue;
              }
            },
            0
          );
          console.log("uniqueAcc");
          console.table(pointData.uniqueShapes);
          console.log(uniqueAcc);

          closestAcc = pointData.closestShapes.reduce(
            (previousValue, pointData) => {
              if (pointData[dataIndex] != null && !isNaN(pointData[5])) {
                return previousValue + pointData[dataIndex];
              } else {
                return previousValue;
              }
            },
            0
          );
          closestSegmentTotal = pointData.closestShapes.reduce(
            (previousValue, pointData) => {
              // if (pointData[5] != null && !isNaN(pointData[5])) {
              if (pointData[6]) {
                return previousValue + pointData[6];
              } else {
                return previousValue;
              }
            },
            0
          );
          console.log("closestAcc");
          console.table(pointData.closestShapes);
          console.log(closestAcc);

          radiusAcc = pointData.inRadiusShapes.reduce(
            (previousValue, pointData) => {
              if (
                pointData[dataIndex] != null &&
                !isNaN(pointData[dataIndex])
              ) {
                return previousValue + pointData[dataIndex];
              } else {
                return previousValue;
              }
            },
            0
          );
          radiusSegmentTotal = pointData.inRadiusShapes.reduce(
            (previousValue, pointData) => {
              // if (pointData[5] != null && !isNaN(pointData[5])) {
              if (pointData[6]) {
                return previousValue + pointData[6];
              } else {
                return previousValue;
              }
            },
            0
          );
          console.log("radiusAcc");
          console.table(pointData.inRadiusShapes);
          console.log(radiusAcc);
          // if (this.percentTypes.includes(this.selectedDataTypeDisplay)) {
          //   uniqueAcc = uniqueAcc / uniqueCount;
          //   closestAcc = closestAcc / closestCount;
          //   radiusAcc = radiusAcc / radiusCount;
          // }

          totalUniqueAcc += uniqueAcc;
          totalClosestAcc += closestAcc;
          totalRadiusAcc += radiusAcc;
          let row = [];

          if (this.percentTypes.includes(this.selectedDataType)) {
            if (this.tempPercentTypes.includes(this.selectedDataType)) {
              row = [
                key,
                pointData.title,
                pointData.color,
                uniqueCount,
                closestCount,
                radiusCount,
                `${((uniqueAcc / uniqueSegmentTotal) * 100).toFixed(1)}`,
                `${((closestAcc / closestSegmentTotal) * 100).toFixed(1)}`,
                `${((radiusAcc / radiusSegmentTotal) * 100).toFixed(1)}`,
              ];
            } else {
              console.log("totalUniqueAcc");
              console.log(totalUniqueAcc);
              console.log("totalClosestAcc");
              console.log(totalClosestAcc);
              console.log("totalRadiusAcc");
              console.log(totalRadiusAcc);
              console.log(this.pointDataLength);
              console.log((totalUniqueAcc * 100) / this.pointDataLength);
              console.log(
                ((totalUniqueAcc * 100) / this.pointDataLength).toFixed(1)
              );
              row = [
                key,
                pointData.title,
                pointData.color,
                uniqueCount,
                closestCount,
                radiusCount,
                `${totalUniqueAcc.toFixed(1)}`,
                `${totalClosestAcc.toFixed(1)}`,
                `${totalRadiusAcc.toFixed(1)}`,
              ];
            }
          } else {
            row = [
              key,
              pointData.title,
              pointData.color,
              uniqueCount,
              closestCount,
              radiusCount,
              uniqueAcc,
              closestAcc,
              radiusAcc,
            ];
          }
          csv_rows.push(row);
        } else {
          zeroValuePoints.push(pointData);
        }
      }

      let totalRow = [
        "Totals",
        "",
        "",
        totalUniqueCount,
        totalClosestCount,
        totalRadiusCount,
      ];
      if (!this.percentTypes.includes(this.selectedDataType)) {
        totalRow.push(totalUniqueAcc);
        totalRow.push(totalClosestAcc);
        totalRow.push(totalRadiusAcc);
      }
      csv_rows.push([]);
      csv_rows.push(totalRow);
      // console.log("number of points", this.pointDataLength);
      let length;
      let multiplier;
      if (this.percentTypes.includes(this.selectedDataType)) {
        if (this.tempPercentTypes.includes(this.selectedDataType)) {
          length = selectedSegmentTotal;
          multiplier = 100;
        } else {
          length = this.pointDataLength;
          multiplier = 1;
        }
        let averageRow = [
          "Average:",
          "",
          "",
          "",
          "",
          "",
          `${((totalUniqueAcc / length) * multiplier).toFixed(1)}`,
          `${((totalClosestAcc / length) * multiplier).toFixed(1)}`,
          `${((totalRadiusAcc / length) * multiplier).toFixed(1)}`,
        ];
        csv_rows.push(averageRow);
      }
      csv_rows.push([]);

      // if (this.percentTypes.includes(this.selectedDataTypeDisplay)) {
      //   let percentCoverageRow = [
      //     "Percent coverage:",
      //     "",
      //     "",
      //     "",
      //     "",
      //     "",
      //     `${((totalUniqueAcc / allHouseholdDataTotal) * 100).toFixed(1)}`,
      //     "%",
      //     `${((totalClosestAcc / allHouseholdDataTotal) * 100).toFixed(1)}`,
      //     "%",
      //     `${((totalRadiusAcc / allHouseholdDataTotal) * 100).toFixed(1)}`,
      //     "%",
      //   ];
      //   csv_rows.push(percentCoverageRow);
      //   csv_rows.push([]);
      // }

      csv_rows.push(["Column Definitions:"]);
      csv_rows.push([
        `ShapeCount1`,
        "",
        `Count of geographic shapes that are located within the radius of the chosen point and not within the radius of any other point.`,
      ]);
      csv_rows.push([
        `ShapeCount2`,
        "",
        `This count includes all shapes in ShapeCount1, as well as shapes that may be shared between multiple points whose radius ranges overlap, but are closest to the chosen point.`,
      ]);
      csv_rows.push([
        `ShapeCount3`,
        "",
        `This count includes all shapes that are within the radius of the chosen point, regardless of whether they are also contained in the radius ranges of other points.`,
      ]);

      if (this.selectedDataType == "1:Household Count") {
        csv_rows.push([
          `HouseholdCount1`,
          "",
          `Count of households within the shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `HouseholdCount2`,
          "",
          `Count of households within the shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `HouseholdCount3`,
          "",
          `Count of households within the shapes in ShapeCount3. (This population is considered in range of this location, regardless of if it is also in range of other locations. Note: The total for this count will include double counting of households if there are overlaps between points.)`,
        ]);
      }
      if (this.selectedDataType == "2:Saturation (Demo HH/ HH Total)") {
        csv_rows.push([
          `Saturation1 (%)`,
          "",
          `Average saturation of the selected demographic for shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `Saturation2 (%)`,
          "",
          `Average saturation of the selected demographic for shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `Saturation3 (%)`,
          "",
          `Average saturation of the selected demographic for shapes in ShapeCount3. (This population is considered to be in range of this location, regardless of whether it is also within the range of other locations.)`,
        ]);
      }
      if (this.selectedDataType == "4:Saturation Shift Over Time") {
        csv_rows.push([
          `SaturationShift1 (%)`,
          "",
          `Average saturation shift of the selected demographic for shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `SaturationShift2 (%)`,
          "",
          `Average saturation shift of the selected demographic for shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `SaturationShift3 (%)`,
          "",
          `Average saturation shift of the selected demographic for shapes in ShapeCount3. (This population is considered to be in range of this location, regardless of whether it is also within the range of other locations.)`,
        ]);
      }
      if (this.selectedDataType == "3:HH Count Shift Over Time") {
        csv_rows.push([
          `HouseholdCountChange1`,
          "",
          `Household count change for the shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `HouseholdCountChange2`,
          "",
          `Household count change for the shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `HouseholdCountChange3`,
          "",
          `Household count change for the shapes in ShapeCount3. (This population is considered in range of this location, regardless of if it is also in range of other locations. Note: The total for this count will include double counting of households if there are overlaps between points.)`,
        ]);
      }

      if (this.selectedDataType == "4:Growth As A % Over Time") {
        csv_rows.push([
          `PercentGrowth1 (%)`,
          "",
          `Average percent change of the selected demographic for shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `PercentGrowth2 (%)`,
          "",
          `Average percent change of the selected demographic for shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `PercentGrowth3 (%)`,
          "",
          `Average percent change of the selected demographic for shapes in ShapeCount3. (This population is considered to be in range of this location, regardless of whether it is also within the range of other locations.)`,
        ]);
      }

      if (this.selectedDataType == "4:Saturation Shift Over Time (Nat Adj)") {
        csv_rows.push([
          `SaturationShift1 (%)`,
          "",
          `Average nationally adjusted saturation shift of the selected demographic for shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `SaturationShift2 (%)`,
          "",
          `Average nationally adjusted saturation shift of the selected demographic for shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `SaturationShift3 (%)`,
          "",
          `Average nationally adjusted saturation shift of the selected demographic for shapes in ShapeCount3. (This population is considered to be in range of this location, regardless of whether it is also within the range of other locations.)`,
        ]);
      }
      if (this.selectedDataType == "4:Growth As A % Over Time (Nat Adj)") {
        csv_rows.push([
          `PercentGrowth1 (%)`,
          "",
          `Average nationally adjusted percent change of the selected demographic for shapes in ShapeCount1. (This population can be considered to be only covered by this point.)`,
        ]);
        csv_rows.push([
          `PercentGrowth2 (%)`,
          "",
          `Average nationally adjusted percent change of the selected demographic for shapes in ShapeCount2. (This population can be considered to be associated with this point before all others.)`,
        ]);
        csv_rows.push([
          `PercentGrowth3 (%)`,
          "",
          `Average nationally adjusted percent change of the selected demographic for shapes in ShapeCount3. (This population is considered to be in range of this location, regardless of whether it is also within the range of other locations.)`,
        ]);
      }

      if (zeroValuePoints.length > 0) {
        csv_rows.push([]);
        csv_rows.push([
          "The following points were excluded from the summary report as they are not within the selected market:",
        ]);
        csv_rows.push([]);
        csv_rows.push(["Number", "Name"]);
        zeroValuePoints.forEach((pointData) => {
          let row = [pointData.number, pointData.title];
          csv_rows.push(row);
        });
      }

      // console.log("allHouseholdDataTotal");
      // console.log(allHouseholdDataTotal);

      var str = "";
      for (var k = 0; k < csv_rows.length; k++) {
        let line = "";
        line = csv_rows[k].map((rowItem) => '"' + rowItem + '"').join(",");
        str += line + "\r\n";
      }
      var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Bain-Selected Data Summary-${this.filenamePartialForSelectedOptions}.csv`
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
      // this.map.removeControl(this.fullScreenControl)

      // this.map.removeControl(this.scaleControl)
      // https://html2canvas.hertzen.com/
      html2canvas(document.querySelector("#mapContainer")).then((mapCanvas) => {
        html2canvas(document.querySelector("#legend")).then((legend) => {
          html2canvas(document.querySelector("#mapTitle"), {
            backgroundColor: null,
            useCORS: true,
            allowTaint: true,
          }).then((mapTitle) => {
            html2canvas(document.querySelector("#attributionLogo"), {
              backgroundColor: null,
              useCORS: true,
              allowTaint: true,
            }).then((attributionLogo) => {
              html2canvas(document.querySelector("#geoCounter"), {
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
              }).then((geoCounter) => {
                this.showMapTitle = false;
                // this.navigationControl = new mapboxgl.NavigationControl();
                let navigationPosition = this.isFullscreen
                  ? "bottom-right"
                  : "top-right";
                this.map.addControl(this.navigationControl, navigationPosition);

                const mergeCanvas = document.createElement("canvas");
                const mergeCtx = mergeCanvas.getContext("2d");
                // const logoImage = document.createElement("img");
                const logo = document.createElement("img");
                logo.id = "logo";
                logo.src = this.svgLogo;
                logo.src = this.pngLogo;
                // console.log(logo.src);
                // console.log(logo);
                mergeCanvas.height = mapCanvas.height;
                mergeCanvas.width = mapCanvas.width;
                mergeCtx.drawImage(mapCanvas, 0, 0);
                mergeCtx.drawImage(
                  attributionLogo,
                  10 * this.devicePixelRatio,
                  mergeCanvas.height - 101 * this.devicePixelRatio
                );

                var logoImg = logo;
                // mergeCtx.drawImage(textImage, 100, 100);
                mergeCtx.drawImage(
                  logoImg,
                  mapCanvas.height / 2,
                  mapCanvas.width / 2
                );
                // console.log("logo");
                mergeCtx.drawImage(
                  legend,
                  mergeCanvas.width - legend.width - 25 * this.devicePixelRatio,
                  10 * this.devicePixelRatio
                );
                mergeCtx.drawImage(
                  mapTitle,
                  10 * this.devicePixelRatio,
                  10 * this.devicePixelRatio
                );
                if (this.showGeoCounter) {
                  // console.log("showing geoCounter");
                  mergeCtx.drawImage(
                    geoCounter,
                    10 * this.devicePixelRatio,
                    10 * this.devicePixelRatio + 40 * this.devicePixelRatio
                  );
                }

                var img = mergeCanvas.toDataURL("image/png");
                // event.target.href = img
                var link = document.createElement("a");
                // var url = URL.createObjectURL(blob);
                var url = img;
                link.setAttribute("href", url);
                link.setAttribute(
                  "download",
                  `Bain-${this.filenamePartialForSelectedOptions}.png`
                );
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              });
            }); //here
          }); // here
        });
      });
    },
    downloadFlowMapImage() {
      this.showFlowMapTitle = true;
      this.flowmapDeckOverlay._deck.redraw();

      this.flowMap.removeControl(this.flowmapNavigationControl);
      this.flowMap.removeControl(this.flowmapHomeControl);
      if (this.flowFullScreen) {
        html2canvas(document.querySelector("#flow_image_container"), {
          backgroundColor: "#FFFFFF",
          useCORS: true,
          allowTaint: true,
        }).then((mapCanvas) => {
          html2canvas(document.querySelector("#flowmap"), {
            backgroundColor: null,
            useCORS: true,
            allowTaint: true,
          }).then((flowMapCanvas) => {
            html2canvas(document.querySelector("#dataTableContainer"), {
              backgroundColor: "#FFFFFF",
              useCORS: true,
              allowTaint: true,
            }).then((dataTable) => {
              html2canvas(document.querySelector("#flowMapTitleSection"), {
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
              }).then((mapTitle) => {
                html2canvas(document.querySelector("#flowAttributionLogo"), {
                  backgroundColor: null,
                  useCORS: true,
                  allowTaint: true,
                }).then((attributionLogo) => {
                  this.showFlowMapTitle = false;
                  let flowmapNavigationPosition = this.isFullscreen
                    ? "bottom-right"
                    : "top-right";
                  this.flowMap.addControl(
                    this.flowmapHomeControl,
                    "bottom-left"
                  );
                  this.flowMap.addControl(
                    this.flowmapNavigationControl,
                    "bottom-left"
                  );

                  const mergeCanvas = document.createElement("canvas");
                  const mergeCtx = mergeCanvas.getContext("2d");

                  mergeCanvas.height = mapCanvas.height;
                  mergeCanvas.width = flowMapCanvas.width;
                  console.log("mapCanvas.width", mapCanvas.width);
                  console.log("mapCanvas.height", mapCanvas.height);
                  console.log("flowMapCanvas.width", flowMapCanvas.width);
                  console.log("flowMapCanvas.height", flowMapCanvas.height);
                  mergeCtx.drawImage(flowMapCanvas, 0, 0);
                  if (this.dataTableVisibility) {
                    mergeCtx.drawImage(
                      dataTable,
                      mergeCanvas.width - dataTable.width,
                      mergeCanvas.height - dataTable.height
                    );
                  }
                  mergeCtx.drawImage(
                    attributionLogo,
                    10 * this.devicePixelRatio,
                    mergeCanvas.height - 101 * this.devicePixelRatio
                  );

                  mergeCtx.drawImage(
                    mapTitle,
                    10 * this.devicePixelRatio,
                    10 * this.devicePixelRatio
                  );

                  // mergeCtx.drawImage(
                  //   flowRange,
                  //   10 * this.devicePixelRatio,
                  //   10 * this.devicePixelRatio + 40 * this.devicePixelRatio
                  // );

                  var img = mergeCanvas.toDataURL("image/png");
                  // event.target.href = img
                  var link = document.createElement("a");
                  // var url = URL.createObjectURL(blob);
                  var url = img;
                  link.setAttribute("href", url);
                  link.setAttribute(
                    "download",
                    `Bain-${this.filenamePartialForSelectedFlowOptions}.png`
                  );
                  link.style.visibility = "hidden";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                });
              }); //here
            }); // here
          });
        });
      } else {
        if (this.dataTableVisibility) {
          // flow_image_container
          // flowmap
          // dataTableContainer
          // flowMapTitleSection
          // flowAttributionLogo
          html2canvas(document.querySelector("#flow_image_container"), {
            backgroundColor: "#FFFFFF",
            useCORS: true,
            allowTaint: true,
          }).then((mapCanvas) => {
            html2canvas(document.querySelector("#flowmap"), {
              backgroundColor: null,
              useCORS: true,
              allowTaint: true,
            }).then((flowMapCanvas) => {
              html2canvas(document.querySelector("#dataTableContainer"), {
                backgroundColor: "#FFFFFF",
                useCORS: true,
                allowTaint: true,
              }).then((dataTable) => {
                html2canvas(document.querySelector("#flowMapTitleSection"), {
                  backgroundColor: null,
                  useCORS: true,
                  allowTaint: true,
                }).then((mapTitle) => {
                  html2canvas(document.querySelector("#flowAttributionLogo"), {
                    backgroundColor: null,
                    useCORS: true,
                    allowTaint: true,
                  }).then((attributionLogo) => {
                    this.showFlowMapTitle = false;
                    let flowmapNavigationPosition = this.isFullscreen
                      ? "bottom-right"
                      : "top-right";
                    this.flowMap.addControl(
                      this.flowmapNavigationControl,
                      "bottom-left"
                    );
                    this.flowMap.addControl(
                      this.flowmapHomeControl,
                      "bottom-left"
                    );

                    const mergeCanvas = document.createElement("canvas");
                    const mergeCtx = mergeCanvas.getContext("2d");

                    mergeCanvas.height = mapCanvas.height;
                    mergeCanvas.width = mapCanvas.width;
                    console.log("mapCanvas.width", mapCanvas.width);
                    mergeCtx.drawImage(flowMapCanvas, 0, 0);
                    mergeCtx.drawImage(dataTable, flowMapCanvas.width, 0);
                    mergeCtx.drawImage(
                      attributionLogo,
                      10 * this.devicePixelRatio,
                      mergeCanvas.height - 101 * this.devicePixelRatio
                    );

                    mergeCtx.drawImage(
                      mapTitle,
                      10 * this.devicePixelRatio,
                      10 * this.devicePixelRatio
                    );

                    // mergeCtx.drawImage(
                    //   flowRange,
                    //   10 * this.devicePixelRatio,
                    //   10 * this.devicePixelRatio + 40 * this.devicePixelRatio
                    // );

                    var img = mergeCanvas.toDataURL("image/png");
                    // event.target.href = img
                    var link = document.createElement("a");
                    // var url = URL.createObjectURL(blob);
                    var url = img;
                    link.setAttribute("href", url);
                    link.setAttribute(
                      "download",
                      `Bain-${this.filenamePartialForSelectedFlowOptions}.png`
                    );
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  });
                }); //here
              }); // here
            });
          });
        } else {
          html2canvas(document.querySelector("#flowmap"), {
            backgroundColor: null,
            useCORS: true,
            allowTaint: true,
          }).then((mapCanvas) => {
            html2canvas(document.querySelector("#flowMapTitleSection"), {
              backgroundColor: null,
              useCORS: true,
              allowTaint: true,
            }).then((mapTitle) => {
              html2canvas(document.querySelector("#flowAttributionLogo"), {
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
              }).then((attributionLogo) => {
                html2canvas(document.querySelector("#flowRange"), {
                  backgroundColor: null,
                  useCORS: true,
                  allowTaint: true,
                }).then((flowRange) => {
                  this.showFlowMapTitle = false;
                  let flowmapNavigationPosition = this.isFullscreen
                    ? "bottom-right"
                    : "top-right";
                  this.flowMap.addControl(
                    this.flowmapNavigationControl,
                    "bottom-left"
                  );
                  this.flowMap.addControl(
                    this.flowmapHomeControl,
                    "bottom-left"
                  );

                  const mergeCanvas = document.createElement("canvas");
                  const mergeCtx = mergeCanvas.getContext("2d");

                  mergeCanvas.height = mapCanvas.height;
                  mergeCanvas.width = mapCanvas.width;
                  mergeCtx.drawImage(mapCanvas, 0, 0);
                  mergeCtx.drawImage(
                    attributionLogo,
                    10 * this.devicePixelRatio,
                    mergeCanvas.height - 101 * this.devicePixelRatio
                  );

                  mergeCtx.drawImage(
                    mapTitle,
                    10 * this.devicePixelRatio,
                    10 * this.devicePixelRatio
                  );

                  // mergeCtx.drawImage(
                  //   flowRange,
                  //   10 * this.devicePixelRatio,
                  //   10 * this.devicePixelRatio + 40 * this.devicePixelRatio
                  // );

                  var img = mergeCanvas.toDataURL("image/png");
                  // event.target.href = img
                  var link = document.createElement("a");
                  // var url = URL.createObjectURL(blob);
                  var url = img;
                  link.setAttribute("href", url);
                  link.setAttribute(
                    "download",
                    `Bain-${this.filenamePartialForSelectedFlowOptions}.png`
                  );
                  link.style.visibility = "hidden";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                });
              }); //here
            }); // here
          });
        }
      }
      // TODO - figure out canvas handling
      // https://stackoverflow.com/questions/49807311/how-to-get-usable-canvas-from-mapbox-gl-js
      // https://stackoverflow.com/questions/19021237/how-to-use-html-content-inside-a-canvas-element

      // const mapCanvas = this.map.getCanvas();

      // this.map.removeControl(this.fullScreenControl)

      // this.map.removeControl(this.scaleControl)
      // https://html2canvas.hertzen.com/
      //html2canvas(document.querySelector("#deckgl-overlay")).then(

      // #flowmap
      // #deckgl-overlay
      // #flowMapLayer
    },
    downloadMarketCsv() {
      let array;
      if (this.selectedGeoUnits == "zip") {
        array = [
          ["Zip Code", this.segmentSettings.DataType],
          ...this.mapSourceData.map((f) => [
            f[this.geoJsonGeoProperty],
            f[this.selectedSegment.value],
          ]),
        ];
      }
      if (this.selectedGeoUnits == "bg") {
        let features = this.getMapFeatures();
        array = [
          ["Block Group", this.segmentSettings.DataType],
          ...features.map((f) => [
            f[this.geoJsonGeoProperty],
            f[this.selectedSegment.value],
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
        `Bain - ${this.filenamePartialForSelectedOptions}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadTemplateCSV() {
      let headerLine = "Number,Title,Color,Latitude,Longitude";
      let csvString = headerLine + "\r\n";

      for (var i = 0; i < this.pointDataLength; i++) {
        let row = this.pointData[i];
        let line = `${row.Number},${row.Title},${row.Color},${row.Latitude},${row.Longitude}`;
        csvString += line + "\r\n";
      }

      var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

      var link = document.createElement("a");
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Bain-Sample-Upload-Data.csv`);
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
          color: point.Color,
        },
      };
    },
    convertPointsToGeoJSON(points) {
      let features;
      if (Array.isArray(points)) {
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
    console.log("intramarketMarketSettingsDataV4");
    console.log(intramarketMarketSettingsDataV4);
    this.loading = true;
    this.initialFlowLoading = true;
    this.player = this.$refs.player;
    this.selectedEthnicityOptions = this.ethnicityTypes;
    this.ethnicityMappingOptions = this.ethnicityMapping;
    this.selectedEthnicity = this.selectedEthnicityOptions[0];
    // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
    //  ************* test deckgl
    // const AIR_PORTS =
    //   "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

    // const deckGlMap = new mapboxgl.Map({
    //   container: "deckglmap",
    //   style:
    //     "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
    //   center: [0.45, 51.47],
    //   zoom: 4,
    //   bearing: 0,
    //   pitch: 30,
    // });

    // const deckOverlay = new DeckOverlay({
    //   layers: [
    //     new GeoJsonLayer({
    //       id: "airports",
    //       data: AIR_PORTS,
    //       // Styles
    //       filled: true,
    //       pointRadiusMinPixels: 2,
    //       pointRadiusScale: 2000,
    //       getPointRadius: (f) => 11 - f.properties.scalerank,
    //       getFillColor: [200, 0, 80, 180],
    //       // Interactive props
    //       pickable: true,
    //       autoHighlight: true,
    //       onClick: (info) =>
    //         // eslint-disable-next-line
    //         info.object &&
    //         alert(
    //           `${info.object.properties.name} (${info.object.properties.abbrev})`
    //         ),
    //     }),
    //     new ArcLayer({
    //       id: "arcs",
    //       data: AIR_PORTS,
    //       dataTransform: (d) =>
    //         d.features.filter((f) => f.properties.scalerank < 4),
    //       // Styles
    //       getSourcePosition: () => [-0.4531566, 51.4709959], // London
    //       getTargetPosition: (f) => f.geometry.coordinates,
    //       getSourceColor: [0, 128, 200],
    //       getTargetColor: [200, 0, 80],
    //       getWidth: 1,
    //     }),
    //   ],
    // });

    // deckGlMap.addControl(deckOverlay);
    // deckGlMap.addControl(new mapboxgl.NavigationControl());
    // ************* end test deckgl
    // ************* test flowmap
    const MAPBOX_STYLE_DARK = "mapbox://styles/mapbox/dark-v10";

    const config = { ...UI_INITIAL };
    this.flowMapConfig = config;

    // console.log("flows");
    // // let intermarketFlowData = this.intermarketFlowData;
    // const flowDataResponse = await fetch(
    //   // `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
    //   `${this.base_asset_url}/intramarketdata-20221026-flows.json`
    // );
    // console.log(" here");
    // const flowData = await flowDataResponse.json();
    // console.log(" here");
    // let FlowData = await flowData;
    // this.intermarketFlowData = await FlowData;
    // console.log(" here");
    // console.log("this.intermarketFlowData");
    // console.log(this.intermarketFlowData);
    // const locationDataResponse = await fetch(
    //   // `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
    //   `${this.base_asset_url}/intramarketdata-20221026-locations.json`
    // );
    // console.log(locationDataResponse);

    // const locationData = await locationDataResponse.json();
    // console.log(locationData);
    // console.log("");
    // this.intermarketLocationData = await locationData;
    // console.log("this.intermarketLocationData");
    // console.log(this.intermarketLocationData);
    // this.intermarketData = {
    //   locations: await this.intermarketLocationData,
    //   flows: await this.intermarketFlowData,
    // };
    // let intermarketData = await this.intermarketData;
    // let Data = JSON.parse(
    //   JSON.stringify(this.intermarketData.locations)
    // );

    // console.log("intermarketFlowData");
    // console.log(Data);
    // let flows = this.intermarketFlowData;
    // window.intermarketData = this.intermarketData;
    let vue = this;

    // this.flowSelectedMarket = this.selectedMarket;
    this.flowSelectedDirection = Object.keys(this.flowDirectionOptions)[0];
    this.flowSelectedMarketType = "states";
    this.flowSelectedMetroAreaOption = Object.keys(
      this.flowMetroAreaListOptions
    )[1];
    this.flowExcludeWithinState = Object.keys(
      this.flowExcludeWithinStateOptions
    )[0];
    this.flowSelectedMetroAreaOption = Object.keys(
      this.flowMetroAreaListOptions
    )[1];
    this.flowSelectedStatesOption = Object.keys(this.flowStatesListOptions)[0];
    this.flowSelectedMovementDirection = Object.keys(
      this.flowMovementDirectionOptions
    )[0];
    this.flowSelectedAgeSegment = Object.keys(this.flowAgeSegmentOptions)[0];
    this.flowSelectedIncomeSegment = Object.keys(
      this.flowIncomeSegmentOptions
    )[0];
    await this.getMapData();
    // console.log("***HAVEDATA");
    this.updateFlowData();
    // console.log(this.flowData);
    // fetchData().then((data) => {
    // const gui = new GUI();
    // initLilGui(gui);
    // console.log("data");
    // console.log(data);
    window.data = this.intermarketData;
    // const { locations, flows } = this.intermarketData;
    const { locations, flows } = this.intermarketData;
    console.log("initial data");
    console.log(locations);
    console.log(flows);
    // eslint-disable-next-line no-undef
    const [width, height] = [globalThis.innerWidth, globalThis.innerHeight];
    const LOADED_INITIAL_VIEW_STATE = {
      longitude: -97.61555,
      latitude: 39.60401096871773,
      zoom: 3.4702991148251474,
      pitch: 0,
      bearing: 0,
    };
    const INITIAL_VIEW_STATE = getViewStateForLocations(
      locations,
      (loc) => [loc.lon, loc.lat],
      [width, height],
      { pad: 0.3 }
    );
    console.log("INITIAL_VIEW_STATE");
    console.log(INITIAL_VIEW_STATE);
    this.initialViewState = LOADED_INITIAL_VIEW_STATE;
    let DEFAULT_ZOOM_OUT = 0.4;

    // TODO - uncomment after mexico is working
    this.flowMap = new mapboxgl.Map({
      container: "flowmap",
      preserveDrawingBuffer: true,
      accessToken: this.accessToken,
      style: "mapbox://styles/stobieb/cl03cgll7000114p6t44bqa0d",
      // Note: deck.gl will be in charge of interaction and event handling
      interactive: true,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom - DEFAULT_ZOOM_OUT,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
    });
    console.log("this.INITIAL_VIEW_STATE");
    console.log(this.INITIAL_VIEW_STATE);
    let flowData = this.intermarketData;
    this.flowmapDeckOverlay = new DeckOverlay({
      initialViewState: INITIAL_VIEW_STATE,
      glOptions: {
        preserveDrawingBuffer: true,
      },
      getTooltip: ({ object }) =>
        object && {
          // html: `<h2>${object.name}</h2><div>${object.message}</div>`,
          html: tooltipHtml(object),
          style: {
            backgroundColor: "#fff",
            fontSize: "12px",
            color: "black",
          },
        },
      width: "100%",
      height: "100%",
      layers: [
        new FlowmapLayer({
          id: "my-flowmap-layer",
          flowData,
          pickable: true,
          visible: vue.flowMapLayerVisible,
          opacity: vue.flowMapConfig.opacity,
          darkMode: vue.flowMapConfig.darkMode,
          colorScheme: vue.flowMapConfig.colorScheme,
          fadeAmount: vue.flowMapConfig.fadeAmount,
          fadeEnabled: vue.flowMapConfig.fadeEnabled,
          fadeOpacityEnabled: vue.flowMapConfig.fadeOpacityEnabled,
          locationTotalsEnabled: vue.flowMapConfig.locationTotalsEnabled,
          animationEnabled: vue.flowMapConfig.animationEnabled,
          clusteringEnabled: vue.flowMapConfig.clusteringEnabled,
          clusteringAuto: vue.flowMapConfig.clusteringAuto,
          clusteringLevel: vue.flowMapConfig.clusteringLevel,
          adaptiveScalesEnabled: vue.flowMapConfig.adaptiveScalesEnabled,
          highlightColor: vue.flowMapConfig.highlightColor,
          getLocationId: (loc) => loc.id,
          getLocationLat: (loc) => loc.lat,
          getLocationLon: (loc) => loc.lon,
          getFlowOriginId: (flow) => flow.origin,
          getFlowDestId: (flow) => flow.dest,
          getFlowMagnitude: (flow) => flow.count,
          getLocationName: (loc) => loc.name,

          // onHover: (info) => setTooltip(getTooltipState(info)),
          onHover: (info) => console.log(info),
          // onClick: (info) => console.log('clicked', info.type, info.object),
          // onClick: (info) =>
          //   alert(`clicked: ${info.type}  ${JSON.stringify(info.object)}`),
        }),
      ],
    });

    this.flowMap.addControl(this.flowmapDeckOverlay);
    // flowmap.addControl(new mapboxgl.NavigationControl());

    this.flowmapScaleControl = new mapboxgl.ScaleControl({
      maxWidth: 400,
      unit: "imperial",
    });
    this.flowMap.addControl(this.flowmapScaleControl);
    this.flowmapNavigationControl = new mapboxgl.NavigationControl();
    this.addFlowHomeButton(this.flowMap, this);
    let flowmapNavigationPosition = this.isFullscreen
      ? "bottom-right"
      : "top-right";
    this.flowMap.addControl(this.flowmapNavigationControl, "bottom-left");

    // ************* end test flowmap
    this.flowMap.on("resize", () => {
      console.log("A resize event occurred.");
      this.flowLoading = true;
      vue.updateDeck(false);
      // this.flowMap.removeControl(this.flowmapDeckOverlay);
      // this.updateFlowData();
      // this.flowMap.addControl(this.flowmapDeckOverlay);

      // let direction = vue.flowSelectedMovementDirection;
      // vue.flowSelectedMovementDirection = direction == "in" ? "out" : "in";
      setTimeout(() => {
        // vue.updateDeck();
        // this.updateFlowData();
        // this.flowMap.addControl(this.flowmapDeckOverlay);
        console.log("updating deck from map resize");
        this.flowOpacity = 99;
        this.updateFlowData();
        // if (vue.flowFirstTime) {
        //   vue.flowSelectedMovementDirection = "out";
        //   vue.flowFirstTime = false;
        // }
        vue.flowLoading = false;
        vue.initialFlowLoading = false;
        vue.updateDeck();
      }, 1000);
    });
    this.updateDeck(false);
    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      // console.log('Modal is about to be shown', bvEvent, modalId)
      if (modalId == "modal-drop-location") {
        if (this.pointDataLength < 1) {
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
        layers: [vue.segmentSettings.SeriesShortUnique],
      });
      // console.log("identified features");
      // console.log(identifiedFeatures);
      // console.log(identifiedFeatures.length)
      // console.log(identifiedFeatures)
      // console.log(vue.segmentSettings.SeriesShortUnique)
      vue.popup.remove();
      // console.log(identifiedFeatures);
      if (
        identifiedFeatures != "" &&
        vue.countSelector == "Off" &&
        !vue.disablePopups
      ) {
        var geoType;
        // console.log(vue.segmentSettings.GeographiesShapes.toLowerCase());
        if (
          vue.segmentSettings.GeographiesShapes.toLowerCase().includes("zip")
        ) {
          // console.log("Zip code");
          geoType = "Zip Code";
        } else {
          // console.log("Block group");
          geoType = "Census Block";
        }
        // var popupText = `<strong>${vue.segmentSettings.SeriesShortUnique}</strong><br>`;
        var popupText = ``;
        var i = 0;
        let foundValue = false;
        // console.log("fields");
        // console.log(fields);
        // console.log(identifiedFeatures);
        // console.log(vue.segmentSettings.mapbox_segment);
        for (i = 0; i < fields.length; i++) {
          var label;
          let index = fields.length - 1 - i;
          if (index == 0) {
            label = geoType;
            valueString = identifiedFeatures[0].properties[fields[index]];
          } else if (index == 1) {
            // console.log("popup here");
            // console.log(vue.segmentSettings);
            label = vue.segmentSettings.Display_Data_Type;
            // if (label && label.split(":").length > 1) {
            //   // label = label.split(":")[1];
            //   label = vue.dataTypeNameMappingV4[label];
            // }
            label = vue.dataTypeNameMappingV4[label];
            // console.log(fields[index]);
            // console.log(identifiedFeatures[0].properties);
            let value = identifiedFeatures[0].properties[fields[index]];
            var valueString;
            if (value || value === 0) {
              foundValue = true;
              // console.log("label", label);
              // console.log("value", value);
              // if (
              //   label == "Percent" ||
              //   label == "2:Percent" ||
              //   label == "4:Percent Shift" ||
              //   label == "Saturation Shift"
              // ) {
              // console.log("vue.percentTypes");
              // console.log(vue.percentTypes);
              // console.log("label", label);
              if (vue.percentTypes.includes(label)) {
                valueString = value.toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 1,
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
          }

          popupText +=
            "<strong>" + label + ":</strong> " + valueString + "<" + "br" + ">";
          // popupText += "<strong>" + "a" + ":</strong> " + "b" + "<" + "br" + ">"
        }
        if (foundValue) {
          vue.popup.setLngLat(location.lngLat).setHTML(popupText).addTo(map);
        }
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
      interactive: true,
      // maxBounds: [
      //   [103.6, 1.1704753],
      //   [104.1, 1.4754753],
      // ],
    });

    const largeMarkerEls = document.getElementsByClassName("marker");
    const smallMarkerEls = document.getElementsByClassName("marker-small");
    const zoomThreshold = 10;
    map.on("zoom", () => {
      console.log("A zoom event occurred.");
      if (map.getZoom() > zoomThreshold) {
        for (let i = 0; i < largeMarkerEls.length; i++) {
          largeMarkerEls[i].style.display = "block";
        }
        for (let i = 0; i < smallMarkerEls.length; i++) {
          smallMarkerEls[i].style.display = "none";
        }
      } else {
        for (let i = 0; i < largeMarkerEls.length; i++) {
          largeMarkerEls[i].style.display = "none";
        }
        for (let i = 0; i < smallMarkerEls.length; i++) {
          smallMarkerEls[i].style.display = "block";
        }
      }
    });

    this.map = map;
    this.map.resize();
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
      if (vue.distinctCountSelector == "On") {
        if (!e.shiftKey) {
          vue.selectedFeatures = [];
        }
        finish([mousePos(e), mousePos(e)]);
        return;
      } else {
        if (!(e.shiftKey && e.button === 0)) {
          // console.log('clicked')
          finish([mousePos(e), mousePos(e)]);
          return;
        } else {
          // Disable default drag zooming when the shift key is held down.
          map.dragPan.disable();

          // Call functions for the following events
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
          document.addEventListener("keydown", onKeyDown);

          // Capture the first xy coordinates
          start = mousePos(e);
        }
        // Continue the rest of the function if the shiftkey is pressed.
      }
    }

    function onMouseMove(e) {
      current = mousePos(e);
      // console.log("canvas mousemove", current);
      // console.log("map bounds", vue.map.getBounds());
      // console.log(
      //   "canvas bounds",
      //   map.getCanvas().height,
      //   map.getCanvas().width
      // );
      if (vue.countSelector == "On" && vue.contiguousCountSelector == "On") {
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
      if (e.keyCode === 27) {
        if (vue.distinctCountSelector === "On") {
          vue.selectedFeatures = [];
        }
        finish();
      }
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
      console.log("box", bbox);
      // convert bbox to lat lng
      console.log(
        "canvas bounds",
        map.getCanvas().height,
        map.getCanvas().width
      );
      console.log("map bounds", vue.map.getBounds());

      let x1 = bbox[0].x;
      let y1 = bbox[0].y;
      let x2 = bbox[1].x;
      let y2 = bbox[1].y;
      let lat1 = map.unproject([x1, y1]).lat;
      let lon1 = map.unproject([x1, y1]).lng;
      let lat2 = map.unproject([x2, y2]).lat;
      let lon2 = map.unproject([x2, y2]).lng;
      console.log("lat1", lat1);
      console.log("lon1", lon1);
      console.log("lat2", lat2);
      console.log("lon2", lon2);

      // If bbox exists. use this value as the argument for `queryRenderedFeatures`
      if (bbox && vue.countSelector == "On") {
        // var features = map.queryRenderedFeatures(bbox, {
        //   layers: [vue.segmentSettings.SeriesShortUnique],
        // });
        console.log(bbox);
        console.log(bbox);
        console.log(vue.mapSourceData);
        // [lat1, lat2] = [lat2, lat1].sort();
        // [lon1, lon2] = [lon2, lon1].sort();
        [lat2, lat1] = [lat2, lat1].sort();
        [lon2, lon1] = [lon1, lon2].sort();
        console.log("sorted");
        console.log(lat1, lon1, lat2, lon2);
        let features = [];

        if (lat1 == lat2 && lon1 == lon2) {
          features = map.queryRenderedFeatures(bbox, {
            layers: [vue.segmentSettings.SeriesShortUnique],
          });
        } else {
          features = featuresInBoundingBox(
            vue.mapSourceData,
            lat1,
            lon1,
            lat2,
            lon2
          );
        }
        console.log("feature count", features.length);
        console.log("features", features);
        // features = [];
        if (features.length >= 5000) {
          return window.alert("Select fewer geo units");
        }
        if (vue.distinctCountSelector === "On" && features.length == 1) {
          //TODO - ensure no duplicates
          vue.selectedFeatures.push(features[0]);
          features = vue.selectedFeatures;
        }

        if (features.length > 0 && features[0].hasOwnProperty("properties")) {
          var total = features
            .map(
              (feature) =>
                feature.properties[vue.segmentSettings.mapbox_segment]
            )
            .reduce(function (pv, cv) {
              if (isNaN(cv)) {
                return pv;
              } else {
                return pv + cv;
              }
            }, 0);
        } else {
          var total = features
            .map((feature) => feature[vue.segmentSettings.mapbox_segment])
            .reduce(function (pv, cv) {
              if (isNaN(cv)) {
                return pv;
              } else {
                return pv + cv;
              }
            }, 0);
        }
        let geoCounterString = "";

        let dataType = vue.selectedDataType;
        let average;

        // if (
        //   dataType == "Percent" ||
        //   dataType == "2:Percent" ||
        //   dataType == "Saturation Shift" ||
        //   dataType == "4:Percent Shift"
        // ) {
        if (vue.percentTypes.includes(dataType)) {
          average = parseFloat(total) / parseFloat(features.length);
          geoCounterString = `Average Percent: ${average.toLocaleString(
            undefined,
            { style: "percent", minimumFractionDigits: 1 }
          )}`;
        } else {
          //(dataType == "Percent") {
          geoCounterString = `Total Count: ${total.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`;
        } //else {
        // dataType = "Index"

        //   average = parseFloat(total) / parseFloat(features.length);
        //   geoCounterString = `Average Index: ${average.toLocaleString(
        //     undefined,
        //     { maximumFractionDigits: 5 }
        //   )}`;
        // }
        // console.log("showing annotation");
        // console.log(geoCounterString);
        vue.geoCounterString = geoCounterString;
        vue.showGeoCounter = true;
        // let annotation = document.createElement("h3");
        // annotation.classList.add("annotation");
        // annotation.style =
        //   "position: absolute; top: 10px; left: 10px; color: black; height: auto; width:auto; padding: 10px; border-radius: 5px;background-color: rgba(255,255,255,0.8);";
        // annotation.innerHTML = geoCounterString;
        let geoJsonGeoProperty = vue.geoJsonGeoProperty;
        var filter = features.reduce(
          function (memo, feature) {
            if (feature.hasOwnProperty("properties")) {
              memo.push(feature.properties[geoJsonGeoProperty]);
            } else {
              memo.push(feature[geoJsonGeoProperty]);
            }
            return memo;
          },
          ["in", geoJsonGeoProperty]
        );
        map.setFilter(
          `${vue.segmentSettings.SeriesShortUnique}-filtered`,
          filter
        );
      }

      map.dragPan.enable();
    }
    this.navigationControl = new mapboxgl.NavigationControl();
    let navigationPosition = this.isFullscreen ? "bottom-right" : "top-right";
    map.addControl(this.navigationControl, navigationPosition);
    // this.fullScreenControl = new mapboxgl.FullscreenControl();
    // map.addControl(this.fullScreenControl);
    this.scaleControl = new mapboxgl.ScaleControl({
      maxWidth: 400,
      unit: "imperial",
    });
    map.addControl(this.scaleControl);
    map.addControl(new mapboxgl.AttributionControl({}));
    // var checking_style_status = false;
    let segmentSettings = this.segmentSettings;
    this.selectedSegmentOptions = {
      code: Object.keys(this.mapSettingsData)[0],
      label: Object.values(this.mapSettingsData)[0].SeriesShortUnique,
    };
    // console.log(checking_style_status);
    // map.on("styledata", function () {
    //   // console.log(map.getStyle().layers)
    //   if (checking_style_status) {
    //     // If already checking style status, bail out
    //     // (important because styledata event may fire multiple times)
    //     return;
    //   } else {
    //     checking_style_status = true;
    //     setMapLayer(vue, segmentSettings);
    //   }
    // });
    map.on("sourcedata", (e) => {
      // console.log("A dataSource event occurred.");
      // console.log(e);
      if (e.isSourceLoaded) {
        // console.log(`loaded: ${e.source.url}`);
        setMapLayer(vue, segmentSettings);
        // console.log("*** this worked***");
      }
    });

    // map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-left");
    function setMapLayer(vue, segmentSettings) {
      // console.log("vue.selectedMarketDataTilesetLayer");
      // console.log(vue.selectedMarketDataTilesetLayer);
      if (map.isStyleLoaded() && vue.intramarketMarketSettingsDataV4) {
        // checking_style_status = false;
        // map._container.trigger('map_style_finally_loaded');
        if (!map.getSource("dataSource")) {
          if (!vue.sourcesLoaded) {
            // map.addSource("dataSource", {
            //   type: "geojson",
            //   // Use a URL for the value for the `data` property.
            //   data: vue.mapSourceData,
            // });
            // map.addSource("dataLabelSource", {
            //   type: "geojson",
            //   // Use a URL for the value for the `data` property.
            //   data: vue.mapLabelSourceData,
            // });
            map.addSource("dataSource", {
              type: "vector",
              // Use a URL for the value for the `data` property.
              // url: vue.selectedMarketDataTilesetURL, mapbox://styles/stobieb/cl9hljo0n005114qskbrny795
              url: vue.selectedMarketDataTilesetURL,
            });
            console.log("vue.selectedMarketDataTilesetURL");
            console.log(vue.selectedMarketDataTilesetURL);
            console.log("vue.selectedMarketLabelTilesetURL");
            console.log(vue.selectedMarketLabelTilesetURL);

            map.addSource("dataLabelSource", {
              type: "vector",
              // Use a URL for the value for the `data` property.
              // url: vue.selectedMarketLabelTilesetURL,
              url: vue.selectedMarketLabelTilesetURL,
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
          // console.log("vue.segmentSettings");
          // console.log(vue.segmentSettings);
          // vue.selectedFeatures = [];
          // if (
          //   vue.segmentSettings["DataType"] == "Percent" ||
          //   vue.segmentSettings["DataType"] == "2:Percent" ||
          //   vue.segmentSettings["DataType"] == "Index"
          // ) {
          if (vue.percentTypes.includes(vue.segmentSettings["DataType"])) {
            min = parseFloat(min);
            max = parseFloat(max);
          } else {
            min = parseInt(min);
            max = parseInt(max);
          }
          // console.log("minmax");
          // console.log(min);
          // console.log(max);
          let startColor = vue.segmentSettings["HeatMapStartColor"];
          let endColor = vue.segmentSettings["HeatMapEndColor"];
          // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
          let firstSymbolId;
          const layers = map.getStyle().layers;
          for (const layer of layers) {
            if (layer.id === "road-motorway-trunk") {
              firstSymbolId = layer.id;
              break;
            }
          }
          // console.log('symbol layer')
          // console.log(firstSymbolId)
          // console.log("vue.segmentSettings.mapbox_segment");
          // console.log(vue.segmentSettings);
          // console.log(vue.segmentSettings.mapbox_segment);
          // console.log("addLayer");
          // console.log(min, startColor, max, endColor);
          let colorRange = [min, startColor, max, endColor];
          if (min < 0 && max > 0) {
            colorRange = [
              min,
              startColor,
              0,
              vue.legendZeroColor,
              max,
              endColor,
            ];
          }
          console.log("colorRange", colorRange);
          console.log("this.segmentSettings");
          console.log(vue.segmentSettings);
          console.log("this.segmentSettings.SeriesShortUnique");
          console.log(vue.segmentSettings.SeriesShortUnique);
          map.addLayer(
            {
              id: vue.segmentSettings.SeriesShortUnique,
              type: "fill",
              // source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              source: "dataSource",
              "source-layer": vue.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              background: "#0000ff",
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["number", ["get", vue.segmentSettings.mapbox_segment]],
                  ...colorRange,
                ],
                "fill-opacity": vue.opacity / 100,
                "fill-outline-color": "#000000",
              },
            },
            firstSymbolId
          );
          // console.log("vue.segmentSettings.mapbox_segment");
          // console.log(vue.segmentSettings.mapbox_segment);
          console.log("colorRange", colorRange);
          console.log("this.segmentSettings");
          console.log(vue.segmentSettings);
          console.log("this.segmentSettings.SeriesShortUnique");
          console.log(vue.segmentSettings.SeriesShortUnique);
          map.addLayer(
            {
              id: `${vue.segmentSettings.SeriesShortUnique}-filtered`,
              type: "fill",
              // source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              source: "dataSource",
              "source-layer": vue.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              paint: {
                //#EC0303 #0305EC
                "fill-outline-color": "#000000",
                "fill-color": "rgba(0,0,0,1)",
                "fill-opacity": 0.3,
              },
              filter: ["in", vue.geoJsonGeoProperty, ""],
            },
            firstSymbolId
          );
          let geoLayerVisibility =
            vue.geoLabelVisibility == "On" ? "visible" : "none";
          // console.log(geoLayerVisibility);
          // console.log("vue.segmentSettings.mapbox_segment");
          // console.log(vue.segmentSettings.mapbox_segment);
          map.addLayer({
            id: "geoLabels",
            type: "symbol",
            // source: {
            //   type: "vector",
            //   url: "mapbox://stobieb.Albany_bg_labels",
            // },
            source: "dataLabelSource",
            "source-layer": vue.selectedMarketLabelTilesetLayer,
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
            let currentLayer = vue.segmentSettings.SeriesShortUnique;
            // identifyFeatures(map, popup, e,  segmentSettings.SeriesShortUnique, ["ZCTA5CE10",  segmentSettings.SeriesShortUnique])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              // currentLayer,
              vue.segmentSettings.mapbox_segment,
            ]);
          });

          map.on("mouseleave", vue.segmentSettings.SeriesShortUnique, (e) => {
            // console.log('A mouseleave event occurred.');
            let currentLayer = vue.segmentSettings.SeriesShortUnique;
            // identifyFeatures(map, popup, e,  segmentSettings.SeriesShortUnique, ["ZCTA5CE10",  segmentSettings.SeriesShortUnique])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              // currentLayer,
              vue.segmentSettings.mapbox_segment,
            ]);
          });

          map.on("mousemove", function (e) {
            // console.log("map.on.mousemove");
            // console.log(e.point);
            // console.log(e.lngLat);
            // let currentLayer = map.getStyle().layers.at(-2).id
            let currentLayer = vue.segmentSettings.SeriesShortUnique;
            // console.log("mousemove");
            // console.log(segmentSettings);
            // identifyFeatures(map, popup, e,  segmentSettings.SeriesShortUnique, ["ZCTA5CE10",  segmentSettings.SeriesShortUnique])
            identifyFeatures(vue, segmentSettings, e, currentLayer, [
              vue.geoJsonGeoProperty,
              // currentLayer,
              vue.segmentSettings.mapbox_segment,
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
        }, 300);
        return;
      }
    }
    // this.selectedComputedSummaryMarketOptions =
    //   this.computedMarketOptions[0]["options"];
    this.loading = false;
    setTimeout(function () {
      vue.initialLoading = false;
    }, 1000);
    vue.flowFirstTime = true;
    vue.selectedMarketType = "state";
  },
  watch: {
    country: function () {
      console.log("*** country change ***");
      this.countryChange = true;
      if (this.country == "us") {
        this.intramarketMarketSettingsData = this.usMarketSettingsData;
        this.pointData = [];
        this.selectedMarket = "DallasFortWrthTX";
        this.selectedMarketType = "dma";
        this.selectedGeoUnits = "bg";
      }
      if (this.country == "mexico") {
        this.intramarketMarketSettingsData = this.mexicoMarketSettingsData;
        this.selectedMarket = "Mexico";
        this.selectedMarketType = "dma";
        this.selectedGeoUnits = "geo";
      }
      this.loading = true;
      this.updateIntramarketData();
    },
    $fullscreen: function () {
      this.toggleFlowFullScreen();
    },
    // flowFullScreen: function () {
    //   this.flowShowSettings = true;
    // },
    flowShowSettings: function () {},
    flowExcludeWithinStateOptions() {
      this.updateFlowData();
    },
    flowExcludeWithinState() {
      this.flowFirstTime = false;
      this.updateFlowData();
    },
    flowSelectedMarket() {
      if (this.flowSelectedMarketType == "metro_area") {
        this.flowSelectedGeoSegment = this.flowSelectedMetroAreaOption;
      }
      if (this.flowSelectedMarketType == "states") {
        this.flowSelectedGeoSegment = this.flowSelectedStatesOption;
      }
      this.flowFirstTime = false;
      this.updateFlowData();
    },
    flowSelectedDirection() {
      this.flowFirstTime = false;
      this.updateFlowData();
    },

    flowSelectedGeoSegment() {
      this.flowFirstTime = false;
      this.updateFlowData();
    },
    flowSelectedMetroAreaOption() {
      this.flowFirstTime = false;
      if (this.flowSelectedMarketType == "metro_areas") {
        this.flowSelectedGeoSegment = this.flowSelectedMetroAreaOption;
      }
      this.updateFlowData();
    },
    flowSelectedStatesOption() {
      if (this.flowSelectedMarketType == "states") {
        this.flowSelectedGeoSegment = this.flowSelectedStatesOption;
      }
      this.updateFlowData();
    },
    flowSelectedMovementDirection() {
      this.flowFirstTime = false;
      if (this.flowSelectedMovementDirection == "net") {
        this.flowMapData = this.flowMapDataBase["net"];
      } else {
        this.flowMapData = this.flowMapDataBase["percent"];
      }
      this.updateFlowData();
    },
    flowSelectedAgeSegment() {
      this.updateFlowData();
    },
    flowSelectedIncomeSegment() {
      this.flowFirstTime = false;
      console.log("flowSelectedIncomeSegment updated");
      this.updateFlowData();
    },

    fullscreen: function () {
      this.showSettings = true;
    },

    range: function () {
      this.updateSelectedSegments();
    },
    selectedMarketType: function () {
      // if (this.countryChange) {
      //   return;
      // }
      console.log("watch selectedMarketType");
      if (this.selectedMarketType === "dma") {
        console.log(
          "selectedMarketType should be dma",
          this.selectedMarketType
        );
        console.log("computedMarketOptions", this.computedMarketOptions);
        this.selectedComputedMarketOptions =
          this.computedMarketOptions[0]["options"];
        // this.flowComputedMarketOptions = this.selectedComputedMarketOptions;
        // TODO: Change for mexico
        this.selectedMarket = this.countryData[this.country]["dma"];
        // this.selectedMarket = "DallasFortWrthTX";
        // this.selectedMarket = "Mexico";
      } else {
        console.log(
          "selectedMarketType should be state",
          this.selectedMarketType
        );
        this.selectedComputedMarketOptions =
          this.computedMarketOptions[1]["options"];
        // this.flowComputedMarketOptions = this.selectedComputedMarketOptions;
        // this.selectedMarket = "Texas";
        this.selectedMarket = this.countryData[this.country]["state"];
      }
      this.showGeoCounter = false;
      console.log("selectedMarketType", this.selectedMarketType);
      console.log("selectedMarket", this.selectedMarket);
    },
    flowSelectedMarketType: function () {
      if (this.flowSelectedMarketType === "metro_areas") {
        this.flowSelectedMetroAreaOption = Object.keys(
          this.flowMetroAreaListOptions
        )[1];
        this.flowSelectedGeoSegment = this.flowSelectedMetroAreaOption;
        this.flowComputedMarketOptions =
          this.computedFlowMarketOptions[0]["options"];
        this.flowSelectedMarket = "DallasFortWorthTX";
      } else {
        this.flowSelectedStatesOption = Object.keys(
          this.flowStatesListOptions
        )[1];
        this.flowSelectedGeoSegment = this.flowSelectedStatesOption;
        this.flowComputedMarketOptions =
          this.computedFlowMarketOptions[1]["options"];
        this.flowSelectedMarket = "Texas";
      }
    },
    selectedAgeSegment: function () {
      if (this.countryChange) {
        return;
      }
      this.showGeoCounter = false;
      // this.selectedSegmen
      // let key = this.selectedAgeSegment
      this.previousSelectedSegment = this.selectedSegment;
      this.selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      this.selectedTotalSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        // this.selectedAgeSegment,
        "1:All",
        // this.selectedIncomeSegment,
        "1:All",
        this.selectedTotalDataType,
        this.selectedDataSeries
      );
      console.log("selected segment");
      console.log(this.selectedSegment);
      console.log(this.selectedAgeSegment);
      console.log(this.selectedIncomeSegment);
      let values = Object.values(this.mapSettingsData);
      let options = [...new Set(Object.keys(this.dataTypeNameMappingV4))];
      if (
        this.selectedIncomeSegment === "1:All" &&
        this.selectedAgeSegment === "1:All"
      ) {
        // selectedDataType Disable Percent

        let optionsArray = [];
        console.log("******options", options);
        options.forEach((option) => {
          let obj = {};
          // if (option === "2:Percent") {

          if (this.notAllAllTypes.includes(option)) {
            obj = {
              label: this.dataTypeMapping[option],
              code: option,
              disabled: true,
            };
          } else {
            obj = { label: this.dataTypeMapping[option], code: option };
          }
          optionsArray.push(obj);
        });
        this.selectedDataTypeOptions = optionsArray;
        console.log("selectedDataTypeOptions");
        console.log("7936");
        console.log(this.selectedDataTypeOptions);
      } else {
        // selectedDataType enable Percent
        this.selectedDataTypeOptions =
          optionsListToObjectArrayWithMappingCodeLabel(
            [...new Set(Object.keys(this.dataTypeNameMappingV4))],
            this.dataTypeNameMappingV4
          );
        console.log("selectedDataTypeOptions");
        console.log("7947");
        console.log(this.selectedDataTypeOptions);
      }
    },
    selectedIncomeSegment: function () {
      if (this.countryChange) {
        return;
      }
      this.showGeoCounter = false;
      // console.log("selectedIncomeSegment");
      // this.selectedSegmen
      // let key = this.selectedAgeSegment
      this.previousSelectedSegment = this.selectedSegment;
      this.selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      console.log("changing income segment");
      this.selectedTotalSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        // this.selectedAgeSegment,
        "1:All",
        // this.selectedIncomeSegment,
        "1:All",
        this.selectedTotalDataType,
        this.selectedDataSeries
      );
      let values = Object.values(this.mapSettingsData);
      let options = [...new Set(Object.keys(this.dataTypeNameMappingV4))];
      if (
        this.selectedIncomeSegment === "1:All" &&
        this.selectedAgeSegment === "1:All"
      ) {
        // selectedDataType Disable Percent

        let optionsArray = [];
        console.log("******options", options);
        options.forEach((option) => {
          let obj = {};
          // if (option === "2:Percent") {
          if (this.notAllAllTypes.includes(option)) {
            obj = {
              label: this.dataTypeMapping[option],
              code: option,
              disabled: true,
            };
          } else {
            obj = { label: this.dataTypeMapping[option], code: option };
          }
          optionsArray.push(obj);
        });
        this.selectedDataTypeOptions = optionsArray;
        console.log("selectedDataTypeOptions");
        console.log("8005");
        console.log(this.selectedDataTypeOptions);
      } else {
        // selectedDataType enable Percent
        this.selectedDataTypeOptions =
          optionsListToObjectArrayWithMappingCodeLabel(
            [...new Set(Object.keys(this.dataTypeNameMappingV4))],
            this.dataTypeNameMappingV4
          );
        console.log("selectedDataTypeOptions");
        console.log("8012");
        console.log(this.selectedDataTypeOptions);
      }
    },
    selectedAgeSegmentComp: function () {
      this.showGeoCounter = false;
      // this.selectedSegmen
      // let key = this.selectedAgeSegment
      this.previousSelectedSegmentComp = this.selectedSegmentComp;
      this.selectedSegment = findMarketSegmentData(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegmentComp,
        this.selectedIncomeSegmentComp,
        this.selectedDataType,
        this.selectedDataSeries
      );
      this.selectedTotalSegment = findMarketSegmentData(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        // this.selectedAgeSegment,
        "1:All",
        // this.selectedIncomeSegment,
        "1:All",
        this.selectedTotalDataType,
        this.selectedDataSeries
      );
      console.log("selected segment");
      console.log(this.selectedSegmentComp);
      console.log(this.selectedAgeSegmentComp);
      console.log(this.selectedIncomeSegmentComp);
      let values = Object.values(this.mapSettingsData);
      let options = [...new Set(values.map((item) => item.Display_Data_Type))];
      if (
        this.selectedIncomeSegmentComp === "1:All" &&
        this.selectedAgeSegmentComp === "1:All"
      ) {
        // selectedDataType Disable Percent

        let optionsArray = [];
        console.log("******options", options);
        options.forEach((option) => {
          let obj = {};
          // if (option === "2:Percent") {

          if (this.notAllAllTypes.includes(option)) {
            obj = {
              label: this.dataTypeMapping[option],
              code: option,
              disabled: true,
            };
          } else {
            obj = { label: this.dataTypeMapping[option], code: option };
          }
          optionsArray.push(obj);
        });
        this.selectedDataTypeOptions = optionsArray;
        console.log("selectedDataTypeOptions");
        console.log("8073");
        console.log(this.selectedDataTypeOptions);
      } else {
        // selectedDataType enable Percent
        this.selectedDataTypeOptions =
          optionsListToObjectArrayWithMappingCodeLabel(
            [...new Set(values.map((item) => item.Display_Data_Type))],
            this.dataTypeMapping
          );
        console.log("selectedDataTypeOptions");
        console.log("8083");
        console.log(this.selectedDataTypeOptions);
      }
    },
    selectedIncomeSegmentComp: function () {
      this.showGeoCounter = false;
      // console.log("selectedIncomeSegment");
      // this.selectedSegmen
      // let key = this.selectedAgeSegment
      this.previousSelectedSegmentComp = this.selectedSegmentComp;
      this.selectedSegmentComp = findMarketSegmentData(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegmentComp,
        this.selectedIncomeSegmentComp,
        this.selectedDataType,
        this.selectedDataSeries
      );
      let values = Object.values(this.mapSettingsData);
      let options = [...new Set(values.map((item) => item.Display_Data_Type))];
      if (
        this.selectedIncomeSegmentComp === "1:All" &&
        this.selectedAgeSegmentComp === "1:All"
      ) {
        // selectedDataType Disable Percent

        let optionsArray = [];
        console.log("******options", options);
        options.forEach((option) => {
          let obj = {};
          // if (option === "2:Percent") {
          if (this.notAllAllTypes.includes(option)) {
            obj = {
              label: this.dataTypeMapping[option],
              code: option,
              disabled: true,
            };
          } else {
            obj = { label: this.dataTypeMapping[option], code: option };
          }
          optionsArray.push(obj);
        });
        this.selectedDataTypeOptions = optionsArray;
        console.log("selectedDataTypeOptions");
        console.log("8127");
        console.log(this.selectedDataTypeOptions);
      } else {
        // selectedDataType enable Percent
        this.selectedDataTypeOptions =
          optionsListToObjectArrayWithMappingCodeLabel(
            [...new Set(values.map((item) => item.Display_Data_Type))],
            this.dataTypeMapping
          );
        console.log("selectedDataTypeOptions");
        console.log("8131");
        console.log(this.selectedDataTypeOptions);
      }
    },
    async selectedDataType(newDataType) {
      if (this.countryChange) {
        return;
      }
      this.selectedDataType = newDataType;
      // this.previousSegmentSettings = this.segmentSettings;
      // this.previousSelectedSegment = this.selectedSegment;
      // let values = Object.values(this.mapSettingsData);
      // console.log("selectedData");
      // console.log(this.mapSettingsData);
      // console.log(newDataType);
      // let valuesForDataSeries = values.filter(function (e) {
      //   return e.Display_Data_Type === newDataType;
      // });
      // console.log("valuesForDataSeries");
      // console.log(valuesForDataSeries);
      // this.selectedDataSeriesOptions = Array.from(
      //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      // );
      // this.selectedDataSeries =
      //   this.selectedDataSeriesOptions[
      //     this.selectedDataSeriesOptions.length - 1
      //   ];
      // console.log("this.selectedDataSeries");
      // console.log(this.selectedDataSeries);
      // console.log(this.selectedGeographiesShapes);
      // console.log(this.selectedAgeSegment);
      // console.log(this.selectedIncomeSegment);
      // console.log(this.selectedDataType);
      // console.log(this.selectedDataSeries);
      // this.selectedSegment = findMarketSegmentDataV4(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   newDataType,
      //   this.selectedDataSeries
      // );
      // console.log("selectedSegment alan");
      // console.log(this.selectedSegment);
      // this.selectedTotalSegment = findMarketSegmentDataV4(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   // this.selectedAgeSegment,
      //   "1:All",
      //   // this.selectedIncomeSegment,
      //   "1:All",
      //   this.selectedTotalDataType,
      //   this.selectedDataSeries
      // );
      // console.log("selectedSegment");
      // console.log(this.selectedSegment);
      // console.log(this.mapSettingsData);
      // this.previousSegmentSettings = this.segmentSettings;
      // this.segmentSettings = this.selectedSegment;
      // this.previousSegmentSettings = this.segmentSettings;

      // let selectedMarket = this.selectedMarket;
      // this.selectedMarket = selectedMarket;
      // const mapDataResponse = await fetch(
      //   // `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
      //   `${
      //     this.base_asset_url
      //   }/${this.selectedMarket.toLowerCase()}_${this.selectedDataType.toLowerCase()}_data.json`
      // );

      // const mapData = await mapDataResponse.json();
      // this.mapSourceData = await mapData;
      // await this.loadMapSourceData();
      let resetView = false;
      await this.reloadMap(resetView);
      // this.showGeoCounter = false;
      // // this.selectedSegmen
      // // let key = this.selectedAgeSegment
      // this.previousSelectedSegment = this.selectedSegment;

      // // this.selectedDataSeriesOptions = optionsListToObjectArraySelect([
      // //   ...new Set(values.map((item) => item.Display_Data_Series)),
      // // ]);
      // let values = Object.values(this.mapSettingsData);
      // let selectedDataType = this.selectedDataType;
      // let valuesForDataSeries = values.filter(function (e) {
      //   return e.Display_Data_Type === selectedDataType;
      // });
      // this.selectedDataSeriesOptions = Array.from(
      //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      // );
      // this.selectedDataSeries =
      //   this.selectedDataSeriesOptions[
      //     this.selectedDataSeriesOptions.length - 1
      //   ];
      // this.selectedSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   this.selectedDataType,
      //   this.selectedDataSeries
      // );
    },
    async selectedEthnicity(newEthnicity) {
      if (this.countryChange) {
        return;
      }
      this.selectedEthnicity = newEthnicity;
      // this.previousSegmentSettings = this.segmentSettings;
      // this.previousSelectedSegment = this.selectedSegment;
      // let values = Object.values(this.mapSettingsData);
      // console.log("selectedData");
      // console.log(this.mapSettingsData);
      // console.log(newDataType);
      // let valuesForDataSeries = values.filter(function (e) {
      //   return e.Display_Data_Type === newDataType;
      // });
      // console.log("valuesForDataSeries");
      // console.log(valuesForDataSeries);
      // this.selectedDataSeriesOptions = Array.from(
      //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      // );
      // this.selectedDataSeries =
      //   this.selectedDataSeriesOptions[
      //     this.selectedDataSeriesOptions.length - 1
      //   ];
      // console.log("this.selectedDataSeries");
      // console.log(this.selectedDataSeries);
      // console.log(this.selectedGeographiesShapes);
      // console.log(this.selectedAgeSegment);
      // console.log(this.selectedIncomeSegment);
      // console.log(this.selectedDataType);
      // console.log(this.selectedDataSeries);
      // this.selectedSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   newDataType,
      //   this.selectedDataSeries
      // );
      // this.selectedTotalSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   // this.selectedAgeSegment,
      //   "1:All",
      //   // this.selectedIncomeSegment,
      //   "1:All",
      //   this.selectedTotalDataType,
      //   this.selectedDataSeries
      // );
      // console.log("selectedSegment");
      // console.log(this.selectedSegment);
      // console.log(this.mapSettingsData);
      // this.previousSegmentSettings = this.segmentSettings;
      // this.segmentSettings = this.selectedSegment;
      // this.previousSegmentSettings = this.segmentSettings;

      // let selectedMarket = this.selectedMarket;
      // this.selectedMarket = selectedMarket;
      // const mapDataResponse = await fetch(
      //   // `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
      //   `${
      //     this.base_asset_url
      //   }/${this.selectedMarket.toLowerCase()}_${this.selectedDataType.toLowerCase()}_data.json`
      // );

      // const mapData = await mapDataResponse.json();
      // this.mapSourceData = await mapData;
      // await this.loadMapSourceData();
      let resetView = false;
      await this.reloadMap(resetView);
      // this.showGeoCounter = false;
      // // this.selectedSegmen
      // // let key = this.selectedAgeSegment
      // this.previousSelectedSegment = this.selectedSegment;

      // // this.selectedDataSeriesOptions = optionsListToObjectArraySelect([
      // //   ...new Set(values.map((item) => item.Display_Data_Series)),
      // // ]);
      // let values = Object.values(this.mapSettingsData);
      // let selectedDataType = this.selectedDataType;
      // let valuesForDataSeries = values.filter(function (e) {
      //   return e.Display_Data_Type === selectedDataType;
      // });
      // this.selectedDataSeriesOptions = Array.from(
      //   new Set(valuesForDataSeries.map((item) => item.Display_Data_Series))
      // );
      // this.selectedDataSeries =
      //   this.selectedDataSeriesOptions[
      //     this.selectedDataSeriesOptions.length - 1
      //   ];
      // this.selectedSegment = findMarketSegmentData(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   this.selectedDataType,
      //   this.selectedDataSeries
      // );
    },
    selectedDataSeries: function () {
      if (this.countryChange) {
        return;
      }
      this.showGeoCounter = false;
      // this.selectedSegmen
      // let key = this.selectedAgeSegment
      this.previousSelectedSegment = this.selectedSegment;
      this.selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      this.selectedTotalSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        // this.selectedAgeSegment,
        "1:All",
        // this.selectedIncomeSegment,
        "1:All",
        this.selectedTotalDataType,
        this.selectedDataSeries
      );
    },
    selectedSegmentOptions: function () {
      if (this.countryChange) {
        return;
      }
      // console.log(`updating segment: ${this.selectedSegmentOptions.text}`)
      let key = this.selectedSegmentOptions.value;
      this.selectedSegment = this.mapSettingsData[key];
    },
    markerGeoJSON: function () {
      if (this.countryChange) {
        return;
      }
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
        // console.log(index);
        let dropPinColors = this.dropPinColors;
        // console.log("markers");
        // console.log(this.markerGeoJSON.features);
        ["marker", "marker-small"].forEach(function (markerClass) {
          vue.markerGeoJSON.features.forEach(function (marker) {
            index += 1;
            // create a HTML element for each feature
            let el = document.createElement("div");
            el.className = markerClass;
            el.style = "background-color: blue;";
            let title = markerClass == "marker" ? marker.properties.title : "";
            el.innerHTML =
              "<span style='background-color: " +
              dropPinColors.filter(
                (color) => color.id == marker.properties.color
              )[0].color +
              ";'><b>" +
              title +
              "</b></span>";
            console.log("el");
            console.log(el);

            // make a marker for each feature and add it to the map
            let markerHtml =
              '<h6><span class="badge" style="color: #fff;background-color: ' +
              dropPinColors.filter(
                (color) => color.id == marker.properties.color
              )[0].color +
              '";>' +
              marker.properties.number +
              "</span></h6><h6>" +
              marker.properties.title +
              "</h6>";
            // console.log(marker);
            // console.log("marker html");
            // console.log(markerHtml);
            let offset = markerClass == "marker" ? 0 : 0;
            let newMarker = new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(
                new mapboxgl.Popup({
                  offset: [offset, offset],
                  className: "popUpMarker",
                  closeButton: false,
                }) // add popups
                  .setHTML(markerHtml)
              )
              .addTo(map);
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

            const zoomThreshold = 10;
            const largeMarkerEls = document.getElementsByClassName("marker");
            const smallMarkerEls =
              document.getElementsByClassName("marker-small");
            if (map.getZoom() > zoomThreshold) {
              for (let i = 0; i < largeMarkerEls.length; i++) {
                largeMarkerEls[i].style.display = "block";
              }
              for (let i = 0; i < smallMarkerEls.length; i++) {
                smallMarkerEls[i].style.display = "none";
              }
            } else {
              for (let i = 0; i < largeMarkerEls.length; i++) {
                largeMarkerEls[i].style.display = "none";
              }
              for (let i = 0; i < smallMarkerEls.length; i++) {
                smallMarkerEls[i].style.display = "block";
              }
            }
          });
        });

        // console.log('markers2')
        // console.log(vue.markers)
      }
    },
    csv: function () {
      // console.log('csv.loaded')
    },
    flowOpacity: function () {
      this.flowMapConfig.opacity = this.flowOpacity / 100;
      console.log("updating opacity");
      this.updateDeck();
    },
    opacity: function () {
      if (this.map) {
        this.map.setPaintProperty(
          this.segmentSettings.SeriesShortUnique,
          "fill-opacity",
          parseFloat(this.opacity) / 100
        );
      }
    },
    geoLabelVisibility: function () {
      let visibility = this.geoLabelVisibility == "On" ? "visible" : "none";
      this.map.setLayoutProperty("geoLabels", "visibility", visibility);
    },
    distinctCountSelector: function () {
      // console.log("updating countSelector");
      this.selectedFeatures = [];
      document.querySelectorAll(".annotation").forEach((elem) => elem.remove());
      this.map.setFilter(`${this.segmentSettings.SeriesShortUnique}-filtered`, [
        "in",
        this.geoJsonGeoProperty,
        "",
      ]);
      if (this.countSelector == "On") {
        this.map.getCanvas().style.cursor = "crosshair";
        // this.map.scrollZoom.disable();
        this.map.boxZoom.disable();
        // this.map.dragRotate.disable();

        this.map.dragPan.disable();
      } else {
        // document
        //   .querySelectorAll(".annotation")
        //   .forEach((elem) => elem.remove());
        this.map.getCanvas().style.cursor = "";
        this.map.scrollZoom.enable();
        this.map.boxZoom.enable();
        this.map.dragRotate.enable();
        this.map.dragPan.enable();
        this.segmentSettings.SeriesShortUnique;
      }
      // console.log("selectedFeatures");
      this.selectedFeatures = [];
      // console.log(this.selectedFeatures);
    },
    contiguousCountSelector: function () {
      // console.log("updating countSelector");
      this.selectedFeatures = [];
      document.querySelectorAll(".annotation").forEach((elem) => elem.remove());
      this.map.setFilter(`${this.segmentSettings.SeriesShortUnique}-filtered`, [
        "in",
        this.geoJsonGeoProperty,
        "",
      ]);
      if (this.countSelector == "On") {
        this.map.getCanvas().style.cursor = "crosshair";
        // this.map.scrollZoom.disable();
        this.map.boxZoom.disable();
        // this.map.dragRotate.disable();

        this.map.dragPan.disable();
      } else {
        // document
        //   .querySelectorAll(".annotation")
        //   .forEach((elem) => elem.remove());
        this.map.getCanvas().style.cursor = "";
        this.map.scrollZoom.enable();
        this.map.boxZoom.enable();
        this.map.dragRotate.enable();
        this.map.dragPan.enable();
        this.segmentSettings.SeriesShortUnique;
      }
      // console.log("selectedFeatures");
      this.selectedFeatures = [];
      // console.log(this.selectedFeatures);
    },
    selectedSegment: function () {
      if (this.countryChange) {
        return;
      }
      // console.log("watch selectedSegment");
      if (this.map && this.selectedSegment && this.previousSegmentSettings) {
        let newSegment = this.selectedSegment;
        this.previousSegmentSettings = this.segmentSettings;
        this.segmentSettings =
          this.mapSettingsData[this.selectedSegment.SeriesShortUnique];
        let mapLayer = this.map.getLayer(
          this.previousSegmentSettings.SeriesShortUnique
        );
        if (typeof mapLayer !== "undefined") {
          document
            .querySelectorAll(".annotation")
            .forEach((elem) => elem.remove());
          console.log("line 8766");
          console.log("newSegment");
          console.log(newSegment);
          this.segmentSettings =
            this.mapSettingsData[newSegment.SeriesShortUnique];
          this.map.removeLayer(this.previousSegmentSettings.SeriesShortUnique);
          this.map.removeLayer(
            `${this.previousSegmentSettings.SeriesShortUnique}-filtered`
          );
          this.map.removeLayer("geoLabels");
          if (this.map.getLayer("markers")) {
            this.map.removeLayer("markers");
          }
          let startColor = this.segmentSettings["HeatMapStartColor"];
          let endColor = this.segmentSettings["HeatMapEndColor"];
          console.log("line 8653");
          let min = this.segmentSettings["MinValue"];
          let max = this.segmentSettings["MaxValue"];

          // if (
          //   this.segmentSettings["Display_Data_Type"] == "Percent" ||
          //   this.segmentSettings["Display_Data_Type"] == "2:Percent" ||
          //   this.segmentSettings["Display_Data_Type"] == "Index" ||
          //   this.segmentSettings["Display_Data_Type"] == "4:Percent Change" ||
          //   this.segmentSettings["Display_Data_Type"] == "5:Growth"
          // ) {
          if (
            this.percentTypes.includes(
              this.segmentSettings["Display_Data_Type"]
            )
          ) {
            min = parseFloat(min);
            max = parseFloat(max);
          } else {
            min = parseInt(min);
            max = parseInt(max);
          }
          // console.log("minmax");
          // console.log(min);
          // console.log(max);
          // console.log('here')
          // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
          let firstSymbolId;
          const layers = this.map.getStyle().layers;
          for (const layer of layers) {
            if (layer.id === "road-motorway-trunk") {
              firstSymbolId = layer.id;
              break;
            }
          }
          // console.log('symbol layer')
          // console.log(firstSymbolId)
          // console.log("this.segmentSettings.mapbox_segment");
          // console.log(this.segmentSettings.mapbox_segment);
          // console.log("addLayer");
          // console.log(min, startColor, max, endColor);
          let colorRange = [min, startColor, max, endColor];
          if (min > max) {
            let temp = min;
            min = max;
            max = temp;
          }
          if (min < 0 && max > 0) {
            colorRange = [
              min,
              startColor,
              0,
              // this.legendZeroColor,
              ["rgba", 255, 255, 255, 0],
              max,
              endColor,
            ];
          }
          console.log("colorRange", colorRange);
          console.log("colorRange", colorRange);
          console.log("this.segmentSettings");
          console.log(this.segmentSettings);
          console.log("this.segmentSettings.SeriesShortUnique");
          console.log(this.segmentSettings.SeriesShortUnique);
          this.map.addLayer(
            {
              id: this.segmentSettings.SeriesShortUnique,
              type: "fill",
              // source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              source: "dataSource",
              "source-layer": this.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              background: "#0000ff",
              paint: {
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["number", ["get", this.segmentSettings.mapbox_segment]],
                  // min,
                  // startColor,
                  // 0,
                  // "#ffffff",
                  // max,
                  // endColor,
                  ...colorRange,
                ],
                // 'fill-outline-color': '#000000',
                "fill-outline-color": "#000000",
                "fill-opacity": this.opacity / 100,
              },
            },
            firstSymbolId
          );
          // console.log("this.segmentSettings.mapbox_segment");
          // console.log(this.segmentSettings.mapbox_segment);
          this.map.addLayer(
            {
              id: `${this.segmentSettings.SeriesShortUnique}-filtered`,
              type: "fill",
              // source: "dataSource",
              // source: {
              //   type: "vector",
              //   url: "mapbox://stobieb.Albany_bg_data",
              // },
              source: "dataSource",
              "source-layer": this.selectedMarketDataTilesetLayer,
              layout: {
                visibility: "visible",
              },
              paint: {
                "fill-outline-color": "#000000",
                "fill-color": "rgba(0,0,0,1)",
                "fill-opacity": 0.3,
              },
              filter: ["in", this.geoJsonGeoProperty, ""],
            },
            firstSymbolId
          );
          let geoLayerVisibility =
            this.geoLabelVisibility == "On" ? "visible" : "none";
          // console.log(geoLayerVisibility);
          // console.log("this.segmentSettings.mapbox_segment");
          // console.log(this.segmentSettings.mapbox_segment);
          this.map.addLayer({
            id: "geoLabels",
            type: "symbol",
            // source: {
            //   type: "vector",
            //   url: "mapbox://stobieb.Albany_bg_labels",
            // },
            source: "dataLabelSource",
            "source-layer": this.selectedMarketLabelTilesetLayer,
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
          // console.log("segmentSettings");
          // console.log(this.segmentSettings);
          this.showStatus();
          this.updateSelectedSegments();
          // this.previousSegmentSettings = this.segmentSettings
          // this.previousSelectedSegment = this.selectedSegment
        }
      }
    },
    async selectedGeoUnits(newGeoUnits) {
      if (this.countryChange) {
        return;
      }
      this.showGeoCounter = false;
      // console.log('$$$ selectedGeoUnits $$$');
      // console.log(newGeoUnits);
      // this.selectedGeoUnits = newGeoUnits;
      this.loading = true;

      // this.showStatus();
      this.map.removeLayer(this.previousSegmentSettings.SeriesShortUnique);
      this.map.removeLayer(
        `${this.previousSegmentSettings.SeriesShortUnique}-filtered`
      );
      this.map.removeLayer("geoLabels");
      // await this.getMapData()
      // console.log(
      //   `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
      // );
      console.log("line 7606");
      console.log("market", this.selectedMarket);
      console.log("geo", this.selectedGeoUnits);

      let ethnicityName =
        this.ethnicityMappingOptions[this.selectedEthnicity.toLowerCase()]
          .output_suffix;

      const mapDataResponse = await fetch(
        // `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_data.json`
        `${
          this.base_asset_url
        }/${this.selectedMarket.toLowerCase()}_${ethnicityName}_${this.selectedDataType.toLowerCase()}_data_v${
          this.mapVersion
        }.json`
      );

      const mapData = await mapDataResponse.json();
      this.mapSourceData = await mapData;
      // console.log("this.mapSourceData updated");
      // console.log(this.mapSourceData);
      // const mapLabelsDataResponse = await fetch(
      //   `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_labels.json`
      // );
      // const mapLabelsData = await mapLabelsDataResponse.json();
      // this.mapLabelSourceData = await mapLabelsData;
      // console.log("this.mapLabelSourceData updated");
      // console.log(this.mapLabelSourceData);
      // const settingsDataResponse = await fetch(
      //   `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
      //     this.selectedGeoUnits
      //   }_settings_data.json`
      // );
      console.log("line 7633");
      console.log("market", this.selectedMarket);
      const settingsDataResponse = await fetch(
        `${this.base_asset_url}/${this.selectedMarket.toLowerCase()}_${
          this.selectedGeoUnits
        }_settings_data.json`
      );
      // console.log("fetching file");
      // console.log(
      //   `${this.base_asset_url}/${this.selectedMarket}_${this.selectedGeoUnits}_settings_data.json`
      // );
      let mapSettingsData = await settingsDataResponse.json();
      // console.log("mapSettingsData");
      // console.log(mapSettingsData);
      this.mapSettingsData = await mapSettingsData;

      this.selectedGeographiesShapes = await Object.values(
        this.mapSettingsData
      )[1]["GeographiesShapes"];
      // console.log("this.selectedGeographiesShapes");
      // console.log(this.selectedGeographiesShapes);

      // this.segmentSettings = await Object.values(this.mapSettingsData)[0];
      // console.log("segment settings changing");
      // console.log(this.segmentSettings);

      // TODO - JUST NOW
      // this.previousSegmentSettings = await Object.values(
      //   this.mapSettingsData
      // )[0];
      // this.segmentSettings;

      // this.segmentSettings = this.previousSegmentSettings;
      // console.log(this.mapSettingsData);
      // console.log(this.mapSettingsData);
      // console.log(this.segmentSettings);
      // this.selectedSegment = await Object.values(this.mapSettingsData)[0];
      this.selectedSegment = findMarketSegmentDataV4(
        Object.values(this.mapSettingsData),
        this.selectedGeographiesShapes,
        this.selectedAgeSegment,
        this.selectedIncomeSegment,
        this.selectedDataType,
        this.selectedDataSeries
      );
      // console.log("changing geoType");
      // console.log(this.selectedGeographiesShapes);
      // console.log(this.selectedAgeSegment);
      // console.log(this.selectedIncomeSegment);
      // console.log(this.selectedDataType);
      // console.log(this.selectedDataSeries);
      // console.log(this.selectedSegment);
      this.segmentSettings = this.selectedSegment;
      this.previousSegmentSettings = this.segmentSettings;
      // console.log("new selected segment");
      // console.log(this.segmentSettings);
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

      // const geojsonSource = this.map.getSource("dataSource");
      // const geojsonLabelSource = this.map.getSource("dataLabelSource");

      if (this.map.getSource("dataSource")) {
        // console.log('adding data')
        // console.log(this.mapSourceData);
        // geojsonSource.setData(this.mapSourceData);
        // geojsonLabelSource.setData(this.mapLabelSourceData);
        // console.log('new segment settings')
        // console.log(this.segmentSettings)
        // let max = Math.max(...mapSourceData.features.map(values => ( parseFloat(values.properties[this.selectedSegment]) )) )
        // console.log("did we get here");
        // console.log(this.segmentSettings);
        console.log("line 8959");
        let min = this.segmentSettings["MinValue"];
        let max = this.segmentSettings["MaxValue"];
        // if (
        //   this.segmentSettings["Display_Data_Type"] == "Percent" ||
        //   this.segmentSettings["Display_Data_Type"] == "2:Percent" ||
        //   this.segmentSettings["Display_Data_Type"] == "Index" ||
        //   this.segmentSettings["Display_Data_Type"] == "4:Percent Change" ||
        //   this.segmentSettings["Display_Data_Type"] == "5:Growth"
        // ) {
        if (
          this.percentTypes.includes(this.segmentSettings["Display_Data_Type"])
        ) {
          min = parseFloat(min);
          max = parseFloat(max);
        } else {
          min = parseInt(min);
          max = parseInt(max);
        }
        // console.log("minmax");
        // console.log(min);
        // console.log(max);
        let startColor = this.segmentSettings["HeatMapStartColor"];
        let endColor = this.segmentSettings["HeatMapEndColor"];
        // console.log(`Map: min: ${min} startColor: ${startColor} max: ${max} endColor: ${endColor}`)
        let firstSymbolId;
        const layers = this.map.getStyle().layers;
        for (const layer of layers) {
          if (layer.id === "road-motorway-trunk") {
            firstSymbolId = layer.id;
            break;
          }
        }
        // console.log('symbol layer')
        // console.log(firstSymbolId)
        // console.log("adding layer");
        // console.log(this.segmentSettings);
        // console.log("addLayer");
        // console.log(min, startColor, max, endColor);
        let colorRange = [min, startColor, max, endColor];
        if (min > max) {
          let temp = min;
          min = max;
          max = temp;
        }
        if (min < 0 && max > 0) {
          colorRange = [
            min,
            startColor,
            0,
            // this.legendZeroColor,
            ["rgba", 255, 255, 255, 0],
            max,
            endColor,
          ];
        }
        console.log("colorRange", colorRange);
        console.log("colorRange", colorRange);
        console.log("this.segmentSettings");
        console.log(this.segmentSettings);
        console.log("this.segmentSettings.SeriesShortUnique");
        console.log(this.segmentSettings.SeriesShortUnique);
        this.map.addLayer(
          {
            id: this.segmentSettings.SeriesShortUnique,
            type: "fill",
            // source: "dataSource",
            // source: {
            //   type: "vector",
            //   url: "mapbox://stobieb.Albany_bg_data",
            // },
            source: "dataSource",
            "source-layer": this.selectedMarketDataTilesetLayer,
            layout: {
              visibility: "visible",
            },
            paint: {
              background: "#0000ff",
              "fill-color": [
                "interpolate",
                ["linear"],
                ["number", ["get", this.segmentSettings.mapbox_segment]],
                ...colorRange,
              ],
              "fill-opacity": this.opacity / 100,
              "fill-outline-color": "#000000",
            },
          },
          firstSymbolId
        );
        // console.log("this.segmentSettings.mapbox_segment");
        // console.log(this.segmentSettings.mapbox_segment);
        this.map.addLayer(
          {
            id: `${this.segmentSettings.SeriesShortUnique}-filtered`,
            type: "fill",
            // source: "dataSource",
            // source: {
            //   type: "vector",
            //   url: "mapbox://stobieb.Albany_bg_data",
            // },
            source: "dataSource",
            "source-layer": this.selectedMarketDataTilesetLayer,
            layout: {
              visibility: "visible",
            },
            paint: {
              //#EC0303 #0305EC
              "fill-outline-color": "#000000",
              "fill-color": "rgba(0,0,0,1)",
              "fill-opacity": 0.3,
            },
            filter: ["in", this.geoJsonGeoProperty, ""],
          },
          firstSymbolId
        );
        let geoLayerVisibility =
          this.geoLabelVisibility == "On" ? "visible" : "none";
        // console.log(geoLayerVisibility);
        this.map.addLayer({
          id: "geoLabels",
          type: "symbol",
          // source: {
          //   type: "vector",
          //   url: "mapbox://stobieb.Albany_bg_labels",
          // },
          source: "layerSource",
          "source-layer": this.selectedMarketLabelsTileset,
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
        // this.selectedSegment = Object.values(this.mapSettingsData)[0];
      }
      this.loading = false;
    },
    async selectedMarket(newMarket) {
      if (this.countryChange) {
        return;
      }
      // console.log(newMarket);
      this.selectedMarket = newMarket;
      this.previousSegmentSettings = this.segmentSettings;
      // let values = Object.values(this.mapSettingsData);
      this.previousSelectedSegment = this.selectedSegment;
      // this.selectedSegment = findMarketSegmentDataV4(
      //   Object.values(this.mapSettingsData),
      //   this.selectedGeographiesShapes,
      //   this.selectedAgeSegment,
      //   this.selectedIncomeSegment,
      //   this.selectedDataType,
      //   this.selectedDataSeries
      // );
      // this.segmentSettings = this.selectedSegment;
      this.pointData = this.allPointData[this.selectedMarket]
        ? this.allPointData[this.selectedMarket]
        : [];
      this.selectedFeatures = [];
      await this.reloadMap();
    },

    allPointData: {
      deep: true,
      handler: function () {
        // console.log("updating markers");
        // console.log(this.markers);
        this.markerGeoJSON = this.currentMarketMarkerGeoJSON;
        if (this.selectedMarket && this.allPointData[this.selectedMarket]) {
          this.pointData = this.allPointData[this.selectedMarket]
            ? this.allPointData[this.selectedMarket]
            : [];
        } else {
          this.pointData = [];
        }

        if (
          this.map &&
          this.markerGeoJSON &&
          this.markerGeoJSON.features.length > 0
        ) {
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

          let dropPinColors = this.dropPinColors;
          // console.log(dropPinColors);
          this.markerGeoJSON.features.forEach(function (marker) {
            // create a HTML element for each feature - Larger Marker
            var el = document.createElement("div");
            el.className = "marker";
            // console.log(
            //   "<span style='background-color: " +
            //   dropPinColors.filter(
            //     (color) => color.id == marker.properties.color
            //   )[0].color +
            //   ";'><b>" +
            //   marker.properties.number +
            //   "</b></span>"
            // );
            // el.innerHTML =
            //   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"/></svg>';
            el.innerHTML =
              "<span style='background-color: " +
              dropPinColors.filter(
                (color) => color.id == marker.properties.color
              )[0].color +
              ";'><b>" +
              // marker.properties.number +
              '<svg height="140" width="500"><ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />Sorry, your browser does not support inline SVG.  </svg>' +
              "</b></span>";
            let newMarker = new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .addTo(map);
            // .setPopup(new mapboxgl.Popup({
            //     offset: 25
            //   }) // add popups
            //   .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            // map.markers.push(newMarker)
            markers.push(newMarker);
            // // create a HTML element for each feature - Smaller Marker
            // var el = document.createElement("div");
            // el.className = "marker-small";
            // // console.log(
            // //   "<span style='background-color: " +
            // //   dropPinColors.filter(
            // //     (color) => color.id == marker.properties.color
            // //   )[0].color +
            // //   ";'><b>" +
            // //   marker.properties.number +
            // //   "</b></span>"
            // // );
            // // el.innerHTML =
            // //   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"/></svg>';
            // el.innerHTML =
            //   "<span style='background-color: " +
            //   dropPinColors.filter(
            //     (color) => color.id == marker.properties.color
            //   )[0].color +
            //   ";'><b>" +
            //   // marker.properties.number +
            //   '<svg height="140" width="500"><ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />Sorry, your browser does not support inline SVG.  </svg>' +
            //   "</b></span>";
            // let newMarker = new mapboxgl.Marker(el)
            //   .setLngLat(marker.geometry.coordinates)
            //   .addTo(map);
            // // .setPopup(new mapboxgl.Popup({
            // //     offset: 25
            // //   }) // add popups
            // //   .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            // // map.markers.push(newMarker)
            // markers.push(newMarker);
          });
        }
      },
    },
    pointData: function () {
      if (this.countryChange) {
        return;
      }
      // console.log("pointdata changed");
      // console.log(this.pointData);
      if (!this.updatingPointData) {
        this.updatingPointData = true;
        console.log("updating point data");
        // console.log("pointdata changed");
        // console.log(this.pointData);
        // ALAN
        // let newPointData = []
        // if (this.pointData) {
        //   this.pointData = this.pointData.map((point) => {
        //     return {
        //       Number: point.Number,
        //       Title: point.Title,
        //       Latitude: point.Latitude,
        //       Longitude: point.Longitude,
        //       Color: point.Color,
        //       id: point.id,
        //       featureRanges: featureRanges(
        //         this.mapSourceData,
        //         point.Latitude,
        //         point.Longitude,
        //         this.geoJsonGeoProperty,
        //         "M",
        //         100
        //       ),
        //     };
        //   });
        // }
        if (Array.isArray(this.pointData)) {
          let ranges = {};
          this.pointData.forEach((point) => {
            ranges[point.id] = featureRanges(
              this.mapSourceData,
              point.Latitude,
              point.Longitude,
              this.geoJsonGeoProperty,
              "M",
              100
            );
          });
          this.pointDataRanges[this.selectedMarket] = ranges;

          this.allPointData[this.selectedMarket] = this.pointData;
          this.selectedFeatures = featuresInRangeOfPointsNew(
            this.mapSourceData,
            this.pointData,
            // this.pointDataRanges[this.selectedMarket],
            this.pointDataRanges[this.selectedMarket],
            this.range,
            this.geoJsonGeoProperty,
            "M"
          );
          this.selectedFeaturesCSV = featuresInRangeOfPointsCsvNew(
            this.mapSourceData,
            this.pointData,
            // this.pointDataRanges[this.selectedMarket],
            this.pointDataRanges[this.selectedMarket],
            this.range,
            this.geoJsonGeoProperty,
            "M"
          );
          this.selectedTotalFeatures = featuresInRangeOfPointsNew(
            this.mapSourceTotalData,
            this.pointData,
            // this.pointDataRanges[this.selectedMarket],
            this.pointDataRanges[this.selectedMarket],
            this.range,
            this.geoJsonGeoProperty,
            "M"
          );
          this.selectedTotalFeaturesCSV = featuresInRangeOfPointsCsvNew(
            this.mapSourceTotalData,
            this.pointData,
            // this.pointDataRanges[this.selectedMarket],
            this.pointDataRanges[this.selectedMarket],
            this.range,
            this.geoJsonGeoProperty,
            "M"
          );
          let geoJsonGeoProperty = this.geoJsonGeoProperty;

          var filter = this.selectedFeatures.reduce(
            function (memo, feature) {
              memo.push(feature[geoJsonGeoProperty]);
              return memo;
            },
            ["in", geoJsonGeoProperty]
          );
          if (this.map) {
            this.map.setFilter(
              `${this.segmentSettings.SeriesShortUnique}-filtered`,
              filter
            );
            this.updateSelectedSegments();
          }
        }
        console.log("done updating point data");
        this.updatingPointData = false;
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style lang="scss">
</style>
