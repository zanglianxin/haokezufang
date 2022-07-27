import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放用户token
    user: getToken() || {},
    // 存放城市名称和id
    HKZFcityInfo: JSON.parse(localStorage.getItem('HKZFcityInfo')) || {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },

    // 存放房屋的id
    houseCode: JSON.parse(localStorage.getItem('HOUSE_CODE')) || '',

    // 存放小区信息（对象）
    communityObj: {}
  },
  getters: {},
  mutations: {
    // 设置用户的token
    setUser(state, token) {
      state.user = token
      setToken(token)
    },
    // 设置城市的名称和id
    setCityInfo(state, cityname) {
      state.HKZFcityInfo = cityname
      localStorage.setItem('HKZFcityInfo', JSON.stringify(cityname))
    },
    // 设置房屋的id
    setHouseCode(state, housecode) {
      state.houseCode = housecode
      localStorage.setItem('HOUSE_CODE', JSON.stringify(housecode))
    },
    // 设置小区信息对象
    setCommunity(state, obj) {
      state.communityObj = obj
    }
  },
  actions: {},
  modules: {}
})
