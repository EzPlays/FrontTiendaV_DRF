import Vue from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';



Vue.use(VueSweetalert2);
// import './assets/main.css'

Vue.use(axios)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
