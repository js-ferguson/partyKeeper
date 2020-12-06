import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    csrfToken: '',
    api_token: '',
    authUser: {
      username: '',
      password: ''
    }
  },

  getters: {
    getToken: state => {
      return state.token
    },

    getCSRF: state => {
      return state.token
    },

    getApiToken: state => {
      return state.api_token
    }

    // getCSRF: state => {
    //   axios
    //     .get('get-csrf-token')
    //     .then(response => {
    //       console.log(response.data.token)
    //       state.csrfToken = response.data.token
    //     })
    //     .catch(error => {
    //       console.log(error.data)
    //     })
    //   return state.csrfToken
    // }

    // getAuthUser: state => {
    //   axios
    //     .get('api/getAuthUser/')
    //     .then(response => {
    //       console.log(response.data)
    //       // state.authUser = response.data
    //     })
    //     .catch(error => {
    //       console.log(error.data)
    //     })
    //   return state.authUser
    // }
  },

  mutations: {
    setToken: state => {
      const content = {
        'username': state.authUser.username,
        'password': state.authUser.password
      }
      axios
        .post('auth/obtain_token/', content)
        .then(response => {
          state.token = response.data
          // console.log('this token response: ' + response.data.token)
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    setCSRF: state => {
      axios
        .get('get-csrf-token')
        .then(response => {
          console.log(response.data)
          state.csrfToken = response.data
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    setApiToken: (state, token) => {
      state.api_token = token
    }
  }
})
