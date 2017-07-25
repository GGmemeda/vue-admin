import axios from 'axios'

export const API_USE = function (url, type = 'post') {
  return function (data) {
    if (type === 'post') {
      return axios[type](`${url}`, data)
    } else {
      return axios[type](`${url}`, {
        params: data
      })
    }
  }
}
