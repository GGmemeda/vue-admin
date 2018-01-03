import { $api } from './http';
import { COMMON } from '@/utils/constant.js';

const base = COMMON.SERVER_NAME;
export default {
  login: (data) => {
    return $api.post(base + '/api/test/sss', data, {
      'content-type': 'application/json'
    });
  }

};
