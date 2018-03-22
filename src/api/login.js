import $api from '@_utils/http';

const base = process.env.BASE_URL;
export function login (data) {
  return $api.post(base + '/api/test/sss', data);
}
