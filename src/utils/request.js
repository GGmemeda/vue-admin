/* global window */
import axios from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import pathToRegexp from 'path-to-regexp';
import { Message } from 'element-ui';
import { CORS, YQL } from './apiconfig';
import { getToken } from './auth';

axios.defaults.timeout = 60000;
export const setInterceptors = (store) => {
  axios.interceptors.request.use(function (config) {
    if (getToken('token') && getToken('token') !== 'admin') {
      config.headers.Authorization = `${getToken('token')}`;
    }
    return config;
  }, function (err) {
    return Promise.reject(err);
  });

  axios.interceptors.response.use(function (response) {
    const data = response.data;
    if (data.code !== 0 && !response.config.download) {
      Message.error(data.message);
    }
    if (data.code === 401) {
      Message.error('请重新登陆');
      history.push('/login');
      // clearAuth();
    }
    return response;
  }, function (error) {
    let originalRequest = error.config;
    //请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
      Message.error('网络超时');
    } else {
      Message.error('网络异常');
    }
    return Promise.reject(error);
  });
};

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
    config,
    paramToString
  } = options;

  var cloneData = Object.assign({}, data);
  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
    cloneData = (cloneData && '__self__' in cloneData) ? cloneData['__self__'] : cloneData;

  } catch (e) {
    Message.error(e.message);
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve({ statusText: 'OK', status: 200, data: result });
      });
    });
  }
  else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`;
    data = null;
  }
  if (paramToString) {
    cloneData = JSON.stringify(cloneData);
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      }, config);
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      }, config);
    case 'post':
      return axios.post(url, cloneData, config);
    case 'put':
      return axios.put(url, cloneData, config);
    case 'patch':
      return axios.patch(url, cloneData, config);
    default:
      return axios(options);
  }
};

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`;
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS';
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL';
      } else {
        options.fetchType = 'JSONP';
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response;
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    return Promise.resolve({
      _success: true,
      _message: statusText,
      _statusCode: status,
      ...data,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    return Promise.reject({ _success: false, _statusCode: statusCode, _message: msg });
  });
};
