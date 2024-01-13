
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

import App from './App.vue'

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { VueCsvImport } from 'vue-csv-import';

import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels);

// https://github.com/surmon-china/videojs-player/tree/main

import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'



import './app.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Vue.use(VueCsvImport)
Vue.use(VueCompositionAPI)
Vue.use(VueDPlayer)

new Vue({
  components: { VueCsvImport },
  render: h => h(App),
}).$mount('#app')
