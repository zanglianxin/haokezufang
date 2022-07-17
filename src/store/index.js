import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    HKZFcityInfo: JSON.parse(localStorage.getItem('HKZFcityInfo')) || {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    }
  },
  getters: {},
  mutations: {
    setUser(state, token) {
      state.user = token
      setToken(token)
    },
    setCityInfo(state, cityname) {
      state.HKZFcityInfo = cityname
      localStorage.setItem('HKZFcityInfo', JSON.stringify(cityname))
    }
  },
  actions: {},
  modules: {}
})
