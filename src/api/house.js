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

export const getHouseDetails = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

/**
 * 判断房屋是否收藏
 * @param {*} id String
 * @returns Promise
 */
export const isFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

/**
 * 添加房屋收藏
 * @param {*} id String
 * @returns Promise
 */
export const setFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}

/**
 * 删除房屋收藏
 * @param {*} id String
 * @returns Promise
 */
export const delFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}

export const houseCondition = () => {
  return request({
    url: '/houses/params'
  })
}

/**
 * 获取房屋查询条件
 * (query)城市id
 * @returns Promise
 */
export const houseQueryCondition = () => {
  return request({
    url: '/houses/condition',
    method: 'GET',
    params: {
      id: store.state.HKZFcityInfo.value
    }
  })
}

/**
 * 根据条件查询房屋
 * @param {*} obj
 * @returns
 */
export const selHouse = (more) => {
  return request({
    url: '/houses',
    params: {
      cityId: store.state.HKZFcityInfo.value,
      ...more
    }
  })
}
