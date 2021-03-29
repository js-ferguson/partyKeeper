import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

// import axiosAuth from '../main'
// import { computeModeSetting } from 'vee-validate/dist/types/components/common'
// import Cookies from 'js-cookie'

Vue.use(Vuex)
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const store = new Vuex.Store({
  // plugins: [createPersistedState()],

  state: {
    jwt: '',
    refresh: '',
    // api_token: '',
    authUser: {
      id: null,
      email: null,
      first_name: null,
      last_name: null,
      screen_name: null,
      party_name: null
    },
    isAuthenticated: null,
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      // obtainJWT: 'https://127.0.0.1:8000/api/v1/auth/obtain_token/',
      // refreshJWT: 'https://127.0.0.1:8000/api/v1/auth/refresh_token/',
      obtainJWT: 'http://localhost:5000/token/',
      refreshJWT: 'http://localhost:5000/token/refresh/',
      baseUrl: 'http://127.0.0.1:5000/'
    }
  },

  getters: {
    isAuthenticated: state => {
      return state.jwt !== null
    },

    // getToken: state => {
    //   return state.token
    // },

    // getApiToken: state => {
    //   return state.api_token
    // },
    getJWT: state => {
      return state.jwt
    }
  },

  mutations: {
    // setAuthUser (state, { authUser, isAuthenticated }) {
    //   Vue.set(state, 'authUser', authUser)
    //   Vue.set(state, 'isAuthenticated', isAuthenticated)
    // },
    setAuthUser (state, userData) {
      state.authUser = {
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        screen_name: userData.screen_name,
        party_name: userData.party
      }
    },

    clearAuthUser: state => {
      state.authUser = {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        screen_name: '',
        party_name: ''
      }
      state.jwt = null
      state.refresh = null
      localStorage.setItem('token', null)
      localStorage.setItem('refresh', null)
    },

    setJWT: (state, data) => {
      localStorage.setItem('token', '')
      localStorage.setItem('token', data.access)
      // console.log(data)
      const decoded = jwtDecode(data.access)
      console.log(decoded)
      state.jwt = data.access
      state.authUser.id = decoded.user_id
    },

    setRefresh: (state, data) => {
      // localStorage.setItem('refresh', data.refresh)
      // console.log('refress set: ' + data.refresh)
      state.refresh = data.refresh
    }

    // setApiToken: (state, token) => {
    //   state.api_token = token
    //   localStorage.setItem('token', token)
    // }

    // setAuthUser: (state, user) => {
    //   state.authUser = user
    // }
  },

  actions: {
    signup ({
      commit,
      dispatch,
      state
    }, authData) {
      // Create a new user with email, password and screen name.
      axios
        .post('http://localhost:5000/rest-auth/registration/', authData)
        .then(response => {
          console.log(response.data)
          commit('setAuthUser', authData)
          // here we need to dipatch the storeUser action and pass it the form data containing
          // the rest of the signup form data. Pass in state.authUser
        })
    },

    getUser ({
      commit,
      state
    }) {
      // get the logged in user from the API and set the authUser state object.
      instance.get('/user/get_user/' + state.authUser.id + '/')
        .then(res => {
          console.log(res.data)
          commit('setAuthUser', res.data)
        })
    },

    logout ({
      commit
    }) {
      commit('clearAuthUser')
    },

    getJWT ({
      commit,
      dispatch,
      state
    }, data) {
      // This is the primary login method. Dispatches getUser to populate authUser data.
      axios
        .post(state.endpoints.obtainJWT, data)
        .then(response => {
          console.log(response.data)
          commit('setJWT', response.data)
          commit('setRefresh', response.data)
          dispatch('getUser')
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    refreshJWT () {
      const payload = {
        token: this.state.jwt
      }

      axios
        .post(this.state.endpoints.refreshJWT, payload)
        .then(response => {
          this.commit('updateToken', response.data)
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    inspectJWT () {
      const token = this.state.jwt
      if (token) {
        const decoded = jwtDecode(token)
        const exp = decoded.exp
        const origIat = decoded.orig_iat

        if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - origIat < 628200) {
          this.dispatch('refreshToken')
        } else if (exp - (Date.now() / 1000) < 1800) {
          // Do nothing
        } else {
          // prompt to relogin
        }
      }
    },

    createCharacter ({
      state
    }, data) {
      instance
        .post('api/character/create/' + state.authUser.id + '/', data)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.data)
        })
    }
  }
})

console.log('getter' + store.state.jwt)
const base = {
  baseURL: 'http://localhost:5000/',
  headers: {
    // Set your Authorization to 'JWT', not Bearer!!!
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
    // withCredentials: true

  },
  xhrFields: {
    withCredentials: true
  }
}

const instance = axios.create(base)

instance.interceptors.request.use(x => {
  // console.log(x)
  // this.dispatch('inspectJWT')
  // I am logging stuff here to inspect the headers being used by the getUser action
  return x
})

export default store
