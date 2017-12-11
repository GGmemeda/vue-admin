// 引入 axios
import axios from 'axios';
import test from '@/api/test.js';
import qs from 'qs';

// import Cookies from 'js-cookie'
// const qs = require('qs')

axios.defaults.timeout = '2500';
axios.defaults.responseType = 'json';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.interceptors.request.use((request) => {
  // loading();
  // 配置request
  request.headers.Accept = 'application/json';
  // config.headers.System = 'vue';
  // let token = Vue.localStorage.get('token');
  // if(token){
  //     config.headers.Token = token;
  // }
  if (request.method === 'post') {
    request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.transformRequest = [function (data) {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      data = qs.stringify({});
      return data;
    }];
  }
  return request;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => {
  // const data = response.data;
  const status = response.status;
  if (status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, error => {
  return Promise.resolve(error.response);
});

export default {
  test
};
