import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:54249/' // ruta absoluta 



new Vue({
  corse: {origin: "http://localhost:8081", credential: true},
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
