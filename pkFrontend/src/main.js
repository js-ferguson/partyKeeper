// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import AsyncComputed from 'vue-async-computed'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  faHome,
  faUser,
  faCog,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
// import { store } from './store/store'
// import axiosInstance from './axios-auth'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// const base = {
//   baseURL: 'http://localhost:5000/',
//   headers: {
//     // Set your Authorization to 'JWT', not Bearer!!!
//     Authorization: `Bearer ${store.getters.getJWT}`,
//     'Content-Type': 'application/json'
//     // withCredentials: true

//   },
//   xhrFields: {
//     withCredentials: true
//   }
// }
// console.log('getter' + store.state.jwt)
// const instance = axios.create(base)

// // instance.interceptors.request.use(x => {
// //   // console.log(x)
// //   // this.dispatch('inspectJWT')
// //   // I am logging stuff here to inspect the headers being used by the getUser action
// //   return x
// // })

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faCog)

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
Vue.config.devtools = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// export default instance
