import request from '@/utils/request'
import store from '@/store'

export const swiper = () => {
  return request({
    url: '/home/swiper'
  })
}

export const groups = () => {
  return request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area: store.state.HKZFcityInfo.value
    }
  })
}

export const getAllCity = () => {
  return request({
    url: '/area/city',
    method: 'GET',
    params: {
      level: 1
    }
  })
}
