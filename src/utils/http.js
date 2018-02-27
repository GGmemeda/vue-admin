'use strict';
import axios from 'axios';
import qs from 'qs';
// import store from '../store';
import iView from 'iview';
// 创建axios实例
const $api = axios.create({
  timeout: 5000 // 请求超时时间
});

$api.interceptors.request.use((request) => {
  iView.LoadingBar.start();
  if (request.method === 'post') {
    request.headers['Content-Type'] = 'application/json';
    axios.transformRequest = [function (data) {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      const qsData = qs(data);
      return qsData;
    }];
  }
  if (request.method === 'get') {
    request.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return request;
}, error => {
  return Promise.reject(error);
});

// respone拦截器
$api.interceptors.response.use(
  response => {
    const responseData = response.data;
    store.commit('showLoading', { loading: false });
    if (responseData.code === status.SUCCESS) {
      return responseData.data;
    }
    if (responseData.code === status.OVER_TIME) {
      return responseData;
    } else {
      // const toastUse = {
      //   showPositionValue: true,
      //   type: 'warn',
      //   time: 2000,
      //   width: '10em',
      //   text: responseData.message
      // };
      iView.LoadingBar.finish();
      return responseData;
    }
  },
  error => {
    // const toastUse = {
    //   showPositionValue: true,
    //   type: 'warn',
    //   time: 2000,
    //   width: '10em',
    //   text: error.message
    // };
    // Vue.$vux.toast.show(toastUse);
    iView.LoadingBar.finish();
    // console.log('err' + error);// for debug
    return Promise.reject(error);
  }
)
;

export const status = {
  SUCCESS: '0',
  NET_ERR: '101',   // 网络连接异常，请稍候再试
  BIZ_ERR: '103', // 业务请求异常
  NO_AUTH: '104',
  OVER_TIME: '1504104008'

};
export default $api;
