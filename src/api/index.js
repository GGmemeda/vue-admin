// 引入 axios
import axios from 'axios'
import test from '@/api/test.js'
import qs from 'qs'

// import Cookies from 'js-cookie'
// const qs = require('qs')

axios.defaults.baseURL = 'http://172.31.31.22:3000'
axios.defaults.timeout = '2500'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.interceptors.request.use(function (request) {
  if (request.method === 'post') {
    request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.transformRequest = [function (data) {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      data = qs.stringify({})
      return data
    }]
  }
  return request
})

export default {
  test
}
