import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    csrfToken: '',
    api_token: '',
    authUser: {}
  },

  getters: {
    getToken: state => {
      return state.token
    },

    getCSRF: state => {
      return state.csrfToken
    },

    getApiToken: state => {
      return state.api_token
    }
  },

  mutations: {
    setToken: (state, data) => {
      axios
        .post('auth/obtain_token/', data, { csrfToken: state.csrfToken })
        .then(response => {
          console.log(response.data)
          state.token = response.data
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
    },

    setAuthUser: (state, user) => {
      state.authUser = user
    }
  },

  actions: {
    setCSRF ({commit}, state) {
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
    signup ({commit, dispatch, state}, authData) {
      axios
        .post(
          'http://localhost:5000/rest-auth/registration/',
          authData, {headers: {'X-CSRFToken': state.csrfToken}}
        )
        .then((response) => {
          console.log(response.data)
          commit('setAuthUser', authData)
          dispatch('storeUser', state.authUser)
          // here we need to dipatch the storeUser action and pass it the form data containing
          // the rest of the signup form data. Pass in state.authUser
        })
    },
    storeUser ({commit, state}, userData) {
      // This needs to be an axios post to a endpoint that updates user details in the database
      axios
        .post(
          'http://localhost:5000/user/storeUser/',
          userData, {headers: {'X-CSRFToken': state.csrfToken}}
        )
        .then((response) => {
          console.log(response.data)
          // here we need to dipatch the storeUser action and pass it the form data containing
          // the rest of the signup form data.
        })
    },

    login ({commit, state}, authData) {
      axios
        .post('http://localhost:5000/rest-auth/login/', authData, {headers: {'X-CSRFToken': state.csrfToken}})
        .then((response) => {
          commit('setApiToken', response.data.token)
          commit('setAuthUser', response.data.user)
          this.user = response.data.user
          console.log(this.api_token)
          console.log(this.user)
        })
    }
  }
})
