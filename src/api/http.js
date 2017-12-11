import axios from 'axios';
export const $api = {};
const axiosMethods = ['get', 'post'];
const instance = axios.create({});

axiosMethods.forEach((method) => {
  $api[method] = function (url, data, config) {
    return new Promise(function (resolve, reject) {
      instance[method](url, data, config).then((response) => {
        const res = response.data;
        if (res.code !== status.SUCCESS) {
          // 状态编写
          if (response.data.Message === '未登录') {
          }
        } else {
          // closeLoading()
          resolve(response);
        }
      }).catch((response) => {
        // reject response
        reject(response);
      });
    });
  };
});
export const status = {
  SUCCESS: '100',
  NET_ERR: '101',   // 网络连接异常，请稍候再试
  BIZ_ERR: '103', // 业务请求异常
  NO_AUTH: '104'
};
