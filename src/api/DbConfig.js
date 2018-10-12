import config from '../utils/apiconfig';
import request from '../utils/request';

const { api } = config;
const { DbConfig } = api;
console.log(DbConfig);

// 企业数据库配置列表
export async function DbConfigList(params) {
  return request({
    url: DbConfig, method: 'get', data: params
  });
}
