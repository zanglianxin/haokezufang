import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  getters: {
  },
  mutations: {
    setUser(state, token) {
      state.user = token
      setToken(token)
    }
  },
  actions: {
  },
  modules: {
  }
})
