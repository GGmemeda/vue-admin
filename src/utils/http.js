import axios from 'axios';
import iView from 'iview';
import qs from 'qs';

// 创建axios实例
const $api = axios.create({
  timeout: 5000 // 请求超时时间
});
$api.interceptors.request.use(request => {
  iView.LoadingBar.start();
  if (request.method === 'post') {
    request.headers['Content-Type'] = 'application/json';
    $api.transformRequest = [function (data) {
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
  iView.LoadingBar.finish();
  return Promise.reject(error);
});

// respone拦截器
$api.interceptors.response.use(response => {
  iView.LoadingBar.finish();
  const responseData = response.data;
  if (responseData.code === status.SUCCESS) {
    return responseData.data;
  }
  if (responseData.code === status.OVER_TIME) {
    return responseData;
  } else {
    return responseData;
  }
}, error => {
  iView.LoadingBar.finish();
  return Promise.reject(error);
});

export const status = {
  SUCCESS: '0',
  NET_ERR: '101',   // 网络连接异常，请稍候再试
  BIZ_ERR: '103', // 业务请求异常
  NO_AUTH: '104',
  OVER_TIME: '1504104008'

};
export default $api;
