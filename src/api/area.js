import request from '@/utils/request'

export const getCityInfo = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}

export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}

/**
 * 使用关键词查询小区信息
 * @param {*} name 关键词
 * @param {*} id 当前定位城市id
 * @returns
 */
export const communityKeywords = (name, id) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}

/**
 * 房屋图像上传
 * @param {*} file formdata处理后的值
 * @returns
 */
export const uploadImg = (file) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: file
  })
}

/**
 * 发布房源
 * @param {*} obj 各种参数
 * @returns
 */
export const sendHouse = (obj) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data: obj
  })
}
