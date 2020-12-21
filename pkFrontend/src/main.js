// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import AsyncComputed from 'vue-async-computed'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
// import { store } from './store/store'
// import axiosInstance from './axios-auth'

const base = {
  baseURL: 'http://localhost:5000/',
  headers: {
    // Set your Authorization to 'JWT', not Bearer!!!
    Authorization: `JWT ${store.getters.getApiToken}`,
    'Content-Type': 'application/json'
  },
  xhrFields: {
    withCredentials: true
  }
}

const instance = axios.create(base)

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)

Vue.config.productionTip = false
Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Vue.prototype.$http = axios

// const accessToken = localStorage.getItem('token')

// if (accessToken) {
//   axiosInstance.defaults.headers.common['Authorization'] = accessToken
// }

// const token = store.getToken
// const csrftoken = store.getCSRF

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationProvider', ValidationProvider)
axios.defaults.baseURL = 'http://localhost:5000/'
// axios.defaults.headers.common['X-CSRFToken'] = csrftoken
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default instance
