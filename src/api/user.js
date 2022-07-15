import request from '@/utils/request'

/**
 * 登录
 * @param {String} username 账号
 * @param {String} password 密码
 * @returns
 */

export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const userDataGet = (token) => {
  return request({
    url: '/user',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
}

export const getFavorites = (token) => {
  return request({
    url: '/user/favorites',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
}
