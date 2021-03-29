import axios from 'axios'
import store from './store/store'
// import { eventBus } from './event-bus'

export default axios.create({
  baseURL: 'http://localhost:5000/',
  headers: store.state.axiosBase
})
