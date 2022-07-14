import request from '@/utils/request'

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
      area: 'AREA|88cff55c-aaa4-e2e0'
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
