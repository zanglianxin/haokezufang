import request from '@/utils/request'
import store from '@/store'

export const findHouse = (offset) => {
  return request({
    url: '/houses',
    params: {
      cityId: store.state.HKZFcityInfo.value,
      offset
    }
  })
}
