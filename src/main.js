import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'

Vue.config.productionTip = false

axios.defaults.withCredentials=true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
