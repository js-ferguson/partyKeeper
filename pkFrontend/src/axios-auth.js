// import axios from 'axios'
// import Vue from 'vue'
// import store from './store/store'
// import router from './router/index'

// const base = {
//   baseURL: 'http://localhost:5000/',
//   headers: {
//     // Set your Authorization to 'JWT', not Bearer!!!
//     Authorization: `JWT ${store.getters.getJwt}`,
//     Merple: 'pizza',
//     'Content-Type': 'application/json'
//   },
//   xhrFields: {
//     withCredentials: true
//   }
// }

// const instance = axios.create(base)
// let oStore
// // // instance.defaults.headers.common['SOMETHING'] = 'something'
// // export default instance
// router.beforeEach(function () {
//   const nstore = require('./store')
//   oStore = nstore
// })

// instance.interceptors.request.use(x => {
//   // console.log(x)
//   // this.dispatch('inspectJWT')
//   // I am logging stuff here to inspect the headers being used by the getUser action
//   return x
// })
// export default instance
