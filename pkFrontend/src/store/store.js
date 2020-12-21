import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import axiosAuth from '../main'
// import Cookies from 'js-cookie'

Vue.use(Vuex)
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    jwt: '',
    api_token: '',
    authUser: {},
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      // obtainJWT: 'https://127.0.0.1:8000/api/v1/auth/obtain_token/',
      // refreshJWT: 'https://127.0.0.1:8000/api/v1/auth/refresh_token/',
      baseUrl: 'http://127.0.0.1:5000/'
    }
  },

  getters: {
    getToken: state => {
      return state.token
    },

    getApiToken: state => {
      return state.api_token
    },
    getJwt: state => {
      return state.jwt
    }
  },

  mutations: {
    setAuthUser (state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },

    setJWT: (state, data) => {
      localStorage.setItem('token', data)
      state.jwt = data
    },

    setApiToken: (state, token) => {
      state.api_token = token
      localStorage.setItem('token', token)
    }

    // setAuthUser: (state, user) => {
    //   state.authUser = user
    // }
  },

  actions: {
    signup ({commit, dispatch, state}, authData) {
      axios
        .post(
          'http://localhost:5000/rest-auth/registration/',
          authData
        )
        .then((response) => {
          console.log(response.data)
          commit('setAuthUser', authData)
          // here we need to dipatch the storeUser action and pass it the form data containing
          // the rest of the signup form data. Pass in state.authUser
        })
    },

    storeUser ({commit, state}, userData) {
      // This needs to be an axios post to a endpoint that updates user details in the database
      axiosAuth
        .post(
          'http://localhost:5000/user/storeUser/',
          userData, {
            // headers: {
            //   Authorization: `JWT ${state.token}`,
            //   'Content-Type': 'application/json'
            // },
            xhrFields: {
              withCredentials: true
            }
          }
        )
        .then((response) => {
          console.log(response.data)
          // here we need to dipatch the storeUser action and pass it the form data containing
          // the rest of the signup form data.
        })
    },

    login ({commit, dispatch, state}, authData) {
      axios
        .post('http://localhost:5000/rest-auth/login/', authData)
        .then((response) => {
          console.log(response)

          commit('setApiToken', response.data.token)
          commit('setAuthUser', response.data.user)
          return response.data.token
          // this.user = response.data.user
        }).then(() => {
          dispatch('storeUser', state.authUser)
        })
    },

    getJWT ({commit}, data) {
      axios
        .post('auth/obtain_token/', data)
        .then(response => {
          console.log(response.data)
          commit('setJWT', response.data)
        })
        .catch(error => {
          console.log(error.data)
        })
    }
  }
})

export default store
