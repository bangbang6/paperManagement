import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.scss'
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css'
import '@/util/permision.js'
import element from './plugins/index'
import VueRouter from 'vue-router'
import router from './router/index'
/* import VueEcharts from '@/components/admin/charts/VueEcharts' */
import ECharts from 'echarts'
Vue.prototype.$echarts = ECharts
import VueECharts from 'vue-echarts'
Vue.component('v-chart',VueECharts)
export const Bus = new  Vue();
Vue.use(VueRouter)
Vue.use(element)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
